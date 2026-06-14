import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const tipe = searchParams.get('tipe') || ''
    const approvalStatus = searchParams.get('approvalStatus') || ''

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      tenantId: session.tenantId,
    }

    if (tipe && tipe !== 'semua') {
      where.tipe = tipe
    }

    if (approvalStatus === 'approved') {
      where.isApproved = true
    } else if (approvalStatus === 'rejected') {
      where.isApproved = false
    } else if (approvalStatus === 'pending') {
      where.isApproved = null
    }

    const [jurnal, total] = await Promise.all([
      db.jurnalUmum.findMany({
        where,
        orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        include: {
          details: {
            orderBy: { debit: 'desc' },
          },
        },
      }),
      db.jurnalUmum.count({ where }),
    ])

    const formatted = jurnal.map((j) => ({
      id: j.id,
      tanggal: j.tanggal,
      keterangan: j.keterangan,
      noBukti: j.noBukti,
      tipe: j.tipe,
      isApproved: j.isApproved,
      createdAt: j.createdAt,
      details: j.details.map((d) => ({
        id: d.id,
        kodeAkun: d.kodeAkun,
        debit: d.debit,
        kredit: d.kredit,
        keterangan: d.keterangan,
      })),
      totalDebit: j.details.reduce((s, d) => s + d.debit, 0),
      totalKredit: j.details.reduce((s, d) => s + d.kredit, 0),
    }))

    return NextResponse.json({
      jurnal: formatted,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get tenant jurnal error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { tanggal, keterangan, noBukti, tipe, details } = body

    // Validate required fields
    if (!tanggal) {
      return NextResponse.json(
        { error: 'Tanggal wajib diisi' },
        { status: 400 }
      )
    }

    if (!details || !Array.isArray(details) || details.length === 0) {
      return NextResponse.json(
        { error: 'Detail jurnal wajib diisi' },
        { status: 400 }
      )
    }

    // Validate each detail has kodeAkun
    for (const detail of details) {
      if (!detail.kodeAkun) {
        return NextResponse.json(
          { error: 'Setiap detail harus memiliki kodeAkun' },
          { status: 400 }
        )
      }
      if (detail.debit === undefined && detail.kredit === undefined) {
        return NextResponse.json(
          { error: 'Setiap detail harus memiliki debit atau kredit' },
          { status: 400 }
        )
      }
    }

    // Validate total debit = total kredit
    const totalDebit = details.reduce(
      (sum: number, d: { debit?: number; kredit?: number }) =>
        sum + (d.debit || 0),
      0
    )
    const totalKredit = details.reduce(
      (sum: number, d: { debit?: number; kredit?: number }) =>
        sum + (d.kredit || 0),
      0
    )

    if (Math.round(totalDebit) !== Math.round(totalKredit)) {
      return NextResponse.json(
        { error: `Total debit (${totalDebit}) harus sama dengan total kredit (${totalKredit})` },
        { status: 400 }
      )
    }

    // Validate all kodeAkun exist in tenant's chart of accounts
    const kodeAkunList = details.map(
      (d: { kodeAkun: string }) => d.kodeAkun
    )
    const existingAkun = await db.akun.findMany({
      where: {
        tenantId: session.tenantId,
        kodeAkun: { in: kodeAkunList },
      },
    })

    const existingKodes = new Set(existingAkun.map((a) => a.kodeAkun))
    const invalidKodes = kodeAkunList.filter(
      (kode: string) => !existingKodes.has(kode)
    )

    if (invalidKodes.length > 0) {
      return NextResponse.json(
        { error: `Kode akun tidak ditemukan: ${invalidKodes.join(', ')}` },
        { status: 400 }
      )
    }

    // Create journal entry and details in a transaction
    const jurnal = await db.jurnalUmum.create({
      data: {
        tenantId: session.tenantId,
        tanggal: new Date(tanggal),
        keterangan: keterangan || null,
        noBukti: noBukti || null,
        tipe: tipe || 'umum',
        isApproved: true,
        details: {
          create: details.map(
            (d: {
              kodeAkun: string
              debit?: number
              kredit?: number
              keterangan?: string
            }) => ({
              kodeAkun: d.kodeAkun,
              debit: d.debit || 0,
              kredit: d.kredit || 0,
              keterangan: d.keterangan || null,
            })
          ),
        },
      },
      include: {
        details: true,
      },
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'CREATE',
          resource: 'jurnal',
          resourceId: jurnal.id,
          details: JSON.stringify({ keterangan: jurnal.keterangan, noBukti: jurnal.noBukti, tipe: jurnal.tipe }),
        },
      })
    } catch {}

    return NextResponse.json(
      {
        message: 'Jurnal berhasil dibuat',
        jurnal: {
          id: jurnal.id,
          tanggal: jurnal.tanggal,
          keterangan: jurnal.keterangan,
          noBukti: jurnal.noBukti,
          tipe: jurnal.tipe,
          isApproved: jurnal.isApproved,
          createdAt: jurnal.createdAt,
          details: jurnal.details.map((d) => ({
            id: d.id,
            kodeAkun: d.kodeAkun,
            debit: d.debit,
            kredit: d.kredit,
            keterangan: d.keterangan,
          })),
          totalDebit: jurnal.details.reduce((s, d) => s + d.debit, 0),
          totalKredit: jurnal.details.reduce((s, d) => s + d.kredit, 0),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create jurnal error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
