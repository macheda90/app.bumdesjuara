// ─── Tenant Dashboard Types ────────────────────────────────────────────────────

export interface DashboardData {
  summary: {
    totalKasBank: number
    totalPiutang: number
    totalUtang: number
    totalPersediaan: number
    totalPendapatan: number
    totalBeban: number
  }
  simpanan: {
    totalSimpanan: number
    totalSetor: number
    totalTarik: number
  }
  pinjaman: {
    jumlahAktif: number
    totalPokok: number
    totalSisa: number
  }
  trendData: Array<{
    month: string
    penjualan: number
    pembelian: number
  }>
  pendapatanVsBiaya: Array<{
    month: string
    pendapatan: number
    biaya: number
  }>
  recentTransactions: Array<{
    id: string
    tanggal: string
    keterangan: string | null
    noBukti: string | null
    tipe: string
    details: Array<{
      kodeAkun: string
      debit: number
      kredit: number
    }>
  }>
}

export interface AkunItem {
  id: string
  kodeAkun: string
  namaAkun: string
  tipeAkun: string
  kelompok: string | null
  saldoAwal: number
  saldo: number
  isDefault: boolean
}

export interface JurnalEntry {
  id: string
  tanggal: string
  keterangan: string | null
  noBukti: string | null
  tipe: string
  isApproved: boolean
  createdAt: string
  details: Array<{
    id: string
    kodeAkun: string
    debit: number
    kredit: number
    keterangan: string | null
  }>
  totalDebit: number
  totalKredit: number
}

export interface JurnalPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface NeracaData {
  periode: string
  aset: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  kewajiban: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  ekuitas: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  labaDitahan: number
  totalKewajibanEkuitas: number
}

export interface LabaRugiData {
  periode: string
  pendapatan: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  hpp: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  labaKotor: number
  beban: { items: Array<{ kodeAkun: string; namaAkun: string; tipeAkun: string; saldo: number }>; total: number }
  labaBersih: number
}

export interface BukuBesarData {
  akun: { kodeAkun: string; namaAkun: string; tipeAkun: string; saldoAwal: number }
  entries: Array<{ tanggal: string; noBukti: string | null; keterangan: string | null; debit: number; kredit: number; saldo: number }>
  totalDebit: number
  totalKredit: number
  saldoAkhir: number
}

export interface JurnalDetailRow {
  kodeAkun: string
  debit: number
  kredit: number
}

export interface PenjualanItem {
  id: string
  noFaktur: string
  tanggalFaktur: string
  pelangganId: string | null
  total: number
  keterangan: string | null
  createdAt: string
}

export interface PembelianItem {
  id: string
  noFaktur: string
  tanggalFaktur: string
  pemasokId: string | null
  total: number
  keterangan: string | null
  createdAt: string
}

export interface SimpananItem {
  id: string
  jenisSimpanan: string
  namaAnggota: string | null
  jenisTransaksi: string
  jumlah: number
  tanggal: string
  keterangan: string | null
  createdAt: string
}

export interface PinjamanItem {
  id: string
  jenisPinjaman: string
  namaAnggota: string | null
  jumlahPokok: number
  sisaPokok: number
  bunga: number
  status: string
  tanggal: string
  keterangan: string | null
  createdAt: string
}

export interface PelangganItem {
  id: string
  nama: string
  alamat: string | null
  telepon: string | null
  email: string | null
  createdAt: string
}

export interface PemasokItem {
  id: string
  nama: string
  alamat: string | null
  telepon: string | null
  email: string | null
  createdAt: string
}

export interface PersediaanItem {
  id: string
  namaBarang: string
  satuan: string | null
  hargaBeli: number
  hargaJual: number
  stok: number
  createdAt: string
}

export interface PersediaanSummary {
  totalNilai: number
  totalStokRendah: number
  totalBarang: number
}

export interface GenericPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface TenantSettingsItem {
  id: string
  tenantId: string
  namaPerusahaan: string | null
  alamat: string | null
  telepon: string | null
  email: string | null
  npwp: string | null
  tahunFiskal: string
  logoUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface TenantUserItem {
  id: string
  namaUser: string
  role: string
  jabatan: string | null
  idCabang: string | null
  createdAt: string
  updatedAt: string
}

export interface AuditLogItem {
  id: string
  tenantId: string
  userId: string | null
  username: string | null
  action: string
  resource: string
  resourceId: string | null
  details: string | null
  ipAddress: string | null
  createdAt: string
}

export interface NeracaSaldoItem {
  kodeAkun: string
  namaAkun: string
  tipeAkun: string
  saldoAwal: number
  debit: number
  kredit: number
}

export interface NeracaSaldoData {
  periode: string
  accounts: NeracaSaldoItem[]
  totalDebit: number
  totalKredit: number
  seimbang: boolean
}

export interface ArusKasFlowItem {
  keterangan: string
  jumlah: number
}

export interface ArusKasFlowSection {
  items: ArusKasFlowItem[]
  total: number
}

export interface ArusKasData {
  periode: string
  saldoAwalKas: number
  operasi: ArusKasFlowSection
  investasi: ArusKasFlowSection
  pendanaan: ArusKasFlowSection
  saldoAkhirKas: number
}

export type TenantTabType = 'dashboard' | 'akun' | 'jurnal' | 'laporan' | 'buku-besar' | 'neraca-saldo' | 'arus-kas' | 'penjualan' | 'pembelian' | 'persediaan' | 'simpanan' | 'pinjaman' | 'pelanggan' | 'pemasok' | 'pengaturan'
