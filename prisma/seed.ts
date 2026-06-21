import { PrismaClient } from '@prisma/client'
// bcrypt
import bcrypt from 'bcryptjs'
import 'dotenv/config' // 👈 Load environment variables

// Pass the URL explicitly via the 'datasources' option
// Pass the URL explicitly via the 'datasources' option
const prisma = new PrismaClient({
  datasources: {
    db: {                      // 'db' must match the datasource name in schema.prisma
      url: process.env.DATABASE_URL,
    },
  },
})

// Hardcoded IDs matching existing database records
const TENANT_1_ID = 'cmqdkfw050001rfz0unzzo7zg' // BUMDes Maju Jaya
const TENANT_2_ID = 'cmqdkfw18003srfz0fo2j8fgj' // Koperasi Sejahtera

async function main() {
  console.log('🌱 Seeding database with comprehensive demo data...')

  // Clean up existing data (keep tenant structure intact)
  await prisma.session.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.tenantSettings.deleteMany()
  await prisma.jurnalDetail.deleteMany()
  await prisma.jurnalUmum.deleteMany()
  await prisma.penjualan.deleteMany()
  await prisma.pembelian.deleteMany()
  await prisma.simpanan.deleteMany()
  await prisma.pinjaman.deleteMany()
  await prisma.persediaan.deleteMany()
  await prisma.pelanggan.deleteMany()
  await prisma.pemasok.deleteMany()
  await prisma.akun.deleteMany()
  await prisma.tenantUser.deleteMany()
  await prisma.tenantHeartbeat.deleteMany()
  await prisma.tenant.deleteMany()
  await prisma.centralUser.deleteMany()

  // ===================== PASSWORDS =====================
  const adminHash = await bcrypt.hash('admin', 10)

  // ===================== CENTRAL ADMIN =====================
  const centralAdmin = await prisma.centralUser.create({
    data: {
      id: 'cmqdkfvy50000rfz08nj7hlr8',
      username: 'admin',
      passwordHash: adminHash,
      role: 'admin',
      jabatan: 'Super Administrator',
    },
  })
  console.log('✅ Created central admin:', centralAdmin.username, '(password: admin)')

  // ===================== TENANT 1: BUMDes Maju Jaya =====================
  const tenant1 = await prisma.tenant.create({
    data: {
      id: TENANT_1_ID,
      tenantId: 'bumdes-maju',
      namaPerusahaan: 'BUMDes Maju Jaya',
      email: 'info@bumdesmajujaya.id',
      domain: 'bumdes-maju.bumdesjuara.id',
      isActive: true,
      adminUsername: 'admin',
      adminPassword: adminHash,
      lastSeenAt: new Date(),
    },
  })
  console.log('✅ Created tenant:', tenant1.namaPerusahaan)

  // Tenant Users for tenant1
  await prisma.tenantUser.createMany({
    data: [
      { tenantId: tenant1.id, namaUser: 'admin', passwordHash: adminHash, role: 'admin', jabatan: 'Administrator' },
      { tenantId: tenant1.id, namaUser: 'budi_s', passwordHash: adminHash, role: 'manajer', jabatan: 'Manajer Keuangan' },
      { tenantId: tenant1.id, namaUser: 'siti_a', passwordHash: adminHash, role: 'kasir', jabatan: 'Kasir' },
      { tenantId: tenant1.id, namaUser: 'agus_r', passwordHash: adminHash, role: 'staff', jabatan: 'Staff Administrasi' },
    ],
  })

  // Chart of Accounts for tenant1
  const akunData1 = [
    { kodeAkun: '1-1000', namaAkun: 'Kas', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 50000000 },
    { kodeAkun: '1-1100', namaAkun: 'Bank BRI', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 120000000 },
    { kodeAkun: '1-1200', namaAkun: 'Bank Mandiri', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 75000000 },
    { kodeAkun: '1-2000', namaAkun: 'Piutang Usaha', tipeAkun: 'Piutang', kelompok: 'Neraca', saldoAwal: 30000000 },
    { kodeAkun: '1-2100', namaAkun: 'Piutang Karyawan', tipeAkun: 'Piutang', kelompok: 'Neraca', saldoAwal: 5000000 },
    { kodeAkun: '1-3000', namaAkun: 'Persediaan Barang', tipeAkun: 'Persediaan', kelompok: 'Neraca', saldoAwal: 45000000 },
    { kodeAkun: '1-4000', namaAkun: 'Tanah', tipeAkun: 'Aset Tetap', kelompok: 'Neraca', saldoAwal: 200000000 },
    { kodeAkun: '1-4100', namaAkun: 'Bangunan', tipeAkun: 'Aset Tetap', kelompok: 'Neraca', saldoAwal: 150000000 },
    { kodeAkun: '2-1000', namaAkun: 'Utang Usaha', tipeAkun: 'Utang Usaha', kelompok: 'Neraca', saldoAwal: 20000000 },
    { kodeAkun: '2-1100', namaAkun: 'Utang Bank', tipeAkun: 'Utang Usaha', kelompok: 'Neraca', saldoAwal: 50000000 },
    { kodeAkun: '2-2000', namaAkun: 'Simpanan Pokok', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 200000000 },
    { kodeAkun: '2-2100', namaAkun: 'Simpanan Wajib', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 100000000 },
    { kodeAkun: '2-3000', namaAkun: 'Modal Disetor', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 305000000 },
    { kodeAkun: '3-1000', namaAkun: 'Pendapatan Penjualan', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '3-1100', namaAkun: 'Pendapatan Jasa', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '3-1200', namaAkun: 'Pendapatan Simpanan', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '4-1000', namaAkun: 'Harga Pokok Penjualan', tipeAkun: 'HPP', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1000', namaAkun: 'Beban Gaji', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1100', namaAkun: 'Beban Listrik & Air', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1200', namaAkun: 'Beban Operasional', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1300', namaAkun: 'Beban Administrasi', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
  ]

  for (const akun of akunData1) {
    await prisma.akun.create({
      data: { tenantId: tenant1.id, ...akun, isDefault: true },
    })
  }
  console.log('  ✅ Created 21 akun for BUMDes Maju Jaya')

  // ===== Pelanggan for tenant1 =====
  const pelanggan1 = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Pak Hadi Suprayitno', alamat: 'Desa Sukamaju, Kec. Cianjur', telepon: '081234567890', email: 'hadi@email.com' } })
  const pelanggan2 = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Bu Siti Aminah', alamat: 'Desa Mekarjaya, Kec. Cianjur', telepon: '082345678901', email: 'siti@email.com' } })
  const pelanggan1c = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Pak Darmawan', alamat: 'Desa Ciranjang, Kec. Cianjur', telepon: '083456789012', email: 'darmawan@email.com' } })
  const pelanggan1d = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Bu Yuliani', alamat: 'Desa Bojongpicung, Kec. Cianjur', telepon: '084567890123', email: 'yuliani@email.com' } })
  const pelanggan1e = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Pak Rohmat', alamat: 'Desa Cikalongkulon, Kec. Cianjur', telepon: '085678901234', email: 'rohmat@email.com' } })
  const pelanggan1f = await prisma.pelanggan.create({ data: { tenantId: tenant1.id, nama: 'Bu Nurhasanah', alamat: 'Desa Ciputri, Kec. Cianjur', telepon: '086789012345', email: 'nurhasanah@email.com' } })

  // ===== Pemasok for tenant1 =====
  const pemasok1 = await prisma.pemasok.create({ data: { tenantId: tenant1.id, nama: 'CV Sumber Makmur', alamat: 'Jl. Raya Bandung No. 45', telepon: '0223456789', email: 'sumbermakmur@email.com' } })
  const pemasok1b = await prisma.pemasok.create({ data: { tenantId: tenant1.id, nama: 'PT Agro Nusantara', alamat: 'Jl. Industri No. 12, Jakarta', telepon: '0219876543', email: 'agro@email.com' } })
  const pemasok1c = await prisma.pemasok.create({ data: { tenantId: tenant1.id, nama: 'UD Tani Subur', alamat: 'Jl. Raya Sukabumi No. 88', telepon: '0266123456', email: 'tanisubur@email.com' } })
  const pemasok1d = await prisma.pemasok.create({ data: { tenantId: tenant1.id, nama: 'CV Mitra Pertanian', alamat: 'Jl. Sawahan No. 33, Bandung', telepon: '0227654321', email: 'mitrapertanian@email.com' } })

  // ===== Penjualan for tenant1 (12 entries) =====
  const penjualanData1 = [
    { noFaktur: 'PJ-2025-001', tanggalFaktur: new Date('2025-07-15'), pelangganId: pelanggan1.id, total: 8500000, keterangan: 'Penjualan pupuk organik' },
    { noFaktur: 'PJ-2025-002', tanggalFaktur: new Date('2025-08-20'), pelangganId: pelanggan2.id, total: 12000000, keterangan: 'Penjualan hasil tani' },
    { noFaktur: 'PJ-2025-003', tanggalFaktur: new Date('2025-09-10'), pelangganId: pelanggan1c.id, total: 9500000, keterangan: 'Penjualan bibit padi' },
    { noFaktur: 'PJ-2025-004', tanggalFaktur: new Date('2025-10-05'), pelangganId: pelanggan1d.id, total: 15000000, keterangan: 'Penjualan pupuk dan bibit' },
    { noFaktur: 'PJ-2025-005', tanggalFaktur: new Date('2025-11-12'), pelangganId: pelanggan1.id, total: 18000000, keterangan: 'Penjualan hasil panen' },
    { noFaktur: 'PJ-2025-006', tanggalFaktur: new Date('2025-12-08'), pelangganId: pelanggan2.id, total: 22000000, keterangan: 'Penjualan komoditas akhir tahun' },
    { noFaktur: 'PJ-2026-001', tanggalFaktur: new Date('2026-01-15'), pelangganId: pelanggan1.id, total: 15000000, keterangan: 'Penjualan pupuk organik' },
    { noFaktur: 'PJ-2026-002', tanggalFaktur: new Date('2026-02-10'), pelangganId: pelanggan2.id, total: 22000000, keterangan: 'Penjualan hasil tani' },
    { noFaktur: 'PJ-2026-003', tanggalFaktur: new Date('2026-03-05'), pelangganId: pelanggan1c.id, total: 18500000, keterangan: 'Penjualan bibit tanaman' },
    { noFaktur: 'PJ-2026-004', tanggalFaktur: new Date('2026-04-12'), pelangganId: pelanggan1e.id, total: 25000000, keterangan: 'Penjualan pupuk dan bibit' },
    { noFaktur: 'PJ-2026-005', tanggalFaktur: new Date('2026-05-08'), pelangganId: pelanggan1.id, total: 30000000, keterangan: 'Penjualan hasil panen' },
    { noFaktur: 'PJ-2026-006', tanggalFaktur: new Date('2026-06-20'), pelangganId: pelanggan1f.id, total: 28000000, keterangan: 'Penjualan komoditas' },
  ]

  for (const pj of penjualanData1) {
    await prisma.penjualan.create({ data: { tenantId: tenant1.id, ...pj } })
  }

  // ===== Pembelian for tenant1 (12 entries) =====
  const pembelianData1 = [
    { noFaktur: 'PB-2025-001', tanggalFaktur: new Date('2025-07-10'), pemasokId: pemasok1.id, total: 6000000, keterangan: 'Pembelian pupuk organik' },
    { noFaktur: 'PB-2025-002', tanggalFaktur: new Date('2025-08-15'), pemasokId: pemasok1b.id, total: 9000000, keterangan: 'Pembelian bibit padi' },
    { noFaktur: 'PB-2025-003', tanggalFaktur: new Date('2025-09-20'), pemasokId: pemasok1c.id, total: 7500000, keterangan: 'Pembelian alat tani' },
    { noFaktur: 'PB-2025-004', tanggalFaktur: new Date('2025-10-25'), pemasokId: pemasok1.id, total: 11000000, keterangan: 'Pembelian pupuk NPK' },
    { noFaktur: 'PB-2025-005', tanggalFaktur: new Date('2025-11-18'), pemasokId: pemasok1b.id, total: 13000000, keterangan: 'Pembelian bibit unggul' },
    { noFaktur: 'PB-2025-006', tanggalFaktur: new Date('2025-12-22'), pemasokId: pemasok1d.id, total: 8500000, keterangan: 'Pembelian pestisida' },
    { noFaktur: 'PB-2026-001', tanggalFaktur: new Date('2026-01-20'), pemasokId: pemasok1.id, total: 10000000, keterangan: 'Pembelian pupuk' },
    { noFaktur: 'PB-2026-002', tanggalFaktur: new Date('2026-02-15'), pemasokId: pemasok1.id, total: 15000000, keterangan: 'Pembelian bibit' },
    { noFaktur: 'PB-2026-003', tanggalFaktur: new Date('2026-03-10'), pemasokId: pemasok1b.id, total: 12000000, keterangan: 'Pembelian alat tani' },
    { noFaktur: 'PB-2026-004', tanggalFaktur: new Date('2026-04-18'), pemasokId: pemasok1c.id, total: 18000000, keterangan: 'Pembelian pupuk organik' },
    { noFaktur: 'PB-2026-005', tanggalFaktur: new Date('2026-05-12'), pemasokId: pemasok1.id, total: 14000000, keterangan: 'Pembelian bibit tanaman' },
    { noFaktur: 'PB-2026-006', tanggalFaktur: new Date('2026-06-25'), pemasokId: pemasok1d.id, total: 16000000, keterangan: 'Pembelian sarana tani' },
  ]

  for (const pb of pembelianData1) {
    await prisma.pembelian.create({ data: { tenantId: tenant1.id, ...pb } })
  }

  // ===== Simpanan for tenant1 (12 entries) =====
  const simpananData1 = [
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Pak Hadi', jenisTransaksi: 'setor', jumlah: 5000000, tanggal: new Date('2025-07-05'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Bu Siti', jenisTransaksi: 'setor', jumlah: 2000000, tanggal: new Date('2025-07-10'), keterangan: 'Setoran bulanan Juli' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Pak Budi', jenisTransaksi: 'setor', jumlah: 10000000, tanggal: new Date('2025-08-01'), keterangan: 'Simpanan sukarela' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Bu Siti', jenisTransaksi: 'setor', jumlah: 2000000, tanggal: new Date('2025-08-10'), keterangan: 'Setoran bulanan Agustus' },
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Pak Agus', jenisTransaksi: 'setor', jumlah: 5000000, tanggal: new Date('2025-09-01'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Pak Budi', jenisTransaksi: 'tarik', jumlah: 3000000, tanggal: new Date('2025-09-15'), keterangan: 'Penarikan darurat' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Pak Hadi', jenisTransaksi: 'setor', jumlah: 2000000, tanggal: new Date('2025-10-05'), keterangan: 'Setoran bulanan Oktober' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Bu Ani', jenisTransaksi: 'setor', jumlah: 8000000, tanggal: new Date('2025-11-01'), keterangan: 'Simpanan sukarela' },
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Pak Darmawan', jenisTransaksi: 'setor', jumlah: 5000000, tanggal: new Date('2026-01-05'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Bu Siti', jenisTransaksi: 'setor', jumlah: 2000000, tanggal: new Date('2026-01-10'), keterangan: 'Setoran bulanan Januari' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Pak Rohmat', jenisTransaksi: 'setor', jumlah: 15000000, tanggal: new Date('2026-02-15'), keterangan: 'Simpanan sukarela besar' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Bu Ani', jenisTransaksi: 'tarik', jumlah: 2000000, tanggal: new Date('2026-03-20'), keterangan: 'Penarikan sebagian' },
  ]

  for (const sim of simpananData1) {
    await prisma.simpanan.create({ data: { tenantId: tenant1.id, ...sim } })
  }

  // ===== Pinjaman for tenant1 (8 entries) =====
  const pinjamanData1 = [
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Pak Hadi', jumlahPokok: 10000000, sisaPokok: 7000000, bunga: 1.5, status: 'active', tanggal: new Date('2025-08-15'), keterangan: 'Pinjaman modal usaha' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Bu Siti', jumlahPokok: 5000000, sisaPokok: 3500000, bunga: 1.5, status: 'active', tanggal: new Date('2025-09-10'), keterangan: 'Pinjaman kebutuhan rumah tangga' },
    { jenisPinjaman: 'Pinjaman Jangka Panjang', namaAnggota: 'Pak Budi', jumlahPokok: 25000000, sisaPokok: 20000000, bunga: 1.0, status: 'active', tanggal: new Date('2025-10-01'), keterangan: 'Pinjaman usaha pertanian' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Pak Agus', jumlahPokok: 8000000, sisaPokok: 0, bunga: 1.5, status: 'lunas', tanggal: new Date('2025-06-15'), keterangan: 'Pinjaman sudah lunas' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Bu Ani', jumlahPokok: 3000000, sisaPokok: 0, bunga: 1.5, status: 'lunas', tanggal: new Date('2025-03-20'), keterangan: 'Pinjaman lunas' },
    { jenisPinjaman: 'Pinjaman Jangka Panjang', namaAnggota: 'Pak Darmawan', jumlahPokok: 30000000, sisaPokok: 25000000, bunga: 1.0, status: 'active', tanggal: new Date('2026-01-10'), keterangan: 'Pinjaman pengembangan usaha' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Bu Yuliani', jumlahPokok: 7000000, sisaPokok: 5000000, bunga: 1.5, status: 'active', tanggal: new Date('2026-02-15'), keterangan: 'Pinjaman modal dagang' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Pak Rohmat', jumlahPokok: 15000000, sisaPokok: 15000000, bunga: 1.5, status: 'disbursed', tanggal: new Date('2026-06-01'), keterangan: 'Pinjaman baru belum diambil' },
  ]

  for (const pin of pinjamanData1) {
    await prisma.pinjaman.create({ data: { tenantId: tenant1.id, ...pin } })
  }

  // ===== Persediaan for tenant1 (8 items) =====
  const persediaanData1 = [
    { namaBarang: 'Pupuk Organik 50kg', satuan: 'karung', hargaBeli: 150000, hargaJual: 200000, stok: 100 },
    { namaBarang: 'Bibit Padi Unggul', satuan: 'kg', hargaBeli: 50000, hargaJual: 75000, stok: 200 },
    { namaBarang: 'Pestisida Organik', satuan: 'botol', hargaBeli: 80000, hargaJual: 120000, stok: 50 },
    { namaBarang: 'Pupuk NPK 25kg', satuan: 'karung', hargaBeli: 180000, hargaJual: 250000, stok: 75 },
    { namaBarang: 'Bibit Cabai Rawit', satuan: 'bungkus', hargaBeli: 25000, hargaJual: 40000, stok: 150 },
    { namaBarang: 'Alat Penyiram Otomatis', satuan: 'unit', hargaBeli: 350000, hargaJual: 500000, stok: 20 },
    { namaBarang: 'Pupuk Kandang 30kg', satuan: 'karung', hargaBeli: 60000, hargaJual: 90000, stok: 80 },
    { namaBarang: 'Bibit Tomat Cherry', satuan: 'bungkus', hargaBeli: 30000, hargaJual: 50000, stok: 120 },
  ]

  for (const p of persediaanData1) {
    await prisma.persediaan.create({ data: { tenantId: tenant1.id, ...p } })
  }

  // ===== JURNAL UMUM + DETAILS for tenant1 =====
  // APPROVED journals (existing ones + more)
  const jurnal1_1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-07-15'), keterangan: 'Penjualan pupuk organik', noBukti: 'PJ-2025-001', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_1.id, kodeAkun: '1-1000', debit: 8500000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal1_1.id, kodeAkun: '3-1000', debit: 0, kredit: 8500000, keterangan: 'Pendapatan penjualan' },
    ]
  })

  const jurnal1_2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-07-10'), keterangan: 'Pembelian pupuk organik dari CV Sumber Makmur', noBukti: 'PB-2025-001', tipe: 'pembelian', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_2.id, kodeAkun: '4-1000', debit: 6000000, kredit: 0, keterangan: 'HPP' },
      { jurnalId: jurnal1_2.id, kodeAkun: '1-1100', debit: 0, kredit: 6000000, keterangan: 'Bank keluar' },
    ]
  })

  const jurnal1_3 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-07-05'), keterangan: 'Setoran simpanan pokok Pak Hadi', noBukti: 'SIM-001', tipe: 'simpanan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_3.id, kodeAkun: '1-1000', debit: 5000000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal1_3.id, kodeAkun: '2-2000', debit: 0, kredit: 5000000, keterangan: 'Simpanan pokok' },
    ]
  })

  const jurnal1_4 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-08-15'), keterangan: 'Pencairan pinjaman Pak Hadi', noBukti: 'PIN-001', tipe: 'pinjaman', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_4.id, kodeAkun: '1-2000', debit: 10000000, kredit: 0, keterangan: 'Piutang pinjaman' },
      { jurnalId: jurnal1_4.id, kodeAkun: '1-1000', debit: 0, kredit: 10000000, keterangan: 'Kas keluar' },
    ]
  })

  const jurnal1_5 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-08-20'), keterangan: 'Penjualan hasil tani', noBukti: 'PJ-2025-002', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_5.id, kodeAkun: '1-1100', debit: 12000000, kredit: 0, keterangan: 'Bank masuk' },
      { jurnalId: jurnal1_5.id, kodeAkun: '3-1000', debit: 0, kredit: 12000000, keterangan: 'Pendapatan penjualan' },
    ]
  })

  const jurnal1_6 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-09-30'), keterangan: 'Pembayaran gaji karyawan', noBukti: 'KK-2025-001', tipe: 'kas_keluar', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_6.id, kodeAkun: '5-1000', debit: 8000000, kredit: 0 },
      { jurnalId: jurnal1_6.id, kodeAkun: '1-1000', debit: 0, kredit: 8000000 },
    ]
  })

  const jurnal1_7 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-10-05'), keterangan: 'Penjualan pupuk dan bibit', noBukti: 'PJ-2025-004', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_7.id, kodeAkun: '1-2000', debit: 15000000, kredit: 0 },
      { jurnalId: jurnal1_7.id, kodeAkun: '3-1000', debit: 0, kredit: 15000000 },
    ]
  })

  const jurnal1_8 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2025-11-28'), keterangan: 'Pembayaran listrik dan air', noBukti: 'KK-2025-002', tipe: 'kas_keluar', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_8.id, kodeAkun: '5-1100', debit: 2500000, kredit: 0 },
      { jurnalId: jurnal1_8.id, kodeAkun: '1-1000', debit: 0, kredit: 2500000 },
    ]
  })

  const jurnal1_9 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-01-15'), keterangan: 'Penjualan pupuk organik', noBukti: 'PJ-2026-001', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_9.id, kodeAkun: '1-1000', debit: 15000000, kredit: 0 },
      { jurnalId: jurnal1_9.id, kodeAkun: '3-1000', debit: 0, kredit: 15000000 },
    ]
  })

  const jurnal1_10 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-02-10'), keterangan: 'Penjualan hasil tani', noBukti: 'PJ-2026-002', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_10.id, kodeAkun: '1-1100', debit: 22000000, kredit: 0 },
      { jurnalId: jurnal1_10.id, kodeAkun: '3-1000', debit: 0, kredit: 22000000 },
    ]
  })

  const jurnal1_11 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-03-05'), keterangan: 'Penjualan bibit tanaman', noBukti: 'PJ-2026-003', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_11.id, kodeAkun: '1-2000', debit: 18500000, kredit: 0 },
      { jurnalId: jurnal1_11.id, kodeAkun: '3-1000', debit: 0, kredit: 18500000 },
    ]
  })

  const jurnal1_12 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-04-12'), keterangan: 'Penjualan pupuk dan bibit', noBukti: 'PJ-2026-004', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_12.id, kodeAkun: '1-1100', debit: 25000000, kredit: 0 },
      { jurnalId: jurnal1_12.id, kodeAkun: '3-1000', debit: 0, kredit: 25000000 },
    ]
  })

  // ===== PENDING JOURNALS for tenant1 (isApproved: null) =====
  const jurnal1_p1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-01'), keterangan: 'Pembelian mesin pengolah kompos', noBukti: 'PB-2026-007', tipe: 'pembelian', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p1.id, kodeAkun: '1-4100', debit: 35000000, kredit: 0, keterangan: 'Mesin pengolah kompos' },
      { jurnalId: jurnal1_p1.id, kodeAkun: '2-1100', debit: 0, kredit: 35000000, keterangan: 'Utang bank' },
    ]
  })

  const jurnal1_p2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-05'), keterangan: 'Penjualan pupuk organik ke PT Hijau Lestari', noBukti: 'PJ-2026-007', tipe: 'penjualan', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p2.id, kodeAkun: '1-2000', debit: 42000000, kredit: 0, keterangan: 'Piutang usaha' },
      { jurnalId: jurnal1_p2.id, kodeAkun: '3-1000', debit: 0, kredit: 42000000, keterangan: 'Pendapatan penjualan' },
    ]
  })

  const jurnal1_p3 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-10'), keterangan: 'Setoran simpanan wajib bulan Juli', noBukti: 'SIM-2026-007', tipe: 'simpanan', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p3.id, kodeAkun: '1-1000', debit: 6000000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal1_p3.id, kodeAkun: '2-2100', debit: 0, kredit: 6000000, keterangan: 'Simpanan wajib' },
    ]
  })

  const jurnal1_p4 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-12'), keterangan: 'Pembelian bibit unggul dari PT Agro Nusantara', noBukti: 'PB-2026-008', tipe: 'pembelian', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p4.id, kodeAkun: '4-1000', debit: 22000000, kredit: 0, keterangan: 'HPP bibit' },
      { jurnalId: jurnal1_p4.id, kodeAkun: '2-1000', debit: 0, kredit: 22000000, keterangan: 'Utang usaha' },
    ]
  })

  const jurnal1_p5 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-15'), keterangan: 'Pengeluaran biaya renovasi gudang', noBukti: 'KK-2026-003', tipe: 'kas_keluar', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p5.id, kodeAkun: '5-1200', debit: 15000000, kredit: 0, keterangan: 'Beban renovasi' },
      { jurnalId: jurnal1_p5.id, kodeAkun: '1-1100', debit: 0, kredit: 15000000, keterangan: 'Bank keluar' },
    ]
  })

  const jurnal1_p6 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-18'), keterangan: 'Pemasukan pendapatan jasa konsultasi pertanian', noBukti: 'KM-2026-001', tipe: 'kas_masuk', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_p6.id, kodeAkun: '1-1000', debit: 8000000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal1_p6.id, kodeAkun: '3-1100', debit: 0, kredit: 8000000, keterangan: 'Pendapatan jasa' },
    ]
  })

  // ===== REJECTED JOURNALS for tenant1 (isApproved: false) =====
  const jurnal1_r1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-06-28'), keterangan: 'Klaim pengeluaran pribadi direksi', noBukti: 'KK-2026-REJ-001', tipe: 'kas_keluar', isApproved: false },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_r1.id, kodeAkun: '5-1300', debit: 5000000, kredit: 0, keterangan: 'Klaim pribadi - ditolak' },
      { jurnalId: jurnal1_r1.id, kodeAkun: '1-1000', debit: 0, kredit: 5000000, keterangan: 'Kas keluar' },
    ]
  })

  const jurnal1_r2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant1.id, tanggal: new Date('2026-07-02'), keterangan: 'Pembelian tanpa dokumen pendukung', noBukti: 'PB-2026-REJ-001', tipe: 'pembelian', isApproved: false },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal1_r2.id, kodeAkun: '4-1000', debit: 18000000, kredit: 0, keterangan: 'Tanpa bukti - ditolak' },
      { jurnalId: jurnal1_r2.id, kodeAkun: '1-1100', debit: 0, kredit: 18000000, keterangan: 'Bank keluar' },
    ]
  })

  console.log('  ✅ Created jurnal & details for BUMDes Maju Jaya (approved: 12, pending: 6, rejected: 2)')

  // ===== TENANT SETTINGS for tenant1 =====
  await prisma.tenantSettings.create({
    data: {
      tenantId: tenant1.id,
      namaPerusahaan: 'BUMDes Maju Jaya',
      alamat: 'Jl. Raya Desa Sukamaju No. 10, Kec. Cianjur, Jawa Barat',
      telepon: '0263-1234567',
      email: 'info@bumdesmajujaya.id',
      npwp: '01.234.567.8-901.000',
      tahunFiskal: '2025',
    },
  })

  // ===================== TENANT 2: Koperasi Sejahtera =====================
  const tenant2 = await prisma.tenant.create({
    data: {
      id: TENANT_2_ID,
      tenantId: 'koperasi-sejahtera',
      namaPerusahaan: 'Koperasi Sejahtera',
      email: 'info@koperasisejahtera.id',
      domain: 'koperasi-sejahtera.bumdesjuara.id',
      isActive: true,
      adminUsername: 'admin',
      adminPassword: adminHash,
      lastSeenAt: new Date(),
    },
  })
  console.log('✅ Created tenant:', tenant2.namaPerusahaan)

  // Tenant Users for tenant2
  await prisma.tenantUser.createMany({
    data: [
      { tenantId: tenant2.id, namaUser: 'admin', passwordHash: adminHash, role: 'admin', jabatan: 'Administrator' },
      { tenantId: tenant2.id, namaUser: 'ratna_d', passwordHash: adminHash, role: 'manajer', jabatan: 'Manajer Operasional' },
      { tenantId: tenant2.id, namaUser: 'dedi_s', passwordHash: adminHash, role: 'kasir', jabatan: 'Kasir' },
      { tenantId: tenant2.id, namaUser: 'wahyu_k', passwordHash: adminHash, role: 'staff', jabatan: 'Staff Gudang' },
    ],
  })

  // Chart of Accounts for tenant2
  const akunData2 = [
    { kodeAkun: '1-1000', namaAkun: 'Kas Kecil', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 25000000 },
    { kodeAkun: '1-1100', namaAkun: 'Bank BNI', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 80000000 },
    { kodeAkun: '1-2000', namaAkun: 'Piutang Anggota', tipeAkun: 'Piutang', kelompok: 'Neraca', saldoAwal: 40000000 },
    { kodeAkun: '1-3000', namaAkun: 'Persediaan Toko', tipeAkun: 'Persediaan', kelompok: 'Neraca', saldoAwal: 35000000 },
    { kodeAkun: '1-4000', namaAkun: 'Gedung Koperasi', tipeAkun: 'Aset Tetap', kelompok: 'Neraca', saldoAwal: 250000000 },
    { kodeAkun: '2-1000', namaAkun: 'Utang Usaha', tipeAkun: 'Utang Usaha', kelompok: 'Neraca', saldoAwal: 15000000 },
    { kodeAkun: '2-2000', namaAkun: 'Simpanan Pokok', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 200000000 },
    { kodeAkun: '2-2100', namaAkun: 'Simpanan Wajib', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 100000000 },
    { kodeAkun: '2-3000', namaAkun: 'Modal Disetor', tipeAkun: 'Ekuitas', kelompok: 'Neraca', saldoAwal: 115000000 },
    { kodeAkun: '3-1000', namaAkun: 'Pendapatan Toko', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '3-1100', namaAkun: 'Pendapatan Jasa', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '3-1200', namaAkun: 'Pendapatan Bunga Pinjaman', tipeAkun: 'Pendapatan', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '4-1000', namaAkun: 'HPP Toko', tipeAkun: 'HPP', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1000', namaAkun: 'Beban Operasional', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1100', namaAkun: 'Beban Gaji', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
    { kodeAkun: '5-1200', namaAkun: 'Beban Sewa', tipeAkun: 'Beban', kelompok: 'Laba Rugi', saldoAwal: 0 },
  ]

  for (const akun of akunData2) {
    await prisma.akun.create({
      data: { tenantId: tenant2.id, ...akun, isDefault: true },
    })
  }
  console.log('  ✅ Created 16 akun for Koperasi Sejahtera')

  // ===== Pelanggan for tenant2 =====
  const pelanggan3 = await prisma.pelanggan.create({ data: { tenantId: tenant2.id, nama: 'Ibu Ratna Dewi', alamat: 'Desa Harapan, Kec. Surade', telepon: '083456789012', email: 'ratna@email.com' } })
  const pelanggan2b = await prisma.pelanggan.create({ data: { tenantId: tenant2.id, nama: 'Pak Joko Widodo', alamat: 'Desa Mekarsari, Kec. Bandung', telepon: '087654321098', email: 'joko@email.com' } })
  const pelanggan2c = await prisma.pelanggan.create({ data: { tenantId: tenant2.id, nama: 'Bu Lasmini', alamat: 'Desa Cisalak, Kec. Bandung', telepon: '089876543210', email: 'lasmini@email.com' } })
  const pelanggan2d = await prisma.pelanggan.create({ data: { tenantId: tenant2.id, nama: 'Pak Sumardi', alamat: 'Desa Margajaya, Kec. Bandung', telepon: '081122334455', email: 'sumardi@email.com' } })
  const pelanggan2e = await prisma.pelanggan.create({ data: { tenantId: tenant2.id, nama: 'Bu Wiwin', alamat: 'Desa Kebonwaru, Kec. Bandung', telepon: '082233445566', email: 'wiwin@email.com' } })

  // ===== Pemasok for tenant2 =====
  const pemasok2 = await prisma.pemasok.create({ data: { tenantId: tenant2.id, nama: 'PT Maju Bersama', alamat: 'Jl. Raya Sukabumi No. 78', telepon: '0266789012', email: 'majubersama@email.com' } })
  const pemasok2b = await prisma.pemasok.create({ data: { tenantId: tenant2.id, nama: 'CV Sembako Jaya', alamat: 'Jl. Pasar Baru No. 15, Jakarta', telepon: '0215551234', email: 'sembakojaya@email.com' } })
  const pemasok2c = await prisma.pemasok.create({ data: { tenantId: tenant2.id, nama: 'UD Karya Mandiri', alamat: 'Jl. Raya Cianjur No. 56', telepon: '0263555678', email: 'karyamandiri@email.com' } })

  // ===== Penjualan for tenant2 (12 entries) =====
  const penjualanData2 = [
    { noFaktur: 'PJ-2025-001', tanggalFaktur: new Date('2025-07-20'), pelangganId: pelanggan3.id, total: 8000000, keterangan: 'Penjualan sembako' },
    { noFaktur: 'PJ-2025-002', tanggalFaktur: new Date('2025-08-18'), pelangganId: pelanggan2b.id, total: 11000000, keterangan: 'Penjualan kebutuhan rumah tangga' },
    { noFaktur: 'PJ-2025-003', tanggalFaktur: new Date('2025-09-22'), pelangganId: pelanggan2c.id, total: 9500000, keterangan: 'Penjualan toko' },
    { noFaktur: 'PJ-2025-004', tanggalFaktur: new Date('2025-10-15'), pelangganId: pelanggan3.id, total: 14000000, keterangan: 'Penjualan besar' },
    { noFaktur: 'PJ-2025-005', tanggalFaktur: new Date('2025-11-20'), pelangganId: pelanggan2d.id, total: 16000000, keterangan: 'Penjualan reguler' },
    { noFaktur: 'PJ-2025-006', tanggalFaktur: new Date('2025-12-18'), pelangganId: pelanggan2e.id, total: 20000000, keterangan: 'Penjualan natal & tahun baru' },
    { noFaktur: 'PJ-2026-001', tanggalFaktur: new Date('2026-01-20'), pelangganId: pelanggan3.id, total: 12000000, keterangan: 'Penjualan sembako' },
    { noFaktur: 'PJ-2026-002', tanggalFaktur: new Date('2026-02-15'), pelangganId: pelanggan2b.id, total: 18000000, keterangan: 'Penjualan kebutuhan rumah tangga' },
    { noFaktur: 'PJ-2026-003', tanggalFaktur: new Date('2026-03-10'), pelangganId: pelanggan2c.id, total: 15000000, keterangan: 'Penjualan toko' },
    { noFaktur: 'PJ-2026-004', tanggalFaktur: new Date('2026-04-20'), pelangganId: pelanggan3.id, total: 22000000, keterangan: 'Penjualan besar' },
    { noFaktur: 'PJ-2026-005', tanggalFaktur: new Date('2026-05-15'), pelangganId: pelanggan2d.id, total: 19000000, keterangan: 'Penjualan reguler' },
    { noFaktur: 'PJ-2026-006', tanggalFaktur: new Date('2026-06-10'), pelangganId: pelanggan2e.id, total: 25000000, keterangan: 'Penjualan lebaran' },
  ]

  for (const pj of penjualanData2) {
    await prisma.penjualan.create({ data: { tenantId: tenant2.id, ...pj } })
  }

  // ===== Pembelian for tenant2 (12 entries) =====
  const pembelianData2 = [
    { noFaktur: 'PB-2025-001', tanggalFaktur: new Date('2025-07-25'), pemasokId: pemasok2.id, total: 5500000, keterangan: 'Pembelian sembako' },
    { noFaktur: 'PB-2025-002', tanggalFaktur: new Date('2025-08-22'), pemasokId: pemasok2b.id, total: 8000000, keterangan: 'Pembelian stok toko' },
    { noFaktur: 'PB-2025-003', tanggalFaktur: new Date('2025-09-28'), pemasokId: pemasok2.id, total: 6500000, keterangan: 'Pembelian kebutuhan toko' },
    { noFaktur: 'PB-2025-004', tanggalFaktur: new Date('2025-10-20'), pemasokId: pemasok2c.id, total: 10000000, keterangan: 'Pembelian stok besar' },
    { noFaktur: 'PB-2025-005', tanggalFaktur: new Date('2025-11-25'), pemasokId: pemasok2b.id, total: 11000000, keterangan: 'Pembelian reguler' },
    { noFaktur: 'PB-2025-006', tanggalFaktur: new Date('2025-12-22'), pemasokId: pemasok2.id, total: 13000000, keterangan: 'Pembelian stok natal' },
    { noFaktur: 'PB-2026-001', tanggalFaktur: new Date('2026-01-25'), pemasokId: pemasok2.id, total: 8000000, keterangan: 'Pembelian sembako' },
    { noFaktur: 'PB-2026-002', tanggalFaktur: new Date('2026-02-20'), pemasokId: pemasok2b.id, total: 12000000, keterangan: 'Pembelian stok toko' },
    { noFaktur: 'PB-2026-003', tanggalFaktur: new Date('2026-03-15'), pemasokId: pemasok2.id, total: 10000000, keterangan: 'Pembelian kebutuhan toko' },
    { noFaktur: 'PB-2026-004', tanggalFaktur: new Date('2026-04-25'), pemasokId: pemasok2c.id, total: 15000000, keterangan: 'Pembelian stok besar' },
    { noFaktur: 'PB-2026-005', tanggalFaktur: new Date('2026-05-20'), pemasokId: pemasok2.id, total: 13000000, keterangan: 'Pembelian reguler' },
    { noFaktur: 'PB-2026-006', tanggalFaktur: new Date('2026-06-15'), pemasokId: pemasok2b.id, total: 17000000, keterangan: 'Pembelian stok lebaran' },
  ]

  for (const pb of pembelianData2) {
    await prisma.pembelian.create({ data: { tenantId: tenant2.id, ...pb } })
  }

  // ===== Simpanan for tenant2 (12 entries) =====
  const simpananData2 = [
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Ibu Ratna', jenisTransaksi: 'setor', jumlah: 3000000, tanggal: new Date('2025-07-10'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Pak Dedi', jenisTransaksi: 'setor', jumlah: 1500000, tanggal: new Date('2025-07-15'), keterangan: 'Setoran bulanan Juli' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Ibu Yuli', jenisTransaksi: 'setor', jumlah: 5000000, tanggal: new Date('2025-08-01'), keterangan: 'Simpanan sukarela' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Ibu Ratna', jenisTransaksi: 'setor', jumlah: 1500000, tanggal: new Date('2025-08-15'), keterangan: 'Setoran bulanan Agustus' },
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Pak Wahyu', jenisTransaksi: 'setor', jumlah: 3000000, tanggal: new Date('2025-09-05'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Pak Dedi', jenisTransaksi: 'tarik', jumlah: 2000000, tanggal: new Date('2025-09-20'), keterangan: 'Penarikan' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Pak Joko', jenisTransaksi: 'setor', jumlah: 1500000, tanggal: new Date('2025-10-15'), keterangan: 'Setoran bulanan Oktober' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Bu Lasmini', jenisTransaksi: 'setor', jumlah: 7000000, tanggal: new Date('2025-11-01'), keterangan: 'Simpanan besar' },
    { jenisSimpanan: 'Simpanan Pokok', namaAnggota: 'Pak Sumardi', jenisTransaksi: 'setor', jumlah: 3000000, tanggal: new Date('2026-01-10'), keterangan: 'Setoran awal' },
    { jenisSimpanan: 'Simpanan Wajib', namaAnggota: 'Ibu Ratna', jenisTransaksi: 'setor', jumlah: 1500000, tanggal: new Date('2026-02-15'), keterangan: 'Setoran bulanan Februari' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Bu Wiwin', jenisTransaksi: 'setor', jumlah: 10000000, tanggal: new Date('2026-03-01'), keterangan: 'Simpanan sukarela' },
    { jenisSimpanan: 'Simpanan Sukarela', namaAnggota: 'Ibu Yuli', jenisTransaksi: 'tarik', jumlah: 1500000, tanggal: new Date('2026-04-10'), keterangan: 'Penarikan sebagian' },
  ]

  for (const sim of simpananData2) {
    await prisma.simpanan.create({ data: { tenantId: tenant2.id, ...sim } })
  }

  // ===== Pinjaman for tenant2 (8 entries) =====
  const pinjamanData2 = [
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Ibu Ratna', jumlahPokok: 8000000, sisaPokok: 6000000, bunga: 1.5, status: 'active', tanggal: new Date('2025-08-01'), keterangan: 'Pinjaman usaha' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Pak Dedi', jumlahPokok: 5000000, sisaPokok: 2500000, bunga: 1.5, status: 'active', tanggal: new Date('2025-09-01'), keterangan: 'Pinjaman kebutuhan' },
    { jenisPinjaman: 'Pinjaman Jangka Panjang', namaAnggota: 'Pak Wahyu', jumlahPokok: 20000000, sisaPokok: 18000000, bunga: 1.0, status: 'active', tanggal: new Date('2025-10-15'), keterangan: 'Pinjaman usaha besar' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Pak Joko', jumlahPokok: 6000000, sisaPokok: 0, bunga: 1.5, status: 'lunas', tanggal: new Date('2025-04-01'), keterangan: 'Pinjaman lunas' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Bu Lasmini', jumlahPokok: 4000000, sisaPokok: 0, bunga: 1.5, status: 'lunas', tanggal: new Date('2025-05-15'), keterangan: 'Pinjaman lunas' },
    { jenisPinjaman: 'Pinjaman Jangka Panjang', namaAnggota: 'Pak Sumardi', jumlahPokok: 25000000, sisaPokok: 22000000, bunga: 1.0, status: 'active', tanggal: new Date('2026-01-20'), keterangan: 'Pinjaman modal usaha' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Bu Wiwin', jumlahPokok: 10000000, sisaPokok: 7500000, bunga: 1.5, status: 'active', tanggal: new Date('2026-03-10'), keterangan: 'Pinjaman kebutuhan rumah tangga' },
    { jenisPinjaman: 'Pinjaman Reguler', namaAnggota: 'Ibu Yuli', jumlahPokok: 12000000, sisaPokok: 12000000, bunga: 1.5, status: 'disbursed', tanggal: new Date('2026-06-05'), keterangan: 'Pinjaman baru belum diambil' },
  ]

  for (const pin of pinjamanData2) {
    await prisma.pinjaman.create({ data: { tenantId: tenant2.id, ...pin } })
  }

  // ===== Persediaan for tenant2 (8 items) =====
  const persediaanData2 = [
    { namaBarang: 'Beras Premium 5kg', satuan: 'sak', hargaBeli: 60000, hargaJual: 75000, stok: 150 },
    { namaBarang: 'Minyak Goreng 2L', satuan: 'botol', hargaBeli: 35000, hargaJual: 42000, stok: 80 },
    { namaBarang: 'Gula Pasir 1kg', satuan: 'kg', hargaBeli: 16000, hargaJual: 20000, stok: 200 },
    { namaBarang: 'Tepung Terigu 1kg', satuan: 'kg', hargaBeli: 12000, hargaJual: 16000, stok: 120 },
    { namaBarang: 'Sabun Mandi', satuan: 'buah', hargaBeli: 5000, hargaJual: 8000, stok: 250 },
    { namaBarang: 'Deterjen 800g', satuan: 'bungkus', hargaBeli: 15000, hargaJual: 20000, stok: 100 },
    { namaBarang: 'Kopi Instan 10sachet', satuan: 'kotak', hargaBeli: 18000, hargaJual: 24000, stok: 90 },
    { namaBarang: 'Mie Instan 5pcs', satuan: 'pack', hargaBeli: 13000, hargaJual: 17000, stok: 180 },
  ]

  for (const p of persediaanData2) {
    await prisma.persediaan.create({ data: { tenantId: tenant2.id, ...p } })
  }

  // ===== JURNAL UMUM + DETAILS for tenant2 =====
  // APPROVED journals
  const jurnal2_1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-07-20'), keterangan: 'Penjualan sembako', noBukti: 'PJ-2025-001', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_1.id, kodeAkun: '1-1000', debit: 8000000, kredit: 0 },
      { jurnalId: jurnal2_1.id, kodeAkun: '3-1000', debit: 0, kredit: 8000000 },
    ]
  })

  const jurnal2_2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-07-25'), keterangan: 'Pembelian sembako', noBukti: 'PB-2025-001', tipe: 'pembelian', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_2.id, kodeAkun: '4-1000', debit: 5500000, kredit: 0 },
      { jurnalId: jurnal2_2.id, kodeAkun: '1-1100', debit: 0, kredit: 5500000 },
    ]
  })

  const jurnal2_3 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-08-18'), keterangan: 'Penjualan kebutuhan rumah tangga', noBukti: 'PJ-2025-002', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_3.id, kodeAkun: '1-1100', debit: 11000000, kredit: 0 },
      { jurnalId: jurnal2_3.id, kodeAkun: '3-1000', debit: 0, kredit: 11000000 },
    ]
  })

  const jurnal2_4 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-07-10'), keterangan: 'Setoran simpanan pokok', noBukti: 'SIM-001', tipe: 'simpanan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_4.id, kodeAkun: '1-1000', debit: 3000000, kredit: 0 },
      { jurnalId: jurnal2_4.id, kodeAkun: '2-2000', debit: 0, kredit: 3000000 },
    ]
  })

  const jurnal2_5 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-08-01'), keterangan: 'Pencairan pinjaman Ibu Ratna', noBukti: 'PIN-001', tipe: 'pinjaman', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_5.id, kodeAkun: '1-2000', debit: 8000000, kredit: 0 },
      { jurnalId: jurnal2_5.id, kodeAkun: '1-1000', debit: 0, kredit: 8000000 },
    ]
  })

  const jurnal2_6 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-09-30'), keterangan: 'Pembayaran gaji karyawan', noBukti: 'KK-2025-001', tipe: 'kas_keluar', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_6.id, kodeAkun: '5-1100', debit: 6000000, kredit: 0 },
      { jurnalId: jurnal2_6.id, kodeAkun: '1-1000', debit: 0, kredit: 6000000 },
    ]
  })

  const jurnal2_7 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2025-12-18'), keterangan: 'Penjualan natal & tahun baru', noBukti: 'PJ-2025-006', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_7.id, kodeAkun: '1-1100', debit: 20000000, kredit: 0 },
      { jurnalId: jurnal2_7.id, kodeAkun: '3-1000', debit: 0, kredit: 20000000 },
    ]
  })

  const jurnal2_8 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-01-20'), keterangan: 'Penjualan sembako', noBukti: 'PJ-2026-001', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_8.id, kodeAkun: '1-1000', debit: 12000000, kredit: 0 },
      { jurnalId: jurnal2_8.id, kodeAkun: '3-1000', debit: 0, kredit: 12000000 },
    ]
  })

  const jurnal2_9 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-02-15'), keterangan: 'Penjualan kebutuhan rumah tangga', noBukti: 'PJ-2026-002', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_9.id, kodeAkun: '1-1100', debit: 18000000, kredit: 0 },
      { jurnalId: jurnal2_9.id, kodeAkun: '3-1000', debit: 0, kredit: 18000000 },
    ]
  })

  const jurnal2_10 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-03-10'), keterangan: 'Penjualan toko', noBukti: 'PJ-2026-003', tipe: 'penjualan', isApproved: true },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_10.id, kodeAkun: '1-2000', debit: 15000000, kredit: 0 },
      { jurnalId: jurnal2_10.id, kodeAkun: '3-1000', debit: 0, kredit: 15000000 },
    ]
  })

  // ===== PENDING JOURNALS for tenant2 (isApproved: null) =====
  const jurnal2_p1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-01'), keterangan: 'Pembelian stok toko besar dari CV Sembako Jaya', noBukti: 'PB-2026-007', tipe: 'pembelian', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_p1.id, kodeAkun: '4-1000', debit: 28000000, kredit: 0, keterangan: 'HPP stok besar' },
      { jurnalId: jurnal2_p1.id, kodeAkun: '2-1000', debit: 0, kredit: 28000000, keterangan: 'Utang usaha' },
    ]
  })

  const jurnal2_p2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-03'), keterangan: 'Penjualan grosir ke warung sekitar', noBukti: 'PJ-2026-007', tipe: 'penjualan', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_p2.id, kodeAkun: '1-2000', debit: 35000000, kredit: 0, keterangan: 'Piutang usaha' },
      { jurnalId: jurnal2_p2.id, kodeAkun: '3-1000', debit: 0, kredit: 35000000, keterangan: 'Pendapatan toko' },
    ]
  })

  const jurnal2_p3 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-05'), keterangan: 'Setoran simpanan wajib bulan Juli', noBukti: 'SIM-2026-007', tipe: 'simpanan', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_p3.id, kodeAkun: '1-1000', debit: 4500000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal2_p3.id, kodeAkun: '2-2100', debit: 0, kredit: 4500000, keterangan: 'Simpanan wajib' },
    ]
  })

  const jurnal2_p4 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-08'), keterangan: 'Pembelian AC untuk toko', noBukti: 'PB-2026-008', tipe: 'pembelian', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_p4.id, kodeAkun: '1-4000', debit: 12000000, kredit: 0, keterangan: 'Aset tetap - AC' },
      { jurnalId: jurnal2_p4.id, kodeAkun: '1-1100', debit: 0, kredit: 12000000, keterangan: 'Bank keluar' },
    ]
  })

  const jurnal2_p5 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-10'), keterangan: 'Pendapatan bunga pinjaman anggota', noBukti: 'KM-2026-001', tipe: 'kas_masuk', isApproved: null },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_p5.id, kodeAkun: '1-1000', debit: 5000000, kredit: 0, keterangan: 'Kas masuk' },
      { jurnalId: jurnal2_p5.id, kodeAkun: '3-1200', debit: 0, kredit: 5000000, keterangan: 'Pendapatan bunga pinjaman' },
    ]
  })

  // ===== REJECTED JOURNALS for tenant2 (isApproved: false) =====
  const jurnal2_r1 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-06-25'), keterangan: 'Pengeluaran tanpa otorisasi - makan siang rapat', noBukti: 'KK-2026-REJ-001', tipe: 'kas_keluar', isApproved: false },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_r1.id, kodeAkun: '5-1000', debit: 3500000, kredit: 0, keterangan: 'Beban tidak sah - ditolak' },
      { jurnalId: jurnal2_r1.id, kodeAkun: '1-1000', debit: 0, kredit: 3500000, keterangan: 'Kas keluar' },
    ]
  })

  const jurnal2_r2 = await prisma.jurnalUmum.create({
    data: { tenantId: tenant2.id, tanggal: new Date('2026-07-01'), keterangan: 'Pembelian tanpa PO - ditolak manajer', noBukti: 'PB-2026-REJ-001', tipe: 'pembelian', isApproved: false },
  })
  await prisma.jurnalDetail.createMany({
    data: [
      { jurnalId: jurnal2_r2.id, kodeAkun: '4-1000', debit: 15000000, kredit: 0, keterangan: 'Tanpa PO - ditolak' },
      { jurnalId: jurnal2_r2.id, kodeAkun: '1-1100', debit: 0, kredit: 15000000, keterangan: 'Bank keluar' },
    ]
  })

  console.log('  ✅ Created jurnal & details for Koperasi Sejahtera (approved: 10, pending: 5, rejected: 2)')

  // ===== TENANT SETTINGS for tenant2 =====
  await prisma.tenantSettings.create({
    data: {
      tenantId: tenant2.id,
      namaPerusahaan: 'Koperasi Sejahtera',
      alamat: 'Jl. Merdeka No. 25, Kec. Bandung, Jawa Barat',
      telepon: '022-9876543',
      email: 'info@koperasisejahtera.id',
      npwp: '02.345.678.9-012.000',
      tahunFiskal: '2025',
    },
  })

  console.log('  ✅ Created tenant settings for both tenants')

  // ===================== AUDIT LOGS =====================
  // Audit logs for tenant1
  const auditLogs1 = [
    { tenantId: tenant1.id, username: 'admin', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'CREATE', resource: 'penjualan', details: JSON.stringify({ noFaktur: 'PJ-2026-001', total: 15000000 }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'CREATE', resource: 'pembelian', details: JSON.stringify({ noFaktur: 'PB-2026-001', total: 10000000 }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'budi_s', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '192.168.1.22' },
    { tenantId: tenant1.id, username: 'budi_s', action: 'CREATE', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PJ-2026-003', tipe: 'penjualan' }), ipAddress: '192.168.1.22' },
    { tenantId: tenant1.id, username: 'admin', action: 'APPROVE', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PJ-2026-001', message: 'Jurnal disetujui' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'REJECT', resource: 'jurnal', details: JSON.stringify({ noBukti: 'KK-2026-REJ-001', message: 'Pengeluaran pribadi tidak sah' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'REJECT', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PB-2026-REJ-001', message: 'Tanpa dokumen pendukung' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'siti_a', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '192.168.1.35' },
    { tenantId: tenant1.id, username: 'siti_a', action: 'CREATE', resource: 'simpanan', details: JSON.stringify({ jenisSimpanan: 'Simpanan Wajib', jumlah: 2000000 }), ipAddress: '192.168.1.35' },
    { tenantId: tenant1.id, username: 'admin', action: 'UPDATE', resource: 'pelanggan', details: JSON.stringify({ nama: 'Pak Hadi Suprayitno', field: 'telepon' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'budi_s', action: 'CREATE', resource: 'pinjaman', details: JSON.stringify({ namaAnggota: 'Pak Darmawan', jumlahPokok: 30000000 }), ipAddress: '192.168.1.22' },
    { tenantId: tenant1.id, username: 'agus_r', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '192.168.1.40' },
    { tenantId: tenant1.id, username: 'agus_r', action: 'UPDATE', resource: 'persediaan', details: JSON.stringify({ namaBarang: 'Pupuk Organik 50kg', field: 'stok' }), ipAddress: '192.168.1.40' },
    { tenantId: tenant1.id, username: 'admin', action: 'DELETE', resource: 'persediaan', details: JSON.stringify({ namaBarang: 'Alat rusak - dihapus' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'CREATE', resource: 'akun', details: JSON.stringify({ kodeAkun: '1-1300', namaAkun: 'Bank BCA' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'admin', action: 'UPDATE', resource: 'settings', details: JSON.stringify({ field: 'alamat', message: 'Update alamat perusahaan' }), ipAddress: '192.168.1.10' },
    { tenantId: tenant1.id, username: 'siti_a', action: 'LOGOUT', resource: 'tenant_user', details: JSON.stringify({ message: 'Logout' }), ipAddress: '192.168.1.35' },
  ]

  for (const log of auditLogs1) {
    await prisma.auditLog.create({ data: log })
  }

  // Audit logs for tenant2
  const auditLogs2 = [
    { tenantId: tenant2.id, username: 'admin', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'admin', action: 'CREATE', resource: 'penjualan', details: JSON.stringify({ noFaktur: 'PJ-2026-001', total: 12000000 }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'admin', action: 'CREATE', resource: 'pembelian', details: JSON.stringify({ noFaktur: 'PB-2026-001', total: 8000000 }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'ratna_d', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '10.0.0.12' },
    { tenantId: tenant2.id, username: 'ratna_d', action: 'CREATE', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PJ-2026-002', tipe: 'penjualan' }), ipAddress: '10.0.0.12' },
    { tenantId: tenant2.id, username: 'admin', action: 'APPROVE', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PJ-2026-001', message: 'Jurnal disetujui' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'admin', action: 'REJECT', resource: 'jurnal', details: JSON.stringify({ noBukti: 'KK-2026-REJ-001', message: 'Pengeluaran tanpa otorisasi' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'admin', action: 'REJECT', resource: 'jurnal', details: JSON.stringify({ noBukti: 'PB-2026-REJ-001', message: 'Pembelian tanpa PO' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'dedi_s', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '10.0.0.18' },
    { tenantId: tenant2.id, username: 'dedi_s', action: 'CREATE', resource: 'simpanan', details: JSON.stringify({ jenisSimpanan: 'Simpanan Wajib', jumlah: 1500000 }), ipAddress: '10.0.0.18' },
    { tenantId: tenant2.id, username: 'admin', action: 'UPDATE', resource: 'pelanggan', details: JSON.stringify({ nama: 'Ibu Ratna Dewi', field: 'email' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'ratna_d', action: 'CREATE', resource: 'pinjaman', details: JSON.stringify({ namaAnggota: 'Pak Sumardi', jumlahPokok: 25000000 }), ipAddress: '10.0.0.12' },
    { tenantId: tenant2.id, username: 'wahyu_k', action: 'LOGIN', resource: 'tenant_user', details: JSON.stringify({ message: 'Login berhasil' }), ipAddress: '10.0.0.25' },
    { tenantId: tenant2.id, username: 'wahyu_k', action: 'UPDATE', resource: 'persediaan', details: JSON.stringify({ namaBarang: 'Beras Premium 5kg', field: 'stok' }), ipAddress: '10.0.0.25' },
    { tenantId: tenant2.id, username: 'admin', action: 'DELETE', resource: 'persediaan', details: JSON.stringify({ namaBarang: 'Produk expired - dihapus' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'admin', action: 'CREATE', resource: 'akun', details: JSON.stringify({ kodeAkun: '1-1300', namaAkun: 'Bank BCA' }), ipAddress: '10.0.0.5' },
    { tenantId: tenant2.id, username: 'ratna_d', action: 'UPDATE', resource: 'settings', details: JSON.stringify({ field: 'telepon', message: 'Update telepon perusahaan' }), ipAddress: '10.0.0.12' },
    { tenantId: tenant2.id, username: 'dedi_s', action: 'LOGOUT', resource: 'tenant_user', details: JSON.stringify({ message: 'Logout' }), ipAddress: '10.0.0.18' },
  ]

  for (const log of auditLogs2) {
    await prisma.auditLog.create({ data: log })
  }

  console.log('  ✅ Created 18 audit logs for each tenant')

  // ===================== SUMMARY =====================
  console.log('')
  console.log('✅ Seed completed successfully!')
  console.log('')
  console.log('📋 Demo Credentials:')
  console.log('   Central Admin: admin / admin')
  console.log('   Tenant 1 (BUMDes Maju Jaya): admin / admin (tenantId: bumdes-maju)')
  console.log('   Tenant 1 - Manajer: budi_s / admin')
  console.log('   Tenant 1 - Kasir: siti_a / admin')
  console.log('   Tenant 1 - Staff: agus_r / admin')
  console.log('   Tenant 2 (Koperasi Sejahtera): admin / admin (tenantId: koperasi-sejahtera)')
  console.log('   Tenant 2 - Manajer: ratna_d / admin')
  console.log('   Tenant 2 - Kasir: dedi_s / admin')
  console.log('   Tenant 2 - Staff: wahyu_k / admin')
  console.log('')
  console.log('📊 Data Summary per Tenant:')
  console.log('   Penjualan: 12 entries | Pembelian: 12 entries')
  console.log('   Simpanan: 12 entries | Pinjaman: 8 entries')
  console.log('   Pelanggan: 6 | Pemasok: 4 | Persediaan: 8')
  console.log('   Jurnal Approved: 10-12 | Pending: 5-6 | Rejected: 2')
  console.log('   Audit Logs: 18 entries')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
