import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (search) {
      where.OR = [
        { namaUser: { contains: search } },
        { role: { contains: search } },
        { jabatan: { contains: search } },
      ]
    }

    const users = await db.tenantUser.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        namaUser: true,
        role: true,
        jabatan: true,
        idCabang: true,
        createdAt: true,
        updatedAt: true,
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

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { namaUser, password, role, jabatan } = body

    if (!namaUser || !password) {
      return NextResponse.json(
        { error: 'Nama user dan password wajib diisi' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    // Check namaUser uniqueness within tenant
    const existing = await db.tenantUser.findFirst({
      where: {
        tenantId: session.tenantId,
        namaUser,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Nama user sudah digunakan dalam tenant ini' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await db.tenantUser.create({
      data: {
        tenantId: session.tenantId,
        namaUser,
        passwordHash,
        role: role || 'staff',
        jabatan: jabatan || null,
      },
      select: {
        id: true,
        namaUser: true,
        role: true,
        jabatan: true,
        idCabang: true,
        createdAt: true,
        updatedAt: true,
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
          resource: 'tenant_user',
          resourceId: user.id,
          details: JSON.stringify({ namaUser: user.namaUser, role: user.role }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Pengguna berhasil dibuat', user },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create tenant user error:', error)
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
      return NextResponse.json({ error: 'ID pengguna wajib diisi' }, { status: 400 })
    }

    const user = await db.tenantUser.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan' }, { status: 404 })
    }

    await db.tenantUser.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'tenant_user',
          resourceId: id,
          details: JSON.stringify({ namaUser: user.namaUser, role: user.role }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Pengguna berhasil dihapus' })
  } catch (error) {
    console.error('Delete tenant user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
