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

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (search) {
      where.OR = [
        { nama: { contains: search } },
        { telepon: { contains: search } },
        { email: { contains: search } },
      ]
    }

    const [pelanggan, total] = await Promise.all([
      db.pelanggan.findMany({
        where,
        orderBy: [{ nama: 'asc' }],
        skip,
        take: limit,
      }),
      db.pelanggan.count({ where }),
    ])

    return NextResponse.json({
      pelanggan,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get pelanggan error:', error)
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
    const { nama, alamat, telepon, email } = body

    if (!nama) {
      return NextResponse.json(
        { error: 'Nama pelanggan wajib diisi' },
        { status: 400 }
      )
    }

    const pelanggan = await db.pelanggan.create({
      data: {
        tenantId: session.tenantId,
        nama,
        alamat: alamat || null,
        telepon: telepon || null,
        email: email || null,
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
          resource: 'pelanggan',
          resourceId: pelanggan.id,
          details: JSON.stringify({ nama: pelanggan.nama }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Pelanggan berhasil dibuat', pelanggan },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create pelanggan error:', error)
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
    const { id, nama, alamat, telepon, email } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID pelanggan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pelanggan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pelanggan tidak ditemukan' },
        { status: 404 }
      )
    }

    const pelanggan = await db.pelanggan.update({
      where: { id },
      data: {
        nama: nama ?? existing.nama,
        alamat: alamat !== undefined ? alamat : existing.alamat,
        telepon: telepon !== undefined ? telepon : existing.telepon,
        email: email !== undefined ? email : existing.email,
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
          resource: 'pelanggan',
          resourceId: pelanggan.id,
          details: JSON.stringify({ nama: pelanggan.nama }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Pelanggan berhasil diperbarui',
      pelanggan,
    })
  } catch (error) {
    console.error('Update pelanggan error:', error)
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
        { error: 'ID pelanggan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pelanggan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pelanggan tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.pelanggan.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'pelanggan',
          resourceId: id,
          details: JSON.stringify({ nama: existing.nama }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Pelanggan berhasil dihapus' })
  } catch (error) {
    console.error('Delete pelanggan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
