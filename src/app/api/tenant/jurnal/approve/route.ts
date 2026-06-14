import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// PUT /api/tenant/jurnal/approve — Approve or reject a journal entry
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { id, isApproved, rejectReason } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'ID jurnal wajib diisi' }, { status: 400 })
    }

    const jurnal = await db.jurnalUmum.findFirst({
      where: { id, tenantId: session.tenantId! }
    })

    if (!jurnal) {
      return NextResponse.json({ error: 'Jurnal tidak ditemukan' }, { status: 404 })
    }

    const updated = await db.jurnalUmum.update({
      where: { id },
      data: {
        isApproved,
        keterangan: rejectReason
          ? `${jurnal.keterangan || ''} [DITOLAK: ${rejectReason}]`
          : jurnal.keterangan,
      },
      include: {
        details: true,
      }
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: isApproved ? 'APPROVE' : 'REJECT',
          resource: 'jurnal',
          resourceId: id,
          details: JSON.stringify({ noBukti: jurnal.noBukti, isApproved, rejectReason }),
        }
      })
    } catch {}

    return NextResponse.json({ success: true, jurnal: updated })
  } catch (error) {
    console.error('Error approving journal:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
