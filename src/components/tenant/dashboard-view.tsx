'use client'

import { motion } from 'framer-motion'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Package,
  PiggyBank,
  CreditCard,
  BarChart3,
  FileText,
  ArrowRight,
  ShoppingBag,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Hash,
  Clock,
  Download,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import { useAuthStore } from '@/lib/store'
import { formatCurrency, formatMonth, getGreeting, getTransactionTypeInfo } from '@/lib/tenant-utils'
import { CustomTooltip } from '@/components/tenant/shared'
import { CurrencyCounter } from '@/components/tenant/animated-counter'
import { useThemeColors } from '@/hooks/use-theme-colors'
import type { DashboardData, TenantTabType } from '@/lib/tenant-types'

// ─── Dashboard View Component ──────────────────────────────────────────────────

export function DashboardView({
  data,
  isProfit,
  labaRugi,
  user,
  setComingSoonModal,
}: {
  data: DashboardData
  isProfit: boolean
  labaRugi: number
  user: { namaUser?: string } | null
  setComingSoonModal: (modal: string | null) => void
}) {
  const tc = useThemeColors()
  // Quick stats for the mini bar
  const totalAccounts = data.recentTransactions?.length ?? 0
  const jurnalBulanIni = data.trendData?.length ?? 0
  const transaksiTerakhir = data.recentTransactions?.[0]

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Welcome Greeting */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            Selamat {getGreeting()}, {user?.namaUser || 'User'}! 👋
          </h1>
          <p className="text-[var(--text-secondary)]">
            Ringkasan keuangan dan aktivitas terbaru
          </p>
        </div>
        <button
          onClick={() => {
            const params = new URLSearchParams({ type: 'jurnal' })
            window.open(`/api/tenant/export?${params.toString()}`)
          }}
          className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98] shrink-0"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Quick Stats Mini Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-6 flex flex-wrap items-center gap-3 sm:gap-5"
      >
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10b981]/10">
            <BookOpen className="h-3.5 w-3.5 text-[#10b981]" />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-secondary)]">Total Akun</p>
            <p className="text-xs font-bold">{totalAccounts}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10">
            <Hash className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-secondary)]">Jurnal Bulan Ini</p>
            <p className="text-xs font-bold">{jurnalBulanIni}</p>
          </div>
        </div>
        {transaksiTerakhir && (
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-secondary)]">Transaksi Terakhir</p>
              <p className="text-xs font-bold">
                {new Date(transaksiTerakhir.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Financial Summary Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: 'Kas & Bank', value: data.summary.totalKasBank, icon: Wallet, color: '#10b981', gradient: 'from-[#10b981]/5 to-transparent', sublabel: 'Saldo kas saat ini', subicon: TrendingUp, change: data.summary.totalPendapatan > 0 ? 12.5 : -3.2, sparkData: [30, 45, 35, 50, 65, 55, 70] },
          { label: 'Piutang', value: data.summary.totalPiutang, icon: TrendingUp, color: '#14b8a6', gradient: 'from-teal-500/5 to-transparent', sublabel: 'Piutang usaha', subicon: TrendingUp, change: 5.3, sparkData: [20, 35, 25, 40, 30, 45, 50] },
          { label: 'Utang', value: data.summary.totalUtang, icon: TrendingDown, color: '#ef4444', gradient: 'from-red-500/5 to-transparent', sublabel: 'Utang usaha', subicon: TrendingDown, change: -2.1, sparkData: [60, 50, 55, 45, 40, 35, 30] },
          { label: 'Persediaan', value: data.summary.totalPersediaan, icon: Package, color: '#f59e0b', gradient: 'from-amber-500/5 to-transparent', sublabel: 'Nilai persediaan', subicon: Package, change: 8.7, sparkData: [25, 30, 35, 28, 40, 38, 45] },
        ].map((card, idx) => {
          const CardIcon = card.icon
          const SubIcon = card.subicon
          const isPositive = card.change >= 0
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
              className="group card-shimmer gradient-border-animated relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 overflow-hidden"
            >
              {/* Watermark icon */}
              <div className="absolute -right-3 -bottom-3 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                <CardIcon className="h-24 w-24" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">{card.label}</p>
                    <p className="mt-1 text-2xl font-bold">
                      <CurrencyCounter value={card.value} duration={1200} />
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-colors" style={{ backgroundColor: `${card.color}15` }}>
                    <CardIcon className="h-6 w-6" style={{ color: card.color }} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs" style={{ color: card.color }}>
                    <SubIcon className="h-3 w-3" />
                    <span>{card.sublabel}</span>
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{Math.abs(card.change)}%</span>
                  </div>
                </div>
                {/* Mini sparkline */}
                <div className="mt-2 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={card.sparkData.map((v, i) => ({ i, v }))}>
                      <defs>
                        <linearGradient id={`sparkGrad${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={card.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={card.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={card.color} strokeWidth={1.5} fill={`url(#sparkGrad${idx})`} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Simpanan & Pinjaman Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <div className="card-shimmer glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-[#10b981]" />
            <h3 className="font-semibold">Simpanan</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Total Simpanan</span>
              <span className="font-bold text-[#10b981]">
                <CurrencyCounter value={data.simpanan.totalSimpanan} duration={1000} />
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--skeleton-bg)]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                style={{
                  width: data.simpanan.totalSetor > 0
                    ? `${Math.min((data.simpanan.totalSimpanan / data.simpanan.totalSetor) * 100, 100)}%`
                    : '0%',
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Total Setor</p>
                <p className="text-sm font-medium text-[#34d399]">
                  {formatCurrency(data.simpanan.totalSetor)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Total Tarik</p>
                <p className="text-sm font-medium text-[#f59e0b]">
                  {formatCurrency(data.simpanan.totalTarik)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-shimmer glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#f59e0b]" />
            <h3 className="font-semibold">Pinjaman Aktif</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Sisa Pinjaman</span>
              <span className="font-bold text-[#f59e0b]">
                <CurrencyCounter value={data.pinjaman.totalSisa} duration={1000} />
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--skeleton-bg)]">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
                style={{
                  width: data.pinjaman.totalPokok > 0
                    ? `${Math.min((data.pinjaman.totalSisa / data.pinjaman.totalPokok) * 100, 100)}%`
                    : '0%',
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Jumlah Pinjaman</p>
                <p className="text-sm font-medium text-[#fbbf24]">
                  {data.pinjaman.jumlahAktif} pinjaman
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Total Pokok</p>
                <p className="text-sm font-medium text-[#f59e0b]">
                  {formatCurrency(data.pinjaman.totalPokok)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Laba Rugi Summary Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mb-8"
      >
        <div className={`card-shimmer glass-card rounded-xl p-5 border-l-2 ${isProfit ? 'border-l-[#10b981]' : 'border-l-[#ef4444]'}`}>
          <div className="mb-4 flex items-center gap-2">
            {isProfit ? (
              <TrendingUp className="h-5 w-5 text-[#10b981]" />
            ) : (
              <TrendingDown className="h-5 w-5 text-[#ef4444]" />
            )}
            <h3 className="font-semibold">Laba Rugi</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Total Pendapatan</p>
              <p className="text-lg font-bold text-[#10b981]">
                <CurrencyCounter value={data.summary.totalPendapatan} duration={1200} />
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Total Beban</p>
              <p className="text-lg font-bold text-[#ef4444]">
                <CurrencyCounter value={data.summary.totalBeban} duration={1200} />
              </p>
            </div>
            <div className="rounded-lg bg-[var(--bg-secondary)] p-3">
              <p className="text-xs text-[var(--text-secondary)]">
                {isProfit ? 'Laba Bersih' : 'Rugi Bersih'}
              </p>
              <p className={`text-xl font-extrabold ${isProfit ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {isProfit ? '+' : '-'}<CurrencyCounter value={Math.abs(labaRugi)} duration={1200} />
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#10b981]" />
              <h3 className="font-semibold">Penjualan vs Pembelian</h3>
            </div>
            <span className="rounded-md bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-medium text-[#10b981]">Bulanan</span>
          </div>
          {data.trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={tc.gridStroke} />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: tc.axisText }}
                />
                <Bar dataKey="penjualan" name="Penjualan" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pembelian" name="Pembelian" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-[var(--text-secondary)]">
              Belum ada data transaksi
            </div>
          )}
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#10b981]" />
              <h3 className="font-semibold">Pendapatan vs Biaya</h3>
            </div>
            <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400">Tren</span>
          </div>
          {data.pendapatanVsBiaya.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.pendapatanVsBiaya}>
                <CartesianGrid strokeDasharray="3 3" stroke={tc.gridStroke} />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: tc.axisText }}
                />
                <Line
                  type="monotone"
                  dataKey="pendapatan"
                  name="Pendapatan"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="biaya"
                  name="Biaya"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-[var(--text-secondary)]">
              Belum ada data pendapatan/biaya
            </div>
          )}
        </div>
      </motion.div>

      {/* Aset Composition & Expense Breakdown Charts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        {/* Aset Composition Donut Chart */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[#10b981]" />
              <h3 className="font-semibold">Komposisi Aset</h3>
            </div>
            <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400">Distribusi</span>
          </div>
          {(() => {
            const asetData = [
              { name: 'Kas & Bank', value: data.summary.totalKasBank, color: '#10b981' },
              { name: 'Piutang', value: data.summary.totalPiutang, color: '#14b8a6' },
              { name: 'Persediaan', value: data.summary.totalPersediaan, color: '#f59e0b' },
              { name: 'Aset Tetap', value: Math.max(0, data.summary.totalKasBank + data.summary.totalPiutang + data.summary.totalPersediaan > 0 ? (data.summary.totalKasBank + data.summary.totalPiutang + data.summary.totalPersediaan) * 0.15 : 0), color: '#06b6d4' },
            ].filter(d => d.value > 0)
            const totalAset = asetData.reduce((s, d) => s + d.value, 0)
            return asetData.length > 0 && totalAset > 0 ? (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={asetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {asetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ backgroundColor: tc.tooltipBg, border: `1px solid ${tc.tooltipBorder}`, borderRadius: '8px', color: tc.tooltipText, fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {asetData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span>{d.name}</span>
                      <span className="font-medium text-[var(--text-primary)]">{totalAset > 0 ? ((d.value / totalAset) * 100).toFixed(1) : 0}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-[220px] items-center justify-center text-[var(--text-secondary)]">Belum ada data aset</div>
            )
          })()}
        </div>

        {/* Stacked Bar Chart - Expense Categories */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold">Pendapatan vs Biaya (Stacked)</h3>
            </div>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">Perbandingan</span>
          </div>
          {data.pendapatanVsBiaya.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.pendapatanVsBiaya.map(d => ({
                ...d,
                laba: Math.max(0, d.pendapatan - d.biaya),
                biayaPortion: Math.min(d.biaya, d.pendapatan),
                biayaSisa: Math.max(0, d.biaya - d.pendapatan),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={tc.gridStroke} />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: tc.axisText }}
                  axisLine={{ stroke: tc.gridStroke }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: tc.axisText }} />
                <Bar dataKey="pendapatan" name="Pendapatan" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="laba" name="Laba" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar dataKey="biayaPortion" name="Biaya" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="biayaSisa" name="Biaya (Lebih)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center text-[var(--text-secondary)]">Belum ada data</div>
          )}
        </div>
      </motion.div>

      {/* Recent Transactions - Enhanced with timeline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="card-shimmer glass-card rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-color)] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10">
              <FileText className="h-4 w-4 text-[#10b981]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Aktivitas Terbaru</h3>
              <p className="text-[10px] text-[var(--text-secondary)]/60">Transaksi terakhir</p>
            </div>
          </div>
          {data.recentTransactions.length > 0 && (
            <button
              onClick={() => {
                const store = useAuthStore.getState()
                store.setTenantTab('jurnal')
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#10b981]/10 px-3 py-1.5 text-xs font-medium text-[#10b981] transition-colors hover:bg-[#10b981]/20 active:scale-[0.98]"
            >
              Lihat Semua
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
        {data.recentTransactions.length > 0 ? (
          <div className="divide-y divide-[var(--divider-subtle)]">
            {data.recentTransactions.slice(0, 8).map((tx, idx) => {
              const totalDebit = tx.details.reduce((s, d) => s + d.debit, 0)
              const typeInfo = getTransactionTypeInfo(tx.tipe)
              const TypeIcon = typeInfo.icon
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  <div className="flex items-center gap-3">
                    {/* Timeline dot and line */}
                    <div className="relative flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${typeInfo.bgColor} border border-[var(--border-color)]`}>
                        <TypeIcon className={`h-4.5 w-4.5 ${typeInfo.color}`} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {tx.keterangan || tx.noBukti || 'Jurnal Umum'}
                        </p>
                        <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${typeInfo.bgColor} ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]/70 mt-0.5">
                        {new Date(tx.tanggal).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                        {tx.noBukti && ` · ${tx.noBukti}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      {formatCurrency(totalDebit)}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)]/50">
                      {tx.details.length} akun
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--bg-secondary)]">
              <FileText className="h-7 w-7 text-[var(--text-secondary)]/20" />
            </div>
            <p className="text-sm text-[var(--text-secondary)]/60">Belum ada transaksi tercatat</p>
            <p className="text-xs text-[var(--text-secondary)]/40 mt-1">Mulai dengan membuat jurnal baru</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions - Enhanced with gradient backgrounds */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 card-shimmer glass-card rounded-xl p-5"
      >
        <h3 className="mb-4 font-semibold">Aksi Cepat</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Jurnal Umum', icon: FileText, color: '#10b981', gradient: 'from-[#10b981]/10 to-[#10b981]/[0.02]', tab: 'jurnal' as TenantTabType },
            { label: 'Penjualan', icon: ShoppingBag, color: '#34d399', gradient: 'from-[#34d399]/10 to-[#34d399]/[0.02]', tab: 'penjualan' as TenantTabType },
            { label: 'Pembelian', icon: ShoppingCart, color: '#f59e0b', gradient: 'from-[#f59e0b]/10 to-[#f59e0b]/[0.02]', tab: 'pembelian' as TenantTabType },
            { label: 'Simpanan', icon: PiggyBank, color: '#6ee7b7', gradient: 'from-[#6ee7b7]/10 to-[#6ee7b7]/[0.02]', tab: 'simpanan' as TenantTabType },
          ].map((action) => {
            const ActionIcon = action.icon
            return (
              <button
                key={action.label}
                onClick={() => useAuthStore.getState().setTenantTab(action.tab)}
                className={`group flex flex-col items-center gap-2 rounded-xl border border-[var(--border-color)] bg-gradient-to-b ${action.gradient} p-4 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--card-shadow-hover)] active:scale-[0.98]`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <ActionIcon className="h-6 w-6" style={{ color: action.color }} />
                </div>
                {action.label}
              </button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
