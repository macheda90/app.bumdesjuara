import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'central') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id } = await params
    const existing = await db.tenant.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: 'Tenant tidak ditemukan' },
        { status: 404 }
      )
    }

    const tenant = await db.tenant.update({
      where: { id },
      data: { isActive: !existing.isActive },
    })

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        isActive: tenant.isActive,
      },
    })
  } catch (error) {
    console.error('Toggle tenant error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
