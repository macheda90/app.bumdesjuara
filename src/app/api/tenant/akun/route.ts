import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const akunList = await db.akun.findMany({
      where: { tenantId: session.tenantId },
      orderBy: [{ kelompok: 'asc' }, { kodeAkun: 'asc' }],
    })

    // Calculate current balance for each account
    const akunWithBalance = await Promise.all(
      akunList.map(async (akun) => {
        const debitSum = await db.jurnalDetail.aggregate({
          _sum: { debit: true },
          where: {
            kodeAkun: akun.kodeAkun,
            jurnal: {
              tenantId: session.tenantId!,
              isApproved: true,
            },
          },
        })

        const kreditSum = await db.jurnalDetail.aggregate({
          _sum: { kredit: true },
          where: {
            kodeAkun: akun.kodeAkun,
            jurnal: {
              tenantId: session.tenantId!,
              isApproved: true,
            },
          },
        })

        const debit = debitSum._sum.debit || 0
        const kredit = kreditSum._sum.kredit || 0
        const saldoAwal = akun.saldoAwal || 0

        const tipe = akun.tipeAkun.toLowerCase()
        let saldo = 0
        if (
          tipe.includes('kas') ||
          tipe.includes('bank') ||
          tipe.includes('piutang') ||
          tipe.includes('persediaan') ||
          tipe.includes('aset')
        ) {
          saldo = saldoAwal + debit - kredit
        } else {
          saldo = saldoAwal + kredit - debit
        }

        return {
          id: akun.id,
          kodeAkun: akun.kodeAkun,
          namaAkun: akun.namaAkun,
          tipeAkun: akun.tipeAkun,
          kelompok: akun.kelompok,
          saldoAwal: akun.saldoAwal,
          saldo: Math.round(saldo),
          isDefault: akun.isDefault,
        }
      })
    )

    return NextResponse.json({ akun: akunWithBalance })
  } catch (error) {
    console.error('Get tenant akun error:', error)
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
    const { kodeAkun, namaAkun, tipeAkun, kelompok, saldoAwal } = body

    // Validate required fields
    if (!kodeAkun || !namaAkun || !tipeAkun) {
      return NextResponse.json(
        { error: 'Kode akun, nama akun, dan tipe akun wajib diisi' },
        { status: 400 }
      )
    }

    // Check if kodeAkun is unique per tenant
    const existing = await db.akun.findUnique({
      where: {
        tenantId_kodeAkun: {
          tenantId: session.tenantId,
          kodeAkun,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Kode akun sudah digunakan' },
        { status: 409 }
      )
    }

    const akun = await db.akun.create({
      data: {
        tenantId: session.tenantId,
        kodeAkun,
        namaAkun,
        tipeAkun,
        kelompok: kelompok || null,
        saldoAwal: saldoAwal || 0,
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
          resource: 'akun',
          resourceId: akun.id,
          details: JSON.stringify({ namaAkun: akun.namaAkun, kodeAkun: akun.kodeAkun }),
        },
      })
    } catch {}

    return NextResponse.json(
      { message: 'Akun berhasil dibuat', akun },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create akun error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const body = await request.json()
    const { id, kodeAkun, namaAkun, tipeAkun, kelompok, saldoAwal } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID akun wajib diisi' },
        { status: 400 }
      )
    }

    // Verify the account belongs to this tenant
    const existing = await db.akun.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Akun tidak ditemukan' },
        { status: 404 }
      )
    }

    // If kodeAkun is being changed, check uniqueness
    if (kodeAkun && kodeAkun !== existing.kodeAkun) {
      const duplicate = await db.akun.findUnique({
        where: {
          tenantId_kodeAkun: {
            tenantId: session.tenantId,
            kodeAkun,
          },
        },
      })
      if (duplicate) {
        return NextResponse.json(
          { error: 'Kode akun sudah digunakan' },
          { status: 409 }
        )
      }
    }

    const akun = await db.akun.update({
      where: { id },
      data: {
        kodeAkun: kodeAkun ?? existing.kodeAkun,
        namaAkun: namaAkun ?? existing.namaAkun,
        tipeAkun: tipeAkun ?? existing.tipeAkun,
        kelompok: kelompok !== undefined ? kelompok : existing.kelompok,
        saldoAwal: saldoAwal !== undefined ? saldoAwal : existing.saldoAwal,
      },
    })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'UPDATE',
          resource: 'akun',
          resourceId: akun.id,
          details: JSON.stringify({ namaAkun: akun.namaAkun, kodeAkun: akun.kodeAkun }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Akun berhasil diperbarui', akun })
  } catch (error) {
    console.error('Update akun error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.userType !== 'tenant' || !session.tenantId) {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID akun wajib diisi' },
        { status: 400 }
      )
    }

    // Verify the account belongs to this tenant
    const existing = await db.akun.findFirst({
      where: { id, tenantId: session.tenantId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Akun tidak ditemukan' },
        { status: 404 }
      )
    }

    // Check if any journal details reference this account's kodeAkun
    const journalRefCount = await db.jurnalDetail.count({
      where: {
        kodeAkun: existing.kodeAkun,
        jurnal: {
          tenantId: session.tenantId,
        },
      },
    })

    if (journalRefCount > 0) {
      return NextResponse.json(
        {
          error: `Akun tidak dapat dihapus karena masih digunakan di ${journalRefCount} detail jurnal`,
        },
        { status: 409 }
      )
    }

    await db.akun.delete({ where: { id } })

    // Audit log
    try {
      await db.auditLog.create({
        data: {
          tenantId: session.tenantId!,
          userId: session.userId,
          username: session.namaUser || null,
          action: 'DELETE',
          resource: 'akun',
          resourceId: id,
          details: JSON.stringify({ namaAkun: existing.namaAkun, kodeAkun: existing.kodeAkun }),
        },
      })
    } catch {}

    return NextResponse.json({ message: 'Akun berhasil dihapus' })
  } catch (error) {
    console.error('Delete akun error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
