import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSession, setSessionCookie } from '@/lib/auth'
import { checkRateLimit, resetOnSuccess } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting ---
    const ip = getClientIP(request)
    const { allowed, retryAfter } = checkRateLimit(ip)

    if (!allowed) {
      const minutes = Math.ceil(retryAfter / 60)
      // Audit log for rate-limited attempt
      console.warn(
        JSON.stringify({
          action: 'RATE_LIMITED',
          resource: 'auth',
          ip,
          retryAfterSeconds: retryAfter,
          timestamp: new Date().toISOString(),
        })
      )
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan login. Coba lagi dalam ${minutes} menit.`,
          retryAfter,
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { username, password, loginMode, tenantId: inputTenantId } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password harus diisi' },
        { status: 400 }
      )
    }

    if (loginMode === 'central') {
      const user = await db.centralUser.findUnique({
        where: { username },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        )
      }

      const isValid = await bcrypt.compare(password, user.passwordHash)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        )
      }

      // Successful login — reset rate limit for this IP
      resetOnSuccess(ip)

      const sessionToken = await createSession(user.id, 'central')
      const response = NextResponse.json({
        success: true,
        user: {
          userId: user.id,
          userType: 'central',
          username: user.username,
          namaUser: user.username,
          role: user.role,
          jabatan: user.jabatan,
        },
      })
      response.headers.set('Set-Cookie', setSessionCookie(sessionToken))
      return response
    } else if (loginMode === 'tenant') {
      if (!inputTenantId) {
        return NextResponse.json(
          { error: 'Tenant ID harus diisi' },
          { status: 400 }
        )
      }

      const tenant = await db.tenant.findUnique({
        where: { tenantId: inputTenantId },
      })

      if (!tenant) {
        return NextResponse.json(
          { error: 'Tenant tidak ditemukan' },
          { status: 404 }
        )
      }

      if (!tenant.isActive) {
        return NextResponse.json(
          { error: 'Tenant sudah tidak aktif' },
          { status: 403 }
        )
      }

      const user = await db.tenantUser.findUnique({
        where: {
          tenantId_namaUser: {
            tenantId: tenant.id,
            namaUser: username,
          },
        },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        )
      }

      const isValid = await bcrypt.compare(password, user.passwordHash)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Username atau password salah' },
          { status: 401 }
        )
      }

      // Successful login — reset rate limit for this IP
      resetOnSuccess(ip)

      await db.tenant.update({
        where: { id: tenant.id },
        data: { lastSeenAt: new Date() },
      })

      const sessionToken = await createSession(user.id, 'tenant', tenant.id)

      // Audit log for tenant login
      try {
        await db.auditLog.create({
          data: {
            tenantId: tenant.id,
            userId: user.id,
            username: user.namaUser,
            action: 'LOGIN',
            resource: 'auth',
            resourceId: user.id,
            details: JSON.stringify({ namaUser: user.namaUser, role: user.role }),
          },
        })
      } catch {}

      const response = NextResponse.json({
        success: true,
        user: {
          userId: user.id,
          userType: 'tenant',
          tenantId: tenant.id,
          namaUser: user.namaUser,
          role: user.role,
          jabatan: user.jabatan,
          tenantName: tenant.namaPerusahaan,
        },
      })
      response.headers.set('Set-Cookie', setSessionCookie(sessionToken))
      return response
    } else {
      return NextResponse.json(
        { error: 'Mode login tidak valid' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
