'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export function DeleteTenantModal({
  deletingTenant,
  onCancel,
  onConfirm,
}: {
  deletingTenant: { namaPerusahaan: string }
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md rounded-xl border border-red-500/20 bg-[var(--bg-secondary)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-red-400">Hapus Tenant</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Tindakan ini tidak dapat dibatalkan
            </p>
          </div>
        </div>
        <p className="mb-4 text-sm text-[var(--text-secondary)]">
          Anda akan menghapus tenant{' '}
          <span className="font-medium text-[var(--text-primary)]">{deletingTenant.namaPerusahaan}</span>
          . Semua data tenant akan dihapus secara permanen.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 active:scale-[0.98]"
          >
            Hapus Tenant
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
