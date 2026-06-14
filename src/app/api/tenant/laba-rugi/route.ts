import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

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

async function calculateAccountBalance(
  kodeAkun: string,
  tenantId: string,
  tipeAkun: string,
  saldoAwal: number
): Promise<number> {
  const debitSum = await db.jurnalDetail.aggregate({
    _sum: { debit: true },
    where: {
      kodeAkun,
      jurnal: {
        tenantId,
        isApproved: true,
      },
    },
  })

  const kreditSum = await db.jurnalDetail.aggregate({
    _sum: { kredit: true },
    where: {
      kodeAkun,
      jurnal: {
        tenantId,
        isApproved: true,
      },
    },
  })

  const debit = debitSum._sum.debit || 0
  const kredit = kreditSum._sum.kredit || 0

  if (isAssetAccount(tipeAkun)) {
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

    // Get all LABA RUGI accounts for this tenant
    const akunList = await db.akun.findMany({
      where: {
        tenantId,
        kelompok: 'Laba Rugi',
      },
      orderBy: { kodeAkun: 'asc' },
    })

    // Calculate balance for each account
    const accountBalances = await Promise.all(
      akunList.map(async (akun) => {
        const saldo = await calculateAccountBalance(
          akun.kodeAkun,
          tenantId,
          akun.tipeAkun,
          akun.saldoAwal
        )
        return {
          kodeAkun: akun.kodeAkun,
          namaAkun: akun.namaAkun,
          tipeAkun: akun.tipeAkun,
          saldo,
        }
      })
    )

    // Group accounts
    const pendapatanItems = accountBalances.filter((a) =>
      a.tipeAkun.toLowerCase().includes('pendapatan')
    )

    const hppItems = accountBalances.filter((a) =>
      a.tipeAkun.toLowerCase().includes('hpp')
    ).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))

    const bebanItems = accountBalances.filter((a) =>
      a.tipeAkun.toLowerCase().includes('beban')
    ).map((a) => ({ ...a, saldo: Math.abs(a.saldo) }))

    const totalPendapatan = pendapatanItems.reduce((sum, a) => sum + a.saldo, 0)
    const totalHPP = Math.abs(hppItems.reduce((sum, a) => sum + a.saldo, 0))
    const totalBeban = Math.abs(bebanItems.reduce((sum, a) => sum + a.saldo, 0))
    const labaKotor = totalPendapatan - totalHPP
    const labaBersih = labaKotor - totalBeban

    // Format periode
    let periode = 'Seluruh Periode'
    if (startDate && endDate) {
      periode = `${startDate} s/d ${endDate}`
    }

    return NextResponse.json({
      periode,
      pendapatan: {
        items: pendapatanItems,
        total: totalPendapatan,
      },
      hpp: {
        items: hppItems,
        total: totalHPP,
      },
      labaKotor,
      beban: {
        items: bebanItems,
        total: totalBeban,
      },
      labaBersih,
    })
  } catch (error) {
    console.error('Get laba rugi error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
