'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'
import type { Tenant } from '@/hooks/use-central-state'

export function TenantFormModal({
  mode,
  tenant,
  onClose,
  onSuccess,
}: {
  mode: 'create' | 'edit'
  tenant?: Tenant | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    tenantId: tenant?.tenantId || '',
    namaPerusahaan: tenant?.namaPerusahaan || '',
    email: tenant?.email || '',
    domain: tenant?.domain || '',
    adminUsername: tenant?.adminUsername || '',
    adminPassword: '',
  })
  const [isActive, setIsActive] = useState(tenant?.isActive ?? true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (mode === 'create') {
        const res = await fetch('/api/central/tenants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal membuat tenant')
          return
        }
        toast.success('Tenant berhasil dibuat')
      } else if (tenant) {
        const updateData: Record<string, unknown> = {
          namaPerusahaan: formData.namaPerusahaan,
          email: formData.email,
          domain: formData.domain,
          isActive,
          adminUsername: formData.adminUsername,
        }
        if (formData.adminPassword) {
          updateData.adminPassword = formData.adminPassword
        }
        const res = await fetch(`/api/central/tenants/${tenant.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })
        const data = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Gagal mengupdate tenant')
          return
        }
        toast.success('Tenant berhasil diupdate')
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
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:max-w-lg max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {mode === 'create' ? 'Tambah Tenant Baru' : 'Edit Tenant'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
                Tenant ID (Subdomain)
              </label>
              <input
                type="text"
                value={formData.tenantId}
                onChange={(e) =>
                  setFormData({ ...formData, tenantId: e.target.value })
                }
                placeholder="contoh: bumdes-maju"
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                required
              />
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                ID unik untuk tenant, akan digunakan sebagai subdomain
              </p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
              Nama Perusahaan
            </label>
            <input
              type="text"
              value={formData.namaPerusahaan}
              onChange={(e) =>
                setFormData({ ...formData, namaPerusahaan: e.target.value })
              }
              placeholder="contoh: BUMDes Maju Jaya"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
                Domain (opsional)
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
                placeholder="custom.domain.com"
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
                Username Admin
              </label>
              <input
                type="text"
                value={formData.adminUsername}
                onChange={(e) =>
                  setFormData({ ...formData, adminUsername: e.target.value })
                }
                placeholder="admin"
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0b4d0]">
                Password Admin{' '}
                {mode === 'edit' && (
                  <span className="text-[var(--text-secondary)]">(kosongkan jika tidak diubah)</span>
                )}
              </label>
              <input
                type="password"
                value={formData.adminPassword}
                onChange={(e) =>
                  setFormData({ ...formData, adminPassword: e.target.value })
                }
                placeholder={mode === 'create' ? 'Minimal 8 karakter' : 'Kosongkan jika tidak diubah'}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                required={mode === 'create'}
              />
            </div>
          </div>

          {mode === 'edit' && (
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <div>
                <p className="text-sm font-medium">Status Tenant</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {isActive ? 'Tenant aktif dan dapat diakses' : 'Tenant nonaktif dan tidak dapat diakses'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#10b981]/10 text-[#10b981]'
                    : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                }`}
              >
                {isActive ? (
                  <>
                    <ToggleRight className="h-4 w-4" />
                    Aktif
                  </>
                ) : (
                  <>
                    <ToggleLeft className="h-4 w-4" />
                    Nonaktif
                  </>
                )}
              </button>
            </div>
          )}

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
                'Buat Tenant'
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
