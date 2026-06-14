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

    const [pemasok, total] = await Promise.all([
      db.pemasok.findMany({
        where,
        orderBy: [{ nama: 'asc' }],
        skip,
        take: limit,
      }),
      db.pemasok.count({ where }),
    ])

    return NextResponse.json({
      pemasok,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get pemasok error:', error)
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
        { error: 'Nama pemasok wajib diisi' },
        { status: 400 }
      )
    }

    const pemasok = await db.pemasok.create({
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
          resource: 'pemasok',
          resourceId: pemasok.id,
          details: JSON.stringify({ nama: pemasok.nama }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Pemasok berhasil dibuat', pemasok },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create pemasok error:', error)
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
        { error: 'ID pemasok wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pemasok.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pemasok tidak ditemukan' },
        { status: 404 }
      )
    }

    const pemasok = await db.pemasok.update({
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
          resource: 'pemasok',
          resourceId: pemasok.id,
          details: JSON.stringify({ nama: pemasok.nama }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Pemasok berhasil diperbarui',
      pemasok,
    })
  } catch (error) {
    console.error('Update pemasok error:', error)
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
        { error: 'ID pemasok wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.pemasok.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Pemasok tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.pemasok.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'pemasok',
          resourceId: id,
          details: JSON.stringify({ nama: existing.nama }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Pemasok berhasil dihapus' })
  } catch (error) {
    console.error('Delete pemasok error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
