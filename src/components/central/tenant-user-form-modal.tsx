'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2, UserPlus, UserCog } from 'lucide-react'
import { toast } from 'sonner'
import type { TenantUserItem } from '@/hooks/use-central-state'

export function TenantUserFormModal({
  mode,
  tenantId,
  user,
  onClose,
  onSuccess,
}: {
  mode: 'create' | 'edit'
  tenantId: string
  user?: TenantUserItem | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    namaUser: user?.namaUser || '',
    password: '',
    role: user?.role || 'staff',
    jabatan: user?.jabatan || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (mode === 'create') {
        const res = await fetch(`/api/central/tenants/${tenantId}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal membuat pengguna tenant')
          return
        }
        toast.success('Pengguna tenant berhasil ditambahkan')
      } else if (user) {
        const updateData: Record<string, unknown> = {
          namaUser: formData.namaUser,
          role: formData.role,
          jabatan: formData.jabatan || null,
        }
        if (formData.password) {
          updateData.password = formData.password
        }
        const res = await fetch(`/api/central/tenants/${tenantId}/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal mengupdate pengguna tenant')
          return
        }
        toast.success('Pengguna tenant berhasil diperbarui')
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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10b981]/10">
              {mode === 'create' ? (
                <UserPlus className="h-5 w-5 text-[#10b981]" />
              ) : (
                <UserCog className="h-5 w-5 text-[#10b981]" />
              )}
            </div>
            <h3 className="text-lg font-semibold">
              {mode === 'create' ? 'Tambah Pengguna Tenant' : 'Edit Pengguna Tenant'}
            </h3>
          </div>
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
              Nama User
            </label>
            <input
              type="text"
              value={formData.namaUser}
              onChange={(e) =>
                setFormData({ ...formData, namaUser: e.target.value })
              }
              placeholder="contoh: kasir1"
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
              <option value="manajer" className="bg-[var(--bg-secondary)]">Manajer</option>
              <option value="staff" className="bg-[var(--bg-secondary)]">Staff</option>
              <option value="kasir" className="bg-[var(--bg-secondary)]">Kasir</option>
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
              placeholder="contoh: Ketua, Kasir, Manajer Keuangan"
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
