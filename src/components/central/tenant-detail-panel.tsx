'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  X,
  Trash2,
  Pencil,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ChevronRight,
  Hash,
  Mail,
  Globe,
  User,
  Users,
  Calendar,
  Clock,
  Loader2,
  UserPlus,
  UserCog,
  ClipboardCopy,
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Tenant, TenantUserItem } from '@/hooks/use-central-state'

interface TenantDetailPanelProps {
  selectedTenant: Tenant
  tenantUsers: TenantUserItem[]
  tenantUsersLoading: boolean
  getTenantHealth: (tenant: Tenant) => { color: string; label: string; dotColor: string; animClass: string }
  formatDate: (dateStr: string | null) => string
  formatDateTime: (dateStr: string | null) => string
  onClose: () => void
  onEditTenant: (tenant: Tenant) => void
  onToggleActive: (tenant: Tenant) => void
  onDeleteTenant: (tenant: Tenant) => void
  onAddTenantUser: () => void
  onEditTenantUser: (user: TenantUserItem) => void
  onDeleteTenantUser: (user: TenantUserItem) => void
}

export function TenantDetailPanel({
  selectedTenant,
  tenantUsers,
  tenantUsersLoading,
  getTenantHealth,
  formatDate,
  formatDateTime,
  onClose,
  onEditTenant,
  onToggleActive,
  onDeleteTenant,
  onAddTenantUser,
  onEditTenantUser,
  onDeleteTenantUser,
}: TenantDetailPanelProps) {
  const health = getTenantHealth(selectedTenant)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-[var(--border-color)] bg-[var(--bg-secondary)]"
      >
        {/* Panel Header with gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#10b981]/20 via-[var(--bg-primary)] to-[#059669]/10 p-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]/80 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[#10b981]/20">
              <Building2 className="h-7 w-7 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold">{selectedTenant.namaPerusahaan}</h3>
            <div className="mt-1 flex items-center gap-2">
              {selectedTenant.isActive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981]/10 px-3 py-1 text-xs font-medium text-[#10b981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  Aktif
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f59e0b]/10 px-3 py-1 text-xs font-medium text-[#f59e0b]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                  Nonaktif
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Panel Body */}
        <div className="p-6 space-y-5">
          {/* Health Indicator */}
          <div className="flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
            <div className={`h-3 w-3 rounded-full ${health.dotColor} ${health.animClass}`} />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Status Kesehatan</p>
              <p className={`text-sm font-semibold ${
                health.color === 'green' ? 'text-[#10b981]' :
                health.color === 'yellow' ? 'text-[#f59e0b]' : 'text-red-400'
              }`}>
                {health.label}
              </p>
            </div>
          </div>

          {/* Detail Items */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]/60">Informasi Dasar</h4>
            {[
              { icon: Hash, label: 'Tenant ID', value: selectedTenant.tenantId, highlight: true, copyable: true },
              { icon: Building2, label: 'Nama Perusahaan', value: selectedTenant.namaPerusahaan },
              { icon: Mail, label: 'Email', value: selectedTenant.email || '-' },
              { icon: Globe, label: 'Domain', value: selectedTenant.domain || '-' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--bg-secondary)]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10b981]/10">
                  <item.icon className="h-4 w-4 text-[#10b981]/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-secondary)]">{item.label}</p>
                  <div className="flex items-center gap-2">
                    {item.highlight ? (
                      <code className="text-sm font-medium text-[#10b981]">{item.value}</code>
                    ) : (
                      <p className="text-sm font-medium truncate">{item.value}</p>
                    )}
                    {item.copyable && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.value)
                          toast.success('Tenant ID disalin ke clipboard')
                        }}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors hover:bg-[#10b981]/10 hover:text-[#10b981]"
                        title="Salin ID"
                      >
                        <ClipboardCopy className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border-color)]" />

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]/60">Pengguna & Aktivitas</h4>
            {[
              { icon: User, label: 'Admin Username', value: selectedTenant.adminUsername },
              { icon: Users, label: 'Jumlah Pengguna', value: `${selectedTenant.userCount} pengguna` },
              { icon: Calendar, label: 'Tanggal Dibuat', value: formatDate(selectedTenant.createdAt) },
              { icon: Clock, label: 'Terakhir Aktif', value: formatDateTime(selectedTenant.lastSeenAt) },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--bg-secondary)]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-tertiary)]">
                  <item.icon className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-secondary)]">{item.label}</p>
                  <p className="text-sm font-medium truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={() => {
                const url = `${window.location.origin}?tenant=${selectedTenant.tenantId}`
                window.open(url, '_blank')
              }}
              className="flex w-full items-center gap-3 rounded-lg border border-[#10b981]/20 bg-[#10b981]/5 px-4 py-3 text-sm font-medium text-[#10b981] transition-colors hover:bg-[#10b981]/10 active:scale-[0.98]"
            >
              <ExternalLink className="h-4 w-4" />
              Buka Dashboard
              <ChevronRight className="ml-auto h-4 w-4 text-[#10b981]/50" />
            </button>
            <button
              onClick={() => onEditTenant(selectedTenant)}
              className="flex w-full items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)] active:scale-[0.98]"
            >
              <Pencil className="h-4 w-4 text-[#10b981]" />
              Edit Tenant
              <ChevronRight className="ml-auto h-4 w-4 text-[var(--text-secondary)]" />
            </button>
            <button
              onClick={() => onToggleActive(selectedTenant)}
              className="flex w-full items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)] active:scale-[0.98]"
            >
              {selectedTenant.isActive ? (
                <ToggleRight className="h-4 w-4 text-[#f59e0b]" />
              ) : (
                <ToggleLeft className="h-4 w-4 text-[#10b981]" />
              )}
              {selectedTenant.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              <ChevronRight className="ml-auto h-4 w-4 text-[var(--text-secondary)]" />
            </button>
            <button
              onClick={() => onDeleteTenant(selectedTenant)}
              className="flex w-full items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4" />
              Hapus Tenant
              <ChevronRight className="ml-auto h-4 w-4 text-red-400/50" />
            </button>
          </div>

          {/* Tenant Users Section */}
          <div className="pt-4 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <UserCog className="h-4 w-4 text-[#10b981]" />
                <h4 className="text-sm font-semibold">Pengguna Tenant</h4>
                <span className="inline-flex items-center justify-center rounded-full bg-[#10b981]/15 px-2 py-0.5 text-[10px] font-semibold text-[#10b981]">
                  {tenantUsers.length}
                </span>
              </div>
              <button
                onClick={onAddTenantUser}
                className="flex items-center gap-1.5 rounded-lg border border-[#10b981]/20 bg-[#10b981]/5 px-2.5 py-1.5 text-xs font-medium text-[#10b981] transition-colors hover:bg-[#10b981]/10 active:scale-[0.98]"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Tambah
              </button>
            </div>

            {tenantUsersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[#10b981]" />
              </div>
            ) : tenantUsers.length === 0 ? (
              <div className="py-6 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-[var(--text-secondary)]/30" />
                <p className="text-xs text-[var(--text-secondary)]">Belum ada pengguna</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {tenantUsers.map((tu, index) => (
                    <motion.div
                      key={tu.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                      className="group flex items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2.5 transition-all hover:bg-[var(--bg-tertiary)]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10">
                        <User className="h-4 w-4 text-[#10b981]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{tu.namaUser}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            tu.role === 'admin'
                              ? 'bg-amber-500/10 text-amber-400'
                              : tu.role === 'manajer'
                              ? 'bg-[#10b981]/10 text-[#10b981]'
                              : tu.role === 'kasir'
                              ? 'bg-cyan-500/10 text-cyan-400'
                              : 'bg-[var(--border-color)] text-[var(--text-secondary)]'
                          }`}>
                            {tu.role === 'admin' && <Shield className="h-2.5 w-2.5" />}
                            {tu.role}
                          </span>
                        </div>
                        {tu.jabatan && (
                          <p className="text-xs text-[var(--text-secondary)] truncate">{tu.jabatan}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditTenantUser(tu)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] active:scale-[0.98]"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTenantUser(tu)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.98]"
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
