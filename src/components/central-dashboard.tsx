'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Building2,
  Users,
  X,
  Loader2,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  TrendingUp,
  Star,
  BarChart3,
  ClipboardCopy,
  ExternalLink,
  BookOpen,
  FileText,
  ScrollText,
  KeyRound,
  UserPlus,
  UserCog,
  Hash,
  Shield,
  ChevronRight,
  Calendar,
  Clock,
  Mail,
  Globe,
  User,
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import { ChangePasswordModal } from '@/components/change-password-modal'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCentralHandlers } from '@/hooks/use-central-handlers'
import { useThemeColors } from '@/hooks/use-theme-colors'
import type { Tenant, CentralUserItem, TenantUserItem } from '@/hooks/use-central-state'

// ─── Dynamic imports for heavy modal components ───────────────────────────────

const PulseSkeleton = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#10b981] border-t-transparent" />
  </div>
)

const TenantFormModal = dynamic(() =>
  import('@/components/central/tenant-form-modal').then(m => ({ default: m.TenantFormModal })),
  { loading: () => <PulseSkeleton /> }
)

const UserFormModal = dynamic(() =>
  import('@/components/central/user-form-modal').then(m => ({ default: m.UserFormModal })),
  { loading: () => <PulseSkeleton /> }
)

const TenantUserFormModal = dynamic(() =>
  import('@/components/central/tenant-user-form-modal').then(m => ({ default: m.TenantUserFormModal })),
  { loading: () => <PulseSkeleton /> }
)

const DeleteTenantModal = dynamic(() =>
  import('@/components/central/delete-tenant-modal').then(m => ({ default: m.DeleteTenantModal })),
  { loading: () => <PulseSkeleton /> }
)

const DeleteUserModal = dynamic(() =>
  import('@/components/central/delete-user-modal').then(m => ({ default: m.DeleteUserModal })),
  { loading: () => <PulseSkeleton /> }
)

const DeleteTenantUserModal = dynamic(() =>
  import('@/components/central/delete-tenant-user-modal').then(m => ({ default: m.DeleteTenantUserModal })),
  { loading: () => <PulseSkeleton /> }
)

const TenantDetailPanel = dynamic(() =>
  import('@/components/central/tenant-detail-panel').then(m => ({ default: m.TenantDetailPanel })),
  { loading: () => <PulseSkeleton /> }
)

// ─── Main Component ───────────────────────────────────────────────────────────

export function CentralDashboard() {
  const { user, logout, centralTab, setCentralTab } = useAuthStore()
  const h = useCentralHandlers()
  const tc = useThemeColors()

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669]">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">
                Bumdes<span className="text-[#10b981]">Juara</span>
              </span>
              <span className="ml-2 hidden sm:inline text-xs text-[var(--text-secondary)]">Central Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Users className="h-4 w-4" />
              <span>{user?.username || 'Admin'}</span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => h.setShowPasswordModal(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-all hover:border-[#10b981]/30 hover:bg-[#10b981]/10 hover:text-[#10b981] active:scale-[0.98]"
              title="Ganti Password"
            >
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Ganti Password</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Dashboard Central Admin</h1>
          <p className="text-[var(--text-secondary)]">
            Kelola semua tenant BUMDes dalam platform BumdesJuara
          </p>
        </motion.div>

        {/* Quick Stats Mini Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.02 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10b981]/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-secondary)]">Aktif</p>
              <p className="text-xs font-bold text-[#10b981]">{h.activeCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/10">
              <XCircle className="h-3.5 w-3.5 text-red-400" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-secondary)]">Nonaktif</p>
              <p className="text-xs font-bold text-red-400">{h.inactiveCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10">
              <Users className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-secondary)]">Pengguna</p>
              <p className="text-xs font-bold">{h.totalUsers}</p>
            </div>
          </div>
          {h.inactiveCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white">{h.inactiveCount}</span>
              </div>
              <span className="text-xs font-medium text-amber-400">Tenant tidak aktif</span>
            </div>
          )}
        </motion.div>

        {/* Tab Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6 flex gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1"
        >
          {h.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCentralTab(tab.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${centralTab === tab.id
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {centralTab === tab.id && (
                <motion.div
                  layoutId="central-tab-indicator"
                  className="absolute inset-0 rounded-md border border-[#10b981]/20"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {centralTab === 'tenants' ? (
            <motion.div
              key="tenants"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Cards */}
              <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {[
                  { label: 'Total Tenant', value: h.tenants.length, icon: Building2, gradient: 'from-[#10b981]/10 to-[#10b981]/[0.02]', iconBg: 'bg-[#10b981]/15', iconColor: 'text-[#10b981]', valueColor: 'text-[var(--text-primary)]', hoverBorder: 'hover:border-[#10b981]/25' },
                  { label: 'Tenant Aktif', value: h.activeCount, icon: CheckCircle2, gradient: 'from-emerald-500/10 to-emerald-500/[0.02]', iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400', valueColor: 'text-[#10b981]', hoverBorder: 'hover:border-emerald-500/25' },
                  { label: 'Tenant Nonaktif', value: h.inactiveCount, icon: XCircle, gradient: 'from-red-500/10 to-red-500/[0.02]', iconBg: 'bg-red-500/15', iconColor: 'text-red-400', valueColor: 'text-[#ef4444]', hoverBorder: 'hover:border-red-500/25' },
                  { label: 'Total Pengguna', value: h.totalUsers, icon: Users, gradient: 'from-cyan-500/10 to-cyan-500/[0.02]', iconBg: 'bg-cyan-500/15', iconColor: 'text-cyan-400', valueColor: 'text-[#34d399]', hoverBorder: 'hover:border-cyan-500/25' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className={`group rounded-xl border border-[var(--border-color)] bg-gradient-to-br ${stat.gradient} p-4 sm:p-5 transition-all duration-300 ${stat.hoverBorder} hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{stat.label}</p>
                        <p className={`mt-1 text-2xl sm:text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                      </div>
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${stat.iconBg} transition-colors group-hover:scale-110`}>
                        <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tenant Activity Chart & Ringkasan Tenant */}
              <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Pie Chart */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#10b981]" />
                    <h3 className="text-sm font-semibold">Status Tenant</h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="h-[160px] w-[160px] shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Aktif', value: h.activeCount },
                              { name: 'Nonaktif', value: h.inactiveCount },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: tc.tooltipBg,
                              border: `1px solid ${tc.tooltipBorder}`,
                              borderRadius: '8px',
                              fontSize: '12px',
                              color: tc.tooltipText,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                        <span className="text-sm text-[var(--text-secondary)]">Aktif</span>
                        <span className="ml-auto text-sm font-bold text-[#10b981]">{h.activeCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                        <span className="text-sm text-[var(--text-secondary)]">Nonaktif</span>
                        <span className="ml-auto text-sm font-bold text-[#ef4444]">{h.inactiveCount}</span>
                      </div>
                      {h.tenants.length > 0 && (
                        <div className="mt-2 rounded-lg bg-[var(--bg-secondary)] px-3 py-2">
                          <p className="text-xs text-[var(--text-secondary)]">Rasio Aktif</p>
                          <p className="text-lg font-bold text-[#10b981]">
                            {Math.round((h.activeCount / h.tenants.length) * 100)}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Ringkasan Tenant */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#10b981]" />
                    <h3 className="text-sm font-semibold">Ringkasan Tenant</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Users className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[var(--text-secondary)]">Total Pengguna Semua Tenant</p>
                        <p className="text-sm font-bold">{h.totalUsers} pengguna</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10b981]/10">
                        <Star className="h-4 w-4 text-[#10b981]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[var(--text-secondary)]">Tenant Terbaru</p>
                        <p className="truncate text-sm font-bold">
                          {h.tenants.length > 0
                            ? [...h.tenants].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]?.namaPerusahaan
                            : '-'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                        <Activity className="h-4 w-4 text-amber-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[var(--text-secondary)]">Paling Aktif (Terakhir Online)</p>
                        <p className="truncate text-sm font-bold">
                          {h.tenants.filter(t => t.lastSeenAt).length > 0
                            ? [...h.tenants].filter(t => t.lastSeenAt).sort((a, b) => new Date(b.lastSeenAt!).getTime() - new Date(a.lastSeenAt!).getTime())[0]?.namaPerusahaan
                            : 'Belum ada aktivitas'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* System Statistics */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mb-8 glass-card rounded-xl p-5"
              >
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#10b981]" />
                  <h3 className="text-sm font-semibold">Statistik Sistem</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: BookOpen, label: 'Total Jurnal', value: h.systemStats.totalJournals.toLocaleString('id-ID'), color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
                    { icon: ScrollText, label: 'Total Transaksi', value: h.systemStats.totalTransactions.toLocaleString('id-ID'), color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                    { icon: FileText, label: 'Log Audit', value: h.systemStats.totalAuditLogs.toLocaleString('id-ID'), color: 'text-amber-400', bg: 'bg-amber-500/10' },
                    { icon: BookOpen, label: 'Total Akun', value: h.systemStats.totalAccounts.toLocaleString('id-ID'), color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-md ${item.bg}`}>
                          <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
                      </div>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tenant Comparison Chart & Activity Timeline */}
              <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Bar Chart */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#10b981]" />
                    <h3 className="text-sm font-semibold">Perbandingan Pengguna per Tenant</h3>
                  </div>
                  {h.barChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={h.barChartData} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tc.gridStroke} horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: tc.axisText }} axisLine={{ stroke: tc.gridStroke }} />
                        <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: tc.axisText }} axisLine={{ stroke: tc.gridStroke }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: tc.tooltipBg,
                            border: `1px solid ${tc.tooltipBorder}`,
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: tc.tooltipText,
                          }}
                        />
                        <Bar dataKey="pengguna" fill="url(#barGradient)" radius={[0, 4, 4, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#34d399" stopOpacity={0.6} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[220px] text-sm text-[var(--text-secondary)]">
                      Belum ada data tenant
                    </div>
                  )}
                </motion.div>

                {/* Activity Timeline */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#10b981]" />
                    <h3 className="text-sm font-semibold">Aktivitas Terbaru</h3>
                  </div>
                  {h.activityTimeline.length > 0 ? (
                    <div className="space-y-3">
                      {h.activityTimeline.map((item, idx) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <div className="relative flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981]/10">
                              <div className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                            </div>
                            {idx < h.activityTimeline.length - 1 && (
                              <div className="mt-1 h-6 w-px bg-[var(--border-color)]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 pt-1">
                            <p className="text-sm font-medium truncate">{item.tenantName}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{item.action}</p>
                          </div>
                          <span className="shrink-0 text-[10px] text-[var(--text-secondary)]/70 pt-1.5">
                            {new Date(item.timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}{' '}
                            {new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[220px] text-sm text-[var(--text-secondary)]">
                      Belum ada aktivitas
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Tenant Management Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl"
              >
                <div className="flex flex-col gap-4 border-b border-[var(--border-color)] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold">Daftar Tenant</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                      <input
                        type="text"
                        value={h.searchQuery}
                        onChange={(e) => h.setSearchQuery(e.target.value)}
                        placeholder="Cari tenant..."
                        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] py-2 pl-9 pr-8 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 sm:w-64"
                      />
                      {h.searchQuery && (
                        <button
                          onClick={() => h.setSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={h.fetchTenants}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
                    >
                      <RefreshCw className={`h-4 w-4 ${h.isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => h.setShowCreateModal(true)}
                      className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Tambah Tenant</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[640px]">
                    {h.isLoading ? (
                      <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-[#10b981]" />
                      </div>
                    ) : h.filteredTenants.length === 0 ? (
                      <div className="py-20 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-[var(--text-secondary)]/30" />
                        <p className="text-[var(--text-secondary)]">Belum ada tenant terdaftar</p>
                        <button
                          onClick={() => h.setShowCreateModal(true)}
                          className="mt-4 text-sm text-[#10b981] hover:underline"
                        >
                          Tambah Tenant Pertama
                        </button>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]">
                            <th className="px-5 py-3">ID</th>
                            <th className="px-5 py-3">Nama Perusahaan</th>
                            <th className="hidden px-5 py-3 md:table-cell">Email</th>
                            <th className="hidden px-5 py-3 lg:table-cell">Domain</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="hidden px-5 py-3 sm:table-cell">Terakhir Aktif</th>
                            <th className="px-5 py-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {h.filteredTenants.map((tenant, idx) => (
                            <tr
                              key={tenant.id}
                              className={`cursor-pointer border-b border-[var(--border-color)] transition-all hover:bg-[var(--accent-light)] border-l-2 ${idx % 2 === 1 ? 'bg-[var(--table-row-alt)]' : ''
                                } ${tenant.isActive
                                  ? 'border-l-[#10b981]'
                                  : 'border-l-[#f59e0b]'
                                }`}
                              onClick={() => h.setSelectedTenant(tenant)}
                            >
                              <td className="px-5 py-3">
                                <code className="rounded bg-[var(--border-color)] px-2 py-0.5 text-xs text-[#10b981]">
                                  {tenant.tenantId}
                                </code>
                              </td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="font-medium">{tenant.namaPerusahaan}</div>
                                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400">
                                    <Users className="h-2.5 w-2.5" />
                                    {tenant.userCount}
                                  </span>
                                </div>
                                <div className="text-xs text-[var(--text-secondary)]">
                                  Admin: {tenant.adminUsername}
                                </div>
                              </td>
                              <td className="hidden px-5 py-3 text-sm text-[var(--text-secondary)] md:table-cell">
                                {tenant.email || '-'}
                              </td>
                              <td className="hidden px-5 py-3 text-sm text-[var(--text-secondary)] lg:table-cell">
                                {tenant.domain || '-'}
                              </td>
                              <td className="px-5 py-3">
                                {tenant.isActive ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981]/10 px-2.5 py-1 text-xs font-medium text-[#10b981]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-health-green" />
                                    Aktif
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                    Nonaktif
                                  </span>
                                )}
                              </td>
                              <td className="hidden px-5 py-3 text-sm text-[var(--text-secondary)] sm:table-cell">
                                {h.formatDateTime(tenant.lastSeenAt)}
                              </td>
                              <td className="px-5 py-3">
                                <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => h.handleToggleActive(tenant)}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] active:scale-[0.98]"
                                    title={tenant.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                                  >
                                    {tenant.isActive ? (
                                      <ToggleRight className="h-5 w-5 text-[#10b981]" />
                                    ) : (
                                      <ToggleLeft className="h-5 w-5 text-[#f59e0b]" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => h.setEditingTenant(tenant)}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[#10b981]/10 hover:text-[#10b981] active:scale-[0.98]"
                                    title="Edit"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => h.setDeletingTenant(tenant)}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
                                    title="Hapus"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* User Management Section */}
              <div className="glass-card rounded-xl">
                <div className="flex flex-col gap-4 border-b border-[var(--border-color)] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold">Daftar Pengguna Central</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={h.fetchCentralUsers}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98]"
                    >
                      <RefreshCw className={`h-4 w-4 ${h.usersLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => { h.setEditingUser(null); h.setShowUserModal(true) }}
                      className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Tambah Pengguna</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[640px]">
                    {h.usersLoading ? (
                      <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-[#10b981]" />
                      </div>
                    ) : h.centralUsers.length === 0 ? (
                      <div className="py-20 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-[var(--text-secondary)]/30" />
                        <p className="text-[var(--text-secondary)]">Belum ada pengguna central</p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--border-color)] text-left text-xs font-medium text-[var(--text-secondary)]">
                            <th className="px-5 py-3">Username</th>
                            <th className="px-5 py-3">Role</th>
                            <th className="hidden px-5 py-3 sm:table-cell">Jabatan</th>
                            <th className="hidden px-5 py-3 md:table-cell">Dibuat</th>
                            <th className="px-5 py-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {h.centralUsers.map((cu, idx) => {
                            const isCurrentUser = cu.id === user?.userId
                            return (
                              <tr
                                key={cu.id}
                                className={`border-b border-[var(--border-color)] transition-all hover:bg-[var(--accent-light)] border-l-2 border-l-[#10b981] ${idx % 2 === 1 ? 'bg-[var(--table-row-alt)]' : ''}`}
                              >
                                <td className="px-5 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10b981]/10">
                                      <User className="h-4 w-4 text-[#10b981]" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{cu.username}</span>
                                        {isCurrentUser && (
                                          <span className="inline-flex items-center rounded-full bg-[#10b981]/15 px-2 py-0.5 text-[10px] font-semibold text-[#10b981]">
                                            Anda
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-3">
                                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${cu.role === 'superuser'
                                      ? 'bg-amber-500/10 text-amber-400'
                                      : 'bg-[#10b981]/10 text-[#10b981]'
                                    }`}>
                                    {cu.role === 'superuser' ? (
                                      <Shield className="h-3 w-3" />
                                    ) : (
                                      <Users className="h-3 w-3" />
                                    )}
                                    {cu.role}
                                  </span>
                                </td>
                                <td className="hidden px-5 py-3 text-sm text-[var(--text-secondary)] sm:table-cell">
                                  {cu.jabatan || '-'}
                                </td>
                                <td className="hidden px-5 py-3 text-sm text-[var(--text-secondary)] md:table-cell">
                                  {h.formatDate(cu.createdAt)}
                                </td>
                                <td className="px-5 py-3">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => { h.setEditingUser(cu); h.setShowUserModal(true) }}
                                      className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[#10b981]/10 hover:text-[#10b981] active:scale-[0.98]"
                                      title="Edit"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    {!isCurrentUser && (
                                      <button
                                        onClick={() => h.setDeletingUser(cu)}
                                        className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
                                        title="Hapus"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Tenant Detail Slide-out Panel */}
      <AnimatePresence>
        {h.selectedTenant && (
          <TenantDetailPanel
            selectedTenant={h.selectedTenant}
            tenantUsers={h.tenantUsers}
            tenantUsersLoading={h.tenantUsersLoading}
            getTenantHealth={h.getTenantHealth}
            formatDate={h.formatDate}
            formatDateTime={h.formatDateTime}
            onClose={() => h.setSelectedTenant(null)}
            onEditTenant={(tenant) => { h.setEditingTenant(tenant); h.setSelectedTenant(null) }}
            onToggleActive={h.handleToggleActive}
            onDeleteTenant={(tenant) => { h.setDeletingTenant(tenant); h.setSelectedTenant(null) }}
            onAddTenantUser={() => { h.setEditingTenantUser(null); h.setShowTenantUserModal(true) }}
            onEditTenantUser={(tu) => { h.setEditingTenantUser(tu); h.setShowTenantUserModal(true) }}
            onDeleteTenantUser={h.setDeletingTenantUser}
          />
        )}
      </AnimatePresence>

      {/* ─── Modals ────────────────────────────────────────────────────────────── */}

      {/* Tenant Form Modal */}
      <AnimatePresence>
        {(h.showCreateModal || h.editingTenant) && (
          <TenantFormModal
            mode={h.editingTenant ? 'edit' : 'create'}
            tenant={h.editingTenant}
            onClose={() => { h.setShowCreateModal(false); h.setEditingTenant(null) }}
            onSuccess={() => {
              h.setShowCreateModal(false)
              h.setEditingTenant(null)
              h.fetchTenants()
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Tenant Confirmation Modal */}
      <AnimatePresence>
        {h.deletingTenant && (
          <DeleteTenantModal
            deletingTenant={h.deletingTenant}
            onCancel={() => h.setDeletingTenant(null)}
            onConfirm={h.handleDeleteTenant}
          />
        )}
      </AnimatePresence>

      {/* User Management Modal */}
      <AnimatePresence>
        {h.showUserModal && (
          <UserFormModal
            mode={h.editingUser ? 'edit' : 'create'}
            user={h.editingUser}
            onClose={() => { h.setShowUserModal(false); h.setEditingUser(null) }}
            onSuccess={() => {
              h.setShowUserModal(false)
              h.setEditingUser(null)
              h.fetchCentralUsers()
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete User Confirmation Modal */}
      <AnimatePresence>
        {h.deletingUser && (
          <DeleteUserModal
            username={h.deletingUser.username}
            onCancel={() => h.setDeletingUser(null)}
            onConfirm={h.handleDeleteUser}
          />
        )}
      </AnimatePresence>

      {/* Tenant User Form Modal */}
      <AnimatePresence>
        {h.showTenantUserModal && h.selectedTenant && (
          <TenantUserFormModal
            mode={h.editingTenantUser ? 'edit' : 'create'}
            tenantId={h.selectedTenant.id}
            user={h.editingTenantUser}
            onClose={() => { h.setShowTenantUserModal(false); h.setEditingTenantUser(null) }}
            onSuccess={() => {
              h.setShowTenantUserModal(false)
              h.setEditingTenantUser(null)
              h.fetchTenantUsers(h.selectedTenant!.id)
              h.fetchTenants()
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Tenant User Confirmation Modal */}
      <AnimatePresence>
        {h.deletingTenantUser && (
          <DeleteTenantUserModal
            namaUser={h.deletingTenantUser.namaUser}
            onCancel={() => h.setDeletingTenantUser(null)}
            onConfirm={h.handleDeleteTenantUser}
          />
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <ChangePasswordModal
        show={h.showPasswordModal}
        onClose={() => h.setShowPasswordModal(false)}
        apiEndpoint="/api/central/change-password"
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#10b981] to-[#059669]">
                <Landmark className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold">
                Bumdes<span className="text-[#10b981]">Juara</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              © 2025 BumdesJuara by reinKarnasi· Central Admin Panel
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
