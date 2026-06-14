'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import type {
  DashboardData,
  AkunItem,
  JurnalEntry,
  JurnalPagination,
  JurnalDetailRow,
  NeracaData,
  LabaRugiData,
  BukuBesarData,
  PenjualanItem,
  PembelianItem,
  SimpananItem,
  PinjamanItem,
  PelangganItem,
  PemasokItem,
  PersediaanItem,
  PersediaanSummary,
  GenericPagination,
  TenantSettingsItem,
  TenantUserItem,
  AuditLogItem,
  NeracaSaldoData,
  ArusKasData,
} from '@/lib/tenant-types'

export function useTenantState() {
  const { tenantTab } = useAuthStore()

  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comingSoonModal, setComingSoonModal] = useState<string | null>(null)

  // Akun state
  const [akunList, setAkunList] = useState<AkunItem[]>([])
  const [akunLoading, setAkunLoading] = useState(false)
  const [akunSearch, setAkunSearch] = useState('')

  // Jurnal state
  const [jurnalList, setJurnalList] = useState<JurnalEntry[]>([])
  const [jurnalLoading, setJurnalLoading] = useState(false)
  const [jurnalPage, setJurnalPage] = useState(1)
  const [jurnalPagination, setJurnalPagination] = useState<JurnalPagination | null>(null)
  const [jurnalTipeFilter, setJurnalTipeFilter] = useState('semua')
  const [jurnalApprovalFilter, setJurnalApprovalFilter] = useState('semua')
  const [expandedJurnal, setExpandedJurnal] = useState<string | null>(null)

  // Jurnal creation modal state
  const [showJurnalModal, setShowJurnalModal] = useState(false)
  const [jurnalFormLoading, setJurnalFormLoading] = useState(false)
  const [jurnalForm, setJurnalForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: '',
    noBukti: '',
    tipe: 'umum',
  })
  const [jurnalDetails, setJurnalDetails] = useState<JurnalDetailRow[]>([
    { kodeAkun: '', debit: 0, kredit: 0 },
    { kodeAkun: '', debit: 0, kredit: 0 },
  ])

  // Laporan state
  const [laporanSubTab, setLaporanSubTab] = useState<'neraca' | 'laba-rugi'>('neraca')
  const [neracaData, setNeracaData] = useState<NeracaData | null>(null)
  const [labaRugiData, setLabaRugiData] = useState<LabaRugiData | null>(null)
  const [laporanLoading, setLaporanLoading] = useState(false)

  // Buku Besar state
  const [bukuBesarAkun, setBukuBesarAkun] = useState('')
  const [bukuBesarData, setBukuBesarData] = useState<BukuBesarData | null>(null)
  const [bukuBesarLoading, setBukuBesarLoading] = useState(false)

  // Penjualan state
  const [penjualanList, setPenjualanList] = useState<PenjualanItem[]>([])
  const [penjualanLoading, setPenjualanLoading] = useState(false)
  const [penjualanPagination, setPenjualanPagination] = useState<GenericPagination | null>(null)
  const [penjualanSearch, setPenjualanSearch] = useState('')
  const [showPenjualanModal, setShowPenjualanModal] = useState(false)
  const [penjualanForm, setPenjualanForm] = useState({ tanggalFaktur: new Date().toISOString().split('T')[0], pelangganId: '', total: 0, keterangan: '' })
  const [penjualanFormLoading, setPenjualanFormLoading] = useState(false)

  // Pembelian state
  const [pembelianList, setPembelianList] = useState<PembelianItem[]>([])
  const [pembelianLoading, setPembelianLoading] = useState(false)
  const [pembelianPagination, setPembelianPagination] = useState<GenericPagination | null>(null)
  const [pembelianSearch, setPembelianSearch] = useState('')
  const [showPembelianModal, setShowPembelianModal] = useState(false)
  const [pembelianForm, setPembelianForm] = useState({ tanggalFaktur: new Date().toISOString().split('T')[0], pemasokId: '', total: 0, keterangan: '' })
  const [pembelianFormLoading, setPembelianFormLoading] = useState(false)

  // Simpanan state
  const [simpananList, setSimpananList] = useState<SimpananItem[]>([])
  const [simpananLoading, setSimpananLoading] = useState(false)
  const [simpananFilter, setSimpananFilter] = useState('semua')
  const [showSimpananModal, setShowSimpananModal] = useState(false)
  const [simpananForm, setSimpananForm] = useState({ jenisSimpanan: 'Simpanan Pokok', namaAnggota: '', jenisTransaksi: 'setor', jumlah: 0, tanggal: new Date().toISOString().split('T')[0], keterangan: '' })
  const [simpananFormLoading, setSimpananFormLoading] = useState(false)

  // Pinjaman state
  const [pinjamanList, setPinjamanList] = useState<PinjamanItem[]>([])
  const [pinjamanLoading, setPinjamanLoading] = useState(false)
  const [pinjamanFilter, setPinjamanFilter] = useState('semua')
  const [showPinjamanModal, setShowPinjamanModal] = useState(false)
  const [pinjamanForm, setPinjamanForm] = useState({ jenisPinjaman: 'Pinjaman Reguler', namaAnggota: '', jumlahPokok: 0, bunga: 1.5, tanggal: new Date().toISOString().split('T')[0], keterangan: '' })
  const [pinjamanFormLoading, setPinjamanFormLoading] = useState(false)

  // Pelanggan state
  const [pelangganList, setPelangganList] = useState<PelangganItem[]>([])
  const [pelangganLoading, setPelangganLoading] = useState(false)
  const [pelangganSearch, setPelangganSearch] = useState('')
  const [showPelangganModal, setShowPelangganModal] = useState(false)
  const [pelangganForm, setPelangganForm] = useState({ nama: '', alamat: '', telepon: '', email: '' })
  const [pelangganFormLoading, setPelangganFormLoading] = useState(false)
  const [editingPelanggan, setEditingPelanggan] = useState<PelangganItem | null>(null)

  // Pemasok state
  const [pemasokList, setPemasokList] = useState<PemasokItem[]>([])
  const [pemasokLoading, setPemasokLoading] = useState(false)
  const [pemasokSearch, setPemasokSearch] = useState('')
  const [showPemasokModal, setShowPemasokModal] = useState(false)
  const [pemasokForm, setPemasokForm] = useState({ nama: '', alamat: '', telepon: '', email: '' })
  const [pemasokFormLoading, setPemasokFormLoading] = useState(false)
  const [editingPemasok, setEditingPemasok] = useState<PemasokItem | null>(null)

  // Persediaan state
  const [persediaanList, setPersediaanList] = useState<PersediaanItem[]>([])
  const [persediaanLoading, setPersediaanLoading] = useState(false)
  const [persediaanSearch, setPersediaanSearch] = useState('')
  const [persediaanSummary, setPersediaanSummary] = useState<PersediaanSummary | null>(null)
  const [showPersediaanModal, setShowPersediaanModal] = useState(false)
  const [persediaanForm, setPersediaanForm] = useState({ namaBarang: '', satuan: '', hargaBeli: 0, hargaJual: 0, stok: 0 })
  const [persediaanFormLoading, setPersediaanFormLoading] = useState(false)
  const [editingPersediaan, setEditingPersediaan] = useState<PersediaanItem | null>(null)
  const [deletePersediaanConfirm, setDeletePersediaanConfirm] = useState<string | null>(null)

  // Date range state for Laporan
  const [laporanStartDate, setLaporanStartDate] = useState('')
  const [laporanEndDate, setLaporanEndDate] = useState('')

  // Date range state for Buku Besar
  const [bukuBesarStartDate, setBukuBesarStartDate] = useState('')
  const [bukuBesarEndDate, setBukuBesarEndDate] = useState('')

  // Neraca Saldo state
  const [neracaSaldoData, setNeracaSaldoData] = useState<NeracaSaldoData | null>(null)
  const [neracaSaldoLoading, setNeracaSaldoLoading] = useState(false)
  const [neracaSaldoStartDate, setNeracaSaldoStartDate] = useState('')
  const [neracaSaldoEndDate, setNeracaSaldoEndDate] = useState('')

  // Arus Kas state
  const [arusKasData, setArusKasData] = useState<ArusKasData | null>(null)
  const [arusKasLoading, setArusKasLoading] = useState(false)
  const [arusKasStartDate, setArusKasStartDate] = useState('')
  const [arusKasEndDate, setArusKasEndDate] = useState('')

  // Akun CRUD state
  const [showAkunModal, setShowAkunModal] = useState(false)
  const [akunForm, setAkunForm] = useState({ kodeAkun: '', namaAkun: '', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 0 })
  const [akunFormLoading, setAkunFormLoading] = useState(false)
  const [editingAkun, setEditingAkun] = useState<AkunItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Pengaturan state
  const [settingsData, setSettingsData] = useState<TenantSettingsItem | null>(null)
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsSaving, setSettingsSaving] = useState(false)
  const [settingsForm, setSettingsForm] = useState({
    namaPerusahaan: '', alamat: '', telepon: '', email: '', npwp: '', tahunFiskal: '2025', logoUrl: '',
  })
  const [tenantUsers, setTenantUsers] = useState<TenantUserItem[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [userForm, setUserForm] = useState({ namaUser: '', password: '', role: 'staff', jabatan: '' })
  const [userFormLoading, setUserFormLoading] = useState(false)
  const [deleteUserConfirm, setDeleteUserConfirm] = useState<string | null>(null)
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([])
  const [auditLoading, setAuditLoading] = useState(false)
  const [auditPagination, setAuditPagination] = useState<GenericPagination | null>(null)
  const [auditPage, setAuditPage] = useState(1)
  const [auditActionFilter, setAuditActionFilter] = useState('')
  const [pengaturanSubTab, setPengaturanSubTab] = useState<'perusahaan' | 'pengguna' | 'log'>('perusahaan')

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  // ─── Fetch Functions ───────────────────────────────────────────────────────

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/tenant')
      if (res.ok) {
        const result = await res.json()
        setData(result)
      }
    } catch {
      // silent error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchAkun = useCallback(async () => {
    try {
      setAkunLoading(true)
      const res = await fetch('/api/tenant/akun')
      if (res.ok) {
        const result = await res.json()
        setAkunList(result.akun)
      }
    } catch {
      // silent error
    } finally {
      setAkunLoading(false)
    }
  }, [])

  const fetchJurnal = useCallback(async () => {
    try {
      setJurnalLoading(true)
      const params = new URLSearchParams({
        page: jurnalPage.toString(),
        limit: '10',
      })
      if (jurnalTipeFilter && jurnalTipeFilter !== 'semua') {
        params.set('tipe', jurnalTipeFilter)
      }
      if (jurnalApprovalFilter && jurnalApprovalFilter !== 'semua') {
        params.set('approvalStatus', jurnalApprovalFilter)
      }
      const res = await fetch(`/api/tenant/jurnal?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setJurnalList(result.jurnal)
        setJurnalPagination(result.pagination)
      }
    } catch {
      // silent error
    } finally {
      setJurnalLoading(false)
    }
  }, [jurnalPage, jurnalTipeFilter, jurnalApprovalFilter])

  const fetchNeraca = useCallback(async () => {
    try {
      setLaporanLoading(true)
      const params = new URLSearchParams()
      if (laporanStartDate) params.set('startDate', laporanStartDate)
      if (laporanEndDate) params.set('endDate', laporanEndDate)
      const qs = params.toString()
      const res = await fetch(`/api/tenant/neraca${qs ? `?${qs}` : ''}`)
      if (res.ok) {
        const result = await res.json()
        setNeracaData(result)
      }
    } catch {
      // silent error
    } finally {
      setLaporanLoading(false)
    }
  }, [laporanStartDate, laporanEndDate])

  const fetchLabaRugi = useCallback(async () => {
    try {
      setLaporanLoading(true)
      const params = new URLSearchParams()
      if (laporanStartDate) params.set('startDate', laporanStartDate)
      if (laporanEndDate) params.set('endDate', laporanEndDate)
      const qs = params.toString()
      const res = await fetch(`/api/tenant/laba-rugi${qs ? `?${qs}` : ''}`)
      if (res.ok) {
        const result = await res.json()
        setLabaRugiData(result)
      }
    } catch {
      // silent error
    } finally {
      setLaporanLoading(false)
    }
  }, [laporanStartDate, laporanEndDate])

  const fetchBukuBesar = useCallback(async (kodeAkun: string) => {
    if (!kodeAkun) return
    try {
      setBukuBesarLoading(true)
      const params = new URLSearchParams({ kodeAkun })
      if (bukuBesarStartDate) params.set('startDate', bukuBesarStartDate)
      if (bukuBesarEndDate) params.set('endDate', bukuBesarEndDate)
      const res = await fetch(`/api/tenant/buku-besar?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setBukuBesarData(result)
      } else {
        setBukuBesarData(null)
        const err = await res.json()
        toast.error(err.error || 'Gagal memuat buku besar')
      }
    } catch {
      setBukuBesarData(null)
      toast.error('Gagal memuat buku besar')
    } finally {
      setBukuBesarLoading(false)
    }
  }, [bukuBesarStartDate, bukuBesarEndDate])

  const fetchPenjualan = useCallback(async () => {
    try {
      setPenjualanLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (penjualanSearch) params.set('search', penjualanSearch)
      const res = await fetch(`/api/tenant/penjualan?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPenjualanList(result.penjualan)
        setPenjualanPagination(result.pagination)
      }
    } catch { /* silent */ } finally { setPenjualanLoading(false) }
  }, [penjualanSearch])

  const fetchPembelian = useCallback(async () => {
    try {
      setPembelianLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (pembelianSearch) params.set('search', pembelianSearch)
      const res = await fetch(`/api/tenant/pembelian?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPembelianList(result.pembelian)
        setPembelianPagination(result.pagination)
      }
    } catch { /* silent */ } finally { setPembelianLoading(false) }
  }, [pembelianSearch])

  const fetchSimpanan = useCallback(async () => {
    try {
      setSimpananLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (simpananFilter && simpananFilter !== 'semua') params.set('jenisTransaksi', simpananFilter)
      const res = await fetch(`/api/tenant/simpanan?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setSimpananList(result.simpanan)
      }
    } catch { /* silent */ } finally { setSimpananLoading(false) }
  }, [simpananFilter])

  const fetchPinjaman = useCallback(async () => {
    try {
      setPinjamanLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (pinjamanFilter && pinjamanFilter !== 'semua') params.set('status', pinjamanFilter)
      const res = await fetch(`/api/tenant/pinjaman?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPinjamanList(result.pinjaman)
      }
    } catch { /* silent */ } finally { setPinjamanLoading(false) }
  }, [pinjamanFilter])

  const fetchPelanggan = useCallback(async () => {
    try {
      setPelangganLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (pelangganSearch) params.set('search', pelangganSearch)
      const res = await fetch(`/api/tenant/pelanggan?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPelangganList(result.pelanggan)
      }
    } catch { /* silent */ } finally { setPelangganLoading(false) }
  }, [pelangganSearch])

  const fetchPemasok = useCallback(async () => {
    try {
      setPemasokLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '50' })
      if (pemasokSearch) params.set('search', pemasokSearch)
      const res = await fetch(`/api/tenant/pemasok?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPemasokList(result.pemasok)
      }
    } catch { /* silent */ } finally { setPemasokLoading(false) }
  }, [pemasokSearch])

  const fetchPersediaan = useCallback(async () => {
    try {
      setPersediaanLoading(true)
      const params = new URLSearchParams({ page: '1', limit: '100' })
      if (persediaanSearch) params.set('search', persediaanSearch)
      const res = await fetch(`/api/tenant/persediaan?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setPersediaanList(result.persediaan)
        setPersediaanSummary(result.summary)
      }
    } catch { /* silent */ } finally { setPersediaanLoading(false) }
  }, [persediaanSearch])

  const fetchSettings = useCallback(async () => {
    try {
      setSettingsLoading(true)
      const res = await fetch('/api/tenant/settings')
      if (res.ok) {
        const result = await res.json()
        const s = result.settings
        setSettingsData(s)
        setSettingsForm({
          namaPerusahaan: s.namaPerusahaan || '',
          alamat: s.alamat || '',
          telepon: s.telepon || '',
          email: s.email || '',
          npwp: s.npwp || '',
          tahunFiskal: s.tahunFiskal || '2025',
          logoUrl: s.logoUrl || '',
        })
      }
    } catch { /* silent */ } finally { setSettingsLoading(false) }
  }, [])

  const fetchTenantUsers = useCallback(async () => {
    try {
      setUsersLoading(true)
      const res = await fetch('/api/tenant/users')
      if (res.ok) {
        const result = await res.json()
        setTenantUsers(result.users)
      }
    } catch { /* silent */ } finally { setUsersLoading(false) }
  }, [])

  const fetchAuditLogs = useCallback(async () => {
    try {
      setAuditLoading(true)
      const params = new URLSearchParams({ page: auditPage.toString(), limit: '15' })
      if (auditActionFilter) params.set('action', auditActionFilter)
      const res = await fetch(`/api/tenant/audit-log?${params.toString()}`)
      if (res.ok) {
        const result = await res.json()
        setAuditLogs(result.logs)
        setAuditPagination(result.pagination)
      }
    } catch { /* silent */ } finally { setAuditLoading(false) }
  }, [auditPage, auditActionFilter])

  const fetchNeracaSaldo = useCallback(async () => {
    try {
      setNeracaSaldoLoading(true)
      const params = new URLSearchParams()
      if (neracaSaldoStartDate) params.set('startDate', neracaSaldoStartDate)
      if (neracaSaldoEndDate) params.set('endDate', neracaSaldoEndDate)
      const qs = params.toString()
      const res = await fetch(`/api/tenant/neraca-saldo${qs ? `?${qs}` : ''}`)
      if (res.ok) {
        const result = await res.json()
        setNeracaSaldoData(result)
      }
    } catch { /* silent */ } finally { setNeracaSaldoLoading(false) }
  }, [neracaSaldoStartDate, neracaSaldoEndDate])

  const fetchArusKas = useCallback(async () => {
    try {
      setArusKasLoading(true)
      const params = new URLSearchParams()
      if (arusKasStartDate) params.set('startDate', arusKasStartDate)
      if (arusKasEndDate) params.set('endDate', arusKasEndDate)
      const qs = params.toString()
      const res = await fetch(`/api/tenant/arus-kas${qs ? `?${qs}` : ''}`)
      if (res.ok) {
        const result = await res.json()
        setArusKasData(result)
      }
    } catch { /* silent */ } finally { setArusKasLoading(false) }
  }, [arusKasStartDate, arusKasEndDate])

  // ─── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  useEffect(() => {
    if (tenantTab === 'akun' || tenantTab === 'buku-besar' || tenantTab === 'laporan' || tenantTab === 'jurnal' || tenantTab === 'neraca-saldo' || tenantTab === 'arus-kas') {
      if (akunList.length === 0) {
        fetchAkun()
      }
    }
  }, [tenantTab, fetchAkun, akunList.length])

  useEffect(() => {
    if (tenantTab === 'jurnal') {
      fetchJurnal()
    }
  }, [tenantTab, fetchJurnal])

  useEffect(() => {
    if (tenantTab === 'laporan') {
      if (laporanSubTab === 'neraca') {
        fetchNeraca()
      } else {
        fetchLabaRugi()
      }
    }
  }, [tenantTab, laporanSubTab, fetchNeraca, fetchLabaRugi])

  useEffect(() => {
    if (tenantTab === 'buku-besar' && bukuBesarAkun) {
      fetchBukuBesar(bukuBesarAkun)
    }
  }, [tenantTab, bukuBesarAkun, fetchBukuBesar])

  // Reset page when filter changes
  useEffect(() => {
    if (tenantTab === 'jurnal') {
      setJurnalPage(1)
    }
  }, [jurnalTipeFilter, tenantTab])

  // Fetch data for new tabs
  useEffect(() => {
    if (tenantTab === 'penjualan') fetchPenjualan()
  }, [tenantTab, fetchPenjualan])

  useEffect(() => {
    if (tenantTab === 'pembelian') fetchPembelian()
  }, [tenantTab, fetchPembelian])

  useEffect(() => {
    if (tenantTab === 'simpanan') fetchSimpanan()
  }, [tenantTab, fetchSimpanan])

  useEffect(() => {
    if (tenantTab === 'pinjaman') fetchPinjaman()
  }, [tenantTab, fetchPinjaman])

  useEffect(() => {
    if (tenantTab === 'pelanggan') fetchPelanggan()
  }, [tenantTab, fetchPelanggan])

  useEffect(() => {
    if (tenantTab === 'pemasok') fetchPemasok()
  }, [tenantTab, fetchPemasok])

  useEffect(() => {
    if (tenantTab === 'persediaan') fetchPersediaan()
  }, [tenantTab, fetchPersediaan])

  useEffect(() => {
    if (tenantTab === 'pengaturan') {
      if (pengaturanSubTab === 'perusahaan') fetchSettings()
      else if (pengaturanSubTab === 'pengguna') fetchTenantUsers()
      else if (pengaturanSubTab === 'log') fetchAuditLogs()
    }
  }, [tenantTab, pengaturanSubTab, fetchSettings, fetchTenantUsers, fetchAuditLogs])

  useEffect(() => {
    if (tenantTab === 'pengaturan' && pengaturanSubTab === 'log') {
      setAuditPage(1)
    }
  }, [auditActionFilter, tenantTab, pengaturanSubTab])

  useEffect(() => {
    if (tenantTab === 'neraca-saldo') fetchNeracaSaldo()
  }, [tenantTab, fetchNeracaSaldo])

  useEffect(() => {
    if (tenantTab === 'arus-kas') fetchArusKas()
  }, [tenantTab, fetchArusKas])

  // ─── Derived / Computed Values ─────────────────────────────────────────────

  const jurnalTotalDebit = jurnalDetails.reduce((s, d) => s + (d.debit || 0), 0)
  const jurnalTotalKredit = jurnalDetails.reduce((s, d) => s + (d.kredit || 0), 0)
  const isJurnalBalanced = jurnalTotalDebit > 0 && jurnalTotalKredit > 0 && Math.abs(jurnalTotalDebit - jurnalTotalKredit) < 1

  const labaRugi = data ? data.summary.totalPendapatan - data.summary.totalBeban : 0
  const isProfit = labaRugi >= 0

  // Akun data processing
  const filteredAkun = akunList.filter(
    (a) =>
      a.namaAkun.toLowerCase().includes(akunSearch.toLowerCase()) ||
      a.kodeAkun.toLowerCase().includes(akunSearch.toLowerCase())
  )

  const neracaAkun = filteredAkun.filter((a) => a.kelompok === 'Neraca')
  const labaRugiAkun = filteredAkun.filter((a) => a.kelompok === 'Laba Rugi')
  const ungroupedAkun = filteredAkun.filter((a) => !a.kelompok)

  const totalNeraca = neracaAkun.reduce((sum, a) => sum + a.saldo, 0)
  const totalLabaRugi = labaRugiAkun.reduce((sum, a) => sum + a.saldo, 0)

  return {
    // Store
    tenantTab,

    // Dashboard
    data,
    isLoading,
    comingSoonModal,
    setComingSoonModal,

    // Akun
    akunList,
    akunLoading,
    akunSearch,
    setAkunSearch,
    filteredAkun,
    neracaAkun,
    labaRugiAkun,
    ungroupedAkun,
    totalNeraca,
    totalLabaRugi,
    showAkunModal,
    setShowAkunModal,
    akunForm,
    setAkunForm,
    akunFormLoading,
    setAkunFormLoading,
    editingAkun,
    setEditingAkun,
    deleteConfirm,
    setDeleteConfirm,

    // Jurnal
    jurnalList,
    jurnalLoading,
    jurnalPage,
    setJurnalPage,
    jurnalPagination,
    jurnalTipeFilter,
    setJurnalTipeFilter,
    jurnalApprovalFilter,
    setJurnalApprovalFilter,
    expandedJurnal,
    setExpandedJurnal,
    showJurnalModal,
    setShowJurnalModal,
    jurnalFormLoading,
    jurnalForm,
    setJurnalForm,
    jurnalDetails,
    setJurnalDetails,
    jurnalTotalDebit,
    jurnalTotalKredit,
    isJurnalBalanced,

    // Laporan
    laporanSubTab,
    setLaporanSubTab,
    neracaData,
    labaRugiData,
    laporanLoading,
    laporanStartDate,
    setLaporanStartDate,
    laporanEndDate,
    setLaporanEndDate,

    // Buku Besar
    bukuBesarAkun,
    setBukuBesarAkun,
    bukuBesarData,
    bukuBesarLoading,
    bukuBesarStartDate,
    setBukuBesarStartDate,
    bukuBesarEndDate,
    setBukuBesarEndDate,

    // Neraca Saldo
    neracaSaldoData,
    neracaSaldoLoading,
    neracaSaldoStartDate,
    setNeracaSaldoStartDate,
    neracaSaldoEndDate,
    setNeracaSaldoEndDate,

    // Arus Kas
    arusKasData,
    arusKasLoading,
    arusKasStartDate,
    setArusKasStartDate,
    arusKasEndDate,
    setArusKasEndDate,

    // Penjualan
    penjualanList,
    penjualanLoading,
    penjualanPagination,
    penjualanSearch,
    setPenjualanSearch,
    showPenjualanModal,
    setShowPenjualanModal,
    penjualanForm,
    setPenjualanForm,
    penjualanFormLoading,
    setPenjualanFormLoading,

    // Pembelian
    pembelianList,
    pembelianLoading,
    pembelianPagination,
    pembelianSearch,
    setPembelianSearch,
    showPembelianModal,
    setShowPembelianModal,
    pembelianForm,
    setPembelianForm,
    pembelianFormLoading,
    setPembelianFormLoading,

    // Simpanan
    simpananList,
    simpananLoading,
    simpananFilter,
    setSimpananFilter,
    showSimpananModal,
    setShowSimpananModal,
    simpananForm,
    setSimpananForm,
    simpananFormLoading,
    setSimpananFormLoading,

    // Pinjaman
    pinjamanList,
    pinjamanLoading,
    pinjamanFilter,
    setPinjamanFilter,
    showPinjamanModal,
    setShowPinjamanModal,
    pinjamanForm,
    setPinjamanForm,
    pinjamanFormLoading,
    setPinjamanFormLoading,

    // Pelanggan
    pelangganList,
    pelangganLoading,
    pelangganSearch,
    setPelangganSearch,
    showPelangganModal,
    setShowPelangganModal,
    pelangganForm,
    setPelangganForm,
    pelangganFormLoading,
    setPelangganFormLoading,
    editingPelanggan,
    setEditingPelanggan,

    // Pemasok
    pemasokList,
    pemasokLoading,
    pemasokSearch,
    setPemasokSearch,
    showPemasokModal,
    setShowPemasokModal,
    pemasokForm,
    setPemasokForm,
    pemasokFormLoading,
    setPemasokFormLoading,
    editingPemasok,
    setEditingPemasok,

    // Persediaan
    persediaanList,
    persediaanLoading,
    persediaanSearch,
    setPersediaanSearch,
    persediaanSummary,
    showPersediaanModal,
    setShowPersediaanModal,
    persediaanForm,
    setPersediaanForm,
    persediaanFormLoading,
    setPersediaanFormLoading,
    editingPersediaan,
    setEditingPersediaan,
    deletePersediaanConfirm,
    setDeletePersediaanConfirm,

    // Pengaturan
    settingsData,
    settingsLoading,
    settingsSaving,
    setSettingsSaving,
    settingsForm,
    setSettingsForm,
    tenantUsers,
    usersLoading,
    showUserModal,
    setShowUserModal,
    userForm,
    setUserForm,
    userFormLoading,
    setUserFormLoading,
    deleteUserConfirm,
    setDeleteUserConfirm,
    auditLogs,
    auditLoading,
    auditPagination,
    auditPage,
    setAuditPage,
    auditActionFilter,
    setAuditActionFilter,
    pengaturanSubTab,
    setPengaturanSubTab,

    // Password
    showPasswordModal,
    setShowPasswordModal,

    // Sidebar
    sidebarOpen,
    setSidebarOpen,

    // Computed
    labaRugi,
    isProfit,

    // Fetch functions
    fetchDashboard,
    fetchAkun,
    fetchJurnal,
    fetchNeraca,
    fetchLabaRugi,
    fetchBukuBesar,
    fetchPenjualan,
    fetchPembelian,
    fetchSimpanan,
    fetchPinjaman,
    fetchPelanggan,
    fetchPemasok,
    fetchPersediaan,
    fetchSettings,
    fetchTenantUsers,
    fetchAuditLogs,
    fetchNeracaSaldo,
    fetchArusKas,
  }
}
