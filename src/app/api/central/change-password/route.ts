import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Password lama dan baru wajib diisi' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password baru minimal 6 karakter' }, { status: 400 })
    }

    const user = await db.centralUser.findUnique({
      where: { id: session.userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Password lama tidak sesuai' }, { status: 400 })
    }

    const newHash = await bcrypt.hash(newPassword, 10)
    await db.centralUser.update({
      where: { id: session.userId },
      data: { passwordHash: newHash },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
