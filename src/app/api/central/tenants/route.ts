import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const tenants = await db.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { users: true },
        },
      },
    })

    const formatted = tenants.map((t) => ({
      id: t.id,
      tenantId: t.tenantId,
      namaPerusahaan: t.namaPerusahaan,
      email: t.email,
      domain: t.domain,
      isActive: t.isActive,
      adminUsername: t.adminUsername,
      lastSeenAt: t.lastSeenAt,
      createdAt: t.createdAt,
      userCount: t._count.users,
    }))

    return NextResponse.json({ tenants: formatted })
  } catch (error) {
    console.error('Get tenants error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { tenantId, namaPerusahaan, email, domain, adminUsername, adminPassword } = body

    if (!tenantId || !namaPerusahaan || !adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Tenant ID, nama perusahaan, username admin, dan password admin harus diisi' },
        { status: 400 }
      )
    }

    // Check if tenantId already exists
    const existing = await db.tenant.findUnique({
      where: { tenantId },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Tenant ID sudah digunakan' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const tenant = await db.tenant.create({
      data: {
        tenantId,
        namaPerusahaan,
        email: email || null,
        domain: domain || null,
        adminUsername,
        adminPassword: hashedPassword,
      },
    })

    // Also create the admin TenantUser
    await db.tenantUser.create({
      data: {
        tenantId: tenant.id,
        namaUser: adminUsername,
        passwordHash: hashedPassword,
        role: 'admin',
        jabatan: 'Administrator',
      },
    })

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        tenantId: tenant.tenantId,
        namaPerusahaan: tenant.namaPerusahaan,
      },
    })
  } catch (error) {
    console.error('Create tenant error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
