import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

function isCashAccount(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return tipe.includes('kas') || tipe.includes('bank')
}

function isAssetAccount(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return (
    tipe.includes('aset') ||
    tipe.includes('persediaan') ||
    tipe.includes('piutang')
  )
}

function isFinancingAccount(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return tipe.includes('utang') || tipe.includes('ekuitas')
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

    // Get all Kas & Bank accounts for this tenant
    const cashAccounts = await db.akun.findMany({
      where: {
        tenantId,
        tipeAkun: { contains: 'Kas' },
      },
    })

    const bankAccounts = await db.akun.findMany({
      where: {
        tenantId,
        tipeAkun: { contains: 'Bank' },
      },
    })

    const allCashAccounts = [...cashAccounts, ...bankAccounts]
    const cashAccountCodes = new Set(allCashAccounts.map((a) => a.kodeAkun))

    // Calculate beginning cash balance (saldoAwal of all cash accounts)
    const saldoAwalKas = allCashAccounts.reduce((sum, a) => sum + a.saldoAwal, 0)

    // Build journal filter with date range
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

    // Get all journal entries that have cash account details
    const cashJournalDetails = await db.jurnalDetail.findMany({
      where: {
        kodeAkun: { in: Array.from(cashAccountCodes) },
        jurnal: jurnalWhere,
      },
      include: {
        jurnal: {
          select: {
            id: true,
            tanggal: true,
            keterangan: true,
            noBukti: true,
            tipe: true,
          },
        },
      },
    })

    // Get all accounts for classification lookup
    const allAccounts = await db.akun.findMany({
      where: { tenantId },
    })

    const accountMap = new Map(allAccounts.map((a) => [a.kodeAkun, a]))

    // Group by journal entry to determine category
    const journalGroups = new Map<string, typeof cashJournalDetails>()

    for (const detail of cashJournalDetails) {
      const jurnalId = detail.jurnalId
      if (!journalGroups.has(jurnalId)) {
        journalGroups.set(jurnalId, [])
      }
      journalGroups.get(jurnalId)!.push(detail)
    }

    // For each journal that has cash movements, look at the OTHER accounts
    // to determine the category (Operasi, Investasi, Pendanaan)
    const operasiItems: { keterangan: string; jumlah: number }[] = []
    const investasiItems: { keterangan: string; jumlah: number }[] = []
    const pendanaanItems: { keterangan: string; jumlah: number }[] = []

    for (const [jurnalId, cashDetails] of journalGroups) {
      // Get ALL details for this journal entry to find the non-cash accounts
      const allDetails = await db.jurnalDetail.findMany({
        where: { jurnalId },
      })

      const journalInfo = cashDetails[0].jurnal

      // Calculate net cash effect for this journal entry
      let cashDebit = 0
      let cashKredit = 0

      for (const cd of cashDetails) {
        cashDebit += cd.debit
        cashKredit += cd.kredit
      }

      // Net cash inflow = debit - kredit (positive = cash received, negative = cash paid)
      const netCashEffect = cashDebit - cashKredit

      // Find the non-cash accounts in this entry to determine category
      const nonCashDetails = allDetails.filter(
        (d) => !cashAccountCodes.has(d.kodeAkun)
      )

      // Determine category based on the non-cash account types
      let category: 'operasi' | 'investasi' | 'pendanaan' = 'operasi'

      if (nonCashDetails.length > 0) {
        // Check if any non-cash account is asset (besides cash)
        const hasAssetAccount = nonCashDetails.some((d) => {
          const acc = accountMap.get(d.kodeAkun)
          return acc && isAssetAccount(acc.tipeAkun) && !isCashAccount(acc.tipeAkun)
        })

        const hasFinancingAccount = nonCashDetails.some((d) => {
          const acc = accountMap.get(d.kodeAkun)
          return acc && isFinancingAccount(acc.tipeAkun)
        })

        if (hasFinancingAccount) {
          category = 'pendanaan'
        } else if (hasAssetAccount) {
          category = 'investasi'
        } else {
          category = 'operasi'
        }
      } else {
        // If only cash accounts are involved, categorize by journal type
        const tipe = journalInfo.tipe.toLowerCase()
        if (tipe === 'penjualan' || tipe === 'kas_masuk') {
          category = 'operasi'
        } else if (tipe === 'pembelian' || tipe === 'kas_keluar' || tipe === 'umum') {
          category = 'operasi'
        } else {
          category = 'operasi'
        }
      }

      // Generate description based on journal info and category
      const keterangan = journalInfo.keterangan || `Jurnal ${journalInfo.noBukti || jurnalId.slice(-6)}`

      const item = {
        keterangan,
        jumlah: Math.round(netCashEffect),
      }

      if (category === 'operasi') {
        operasiItems.push(item)
      } else if (category === 'investasi') {
        investasiItems.push(item)
      } else {
        pendanaanItems.push(item)
      }
    }

    // Also need to calculate cash movements that occurred before the date range
    // to compute the opening cash balance for the period
    let saldoAwalPeriod = saldoAwalKas

    if (startDate) {
      // Calculate cash balance up to startDate
      const beforeDateJurnalWhere: Record<string, unknown> = {
        tenantId,
        isApproved: true,
        tanggal: { lt: new Date(startDate) },
      }

      const beforeCashDetails = await db.jurnalDetail.aggregate({
        _sum: { debit: true, kredit: true },
        where: {
          kodeAkun: { in: Array.from(cashAccountCodes) },
          jurnal: beforeDateJurnalWhere,
        },
      })

      const beforeDebit = beforeCashDetails._sum.debit || 0
      const beforeKredit = beforeCashDetails._sum.kredit || 0

      saldoAwalPeriod = Math.round(saldoAwalKas + beforeDebit - beforeKredit)
    }

    // Calculate totals for each category
    const totalOperasi = operasiItems.reduce((sum, item) => sum + item.jumlah, 0)
    const totalInvestasi = investasiItems.reduce((sum, item) => sum + item.jumlah, 0)
    const totalPendanaan = pendanaanItems.reduce((sum, item) => sum + item.jumlah, 0)

    const saldoAkhirKas = Math.round(
      saldoAwalPeriod + totalOperasi + totalInvestasi + totalPendanaan
    )

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
      saldoAwalKas: Math.round(saldoAwalPeriod),
      operasi: {
        items: operasiItems,
        total: Math.round(totalOperasi),
      },
      investasi: {
        items: investasiItems,
        total: Math.round(totalInvestasi),
      },
      pendanaan: {
        items: pendanaanItems,
        total: Math.round(totalPendanaan),
      },
      saldoAkhirKas,
    }

    // Audit log (non-blocking)
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'READ',
          resource: 'arus_kas',
          details: JSON.stringify({ startDate, endDate }),
        },
      })
    } catch {}

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Get arus kas error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
