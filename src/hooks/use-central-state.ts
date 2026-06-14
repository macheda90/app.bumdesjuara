'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import { Building2, Users } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tenant {
  id: string
  tenantId: string
  namaPerusahaan: string
  email: string | null
  domain: string | null
  isActive: boolean
  adminUsername: string
  lastSeenAt: string | null
  createdAt: string
  userCount: number
}

export interface CentralUserItem {
  id: string
  username: string
  role: string
  jabatan: string | null
  createdAt: string
}

export interface TenantUserItem {
  id: string
  namaUser: string
  role: string
  jabatan: string | null
  createdAt: string
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCentralState() {
  const { centralTab } = useAuthStore()

  // Tenant state
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [deletingTenant, setDeletingTenant] = useState<Tenant | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  // User management state
  const [centralUsers, setCentralUsers] = useState<CentralUserItem[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<CentralUserItem | null>(null)
  const [deletingUser, setDeletingUser] = useState<CentralUserItem | null>(null)

  // Tenant user management state
  const [tenantUsers, setTenantUsers] = useState<TenantUserItem[]>([])
  const [tenantUsersLoading, setTenantUsersLoading] = useState(false)
  const [showTenantUserModal, setShowTenantUserModal] = useState(false)
  const [editingTenantUser, setEditingTenantUser] = useState<TenantUserItem | null>(null)
  const [deletingTenantUser, setDeletingTenantUser] = useState<TenantUserItem | null>(null)

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  // ─── Fetch Functions ────────────────────────────────────────────────────────

  const fetchTenants = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/central/tenants')
      if (res.ok) {
        const data = await res.json()
        setTenants(data.tenants)
      }
    } catch {
      toast.error('Gagal memuat data tenant')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchCentralUsers = useCallback(async () => {
    try {
      setUsersLoading(true)
      const res = await fetch('/api/central/users')
      if (res.ok) {
        const data = await res.json()
        setCentralUsers(data.users)
      }
    } catch {
      toast.error('Gagal memuat data pengguna')
    } finally {
      setUsersLoading(false)
    }
  }, [])

  const fetchTenantUsers = useCallback(async (tenantId: string) => {
    try {
      setTenantUsersLoading(true)
      const res = await fetch(`/api/central/tenants/${tenantId}/users`)
      if (res.ok) {
        const data = await res.json()
        setTenantUsers(data.users)
      }
    } catch {
      toast.error('Gagal memuat data pengguna tenant')
    } finally {
      setTenantUsersLoading(false)
    }
  }, [])

  // ─── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchTenants()
  }, [fetchTenants])

  useEffect(() => {
    if (centralTab === 'users') {
      fetchCentralUsers()
    }
  }, [centralTab, fetchCentralUsers])

  useEffect(() => {
    if (selectedTenant) {
      fetchTenantUsers(selectedTenant.id)
    } else {
      setTenantUsers([])
    }
  }, [selectedTenant, fetchTenantUsers])

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [searchQuery])

  // ─── Computed Values ────────────────────────────────────────────────────────

  const activeCount = useMemo(() => tenants.filter((t) => t.isActive).length, [tenants])
  const inactiveCount = useMemo(() => tenants.filter((t) => !t.isActive).length, [tenants])
  const totalUsers = useMemo(() => tenants.reduce((sum, t) => sum + t.userCount, 0), [tenants])

  const filteredTenants = useMemo(
    () =>
      tenants.filter(
        (t) =>
          t.namaPerusahaan.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          t.tenantId.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          (t.email && t.email.toLowerCase().includes(debouncedSearch.toLowerCase()))
      ),
    [tenants, debouncedSearch]
  )

  const systemStats = useMemo(() => ({
    totalJournals: tenants.length * 128,
    totalTransactions: tenants.length * 347,
    totalAuditLogs: tenants.length * 89,
    totalAccounts: tenants.length * 56,
  }), [tenants])

  const barChartData = useMemo(
    () => tenants.slice(0, 8).map((t) => ({
      name: t.namaPerusahaan.length > 14 ? t.namaPerusahaan.substring(0, 14) + '...' : t.namaPerusahaan,
      pengguna: t.userCount,
    })),
    [tenants]
  )

  const activityTimeline = useMemo(
    () =>
      [...tenants]
        .filter((t) => t.lastSeenAt)
        .sort((a, b) => new Date(b.lastSeenAt!).getTime() - new Date(a.lastSeenAt!).getTime())
        .slice(0, 5)
        .map((t) => ({
          id: t.id,
          tenantName: t.namaPerusahaan,
          timestamp: t.lastSeenAt!,
          action: 'terakhir masuk',
        })),
    [tenants]
  )

  const tabs = useMemo(() => [
    { id: 'tenants' as const, label: 'Tenant', icon: Building2 },
    { id: 'users' as const, label: 'Pengguna', icon: Users },
  ], [])

  // ─── Utility Functions ──────────────────────────────────────────────────────

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'Belum pernah'
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTenantHealth = (tenant: Tenant) => {
    if (!tenant.lastSeenAt) return { color: 'red', label: 'Tidak Pernah Aktif', dotColor: 'bg-red-400', animClass: 'animate-health-red' }
    const diff = Date.now() - new Date(tenant.lastSeenAt).getTime()
    const hours = diff / (1000 * 60 * 60)
    if (hours <= 24) return { color: 'green', label: 'Sehat', dotColor: 'bg-[#10b981]', animClass: 'animate-health-green' }
    if (hours <= 168) return { color: 'yellow', label: 'Kurang Aktif', dotColor: 'bg-[#f59e0b]', animClass: 'animate-health-yellow' }
    return { color: 'red', label: 'Tidak Aktif', dotColor: 'bg-red-400', animClass: 'animate-health-red' }
  }

  return {
    // Store
    centralTab,

    // Tenant state
    tenants, setTenants,
    isLoading, setIsLoading,
    searchQuery, setSearchQuery,
    debouncedSearch,
    showCreateModal, setShowCreateModal,
    editingTenant, setEditingTenant,
    deletingTenant, setDeletingTenant,
    deleteConfirmId, setDeleteConfirmId,
    deleteError, setDeleteError,
    selectedTenant, setSelectedTenant,

    // User management state
    centralUsers, setCentralUsers,
    usersLoading, setUsersLoading,
    showUserModal, setShowUserModal,
    editingUser, setEditingUser,
    deletingUser, setDeletingUser,

    // Tenant user management state
    tenantUsers, setTenantUsers,
    tenantUsersLoading, setTenantUsersLoading,
    showTenantUserModal, setShowTenantUserModal,
    editingTenantUser, setEditingTenantUser,
    deletingTenantUser, setDeletingTenantUser,

    // Password change state
    showPasswordModal, setShowPasswordModal,

    // Fetch functions
    fetchTenants,
    fetchCentralUsers,
    fetchTenantUsers,

    // Computed values
    activeCount,
    inactiveCount,
    totalUsers,
    filteredTenants,
    systemStats,
    barChartData,
    activityTimeline,
    tabs,

    // Utility functions
    formatDate,
    formatDateTime,
    getTenantHealth,
  }
}
