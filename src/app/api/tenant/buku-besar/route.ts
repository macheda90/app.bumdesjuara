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

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const kodeAkun = searchParams.get('kodeAkun') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    if (!kodeAkun) {
      return NextResponse.json(
        { error: 'Parameter kodeAkun wajib diisi' },
        { status: 400 }
      )
    }

    const tenantId = session.tenantId

    // Get the account
    const akun = await db.akun.findFirst({
      where: {
        tenantId,
        kodeAkun,
      },
    })

    if (!akun) {
      return NextResponse.json(
        { error: 'Akun tidak ditemukan' },
        { status: 404 }
      )
    }

    // Build journal filter
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

    // Get all journal details for this account
    const details = await db.jurnalDetail.findMany({
      where: {
        kodeAkun,
        jurnal: jurnalWhere,
      },
      include: {
        jurnal: {
          select: {
            tanggal: true,
            noBukti: true,
            keterangan: true,
          },
        },
      },
      orderBy: {
        jurnal: {
          tanggal: 'asc',
        },
      },
    })

    // Sort by tanggal, then by createdAt equivalent (jurnal id for stability)
    const sortedDetails = [...details].sort((a, b) => {
      const dateA = new Date(a.jurnal.tanggal).getTime()
      const dateB = new Date(b.jurnal.tanggal).getTime()
      if (dateA !== dateB) return dateA - dateB
      return a.jurnalId.localeCompare(b.jurnalId)
    })

    const isAsset = isAssetAccount(akun.tipeAkun)
    let runningBalance = akun.saldoAwal

    const entries = sortedDetails.map((detail) => {
      if (isAsset) {
        runningBalance += detail.debit - detail.kredit
      } else {
        runningBalance += detail.kredit - detail.debit
      }

      return {
        tanggal: detail.jurnal.tanggal,
        noBukti: detail.jurnal.noBukti,
        keterangan: detail.jurnal.keterangan || detail.keterangan,
        debit: detail.debit,
        kredit: detail.kredit,
        saldo: Math.round(runningBalance),
      }
    })

    const totalDebit = sortedDetails.reduce((sum, d) => sum + d.debit, 0)
    const totalKredit = sortedDetails.reduce((sum, d) => sum + d.kredit, 0)

    // Calculate final saldo
    let saldoAkhir: number
    if (isAsset) {
      saldoAkhir = Math.round(akun.saldoAwal + totalDebit - totalKredit)
    } else {
      saldoAkhir = Math.round(akun.saldoAwal + totalKredit - totalDebit)
    }

    return NextResponse.json({
      akun: {
        kodeAkun: akun.kodeAkun,
        namaAkun: akun.namaAkun,
        tipeAkun: akun.tipeAkun,
        saldoAwal: akun.saldoAwal,
      },
      entries,
      totalDebit,
      totalKredit,
      saldoAkhir,
    })
  } catch (error) {
    console.error('Get buku besar error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
