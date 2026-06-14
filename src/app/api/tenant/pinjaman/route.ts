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
    const status = searchParams.get('status') || ''
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (status && status !== 'semua') {
      where.status = status
    }

    if (search) {
      where.namaAnggota = { contains: search }
    }

    const [pinjaman, total] = await Promise.all([
      db.pinjaman.findMany({
        where,
        orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      db.pinjaman.count({ where }),
    ])

    return NextResponse.json({
      pinjaman,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get pinjaman error:', error)
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
    const { jenisPinjaman, namaAnggota, jumlahPokok, sisaPokok, bunga, status, tanggal, keterangan } = body

    if (!jenisPinjaman || !tanggal) {
      return NextResponse.json(
        { error: 'Jenis pinjaman dan tanggal wajib diisi' },
        { status: 400 }
      )
    }

    const validStatuses = ['active', 'disbursed', 'lunas']
    const pinjamanStatus = status || 'active'
    if (!validStatuses.includes(pinjamanStatus)) {
      return NextResponse.json(
        { error: 'Status harus active, disbursed, atau lunas' },
        { status: 400 }
      )
    }

    const pinjaman = await db.pinjaman.create({
      data: {
        tenantId: session.tenantId,
        jenisPinjaman,
        namaAnggota: namaAnggota || null,
        jumlahPokok: jumlahPokok || 0,
        sisaPokok: sisaPokok !== undefined ? sisaPokok : (jumlahPokok || 0),
        bunga: bunga || 0,
        status: pinjamanStatus,
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
          resource: 'pinjaman',
          resourceId: pinjaman.id,
          details: JSON.stringify({ jenisPinjaman: pinjaman.jenisPinjaman, namaAnggota: pinjaman.namaAnggota, jumlahPokok: pinjaman.jumlahPokok, status: pinjaman.status }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Pinjaman berhasil dibuat', pinjaman },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create pinjaman error:', error)
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
    const { id, jenisPinjaman, namaAnggota, jumlahPokok, sisaPokok, bunga, status, tanggal, keterangan } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID pinjaman wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pinjaman.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pinjaman tidak ditemukan' },
        { status: 404 }
      )
    }

    if (status && !['active', 'disbursed', 'lunas'].includes(status)) {
      return NextResponse.json(
        { error: 'Status harus active, disbursed, atau lunas' },
        { status: 400 }
      )
    }

    const pinjaman = await db.pinjaman.update({
      where: { id },
      data: {
        jenisPinjaman: jenisPinjaman ?? existing.jenisPinjaman,
        namaAnggota: namaAnggota !== undefined ? namaAnggota : existing.namaAnggota,
        jumlahPokok: jumlahPokok !== undefined ? jumlahPokok : existing.jumlahPokok,
        sisaPokok: sisaPokok !== undefined ? sisaPokok : existing.sisaPokok,
        bunga: bunga !== undefined ? bunga : existing.bunga,
        status: status ?? existing.status,
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
          resource: 'pinjaman',
          resourceId: pinjaman.id,
          details: JSON.stringify({ jenisPinjaman: pinjaman.jenisPinjaman, namaAnggota: pinjaman.namaAnggota, jumlahPokok: pinjaman.jumlahPokok, status: pinjaman.status }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Pinjaman berhasil diperbarui',
      pinjaman,
    })
  } catch (error) {
    console.error('Update pinjaman error:', error)
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
        { error: 'ID pinjaman wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pinjaman.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pinjaman tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.pinjaman.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'pinjaman',
          resourceId: id,
          details: JSON.stringify({ jenisPinjaman: existing.jenisPinjaman, namaAnggota: existing.namaAnggota, jumlahPokok: existing.jumlahPokok, status: existing.status }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Pinjaman berhasil dihapus' })
  } catch (error) {
    console.error('Delete pinjaman error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
