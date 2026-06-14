import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    let settings = await db.tenantSettings.findUnique({
      where: { tenantId: session.tenantId },
    })

    // If no settings row exists, create one from Tenant.namaPerusahaan
    if (!settings) {
      const tenant = await db.tenant.findUnique({
        where: { id: session.tenantId },
      })

      settings = await db.tenantSettings.create({
        data: {
          tenantId: session.tenantId,
          namaPerusahaan: tenant?.namaPerusahaan || '',
          email: tenant?.email || null,
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Get tenant settings error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { namaPerusahaan, alamat, telepon, email, npwp, tahunFiskal, logoUrl } = body

    // Ensure settings row exists
    let settings = await db.tenantSettings.findUnique({
      where: { tenantId: session.tenantId },
    })

    if (!settings) {
      settings = await db.tenantSettings.create({
        data: {
          tenantId: session.tenantId,
          namaPerusahaan: namaPerusahaan || '',
          alamat: alamat || null,
          telepon: telepon || null,
          email: email || null,
          npwp: npwp || null,
          tahunFiskal: tahunFiskal || '2025',
          logoUrl: logoUrl || null,
        },
      })
    } else {
      settings = await db.tenantSettings.update({
        where: { tenantId: session.tenantId },
        data: {
          namaPerusahaan: namaPerusahaan !== undefined ? namaPerusahaan : settings.namaPerusahaan,
          alamat: alamat !== undefined ? alamat : settings.alamat,
          telepon: telepon !== undefined ? telepon : settings.telepon,
          email: email !== undefined ? email : settings.email,
          npwp: npwp !== undefined ? npwp : settings.npwp,
          tahunFiskal: tahunFiskal !== undefined ? tahunFiskal : settings.tahunFiskal,
          logoUrl: logoUrl !== undefined ? logoUrl : settings.logoUrl,
        },
      })
    }

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'UPDATE',
          resource: 'settings',
          resourceId: settings.id,
          details: JSON.stringify({ namaPerusahaan: settings.namaPerusahaan }),
        },
      })
    } catch {}

    return NextResponse.json({
      message: 'Pengaturan berhasil diperbarui',
      settings,
    })
  } catch (error) {
    console.error('Update tenant settings error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
