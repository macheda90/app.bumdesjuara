import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const action = searchParams.get('action') || ''
    const resource = searchParams.get('resource') || ''
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (action) {
      where.action = action
    }

    if (resource) {
      where.resource = resource
    }

    if (search) {
      where.OR = [
        { username: { contains: search } },
        { details: { contains: search } },
        { resourceId: { contains: search } },
      ]
    }

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.auditLog.count({ where }),
    ])

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get audit logs error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
