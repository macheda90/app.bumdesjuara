import { NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

// ========== Helper Functions ==========
function formatDate(date: Date | string): string {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

function formatPdfCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

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
    where: { kodeAkun, jurnal: jurnalWhere },
  })
  const kreditSum = await db.jurnalDetail.aggregate({
    _sum: { kredit: true },
    where: { kodeAkun, jurnal: jurnalWhere },
  })

  const debit = debitSum._sum.debit || 0
  const kredit = kreditSum._sum.kredit || 0

  if (isDebitNormal(tipeAkun)) {
    return Math.round(saldoAwal + debit - kredit)
  } else {
    return Math.round(saldoAwal + kredit - debit)
  }
}

// ========== Advanced Table Drawing with Styling ==========
interface TableColumn {
  header: string
  width: number
  align?: 'left' | 'right' | 'center'
}

function drawStyledTable(
  doc: PDFKit.PDFDocument,
  columns: TableColumn[],
  rows: string[][],
  startX: number,
  startY: number,
  options: {
    rowHeight?: number
    headerBgColor?: string
    headerTextColor?: string
    alternateRowColor?: string
    borderColor?: string
    fontSize?: number
    headerFontSize?: number
  } = {}
): number {
  const {
    rowHeight = 22,
    headerBgColor = '#1e3a8a',
    headerTextColor = '#ffffff',
    alternateRowColor = '#f3f4f6',
    borderColor = '#d1d5db',
    fontSize = 9,
    headerFontSize = 10,
  } = options

  let y = startY
  const pageHeight = doc.page.height - 60
  const tableWidth = columns.reduce((s, c) => s + c.width, 0)

  const drawHeader = (yPos: number) => {
    let x = startX
    doc.rect(startX, yPos, tableWidth, rowHeight).fill(headerBgColor)
    doc.fillColor(headerTextColor)
    doc.fontSize(headerFontSize).font('Helvetica-Bold')
    for (const col of columns) {
      doc.text(col.header, x + 4, yPos + 6, {
        width: col.width - 8,
        align: col.align || 'left',
        lineBreak: false,
      })
      x += col.width
    }
    doc.fillColor('black')
    doc.moveTo(startX, yPos + rowHeight).lineTo(startX + tableWidth, yPos + rowHeight).stroke(borderColor)
  }

  if (y + rowHeight > pageHeight) {
    // add footer before adding page
    doc.addPage()
    y = 50
  }
  drawHeader(y)
  y += rowHeight

  let rowIndex = 0
  for (const row of rows) {
    if (y + rowHeight > pageHeight) {
      doc.addPage()
      y = 50
      drawHeader(y)
      y += rowHeight
    }

    if (alternateRowColor && rowIndex % 2 === 1) {
      doc.rect(startX, y, tableWidth, rowHeight).fill(alternateRowColor)
    }

    let x = startX
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i]
      let cellText = row[i] || ''
      let isBold = false
      if (cellText.startsWith('**') && cellText.endsWith('**')) {
        isBold = true
        cellText = cellText.slice(2, -2)
      }
      doc.fillColor('black')
      if (isBold) doc.font('Helvetica-Bold')
      else doc.font('Helvetica')
      doc.text(cellText, x + 4, y + 6, {
        width: col.width - 8,
        align: col.align || 'left',
        lineBreak: false,
      })
      x += col.width
    }

    doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).stroke(borderColor)
    y += rowHeight
    rowIndex++
  }

  return y
}

// ========== Styled Information Box ==========
function drawInfoBox(
  doc: PDFKit.PDFDocument,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  options: {
    bgColor?: string
    borderColor?: string
    textColor?: string
    valueColor?: string
    fontSize?: number
    valueFontSize?: number
  } = {}
): number {
  const {
    bgColor = '#f0fdf4',
    borderColor = '#22c55e',
    textColor = '#166534',
    valueColor = '#15803d',
    fontSize = 10,
    valueFontSize = 14,
  } = options

  const height = 50
  doc.rect(x, y, width, height).fill(bgColor)
  doc.rect(x, y, width, height).stroke(borderColor)
  doc.fillColor(textColor).fontSize(fontSize).font('Helvetica-Bold')
  doc.text(label, x + 10, y + 12)
  doc.fillColor(valueColor).fontSize(valueFontSize).font('Helvetica-Bold')
  doc.text(value, x + 10, y + 28)
  return y + height + 10
}

// ========== Report Header (narrower top margin) ==========
function drawReportHeader(
  doc: PDFKit.PDFDocument,
  title: string,
  tenantName: string,
  periodeText: string,
  printDate: string
) {
  const pageWidth = doc.page.width
  const startY = 35

  doc.fontSize(18).font('Helvetica-Bold').fillColor('#1f2937')
  doc.text(tenantName, 0, startY, { align: 'center', width: pageWidth })
  doc.fontSize(14).fillColor('#4b5563')
  doc.text(title, 0, startY + 25, { align: 'center', width: pageWidth })

  doc.moveTo(40, startY + 45).lineTo(pageWidth - 40, startY + 45).stroke('#9ca3af')

  doc.fontSize(9).fillColor('#6b7280')
  doc.text(`Periode: ${periodeText}`, 0, startY + 55, { align: 'center', width: pageWidth })
  doc.text(`Tanggal Cetak: ${printDate}`, 0, startY + 70, { align: 'center', width: pageWidth })

  doc.fillColor('black')
  return startY + 90
}

// ========== Page Footer (fixed – no overflow) ==========
function addPageFooter(doc: PDFKit.PDFDocument, tenantName: string) {
  const pages = doc.bufferedPageRange()
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i)
    const bottomY = doc.page.height - 25      // fixed from bottom
    const leftMargin = 40
    const rightMargin = 40
    const rightTextWidth = 80                 // enough for "Halaman 99 dari 99"
    const leftTextWidth = doc.page.width - leftMargin - rightMargin - rightTextWidth

    doc.fontSize(7).font('Helvetica')
    doc.fillColor('#9ca3af')

    const leftText = `Dicetak oleh BumdesJuara • ${tenantName} • ${formatDate(new Date())} --- Halaman ${i + 1} dari ${pages.count}`
    doc.text(leftText, leftMargin, bottomY, {
      width: leftTextWidth,
      align: 'left',
      lineBreak: false,
    })
    doc.fillColor('black')
  }
}

// ========== Main Handler ==========
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

    const validTypes = ['neraca', 'laba-rugi', 'neraca-saldo', 'arus-kas']
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Tipe export PDF tidak valid. Pilihan: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    const tenantId = session.tenantId
    const tenantName = session.tenantName || 'Perusahaan'
    const periodeText = startDate && endDate
      ? `${formatDate(startDate)} s/d ${formatDate(endDate)}`
      : 'Seluruh Periode'
    const printDate = formatDate(new Date())

    // Use landscape for Neraca Saldo (Trial Balance)
    const isLandscape = type === 'neraca-saldo'
    const doc = new PDFDocument({
      size: 'A4',
      layout: isLandscape ? 'landscape' : 'portrait',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
      bufferPages: true,
      info: {
        Title: `Laporan ${type} - ${tenantName}`,
        Author: 'BumdesJuara',
        Subject: `Laporan ${type}`,
      },
    })

    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))

    // ========== Generate Report ==========
    switch (type) {
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
        const totalPendapatan = labaRugiBalances.filter((a) => a.tipeAkun.toLowerCase().includes('pendapatan')).reduce((s, a) => s + a.saldo, 0)
        const totalBeban = Math.abs(labaRugiBalances.filter((a) => a.tipeAkun.toLowerCase().includes('beban')).reduce((s, a) => s + a.saldo, 0))
        const totalHPP = Math.abs(labaRugiBalances.filter((a) => a.tipeAkun.toLowerCase().includes('hpp')).reduce((s, a) => s + a.saldo, 0))
        const labaDitahan = totalPendapatan - totalBeban - totalHPP

        const asetItems = accountBalances.filter((a) => isAssetAccount(a.tipeAkun))
        const kewajibanItems = accountBalances.filter((a) => {
          const tipe = a.tipeAkun.toLowerCase()
          return tipe.includes('utang') && !tipe.includes('piutang')
        })
        const ekuitasItems = accountBalances.filter((a) => a.tipeAkun.toLowerCase().includes('ekuitas'))

        const totalAset = asetItems.reduce((s, a) => s + a.saldo, 0)
        const totalKewajiban = kewajibanItems.reduce((s, a) => s + a.saldo, 0)
        const totalEkuitas = ekuitasItems.reduce((s, a) => s + a.saldo, 0)
        const totalLiabilitasEkuitas = totalKewajiban + totalEkuitas + labaDitahan

        let y = drawReportHeader(doc, 'NERACA (Balance Sheet)', tenantName, periodeText, printDate)
        y += 10

        // ASET
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#065f46').text('ASET', 40, y, { underline: true })
        y += 20
        const asetRows = asetItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        asetRows.push(['', '**TOTAL ASET**', `**${formatPdfCurrency(totalAset)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: isLandscape ? 400 : 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], asetRows, 40, y, { headerBgColor: '#065f46', alternateRowColor: '#ecfdf5' })

        y += 15

        // KEWAJIBAN
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#92400e').text('KEWAJIBAN', 40, y, { underline: true })
        y += 20
        const kewajibanRows = kewajibanItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        kewajibanRows.push(['', '**TOTAL KEWAJIBAN**', `**${formatPdfCurrency(totalKewajiban)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: isLandscape ? 400 : 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], kewajibanRows, 40, y, { headerBgColor: '#92400e', alternateRowColor: '#fffbeb' })

        y += 15

        // EKUITAS
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e3a8a').text('EKUITAS', 40, y, { underline: true })
        y += 20
        const ekuitasRows = ekuitasItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        ekuitasRows.push(['', '**Laba Ditahan**', `**${formatPdfCurrency(labaDitahan)}**`])
        ekuitasRows.push(['', '**TOTAL EKUITAS + LABA DITAHAN**', `**${formatPdfCurrency(totalEkuitas + labaDitahan)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: isLandscape ? 400 : 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], ekuitasRows, 40, y, { headerBgColor: '#1e3a8a', alternateRowColor: '#eff6ff' })

        y += 20

        if (Math.abs(totalAset - totalLiabilitasEkuitas) < 1000) {
          drawInfoBox(doc, 'TOTAL KEWAJIBAN + EKUITAS', formatPdfCurrency(totalLiabilitasEkuitas), 40, y, 200, {
            bgColor: '#dcfce7', borderColor: '#22c55e', textColor: '#166534', valueColor: '#15803d'
          })
          drawInfoBox(doc, 'TOTAL ASET', formatPdfCurrency(totalAset), doc.page.width - 240, y, 200, {
            bgColor: '#dcfce7', borderColor: '#22c55e', textColor: '#166534', valueColor: '#15803d'
          })
        } else {
          doc.fontSize(10).fillColor('#b91c1c').text('⚠️ NERACA TIDAK SEIMBANG', 40, y, { align: 'center' })
        }
        break
      }

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

        const pendapatanItems = accountBalances.filter((a) => a.tipeAkun.toLowerCase().includes('pendapatan'))
        const hppItems = accountBalances.filter((a) => a.tipeAkun.toLowerCase().includes('hpp')).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))
        const bebanItems = accountBalances.filter((a) => a.tipeAkun.toLowerCase().includes('beban')).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))

        const totalPendapatan = pendapatanItems.reduce((s, a) => s + a.saldo, 0)
        const totalHPP = hppItems.reduce((s, a) => s + a.saldo, 0)
        const totalBeban = bebanItems.reduce((s, a) => s + a.saldo, 0)
        const labaKotor = totalPendapatan - totalHPP
        const labaBersih = labaKotor - totalBeban

        let y = drawReportHeader(doc, 'LAPORAN LABA RUGI (Income Statement)', tenantName, periodeText, printDate)
        y += 10

        // PENDAPATAN
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#065f46').text('PENDAPATAN', 40, y, { underline: true })
        y += 20
        const pendapatanRows = pendapatanItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        pendapatanRows.push(['', '**TOTAL PENDAPATAN**', `**${formatPdfCurrency(totalPendapatan)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], pendapatanRows, 40, y, { headerBgColor: '#065f46', alternateRowColor: '#ecfdf5' })

        y += 15

        // HPP
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#b45309').text('HARGA POKOK PENJUALAN (HPP)', 40, y, { underline: true })
        y += 20
        const hppRows = hppItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        hppRows.push(['', '**TOTAL HPP**', `**${formatPdfCurrency(totalHPP)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], hppRows, 40, y, { headerBgColor: '#b45309', alternateRowColor: '#fff7ed' })

        y += 15

        const labaKotorColor = labaKotor >= 0 ? '#22c55e' : '#ef4444'
        const labaKotorBg = labaKotor >= 0 ? '#f0fdf4' : '#fef2f2'
        y = drawInfoBox(doc, 'LABA KOTOR', formatPdfCurrency(labaKotor), 40, y, 220, {
          bgColor: labaKotorBg, borderColor: labaKotorColor, textColor: '#1f2937', valueColor: labaKotorColor
        })

        // BEBAN
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#dc2626').text('BEBAN', 40, y, { underline: true })
        y += 20
        const bebanRows = bebanItems.map((item) => [item.kodeAkun, item.namaAkun, formatPdfCurrency(item.saldo)])
        bebanRows.push(['', '**TOTAL BEBAN**', `**${formatPdfCurrency(totalBeban)}**`])
        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: 80 },
          { header: 'Nama Akun', width: 280 },
          { header: 'Jumlah', width: 140, align: 'right' },
        ], bebanRows, 40, y, { headerBgColor: '#dc2626', alternateRowColor: '#fef2f2' })

        y += 15

        const labaBersihColor = labaBersih >= 0 ? '#15803d' : '#b91c1c'
        const labaBersihBg = labaBersih >= 0 ? '#dcfce7' : '#fee2e2'
        const boxX = (doc.page.width - 300) / 2
        drawInfoBox(doc, labaBersih >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH', formatPdfCurrency(Math.abs(labaBersih)), boxX, y, 300, {
          bgColor: labaBersihBg, borderColor: labaBersihColor, textColor: '#1f2937', valueColor: labaBersihColor, fontSize: 12, valueFontSize: 18
        })
        break
      }

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
            let debit = 0, kredit = 0
            if (debitNormal) {
              if (saldo > 0) debit = saldo
              else if (saldo < 0) kredit = Math.abs(saldo)
            } else {
              if (saldo < 0) debit = Math.abs(saldo)
              else if (saldo > 0) kredit = saldo
            }
            return { kodeAkun: akun.kodeAkun, namaAkun: akun.namaAkun, tipeAkun: akun.tipeAkun, saldoAwal: akun.saldoAwal, debit, kredit }
          })
        )

        const nonZeroAccounts = accounts.filter((a) => a.debit !== 0 || a.kredit !== 0)
        const totalDebit = nonZeroAccounts.reduce((s, a) => s + a.debit, 0)
        const totalKredit = nonZeroAccounts.reduce((s, a) => s + a.kredit, 0)

        // --- Dynamic column widths to fill the page ---
        const leftMargin = 40
        const rightMargin = 40
        const pageWidth = doc.page.width
        const availableWidth = pageWidth - leftMargin - rightMargin   // ~761 in landscape A4

        // Base widths for fixed columns
        const colKode = 70
        const colTipe = 100
        const colSaldoAwal = 80
        const colDebit = 80
        const colKredit = 80
        const fixedTotal = colKode + colTipe + colSaldoAwal + colDebit + colKredit  // = 410

        // Remaining width goes to Nama Akun column
        const colNama = availableWidth - fixedTotal   // ~761 - 410 = 351

        let y = drawReportHeader(doc, 'NERACA SALDO (Trial Balance)', tenantName, periodeText, printDate)
        y += 10

        const rows = nonZeroAccounts.map((a) => [
          a.kodeAkun, a.namaAkun, a.tipeAkun,
          formatPdfCurrency(a.saldoAwal),
          formatPdfCurrency(a.debit),
          formatPdfCurrency(a.kredit),
        ])
        rows.push(['', '**TOTAL**', '', '', `**${formatPdfCurrency(totalDebit)}**`, `**${formatPdfCurrency(totalKredit)}**`])

        y = drawStyledTable(doc, [
          { header: 'Kode Akun', width: colKode },
          { header: 'Nama Akun', width: colNama },
          { header: 'Tipe Akun', width: colTipe },
          { header: 'Saldo Awal', width: colSaldoAwal, align: 'right' },
          { header: 'Debit', width: colDebit, align: 'right' },
          { header: 'Kredit', width: colKredit, align: 'right' },
        ], rows, leftMargin, y, { headerBgColor: '#4b5563', alternateRowColor: '#f9fafb' })

        y += 20
        const seimbang = totalDebit === totalKredit
        doc.fontSize(10).font('Helvetica-Bold').fillColor(seimbang ? '#15803d' : '#b91c1c')
        doc.text(seimbang ? '✓ NERACA SALDO SEIMBANG' : '✗ NERACA SALDO TIDAK SEIMBANG', leftMargin, y, { align: 'center' })
        break
      }

      case 'arus-kas': {
        const cashAccounts = await db.akun.findMany({ where: { tenantId, tipeAkun: { contains: 'Kas' } } })
        const bankAccounts = await db.akun.findMany({ where: { tenantId, tipeAkun: { contains: 'Bank' } } })
        const allCashAccounts = [...cashAccounts, ...bankAccounts]
        const cashAccountCodes = new Set(allCashAccounts.map((a) => a.kodeAkun))
        const saldoAwalKas = allCashAccounts.reduce((sum, a) => sum + a.saldoAwal, 0)

        const jurnalWhere: Record<string, unknown> = { tenantId, isApproved: true }
        if (startDate || endDate) {
          jurnalWhere.tanggal = {}
          if (startDate) (jurnalWhere.tanggal as Record<string, unknown>).gte = new Date(startDate)
          if (endDate) (jurnalWhere.tanggal as Record<string, unknown>).lte = new Date(endDate)
        }

        const cashJournalDetails = await db.jurnalDetail.findMany({
          where: { kodeAkun: { in: Array.from(cashAccountCodes) }, jurnal: jurnalWhere },
          include: { jurnal: { select: { id: true, tanggal: true, keterangan: true, noBukti: true, tipe: true } } },
        })

        const allAccounts = await db.akun.findMany({ where: { tenantId } })
        const accountMap = new Map(allAccounts.map((a) => [a.kodeAkun, a]))

        const journalGroups = new Map<string, typeof cashJournalDetails>()
        for (const detail of cashJournalDetails) {
          if (!journalGroups.has(detail.jurnalId)) journalGroups.set(detail.jurnalId, [])
          journalGroups.get(detail.jurnalId)!.push(detail)
        }

        // Store items with date, description, amount
        const operasiItems: { tanggal: string; keterangan: string; jumlah: number }[] = []
        const investasiItems: { tanggal: string; keterangan: string; jumlah: number }[] = []
        const pendanaanItems: { tanggal: string; keterangan: string; jumlah: number }[] = []

        for (const [jurnalId, cashDetails] of journalGroups) {
          const allDetails = await db.jurnalDetail.findMany({ where: { jurnalId } })
          const journalInfo = cashDetails[0].jurnal
          let cashDebit = 0, cashKredit = 0
          for (const cd of cashDetails) { cashDebit += cd.debit; cashKredit += cd.kredit }
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

          const tanggal = journalInfo.tanggal ? formatDate(journalInfo.tanggal) : '-'
          const keterangan = journalInfo.keterangan || `Jurnal ${journalInfo.noBukti || jurnalId.slice(-6)}`
          const item = { tanggal, keterangan, jumlah: Math.round(netCashEffect) }
          if (category === 'operasi') operasiItems.push(item)
          else if (category === 'investasi') investasiItems.push(item)
          else pendanaanItems.push(item)
        }

        let saldoAwalPeriod = saldoAwalKas
        if (startDate) {
          const beforeCashDetails = await db.jurnalDetail.aggregate({
            _sum: { debit: true, kredit: true },
            where: { kodeAkun: { in: Array.from(cashAccountCodes) }, jurnal: { tenantId, isApproved: true, tanggal: { lt: new Date(startDate) } } },
          })
          saldoAwalPeriod = Math.round(saldoAwalKas + (beforeCashDetails._sum.debit || 0) - (beforeCashDetails._sum.kredit || 0))
        }

        const totalOperasi = operasiItems.reduce((s, i) => s + i.jumlah, 0)
        const totalInvestasi = investasiItems.reduce((s, i) => s + i.jumlah, 0)
        const totalPendanaan = pendanaanItems.reduce((s, i) => s + i.jumlah, 0)
        const saldoAkhirKas = Math.round(saldoAwalPeriod + totalOperasi + totalInvestasi + totalPendanaan)

        let y = drawReportHeader(doc, 'LAPORAN ARUS KAS (Cash Flow Statement)', tenantName, periodeText, printDate)
        y += 10

        y = drawInfoBox(doc, 'SALDO AWAL KAS', formatPdfCurrency(saldoAwalPeriod), 40, y, 220, {
          bgColor: '#e0e7ff', borderColor: '#6366f1', textColor: '#1e1b4b', valueColor: '#4338ca'
        })

        // --- Column definitions with date column added ---
        // Available width: page width - margins (80) = e.g., 761 in landscape, 495 in portrait
        const leftMargin = 40
        const rightMargin = 40
        const pageWidth = doc.page.width
        const availableWidth = pageWidth - leftMargin - rightMargin
        const colDate = 70          // width for date (dd/mm/yyyy)
        const colDesc = availableWidth - colDate - 140   // 140 for amount column
        const colAmount = 140

        const tableColumns = [
          { header: 'Tanggal', width: colDate },
          { header: 'Keterangan', width: colDesc },
          { header: 'Jumlah', width: colAmount, align: 'right' as const },
        ]

        // --- AKTIVITAS OPERASI ---
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#0e7a6e').text('AKTIVITAS OPERASI', 40, y, { underline: true })
        y += 20
        const operasiRows = operasiItems.map((item) => [item.tanggal, item.keterangan, formatPdfCurrency(item.jumlah)])
        operasiRows.push(['', '**TOTAL AKTIVITAS OPERASI**', `**${formatPdfCurrency(totalOperasi)}**`])
        y = drawStyledTable(doc, tableColumns, operasiRows, leftMargin, y, {
          headerBgColor: '#0e7a6e', alternateRowColor: '#f0fdfa'
        })
        y += 15

        // --- AKTIVITAS INVESTASI ---
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#b45309').text('AKTIVITAS INVESTASI', 40, y, { underline: true })
        y += 20
        const investasiRows = investasiItems.map((item) => [item.tanggal, item.keterangan, formatPdfCurrency(item.jumlah)])
        investasiRows.push(['', '**TOTAL AKTIVITAS INVESTASI**', `**${formatPdfCurrency(totalInvestasi)}**`])
        y = drawStyledTable(doc, tableColumns, investasiRows, leftMargin, y, {
          headerBgColor: '#b45309', alternateRowColor: '#fff7ed'
        })
        y += 15

        // --- AKTIVITAS PENDANAAN ---
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e3a8a').text('AKTIVITAS PENDANAAN', 40, y, { underline: true })
        y += 20
        const pendanaanRows = pendanaanItems.map((item) => [item.tanggal, item.keterangan, formatPdfCurrency(item.jumlah)])
        pendanaanRows.push(['', '**TOTAL AKTIVITAS PENDANAAN**', `**${formatPdfCurrency(totalPendanaan)}**`])
        y = drawStyledTable(doc, tableColumns, pendanaanRows, leftMargin, y, {
          headerBgColor: '#1e3a8a', alternateRowColor: '#eff6ff'
        })
        y += 15

        const perubahanKas = totalOperasi + totalInvestasi + totalPendanaan
        const perubahanColor = perubahanKas >= 0 ? '#16a34a' : '#dc2626'
        const perubahanBg = perubahanKas >= 0 ? '#f0fdf4' : '#fef2f2'
        y = drawInfoBox(doc, 'PERUBAHAN KAS', formatPdfCurrency(perubahanKas), 40, y, 220, {
          bgColor: perubahanBg, borderColor: perubahanColor, textColor: '#1f2937', valueColor: perubahanColor
        })

        const akhirColor = '#166534'
        const akhirBg = '#dcfce7'
        const akhirX = (doc.page.width - 260) / 2
        drawInfoBox(doc, 'SALDO AKHIR KAS', formatPdfCurrency(saldoAkhirKas), akhirX, y, 260, {
          bgColor: akhirBg, borderColor: akhirColor, textColor: '#1f2937', valueColor: akhirColor, fontSize: 12, valueFontSize: 18
        })
        break
      }
    }

    // addPageFooter(doc, tenantName)
    doc.end()

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
    })

    const filenameMap: Record<string, string> = {
      'neraca': 'neraca',
      'laba-rugi': 'laba-rugi',
      'neraca-saldo': 'neraca-saldo',
      'arus-kas': 'arus-kas',
    }
    const filename = `${filenameMap[type]}_${new Date().toISOString().slice(0, 10)}.pdf`

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('PDF Export error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}