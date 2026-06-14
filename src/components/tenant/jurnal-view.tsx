'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Plus,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ScrollText,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  ShieldX,
  Download,
} from 'lucide-react'
import { formatCurrency, getJurnalTipeBadge } from '@/lib/tenant-utils'
import { PulseSkeleton, CardGridSkeleton, GenericModal } from '@/components/tenant/shared'
import type { JurnalEntry, JurnalPagination } from '@/lib/tenant-types'

// ─── Approval Status Badge ────────────────────────────────────────────────────

function ApprovalBadge({ isApproved }: { isApproved: boolean | null }) {
  if (isApproved === true) {
    return (
      <span className="badge-approve inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
        <CheckCircle2 className="h-3 w-3" />
        Disetujui
      </span>
    )
  }
  if (isApproved === false) {
    return (
      <span className="badge-shake inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-400">
        <XCircle className="h-3 w-3" />
        Ditolak
      </span>
    )
  }
  return (
    <span className="badge-pulse inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400">
      <Clock className="h-3 w-3" />
      Menunggu
    </span>
  )
}

// ─── Jurnal View Component ─────────────────────────────────────────────────────

export function JurnalView({
  jurnalList,
  jurnalLoading,
  jurnalPagination,
  jurnalTipeFilter,
  setJurnalTipeFilter,
  jurnalPage,
  setJurnalPage,
  expandedJurnal,
  setExpandedJurnal,
  onOpenCreateModal,
  onApprove,
  onReject,
  approvalFilter,
  setApprovalFilter,
}: {
  jurnalList: JurnalEntry[]
  jurnalLoading: boolean
  jurnalPagination: JurnalPagination | null
  jurnalTipeFilter: string
  setJurnalTipeFilter: (f: string) => void
  jurnalPage: number
  setJurnalPage: (p: number) => void
  expandedJurnal: string | null
  setExpandedJurnal: (id: string | null) => void
  onOpenCreateModal: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
  approvalFilter: string
  setApprovalFilter: (f: string) => void
}) {
  const [rejectModalId, setRejectModalId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const tipeOptions = [
    { value: 'semua', label: 'Semua' },
    { value: 'umum', label: 'Umum' },
    { value: 'kas_masuk', label: 'Kas Masuk' },
    { value: 'kas_keluar', label: 'Kas Keluar' },
    { value: 'penjualan', label: 'Penjualan' },
    { value: 'pembelian', label: 'Pembelian' },
  ]

  const approvalFilterOptions = [
    { value: 'semua', label: 'Semua' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'approved', label: 'Disetujui' },
    { value: 'rejected', label: 'Ditolak' },
  ]

  const handleRejectConfirm = () => {
    if (rejectModalId) {
      onReject(rejectModalId, rejectReason || 'Ditolak oleh admin')
      setRejectModalId(null)
      setRejectReason('')
    }
  }

  return (
    <motion.div
      key="jurnal"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Jurnal</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar jurnal dan entri akuntansi</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
            const params = new URLSearchParams({ type: 'jurnal' })
            window.open(`/api/tenant/export?${params.toString()}`)
          }}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">CSV</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Buat Jurnal</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
          <select
            value={jurnalTipeFilter}
            onChange={(e) => setJurnalTipeFilter(e.target.value)}
            className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50"
          >
            {tipeOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--bg-secondary)]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1 overflow-x-auto">
          {approvalFilterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setApprovalFilter(opt.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                approvalFilter === opt.value
                  ? 'bg-[#10b981]/20 text-[#10b981]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {jurnalLoading ? (
          <CardGridSkeleton count={4} />
        ) : jurnalList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
              <ScrollText className="h-8 w-8 text-[#10b981]" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Jurnal</h3>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">Mulai catat transaksi keuangan dengan membuat jurnal pertama</p>
            <button
              onClick={onOpenCreateModal}
              className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Buat Jurnal Pertama
            </button>
          </motion.div>
        ) : (
          jurnalList.map((jurnal) => {
            const isExpanded = expandedJurnal === jurnal.id
            const badge = getJurnalTipeBadge(jurnal.tipe)
            const isPending = jurnal.isApproved === null || jurnal.isApproved === undefined
            return (
              <motion.div
                key={jurnal.id}
                layout
                className="card-shimmer glass-card rounded-xl overflow-hidden transition-all hover:border-[var(--border-hover)]"
              >
                <button
                  onClick={() => setExpandedJurnal(isExpanded ? null : jurnal.id)}
                  className="w-full p-4 text-left flex items-center gap-4 transition-colors hover:bg-[var(--bg-secondary)] active:scale-[0.99]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-tertiary)]">
                    <FileText className="h-5 w-5 text-[#10b981]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm truncate">
                        {jurnal.keterangan || jurnal.noBukti || 'Jurnal Umum'}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.bgColor} ${badge.color}`}>
                        {badge.label}
                      </span>
                      <ApprovalBadge isApproved={jurnal.isApproved} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-secondary)]">
                      <span>
                        {new Date(jurnal.tanggal).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {jurnal.noBukti && (
                        <span className="flex items-center gap-1">
                          <span className="text-[var(--text-secondary)]/40">·</span>
                          {jurnal.noBukti}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">
                      {formatCurrency(jurnal.totalDebit)}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {jurnal.details.length} akun
                    </p>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-[var(--text-secondary)] shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--border-color)] border-l-2 border-l-[#10b981]/30 px-4 pb-4">
                        <table className="w-full mt-3 table-mobile-scroll">
                          <thead>
                            <tr className="text-xs text-[var(--text-secondary)] border-b border-[var(--border-color)]">
                              <th className="pb-2 text-left font-medium">Kode Akun</th>
                              <th className="pb-2 text-right font-medium">Debit</th>
                              <th className="pb-2 text-right font-medium">Kredit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jurnal.details.map((detail) => (
                              <tr
                                key={detail.id}
                                className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"
                              >
                                <td className="py-2">
                                  <code className="rounded bg-[var(--border-color)] px-1.5 py-0.5 text-xs text-[#10b981]">
                                    {detail.kodeAkun}
                                  </code>
                                </td>
                                <td className="py-2 text-right text-sm">
                                  {detail.debit > 0 ? (
                                    <span className="text-[#10b981]">{formatCurrency(detail.debit)}</span>
                                  ) : (
                                    <span className="text-[var(--text-secondary)]/40">-</span>
                                  )}
                                </td>
                                <td className="py-2 text-right text-sm">
                                  {detail.kredit > 0 ? (
                                    <span className="text-[#ef4444]">{formatCurrency(detail.kredit)}</span>
                                  ) : (
                                    <span className="text-[var(--text-secondary)]/40">-</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]">
                              <td className="pt-2 text-sm font-semibold">Total</td>
                              <td className="pt-2 text-right text-sm font-bold text-[#10b981]">
                                {formatCurrency(jurnal.totalDebit)}
                              </td>
                              <td className="pt-2 text-right text-sm font-bold text-[#ef4444]">
                                {formatCurrency(jurnal.totalKredit)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>

                        {/* Approval Action Buttons */}
                        {isPending && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 flex items-center gap-3 border-t border-[var(--border-color)] pt-4"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                onApprove(jurnal.id)
                              }}
                              className="flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/25 active:scale-[0.98]"
                            >
                              <ShieldCheck className="h-4 w-4" />
                              Setujui
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setRejectModalId(jurnal.id)
                                setRejectReason('')
                              }}
                              className="flex items-center gap-2 rounded-lg bg-red-500/15 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98]"
                            >
                              <ShieldX className="h-4 w-4" />
                              Tolak
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {jurnalPagination && jurnalPagination.totalPages > 1 && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-secondary)]">
            Halaman {jurnalPagination.page} dari {jurnalPagination.totalPages} ({jurnalPagination.total} entri)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setJurnalPage(Math.max(1, jurnalPage - 1))}
              disabled={jurnalPage <= 1}
              className="flex items-center gap-1 rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <ChevronLeft className="h-4 w-4" />
              Sebelumnya
            </button>
            <button
              onClick={() => setJurnalPage(Math.min(jurnalPagination.totalPages, jurnalPage + 1))}
              disabled={jurnalPage >= jurnalPagination.totalPages}
              className="flex items-center gap-1 rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Berikutnya
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      <GenericModal
        show={rejectModalId !== null}
        onClose={() => { setRejectModalId(null); setRejectReason('') }}
        title="Tolak Jurnal"
        subtitle="Berikan alasan penolakan jurnal ini"
        icon={ShieldX}
        iconColor="#ef4444"
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => { setRejectModalId(null); setRejectReason('') }}
              className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)]"
            >
              Batal
            </button>
            <button
              onClick={handleRejectConfirm}
              className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/30 active:scale-[0.98]"
            >
              <ShieldX className="h-4 w-4" />
              Tolak Jurnal
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <label className="block text-sm text-[var(--text-secondary)]">
            Alasan Penolakan
          </label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Masukkan alasan penolakan..."
            rows={3}
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/50 focus:border-red-500/50 resize-none"
          />
        </div>
      </GenericModal>
    </motion.div>
  )
}
