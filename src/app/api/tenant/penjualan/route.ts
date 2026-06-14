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
    const search = searchParams.get('search') || ''
    const tanggalDari = searchParams.get('tanggalDari') || ''
    const tanggalSampai = searchParams.get('tanggalSampai') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (search) {
      where.noFaktur = { contains: search }
    }

    if (tanggalDari || tanggalSampai) {
      const tanggalFilter: Record<string, unknown> = {}
      if (tanggalDari) tanggalFilter.gte = new Date(tanggalDari)
      if (tanggalSampai) tanggalFilter.lte = new Date(tanggalSampai)
      where.tanggalFaktur = tanggalFilter
    }

    const [penjualan, total] = await Promise.all([
      db.penjualan.findMany({
        where,
        orderBy: [{ tanggalFaktur: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      db.penjualan.count({ where }),
    ])

    return NextResponse.json({
      penjualan,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get penjualan error:', error)
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
    const { tanggalFaktur, pelangganId, total, keterangan } = body

    if (!tanggalFaktur) {
      return NextResponse.json(
        { error: 'Tanggal faktur wajib diisi' },
        { status: 400 }
      )
    }

    // Auto-generate noFaktur: PJ-YYYYMMDD-XXX
    const today = new Date(tanggalFaktur)
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '')
    const prefix = `PJ-${dateStr}-`

    const lastPenjualan = await db.penjualan.findFirst({
      where: {
        tenantId: session.tenantId,
        noFaktur: { startsWith: prefix },
      },
      orderBy: { noFaktur: 'desc' },
    })

    let sequence = 1
    if (lastPenjualan) {
      const lastSeq = parseInt(lastPenjualan.noFaktur.split('-').pop() || '0')
      sequence = lastSeq + 1
    }

    const noFaktur = `${prefix}${sequence.toString().padStart(3, '0')}`

    const penjualan = await db.penjualan.create({
      data: {
        tenantId: session.tenantId,
        noFaktur,
        tanggalFaktur: new Date(tanggalFaktur),
        pelangganId: pelangganId || null,
        total: total || 0,
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
          resource: 'penjualan',
          resourceId: penjualan.id,
          details: JSON.stringify({ noFaktur: penjualan.noFaktur, total: penjualan.total }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Penjualan berhasil dibuat', penjualan },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create penjualan error:', error)
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
    const { id, tanggalFaktur, pelangganId, total, keterangan } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID penjualan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.penjualan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Penjualan tidak ditemukan' },
        { status: 404 }
      )
    }

    const penjualan = await db.penjualan.update({
      where: { id },
      data: {
        tanggalFaktur: tanggalFaktur
          ? new Date(tanggalFaktur)
          : existing.tanggalFaktur,
        pelangganId:
          pelangganId !== undefined ? pelangganId : existing.pelangganId,
        total: total !== undefined ? total : existing.total,
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
          resource: 'penjualan',
          resourceId: penjualan.id,
          details: JSON.stringify({ noFaktur: penjualan.noFaktur, total: penjualan.total }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Penjualan berhasil diperbarui',
      penjualan,
    })
  } catch (error) {
    console.error('Update penjualan error:', error)
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
        { error: 'ID penjualan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.penjualan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Penjualan tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.penjualan.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'penjualan',
          resourceId: id,
          details: JSON.stringify({ noFaktur: existing.noFaktur, total: existing.total }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Penjualan berhasil dihapus' })
  } catch (error) {
    console.error('Delete penjualan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
