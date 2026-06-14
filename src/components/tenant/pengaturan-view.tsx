'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Trash2,
  Loader2,
  Save,
  Building2,
  UserPlus,
  Activity,
  AlertTriangle,
  Filter,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PulseSkeleton, GenericModal, DarkInput, DarkSelect } from '@/components/tenant/shared'
import type { TenantSettingsItem, TenantUserItem, AuditLogItem, GenericPagination } from '@/lib/tenant-types'

// ─── Pengaturan View ────────────────────────────────────────────────────────────

export function PengaturanView({
  subTab, setSubTab,
  settingsData, settingsLoading, settingsSaving, settingsForm, setSettingsForm, onSaveSettings,
  tenantUsers, usersLoading, showUserModal, setShowUserModal, userForm, setUserForm, userFormLoading, onCreateUser,
  deleteUserConfirm, setDeleteUserConfirm, onDeleteUser,
  auditLogs, auditLoading, auditPagination, auditPage, setAuditPage, auditActionFilter, setAuditActionFilter,
  tenantName,
}: {
  subTab: 'perusahaan' | 'pengguna' | 'log'
  setSubTab: (tab: 'perusahaan' | 'pengguna' | 'log') => void
  settingsData: TenantSettingsItem | null
  settingsLoading: boolean
  settingsSaving: boolean
  settingsForm: { namaPerusahaan: string; alamat: string; telepon: string; email: string; npwp: string; tahunFiskal: string; logoUrl: string }
  setSettingsForm: (f: typeof settingsForm) => void
  onSaveSettings: () => void
  tenantUsers: TenantUserItem[]
  usersLoading: boolean
  showUserModal: boolean
  setShowUserModal: (s: boolean) => void
  userForm: { namaUser: string; password: string; role: string; jabatan: string }
  setUserForm: (f: typeof userForm) => void
  userFormLoading: boolean
  onCreateUser: () => void
  deleteUserConfirm: string | null
  setDeleteUserConfirm: (id: string | null) => void
  onDeleteUser: (id: string) => void
  auditLogs: AuditLogItem[]
  auditLoading: boolean
  auditPagination: GenericPagination | null
  auditPage: number
  setAuditPage: (p: number) => void
  auditActionFilter: string
  setAuditActionFilter: (f: string) => void
  tenantName?: string
}) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return { color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', label: 'Admin' }
      case 'manajer': return { color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', label: 'Manajer' }
      case 'staff': return { color: 'text-[var(--text-secondary)]', bg: 'bg-[var(--border-color)]', label: 'Staff' }
      case 'kasir': return { color: 'text-[#ec4899]', bg: 'bg-[#ec4899]/10', label: 'Kasir' }
      default: return { color: 'text-[var(--text-secondary)]', bg: 'bg-[var(--border-color)]', label: role }
    }
  }

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CREATE': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
      case 'UPDATE': return { color: 'text-amber-400', bg: 'bg-amber-500/10' }
      case 'DELETE': return { color: 'text-red-400', bg: 'bg-red-500/10' }
      case 'LOGIN': return { color: 'text-blue-400', bg: 'bg-blue-500/10' }
      case 'LOGOUT': return { color: 'text-gray-400', bg: 'bg-gray-500/10' }
      default: return { color: 'text-[var(--text-secondary)]', bg: 'bg-[var(--border-color)]' }
    }
  }

  return (
    <motion.div key="pengaturan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="mb-6">
        <h2 className="mb-1 text-2xl font-bold">Pengaturan</h2>
        <p className="text-sm text-[var(--text-secondary)]">Konfigurasi dan preferensi aplikasi</p>
      </div>

      {/* Sub-tab Toggle */}
      <div className="mb-6 flex gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1">
        {[
          { id: 'perusahaan' as const, label: 'Informasi Perusahaan', icon: Building2 },
          { id: 'pengguna' as const, label: 'Manajemen Pengguna', icon: Users },
          { id: 'log' as const, label: 'Log Aktivitas', icon: Activity },
        ].map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                subTab === tab.id
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <TabIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ── 4a. Informasi Perusahaan ── */}
        {subTab === 'perusahaan' && (
          <motion.div key="perusahaan" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
            {settingsLoading ? (
              <div className="glass-card rounded-xl p-6 space-y-4">
                {[1,2,3,4,5,6].map(i => <PulseSkeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="bg-[var(--report-header-bg)] border-b border-[var(--border-color)] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/10">
                      <Building2 className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Informasi Perusahaan</h3>
                      <p className="text-xs text-[var(--text-secondary)]">Detail organisasi dan identitas bisnis</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DarkInput label="Nama Perusahaan" type="text" value={settingsForm.namaPerusahaan} onChange={(e) => setSettingsForm({ ...settingsForm, namaPerusahaan: e.target.value })} placeholder="Nama perusahaan..." />
                    <DarkInput label="NPWP" type="text" value={settingsForm.npwp} onChange={(e) => setSettingsForm({ ...settingsForm, npwp: e.target.value })} placeholder="00.000.000.0-000.000" />
                  </div>
                  <DarkInput label="Alamat" type="text" value={settingsForm.alamat} onChange={(e) => setSettingsForm({ ...settingsForm, alamat: e.target.value })} placeholder="Alamat lengkap..." />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DarkInput label="Telepon" type="text" value={settingsForm.telepon} onChange={(e) => setSettingsForm({ ...settingsForm, telepon: e.target.value })} placeholder="08xx-xxxx-xxxx" />
                    <DarkInput label="Email" type="email" value={settingsForm.email} onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })} placeholder="email@perusahaan.com" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DarkInput label="Tahun Fiskal" type="text" value={settingsForm.tahunFiskal} onChange={(e) => setSettingsForm({ ...settingsForm, tahunFiskal: e.target.value })} placeholder="2025" />
                    <DarkInput label="Logo URL" type="text" value={settingsForm.logoUrl} onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                    <button
                      onClick={onSaveSettings}
                      disabled={settingsSaving}
                      className="btn-emerald flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium disabled:opacity-40 active:scale-[0.98]"
                    >
                      {settingsSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Simpan Pengaturan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── 4b. Manajemen Pengguna ── */}
        {subTab === 'pengguna' && (
          <motion.div key="pengguna" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Users className="h-4 w-4 text-[#10b981]" />
                <span>{tenantUsers.length} pengguna terdaftar</span>
              </div>
              <button onClick={() => setShowUserModal(true)} className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98]">
                <UserPlus className="h-4 w-4" />
                Tambah Pengguna
              </button>
            </div>

            {usersLoading ? (
              <div className="glass-card rounded-xl p-5 space-y-4">
                {[1,2,3,4].map(i => <PulseSkeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : tenantUsers.length === 0 ? (
              <div className="glass-card rounded-xl py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--bg-secondary)]">
                  <Users className="h-8 w-8 text-[var(--text-secondary)]/20" />
                </div>
                <p className="text-sm text-[var(--text-secondary)]/60">Belum ada pengguna terdaftar</p>
                <p className="text-xs text-[var(--text-secondary)]/40 mt-1">Tambahkan pengguna untuk mengelola akses</p>
                <button onClick={() => setShowUserModal(true)} className="btn-emerald mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium mx-auto active:scale-[0.98]">
                  <UserPlus className="h-4 w-4" />Tambah Pengguna
                </button>
              </div>
            ) : (
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-left text-xs font-medium text-[var(--text-secondary)]">
                        <th className="px-4 py-3">Nama User</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Jabatan</th>
                        <th className="px-4 py-3">Terdaftar</th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenantUsers.map((user, idx) => {
                        const roleBadge = getRoleBadge(user.role)
                        return (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.03 }}
                            className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10 text-xs font-bold text-[#10b981]">
                                  {user.namaUser.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium">{user.namaUser}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${roleBadge.bg} ${roleBadge.color}`}>
                                {roleBadge.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{user.jabatan || '-'}</td>
                            <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                              {new Date(user.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => setDeleteUserConfirm(user.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400 ml-auto"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Create User Modal */}
            <GenericModal show={showUserModal} onClose={() => setShowUserModal(false)} title="Tambah Pengguna" subtitle="Buat akun pengguna baru" icon={UserPlus} iconColor="#10b981">
              <div className="space-y-4">
                <DarkInput label="Nama User" type="text" value={userForm.namaUser} onChange={(e) => setUserForm({ ...userForm, namaUser: e.target.value })} placeholder="namauser" />
                <DarkInput label="Password" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} placeholder="Minimal 6 karakter" />
                <div className="grid grid-cols-2 gap-4">
                  <DarkSelect label="Role" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                    <option value="admin" className="bg-[var(--bg-secondary)]">Admin</option>
                    <option value="manajer" className="bg-[var(--bg-secondary)]">Manajer</option>
                    <option value="staff" className="bg-[var(--bg-secondary)]">Staff</option>
                    <option value="kasir" className="bg-[var(--bg-secondary)]">Kasir</option>
                  </DarkSelect>
                  <DarkInput label="Jabatan" type="text" value={userForm.jabatan} onChange={(e) => setUserForm({ ...userForm, jabatan: e.target.value })} placeholder="Jabatan..." />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button onClick={() => setShowUserModal(false)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
                  <button onClick={onCreateUser} disabled={userFormLoading || !userForm.namaUser || !userForm.password} className="btn-emerald flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-40">{userFormLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}Simpan</button>
                </div>
              </div>
            </GenericModal>

            {/* Delete User Confirmation */}
            <AnimatePresence>
              {deleteUserConfirm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDeleteUserConfirm(null)}>
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10"><AlertTriangle className="h-7 w-7 text-red-400" /></div>
                    <h3 className="mb-2 text-lg font-bold">Konfirmasi Hapus</h3>
                    <p className="mb-6 text-sm text-[var(--text-secondary)]">Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => setDeleteUserConfirm(null)} className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">Batal</button>
                      <button onClick={() => onDeleteUser(deleteUserConfirm)} className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"><Trash2 className="h-4 w-4" />Hapus</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── 4c. Log Aktivitas ── */}
        {subTab === 'log' && (
          <motion.div key="log" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.25 }}>
            {/* Filter */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Activity className="h-4 w-4 text-[#10b981]" />
                <span>Riwayat aktivitas sistem</span>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[var(--text-secondary)]" />
                <select
                  value={auditActionFilter}
                  onChange={(e) => setAuditActionFilter(e.target.value)}
                  className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
                >
                  <option value="" className="bg-[var(--bg-secondary)]">Semua Aksi</option>
                  <option value="CREATE" className="bg-[var(--bg-secondary)]">CREATE</option>
                  <option value="UPDATE" className="bg-[var(--bg-secondary)]">UPDATE</option>
                  <option value="DELETE" className="bg-[var(--bg-secondary)]">DELETE</option>
                  <option value="LOGIN" className="bg-[var(--bg-secondary)]">LOGIN</option>
                  <option value="LOGOUT" className="bg-[var(--bg-secondary)]">LOGOUT</option>
                </select>
              </div>
            </div>

            {auditLoading ? (
              <div className="glass-card rounded-xl p-5 space-y-4">
                {[1,2,3,4,5].map(i => <PulseSkeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : auditLogs.length === 0 ? (
              <div className="glass-card rounded-xl py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--bg-secondary)]">
                  <Activity className="h-8 w-8 text-[var(--text-secondary)]/20" />
                </div>
                <p className="text-sm text-[var(--text-secondary)]/60">Belum ada log aktivitas</p>
                <p className="text-xs text-[var(--text-secondary)]/40 mt-1">Aktivitas akan tercatat secara otomatis</p>
              </div>
            ) : (
              <>
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                      <thead>
                        <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-left text-xs font-medium text-[var(--text-secondary)]">
                          <th className="px-4 py-3">Waktu</th>
                          <th className="px-4 py-3">Pengguna</th>
                          <th className="px-4 py-3">Aksi</th>
                          <th className="px-4 py-3">Resource</th>
                          <th className="px-4 py-3">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map((log, idx) => {
                          const actionBadge = getActionBadge(log.action)
                          return (
                            <motion.tr
                              key={log.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.02 }}
                              className="border-b border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--accent-light)]"
                            >
                              <td className="px-4 py-3 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3 w-3 text-[var(--text-secondary)]/40" />
                                  {new Date(log.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                  <span className="text-[var(--text-secondary)]/50">{new Date(log.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">{log.username || '-'}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${actionBadge.bg} ${actionBadge.color}`}>
                                  {log.action}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{log.resource}</td>
                              <td className="px-4 py-3 text-sm text-[var(--text-secondary)]/70 max-w-[200px] truncate">{log.details || '-'}</td>
                            </motion.tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {auditPagination && auditPagination.totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-[var(--text-secondary)]">
                      Halaman {auditPagination.page} dari {auditPagination.totalPages} · {auditPagination.total} total
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAuditPage(Math.max(1, auditPage - 1))}
                        disabled={auditPage <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] disabled:opacity-30"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setAuditPage(Math.min(auditPagination.totalPages, auditPage + 1))}
                        disabled={auditPage >= auditPagination.totalPages}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] disabled:opacity-30"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
