import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// Debit-normal accounts: increase on debit side
function isDebitNormal(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return (
    tipe.includes('kas') ||
    tipe.includes('bank') ||
    tipe.includes('piutang') ||
    tipe.includes('persediaan') ||
    tipe.includes('aset') ||
    tipe.includes('beban') ||
    tipe.includes('hpp')
  )
}

async function calculateAccountBalanceWithDate(
  kodeAkun: string,
  tenantId: string,
  tipeAkun: string,
  saldoAwal: number,
  startDate: string,
  endDate: string
): Promise<number> {
  const jurnalWhere: Record<string, unknown> = {
    tenantId,
    isApproved: true,
  }

  if (startDate || endDate) {
    const tanggalFilter: Record<string, unknown> = {}
    if (startDate) tanggalFilter.gte = new Date(startDate)
    if (endDate) tanggalFilter.lte = new Date(endDate)
    jurnalWhere.tanggal = tanggalFilter
  }

  const debitSum = await db.jurnalDetail.aggregate({
    _sum: { debit: true },
    where: {
      kodeAkun,
      jurnal: jurnalWhere,
    },
  })

  const kreditSum = await db.jurnalDetail.aggregate({
    _sum: { kredit: true },
    where: {
      kodeAkun,
      jurnal: jurnalWhere,
    },
  })

  const debit = debitSum._sum.debit || 0
  const kredit = kreditSum._sum.kredit || 0

  if (isDebitNormal(tipeAkun)) {
    return Math.round(saldoAwal + debit - kredit)
  } else {
    return Math.round(saldoAwal + kredit - debit)
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    const tenantId = session.tenantId

    // Get ALL accounts for this tenant (both Neraca and Laba Rugi)
    const akunList = await db.akun.findMany({
      where: {
        tenantId,
      },
      orderBy: { kodeAkun: 'asc' },
    })

    // Calculate balance for each account
    const accounts = await Promise.all(
      akunList.map(async (akun) => {
        const saldo = await calculateAccountBalanceWithDate(
          akun.kodeAkun,
          tenantId,
          akun.tipeAkun,
          akun.saldoAwal,
          startDate,
          endDate
        )

        const debitNormal = isDebitNormal(akun.tipeAkun)

        let debit = 0
        let kredit = 0

        if (debitNormal) {
          // For debit-normal accounts: positive balance → debit, negative → kredit
          if (saldo > 0) {
            debit = saldo
          } else if (saldo < 0) {
            kredit = Math.abs(saldo)
          }
        } else {
          // For credit-normal accounts: negative balance → debit, positive → kredit
          if (saldo < 0) {
            debit = Math.abs(saldo)
          } else if (saldo > 0) {
            kredit = saldo
          }
        }

        return {
          kodeAkun: akun.kodeAkun,
          namaAkun: akun.namaAkun,
          tipeAkun: akun.tipeAkun,
          saldoAwal: akun.saldoAwal,
          debit,
          kredit,
        }
      })
    )

    // Filter out accounts with zero balance in both columns
    const nonZeroAccounts = accounts.filter((a) => a.debit !== 0 || a.kredit !== 0)

    const totalDebit = nonZeroAccounts.reduce((sum, a) => sum + a.debit, 0)
    const totalKredit = nonZeroAccounts.reduce((sum, a) => sum + a.kredit, 0)
    const seimbang = totalDebit === totalKredit

    // Format periode
    let periode = 'Seluruh Periode'
    if (endDate) {
      const end = new Date(endDate)
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
      ]
      periode = `Per ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`
    }

    const responseData = {
      periode,
      accounts: nonZeroAccounts,
      totalDebit,
      totalKredit,
      seimbang,
    }

    // Audit log (non-blocking)
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'READ',
          resource: 'neraca_saldo',
          details: JSON.stringify({ startDate, endDate }),
        },
      })
    } catch {}

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Get neraca saldo error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
