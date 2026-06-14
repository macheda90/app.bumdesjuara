import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST() {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    // Only admin and manajer roles can recalculate
    if (session.role !== 'admin' && session.role !== 'manajer') {
      return NextResponse.json(
        { error: 'Hanya admin atau manajer yang dapat mengakses fitur ini' },
        { status: 403 }
      )
    }

    // Get all accounts for this tenant
    const akunList = await db.akun.findMany({
      where: { tenantId: session.tenantId },
      orderBy: [{ kelompok: 'asc' }, { kodeAkun: 'asc' }],
    })

    if (akunList.length === 0) {
      return NextResponse.json({
        message: 'Tidak ada akun untuk dihitung ulang',
        summary: { totalAccounts: 0, discrepancies: 0, results: [] },
      })
    }

    // Get all approved journal details for this tenant at once
    const allJurnalDetails = await db.jurnalDetail.findMany({
      where: {
        jurnal: {
          tenantId: session.tenantId,
          isApproved: true,
        },
      },
      select: {
        kodeAkun: true,
        debit: true,
        kredit: true,
      },
    })

    // Aggregate debits and credits per kodeAkun
    const debitByAkun: Record<string, number> = {}
    const kreditByAkun: Record<string, number> = {}

    for (const detail of allJurnalDetails) {
      const kode = detail.kodeAkun
      debitByAkun[kode] = (debitByAkun[kode] || 0) + (detail.debit || 0)
      kreditByAkun[kode] = (kreditByAkun[kode] || 0) + (detail.kredit || 0)
    }

    // Calculate recalculated balance for each account
    const results = akunList.map((akun) => {
      const debit = debitByAkun[akun.kodeAkun] || 0
      const kredit = kreditByAkun[akun.kodeAkun] || 0
      const saldoAwal = akun.saldoAwal || 0

      const tipe = akun.tipeAkun.toLowerCase()
      let recalculatedSaldo = 0
      if (
        tipe.includes('kas') ||
        tipe.includes('bank') ||
        tipe.includes('piutang') ||
        tipe.includes('persediaan') ||
        tipe.includes('aset')
      ) {
        // Debit normal balance accounts
        recalculatedSaldo = saldoAwal + debit - kredit
      } else {
        // Credit normal balance accounts
        recalculatedSaldo = saldoAwal + kredit - debit
      }

      recalculatedSaldo = Math.round(recalculatedSaldo)

      const discrepancy = Math.abs(recalculatedSaldo - (akun.saldoAwal || 0))

      return {
        id: akun.id,
        kodeAkun: akun.kodeAkun,
        namaAkun: akun.namaAkun,
        tipeAkun: akun.tipeAkun,
        kelompok: akun.kelompok,
        saldoAwal: akun.saldoAwal,
        totalDebit: debit,
        totalKredit: kredit,
        recalculatedSaldo,
        storedSaldo: akun.saldoAwal,
        discrepancy,
        isMatch: discrepancy === 0,
      }
    })

    const discrepancies = results.filter((r) => !r.isMatch)

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'UPDATE',
          resource: 'akun',
          details: JSON.stringify({
            action: 'recalculate',
            totalAccounts: results.length,
            discrepancies: discrepancies.length,
          }),
        },
      })
    } catch {
      // Ignore audit log errors
    }

    return NextResponse.json({
      message: `Perhitungan ulang selesai. ${discrepancies.length} dari ${results.length} akun memiliki selisih.`,
      summary: {
        totalAccounts: results.length,
        discrepancies: discrepancies.length,
        matched: results.length - discrepancies.length,
      },
      results,
    })
  } catch (error) {
    console.error('Recalculate akun error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
