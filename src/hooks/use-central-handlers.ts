'use client'

import { toast } from 'sonner'
import { useCentralState } from '@/hooks/use-central-state'
import type { Tenant } from '@/hooks/use-central-state'

export function useCentralHandlers() {
  const s = useCentralState()

  const handleToggleActive = async (tenant: Tenant) => {
    try {
      const res = await fetch(`/api/central/tenants/${tenant.id}/toggle`, {
        method: 'PATCH',
      })
      if (res.ok) {
        toast.success(
          tenant.isActive
            ? `${tenant.namaPerusahaan} dinonaktifkan`
            : `${tenant.namaPerusahaan} diaktifkan`
        )
        s.fetchTenants()
        if (s.selectedTenant?.id === tenant.id) {
          s.setSelectedTenant({ ...tenant, isActive: !tenant.isActive })
        }
      }
    } catch {
      toast.error('Gagal mengubah status tenant')
    }
  }

  const handleDeleteTenant = async () => {
    if (!s.deletingTenant) return
    try {
      const res = await fetch(`/api/central/tenants/${s.deletingTenant.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success(`${s.deletingTenant.namaPerusahaan} berhasil dihapus`)
        if (s.selectedTenant?.id === s.deletingTenant.id) {
          s.setSelectedTenant(null)
        }
        s.setDeletingTenant(null)
        s.fetchTenants()
      }
    } catch {
      toast.error('Gagal menghapus tenant')
    }
  }

  const handleDeleteUser = async () => {
    if (!s.deletingUser) return
    try {
      const res = await fetch(`/api/central/users/${s.deletingUser.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success(`Pengguna ${s.deletingUser.username} berhasil dihapus`)
        s.setDeletingUser(null)
        s.fetchCentralUsers()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menghapus pengguna')
      }
    } catch {
      toast.error('Gagal menghapus pengguna')
    }
  }

  const handleDeleteTenantUser = async () => {
    if (!s.deletingTenantUser || !s.selectedTenant) return
    try {
      const res = await fetch(`/api/central/tenants/${s.selectedTenant.id}/users/${s.deletingTenantUser.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success(`Pengguna ${s.deletingTenantUser.namaUser} berhasil dihapus`)
        s.setDeletingTenantUser(null)
        s.fetchTenantUsers(s.selectedTenant.id)
        s.fetchTenants()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menghapus pengguna tenant')
      }
    } catch {
      toast.error('Gagal menghapus pengguna tenant')
    }
  }

  return {
    ...s,

    // Handlers
    handleToggleActive,
    handleDeleteTenant,
    handleDeleteUser,
    handleDeleteTenantUser,
  }
}
