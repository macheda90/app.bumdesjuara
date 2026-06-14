import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Password lama dan baru wajib diisi' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password baru minimal 6 karakter' }, { status: 400 })
    }

    const user = await db.tenantUser.findFirst({
      where: { id: session.userId, tenantId: session.tenantId! },
    })

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Password lama tidak sesuai' }, { status: 400 })
    }

    const newHash = await bcrypt.hash(newPassword, 10)
    await db.tenantUser.update({
      where: { id: session.userId },
      data: { passwordHash: newHash },
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'UPDATE',
          resource: 'password',
          resourceId: session.userId,
          details: JSON.stringify({ action: 'change_password' }),
        },
      })
    } catch {
      // silent audit log failure
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
