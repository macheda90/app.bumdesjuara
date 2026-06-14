import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id } = await params
    const tenant = await db.tenant.findUnique({
      where: { id },
      include: {
        users: true,
        _count: {
          select: {
            akun: true,
            jurnalUmum: true,
            penjualan: true,
            pembelian: true,
            simpanan: true,
            pinjaman: true,
            persediaan: true,
            pelanggan: true,
            pemasok: true,
          },
        },
      },
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json({ tenant })
  } catch (error) {
    console.error('Get tenant error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { namaPerusahaan, email, domain, isActive, adminUsername, adminPassword } = body

    const existing = await db.tenant.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (namaPerusahaan !== undefined) updateData.namaPerusahaan = namaPerusahaan
    if (email !== undefined) updateData.email = email || null
    if (domain !== undefined) updateData.domain = domain || null
    if (isActive !== undefined) updateData.isActive = isActive
    if (adminUsername !== undefined) updateData.adminUsername = adminUsername

    if (adminPassword) {
      updateData.adminPassword = await bcrypt.hash(adminPassword, 10)
      // Also update the admin TenantUser
      const adminUser = await db.tenantUser.findFirst({
        where: { tenantId: id, role: 'admin' },
      })
      if (adminUser) {
        await db.tenantUser.update({
          where: { id: adminUser.id },
          data: {
            passwordHash: updateData.adminPassword as string,
            ...(adminUsername ? { namaUser: adminUsername } : {}),
          },
        })
      }
    } else if (adminUsername) {
      const adminUser = await db.tenantUser.findFirst({
        where: { tenantId: id, role: 'admin' },
      })
      if (adminUser) {
        await db.tenantUser.update({
          where: { id: adminUser.id },
          data: { namaUser: adminUsername },
        })
      }
    }

    const tenant = await db.tenant.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, tenant })
  } catch (error) {
    console.error('Update tenant error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id } = await params
    const existing = await db.tenant.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    await db.tenant.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete tenant error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
