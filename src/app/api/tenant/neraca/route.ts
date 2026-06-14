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

    // Get all NERACA accounts for this tenant
    const akunList = await db.akun.findMany({
      where: {
        tenantId,
        kelompok: 'Neraca',
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
    const asetItems = accountBalances.filter(
      (a) =>
        a.tipeAkun.toLowerCase().includes('kas') ||
        a.tipeAkun.toLowerCase().includes('bank') ||
        a.tipeAkun.toLowerCase().includes('piutang') ||
        a.tipeAkun.toLowerCase().includes('persediaan') ||
        a.tipeAkun.toLowerCase().includes('aset')
    )

    const kewajibanItems = accountBalances.filter((a) => {
      const tipe = a.tipeAkun.toLowerCase()
      return tipe.includes('utang') && !tipe.includes('piutang')
    })

    const ekuitasItems = accountBalances.filter((a) =>
      a.tipeAkun.toLowerCase().includes('ekuitas')
    )

    // Calculate LABA DITAHAN from LABA RUGI accounts
    const labaRugiAkun = await db.akun.findMany({
      where: {
        tenantId,
        kelompok: 'Laba Rugi',
      },
      orderBy: { kodeAkun: 'asc' },
    })

    const labaRugiBalances = await Promise.all(
      labaRugiAkun.map(async (akun) => {
        const saldo = await calculateAccountBalance(
          akun.kodeAkun,
          tenantId,
          akun.tipeAkun,
          akun.saldoAwal
        )
        return {
          tipeAkun: akun.tipeAkun,
          saldo,
        }
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

    const totalAset = asetItems.reduce((sum, a) => sum + a.saldo, 0)
    const totalKewajiban = kewajibanItems.reduce((sum, a) => sum + a.saldo, 0)
    const totalEkuitas = ekuitasItems.reduce((sum, a) => sum + a.saldo, 0)
    const totalKewajibanEkuitas = totalKewajiban + totalEkuitas + labaDitahan

    // Format periode
    let periode = 'Seluruh Periode'
    if (startDate && endDate) {
      periode = `${startDate} s/d ${endDate}`
    }

    return NextResponse.json({
      periode,
      aset: {
        items: asetItems,
        total: totalAset,
      },
      kewajiban: {
        items: kewajibanItems,
        total: totalKewajiban,
      },
      ekuitas: {
        items: ekuitasItems,
        total: totalEkuitas,
      },
      labaDitahan,
      totalKewajibanEkuitas,
    })
  } catch (error) {
    console.error('Get neraca error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
