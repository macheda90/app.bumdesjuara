import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

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
    const { username, password, role, jabatan } = body

    const existing = await db.centralUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pengguna tidak ditemukan' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (username !== undefined) {
      // Check if username is taken by another user
      const duplicate = await db.centralUser.findUnique({ where: { username } })
      if (duplicate && duplicate.id !== id) {
        return NextResponse.json(
          { error: 'Username sudah digunakan' },
          { status: 409 }
        )
      }
      updateData.username = username
    }
    if (role !== undefined) {
      if (!['admin', 'superuser'].includes(role)) {
        return NextResponse.json(
          { error: 'Role tidak valid' },
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

    const user = await db.centralUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true,
        jabatan: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Update central user error:', error)
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

    // Cannot delete self
    if (session.userId === id) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus akun sendiri' },
        { status: 400 }
      )
    }

    const existing = await db.centralUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pengguna tidak ditemukan' },
        { status: 404 }
      )
    }

    // Delete user sessions first
    await db.session.deleteMany({
      where: { userId: id, userType: 'central' },
    })

    await db.centralUser.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete central user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
