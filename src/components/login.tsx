'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Landmark, ArrowLeft, Loader2, Shield, CheckCircle2, Keyboard, Hexagon, Sparkles, Zap } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/theme-toggle'

export function Login() {
  const { setAuth, setCurrentView } = useAuthStore()
  const [loginMode, setLoginMode] = useState<'central' | 'tenant'>('central')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tenantId, setTenantId] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          loginMode,
          tenantId: loginMode === 'tenant' ? tenantId : undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Login gagal')
        return
      }

      toast.success('Login berhasil!')
      setAuth(data.user)
    } catch {
      toast.error('Terjadi kesalahan jaringan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex relative">
      {/* Theme Toggle - top right corner */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-(--bg-primary) via-(--bg-tertiary) to-(--bg-secondary) animated-gradient-bg" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald/5 blur-[128px] hero-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-dark/5 blur-[128px] hero-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] left-[60%] h-64 w-64 rounded-full bg-emerald-light/3 blur-[100px] hero-glow" style={{ animationDelay: '4s' }} />

        {/* Floating decorative elements */}
        <div className="absolute top-[15%] right-[20%] h-3 w-3 rounded-full border border-emerald/20 float-animation" />
        <div className="absolute top-[60%] left-[10%] h-2 w-2 rounded-full bg-emerald/15 float-slow-animation" />
        <div className="absolute bottom-[25%] right-[35%] h-4 w-4 rotate-45 border border-emerald/10 float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[35%] left-[30%] h-5 w-5 rounded-full border border-emerald-light/10 float-slow-animation" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[40%] right-[15%] h-2.5 w-2.5 rounded-full bg-[#34d399]/10 float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[80%] left-[25%] h-3.5 w-3.5 rotate-12 border border-[#10b981]/8 float-slow-animation" style={{ animationDelay: '4s' }} />
        {/* Additional geometric shapes */}
        <div className="absolute top-[10%] left-[50%] opacity-10 float-animation" style={{ animationDelay: '2.5s' }}>
          <Hexagon className="h-8 w-8 text-emerald" />
        </div>
        <div className="absolute bottom-[15%] left-[40%] opacity-10 float-slow-animation" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="h-6 w-6 text-[#34d399]" />
        </div>
        <div className="absolute top-[45%] right-[8%] opacity-[0.06] float-animation" style={{ animationDelay: '3.5s' }}>
          <Zap className="h-10 w-10 text-[#10b981]" />
        </div>

        <div className="relative flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={() => setCurrentView('landing')}
              className="mb-8 flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[#10b981]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </button>

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669]">
                <Landmark className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Bumdes<span className="text-[#10b981]">Juara</span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">Platform Akuntansi Multi-Tenant</p>
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight xl:text-4xl">
              Kelola Keuangan{' '}
              <span className="gradient-text">BUMDes</span>{' '}
              Lebih Mudah
            </h1>

            <p className="mb-8 max-w-md text-[var(--text-secondary)] leading-relaxed">
              Platform akuntansi profesional yang dirancang khusus untuk Badan Usaha Milik Desa.
              Kelola banyak unit usaha dalam satu dashboard yang terintegrasi.
            </p>

            <div className="space-y-3">
              {[
                'Multi-tenant dengan isolasi data',
                'Akuntansi lengkap & otomatis',
                'Simpan pinjam terintegrasi',
                'Keamanan tinggi & terenkripsi',
              ].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.15 }}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10b981]/70" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center px-4 py-6 sm:px-8 lg:w-1/2 lg:px-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile back button and logo */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setCurrentView('landing')}
              className="mb-4 flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[#10b981]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669]">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                Bumdes<span className="text-[#10b981]">Juara</span>
              </span>
            </div>
          </div>

          {/* Logo above form - desktop */}
          <div className="mb-6 hidden lg:flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] shadow-lg shadow-[#10b981]/20">
              <Landmark className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="mb-2 text-2xl font-bold">Masuk ke Akun</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Silakan masuk untuk mengakses dashboard Anda
            </p>
          </div>

          {/* Login Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-[var(--bg-tertiary)] p-1 relative">
            <motion.div
              className="absolute top-1 bottom-1 rounded-md bg-[#10b981] shadow-lg shadow-[#10b981]/20"
              style={{ width: 'calc(50% - 4px)' }}
              animate={{ x: loginMode === 'central' ? 2 : 'calc(100% + 2px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setLoginMode('central')}
              className={`relative z-10 flex-1 rounded-md py-2 text-sm font-medium transition-colors duration-200 ${loginMode === 'central'
                ? 'text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Central Admin
              </span>
            </button>
            <button
              onClick={() => setLoginMode('tenant')}
              className={`relative z-10 flex-1 rounded-md py-2 text-sm font-medium transition-colors duration-200 ${loginMode === 'tenant'
                ? 'text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Landmark className="h-3.5 w-3.5" />
                Tenant
              </span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={loginMode}
              onSubmit={handleSubmit}
              className="gradient-border-animated rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 backdrop-blur-sm login-card-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {/* Tenant ID field - only shown in tenant mode */}
              {loginMode === 'tenant' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                    Tenant ID
                  </label>
                  <input
                    type="text"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="contoh: bumdes-maju"
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/20 input-focus-ring"
                    required={loginMode === 'tenant'}
                  />
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Masukkan ID tenant (subdomain) yang terdaftar
                  </p>
                </motion.div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/20 input-focus-ring"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-2.5 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/20 input-focus-ring"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors hover:text-[#10b981]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${rememberMe
                    ? 'border-[#10b981] bg-[#10b981]'
                    : 'border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--border-hover)]'
                    }`}
                >
                  {rememberMe && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </button>
                <span className="text-xs text-[var(--text-secondary)]">Ingat saya</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-emerald cta-glow mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk
                    <Keyboard className="h-3.5 w-3.5 opacity-50" />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Demo Credentials */}
          {/* <div className="mt-6 rounded-xl border border-[#10b981]/10 bg-gradient-to-b from-[#10b981]/[0.03] to-transparent p-4">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-[#10b981]/60" />
              <p className="text-xs font-semibold text-[var(--text-secondary)]">Demo Credentials</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 transition-colors hover:bg-[var(--bg-secondary)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 text-[10px] font-bold text-[#10b981]">C</span>
                <div className="text-xs text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Central Admin</span>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin</code>
                    <span className="text-[var(--text-muted)]">/</span>
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin</code>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 transition-colors hover:bg-[var(--bg-secondary)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 text-[10px] font-bold text-[#10b981]">T1</span>
                <div className="text-xs text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Tenant 1</span>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin</code>
                    <span className="text-[var(--text-muted)]">/</span>
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin12345</code>
                  </div>
                  <div className="mt-0.5 text-[10px] text-[var(--text-muted)]">ID: bumdes-maju</div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2.5 transition-colors hover:bg-[var(--bg-secondary)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 text-[10px] font-bold text-[#10b981]">T2</span>
                <div className="text-xs text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">Tenant 2</span>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin</code>
                    <span className="text-[var(--text-muted)]">/</span>
                    <code className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-mono text-[#10b981]">admin12345</code>
                  </div>
                  <div className="mt-0.5 text-[10px] text-[var(--text-muted)]">ID: koperasi-sejahtera</div>
                </div>
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </div >
  )
}
