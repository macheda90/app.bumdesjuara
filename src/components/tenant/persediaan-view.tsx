'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  List,
  AlertTriangle,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'
import { PulseSkeleton, GenericModal, DarkInput, CardGridSkeleton } from '@/components/tenant/shared'
import type { PersediaanItem, PersediaanSummary } from '@/lib/tenant-types'

// ─── Persediaan View ───────────────────────────────────────────────────────────

export function PersediaanView({
  list,
  loading,
  search,
  setSearch,
  summary,
  showModal,
  setShowModal,
  form,
  setForm,
  formLoading,
  editingItem,
  deleteConfirm,
  setDeleteConfirm,
  onSubmit,
  onEdit,
  onDelete,
}: {
  list: PersediaanItem[]; loading: boolean; search: string; setSearch: (s: string) => void
  summary: PersediaanSummary | null; showModal: boolean; setShowModal: (s: boolean) => void
  form: { namaBarang: string; satuan: string; hargaBeli: number; hargaJual: number; stok: number }
  setForm: (f: typeof form) => void; formLoading: boolean; editingItem: PersediaanItem | null
  deleteConfirm: string | null; setDeleteConfirm: (id: string | null) => void
  onSubmit: () => void; onEdit: (item: PersediaanItem) => void; onDelete: (id: string) => void
}) {
  return (
    <motion.div key="persediaan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Persediaan</h2>
          <p className="text-sm text-[var(--text-secondary)]">Kelola stok dan inventaris barang</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari barang..." className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-48" />
          </div>
          <button onClick={() => { setForm({ namaBarang: '', satuan: '', hargaBeli: 0, hargaJual: 0, stok: 0 }); setShowModal(true) }} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]">
            <Plus className="h-4 w-4" />Tambah
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-amber-500/5 to-transparent p-4 transition-all hover:border-[var(--border-hover)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Total Nilai Persediaan</p>
              <p className="mt-1 text-lg font-bold">{formatCurrency(summary?.totalNilai || 0)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Package className="h-5 w-5 text-amber-400" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-[#10b981]/5 to-transparent p-4 transition-all hover:border-[var(--border-hover)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Jumlah Barang</p>
              <p className="mt-1 text-lg font-bold">{summary?.totalBarang || 0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/10">
              <List className="h-5 w-5 text-[#10b981]" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-red-500/5 to-transparent p-4 transition-all hover:border-[var(--border-hover)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Stok Rendah</p>
              <p className="mt-1 text-lg font-bold text-red-400">{summary?.totalStokRendah || 0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Table */}
      {loading ? (
        <CardGridSkeleton count={5} />
      ) : list.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card flex flex-col items-center justify-center rounded-xl py-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <Package className="h-8 w-8 text-amber-400" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Persediaan</h3>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">Tambahkan barang pertama untuk mulai mengelola stok inventaris</p>
          <button
            onClick={() => { setForm({ namaBarang: '', satuan: '', hargaBeli: 0, hargaJual: 0, stok: 0 }); setShowModal(true) }}
            className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Tambah Barang
          </button>
        </motion.div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-left text-xs font-medium text-[var(--text-secondary)]">
                  <th className="px-4 py-3">Nama Barang</th>
                  <th className="px-4 py-3">Satuan</th>
                  <th className="px-4 py-3 text-right">Harga Beli</th>
                  <th className="px-4 py-3 text-right">Harga Jual</th>
                  <th className="px-4 py-3 text-center">Stok</th>
                  <th className="px-4 py-3 text-right">Nilai</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, idx) => {
                  const nilai = item.stok * item.hargaBeli
                  const isLowStock = item.stok <= 10
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)] ${isLowStock ? 'bg-red-500/[0.03]' : ''}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium">{item.namaBarang}</td>
                      <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.satuan || '-'}</td>
                      <td className="px-4 py-3 text-right text-sm text-[var(--text-secondary)]">{formatCurrency(item.hargaBeli)}</td>
                      <td className="px-4 py-3 text-right text-sm text-[var(--text-secondary)]">{formatCurrency(item.hargaJual)}</td>
                      <td className="px-4 py-3 text-center">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-400 border border-red-500/20">
                            <AlertTriangle className="h-3 w-3" />
                            {item.stok}
                          </span>
                        ) : (
                          <span className="text-sm font-medium">{item.stok}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium">{formatCurrency(nilai)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => onEdit(item)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]" title="Edit">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setDeleteConfirm(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400" title="Hapus">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[var(--border-color)] bg-[var(--bg-secondary)]">
                  <td className="px-4 py-3 text-sm font-bold" colSpan={5}>Total Nilai Persediaan</td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-amber-400">{formatCurrency(summary?.totalNilai || 0)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <GenericModal show={showModal} onClose={() => { setShowModal(false); setDeleteConfirm(null) }} title={editingItem ? 'Edit Persediaan' : 'Tambah Persediaan'} subtitle="Data barang" icon={Package} iconColor="#f59e0b">
        <div className="space-y-4">
          <DarkInput label="Nama Barang" type="text" value={form.namaBarang} onChange={(e) => setForm({ ...form, namaBarang: e.target.value })} placeholder="Nama barang..." />
          <div className="grid grid-cols-2 gap-4">
            <DarkInput label="Satuan" type="text" value={form.satuan} onChange={(e) => setForm({ ...form, satuan: e.target.value })} placeholder="pcs, kg, ltr..." />
            <DarkInput label="Stok" type="number" value={form.stok || ''} onChange={(e) => setForm({ ...form, stok: Number(e.target.value) })} placeholder="0" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DarkInput label="Harga Beli (Rp)" type="number" value={form.hargaBeli || ''} onChange={(e) => setForm({ ...form, hargaBeli: Number(e.target.value) })} placeholder="0" />
            <DarkInput label="Harga Jual (Rp)" type="number" value={form.hargaJual || ''} onChange={(e) => setForm({ ...form, hargaJual: Number(e.target.value) })} placeholder="0" />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
            <button onClick={onSubmit} disabled={formLoading || !form.namaBarang} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Simpan</button>
          </div>
        </div>
      </GenericModal>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center" onClick={(e) => e.stopPropagation()}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10"><AlertTriangle className="h-7 w-7 text-red-400" /></div>
              <h3 className="mb-2 text-lg font-bold">Konfirmasi Hapus</h3>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">Apakah Anda yakin ingin menghapus barang ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
                <button onClick={() => onDelete(deleteConfirm)} className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"><Trash2 className="h-4 w-4" />Hapus</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
