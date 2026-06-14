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

    // Verify tenant exists
    const tenant = await db.tenant.findUnique({ where: { id } })
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    const users = await db.tenantUser.findMany({
      where: { tenantId: id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        namaUser: true,
        role: true,
        jabatan: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get tenant users error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id } = await params

    // Verify tenant exists
    const tenant = await db.tenant.findUnique({ where: { id } })
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { namaUser, password, role, jabatan } = body

    if (!namaUser || !password) {
      return NextResponse.json(
        { error: 'Nama user dan password harus diisi' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      )
    }

    if (!['admin', 'manajer', 'staff', 'kasir'].includes(role)) {
      return NextResponse.json(
        { error: 'Role tidak valid. Pilih: admin, manajer, staff, kasir' },
        { status: 400 }
      )
    }

    // Check unique constraint: namaUser must be unique within the tenant
    const existing = await db.tenantUser.findUnique({
      where: {
        tenantId_namaUser: {
          tenantId: id,
          namaUser,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Nama user sudah digunakan di tenant ini' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.tenantUser.create({
      data: {
        tenantId: id,
        namaUser,
        passwordHash: hashedPassword,
        role,
        jabatan: jabatan || null,
      },
      select: {
        id: true,
        namaUser: true,
        role: true,
        jabatan: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Create tenant user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
