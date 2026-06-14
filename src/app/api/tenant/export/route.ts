import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// ─── CSV Helpers ──────────────────────────────────────────────────────────────

function escapeCsvField(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value)
  // If field contains semicolon, newline, or double quote, wrap in quotes
  if (str.includes(';') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function rowsToCsv(headers: string[], rows: string[][]): string {
  const headerLine = headers.join(';')
  const dataLines = rows.map((row) => row.map(escapeCsvField).join(';'))
  return [headerLine, ...dataLines].join('\n')
}

function formatDate(date: Date | string): string {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

function formatDateISO(date: Date | string): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().slice(0, 10)
}

function formatCsvCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Account Balance Helpers ──────────────────────────────────────────────────

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

function isAssetAccount(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return (
    tipe.includes('kas') ||
    tipe.includes('bank') ||
    tipe.includes('piutang') ||
    tipe.includes('persediaan') ||
    tipe.includes('aset')
  )
}

function isCashAccount(tipeAkun: string): boolean {
  const tipe = tipeAkun.toLowerCase()
  return tipe.includes('kas') || tipe.includes('bank')
}

async function calculateAccountBalance(
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

// ─── Date Filter Builder ─────────────────────────────────────────────────────

function buildDateFilter(startDate: string, endDate: string) {
  if (!startDate && !endDate) return {}
  const tanggalFilter: Record<string, unknown> = {}
  if (startDate) tanggalFilter.gte = new Date(startDate)
  if (endDate) tanggalFilter.lte = new Date(endDate)
  return tanggalFilter
}

// ─── Main Export Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''
    const kodeAkun = searchParams.get('kodeAkun') || ''

    const validTypes = [
      'akun',
      'jurnal',
      'neraca',
      'laba-rugi',
      'neraca-saldo',
      'arus-kas',
      'buku-besar',
      'penjualan',
      'pembelian',
      'simpanan',
      'pinjaman',
      'persediaan',
      'pelanggan',
      'pemasok',
    ]

    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Tipe export tidak valid. Pilihan: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    const tenantId = session.tenantId
    const tenantName = session.tenantName || 'Perusahaan'
    const exportDate = formatDate(new Date())
    let csvContent = ''
    let filename = ''

    switch (type) {
      // ─── Chart of Accounts ─────────────────────────────────────────────
      case 'akun': {
        const data = await db.akun.findMany({
          where: { tenantId },
          orderBy: [{ kelompok: 'asc' }, { kodeAkun: 'asc' }],
        })
        filename = `akun_${formatDateISO(new Date())}.csv`
        const headerRows = [
          [`Laporan: Daftar Akun`],
          [`Perusahaan: ${tenantName}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'Kode Akun',
          'Nama Akun',
          'Tipe Akun',
          'Kelompok',
          'Saldo Awal',
          'Default',
        ]
        const rows = data.map((item) => [
          item.kodeAkun,
          item.namaAkun,
          item.tipeAkun,
          item.kelompok || '',
          formatCsvCurrency(item.saldoAwal),
          item.isDefault ? 'Ya' : 'Tidak',
        ])
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Journal Entries ───────────────────────────────────────────────
      case 'jurnal': {
        const dateFilter = buildDateFilter(startDate, endDate)
        const where: Record<string, unknown> = { tenantId }
        if (Object.keys(dateFilter).length > 0) {
          where.tanggal = dateFilter
        }

        const data = await db.jurnalUmum.findMany({
          where,
          orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
          include: {
            details: {
              orderBy: { debit: 'desc' },
            },
          },
        })
        filename = `jurnal_${formatDateISO(new Date())}.csv`
        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        const headerRows = [
          [`Laporan: Jurnal Umum`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'Tanggal',
          'Keterangan',
          'No Bukti',
          'Tipe',
          'Disetujui',
          'Kode Akun',
          'Debit',
          'Kredit',
          'Keterangan Detail',
        ]
        const rows: string[][] = []
        for (const j of data) {
          for (let i = 0; i < j.details.length; i++) {
            const d = j.details[i]
            rows.push([
              i === 0 ? formatDate(j.tanggal) : '',
              i === 0 ? j.keterangan || '' : '',
              i === 0 ? j.noBukti || '' : '',
              i === 0 ? j.tipe : '',
              i === 0 ? (j.isApproved ? 'Ya' : 'Tidak') : '',
              d.kodeAkun,
              formatCsvCurrency(d.debit),
              formatCsvCurrency(d.kredit),
              d.keterangan || '',
            ])
          }
        }
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Balance Sheet (Neraca) ────────────────────────────────────────
      case 'neraca': {
        const akunList = await db.akun.findMany({
          where: { tenantId, kelompok: 'Neraca' },
          orderBy: { kodeAkun: 'asc' },
        })

        const accountBalances = await Promise.all(
          akunList.map(async (akun) => {
            const saldo = await calculateAccountBalance(
              akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal,
              startDate, endDate
            )
            return { kodeAkun: akun.kodeAkun, namaAkun: akun.namaAkun, tipeAkun: akun.tipeAkun, saldo }
          })
        )

        // Also get laba ditahan
        const labaRugiAkun = await db.akun.findMany({
          where: { tenantId, kelompok: 'Laba Rugi' },
          orderBy: { kodeAkun: 'asc' },
        })
        const labaRugiBalances = await Promise.all(
          labaRugiAkun.map(async (akun) => {
            const saldo = await calculateAccountBalance(
              akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal,
              startDate, endDate
            )
            return { tipeAkun: akun.tipeAkun, saldo }
          })
        )

        const totalPendapatan = labaRugiBalances
          .filter((a) => a.tipeAkun.toLowerCase().includes('pendapatan'))
          .reduce((sum, a) => sum + a.saldo, 0)
        const totalBeban = Math.abs(labaRugiBalances
          .filter((a) => a.tipeAkun.toLowerCase().includes('beban'))
          .reduce((sum, a) => sum + a.saldo, 0))
        const totalHPP = Math.abs(labaRugiBalances
          .filter((a) => a.tipeAkun.toLowerCase().includes('hpp'))
          .reduce((sum, a) => sum + a.saldo, 0))
        const labaDitahan = totalPendapatan - totalBeban - totalHPP

        const asetItems = accountBalances.filter((a) =>
          isAssetAccount(a.tipeAkun)
        )
        const kewajibanItems = accountBalances.filter((a) => {
          const tipe = a.tipeAkun.toLowerCase()
          return tipe.includes('utang') && !tipe.includes('piutang')
        })
        const ekuitasItems = accountBalances.filter((a) =>
          a.tipeAkun.toLowerCase().includes('ekuitas')
        )

        const totalAset = asetItems.reduce((s, a) => s + a.saldo, 0)
        const totalKewajiban = kewajibanItems.reduce((s, a) => s + a.saldo, 0)
        const totalEkuitas = ekuitasItems.reduce((s, a) => s + a.saldo, 0)

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        filename = `neraca_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Neraca (Balance Sheet)`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]

        const rows: string[][] = []

        // ASET section
        rows.push(['ASET', '', ''])
        for (const item of asetItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Total Aset', formatCsvCurrency(totalAset)])
        rows.push(['', '', ''])

        // KEWAJIBAN section
        rows.push(['KEWAJIBAN', '', ''])
        for (const item of kewajibanItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Total Kewajiban', formatCsvCurrency(totalKewajiban)])
        rows.push(['', '', ''])

        // EKUITAS section
        rows.push(['EKUITAS', '', ''])
        for (const item of ekuitasItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Laba Ditahan', formatCsvCurrency(labaDitahan)])
        rows.push(['', 'Total Ekuitas + Laba Ditahan', formatCsvCurrency(totalEkuitas + labaDitahan)])
        rows.push(['', '', ''])
        rows.push(['', 'Total Kewajiban + Ekuitas', formatCsvCurrency(totalKewajiban + totalEkuitas + labaDitahan)])

        const headers = ['Kode Akun', 'Nama Akun', 'Jumlah']
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Income Statement (Laba Rugi) ─────────────────────────────────
      case 'laba-rugi': {
        const akunList = await db.akun.findMany({
          where: { tenantId, kelompok: 'Laba Rugi' },
          orderBy: { kodeAkun: 'asc' },
        })

        const accountBalances = await Promise.all(
          akunList.map(async (akun) => {
            const saldo = await calculateAccountBalance(
              akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal,
              startDate, endDate
            )
            return { kodeAkun: akun.kodeAkun, namaAkun: akun.namaAkun, tipeAkun: akun.tipeAkun, saldo }
          })
        )

        const pendapatanItems = accountBalances.filter((a) =>
          a.tipeAkun.toLowerCase().includes('pendapatan')
        )
        const hppItems = accountBalances.filter((a) =>
          a.tipeAkun.toLowerCase().includes('hpp')
        ).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))
        const bebanItems = accountBalances.filter((a) =>
          a.tipeAkun.toLowerCase().includes('beban')
        ).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))

        const totalPendapatan = pendapatanItems.reduce((s, a) => s + a.saldo, 0)
        const totalHPP = hppItems.reduce((s, a) => s + a.saldo, 0)
        const totalBeban = bebanItems.reduce((s, a) => s + a.saldo, 0)
        const labaKotor = totalPendapatan - totalHPP
        const labaBersih = labaKotor - totalBeban

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        filename = `laba-rugi_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Laba Rugi (Income Statement)`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]

        const rows: string[][] = []

        // PENDAPATAN
        rows.push(['PENDAPATAN', '', ''])
        for (const item of pendapatanItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Total Pendapatan', formatCsvCurrency(totalPendapatan)])
        rows.push(['', '', ''])

        // HPP
        rows.push(['HARGA POKOK PENJUALAN', '', ''])
        for (const item of hppItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Total HPP', formatCsvCurrency(totalHPP)])
        rows.push(['', '', ''])

        // LABA KOTOR
        rows.push(['', 'Laba Kotor', formatCsvCurrency(labaKotor)])
        rows.push(['', '', ''])

        // BEBAN
        rows.push(['BEBAN', '', ''])
        for (const item of bebanItems) {
          rows.push([`  ${item.kodeAkun}`, item.namaAkun, formatCsvCurrency(item.saldo)])
        }
        rows.push(['', 'Total Beban', formatCsvCurrency(totalBeban)])
        rows.push(['', '', ''])

        // LABA BERSIH
        rows.push(['', 'Laba Bersih', formatCsvCurrency(labaBersih)])

        const headers = ['Kode Akun', 'Nama Akun', 'Jumlah']
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Trial Balance (Neraca Saldo) ──────────────────────────────────
      case 'neraca-saldo': {
        const akunList = await db.akun.findMany({
          where: { tenantId },
          orderBy: { kodeAkun: 'asc' },
        })

        const accounts = await Promise.all(
          akunList.map(async (akun) => {
            const saldo = await calculateAccountBalance(
              akun.kodeAkun, tenantId, akun.tipeAkun, akun.saldoAwal,
              startDate, endDate
            )
            const debitNormal = isDebitNormal(akun.tipeAkun)
            let debit = 0
            let kredit = 0
            if (debitNormal) {
              if (saldo > 0) debit = saldo
              else if (saldo < 0) kredit = Math.abs(saldo)
            } else {
              if (saldo < 0) debit = Math.abs(saldo)
              else if (saldo > 0) kredit = saldo
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

        const nonZeroAccounts = accounts.filter((a) => a.debit !== 0 || a.kredit !== 0)
        const totalDebit = nonZeroAccounts.reduce((s, a) => s + a.debit, 0)
        const totalKredit = nonZeroAccounts.reduce((s, a) => s + a.kredit, 0)

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        filename = `neraca-saldo_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Neraca Saldo (Trial Balance)`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]

        const headers = [
          'Kode Akun',
          'Nama Akun',
          'Tipe Akun',
          'Saldo Awal',
          'Debit',
          'Kredit',
        ]
        const rows = nonZeroAccounts.map((a) => [
          a.kodeAkun,
          a.namaAkun,
          a.tipeAkun,
          formatCsvCurrency(a.saldoAwal),
          formatCsvCurrency(a.debit),
          formatCsvCurrency(a.kredit),
        ])
        rows.push(['', 'TOTAL', '', '', formatCsvCurrency(totalDebit), formatCsvCurrency(totalKredit)])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Cash Flow (Arus Kas) ─────────────────────────────────────────
      case 'arus-kas': {
        // Build the arus kas data similar to the arus-kas route
        const cashAccounts = await db.akun.findMany({
          where: { tenantId, tipeAkun: { contains: 'Kas' } },
        })
        const bankAccounts = await db.akun.findMany({
          where: { tenantId, tipeAkun: { contains: 'Bank' } },
        })
        const allCashAccounts = [...cashAccounts, ...bankAccounts]
        const cashAccountCodes = new Set(allCashAccounts.map((a) => a.kodeAkun))
        const saldoAwalKas = allCashAccounts.reduce((sum, a) => sum + a.saldoAwal, 0)

        const jurnalWhere: Record<string, unknown> = {
          tenantId,
          isApproved: true,
        }
        if (startDate || endDate) {
          jurnalWhere.tanggal = buildDateFilter(startDate, endDate)
        }

        const cashJournalDetails = await db.jurnalDetail.findMany({
          where: {
            kodeAkun: { in: Array.from(cashAccountCodes) },
            jurnal: jurnalWhere,
          },
          include: {
            jurnal: {
              select: { id: true, tanggal: true, keterangan: true, noBukti: true, tipe: true },
            },
          },
        })

        const allAccounts = await db.akun.findMany({ where: { tenantId } })
        const accountMap = new Map(allAccounts.map((a) => [a.kodeAkun, a]))

        const journalGroups = new Map<string, typeof cashJournalDetails>()
        for (const detail of cashJournalDetails) {
          const jurnalId = detail.jurnalId
          if (!journalGroups.has(jurnalId)) {
            journalGroups.set(jurnalId, [])
          }
          journalGroups.get(jurnalId)!.push(detail)
        }

        const operasiItems: { keterangan: string; jumlah: number }[] = []
        const investasiItems: { keterangan: string; jumlah: number }[] = []
        const pendanaanItems: { keterangan: string; jumlah: number }[] = []

        for (const [jurnalId, cashDetails] of journalGroups) {
          const allDetails = await db.jurnalDetail.findMany({ where: { jurnalId } })
          const journalInfo = cashDetails[0].jurnal

          let cashDebit = 0
          let cashKredit = 0
          for (const cd of cashDetails) {
            cashDebit += cd.debit
            cashKredit += cd.kredit
          }
          const netCashEffect = cashDebit - cashKredit

          const nonCashDetails = allDetails.filter((d) => !cashAccountCodes.has(d.kodeAkun))

          let category: 'operasi' | 'investasi' | 'pendanaan' = 'operasi'
          if (nonCashDetails.length > 0) {
            const hasAssetAccount = nonCashDetails.some((d) => {
              const acc = accountMap.get(d.kodeAkun)
              return acc && isAssetAccount(acc.tipeAkun) && !isCashAccount(acc.tipeAkun)
            })
            const hasFinancingAccount = nonCashDetails.some((d) => {
              const acc = accountMap.get(d.kodeAkun)
              return acc && (acc.tipeAkun.toLowerCase().includes('utang') || acc.tipeAkun.toLowerCase().includes('ekuitas'))
            })
            if (hasFinancingAccount) category = 'pendanaan'
            else if (hasAssetAccount) category = 'investasi'
          }

          const keterangan = journalInfo.keterangan || `Jurnal ${journalInfo.noBukti || jurnalId.slice(-6)}`
          const item = { keterangan, jumlah: Math.round(netCashEffect) }

          if (category === 'operasi') operasiItems.push(item)
          else if (category === 'investasi') investasiItems.push(item)
          else pendanaanItems.push(item)
        }

        // Calculate opening balance for period
        let saldoAwalPeriod = saldoAwalKas
        if (startDate) {
          const beforeCashDetails = await db.jurnalDetail.aggregate({
            _sum: { debit: true, kredit: true },
            where: {
              kodeAkun: { in: Array.from(cashAccountCodes) },
              jurnal: { tenantId, isApproved: true, tanggal: { lt: new Date(startDate) } },
            },
          })
          saldoAwalPeriod = Math.round(saldoAwalKas + (beforeCashDetails._sum.debit || 0) - (beforeCashDetails._sum.kredit || 0))
        }

        const totalOperasi = operasiItems.reduce((s, i) => s + i.jumlah, 0)
        const totalInvestasi = investasiItems.reduce((s, i) => s + i.jumlah, 0)
        const totalPendanaan = pendanaanItems.reduce((s, i) => s + i.jumlah, 0)
        const saldoAkhirKas = Math.round(saldoAwalPeriod + totalOperasi + totalInvestasi + totalPendanaan)

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        filename = `arus-kas_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Arus Kas (Cash Flow Statement)`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]

        const rows: string[][] = []
        rows.push([`Saldo Awal Kas`, formatCsvCurrency(saldoAwalPeriod)])
        rows.push(['', ''])
        rows.push(['AKTIVITAS OPERASI', ''])
        for (const item of operasiItems) {
          rows.push([`  ${item.keterangan}`, formatCsvCurrency(item.jumlah)])
        }
        rows.push(['Total Aktivitas Operasi', formatCsvCurrency(totalOperasi)])
        rows.push(['', ''])
        rows.push(['AKTIVITAS INVESTASI', ''])
        for (const item of investasiItems) {
          rows.push([`  ${item.keterangan}`, formatCsvCurrency(item.jumlah)])
        }
        rows.push(['Total Aktivitas Investasi', formatCsvCurrency(totalInvestasi)])
        rows.push(['', ''])
        rows.push(['AKTIVITAS PENDANAAN', ''])
        for (const item of pendanaanItems) {
          rows.push([`  ${item.keterangan}`, formatCsvCurrency(item.jumlah)])
        }
        rows.push(['Total Aktivitas Pendanaan', formatCsvCurrency(totalPendanaan)])
        rows.push(['', ''])
        rows.push(['Perubahan Kas', formatCsvCurrency(totalOperasi + totalInvestasi + totalPendanaan)])
        rows.push(['Saldo Akhir Kas', formatCsvCurrency(saldoAkhirKas)])

        const headers = ['Keterangan', 'Jumlah']
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── General Ledger (Buku Besar) ──────────────────────────────────
      case 'buku-besar': {
        if (!kodeAkun) {
          return NextResponse.json(
            { error: 'Parameter kodeAkun wajib diisi untuk export buku besar' },
            { status: 400 }
          )
        }

        const akun = await db.akun.findFirst({
          where: { tenantId, kodeAkun },
        })

        if (!akun) {
          return NextResponse.json(
            { error: 'Akun tidak ditemukan' },
            { status: 404 }
          )
        }

        const jurnalWhere: Record<string, unknown> = {
          tenantId,
          isApproved: true,
        }
        if (startDate || endDate) {
          jurnalWhere.tanggal = buildDateFilter(startDate, endDate)
        }

        const details = await db.jurnalDetail.findMany({
          where: { kodeAkun, jurnal: jurnalWhere },
          include: {
            jurnal: {
              select: { tanggal: true, noBukti: true, keterangan: true },
            },
          },
          orderBy: { jurnal: { tanggal: 'asc' } },
        })

        const sortedDetails = [...details].sort((a, b) => {
          const dateA = new Date(a.jurnal.tanggal).getTime()
          const dateB = new Date(b.jurnal.tanggal).getTime()
          if (dateA !== dateB) return dateA - dateB
          return a.jurnalId.localeCompare(b.jurnalId)
        })

        const isAsset = isAssetAccount(akun.tipeAkun)
        let runningBalance = akun.saldoAwal

        const entries = sortedDetails.map((detail) => {
          if (isAsset) runningBalance += detail.debit - detail.kredit
          else runningBalance += detail.kredit - detail.debit
          return {
            tanggal: detail.jurnal.tanggal,
            noBukti: detail.jurnal.noBukti,
            keterangan: detail.jurnal.keterangan || detail.keterangan,
            debit: detail.debit,
            kredit: detail.kredit,
            saldo: Math.round(runningBalance),
          }
        })

        const totalDebit = sortedDetails.reduce((s, d) => s + d.debit, 0)
        const totalKredit = sortedDetails.reduce((s, d) => s + d.kredit, 0)
        const saldoAkhir = isAsset
          ? Math.round(akun.saldoAwal + totalDebit - totalKredit)
          : Math.round(akun.saldoAwal + totalKredit - totalDebit)

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        filename = `buku-besar_${kodeAkun}_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Buku Besar (General Ledger)`],
          [`Perusahaan: ${tenantName}`],
          [`Akun: ${akun.kodeAkun} - ${akun.namaAkun} (${akun.tipeAkun})`],
          [`Periode: ${periodeText}`],
          [`Saldo Awal: ${formatCsvCurrency(akun.saldoAwal)}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]

        const headers = [
          'Tanggal',
          'No Bukti',
          'Keterangan',
          'Debit',
          'Kredit',
          'Saldo',
        ]
        const rows = entries.map((e) => [
          formatDate(e.tanggal),
          e.noBukti || '',
          e.keterangan || '',
          formatCsvCurrency(e.debit),
          formatCsvCurrency(e.kredit),
          formatCsvCurrency(e.saldo),
        ])
        rows.push(['', '', 'TOTAL', formatCsvCurrency(totalDebit), formatCsvCurrency(totalKredit), formatCsvCurrency(saldoAkhir)])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Sales (Penjualan) ─────────────────────────────────────────────
      case 'penjualan': {
        const dateFilter = buildDateFilter(startDate, endDate)
        const where: Record<string, unknown> = { tenantId }
        if (Object.keys(dateFilter).length > 0) {
          where.tanggalFaktur = dateFilter
        }

        const data = await db.penjualan.findMany({
          where,
          orderBy: [{ tanggalFaktur: 'desc' }, { createdAt: 'desc' }],
        })
        filename = `penjualan_${formatDateISO(new Date())}.csv`

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        const headerRows = [
          [`Laporan: Penjualan`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'No Faktur',
          'Tanggal Faktur',
          'Pelanggan ID',
          'Total',
          'Keterangan',
        ]
        const rows = data.map((item) => [
          item.noFaktur,
          formatDate(item.tanggalFaktur),
          item.pelangganId || '',
          formatCsvCurrency(item.total),
          item.keterangan || '',
        ])
        const grandTotal = data.reduce((s, i) => s + i.total, 0)
        rows.push(['', '', 'TOTAL', formatCsvCurrency(grandTotal), ''])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Purchases (Pembelian) ─────────────────────────────────────────
      case 'pembelian': {
        const dateFilter = buildDateFilter(startDate, endDate)
        const where: Record<string, unknown> = { tenantId }
        if (Object.keys(dateFilter).length > 0) {
          where.tanggalFaktur = dateFilter
        }

        const data = await db.pembelian.findMany({
          where,
          orderBy: [{ tanggalFaktur: 'desc' }, { createdAt: 'desc' }],
        })
        filename = `pembelian_${formatDateISO(new Date())}.csv`

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        const headerRows = [
          [`Laporan: Pembelian`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'No Faktur',
          'Tanggal Faktur',
          'Pemasok ID',
          'Total',
          'Keterangan',
        ]
        const rows = data.map((item) => [
          item.noFaktur,
          formatDate(item.tanggalFaktur),
          item.pemasokId || '',
          formatCsvCurrency(item.total),
          item.keterangan || '',
        ])
        const grandTotal = data.reduce((s, i) => s + i.total, 0)
        rows.push(['', '', 'TOTAL', formatCsvCurrency(grandTotal), ''])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Savings (Simpanan) ────────────────────────────────────────────
      case 'simpanan': {
        const dateFilter = buildDateFilter(startDate, endDate)
        const where: Record<string, unknown> = { tenantId }
        if (Object.keys(dateFilter).length > 0) {
          where.tanggal = dateFilter
        }

        const data = await db.simpanan.findMany({
          where,
          orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
        })
        filename = `simpanan_${formatDateISO(new Date())}.csv`

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        const headerRows = [
          [`Laporan: Simpanan`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'Jenis Simpanan',
          'Nama Anggota',
          'Jenis Transaksi',
          'Jumlah',
          'Tanggal',
          'Keterangan',
        ]
        const rows = data.map((item) => [
          item.jenisSimpanan,
          item.namaAnggota || '',
          item.jenisTransaksi,
          formatCsvCurrency(item.jumlah),
          formatDate(item.tanggal),
          item.keterangan || '',
        ])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Loans (Pinjaman) ──────────────────────────────────────────────
      case 'pinjaman': {
        const dateFilter = buildDateFilter(startDate, endDate)
        const where: Record<string, unknown> = { tenantId }
        if (Object.keys(dateFilter).length > 0) {
          where.tanggal = dateFilter
        }

        const data = await db.pinjaman.findMany({
          where,
          orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
        })
        filename = `pinjaman_${formatDateISO(new Date())}.csv`

        const periodeText = startDate && endDate
          ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
          : 'Seluruh Periode'
        const headerRows = [
          [`Laporan: Pinjaman`],
          [`Perusahaan: ${tenantName}`],
          [`Periode: ${periodeText}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'Jenis Pinjaman',
          'Nama Anggota',
          'Jumlah Pokok',
          'Sisa Pokok',
          'Bunga',
          'Status',
          'Tanggal',
          'Keterangan',
        ]
        const rows = data.map((item) => [
          item.jenisPinjaman,
          item.namaAnggota || '',
          formatCsvCurrency(item.jumlahPokok),
          formatCsvCurrency(item.sisaPokok),
          formatCsvCurrency(item.bunga),
          item.status,
          formatDate(item.tanggal),
          item.keterangan || '',
        ])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Inventory (Persediaan) ────────────────────────────────────────
      case 'persediaan': {
        const data = await db.persediaan.findMany({
          where: { tenantId },
          orderBy: [{ namaBarang: 'asc' }],
        })
        filename = `persediaan_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Persediaan`],
          [`Perusahaan: ${tenantName}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = [
          'Nama Barang',
          'Satuan',
          'Harga Beli',
          'Harga Jual',
          'Stok',
          'Nilai Persediaan',
        ]
        const rows = data.map((item) => [
          item.namaBarang,
          item.satuan || '',
          formatCsvCurrency(item.hargaBeli),
          formatCsvCurrency(item.hargaJual),
          String(item.stok),
          formatCsvCurrency(item.hargaBeli * item.stok),
        ])
        const totalNilai = data.reduce((s, i) => s + i.hargaBeli * i.stok, 0)
        rows.push(['', '', '', '', 'TOTAL NILAI', formatCsvCurrency(totalNilai)])

        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Customers (Pelanggan) ─────────────────────────────────────────
      case 'pelanggan': {
        const data = await db.pelanggan.findMany({
          where: { tenantId },
          orderBy: [{ nama: 'asc' }],
        })
        filename = `pelanggan_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Daftar Pelanggan`],
          [`Perusahaan: ${tenantName}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = ['Nama', 'Alamat', 'Telepon', 'Email']
        const rows = data.map((item) => [
          item.nama,
          item.alamat || '',
          item.telepon || '',
          item.email || '',
        ])
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }

      // ─── Suppliers (Pemasok) ───────────────────────────────────────────
      case 'pemasok': {
        const data = await db.pemasok.findMany({
          where: { tenantId },
          orderBy: [{ nama: 'asc' }],
        })
        filename = `pemasok_${formatDateISO(new Date())}.csv`

        const headerRows = [
          [`Laporan: Daftar Pemasok`],
          [`Perusahaan: ${tenantName}`],
          [`Tanggal Export: ${exportDate}`],
          [],
        ]
        const headers = ['Nama', 'Alamat', 'Telepon', 'Email']
        const rows = data.map((item) => [
          item.nama,
          item.alamat || '',
          item.telepon || '',
          item.email || '',
        ])
        csvContent = [...headerRows.map((r) => r.join(';')), rowsToCsv(headers, rows)].join('\n')
        break
      }
    }

    // Add BOM for proper UTF-8 encoding in Excel
    const bom = '\uFEFF'
    const csvWithBom = bom + csvContent

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
