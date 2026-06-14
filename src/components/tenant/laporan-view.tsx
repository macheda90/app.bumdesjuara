'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Printer,
  Calendar,
  Filter,
  Scale,
  CheckCircle2,
  XCircle,
  Download,
  FileDown,
  Package,
} from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'
import { PulseSkeleton, CardSkeleton } from '@/components/tenant/shared'
import type { NeracaData, LabaRugiData } from '@/lib/tenant-types'

// ─── Laporan View Component ────────────────────────────────────────────────────

export function LaporanView({
  subTab,
  setSubTab,
  neracaData,
  labaRugiData,
  loading,
  tenantName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyDateFilter,
}: {
  subTab: 'neraca' | 'laba-rugi'
  setSubTab: (tab: 'neraca' | 'laba-rugi') => void
  neracaData: NeracaData | null
  labaRugiData: LabaRugiData | null
  loading: boolean
  tenantName?: string
  startDate: string
  setStartDate: (d: string) => void
  endDate: string
  setEndDate: (d: string) => void
  onApplyDateFilter: () => void
}) {
  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const buildExportUrl = (format: 'csv' | 'pdf', reportType: 'neraca' | 'laba-rugi') => {
    const base = format === 'csv' ? '/api/tenant/export' : '/api/tenant/export-pdf'
    const params = new URLSearchParams({ type: reportType })
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return `${base}?${params.toString()}`
  }

  const handleExport = (format: 'csv' | 'pdf', reportType: 'neraca' | 'laba-rugi') => {
    window.open(buildExportUrl(format, reportType))
  }

  return (
    <motion.div
      key="laporan"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Laporan Keuangan</h2>
          <p className="text-sm text-(--text-secondary)">Neraca dan Laba Rugi</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('csv', subTab)}
            disabled={subTab === 'neraca' ? !neracaData : !labaRugiData}
            className="flex items-center gap-2 rounded-lg border border-(--border-color) px-4 py-2 text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-tertiary) active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport('pdf', subTab)}
            disabled={subTab === 'neraca' ? !neracaData : !labaRugiData}
            className="flex items-center gap-2 rounded-lg border border-(--border-color) px-4 py-2 text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-tertiary) active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-(--border-color) px-4 py-2 text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-tertiary) active:scale-[0.98]"
          >
            <Printer className="h-4 w-4" />
            Cetak
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mb-6 glass-card rounded-xl p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
            <Calendar className="h-4 w-4 text-emerald" />
            <span className="font-medium">Periode:</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-(--text-secondary)/70">Dari</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-(--border-color) bg-(--bg-tertiary) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <span className="hidden sm:flex items-center text-(--text-secondary)/40 pb-2">—</span>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-(--text-secondary)/70">Sampai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-(--border-color) bg-(--bg-tertiary) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            <button
              onClick={onApplyDateFilter}
              className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
            >
              <Filter className="h-3.5 w-3.5" />
              Terapkan
            </button>
            {(startDate || endDate) && (
              <button
                onClick={() => { setStartDate(''); setEndDate(''); setTimeout(onApplyDateFilter, 50) }}
                className="rounded-lg border border-(--border-color) px-3 py-2 text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-tertiary) active:scale-[0.98]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-tab Toggle */}
      <div className="mb-6 flex gap-1 rounded-lg border border-(--border-color) bg-(--bg-secondary) p-1">
        {[
          { id: 'neraca' as const, label: 'Neraca', icon: Scale },
          { id: 'laba-rugi' as const, label: 'Laba Rugi', icon: TrendingUp },
        ].map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${subTab === tab.id
                ? 'bg-emerald/10 text-emerald'
                : 'text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)'
                }`}
            >
              <TabIcon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Report Content */}
      <AnimatePresence mode="wait">
        {subTab === 'neraca' && (
          <motion.div
            key="neraca"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            {loading && !neracaData ? (
              <CardSkeleton lines={5} />
            ) : neracaData ? (
              <NeracaReport data={neracaData} tenantName={tenantName} today={today} />
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-(--accent-light)">
                  <BarChart3 className="h-8 w-8 text-emerald" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-(--text-primary)">Gagal Memuat Neraca</h3>
                <p className="text-sm text-(--text-secondary)">Tidak dapat memuat data neraca saat ini</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {subTab === 'laba-rugi' && (
          <motion.div
            key="laba-rugi"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            {loading && !labaRugiData ? (
              <CardSkeleton lines={5} />
            ) : labaRugiData ? (
              <LabaRugiReport data={labaRugiData} tenantName={tenantName} today={today} />
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-(--accent-light)">
                  <BarChart3 className="h-8 w-8 text-emerald" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-(--text-primary)">Gagal Memuat Laba Rugi</h3>
                <p className="text-sm text-(--text-secondary)">Tidak dapat memuat data laba rugi saat ini</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Neraca Report ─────────────────────────────────────────────────────────────

export function NeracaReport({ data, tenantName, today }: { data: NeracaData; tenantName?: string; today: string }) {
  const isBalanced = Math.abs(data.aset.total - data.totalKewajibanEkuitas) < 1

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Report Header */}
      <div className="bg-(--report-header-bg) border-b border-(--border-color) p-6 text-center">
        <h3 className="text-xl font-bold">NERACA</h3>
        <p className="text-sm text-(--text-secondary) mt-1">{tenantName || 'Perusahaan'}</p>
        <p className="text-xs text-(--text-secondary)/70 mt-0.5">Periode: {data.periode}</p>
        <p className="text-xs text-(--text-secondary)/50 mt-0.5">Tanggal Cetak: {today}</p>
      </div>

      <div className="p-6 space-y-6 print-report">
        {/* ASET Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">ASET</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-120">
              <thead>
                <tr className="border-b border-(--border-color) text-left text-xs font-medium text-(--text-secondary)">
                  <th className="px-3 py-2">Kode</th>
                  <th className="px-3 py-2">Nama Akun</th>
                  <th className="px-3 py-2 text-right">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {data.aset.items.map((item) => (
                  <tr key={item.kodeAkun} className="border-b border-(--divider-subtle) transition-colors duration-150 hover:bg-(--accent-light)">
                    <td className="px-3 py-2">
                      <code className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs text-emerald-400">{item.kodeAkun}</code>
                    </td>
                    <td className="px-3 py-2 text-sm">{item.namaAkun}</td>
                    <td className="px-3 py-2 text-right text-sm font-medium">{formatCurrency(item.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-4 py-3 mt-2">
            <span className="text-sm font-bold text-emerald-400">TOTAL ASET</span>
            <span className="text-sm font-bold text-emerald-400">{formatCurrency(data.aset.total)}</span>
          </div>
        </div>

        {/* KEWAJIBAN Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">KEWAJIBAN</h4>
          </div>
          {data.kewajiban.items.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-120">
                  <thead>
                    <tr className="border-b border-(--border-color) text-left text-xs font-medium text-(--text-secondary)">
                      <th className="px-3 py-2">Kode</th>
                      <th className="px-3 py-2">Nama Akun</th>
                      <th className="px-3 py-2 text-right">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.kewajiban.items.map((item) => (
                      <tr key={item.kodeAkun} className="border-b border-(--divider-subtle) transition-colors duration-150 hover:bg-(--accent-light)">
                        <td className="px-3 py-2">
                          <code className="rounded bg-red-500/10 px-1.5 py-0.5 text-xs text-red-400">{item.kodeAkun}</code>
                        </td>
                        <td className="px-3 py-2 text-sm">{item.namaAkun}</td>
                        <td className="px-3 py-2 text-right text-sm font-medium">{formatCurrency(item.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-4 py-3 mt-2">
                <span className="text-sm font-bold text-red-400">TOTAL KEWAJIBAN</span>
                <span className="text-sm font-bold text-red-400">{formatCurrency(data.kewajiban.total)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-(--text-secondary)/60 py-2 px-3">Tidak ada kewajiban</p>
          )}
        </div>

        {/* EKUITAS Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400">EKUITAS</h4>
          </div>
          {data.ekuitas.items.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-120">
                  <thead>
                    <tr className="border-b border-(--border-color) text-left text-xs font-medium text-(--text-secondary)">
                      <th className="px-3 py-2">Kode</th>
                      <th className="px-3 py-2">Nama Akun</th>
                      <th className="px-3 py-2 text-right">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.ekuitas.items.map((item) => (
                      <tr key={item.kodeAkun} className="border-b border-(--divider-subtle) transition-colors duration-150 hover:bg-(--accent-light)">
                        <td className="px-3 py-2">
                          <code className="rounded bg-purple-500/10 px-1.5 py-0.5 text-xs text-purple-400">{item.kodeAkun}</code>
                        </td>
                        <td className="px-3 py-2 text-sm">{item.namaAkun}</td>
                        <td className="px-3 py-2 text-right text-sm font-medium">{formatCurrency(item.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-purple-500/5 border border-purple-500/10 px-4 py-3 mt-2">
                <span className="text-sm font-bold text-purple-400">TOTAL EKUITAS</span>
                <span className="text-sm font-bold text-purple-400">{formatCurrency(data.ekuitas.total)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-(--text-secondary)/60 py-2 px-3">Tidak ada ekuitas</p>
          )}
        </div>

        {/* Laba Ditahan */}
        <div className="flex items-center justify-between rounded-lg bg-(--bg-secondary) border border-(--border-color) px-4 py-3">
          <span className="text-sm font-medium text-(--text-secondary)">LABA DITAHAN</span>
          <span className={`text-sm font-bold ${data.labaDitahan >= 0 ? 'text-emerald' : 'text-[#ef4444]'}`}>
            {formatCurrency(data.labaDitahan)}
          </span>
        </div>

        {/* Total Kewajiban + Ekuitas */}
        <div className="flex items-center justify-between rounded-lg bg-linear-to-r from-purple-900/20 to-red-900/20 border border-(--border-color) px-4 py-3">
          <span className="text-sm font-bold text-(--text-primary)">TOTAL KEWAJIBAN + EKUITAS</span>
          <span className="text-sm font-bold text-(--text-primary)">{formatCurrency(data.totalKewajibanEkuitas)}</span>
        </div>

        {/* Balance Check */}
        <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${isBalanced
          ? 'border-emerald/20 bg-emerald/5'
          : 'border-red-500/20 bg-red-500/5'
          }`}>
          <div className="flex items-center gap-2">
            {isBalanced ? (
              <CheckCircle2 className="h-5 w-5 text-emerald" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400" />
            )}
            <span className={`text-sm font-bold ${isBalanced ? 'text-emerald' : 'text-red-400'}`}>
              Neraca {isBalanced ? 'Seimbang' : 'Tidak Seimbang'}
            </span>
          </div>
          <div className="text-xs text-(--text-secondary)">
            Aset: {formatCurrency(data.aset.total)} | Kewajiban + Ekuitas: {formatCurrency(data.totalKewajibanEkuitas)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Laba Rugi Report ──────────────────────────────────────────────────────────

export function LabaRugiReport({ data, tenantName, today }: { data: LabaRugiData; tenantName?: string; today: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/50 shadow-xl shadow-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 dark:shadow-black/30">
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      {/* Report Header */}
      <div className="relative border-b border-gray-200/70 bg-gradient-to-r from-gray-50/50 to-transparent px-8 py-7 dark:border-gray-800/70 dark:from-gray-800/30">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/40">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                LAPORAN LABA RUGI
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {tenantName || 'Perusahaan'}
            </p>
          </div>

          <div className="space-y-1 rounded-xl border border-gray-200/50 bg-white/50 px-5 py-2.5 text-left shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Periode: <span className="font-medium text-gray-700 dark:text-gray-300">{data.periode}</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Printer className="h-3.5 w-3.5" />
              <span>Cetak: <span className="font-medium text-gray-700 dark:text-gray-300">{today}</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-6 print-report md:p-8">

        {/* PENDAPATAN Section */}
        <SectionCard icon={TrendingUp} title="PENDAPATAN" colorScheme="emerald">
          {data.pendapatan.items.length > 0 ? (
            <>
              <DataTable items={data.pendapatan.items} color="emerald" />
              <TotalRow label="TOTAL PENDAPATAN" amount={data.pendapatan.total} color="emerald" />
            </>
          ) : (
            <EmptyState message="Tidak ada pendapatan" />
          )}
        </SectionCard>

        {/* HPP Section */}
        <SectionCard icon={Package} title="HARGA POKOK PENJUALAN (HPP)" colorScheme="orange">
          {data.hpp.items.length > 0 ? (
            <>
              <DataTable items={data.hpp.items} color="orange" />
              <TotalRow label="TOTAL HPP" amount={data.hpp.total} color="orange" />
            </>
          ) : (
            <EmptyState message="Tidak ada HPP" />
          )}
        </SectionCard>

        {/* Gross Profit Card */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200/80 bg-gradient-to-r from-emerald-50/40 via-gray-50/30 to-orange-50/40 p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700/80 dark:from-emerald-950/20 dark:via-gray-900/30 dark:to-orange-950/20">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/50">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span className="text-base font-bold text-gray-900 dark:text-white">LABA KOTOR</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Pendapatan - HPP</p>
              </div>
            </div>
            <span className={`text-2xl font-extrabold tracking-tight ${data.labaKotor >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {formatCurrency(data.labaKotor)}
            </span>
          </div>
        </div>

        {/* BEBAN Section */}
        <SectionCard icon={TrendingDown} title="BEBAN" colorScheme="rose">
          {data.beban.items.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <DataTable items={data.beban.items} color="rose" stickyHeader />
              </div>
              <TotalRow label="TOTAL BEBAN" amount={data.beban.total} color="rose" />
            </>
          ) : (
            <EmptyState message="Tidak ada beban" />
          )}
        </SectionCard>

        {/* Net Profit/Loss Hero Card */}
        <div className={`relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ${data.labaBersih >= 0
            ? 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 shadow-lg shadow-emerald-100/50 dark:border-emerald-800/60 dark:from-emerald-950/30 dark:via-gray-900 dark:to-emerald-950/20 dark:shadow-emerald-900/30'
            : 'border-rose-200/80 bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 shadow-lg shadow-rose-100/50 dark:border-rose-800/60 dark:from-rose-950/30 dark:via-gray-900 dark:to-rose-950/20 dark:shadow-rose-900/30'
          }`}>
          <div className="absolute top-0 right-0 -mr-12 -mt-12 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h4 className={`text-xl font-black tracking-tight ${data.labaBersih >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                }`}>
                {data.labaBersih >= 0 ? 'LABA BERSIH' : 'RUGI BERSIH'}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Laba Kotor - Total Beban</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-black tracking-tighter ${data.labaBersih >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                {data.labaBersih >= 0 ? '+' : '−'}
              </span>
              <span className={`text-4xl font-black tracking-tight ${data.labaBersih >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                {formatCurrency(Math.abs(data.labaBersih))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle footer watermark */}
      <div className="border-t border-gray-200/50 px-8 py-3 text-center text-[10px] text-gray-400/60 dark:border-gray-800/50">
        Dicetak secara elektronik • Dokumen resmi
      </div>
    </div>
  );
}

// ========== Subcomponents for modular elegance ==========

interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  colorScheme: 'emerald' | 'orange' | 'rose';
  children: React.ReactNode;
}

function SectionCard({ icon: Icon, title, colorScheme, children }: SectionCardProps) {
  const colorMap = {
    emerald: 'border-emerald-200/50 bg-emerald-50/10 dark:border-emerald-800/30 dark:bg-emerald-950/10',
    orange: 'border-orange-200/50 bg-orange-50/10 dark:border-orange-800/30 dark:bg-orange-950/10',
    rose: 'border-rose-200/50 bg-rose-50/10 dark:border-rose-800/30 dark:bg-rose-950/10',
  };

  return (
    <div className={`rounded-xl border ${colorMap[colorScheme]} overflow-hidden shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-center gap-2.5 border-b border-gray-200/50 px-5 py-3.5 dark:border-gray-700/50">
        <Icon className={`h-4 w-4 text-${colorScheme}-600 dark:text-${colorScheme}-400`} />
        <h4 className={`text-sm font-bold uppercase tracking-wider text-${colorScheme}-700 dark:text-${colorScheme}-300`}>
          {title}
        </h4>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

interface DataTableProps {
  items: Array<{ kodeAkun: string; namaAkun: string; saldo: number }>;
  color: 'emerald' | 'orange' | 'rose';
  stickyHeader?: boolean;
}

function DataTable({ items, color, stickyHeader = false }: DataTableProps) {
  const codeColorClass = {
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="border-b border-gray-200 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
            <th className="px-4 py-3">Kode</th>
            <th className="px-4 py-3">Nama Akun</th>
            <th className="px-4 py-3 text-right">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr
              key={item.kodeAkun}
              className={`border-b border-gray-100 transition-colors duration-150 hover:bg-gray-50/60 dark:border-gray-800 dark:hover:bg-gray-800/30 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900/30' : 'bg-transparent'
                }`}
            >
              <td className="px-4 py-2.5">
                <code className={`inline-block rounded-md px-2 py-0.5 font-mono text-xs font-medium ${codeColorClass[color]}`}>
                  {item.kodeAkun}
                </code>
              </td>
              <td className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">{item.namaAkun}</td>
              <td className="px-4 py-2.5 text-right text-sm font-semibold text-gray-800 dark:text-gray-200">
                {formatCurrency(item.saldo)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TotalRowProps {
  label: string;
  amount: number;
  color: 'emerald' | 'orange' | 'rose';
}

function TotalRow({ label, amount, color }: TotalRowProps) {
  const bgColorMap = {
    emerald: 'bg-emerald-50/60 border-emerald-200/60 dark:bg-emerald-950/20 dark:border-emerald-800/40',
    orange: 'bg-orange-50/60 border-orange-200/60 dark:bg-orange-950/20 dark:border-orange-800/40',
    rose: 'bg-rose-50/60 border-rose-200/60 dark:bg-rose-950/20 dark:border-rose-800/40',
  };

  const textColorMap = {
    emerald: 'text-emerald-700 dark:text-emerald-300',
    orange: 'text-orange-700 dark:text-orange-300',
    rose: 'text-rose-700 dark:text-rose-300',
  };

  return (
    <div className={`mt-3 flex items-center justify-between rounded-lg border px-4 py-2.5 ${bgColorMap[color]}`}>
      <span className={`text-sm font-bold ${textColorMap[color]}`}>{label}</span>
      <span className={`text-base font-bold ${textColorMap[color]}`}>{formatCurrency(amount)}</span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-6 text-center">
      <p className="text-sm text-gray-400 dark:text-gray-500">{message}</p>
    </div>
  );
}

// Note: formatCurrency should be defined elsewhere in your codebase
// Example implementation:
// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
// };