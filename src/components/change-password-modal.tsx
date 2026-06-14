'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader2, X, Shield } from 'lucide-react'
import { toast } from 'sonner'

interface ChangePasswordModalProps {
  show: boolean
  onClose: () => void
  apiEndpoint: string // '/api/central/change-password' or '/api/tenant/change-password'
}

function getPasswordStrength(password: string): { label: string; color: string; width: string; score: number } {
  if (!password) return { label: '', color: '', width: '0%', score: 0 }
  if (password.length < 6) return { label: 'Terlalu pendek', color: '#ef4444', width: '10%', score: 0 }

  const hasLetters = /[a-zA-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(password)
  const length = password.length

  if (length >= 12 && hasLetters && hasNumbers && hasSpecial) {
    return { label: 'Kuat', color: '#10b981', width: '100%', score: 4 }
  }
  if (length >= 8 && hasLetters && hasNumbers) {
    return { label: 'Sedang', color: '#f59e0b', width: '66%', score: 3 }
  }
  if (length >= 6 && hasLetters) {
    return { label: 'Lemah', color: '#ef4444', width: '33%', score: 1 }
  }
  return { label: 'Lemah', color: '#ef4444', width: '33%', score: 1 }
}

export function ChangePasswordModal({ show, onClose, apiEndpoint }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const passwordStrength = useMemo(() => getPasswordStrength(newPassword), [newPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 6) {
      setError('Password baru minimal 6 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Password baru tidak cocok')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Password berhasil diubah')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setError('')
        onClose()
      } else {
        setError(data.error || 'Gagal mengubah password')
      }
    } catch {
      setError('Gagal mengubah password')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setError('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top accent line */}
            <div className="h-1 rounded-t-2xl bg-gradient-to-r from-[#10b981] via-teal-400 to-[#10b981]" />

            {/* Header */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/10">
                  <Lock className="h-5 w-5 text-[#10b981]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">Ganti Password</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Perbarui password akun Anda</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-hover-bg)] hover:text-[var(--text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4">
              {/* Current Password */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-[var(--skeleton-bg)] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: passwordStrength.width }}
                        transition={{ duration: 0.3 }}
                        style={{ backgroundColor: passwordStrength.color }}
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3 w-3" style={{ color: passwordStrength.color }} />
                      <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && newPassword && confirmPassword !== newPassword && (
                  <p className="mt-1 text-xs text-red-500">Password tidak cocok</p>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] active:scale-[0.98] disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                  className="btn-emerald flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Password'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
