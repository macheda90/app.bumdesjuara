import { NextResponse } from 'next/server'
import { deleteSession, clearSessionCookie } from '@/lib/auth'

export async function POST() {
  try {
    await deleteSession()
    const response = NextResponse.json({ success: true })
    response.headers.set('Set-Cookie', clearSessionCookie())
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
