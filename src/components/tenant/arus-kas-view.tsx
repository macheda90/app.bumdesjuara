'use client'

import { motion } from 'framer-motion'
import {
  Printer,
  Calendar,
  Filter,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Building2,
  Landmark,
  RefreshCw,
  Download,
  FileDown,
} from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'
import { PulseSkeleton, CardSkeleton } from '@/components/tenant/shared'
import type { ArusKasData } from '@/lib/tenant-types'

// ─── Section Component ──────────────────────────────────────────────────────

function FlowSection({
  title,
  icon: Icon,
  items,
  total,
  accentColor,
  delay = 0,
}: {
  title: string
  icon: typeof TrendingUp
  items: { keterangan: string; jumlah: number }[]
  total: number
  accentColor: { bg: string; border: string; text: string; headerBg: string; dot: string; iconBg: string }
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-xl border border-[var(--border-color)] overflow-hidden"
    >
      {/* Section Header */}
      <div className={`flex items-center justify-between px-4 py-3 ${accentColor.headerBg} border-b ${accentColor.border}`}>
        <div className="flex items-center gap-2.5">
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${accentColor.iconBg}`}>
            <Icon className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
        </div>
        <div className={`text-sm font-bold ${accentColor.text}`}>
          {total >= 0 ? '+' : ''}{formatCurrency(total)}
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-[var(--divider-subtle)]">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.05 * idx, duration: 0.2 }}
              className="flex items-center justify-between px-4 py-2.5 transition-colors duration-150 hover:bg-[var(--accent-light)]"
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.jumlah >= 0 ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-[#ef4444] shrink-0" />
                )}
                <span className="text-sm text-[var(--text-primary)] truncate">{item.keterangan}</span>
              </div>
              <span className={`text-sm font-medium whitespace-nowrap ml-3 ${
                item.jumlah >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
              }`}>
                {item.jumlah >= 0 ? '+' : ''}{formatCurrency(item.jumlah)}
              </span>
            </motion.div>
          ))
        ) : (
          <div className="px-4 py-6 text-center">
            <p className="text-xs text-[var(--text-secondary)]/50">Tidak ada arus kas {title.toLowerCase()}</p>
          </div>
        )}
      </div>

      {/* Section Total */}
      {items.length > 0 && (
        <div className={`flex items-center justify-between px-4 py-3 ${accentColor.bg} border-t ${accentColor.border}`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${accentColor.text}`}>
            Total {title}
          </span>
          <span className={`text-sm font-bold ${accentColor.text}`}>
            {total >= 0 ? '+' : ''}{formatCurrency(total)}
          </span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Arus Kas View Component ────────────────────────────────────────────────

export function ArusKasView({
  data,
  loading,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onApply,
  onReset,
  tenantName,
}: {
  data: ArusKasData | null
  loading: boolean
  startDate: string
  endDate: string
  setStartDate: (v: string) => void
  setEndDate: (v: string) => void
  onApply: () => void
  onReset: () => void
  tenantName?: string
}) {
  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const perubahanKas = data ? data.saldoAkhirKas - data.saldoAwalKas : 0

  const buildExportUrl = (format: 'csv' | 'pdf') => {
    const base = format === 'csv' ? '/api/tenant/export' : '/api/tenant/export-pdf'
    const params = new URLSearchParams({ type: 'arus-kas' })
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return `${base}?${params.toString()}`
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    window.open(buildExportUrl(format))
  }

  // Accent color schemes
  const operasiAccent = {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/10',
    text: 'text-emerald-400',
    headerBg: 'bg-emerald-500/8',
    dot: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  }

  const investasiAccent = {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/10',
    text: 'text-amber-400',
    headerBg: 'bg-amber-500/8',
    dot: 'bg-amber-500',
    iconBg: 'bg-amber-500/15 text-amber-400',
  }

  const pendanaanAccent = {
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/10',
    text: 'text-purple-400',
    headerBg: 'bg-purple-500/8',
    dot: 'bg-purple-500',
    iconBg: 'bg-purple-500/15 text-purple-400',
  }

  return (
    <motion.div
      key="arus-kas"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Arus Kas</h2>
          <p className="text-sm text-[var(--text-secondary)]">Cash Flow Statement — alur kas masuk dan keluar</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('csv')}
            disabled={!data}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!data}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
          >
            <Printer className="h-4 w-4" />
            Cetak
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="h-4 w-4 text-[#10b981]" />
            <span className="font-medium">Periode:</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-[var(--text-secondary)]/70">Dari</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
              />
            </div>
            <span className="hidden sm:flex items-center text-[var(--text-secondary)]/40 pb-2">—</span>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-[var(--text-secondary)]/70">Sampai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
              />
            </div>
            <button
              onClick={onApply}
              className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
            >
              <Filter className="h-3.5 w-3.5" />
              Terapkan
            </button>
            {(startDate || endDate) && (
              <button
                onClick={onReset}
                className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading && !data ? (
        <div className="space-y-4">
          {/* Summary Cards Loading */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-shimmer">
                <CardSkeleton lines={1} />
              </div>
            ))}
          </div>
          {/* Sections Loading */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-shimmer">
              <CardSkeleton lines={3} />
            </div>
          ))}
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Report Header */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="bg-[var(--report-header-bg)] border-b border-[var(--border-color)] p-6 text-center">
              <h3 className="text-xl font-bold">LAPORAN ARUS KAS</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{tenantName || 'Perusahaan'}</p>
              <p className="text-xs text-[var(--text-secondary)]/70 mt-0.5">Periode: {data.periode}</p>
              <p className="text-xs text-[var(--text-secondary)]/50 mt-0.5">Tanggal Cetak: {today}</p>
            </div>

            {/* Summary Cards */}
            <div className="p-4 border-b border-[var(--border-color)]">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Saldo Awal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#10b981]/10">
                      <Wallet className="h-3.5 w-3.5 text-[#10b981]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Saldo Awal Kas</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{formatCurrency(data.saldoAwalKas)}</p>
                </motion.div>

                {/* Saldo Akhir */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#14b8a6]/10">
                      <Wallet className="h-3.5 w-3.5 text-[#14b8a6]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Saldo Akhir Kas</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{formatCurrency(data.saldoAkhirKas)}</p>
                </motion.div>

                {/* Perubahan Kas */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`rounded-lg border p-4 ${
                    perubahanKas >= 0
                      ? 'bg-[#10b981]/5 border-[#10b981]/10'
                      : 'bg-red-500/5 border-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-md ${
                      perubahanKas >= 0 ? 'bg-[#10b981]/10' : 'bg-red-500/10'
                    }`}>
                      {perubahanKas >= 0 ? (
                        <TrendingUp className="h-3.5 w-3.5 text-[#10b981]" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Perubahan Kas</span>
                  </div>
                  <p className={`text-lg font-bold ${perubahanKas >= 0 ? 'text-[#10b981]' : 'text-red-400'}`}>
                    {perubahanKas >= 0 ? '+' : ''}{formatCurrency(perubahanKas)}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Visual Flow Indicator */}
            <div className="p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-2">
                {/* Saldo Awal */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <div className="rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 px-3 py-1.5 text-center">
                    <p className="text-[10px] text-[var(--text-secondary)]">Awal</p>
                    <p className="text-xs font-bold text-[#10b981]">{formatCurrency(data.saldoAwalKas)}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--text-secondary)]/30 shrink-0" />
                </div>

                {/* Operasi */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-center">
                    <p className="text-[10px] text-[var(--text-secondary)]">Operasi</p>
                    <p className={`text-xs font-bold ${data.operasi.total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {data.operasi.total >= 0 ? '+' : ''}{formatCurrency(data.operasi.total)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--text-secondary)]/30 shrink-0" />
                </div>

                {/* Investasi */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-center">
                    <p className="text-[10px] text-[var(--text-secondary)]">Investasi</p>
                    <p className={`text-xs font-bold ${data.investasi.total >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                      {data.investasi.total >= 0 ? '+' : ''}{formatCurrency(data.investasi.total)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--text-secondary)]/30 shrink-0" />
                </div>

                {/* Pendanaan */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 text-center">
                    <p className="text-[10px] text-[var(--text-secondary)]">Pendanaan</p>
                    <p className={`text-xs font-bold ${data.pendanaan.total >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                      {data.pendanaan.total >= 0 ? '+' : ''}{formatCurrency(data.pendanaan.total)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[var(--text-secondary)]/30 shrink-0" />
                </div>

                {/* Saldo Akhir */}
                <div className="shrink-0">
                  <div className="rounded-lg bg-[#14b8a6]/10 border border-[#14b8a6]/20 px-3 py-1.5 text-center">
                    <p className="text-[10px] text-[var(--text-secondary)]">Akhir</p>
                    <p className="text-xs font-bold text-[#14b8a6]">{formatCurrency(data.saldoAkhirKas)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Sections */}
          <div className="space-y-4">
            {/* Aktivitas Operasi */}
            <FlowSection
              title="Aktivitas Operasi"
              icon={TrendingUp}
              items={data.operasi.items}
              total={data.operasi.total}
              accentColor={operasiAccent}
              delay={0.1}
            />

            {/* Aktivitas Investasi */}
            <FlowSection
              title="Aktivitas Investasi"
              icon={Building2}
              items={data.investasi.items}
              total={data.investasi.total}
              accentColor={investasiAccent}
              delay={0.2}
            />

            {/* Aktivitas Pendanaan */}
            <FlowSection
              title="Aktivitas Pendanaan"
              icon={Landmark}
              items={data.pendanaan.items}
              total={data.pendanaan.total}
              accentColor={pendanaanAccent}
              delay={0.3}
            />
          </div>

          {/* Final Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className={`rounded-xl border-2 p-6 ${
              perubahanKas >= 0
                ? 'border-[#10b981]/30 bg-gradient-to-r from-[#10b981]/10 to-[#10b981]/5'
                : 'border-[#ef4444]/30 bg-gradient-to-r from-[#ef4444]/10 to-[#ef4444]/5'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold">
                  {perubahanKas >= 0 ? 'Kas Bersih Bertambah' : 'Kas Bersih Berkurang'}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Saldo Awal + Operasi + Investasi + Pendanaan = Saldo Akhir
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-secondary)]">Perubahan Kas</p>
                <span className={`text-2xl font-extrabold ${perubahanKas >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {perubahanKas >= 0 ? '+' : ''}{formatCurrency(perubahanKas)}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
              <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] p-3">
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Awal</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{formatCurrency(data.saldoAwalKas)}</p>
              </div>
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider">Operasi</p>
                <p className={`text-sm font-bold ${data.operasi.total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {data.operasi.total >= 0 ? '+' : ''}{formatCurrency(data.operasi.total)}
                </p>
              </div>
              <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider">Investasi</p>
                <p className={`text-sm font-bold ${data.investasi.total >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                  {data.investasi.total >= 0 ? '+' : ''}{formatCurrency(data.investasi.total)}
                </p>
              </div>
              <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-3">
                <p className="text-[10px] text-purple-400 uppercase tracking-wider">Pendanaan</p>
                <p className={`text-sm font-bold ${data.pendanaan.total >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                  {data.pendanaan.total >= 0 ? '+' : ''}{formatCurrency(data.pendanaan.total)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <Wallet className="h-8 w-8 text-[#10b981]" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Gagal Memuat Data</h3>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">Coba ubah filter periode atau muat ulang halaman</p>
          <button
            onClick={onApply}
            className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Muat Ulang
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
