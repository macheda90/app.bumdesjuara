'use client'

import { motion } from 'framer-motion'
import {
  Printer,
  Calendar,
  Filter,
  Scale,
  CheckCircle2,
  XCircle,
  Download,
  FileDown,
  RefreshCw,
} from 'lucide-react'
import { formatCurrency, getTipeAkunColor } from '@/lib/tenant-utils'
import { PulseSkeleton, TableSkeleton } from '@/components/tenant/shared'
import type { NeracaSaldoData } from '@/lib/tenant-types'

// ─── Neraca Saldo View Component ─────────────────────────────────────────────

export function NeracaSaldoView({
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
  data: NeracaSaldoData | null
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

  const buildExportUrl = (format: 'csv' | 'pdf') => {
    const base = format === 'csv' ? '/api/tenant/export' : '/api/tenant/export-pdf'
    const params = new URLSearchParams({ type: 'neraca-saldo' })
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return `${base}?${params.toString()}`
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    window.open(buildExportUrl(format))
  }

  return (
    <motion.div
      key="neraca-saldo"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Neraca Saldo</h2>
          <p className="text-sm text-[var(--text-secondary)]">Trial Balance — ringkasan saldo akun periode</p>
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
        <div className="glass-card card-shimmer rounded-xl p-6 space-y-4">
          <PulseSkeleton className="h-8 w-48 mx-auto" />
          <PulseSkeleton className="h-4 w-32 mx-auto" />
          <div className="mt-6">
            <TableSkeleton rows={5} cols={6} />
          </div>
        </div>
      ) : data ? (
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Report Header */}
          <div className="bg-[var(--report-header-bg)] border-b border-[var(--border-color)] p-6 text-center">
            <h3 className="text-xl font-bold">NERACA SALDO</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{tenantName || 'Perusahaan'}</p>
            <p className="text-xs text-[var(--text-secondary)]/70 mt-0.5">Periode: {data.periode}</p>
            <p className="text-xs text-[var(--text-secondary)]/50 mt-0.5">Tanggal Cetak: {today}</p>
          </div>

          {/* Balance Check Indicator */}
          <div className={`flex items-center justify-center gap-2 border-b border-[var(--border-color)] px-4 py-3 ${
            data.seimbang
              ? 'bg-[#10b981]/5 border-b-[#10b981]/10'
              : 'bg-red-500/5 border-b-red-500/10'
          }`}>
            {data.seimbang ? (
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
            ) : (
              <XCircle className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm font-bold ${data.seimbang ? 'text-[#10b981]' : 'text-red-400'}`}>
              {data.seimbang ? 'Seimbang ✅' : 'Tidak Seimbang ❌'}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[680px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-left text-xs font-medium text-[var(--text-secondary)]">
                    <th className="px-4 py-3">Kode Akun</th>
                    <th className="px-4 py-3">Nama Akun</th>
                    <th className="px-4 py-3">Tipe Akun</th>
                    <th className="px-4 py-3 text-right">Saldo Awal</th>
                    <th className="px-4 py-3 text-right">Debit</th>
                    <th className="px-4 py-3 text-right">Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.accounts.length > 0 ? (
                    data.accounts.map((account, idx) => {
                      const tipeColor = getTipeAkunColor(account.tipeAkun)
                      return (
                        <motion.tr
                          key={account.kodeAkun}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02, duration: 0.2 }}
                          className="border-b border-[var(--divider-subtle)] transition-colors duration-150 hover:bg-[var(--accent-light)]"
                        >
                          <td className="px-4 py-2.5">
                            <code className={`rounded px-1.5 py-0.5 text-xs ${tipeColor.text} ${tipeColor.bg}`}>
                              {account.kodeAkun}
                            </code>
                          </td>
                          <td className="px-4 py-2.5 text-sm">{account.namaAkun}</td>
                          <td className="px-4 py-2.5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${tipeColor.text} ${tipeColor.bg} border ${tipeColor.border}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${tipeColor.dot}`} />
                              {account.tipeAkun}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right text-sm text-[var(--text-secondary)]">
                            {formatCurrency(account.saldoAwal)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-sm">
                            {account.debit > 0 ? (
                              <span className="text-[#10b981] font-medium">{formatCurrency(account.debit)}</span>
                            ) : (
                              <span className="text-[var(--text-secondary)]/40">-</span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-right text-sm">
                            {account.kredit > 0 ? (
                              <span className="text-[#ef4444] font-medium">{formatCurrency(account.kredit)}</span>
                            ) : (
                              <span className="text-[var(--text-secondary)]/40">-</span>
                            )}
                          </td>
                        </motion.tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td className="px-4 py-12 text-center" colSpan={6}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
                            <Scale className="h-8 w-8 text-[#10b981]" />
                          </div>
                          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Data Akun</h3>
                          <p className="text-sm text-[var(--text-secondary)]">Buat jurnal terlebih dahulu untuk menghasilkan neraca saldo</p>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </tbody>
                {/* Total Row */}
                {data.accounts.length > 0 && (
                  <tfoot>
                    <tr className="border-t-2 border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      <td className="px-4 py-3 text-sm font-bold" colSpan={3}>TOTAL</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-[var(--text-secondary)]">
                        {formatCurrency(data.accounts.reduce((s, a) => s + a.saldoAwal, 0))}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-[#10b981]">
                        {formatCurrency(data.totalDebit)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-[#ef4444]">
                        {formatCurrency(data.totalKredit)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>

          {/* Bottom Balance Summary */}
          {data.accounts.length > 0 && (
            <div className="border-t border-[var(--border-color)] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    data.seimbang ? 'bg-[#10b981]/10' : 'bg-red-500/10'
                  }`}>
                    {data.seimbang ? (
                      <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${data.seimbang ? 'text-[#10b981]' : 'text-red-400'}`}>
                      {data.seimbang ? 'Neraca Saldo Seimbang' : 'Neraca Saldo Tidak Seimbang'}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Total Debit: {formatCurrency(data.totalDebit)} · Total Kredit: {formatCurrency(data.totalKredit)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--text-secondary)]/60">
                    Selisih: {formatCurrency(Math.abs(data.totalDebit - data.totalKredit))}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <Scale className="h-8 w-8 text-[#10b981]" />
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
