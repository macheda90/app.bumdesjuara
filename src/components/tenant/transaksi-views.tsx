'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  ShoppingCart,
  PiggyBank,
  CreditCard,
  Users,
  Truck,
  Search,
  Plus,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'
import { GenericModal, DarkInput, DarkSelect, TableSkeleton } from '@/components/tenant/shared'
import type { PenjualanItem, PembelianItem, SimpananItem, PinjamanItem, PelangganItem, PemasokItem } from '@/lib/tenant-types'

// ─── Penjualan View ────────────────────────────────────────────────────────────

export function PenjualanView({ list, loading, search, setSearch, pelangganList, showModal, setShowModal, form, setForm, formLoading, onSubmit, onDelete }: {
  list: PenjualanItem[]; loading: boolean; search: string; setSearch: (s: string) => void; pelangganList: PelangganItem[]; showModal: boolean; setShowModal: (s: boolean) => void
  form: { tanggalFaktur: string; pelangganId: string; total: number; keterangan: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void; onDelete: (id: string) => void
}) {
  const totalPenjualan = list.reduce((s, p) => s + p.total, 0)
  return (
    <motion.div key="penjualan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Penjualan</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar transaksi penjualan</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-48" /></div>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10b981]/10"><ShoppingBag className="h-8 w-8 text-[#10b981]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Penjualan</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Catat transaksi penjualan pertama Anda</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Penjualan</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">No Faktur</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3 text-right">Total</th><th className="px-4 py-3">Keterangan</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium"><code className="rounded bg-[#10b981]/10 px-1.5 py-0.5 text-xs text-[#10b981]">{item.noFaktur}</code></td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{new Date(item.tanggalFaktur).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td className="px-4 py-3 text-right text-sm font-bold">{formatCurrency(item.total)}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.keterangan || '-'}</td><td className="px-4 py-3 text-right"><button onClick={() => onDelete(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 ml-auto"><Trash2 className="h-3.5 w-3.5" /></button></td></tr>))}
          </tbody><tfoot><tr className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]"><td className="px-4 py-3 text-sm font-bold" colSpan={2}>Total Penjualan</td><td className="px-4 py-3 text-right text-sm font-bold text-[#10b981]">{formatCurrency(totalPenjualan)}</td><td colSpan={2} /></tr></tfoot></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title="Tambah Penjualan" subtitle="Buat faktur penjualan baru" icon={ShoppingBag} iconColor="#10b981">
        <div className="space-y-4">
          <DarkInput label="Tanggal Faktur" type="date" value={form.tanggalFaktur} onChange={(e) => setForm({ ...form, tanggalFaktur: e.target.value })} />
          <DarkSelect label="Pelanggan" value={form.pelangganId} onChange={(e) => setForm({ ...form, pelangganId: e.target.value })}>
            <option value="" className="bg-[var(--bg-secondary)]">— Pilih pelanggan —</option>
            {pelangganList.map((p) => <option key={p.id} value={p.id} className="bg-[var(--bg-secondary)]">{p.nama}</option>)}
          </DarkSelect>
          <DarkInput label="Total" type="number" value={String(form.total)} onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} placeholder="0" />
          <DarkInput label="Keterangan" type="text" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} placeholder="Keterangan..." />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}

// ─── Pembelian View ────────────────────────────────────────────────────────────

export function PembelianView({ list, loading, search, setSearch, pemasokList, showModal, setShowModal, form, setForm, formLoading, onSubmit, onDelete }: {
  list: PembelianItem[]; loading: boolean; search: string; setSearch: (s: string) => void; pemasokList: PemasokItem[]; showModal: boolean; setShowModal: (s: boolean) => void
  form: { tanggalFaktur: string; pemasokId: string; total: number; keterangan: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void; onDelete: (id: string) => void
}) {
  const totalPembelian = list.reduce((s, p) => s + p.total, 0)
  return (
    <motion.div key="pembelian" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Pembelian</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar transaksi pembelian</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-48" /></div>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10"><ShoppingCart className="h-8 w-8 text-[#f59e0b]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Pembelian</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Catat transaksi pembelian pertama Anda</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Pembelian</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">No Faktur</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3 text-right">Total</th><th className="px-4 py-3">Keterangan</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium"><code className="rounded bg-[#f59e0b]/10 px-1.5 py-0.5 text-xs text-[#f59e0b]">{item.noFaktur}</code></td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{new Date(item.tanggalFaktur).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td className="px-4 py-3 text-right text-sm font-bold">{formatCurrency(item.total)}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.keterangan || '-'}</td><td className="px-4 py-3 text-right"><button onClick={() => onDelete(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 ml-auto"><Trash2 className="h-3.5 w-3.5" /></button></td></tr>))}
          </tbody><tfoot><tr className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]"><td className="px-4 py-3 text-sm font-bold" colSpan={2}>Total Pembelian</td><td className="px-4 py-3 text-right text-sm font-bold text-[#f59e0b]">{formatCurrency(totalPembelian)}</td><td colSpan={2} /></tr></tfoot></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title="Tambah Pembelian" subtitle="Buat faktur pembelian baru" icon={ShoppingCart} iconColor="#f59e0b">
        <div className="space-y-4">
          <DarkInput label="Tanggal Faktur" type="date" value={form.tanggalFaktur} onChange={(e) => setForm({ ...form, tanggalFaktur: e.target.value })} />
          <DarkSelect label="Pemasok" value={form.pemasokId} onChange={(e) => setForm({ ...form, pemasokId: e.target.value })}>
            <option value="" className="bg-[var(--bg-secondary)]">— Pilih pemasok —</option>
            {pemasokList.map((p) => <option key={p.id} value={p.id} className="bg-[var(--bg-secondary)]">{p.nama}</option>)}
          </DarkSelect>
          <DarkInput label="Total" type="number" value={String(form.total)} onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} placeholder="0" />
          <DarkInput label="Keterangan" type="text" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} placeholder="Keterangan..." />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}

// ─── Simpanan View ─────────────────────────────────────────────────────────────

export function SimpananView({ list, loading, filter, setFilter, showModal, setShowModal, form, setForm, formLoading, onSubmit }: {
  list: SimpananItem[]; loading: boolean; filter: string; setFilter: (f: string) => void; showModal: boolean; setShowModal: (s: boolean) => void
  form: { jenisSimpanan: string; namaAnggota: string; jenisTransaksi: string; jumlah: number; tanggal: string; keterangan: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void
}) {
  return (
    <motion.div key="simpanan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Simpanan</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar simpanan anggota</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50">
            <option value="semua" className="bg-[var(--bg-secondary)]">Semua</option>
            <option value="setor" className="bg-[var(--bg-secondary)]">Setor</option>
            <option value="tarik" className="bg-[var(--bg-secondary)]">Tarik</option>
          </select>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10b981]/10"><PiggyBank className="h-8 w-8 text-[#10b981]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Simpanan</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Catat simpanan anggota pertama</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Simpanan</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">Jenis</th><th className="px-4 py-3">Anggota</th><th className="px-4 py-3">Transaksi</th><th className="px-4 py-3 text-right">Jumlah</th><th className="px-4 py-3">Tanggal</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium">{item.jenisSimpanan}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.namaAnggota || '-'}</td><td className="px-4 py-3"><span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${item.jenisTransaksi === 'setor' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#f59e0b]/10 text-[#f59e0b]'}`}>{item.jenisTransaksi === 'setor' ? 'Setor' : 'Tarik'}</span></td><td className="px-4 py-3 text-right text-sm font-bold">{formatCurrency(item.jumlah)}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td></tr>))}
          </tbody></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title="Tambah Simpanan" subtitle="Catat simpanan anggota baru" icon={PiggyBank} iconColor="#10b981">
        <div className="space-y-4">
          <DarkSelect label="Jenis Simpanan" value={form.jenisSimpanan} onChange={(e) => setForm({ ...form, jenisSimpanan: e.target.value })}>
            <option value="Simpanan Pokok" className="bg-[var(--bg-secondary)]">Simpanan Pokok</option>
            <option value="Simpanan Wajib" className="bg-[var(--bg-secondary)]">Simpanan Wajib</option>
            <option value="Simpanan Sukarela" className="bg-[var(--bg-secondary)]">Simpanan Sukarela</option>
          </DarkSelect>
          <DarkInput label="Nama Anggota" type="text" value={form.namaAnggota} onChange={(e) => setForm({ ...form, namaAnggota: e.target.value })} placeholder="Nama anggota..." />
          <DarkSelect label="Jenis Transaksi" value={form.jenisTransaksi} onChange={(e) => setForm({ ...form, jenisTransaksi: e.target.value })}>
            <option value="setor" className="bg-[var(--bg-secondary)]">Setor</option>
            <option value="tarik" className="bg-[var(--bg-secondary)]">Tarik</option>
          </DarkSelect>
          <DarkInput label="Jumlah" type="number" value={String(form.jumlah)} onChange={(e) => setForm({ ...form, jumlah: Number(e.target.value) })} placeholder="0" />
          <DarkInput label="Tanggal" type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
          <DarkInput label="Keterangan" type="text" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} placeholder="Keterangan..." />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}

// ─── Pinjaman View ─────────────────────────────────────────────────────────────

export function PinjamanView({ list, loading, filter, setFilter, showModal, setShowModal, form, setForm, formLoading, onSubmit }: {
  list: PinjamanItem[]; loading: boolean; filter: string; setFilter: (f: string) => void; showModal: boolean; setShowModal: (s: boolean) => void
  form: { jenisPinjaman: string; namaAnggota: string; jumlahPokok: number; bunga: number; tanggal: string; keterangan: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void
}) {
  return (
    <motion.div key="pinjaman" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Pinjaman</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar pinjaman anggota</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50">
            <option value="semua" className="bg-[var(--bg-secondary)]">Semua</option>
            <option value="aktif" className="bg-[var(--bg-secondary)]">Aktif</option>
            <option value="lunas" className="bg-[var(--bg-secondary)]">Lunas</option>
          </select>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10"><CreditCard className="h-8 w-8 text-[#f59e0b]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Pinjaman</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Catat pinjaman anggota pertama</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Pinjaman</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">Jenis</th><th className="px-4 py-3">Anggota</th><th className="px-4 py-3 text-right">Pokok</th><th className="px-4 py-3 text-right">Sisa</th><th className="px-4 py-3">Status</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium">{item.jenisPinjaman}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.namaAnggota || '-'}</td><td className="px-4 py-3 text-right text-sm font-bold">{formatCurrency(item.jumlahPokok)}</td><td className="px-4 py-3 text-right text-sm font-bold text-[#f59e0b]">{formatCurrency(item.sisaPokok)}</td><td className="px-4 py-3"><span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${item.status === 'aktif' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[var(--border-color)]/10 text-[var(--text-secondary)]'}`}>{item.status}</span></td></tr>))}
          </tbody></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title="Tambah Pinjaman" subtitle="Catat pinjaman anggota baru" icon={CreditCard} iconColor="#f59e0b">
        <div className="space-y-4">
          <DarkSelect label="Jenis Pinjaman" value={form.jenisPinjaman} onChange={(e) => setForm({ ...form, jenisPinjaman: e.target.value })}>
            <option value="Pinjaman Reguler" className="bg-[var(--bg-secondary)]">Pinjaman Reguler</option>
            <option value="Pinjaman Darurat" className="bg-[var(--bg-secondary)]">Pinjaman Darurat</option>
          </DarkSelect>
          <DarkInput label="Nama Anggota" type="text" value={form.namaAnggota} onChange={(e) => setForm({ ...form, namaAnggota: e.target.value })} placeholder="Nama anggota..." />
          <DarkInput label="Jumlah Pokok" type="number" value={String(form.jumlahPokok)} onChange={(e) => setForm({ ...form, jumlahPokok: Number(e.target.value) })} placeholder="0" />
          <DarkInput label="Bunga (%)" type="number" value={String(form.bunga)} onChange={(e) => setForm({ ...form, bunga: Number(e.target.value) })} placeholder="1.5" />
          <DarkInput label="Tanggal" type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
          <DarkInput label="Keterangan" type="text" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} placeholder="Keterangan..." />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}

// ─── Pelanggan View ────────────────────────────────────────────────────────────

export function PelangganView({ list, loading, search, setSearch, showModal, setShowModal, form, setForm, formLoading, onSubmit, editingItem, onDelete }: {
  list: PelangganItem[]; loading: boolean; search: string; setSearch: (s: string) => void; showModal: boolean; setShowModal: (s: boolean) => void
  form: { nama: string; alamat: string; telepon: string; email: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void; editingItem: PelangganItem | null; onDelete: (id: string) => void
}) {
  return (
    <motion.div key="pelanggan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Pelanggan</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar pelanggan</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-48" /></div>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10b981]/10"><Users className="h-8 w-8 text-[#10b981]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Pelanggan</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Tambahkan pelanggan pertama untuk mengelola kontak</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Pelanggan</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Alamat</th><th className="px-4 py-3">Telepon</th><th className="px-4 py-3">Email</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium">{item.nama}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.alamat || '-'}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.telepon || '-'}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.email || '-'}</td><td className="px-4 py-3 text-right"><button onClick={() => onDelete(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 ml-auto"><Trash2 className="h-3.5 w-3.5" /></button></td></tr>))}
          </tbody></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title={editingItem ? 'Edit Pelanggan' : 'Tambah Pelanggan'} subtitle={editingItem ? 'Ubah data pelanggan' : 'Tambah pelanggan baru'} icon={Users} iconColor="#10b981">
        <div className="space-y-4">
          <DarkInput label="Nama" type="text" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama pelanggan..." />
          <DarkInput label="Alamat" type="text" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} placeholder="Alamat..." />
          <DarkInput label="Telepon" type="text" value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} placeholder="08xx-xxxx-xxxx" />
          <DarkInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}

// ─── Pemasok View ──────────────────────────────────────────────────────────────

export function PemasokView({ list, loading, search, setSearch, showModal, setShowModal, form, setForm, formLoading, onSubmit, editingItem, onDelete }: {
  list: PemasokItem[]; loading: boolean; search: string; setSearch: (s: string) => void; showModal: boolean; setShowModal: (s: boolean) => void
  form: { nama: string; alamat: string; telepon: string; email: string }; setForm: (f: typeof form) => void; formLoading: boolean; onSubmit: () => void; editingItem: PemasokItem | null; onDelete: (id: string) => void
}) {
  return (
    <motion.div key="pemasok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Pemasok</h2>
          <p className="text-sm text-[var(--text-secondary)]">Daftar pemasok</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-48" /></div>
          <button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah</span></button>
        </div>
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? <div className="p-5"><TableSkeleton rows={4} cols={5} /></div> : list.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f59e0b]/10"><Truck className="h-8 w-8 text-[#f59e0b]" /></div><h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">Belum Ada Pemasok</h3><p className="mb-4 text-sm text-[var(--text-secondary)]">Tambahkan pemasok pertama untuk mengelola kontak</p><button onClick={() => setShowModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"><Plus className="h-4 w-4" />Tambah Pemasok</button></motion.div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead><tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]"><th className="px-4 py-3">Nama</th><th className="px-4 py-3">Alamat</th><th className="px-4 py-3">Telepon</th><th className="px-4 py-3">Email</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody>
            {list.map((item) => (<tr key={item.id} className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"><td className="px-4 py-3 text-sm font-medium">{item.nama}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.alamat || '-'}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.telepon || '-'}</td><td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.email || '-'}</td><td className="px-4 py-3 text-right"><button onClick={() => onDelete(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 ml-auto"><Trash2 className="h-3.5 w-3.5" /></button></td></tr>))}
          </tbody></table></div>
        )}
      </div>
      <GenericModal show={showModal} onClose={() => setShowModal(false)} title={editingItem ? 'Edit Pemasok' : 'Tambah Pemasok'} subtitle={editingItem ? 'Ubah data pemasok' : 'Tambah pemasok baru'} icon={Truck} iconColor="#f59e0b">
        <div className="space-y-4">
          <DarkInput label="Nama" type="text" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama pemasok..." />
          <DarkInput label="Alamat" type="text" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} placeholder="Alamat..." />
          <DarkInput label="Telepon" type="text" value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} placeholder="08xx-xxxx-xxxx" />
          <DarkInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" />
          <div className="flex items-center justify-end gap-3 pt-2"><button onClick={() => setShowModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button><button onClick={onSubmit} disabled={formLoading} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{formLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : null}Simpan</button></div>
        </div>
      </GenericModal>
    </motion.div>
  )
}
