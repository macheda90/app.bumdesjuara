import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const tenantId = session.tenantId

    // Get accounts summary by type
    const akunByType = await db.akun.findMany({
      where: { tenantId },
    })

    // Calculate totals by account type
    let totalKasBank = 0
    let totalPiutang = 0
    let totalUtang = 0
    let totalPersediaanValue = 0
    let totalPendapatan = 0
    let totalBeban = 0

    for (const akun of akunByType) {
      // Calculate running balance from journal entries
      const debitSum = await db.jurnalDetail.aggregate({
        _sum: { debit: true },
        where: {
          kodeAkun: akun.kodeAkun,
          jurnal: {
            tenantId,
            isApproved: true,
          },
        },
      })

      const kreditSum = await db.jurnalDetail.aggregate({
        _sum: { kredit: true },
        where: {
          kodeAkun: akun.kodeAkun,
          jurnal: {
            tenantId,
            isApproved: true,
          },
        },
      })

      const debit = debitSum._sum.debit || 0
      const kredit = kreditSum._sum.kredit || 0
      const saldoAwal = akun.saldoAwal || 0

      // Asset accounts: debit normal balance; Liability/Equity/Revenue: credit normal balance
      let balance = 0
      const tipe = akun.tipeAkun.toLowerCase()
      if (
        tipe.includes('kas') ||
        tipe.includes('bank') ||
        tipe.includes('piutang') ||
        tipe.includes('persediaan') ||
        tipe.includes('aset')
      ) {
        balance = saldoAwal + debit - kredit
      } else {
        balance = saldoAwal + kredit - debit
      }

      if (tipe.includes('kas') || tipe.includes('bank')) {
        totalKasBank += balance
      } else if (tipe.includes('piutang')) {
        totalPiutang += balance
      } else if (tipe.includes('utang')) {
        totalUtang += balance
      } else if (tipe.includes('pendapatan')) {
        totalPendapatan += balance
      } else if (tipe.includes('beban') || tipe.includes('hpp')) {
        totalBeban += Math.abs(balance) // Always store as positive value for expenses
      }
    }

    // Inventory value
    const persediaan = await db.persediaan.findMany({
      where: { tenantId },
    })
    totalPersediaanValue = persediaan.reduce(
      (sum, p) => sum + p.hargaBeli * p.stok,
      0
    )

    // Simpanan summary
    const simpananSetor = await db.simpanan.aggregate({
      _sum: { jumlah: true },
      where: { tenantId, jenisTransaksi: 'setor' },
    })
    const simpananTarik = await db.simpanan.aggregate({
      _sum: { jumlah: true },
      where: { tenantId, jenisTransaksi: 'tarik' },
    })
    const totalSimpanan = (simpananSetor._sum.jumlah || 0) - (simpananTarik._sum.jumlah || 0)

    // Pinjaman aktif
    const pinjamanAktif = await db.pinjaman.findMany({
      where: { tenantId, status: 'active' },
    })
    const totalPinjamanPokok = pinjamanAktif.reduce(
      (sum, p) => sum + p.jumlahPokok,
      0
    )
    const totalSisaPinjaman = pinjamanAktif.reduce(
      (sum, p) => sum + p.sisaPokok,
      0
    )

    // Penjualan vs Pembelian - last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const penjualan = await db.penjualan.findMany({
      where: {
        tenantId,
        tanggalFaktur: { gte: sixMonthsAgo },
      },
      orderBy: { tanggalFaktur: 'asc' },
    })

    const pembelian = await db.pembelian.findMany({
      where: {
        tenantId,
        tanggalFaktur: { gte: sixMonthsAgo },
      },
      orderBy: { tanggalFaktur: 'asc' },
    })

    // Group by month
    const monthlyData: Record<string, { penjualan: number; pembelian: number }> = {}
    for (const p of penjualan) {
      const key = p.tanggalFaktur.toISOString().slice(0, 7)
      if (!monthlyData[key]) monthlyData[key] = { penjualan: 0, pembelian: 0 }
      monthlyData[key].penjualan += p.total
    }
    for (const p of pembelian) {
      const key = p.tanggalFaktur.toISOString().slice(0, 7)
      if (!monthlyData[key]) monthlyData[key] = { penjualan: 0, pembelian: 0 }
      monthlyData[key].pembelian += p.total
    }

    const trendData = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        penjualan: data.penjualan,
        pembelian: data.pembelian,
      }))

    // Pendapatan vs Biaya trend
    const pendapatanVsBiaya = trendData.map((item) => ({
      month: item.month,
      pendapatan: item.penjualan * 0.7, // approximate
      biaya: item.pembelian * 0.8, // approximate
    }))

    // Recent transactions
    const recentJurnal = await db.jurnalUmum.findMany({
      where: { tenantId },
      orderBy: { tanggal: 'desc' },
      take: 5,
      include: { details: true },
    })

    return NextResponse.json({
      summary: {
        totalKasBank,
        totalPiutang,
        totalUtang,
        totalPersediaan: totalPersediaanValue,
        totalPendapatan,
        totalBeban,
      },
      simpanan: {
        totalSimpanan,
        totalSetor: simpananSetor._sum.jumlah || 0,
        totalTarik: simpananTarik._sum.jumlah || 0,
      },
      pinjaman: {
        jumlahAktif: pinjamanAktif.length,
        totalPokok: totalPinjamanPokok,
        totalSisa: totalSisaPinjaman,
      },
      trendData,
      pendapatanVsBiaya,
      recentTransactions: recentJurnal,
    })
  } catch (error) {
    console.error('Tenant dashboard error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
