'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark,
  LogOut,
  Loader2,
  RefreshCw,
  X,
  Sparkles,
  ScrollText,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Menu,
  List,
  KeyRound,
  Search,
  Command,
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { formatCurrency } from '@/lib/tenant-utils'
import { GenericModal, DarkInput, DarkSelect } from '@/components/tenant/shared'
import { ChangePasswordModal } from '@/components/change-password-modal'
import { NotificationBell } from '@/components/tenant/notification-bell'
import { ThemeToggle } from '@/components/theme-toggle'
import { sidebarGroups } from '@/lib/tenant-sidebar'
import { useTenantHandlers } from '@/hooks/use-tenant-handlers'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { CommandPalette } from '@/components/tenant/command-palette'
import { ShortcutsHelp } from '@/components/tenant/shortcuts-help'
import type { TenantTabType } from '@/lib/tenant-types'

// ─── Dynamic imports for heavy view components ──────────────────────────────

const PulseSkeleton = () => (
  <div className="space-y-6 py-4">
    <div className="flex items-center gap-4">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[var(--skeleton-bg)]" />
      <div className="ml-auto h-8 w-24 animate-pulse rounded-lg bg-[var(--skeleton-bg)]" />
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-[160px] animate-pulse rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="mb-3 h-3 w-20 rounded bg-[var(--skeleton-bg)]" />
          <div className="mb-4 h-7 w-32 rounded bg-[var(--skeleton-bg)]" />
          <div className="h-2 w-full rounded-full bg-[var(--skeleton-bg)]" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {[1, 2].map(i => (
        <div key={i} className="h-[340px] animate-pulse rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5" />
      ))}
    </div>
  </div>
)

const DashboardView = dynamic(() => import('@/components/tenant/dashboard-view').then(m => ({ default: m.DashboardView })), { loading: () => <PulseSkeleton /> })
const AkunView = dynamic(() => import('@/components/tenant/akun-view').then(m => ({ default: m.AkunView })), { loading: () => <PulseSkeleton /> })
const JurnalView = dynamic(() => import('@/components/tenant/jurnal-view').then(m => ({ default: m.JurnalView })), { loading: () => <PulseSkeleton /> })
const LaporanView = dynamic(() => import('@/components/tenant/laporan-view').then(m => ({ default: m.LaporanView })), { loading: () => <PulseSkeleton /> })
const BukuBesarView = dynamic(() => import('@/components/tenant/buku-besar-view').then(m => ({ default: m.BukuBesarView })), { loading: () => <PulseSkeleton /> })
const NeracaSaldoView = dynamic(() => import('@/components/tenant/neraca-saldo-view').then(m => ({ default: m.NeracaSaldoView })), { loading: () => <PulseSkeleton /> })
const ArusKasView = dynamic(() => import('@/components/tenant/arus-kas-view').then(m => ({ default: m.ArusKasView })), { loading: () => <PulseSkeleton /> })
const PersediaanView = dynamic(() => import('@/components/tenant/persediaan-view').then(m => ({ default: m.PersediaanView })), { loading: () => <PulseSkeleton /> })
const PengaturanView = dynamic(() => import('@/components/tenant/pengaturan-view').then(m => ({ default: m.PengaturanView })), { loading: () => <PulseSkeleton /> })

// Transaksi views come from a single module
const PenjualanView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.PenjualanView })), { loading: () => <PulseSkeleton /> })
const PembelianView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.PembelianView })), { loading: () => <PulseSkeleton /> })
const SimpananView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.SimpananView })), { loading: () => <PulseSkeleton /> })
const PinjamanView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.PinjamanView })), { loading: () => <PulseSkeleton /> })
const PelangganView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.PelangganView })), { loading: () => <PulseSkeleton /> })
const PemasokView = dynamic(() => import('@/components/tenant/transaksi-views').then(m => ({ default: m.PemasokView })), { loading: () => <PulseSkeleton /> })

// ─── Main Component ────────────────────────────────────────────────────────────

// ─── Recent Searches Hook ──────────────────────────────────────────────────

function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('bumdesjuara-recent-searches')
      if (stored) return JSON.parse(stored)
    } catch {
      // ignore
    }
    return []
  })

  const addSearch = useCallback((query: string) => {
    if (!query.trim()) return
    setSearches((prev) => {
      const next = [query.trim(), ...prev.filter((s) => s !== query.trim())].slice(0, 10)
      try { localStorage.setItem('bumdesjuara-recent-searches', JSON.stringify(next)) } catch { }
      return next
    })
  }, [])

  return { recentSearches: searches, addRecentSearch: addSearch }
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function TenantDashboard() {
  const { user, logout, setTenantTab } = useAuthStore()
  const h = useTenantHandlers()

  // Keyboard shortcuts & command palette state
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const { recentSearches, addRecentSearch } = useRecentSearches()

  // Context-dependent "Create New" handler
  const handleCreateNew = useCallback(() => {
    const tab = h.tenantTab
    if (tab === 'jurnal') h.setShowJurnalModal(true)
    else if (tab === 'akun') h.handleOpenCreateAkun()
    else if (tab === 'penjualan') h.setShowPenjualanModal(true)
    else if (tab === 'pembelian') h.setShowPembelianModal(true)
    else if (tab === 'simpanan') h.setShowSimpananModal(true)
    else if (tab === 'pinjaman') h.setShowPinjamanModal(true)
    else if (tab === 'pelanggan') h.setShowPelangganModal(true)
    else if (tab === 'pemasok') h.setShowPemasokModal(true)
    else if (tab === 'persediaan') h.setShowPersediaanModal(true)
    else if (tab === 'pengaturan') h.setShowUserModal(true)
    else h.setShowJurnalModal(true) // Default: create journal
  }, [h])

  // Close all modals handler for Escape
  const handleCloseAllModals = useCallback(() => {
    setShowCommandPalette(false)
    setShowShortcutsHelp(false)
    h.setShowJurnalModal(false)
    h.setShowAkunModal(false)
    h.setShowPenjualanModal(false)
    h.setShowPembelianModal(false)
    h.setShowSimpananModal(false)
    h.setShowPinjamanModal(false)
    h.setShowPelangganModal(false)
    h.setShowPemasokModal(false)
    h.setShowPersediaanModal(false)
    h.setShowUserModal(false)
    h.setShowPasswordModal(false)
    h.setDeleteConfirm(null)
    h.setDeleteUserConfirm(null)
    h.setDeletePersediaanConfirm(null)
    h.setComingSoonModal(null)
  }, [h])

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onOpenCommandPalette: () => setShowCommandPalette(true),
    onCloseAllModals: handleCloseAllModals,
    onSwitchTab: (tab: TenantTabType) => setTenantTab(tab),
    onCreateNew: handleCreateNew,
    onShowShortcutsHelp: () => setShowShortcutsHelp(true),
  })

  // ─── Loading / Error States ────────────────────────────────────────────────

  if (h.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#10b981]" />
          <p className="text-[var(--text-secondary)]">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!h.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <p className="mb-4 text-[var(--text-secondary)]">Gagal memuat data dashboard</p>
          <button
            onClick={h.fetchDashboard}
            className="btn-emerald rounded-lg px-4 py-2 text-sm"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => h.setSidebarOpen(!h.sidebarOpen)} className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669]">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">
                Bumdes<span className="text-[#10b981]">Juara</span>
              </span>
              <span className="ml-2 hidden sm:inline text-xs text-[var(--text-secondary)]">
                {user?.tenantName || 'Dashboard'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search / Command Palette Trigger */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)]/50 px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:border-[#10b981]/30 hover:bg-[var(--bg-tertiary)] active:scale-[0.98] min-w-[180px] lg:min-w-[220px]"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Cari...</span>
              <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>
            <button
              onClick={() => setShowCommandPalette(true)}
              className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={h.handleRefresh}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => { window.open('/api/tenant/export?type=jurnal&XTransformPort=3000', '_blank') }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
              title="Export CSV"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span>{user?.namaUser || 'User'}</span>
              <span className="text-[#10b981]">({user?.role || 'admin'})</span>
            </div>
            <button
              onClick={() => h.setShowPasswordModal(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-all hover:border-[#10b981]/30 hover:bg-[#10b981]/10 hover:text-[#10b981] active:scale-[0.98]"
              title="Ganti Password"
            >
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Ganti Password</span>
            </button>
            <ThemeToggle />
            <NotificationBell />
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AnimatePresence>
          {h.sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => h.setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        <aside className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-primary)] overflow-y-auto transition-transform duration-300 ease-out ${h.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-lg lg:shadow-none`}>
          <div className="p-4 space-y-6">
            {/* Tenant Badge */}
            <div className="rounded-xl bg-gradient-to-r from-[#10b981]/10 to-transparent border border-[#10b981]/20 p-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669]">
                  <Landmark className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#10b981] truncate">Tenant</p>
                  <p className="text-xs text-[var(--text-primary)] truncate">{user?.tenantName || 'Dashboard'}</p>
                </div>
              </div>
            </div>
            {sidebarGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/50">{group.label}</p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = h.tenantTab === item.id
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => { setTenantTab(item.id); h.setSidebarOpen(false) }}
                        title={item.label}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.15 }}
                        className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${isActive
                            ? 'bg-gradient-to-r from-[#10b981]/15 to-[#10b981]/5 text-[#10b981] border-l-2 border-[#10b981]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--text-primary)] border-l-2 border-transparent'
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active-dot"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#10b981]"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-8 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb / Page Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`breadcrumb-${h.tenantTab}`}
              initial={{ x: -8, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 flex items-center gap-2 text-sm"
            >
              <span className="text-[var(--text-muted)]">BumdesJuara</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="font-medium text-[var(--text-primary)] page-title-border">
                {sidebarGroups.flatMap(g => g.items).find(i => i.id === h.tenantTab)?.label || 'Dashboard'}
              </span>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {h.tenantTab === 'dashboard' && (
              <DashboardView
                data={h.data}
                isProfit={h.isProfit}
                labaRugi={h.labaRugi}
                user={user}
                setComingSoonModal={h.setComingSoonModal}
              />
            )}
            {h.tenantTab === 'akun' && (
              <AkunView
                akunList={h.filteredAkun}
                neracaAkun={h.neracaAkun}
                labaRugiAkun={h.labaRugiAkun}
                ungroupedAkun={h.ungroupedAkun}
                totalNeraca={h.totalNeraca}
                totalLabaRugi={h.totalLabaRugi}
                akunLoading={h.akunLoading}
                akunSearch={h.akunSearch}
                setAkunSearch={h.setAkunSearch}
                onOpenCreateModal={h.handleOpenCreateAkun}
                onEditAkun={h.handleEditAkun}
                onDeleteAkun={(id) => h.setDeleteConfirm(id)}
              />
            )}
            {h.tenantTab === 'jurnal' && (
              <JurnalView
                jurnalList={h.jurnalList}
                jurnalLoading={h.jurnalLoading}
                jurnalPagination={h.jurnalPagination}
                jurnalTipeFilter={h.jurnalTipeFilter}
                setJurnalTipeFilter={h.setJurnalTipeFilter}
                jurnalPage={h.jurnalPage}
                setJurnalPage={h.setJurnalPage}
                expandedJurnal={h.expandedJurnal}
                setExpandedJurnal={h.setExpandedJurnal}
                onOpenCreateModal={() => h.setShowJurnalModal(true)}
                onApprove={h.handleApproveJurnal}
                onReject={h.handleRejectJurnal}
                approvalFilter={h.jurnalApprovalFilter}
                setApprovalFilter={h.setJurnalApprovalFilter}
              />
            )}
            {h.tenantTab === 'laporan' && (
              <LaporanView
                subTab={h.laporanSubTab}
                setSubTab={h.setLaporanSubTab}
                neracaData={h.neracaData}
                labaRugiData={h.labaRugiData}
                loading={h.laporanLoading}
                tenantName={user?.tenantName}
                startDate={h.laporanStartDate}
                setStartDate={h.setLaporanStartDate}
                endDate={h.laporanEndDate}
                setEndDate={h.setLaporanEndDate}
                onApplyDateFilter={h.handleApplyLaporanDateFilter}
              />
            )}
            {h.tenantTab === 'buku-besar' && (
              <BukuBesarView
                akunList={h.akunList}
                selectedAkun={h.bukuBesarAkun}
                setSelectedAkun={h.setBukuBesarAkun}
                data={h.bukuBesarData}
                loading={h.bukuBesarLoading}
                tenantName={user?.tenantName}
                startDate={h.bukuBesarStartDate}
                setStartDate={h.setBukuBesarStartDate}
                endDate={h.bukuBesarEndDate}
                setEndDate={h.setBukuBesarEndDate}
                onApplyDateFilter={h.handleApplyBukuBesarDateFilter}
              />
            )}
            {h.tenantTab === 'neraca-saldo' && (
              <NeracaSaldoView
                data={h.neracaSaldoData}
                loading={h.neracaSaldoLoading}
                startDate={h.neracaSaldoStartDate}
                endDate={h.neracaSaldoEndDate}
                setStartDate={h.setNeracaSaldoStartDate}
                setEndDate={h.setNeracaSaldoEndDate}
                onApply={h.fetchNeracaSaldo}
                onReset={h.handleResetNeracaSaldo}
                tenantName={user?.tenantName}
              />
            )}
            {h.tenantTab === 'arus-kas' && (
              <ArusKasView
                data={h.arusKasData}
                loading={h.arusKasLoading}
                startDate={h.arusKasStartDate}
                endDate={h.arusKasEndDate}
                setStartDate={h.setArusKasStartDate}
                setEndDate={h.setArusKasEndDate}
                onApply={h.fetchArusKas}
                onReset={h.handleResetArusKas}
                tenantName={user?.tenantName}
              />
            )}
            {h.tenantTab === 'penjualan' && (
              <PenjualanView
                list={h.penjualanList}
                loading={h.penjualanLoading}
                search={h.penjualanSearch}
                setSearch={h.setPenjualanSearch}
                pelangganList={h.pelangganList}
                showModal={h.showPenjualanModal}
                setShowModal={h.setShowPenjualanModal}
                form={h.penjualanForm}
                setForm={h.setPenjualanForm}
                formLoading={h.penjualanFormLoading}
                onSubmit={h.handleSubmitPenjualan}
                onDelete={h.handleDeletePenjualan}
              />
            )}
            {h.tenantTab === 'pembelian' && (
              <PembelianView
                list={h.pembelianList}
                loading={h.pembelianLoading}
                search={h.pembelianSearch}
                setSearch={h.setPembelianSearch}
                pemasokList={h.pemasokList}
                showModal={h.showPembelianModal}
                setShowModal={h.setShowPembelianModal}
                form={h.pembelianForm}
                setForm={h.setPembelianForm}
                formLoading={h.pembelianFormLoading}
                onSubmit={h.handleSubmitPembelian}
                onDelete={h.handleDeletePembelian}
              />
            )}
            {h.tenantTab === 'simpanan' && (
              <SimpananView
                list={h.simpananList}
                loading={h.simpananLoading}
                filter={h.simpananFilter}
                setFilter={h.setSimpananFilter}
                showModal={h.showSimpananModal}
                setShowModal={h.setShowSimpananModal}
                form={h.simpananForm}
                setForm={h.setSimpananForm}
                formLoading={h.simpananFormLoading}
                onSubmit={h.handleSubmitSimpanan}
              />
            )}
            {h.tenantTab === 'pinjaman' && (
              <PinjamanView
                list={h.pinjamanList}
                loading={h.pinjamanLoading}
                filter={h.pinjamanFilter}
                setFilter={h.setPinjamanFilter}
                showModal={h.showPinjamanModal}
                setShowModal={h.setShowPinjamanModal}
                form={h.pinjamanForm}
                setForm={h.setPinjamanForm}
                formLoading={h.pinjamanFormLoading}
                onSubmit={h.handleSubmitPinjaman}
              />
            )}
            {h.tenantTab === 'pelanggan' && (
              <PelangganView
                list={h.pelangganList}
                loading={h.pelangganLoading}
                search={h.pelangganSearch}
                setSearch={h.setPelangganSearch}
                showModal={h.showPelangganModal}
                setShowModal={h.setShowPelangganModal}
                form={h.pelangganForm}
                setForm={h.setPelangganForm}
                formLoading={h.pelangganFormLoading}
                editingItem={h.editingPelanggan}
                onSubmit={h.handleSubmitPelanggan}
                onDelete={h.handleDeletePelanggan}
              />
            )}
            {h.tenantTab === 'pemasok' && (
              <PemasokView
                list={h.pemasokList}
                loading={h.pemasokLoading}
                search={h.pemasokSearch}
                setSearch={h.setPemasokSearch}
                showModal={h.showPemasokModal}
                setShowModal={h.setShowPemasokModal}
                form={h.pemasokForm}
                setForm={h.setPemasokForm}
                formLoading={h.pemasokFormLoading}
                editingItem={h.editingPemasok}
                onSubmit={h.handleSubmitPemasok}
                onDelete={h.handleDeletePemasok}
              />
            )}
            {h.tenantTab === 'persediaan' && (
              <PersediaanView
                list={h.persediaanList}
                loading={h.persediaanLoading}
                search={h.persediaanSearch}
                setSearch={h.setPersediaanSearch}
                summary={h.persediaanSummary}
                showModal={h.showPersediaanModal}
                setShowModal={h.setShowPersediaanModal}
                form={h.persediaanForm}
                setForm={h.setPersediaanForm}
                formLoading={h.persediaanFormLoading}
                editingItem={h.editingPersediaan}
                deleteConfirm={h.deletePersediaanConfirm}
                setDeleteConfirm={h.setDeletePersediaanConfirm}
                onSubmit={h.handleSubmitPersediaan}
                onEdit={h.handleEditPersediaan}
                onDelete={h.handleDeletePersediaan}
              />
            )}
            {h.tenantTab === 'pengaturan' && (
              <PengaturanView
                subTab={h.pengaturanSubTab}
                setSubTab={h.setPengaturanSubTab}
                settingsData={h.settingsData}
                settingsLoading={h.settingsLoading}
                settingsSaving={h.settingsSaving}
                settingsForm={h.settingsForm}
                setSettingsForm={h.setSettingsForm}
                onSaveSettings={h.handleSaveSettings}
                tenantUsers={h.tenantUsers}
                usersLoading={h.usersLoading}
                showUserModal={h.showUserModal}
                setShowUserModal={h.setShowUserModal}
                userForm={h.userForm}
                setUserForm={h.setUserForm}
                userFormLoading={h.userFormLoading}
                onCreateUser={h.handleCreateUser}
                deleteUserConfirm={h.deleteUserConfirm}
                setDeleteUserConfirm={h.setDeleteUserConfirm}
                onDeleteUser={h.handleDeleteUser}
                auditLogs={h.auditLogs}
                auditLoading={h.auditLoading}
                auditPagination={h.auditPagination}
                auditPage={h.auditPage}
                setAuditPage={h.setAuditPage}
                auditActionFilter={h.auditActionFilter}
                setAuditActionFilter={h.setAuditActionFilter}
                tenantName={user?.tenantName}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Akun CRUD Modal */}
      <GenericModal show={h.showAkunModal} onClose={() => h.setShowAkunModal(false)} title={h.editingAkun ? 'Edit Akun' : 'Tambah Akun'} subtitle="Detail akun baru" icon={List} iconColor="#10b981">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DarkInput label="Kode Akun" type="text" value={h.akunForm.kodeAkun} onChange={(e) => h.setAkunForm({ ...h.akunForm, kodeAkun: e.target.value })} placeholder="1-1000" />
            <DarkInput label="Nama Akun" type="text" value={h.akunForm.namaAkun} onChange={(e) => h.setAkunForm({ ...h.akunForm, namaAkun: e.target.value })} placeholder="Nama akun..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DarkSelect label="Tipe Akun" value={h.akunForm.tipeAkun} onChange={(e) => h.setAkunForm({ ...h.akunForm, tipeAkun: e.target.value })}>
              <option value="Kas & Bank" className="bg-[var(--bg-secondary)]">Kas & Bank</option><option value="Piutang" className="bg-[var(--bg-secondary)]">Piutang</option><option value="Persediaan" className="bg-[var(--bg-secondary)]">Persediaan</option><option value="Aset Tetap" className="bg-[var(--bg-secondary)]">Aset Tetap</option><option value="Utang Usaha" className="bg-[var(--bg-secondary)]">Utang Usaha</option><option value="Ekuitas" className="bg-[var(--bg-secondary)]">Ekuitas</option><option value="Pendapatan" className="bg-[var(--bg-secondary)]">Pendapatan</option><option value="HPP" className="bg-[var(--bg-secondary)]">HPP</option><option value="Beban" className="bg-[var(--bg-secondary)]">Beban</option>
            </DarkSelect>
            <DarkSelect label="Kelompok" value={h.akunForm.kelompok} onChange={(e) => h.setAkunForm({ ...h.akunForm, kelompok: e.target.value })}>
              <option value="Neraca" className="bg-[var(--bg-secondary)]">Neraca</option><option value="Laba Rugi" className="bg-[var(--bg-secondary)]">Laba Rugi</option>
            </DarkSelect>
          </div>
          <DarkInput label="Saldo Awal (Rp)" type="number" value={h.akunForm.saldoAwal || ''} onChange={(e) => h.setAkunForm({ ...h.akunForm, saldoAwal: Number(e.target.value) })} placeholder="0" />
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={() => h.setShowAkunModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
            <button onClick={h.handleSaveAkun} disabled={h.akunFormLoading || !h.akunForm.kodeAkun || !h.akunForm.namaAkun} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{h.akunFormLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Simpan</button>
          </div>
        </div>
      </GenericModal>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {h.deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => h.setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center" onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10"><AlertTriangle className="h-7 w-7 text-red-400" /></div>
              <h3 className="mb-2 text-lg font-bold">Konfirmasi Hapus</h3>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => h.setDeleteConfirm(null)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
                <button onClick={h.handleDeleteAkun} className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"><Trash2 className="h-4 w-4" />Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {h.comingSoonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => h.setComingSoonModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/10">
                <Sparkles className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">
                Segera Hadir!
              </h3>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">
                Fitur <span className="font-semibold text-[var(--text-primary)]">{h.comingSoonModal}</span> akan segera hadir. Kami sedang mengembangkan fitur ini untuk pengalaman yang lebih baik.
              </p>
              <button
                onClick={() => h.setComingSoonModal(null)}
                className="btn-emerald rounded-lg px-6 py-2 text-sm font-medium active:scale-[0.98]"
              >
                Mengerti
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Entry Creation Modal */}
      <AnimatePresence>
        {h.showJurnalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => h.setShowJurnalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10b981]/10">
                    <ScrollText className="h-5 w-5 text-[#10b981]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Buat Jurnal Baru</h3>
                    <p className="text-xs text-[var(--text-secondary)]">Masukkan detail jurnal dan entri akun</p>
                  </div>
                </div>
                <button
                  onClick={() => h.setShowJurnalModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Date & No Bukti Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Tanggal</label>
                    <input
                      type="date"
                      value={h.jurnalForm.tanggal}
                      onChange={(e) => h.setJurnalForm((f) => ({ ...f, tanggal: e.target.value }))}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">No Bukti</label>
                    <input
                      type="text"
                      value={h.jurnalForm.noBukti}
                      onChange={(e) => h.setJurnalForm((f) => ({ ...f, noBukti: e.target.value }))}
                      placeholder="BUM-001"
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Keterangan & Tipe Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Keterangan</label>
                    <input
                      type="text"
                      value={h.jurnalForm.keterangan}
                      onChange={(e) => h.setJurnalForm((f) => ({ ...f, keterangan: e.target.value }))}
                      placeholder="Keterangan jurnal..."
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Tipe Jurnal</label>
                    <select
                      value={h.jurnalForm.tipe}
                      onChange={(e) => h.setJurnalForm((f) => ({ ...f, tipe: e.target.value }))}
                      className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
                    >
                      <option value="umum" className="bg-[var(--bg-secondary)]">Umum</option>
                      <option value="kas_masuk" className="bg-[var(--bg-secondary)]">Kas Masuk</option>
                      <option value="kas_keluar" className="bg-[var(--bg-secondary)]">Kas Keluar</option>
                    </select>
                  </div>
                </div>

                {/* Detail Rows */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Detail Jurnal</label>
                    <button
                      onClick={h.addJurnalDetailRow}
                      className="flex items-center gap-1.5 rounded-lg bg-[#10b981]/10 px-3 py-1.5 text-xs font-medium text-[#10b981] transition-colors hover:bg-[#10b981]/20 active:scale-[0.98]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Tambah Baris
                    </button>
                  </div>

                  <div className="space-y-2">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_120px_120px_36px] gap-2 text-xs font-medium text-[var(--text-secondary)] px-1">
                      <span>Akun</span>
                      <span className="text-right">Debit</span>
                      <span className="text-right">Kredit</span>
                      <span></span>
                    </div>

                    {h.jurnalDetails.map((detail, index) => (
                      <div key={index} className="grid grid-cols-[1fr_120px_120px_36px] gap-2 items-center">
                        <select
                          value={detail.kodeAkun}
                          onChange={(e) => h.handleJurnalDetailChange(index, 'kodeAkun', e.target.value)}
                          className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
                        >
                          <option value="" className="bg-[var(--bg-secondary)]">Pilih akun...</option>
                          {h.akunList.map((akun) => (
                            <option key={akun.kodeAkun} value={akun.kodeAkun} className="bg-[var(--bg-secondary)]">
                              {akun.kodeAkun} - {akun.namaAkun}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0"
                          value={detail.debit || ''}
                          onChange={(e) => h.handleJurnalDetailChange(index, 'debit', Number(e.target.value))}
                          placeholder="0"
                          className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-right text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 transition-colors"
                        />
                        <input
                          type="number"
                          min="0"
                          value={detail.kredit || ''}
                          onChange={(e) => h.handleJurnalDetailChange(index, 'kredit', Number(e.target.value))}
                          placeholder="0"
                          className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-right text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 transition-colors"
                        />
                        <button
                          onClick={() => h.removeJurnalDetailRow(index)}
                          disabled={h.jurnalDetails.length <= 2}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Balance Indicator */}
                <div className={`flex items-center justify-between rounded-lg border p-4 ${h.isJurnalBalanced
                    ? 'border-[#10b981]/20 bg-[#10b981]/5'
                    : 'border-red-500/20 bg-red-500/5'
                  }`}>
                  <div className="flex items-center gap-2">
                    {h.isJurnalBalanced ? (
                      <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${h.isJurnalBalanced ? 'text-[#10b981]' : 'text-red-400'}`}>
                      {h.isJurnalBalanced ? 'Jurnal Seimbang' : 'Jurnal Belum Seimbang'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-[var(--text-secondary)]">Debit: </span>
                      <span className="font-bold text-[#10b981]">{formatCurrency(h.jurnalTotalDebit)}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-secondary)]">Kredit: </span>
                      <span className="font-bold text-[#ef4444]">{formatCurrency(h.jurnalTotalKredit)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-[var(--border-color)] px-6 py-4">
                <button
                  onClick={() => h.setShowJurnalModal(false)}
                  className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  onClick={h.handleSubmitJurnal}
                  disabled={!h.isJurnalBalanced || h.jurnalFormLoading}
                  className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {h.jurnalFormLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Simpan Jurnal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <ChangePasswordModal
        show={h.showPasswordModal}
        onClose={() => h.setShowPasswordModal(false)}
        apiEndpoint="/api/tenant/change-password"
      />

      {/* Command Palette - key forces remount when opened to reset internal state */}
      <CommandPalette
        key={showCommandPalette ? 'open' : 'closed'}
        show={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onNavigate={(tab) => { setTenantTab(tab); setShowCommandPalette(false) }}
        onCreateNew={() => { handleCreateNew(); setShowCommandPalette(false) }}
        currentTab={h.tenantTab}
        recentSearches={recentSearches}
        onAddRecentSearch={addRecentSearch}
      />

      {/* Keyboard Shortcuts Help */}
      <ShortcutsHelp
        show={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#10b981] to-[#059669]">
                <Landmark className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold">
                Bumdes<span className="text-[#10b981]">Juara</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              © 2025 BumdesJuara by reinKarnasi · {user?.tenantName || 'Dashboard'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
