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
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const lowStock = searchParams.get('lowStock') === 'true'

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (search) {
      where.OR = [
        { namaBarang: { contains: search } },
        { satuan: { contains: search } },
      ]
    }

    if (lowStock) {
      where.stok = { lte: 10 }
    }

    const [persediaan, total] = await Promise.all([
      db.persediaan.findMany({
        where,
        orderBy: [{ namaBarang: 'asc' }],
        skip,
        take: limit,
      }),
      db.persediaan.count({ where }),
    ])

    // Calculate summary stats
    const allItems = await db.persediaan.findMany({
      where: { tenantId: session.tenantId },
    })

    const totalNilai = allItems.reduce((sum, item) => sum + (item.hargaBeli * item.stok), 0)
    const totalStokRendah = allItems.filter(item => item.stok <= 10).length
    const totalBarang = allItems.length

    return NextResponse.json({
      persediaan,
      summary: {
        totalNilai,
        totalStokRendah,
        totalBarang,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get persediaan error:', error)
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
    const { namaBarang, satuan, hargaBeli, hargaJual, stok } = body

    if (!namaBarang) {
      return NextResponse.json(
        { error: 'Nama barang wajib diisi' },
        { status: 400 }
      )
    }

    const persediaan = await db.persediaan.create({
      data: {
        tenantId: session.tenantId,
        namaBarang,
        satuan: satuan || null,
        hargaBeli: hargaBeli ? parseFloat(hargaBeli) : 0,
        hargaJual: hargaJual ? parseFloat(hargaJual) : 0,
        stok: stok ? parseFloat(stok) : 0,
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
          resource: 'persediaan',
          resourceId: persediaan.id,
          details: JSON.stringify({ namaBarang: persediaan.namaBarang, satuan: persediaan.satuan, stok: persediaan.stok }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Persediaan berhasil dibuat', persediaan },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create persediaan error:', error)
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
    const { id, namaBarang, satuan, hargaBeli, hargaJual, stok } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID persediaan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.persediaan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Persediaan tidak ditemukan' },
        { status: 404 }
      )
    }

    const persediaan = await db.persediaan.update({
      where: { id },
      data: {
        namaBarang: namaBarang ?? existing.namaBarang,
        satuan: satuan !== undefined ? satuan : existing.satuan,
        hargaBeli: hargaBeli !== undefined ? parseFloat(hargaBeli) : existing.hargaBeli,
        hargaJual: hargaJual !== undefined ? parseFloat(hargaJual) : existing.hargaJual,
        stok: stok !== undefined ? parseFloat(stok) : existing.stok,
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
          resource: 'persediaan',
          resourceId: persediaan.id,
          details: JSON.stringify({ namaBarang: persediaan.namaBarang, satuan: persediaan.satuan, stok: persediaan.stok }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Persediaan berhasil diperbarui',
      persediaan,
    })
  } catch (error) {
    console.error('Update persediaan error:', error)
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
        { error: 'ID persediaan wajib diisi' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.persediaan.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Persediaan tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.persediaan.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'persediaan',
          resourceId: id,
          details: JSON.stringify({ namaBarang: existing.namaBarang, satuan: existing.satuan, stok: existing.stok }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Persediaan berhasil dihapus' })
  } catch (error) {
    console.error('Delete persediaan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
