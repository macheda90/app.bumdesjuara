import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export interface AuthSession {
  userId: string
  userType: 'central' | 'tenant'
  tenantId?: string
  username?: string
  namaUser?: string
  role?: string
  jabatan?: string
  tenantName?: string
}

export async function createSession(
  userId: string,
  userType: 'central' | 'tenant',
  tenantId?: string
): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await db.session.create({
    data: {
      sessionToken,
      userId,
      userType,
      tenantId: tenantId || null,
      expires,
    },
  })

  return sessionToken
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')?.value

  if (!sessionToken) return null

  const session = await db.session.findUnique({
    where: { sessionToken },
  })

  if (!session) return null
  if (new Date() > session.expires) {
    await db.session.delete({ where: { sessionToken } })
    return null
  }

  let authSession: AuthSession = {
    userId: session.userId,
    userType: session.userType as 'central' | 'tenant',
    tenantId: session.tenantId || undefined,
  }

  if (session.userType === 'central') {
    const user = await db.centralUser.findUnique({
      where: { id: session.userId },
    })
    if (user) {
      authSession.username = user.username
      authSession.namaUser = user.username
      authSession.role = user.role
      authSession.jabatan = user.jabatan || undefined
    }
  } else if (session.userType === 'tenant' && session.tenantId) {
    const user = await db.tenantUser.findUnique({
      where: { id: session.userId },
    })
    const tenant = await db.tenant.findUnique({
      where: { id: session.tenantId },
    })
    if (user && tenant) {
      authSession.namaUser = user.namaUser
      authSession.role = user.role
      authSession.jabatan = user.jabatan || undefined
      authSession.tenantName = tenant.namaPerusahaan
      authSession.tenantId = tenant.id
    }
  }

  return authSession
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')?.value

  if (sessionToken) {
    await db.session.deleteMany({ where: { sessionToken } })
  }
}

export function setSessionCookie(sessionToken: string): string {
  return `session_token=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`
}

export function clearSessionCookie(): string {
  return 'session_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
}
