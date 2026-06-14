import {
  LayoutDashboard,
  List,
  BarChart3,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  Package,
  PiggyBank,
  CreditCard,
  Users,
  Truck,
  Settings,
  Scale,
  Wallet,
  ScrollText,
} from 'lucide-react'
import type { TenantTabType } from '@/lib/tenant-types'

export interface SidebarItem {
  id: TenantTabType
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Utama',
    items: [
      { id: 'dashboard' as TenantTabType, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'jurnal' as TenantTabType, label: 'Jurnal', icon: ScrollText },
      { id: 'pengaturan' as TenantTabType, label: 'Pengaturan', icon: Settings },
    ],
  },
  {
    label: 'Akuntansi',
    items: [
      { id: 'akun' as TenantTabType, label: 'Daftar Akun', icon: List },
      { id: 'laporan' as TenantTabType, label: 'Laporan', icon: BarChart3 },
      { id: 'buku-besar' as TenantTabType, label: 'Buku Besar', icon: BookOpen },
      { id: 'neraca-saldo' as TenantTabType, label: 'Neraca Saldo', icon: Scale },
      { id: 'arus-kas' as TenantTabType, label: 'Arus Kas', icon: Wallet },
    ],
  },
  {
    label: 'Transaksi',
    items: [
      { id: 'penjualan' as TenantTabType, label: 'Penjualan', icon: ShoppingBag },
      { id: 'pembelian' as TenantTabType, label: 'Pembelian', icon: ShoppingCart },
      { id: 'persediaan' as TenantTabType, label: 'Persediaan', icon: Package },
    ],
  },
  {
    label: 'Simpan Pinjam',
    items: [
      { id: 'simpanan' as TenantTabType, label: 'Simpanan', icon: PiggyBank },
      { id: 'pinjaman' as TenantTabType, label: 'Pinjaman', icon: CreditCard },
    ],
  },
  {
    label: 'Kontak',
    items: [
      { id: 'pelanggan' as TenantTabType, label: 'Pelanggan', icon: Users },
      { id: 'pemasok' as TenantTabType, label: 'Pemasok', icon: Truck },
    ],
  },
]
