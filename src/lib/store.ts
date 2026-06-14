import { create } from 'zustand'

export type ViewType = 'landing' | 'login' | 'central-dashboard' | 'tenant-dashboard'

interface AuthUser {
  userId: string
  userType: 'central' | 'tenant'
  tenantId?: string
  username?: string
  namaUser?: string
  role?: string
  jabatan?: string
  tenantName?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  currentView: ViewType
  isLoading: boolean
  centralTab: 'tenants' | 'users'
  tenantTab: 'dashboard' | 'akun' | 'jurnal' | 'laporan' | 'buku-besar' | 'neraca-saldo' | 'arus-kas' | 'penjualan' | 'pembelian' | 'persediaan' | 'simpanan' | 'pinjaman' | 'pelanggan' | 'pemasok' | 'pengaturan'

  setAuth: (user: AuthUser) => void
  clearAuth: () => void
  setCurrentView: (view: ViewType) => void
  setLoading: (loading: boolean) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
  setCentralTab: (tab: 'tenants' | 'users') => void
  setTenantTab: (tab: 'dashboard' | 'akun' | 'jurnal' | 'laporan' | 'buku-besar' | 'neraca-saldo' | 'arus-kas' | 'penjualan' | 'pembelian' | 'persediaan' | 'simpanan' | 'pinjaman' | 'pelanggan' | 'pemasok' | 'pengaturan') => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  currentView: 'landing',
  isLoading: false,
  centralTab: 'tenants',
  tenantTab: 'dashboard',

  setAuth: (user: AuthUser) => {
    const view = user.userType === 'central' ? 'central-dashboard' : 'tenant-dashboard'
    set({ isAuthenticated: true, user, currentView: view, centralTab: 'tenants', tenantTab: 'dashboard' })
  },

  clearAuth: () => {
    set({ isAuthenticated: false, user: null, currentView: 'landing', centralTab: 'tenants', tenantTab: 'dashboard' })
  },

  setCurrentView: (view: ViewType) => {
    set({ currentView: view })
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  checkAuth: async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        if (data.user) {
          const view = data.user.userType === 'central' ? 'central-dashboard' : 'tenant-dashboard'
          set({ isAuthenticated: true, user: data.user, currentView: view })
        }
      }
    } catch {
      // Not authenticated
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // ignore
    }
    set({ isAuthenticated: false, user: null, currentView: 'landing', centralTab: 'tenants', tenantTab: 'dashboard' })
  },

  setCentralTab: (tab: 'tenants' | 'users') => {
    set({ centralTab: tab })
  },

  setTenantTab: (tab: 'dashboard' | 'akun' | 'jurnal' | 'laporan' | 'buku-besar' | 'neraca-saldo' | 'arus-kas' | 'penjualan' | 'pembelian' | 'persediaan' | 'simpanan' | 'pinjaman' | 'pelanggan' | 'pemasok' | 'pengaturan') => {
    set({ tenantTab: tab })
  },
}))
