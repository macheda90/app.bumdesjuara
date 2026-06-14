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

    const users = await db.centralUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        role: true,
        jabatan: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get central users error:', error)
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
    const { username, password, role, jabatan } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password harus diisi' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      )
    }

    if (!['admin', 'superuser'].includes(role)) {
      return NextResponse.json(
        { error: 'Role tidak valid' },
        { status: 400 }
      )
    }

    const existing = await db.centralUser.findUnique({
      where: { username },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.centralUser.create({
      data: {
        username,
        passwordHash: hashedPassword,
        role,
        jabatan: jabatan || null,
      },
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
    console.error('Create central user error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
