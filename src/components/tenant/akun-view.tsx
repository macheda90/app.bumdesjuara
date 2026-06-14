'use client'

import { motion } from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  FileText,
  Search,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'
import { formatCurrency, getTipeAkunColor } from '@/lib/tenant-utils'
import { PulseSkeleton, TableSkeleton } from '@/components/tenant/shared'
import type { AkunItem } from '@/lib/tenant-types'

// ─── Akun View Component ───────────────────────────────────────────────────────

export function AkunView({
  neracaAkun,
  labaRugiAkun,
  ungroupedAkun,
  totalNeraca,
  totalLabaRugi,
  akunLoading,
  akunSearch,
  setAkunSearch,
  onOpenCreateModal,
  onEditAkun,
  onDeleteAkun,
}: {
  akunList: AkunItem[]
  neracaAkun: AkunItem[]
  labaRugiAkun: AkunItem[]
  ungroupedAkun: AkunItem[]
  totalNeraca: number
  totalLabaRugi: number
  akunLoading: boolean
  akunSearch: string
  setAkunSearch: (s: string) => void
  onOpenCreateModal: () => void
  onEditAkun: (akun: AkunItem) => void
  onDeleteAkun: (id: string) => void
}) {
  const renderAkunGroup = (title: string, items: AkunItem[], total: number, GroupIcon: typeof Wallet) => (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GroupIcon className="h-4 w-4 text-[#10b981]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{title}</h3>
          <span className="rounded-full bg-[var(--border-color)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">{items.length}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-[var(--text-secondary)]">Total Saldo: </span>
          <span className="text-sm font-bold text-[var(--text-primary)]">{formatCurrency(total)}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]">
                <th className="px-4 py-2.5">Kode Akun</th>
                <th className="px-4 py-2.5">Nama Akun</th>
                <th className="px-4 py-2.5">Tipe Akun</th>
                <th className="px-4 py-2.5 text-right">Saldo Awal</th>
                <th className="px-4 py-2.5 text-right">Saldo</th>
                <th className="px-4 py-2.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((akun) => {
                const colors = getTipeAkunColor(akun.tipeAkun)
                return (
                  <tr
                    key={akun.id}
                    className={`border-b border-[var(--border-color)] border-l-2 ${colors.border} transition-colors duration-150 hover:bg-[var(--accent-light)]`}
                  >
                    <td className="px-4 py-2.5">
                      <code className="rounded bg-[var(--border-color)] px-2 py-0.5 text-xs text-[#10b981]">
                        {akun.kodeAkun}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 font-medium">{akun.namaAkun}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full ${colors.bg} px-2.5 py-1 text-xs font-medium ${colors.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                        {akun.tipeAkun}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-sm text-[var(--text-secondary)]">
                      {formatCurrency(akun.saldoAwal)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-sm font-bold">
                      {formatCurrency(akun.saldo)}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onEditAkun(akun)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]" title="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => onDeleteAkun(akun.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400" title="Hapus">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Group Total */}
      <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--bg-secondary)] px-4 py-2.5 border border-[var(--border-color)]">
        <span className="text-sm font-medium text-[var(--text-secondary)]">Total {title}</span>
        <span className="text-sm font-bold text-[#10b981]">{formatCurrency(total)}</span>
      </div>
    </div>
  )

  return (
    <motion.div
      key="akun"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Daftar Akun</h2>
          <p className="text-sm text-[var(--text-secondary)]">Chart of Accounts untuk tenant Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={akunSearch}
              onChange={(e) => setAkunSearch(e.target.value)}
              placeholder="Cari akun..."
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-60"
            />
          </div>
          <button
            onClick={onOpenCreateModal}
            className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah Akun</span>
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        {akunLoading ? (
          <div className="py-6">
            <TableSkeleton rows={6} cols={5} />
          </div>
        ) : (neracaAkun.length + labaRugiAkun.length + ungroupedAkun.length) === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-light)]">
              <FileText className="h-8 w-8 text-[#10b981]" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Akun</h3>
            <p className="mb-4 text-sm text-[var(--text-secondary)]">Buat Chart of Accounts untuk mengelola akun keuangan Anda</p>
            <button
              onClick={onOpenCreateModal}
              className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Tambah Akun Pertama
            </button>
          </motion.div>
        ) : (
          <>
            {neracaAkun.length > 0 && renderAkunGroup('Neraca', neracaAkun, totalNeraca, Wallet)}
            {labaRugiAkun.length > 0 && renderAkunGroup('Laba Rugi', labaRugiAkun, totalLabaRugi, TrendingUp)}
            {ungroupedAkun.length > 0 && renderAkunGroup('Lainnya', ungroupedAkun, ungroupedAkun.reduce((s, a) => s + a.saldo, 0), FileText)}
          </>
        )}
      </div>
    </motion.div>
  )
}
