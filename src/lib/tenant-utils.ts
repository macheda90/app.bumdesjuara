// ─── Tenant Dashboard Utility Functions ────────────────────────────────────────

import {
  ShoppingBag,
  ShoppingCart,
  ArrowDownToLine,
  ArrowUpFromLine,
  BookOpen,
} from 'lucide-react'

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split('-')
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ]
  return `${months[parseInt(month) - 1]} ${year.slice(2)}`
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return 'Pagi'
  if (hour >= 11 && hour < 15) return 'Siang'
  if (hour >= 15 && hour < 18) return 'Sore'
  return 'Malam'
}

export function getTransactionTypeInfo(tipe: string): { label: string; color: string; bgColor: string; icon: typeof ShoppingBag } {
  switch (tipe) {
    case 'penjualan':
      return { label: 'Penjualan', color: 'text-[#10b981]', bgColor: 'bg-[#10b981]/10', icon: ShoppingBag }
    case 'pembelian':
      return { label: 'Pembelian', color: 'text-[#f59e0b]', bgColor: 'bg-[#f59e0b]/10', icon: ShoppingCart }
    case 'kas_masuk':
      return { label: 'Kas Masuk', color: 'text-[#14b8a6]', bgColor: 'bg-[#14b8a6]/10', icon: ArrowDownToLine }
    case 'kas_keluar':
      return { label: 'Kas Keluar', color: 'text-[#ef4444]', bgColor: 'bg-[#ef4444]/10', icon: ArrowUpFromLine }
    default:
      return { label: 'Umum', color: 'text-[#8fa8c8]', bgColor: 'bg-white/[0.06]', icon: BookOpen }
  }
}

export function getTipeAkunColor(tipe: string): { text: string; bg: string; border: string; dot: string } {
  const t = tipe.toLowerCase()
  if (t.includes('kas') || t.includes('bank')) {
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-l-emerald-500', dot: 'bg-emerald-500' }
  }
  if (t.includes('piutang')) {
    return { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-l-teal-500', dot: 'bg-teal-500' }
  }
  if (t.includes('utang')) {
    return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-l-red-500', dot: 'bg-red-500' }
  }
  if (t.includes('pendapatan')) {
    return { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-l-green-500', dot: 'bg-green-500' }
  }
  if (t.includes('beban') || t.includes('hpp')) {
    return { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-l-orange-500', dot: 'bg-orange-500' }
  }
  if (t.includes('persediaan')) {
    return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-l-amber-500', dot: 'bg-amber-500' }
  }
  if (t.includes('aset')) {
    return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-l-cyan-500', dot: 'bg-cyan-500' }
  }
  if (t.includes('ekuitas')) {
    return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-l-purple-500', dot: 'bg-purple-500' }
  }
  return { text: 'text-[#8fa8c8]', bg: 'bg-white/[0.06]', border: 'border-l-[#8fa8c8]', dot: 'bg-[#8fa8c8]' }
}

export function getJurnalTipeBadge(tipe: string): { label: string; color: string; bgColor: string } {
  switch (tipe) {
    case 'kas_masuk':
      return { label: 'Kas Masuk', color: 'text-[#14b8a6]', bgColor: 'bg-[#14b8a6]/10' }
    case 'kas_keluar':
      return { label: 'Kas Keluar', color: 'text-[#ef4444]', bgColor: 'bg-[#ef4444]/10' }
    case 'penjualan':
      return { label: 'Penjualan', color: 'text-[#10b981]', bgColor: 'bg-[#10b981]/10' }
    case 'pembelian':
      return { label: 'Pembelian', color: 'text-[#f59e0b]', bgColor: 'bg-[#f59e0b]/10' }
    case 'simpanan':
      return { label: 'Simpanan', color: 'text-[#8b5cf6]', bgColor: 'bg-[#8b5cf6]/10' }
    case 'pinjaman':
      return { label: 'Pinjaman', color: 'text-[#ec4899]', bgColor: 'bg-[#ec4899]/10' }
    default:
      return { label: 'Umum', color: 'text-[#8fa8c8]', bgColor: 'bg-white/[0.06]' }
  }
}
