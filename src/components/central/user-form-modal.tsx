'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { CentralUserItem } from '@/hooks/use-central-state'

export function UserFormModal({
  mode,
  user,
  onClose,
  onSuccess,
}: {
  mode: 'create' | 'edit'
  user?: CentralUserItem | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: '',
    role: user?.role || 'admin',
    jabatan: user?.jabatan || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (mode === 'create') {
        const res = await fetch('/api/central/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal membuat pengguna')
          return
        }
        toast.success('Pengguna berhasil dibuat')
      } else if (user) {
        const updateData: Record<string, unknown> = {
          username: formData.username,
          role: formData.role,
          jabatan: formData.jabatan || null,
        }
        if (formData.password) {
          updateData.password = formData.password
        }
        const res = await fetch(`/api/central/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal mengupdate pengguna')
          return
        }
        toast.success('Pengguna berhasil diupdate')
      }
      onSuccess()
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:max-w-md max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {mode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="contoh: admin1"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
              Password{' '}
              {mode === 'edit' && (
                <span className="text-[var(--text-secondary)]">(kosongkan jika tidak diubah)</span>
              )}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={mode === 'create' ? 'Minimal 8 karakter' : 'Kosongkan jika tidak diubah'}
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
              required={mode === 'create'}
              minLength={mode === 'create' ? 8 : undefined}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
            >
              <option value="admin" className="bg-[var(--bg-secondary)]">Admin</option>
              <option value="superuser" className="bg-[var(--bg-secondary)]">Superuser</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
              Jabatan (opsional)
            </label>
            <input
              type="text"
              value={formData.jabatan}
              onChange={(e) =>
                setFormData({ ...formData, jabatan: e.target.value })
              }
              placeholder="contoh: Manager Operasional"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : mode === 'create' ? (
                'Buat Pengguna'
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
