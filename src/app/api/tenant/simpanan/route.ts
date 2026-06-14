import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const jenisTransaksi = searchParams.get('jenisTransaksi') || ''
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (jenisTransaksi && jenisTransaksi !== 'semua') {
      where.jenisTransaksi = jenisTransaksi
    }

    if (search) {
      where.namaAnggota = { contains: search }
    }

    const [simpanan, total] = await Promise.all([
      db.simpanan.findMany({
        where,
        orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      db.simpanan.count({ where }),
    ])

    return NextResponse.json({
      simpanan,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get simpanan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { jenisSimpanan, namaAnggota, jenisTransaksi, jumlah, tanggal, keterangan } = body

    if (!jenisSimpanan || !jenisTransaksi || !tanggal) {
      return NextResponse.json(
        { error: 'Jenis simpanan, jenis transaksi, dan tanggal wajib diisi' },
        { status: 400 }
      )
    }

    if (!['setor', 'tarik'].includes(jenisTransaksi)) {
      return NextResponse.json(
        { error: 'Jenis transaksi harus setor atau tarik' },
        { status: 400 }
      )
    }

    const simpanan = await db.simpanan.create({
      data: {
        tenantId: session.tenantId,
        jenisSimpanan,
        namaAnggota: namaAnggota || null,
        jenisTransaksi,
        jumlah: jumlah || 0,
        tanggal: new Date(tanggal),
        keterangan: keterangan || null,
      },
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'CREATE',
          resource: 'simpanan',
          resourceId: simpanan.id,
          details: JSON.stringify({ jenisSimpanan: simpanan.jenisSimpanan, namaAnggota: simpanan.namaAnggota, jenisTransaksi: simpanan.jenisTransaksi, jumlah: simpanan.jumlah }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Simpanan berhasil dibuat', simpanan },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create simpanan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { id, jenisSimpanan, namaAnggota, jenisTransaksi, jumlah, tanggal, keterangan } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID simpanan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.simpanan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Simpanan tidak ditemukan' },
        { status: 404 }
      )
    }

    if (jenisTransaksi && !['setor', 'tarik'].includes(jenisTransaksi)) {
      return NextResponse.json(
        { error: 'Jenis transaksi harus setor atau tarik' },
        { status: 400 }
      )
    }

    const simpanan = await db.simpanan.update({
      where: { id },
      data: {
        jenisSimpanan: jenisSimpanan ?? existing.jenisSimpanan,
        namaAnggota: namaAnggota !== undefined ? namaAnggota : existing.namaAnggota,
        jenisTransaksi: jenisTransaksi ?? existing.jenisTransaksi,
        jumlah: jumlah !== undefined ? jumlah : existing.jumlah,
        tanggal: tanggal ? new Date(tanggal) : existing.tanggal,
        keterangan: keterangan !== undefined ? keterangan : existing.keterangan,
      },
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'UPDATE',
          resource: 'simpanan',
          resourceId: simpanan.id,
          details: JSON.stringify({ jenisSimpanan: simpanan.jenisSimpanan, namaAnggota: simpanan.namaAnggota, jenisTransaksi: simpanan.jenisTransaksi, jumlah: simpanan.jumlah }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Simpanan berhasil diperbarui',
      simpanan,
    })
  } catch (error) {
    console.error('Update simpanan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID simpanan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.simpanan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Simpanan tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.simpanan.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'simpanan',
          resourceId: id,
          details: JSON.stringify({ jenisSimpanan: existing.jenisSimpanan, namaAnggota: existing.namaAnggota, jenisTransaksi: existing.jenisTransaksi, jumlah: existing.jumlah }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Simpanan berhasil dihapus' })
  } catch (error) {
    console.error('Delete simpanan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
