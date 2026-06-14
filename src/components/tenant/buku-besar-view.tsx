'use client'

import { motion } from 'framer-motion'
import {
  Printer,
  Calendar,
  Filter,
  BookOpen,
  Download,
} from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'
import { PulseSkeleton, CardSkeleton } from '@/components/tenant/shared'
import type { AkunItem, BukuBesarData } from '@/lib/tenant-types'

// ─── Buku Besar View Component ─────────────────────────────────────────────────

export function BukuBesarView({
  akunList,
  selectedAkun,
  setSelectedAkun,
  data,
  loading,
  tenantName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyDateFilter,
}: {
  akunList: AkunItem[]
  selectedAkun: string
  setSelectedAkun: (kode: string) => void
  data: BukuBesarData | null
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

  const buildExportUrl = () => {
    const params = new URLSearchParams({ type: 'buku-besar', kodeAkun: selectedAkun })
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return `/api/tenant/export?${params.toString()}`
  }

  const handleExportCSV = () => {
    window.open(buildExportUrl())
  }

  return (
    <motion.div
      key="buku-besar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Buku Besar</h2>
          <p className="text-sm text-[var(--text-secondary)]">General Ledger — rincian transaksi per akun</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={!selectedAkun || !data}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            CSV
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

      {/* Account Selector & Date Range */}
      <div className="glass-card rounded-xl p-5 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-[var(--text-secondary)]">Pilih Akun</label>
            <select
              value={selectedAkun}
              onChange={(e) => setSelectedAkun(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors sm:max-w-md"
            >
              <option value="" className="bg-[var(--bg-secondary)]">— Pilih akun —</option>
              {akunList.map((akun) => (
                <option key={akun.kodeAkun} value={akun.kodeAkun} className="bg-[var(--bg-secondary)]">
                  {akun.kodeAkun} — {akun.namaAkun} ({akun.tipeAkun})
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Calendar className="h-4 w-4 text-[#10b981]" />
              <span className="font-medium text-xs">Periode:</span>
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
                onClick={onApplyDateFilter}
                className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
              >
                <Filter className="h-3.5 w-3.5" />
                Terapkan
              </button>
              {(startDate || endDate) && (
                <button
                  onClick={() => { setStartDate(''); setEndDate(''); setTimeout(onApplyDateFilter, 50) }}
                  className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {!selectedAkun ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <BookOpen className="h-8 w-8 text-[#10b981]" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Pilih Akun</h3>
          <p className="text-sm text-[var(--text-secondary)]">Pilih akun dari daftar di atas untuk melihat buku besar</p>
        </motion.div>
      ) : loading ? (
        <CardSkeleton lines={7} />
      ) : data ? (
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Account Info Header */}
          <div className="bg-[var(--report-header-bg)] border-b border-[var(--border-color)] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-cyan-500/10 px-2 py-0.5 text-sm text-cyan-400">{data.akun.kodeAkun}</code>
                  <h3 className="text-lg font-bold">{data.akun.namaAkun}</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Tipe: {data.akun.tipeAkun} · Saldo Awal: {formatCurrency(data.akun.saldoAwal)}
                </p>
                <p className="text-xs text-[var(--text-secondary)]/50 mt-0.5">
                  {tenantName || 'Perusahaan'} · Tanggal Cetak: {today}
                </p>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-left text-xs font-medium text-[var(--text-secondary)]">
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">No Bukti</th>
                    <th className="px-4 py-3">Keterangan</th>
                    <th className="px-4 py-3 text-right">Debit</th>
                    <th className="px-4 py-3 text-right">Kredit</th>
                    <th className="px-4 py-3 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Saldo Awal Row */}
                  <tr className="border-b border-[var(--border-color)] bg-[var(--table-row-alt)]">
                    <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]" colSpan={5}>Saldo Awal</td>
                    <td className="px-4 py-2.5 text-right text-sm font-bold">{formatCurrency(data.akun.saldoAwal)}</td>
                  </tr>
                  {data.entries.length > 0 ? (
                    data.entries.map((entry, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[var(--divider-subtle)] transition-colors duration-150 hover:bg-[var(--accent-light)]"
                      >
                        <td className="px-4 py-2.5 text-sm text-[var(--text-secondary)]">
                          {new Date(entry.tanggal).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-2.5 text-sm">
                          {entry.noBukti ? (
                            <code className="rounded bg-[var(--border-color)] px-1.5 py-0.5 text-xs text-[#10b981]">{entry.noBukti}</code>
                          ) : (
                            <span className="text-[var(--text-secondary)]/40">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-sm text-[var(--text-primary)] max-w-[200px] truncate">
                          {entry.keterangan || '-'}
                        </td>
                        <td className="px-4 py-2.5 text-right text-sm">
                          {entry.debit > 0 ? (
                            <span className="text-[#10b981] font-medium">{formatCurrency(entry.debit)}</span>
                          ) : (
                            <span className="text-[var(--text-secondary)]/40">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right text-sm">
                          {entry.kredit > 0 ? (
                            <span className="text-[#ef4444] font-medium">{formatCurrency(entry.kredit)}</span>
                          ) : (
                            <span className="text-[var(--text-secondary)]/40">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right text-sm font-bold">{formatCurrency(entry.saldo)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-8 text-center text-[var(--text-secondary)]/60" colSpan={6}>
                        Belum ada transaksi untuk akun ini
                      </td>
                    </tr>
                  )}
                </tbody>
                {/* Total Row */}
                <tfoot>
                  <tr className="border-t-2 border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <td className="px-4 py-3 text-sm font-bold" colSpan={3}>TOTAL</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-[#10b981]">
                      {formatCurrency(data.totalDebit)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-[#ef4444]">
                      {formatCurrency(data.totalKredit)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-bold">
                      {formatCurrency(data.saldoAkhir)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
            <BookOpen className="h-8 w-8 text-[#10b981]" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Gagal Memuat Data</h3>
          <p className="text-sm text-[var(--text-secondary)]">Tidak dapat memuat data buku besar untuk akun ini</p>
        </motion.div>
      )}
    </motion.div>
  )
}
