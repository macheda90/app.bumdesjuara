import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id, userId } = await params

    // Verify tenant exists
    const tenant = await db.tenant.findUnique({ where: { id } })
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    // Verify user exists and belongs to this tenant
    const existing = await db.tenantUser.findUnique({
      where: { id: userId },
    })
    if (!existing || existing.tenantId !== id) {
      return NextResponse.json(
        { error: 'Pengguna tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { namaUser, password, role, jabatan } = body

    const updateData: Record<string, unknown> = {}

    if (namaUser !== undefined) {
      // Check if namaUser is taken by another user in the same tenant
      const duplicate = await db.tenantUser.findUnique({
        where: {
          tenantId_namaUser: {
            tenantId: id,
            namaUser,
          },
        },
      })
      if (duplicate && duplicate.id !== userId) {
        return NextResponse.json(
          { error: 'Nama user sudah digunakan di tenant ini' },
          { status: 409 }
        )
      }
      updateData.namaUser = namaUser
    }

    if (role !== undefined) {
      if (!['admin', 'manajer', 'staff', 'kasir'].includes(role)) {
        return NextResponse.json(
          { error: 'Role tidak valid. Pilih: admin, manajer, staff, kasir' },
          { status: 400 }
        )
      }
      updateData.role = role
    }

    if (jabatan !== undefined) {
      updateData.jabatan = jabatan || null
    }

    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: 'Password minimal 8 karakter' },
          { status: 400 }
        )
      }
      updateData.passwordHash = await bcrypt.hash(password, 10)
    }

    const user = await db.tenantUser.update({
      where: { id: userId },
      data: updateData,
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
    console.error('Update tenant user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id, userId } = await params

    // Verify tenant exists
    const tenant = await db.tenant.findUnique({ where: { id } })
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    // Verify user exists and belongs to this tenant
    const existing = await db.tenantUser.findUnique({
      where: { id: userId },
    })
    if (!existing || existing.tenantId !== id) {
      return NextResponse.json(
        { error: 'Pengguna tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    // Delete user sessions first
    await db.session.deleteMany({
      where: { userId, userType: 'tenant' },
    })

    await db.tenantUser.delete({ where: { id: userId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete tenant user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
