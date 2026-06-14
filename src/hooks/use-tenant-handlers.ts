'use client'

import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTenantState } from '@/hooks/use-tenant-state'
import type { JurnalDetailRow } from '@/lib/tenant-types'

export function useTenantHandlers() {
  const s = useTenantState()

  // ─── Jurnal Form Handlers ──────────────────────────────────────────────────

  const resetJurnalForm = useCallback(() => {
    s.setJurnalForm({
      tanggal: new Date().toISOString().split('T')[0],
      keterangan: '',
      noBukti: '',
      tipe: 'umum',
    })
    s.setJurnalDetails([
      { kodeAkun: '', debit: 0, kredit: 0 },
      { kodeAkun: '', debit: 0, kredit: 0 },
    ])
  }, [s.setJurnalForm, s.setJurnalDetails])

  const handleJurnalDetailChange = useCallback((index: number, field: keyof JurnalDetailRow, value: string | number) => {
    s.setJurnalDetails((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [s.setJurnalDetails])

  const addJurnalDetailRow = useCallback(() => {
    s.setJurnalDetails((prev) => [...prev, { kodeAkun: '', debit: 0, kredit: 0 }])
  }, [s.setJurnalDetails])

  const removeJurnalDetailRow = useCallback((index: number) => {
    s.setJurnalDetails((prev) => {
      if (prev.length <= 2) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [s.setJurnalDetails])

  const handleSubmitJurnal = useCallback(async () => {
    if (!s.isJurnalBalanced) return
    try {
      s.setJurnalFormLoading(true)
      const details = s.jurnalDetails.map((d) => ({
        kodeAkun: d.kodeAkun,
        debit: d.debit || 0,
        kredit: d.kredit || 0,
      })).filter((d) => d.kodeAkun)

      if (details.length < 2) {
        toast.error('Minimal 2 baris detail akun diperlukan')
        return
      }

      const res = await fetch('/api/tenant/jurnal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tanggal: s.jurnalForm.tanggal,
          keterangan: s.jurnalForm.keterangan,
          noBukti: s.jurnalForm.noBukti,
          tipe: s.jurnalForm.tipe,
          details,
        }),
      })

      if (res.ok) {
        toast.success('Jurnal berhasil dibuat!')
        s.setShowJurnalModal(false)
        resetJurnalForm()
        s.fetchJurnal()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Gagal membuat jurnal')
      }
    } catch {
      toast.error('Gagal membuat jurnal')
    } finally {
      s.setJurnalFormLoading(false)
    }
  }, [s.isJurnalBalanced, s.jurnalDetails, s.jurnalForm, s.setJurnalFormLoading, s.setShowJurnalModal, resetJurnalForm, s.fetchJurnal])

  const handleApproveJurnal = useCallback(async (id: string) => {
    try {
      const res = await fetch('/api/tenant/jurnal/approve', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: true })
      })
      if (res.ok) {
        toast.success('Jurnal berhasil disetujui')
        s.fetchJurnal()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Gagal menyetujui jurnal')
      }
    } catch {
      toast.error('Gagal menyetujui jurnal')
    }
  }, [s.fetchJurnal])

  const handleRejectJurnal = useCallback(async (id: string, rejectReason: string) => {
    try {
      const res = await fetch('/api/tenant/jurnal/approve', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isApproved: false, rejectReason })
      })
      if (res.ok) {
        toast.success('Jurnal berhasil ditolak')
        s.fetchJurnal()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Gagal menolak jurnal')
      }
    } catch {
      toast.error('Gagal menolak jurnal')
    }
  }, [s.fetchJurnal])

  // ─── Akun CRUD Handlers ────────────────────────────────────────────────────

  const handleOpenCreateAkun = useCallback(() => {
    s.setEditingAkun(null)
    s.setAkunForm({ kodeAkun: '', namaAkun: '', tipeAkun: 'Kas & Bank', kelompok: 'Neraca', saldoAwal: 0 })
    s.setShowAkunModal(true)
  }, [s.setEditingAkun, s.setAkunForm, s.setShowAkunModal])

  const handleEditAkun = useCallback((akun: { id: string; kodeAkun: string; namaAkun: string; tipeAkun: string; kelompok: string | null; saldoAwal: number }) => {
    s.setEditingAkun(akun as typeof s.editingAkun)
    s.setAkunForm({ kodeAkun: akun.kodeAkun, namaAkun: akun.namaAkun, tipeAkun: akun.tipeAkun, kelompok: akun.kelompok || 'Neraca', saldoAwal: akun.saldoAwal })
    s.setShowAkunModal(true)
  }, [s.setEditingAkun, s.setAkunForm, s.setShowAkunModal])

  const handleSaveAkun = useCallback(async () => {
    s.setAkunFormLoading(true)
    try {
      const url = s.editingAkun ? `/api/tenant/akun?id=${s.editingAkun.id}` : '/api/tenant/akun'
      const method = s.editingAkun ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.akunForm) })
      if (res.ok) { toast.success(s.editingAkun ? 'Akun diperbarui!' : 'Akun ditambahkan!'); s.setShowAkunModal(false); s.fetchAkun() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setAkunFormLoading(false) }
  }, [s.editingAkun, s.akunForm, s.setAkunFormLoading, s.setShowAkunModal, s.fetchAkun])

  const handleDeleteAkun = useCallback(async () => {
    if (!s.deleteConfirm) return
    try {
      const res = await fetch(`/api/tenant/akun?id=${s.deleteConfirm}`, { method: 'DELETE' })
      if (res.ok) { toast.success('Akun berhasil dihapus'); s.setDeleteConfirm(null); s.fetchAkun() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal menghapus') }
    } catch { toast.error('Gagal') }
  }, [s.deleteConfirm, s.setDeleteConfirm, s.fetchAkun])

  // ─── Penjualan Handlers ────────────────────────────────────────────────────

  const handleSubmitPenjualan = useCallback(async () => {
    s.setPenjualanFormLoading(true)
    try {
      const res = await fetch('/api/tenant/penjualan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.penjualanForm) })
      if (res.ok) { toast.success('Penjualan berhasil ditambahkan!'); s.setShowPenjualanModal(false); s.setPenjualanForm({ tanggalFaktur: new Date().toISOString().split('T')[0], pelangganId: '', total: 0, keterangan: '' }); s.fetchPenjualan() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPenjualanFormLoading(false) }
  }, [s.penjualanForm, s.setPenjualanFormLoading, s.setShowPenjualanModal, s.setPenjualanForm, s.fetchPenjualan])

  const handleDeletePenjualan = useCallback(async (id: string) => {
    const res = await fetch(`/api/tenant/penjualan?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Berhasil dihapus'); s.fetchPenjualan() } else toast.error('Gagal menghapus')
  }, [s.fetchPenjualan])

  // ─── Pembelian Handlers ────────────────────────────────────────────────────

  const handleSubmitPembelian = useCallback(async () => {
    s.setPembelianFormLoading(true)
    try {
      const res = await fetch('/api/tenant/pembelian', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.pembelianForm) })
      if (res.ok) { toast.success('Pembelian berhasil ditambahkan!'); s.setShowPembelianModal(false); s.setPembelianForm({ tanggalFaktur: new Date().toISOString().split('T')[0], pemasokId: '', total: 0, keterangan: '' }); s.fetchPembelian() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPembelianFormLoading(false) }
  }, [s.pembelianForm, s.setPembelianFormLoading, s.setShowPembelianModal, s.setPembelianForm, s.fetchPembelian])

  const handleDeletePembelian = useCallback(async (id: string) => {
    const res = await fetch(`/api/tenant/pembelian?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Berhasil dihapus'); s.fetchPembelian() } else toast.error('Gagal menghapus')
  }, [s.fetchPembelian])

  // ─── Simpanan Handlers ─────────────────────────────────────────────────────

  const handleSubmitSimpanan = useCallback(async () => {
    s.setSimpananFormLoading(true)
    try {
      const res = await fetch('/api/tenant/simpanan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.simpananForm) })
      if (res.ok) { toast.success('Simpanan berhasil ditambahkan!'); s.setShowSimpananModal(false); s.setSimpananForm({ jenisSimpanan: 'Simpanan Pokok', namaAnggota: '', jenisTransaksi: 'setor', jumlah: 0, tanggal: new Date().toISOString().split('T')[0], keterangan: '' }); s.fetchSimpanan() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setSimpananFormLoading(false) }
  }, [s.simpananForm, s.setSimpananFormLoading, s.setShowSimpananModal, s.setSimpananForm, s.fetchSimpanan])

  // ─── Pinjaman Handlers ─────────────────────────────────────────────────────

  const handleSubmitPinjaman = useCallback(async () => {
    s.setPinjamanFormLoading(true)
    try {
      const res = await fetch('/api/tenant/pinjaman', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.pinjamanForm) })
      if (res.ok) { toast.success('Pinjaman berhasil ditambahkan!'); s.setShowPinjamanModal(false); s.setPinjamanForm({ jenisPinjaman: 'Pinjaman Reguler', namaAnggota: '', jumlahPokok: 0, bunga: 1.5, tanggal: new Date().toISOString().split('T')[0], keterangan: '' }); s.fetchPinjaman() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPinjamanFormLoading(false) }
  }, [s.pinjamanForm, s.setPinjamanFormLoading, s.setShowPinjamanModal, s.setPinjamanForm, s.fetchPinjaman])

  // ─── Pelanggan Handlers ────────────────────────────────────────────────────

  const handleSubmitPelanggan = useCallback(async () => {
    s.setPelangganFormLoading(true)
    try {
      const url = s.editingPelanggan ? `/api/tenant/pelanggan?id=${s.editingPelanggan.id}` : '/api/tenant/pelanggan'
      const method = s.editingPelanggan ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.pelangganForm) })
      if (res.ok) { toast.success(s.editingPelanggan ? 'Pelanggan diperbarui!' : 'Pelanggan ditambahkan!'); s.setShowPelangganModal(false); s.setEditingPelanggan(null); s.setPelangganForm({ nama: '', alamat: '', telepon: '', email: '' }); s.fetchPelanggan() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPelangganFormLoading(false) }
  }, [s.editingPelanggan, s.pelangganForm, s.setPelangganFormLoading, s.setShowPelangganModal, s.setEditingPelanggan, s.setPelangganForm, s.fetchPelanggan])

  const handleDeletePelanggan = useCallback(async (id: string) => {
    const res = await fetch(`/api/tenant/pelanggan?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Berhasil dihapus'); s.fetchPelanggan() } else toast.error('Gagal menghapus')
  }, [s.fetchPelanggan])

  // ─── Pemasok Handlers ──────────────────────────────────────────────────────

  const handleSubmitPemasok = useCallback(async () => {
    s.setPemasokFormLoading(true)
    try {
      const url = s.editingPemasok ? `/api/tenant/pemasok?id=${s.editingPemasok.id}` : '/api/tenant/pemasok'
      const method = s.editingPemasok ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s.pemasokForm) })
      if (res.ok) { toast.success(s.editingPemasok ? 'Pemasok diperbarui!' : 'Pemasok ditambahkan!'); s.setShowPemasokModal(false); s.setEditingPemasok(null); s.setPemasokForm({ nama: '', alamat: '', telepon: '', email: '' }); s.fetchPemasok() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPemasokFormLoading(false) }
  }, [s.editingPemasok, s.pemasokForm, s.setPemasokFormLoading, s.setShowPemasokModal, s.setEditingPemasok, s.setPemasokForm, s.fetchPemasok])

  const handleDeletePemasok = useCallback(async (id: string) => {
    const res = await fetch(`/api/tenant/pemasok?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Berhasil dihapus'); s.fetchPemasok() } else toast.error('Gagal menghapus')
  }, [s.fetchPemasok])

  // ─── Persediaan Handlers ───────────────────────────────────────────────────

  const handleSubmitPersediaan = useCallback(async () => {
    s.setPersediaanFormLoading(true)
    try {
      const url = s.editingPersediaan ? '/api/tenant/persediaan' : '/api/tenant/persediaan'
      const method = s.editingPersediaan ? 'PUT' : 'POST'
      const body = s.editingPersediaan
        ? { id: s.editingPersediaan.id, ...s.persediaanForm }
        : s.persediaanForm
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (res.ok) { toast.success(s.editingPersediaan ? 'Persediaan diperbarui!' : 'Persediaan ditambahkan!'); s.setShowPersediaanModal(false); s.setEditingPersediaan(null); s.setPersediaanForm({ namaBarang: '', satuan: '', hargaBeli: 0, hargaJual: 0, stok: 0 }); s.fetchPersediaan() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal') } finally { s.setPersediaanFormLoading(false) }
  }, [s.editingPersediaan, s.persediaanForm, s.setPersediaanFormLoading, s.setShowPersediaanModal, s.setEditingPersediaan, s.setPersediaanForm, s.fetchPersediaan])

  const handleEditPersediaan = useCallback((item: { id: string; namaBarang: string; satuan: string | null; hargaBeli: number; hargaJual: number; stok: number }) => {
    s.setEditingPersediaan(item as typeof s.editingPersediaan)
    s.setPersediaanForm({ namaBarang: item.namaBarang, satuan: item.satuan || '', hargaBeli: item.hargaBeli, hargaJual: item.hargaJual, stok: item.stok })
    s.setShowPersediaanModal(true)
  }, [s.setEditingPersediaan, s.setPersediaanForm, s.setShowPersediaanModal])

  const handleDeletePersediaan = useCallback(async (id: string) => {
    const res = await fetch(`/api/tenant/persediaan?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Persediaan berhasil dihapus'); s.setDeletePersediaanConfirm(null); s.fetchPersediaan() } else toast.error('Gagal menghapus')
  }, [s.setDeletePersediaanConfirm, s.fetchPersediaan])

  // ─── Settings Handlers ─────────────────────────────────────────────────────

  const handleSaveSettings = useCallback(async () => {
    s.setSettingsSaving(true)
    try {
      const res = await fetch('/api/tenant/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s.settingsForm),
      })
      if (res.ok) { toast.success('Pengaturan berhasil disimpan!'); s.fetchSettings() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal menyimpan') }
    } catch { toast.error('Gagal menyimpan pengaturan') } finally { s.setSettingsSaving(false) }
  }, [s.settingsForm, s.setSettingsSaving, s.fetchSettings])

  // ─── User Handlers ─────────────────────────────────────────────────────────

  const handleCreateUser = useCallback(async () => {
    s.setUserFormLoading(true)
    try {
      const res = await fetch('/api/tenant/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s.userForm),
      })
      if (res.ok) { toast.success('Pengguna berhasil ditambahkan!'); s.setShowUserModal(false); s.setUserForm({ namaUser: '', password: '', role: 'staff', jabatan: '' }); s.fetchTenantUsers() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal') }
    } catch { toast.error('Gagal membuat pengguna') } finally { s.setUserFormLoading(false) }
  }, [s.userForm, s.setUserFormLoading, s.setShowUserModal, s.setUserForm, s.fetchTenantUsers])

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/tenant/users?id=${id}`, { method: 'DELETE' })
      if (res.ok) { toast.success('Pengguna berhasil dihapus'); s.setDeleteUserConfirm(null); s.fetchTenantUsers() }
      else { const e = await res.json(); toast.error(e.error || 'Gagal menghapus') }
    } catch { toast.error('Gagal menghapus pengguna') }
  }, [s.setDeleteUserConfirm, s.fetchTenantUsers])

  // ─── Refresh Handler ───────────────────────────────────────────────────────

  const handleRefresh = useCallback(() => {
    if (s.tenantTab === 'dashboard') s.fetchDashboard()
    else if (s.tenantTab === 'akun') s.fetchAkun()
    else if (s.tenantTab === 'jurnal') s.fetchJurnal()
    else if (s.tenantTab === 'laporan') {
      if (s.laporanSubTab === 'neraca') s.fetchNeraca()
      else s.fetchLabaRugi()
    }
    else if (s.tenantTab === 'buku-besar' && s.bukuBesarAkun) s.fetchBukuBesar(s.bukuBesarAkun)
    else if (s.tenantTab === 'neraca-saldo') s.fetchNeracaSaldo()
    else if (s.tenantTab === 'arus-kas') s.fetchArusKas()
    else if (s.tenantTab === 'penjualan') s.fetchPenjualan()
    else if (s.tenantTab === 'pembelian') s.fetchPembelian()
    else if (s.tenantTab === 'persediaan') s.fetchPersediaan()
    else if (s.tenantTab === 'simpanan') s.fetchSimpanan()
    else if (s.tenantTab === 'pinjaman') s.fetchPinjaman()
    else if (s.tenantTab === 'pelanggan') s.fetchPelanggan()
    else if (s.tenantTab === 'pemasok') s.fetchPemasok()
    else if (s.tenantTab === 'pengaturan') {
      if (s.pengaturanSubTab === 'perusahaan') s.fetchSettings()
      else if (s.pengaturanSubTab === 'pengguna') s.fetchTenantUsers()
      else if (s.pengaturanSubTab === 'log') s.fetchAuditLogs()
    }
  }, [s])

  // ─── Date Filter Apply Handlers ────────────────────────────────────────────

  const handleApplyLaporanDateFilter = useCallback(() => {
    if (s.laporanSubTab === 'neraca') s.fetchNeraca()
    else s.fetchLabaRugi()
  }, [s.laporanSubTab, s.fetchNeraca, s.fetchLabaRugi])

  const handleApplyBukuBesarDateFilter = useCallback(() => {
    if (s.bukuBesarAkun) s.fetchBukuBesar(s.bukuBesarAkun)
  }, [s.bukuBesarAkun, s.fetchBukuBesar])

  const handleResetNeracaSaldo = useCallback(() => {
    s.setNeracaSaldoStartDate('')
    s.setNeracaSaldoEndDate('')
    s.fetchNeracaSaldo()
  }, [s.setNeracaSaldoStartDate, s.setNeracaSaldoEndDate, s.fetchNeracaSaldo])

  const handleResetArusKas = useCallback(() => {
    s.setArusKasStartDate('')
    s.setArusKasEndDate('')
    s.fetchArusKas()
  }, [s.setArusKasStartDate, s.setArusKasEndDate, s.fetchArusKas])

  return {
    // Spread all state
    ...s,

    // Jurnal handlers
    resetJurnalForm,
    handleJurnalDetailChange,
    addJurnalDetailRow,
    removeJurnalDetailRow,
    handleSubmitJurnal,
    handleApproveJurnal,
    handleRejectJurnal,

    // Akun handlers
    handleOpenCreateAkun,
    handleEditAkun,
    handleSaveAkun,
    handleDeleteAkun,

    // Penjualan handlers
    handleSubmitPenjualan,
    handleDeletePenjualan,

    // Pembelian handlers
    handleSubmitPembelian,
    handleDeletePembelian,

    // Simpanan handlers
    handleSubmitSimpanan,

    // Pinjaman handlers
    handleSubmitPinjaman,

    // Pelanggan handlers
    handleSubmitPelanggan,
    handleDeletePelanggan,

    // Pemasok handlers
    handleSubmitPemasok,
    handleDeletePemasok,

    // Persediaan handlers
    handleSubmitPersediaan,
    handleEditPersediaan,
    handleDeletePersediaan,

    // Settings handlers
    handleSaveSettings,

    // User handlers
    handleCreateUser,
    handleDeleteUser,

    // Refresh handler
    handleRefresh,

    // Date filter handlers
    handleApplyLaporanDateFilter,
    handleApplyBukuBesarDateFilter,
    handleResetNeracaSaldo,
    handleResetArusKas,
  }
}
