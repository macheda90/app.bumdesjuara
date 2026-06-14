'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Shield,
  BarChart3,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Landmark,
  Quote,
  UserPlus,
  Settings,
  Rocket,
  TrendingUp,
  Clock,
  Headphones,
  ChevronRight,
  Star,
  Heart,
  MessageCircle,
  Github,
  Twitter,
  Linkedin,
  ChevronDown,
  Zap,
  Lock,
  Wifi,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

interface LandingProps {
  onNavigate: (view: 'login') => void
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 1500
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            start = Math.floor(eased * target)
            setCount(start)
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div ref={ref} className="stat-counter">
      <span className="text-3xl font-extrabold sm:text-4xl">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-(--border-hover)"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-(--bg-tertiary)"
      >
        <span className="text-sm font-semibold pr-4 sm:text-base">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 ml-3"
        >
          <ChevronDown className="h-5 w-5 text-(--text-secondary) transition-colors" style={{ color: isOpen ? '#10b981' : undefined }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed text-(--text-secondary) border-t border-(--border-color) pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary)">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-(--border-color) bg-(--bg-primary)/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald to-emerald-dark">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              Bumdes<span className="text-emerald">Juara</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => onNavigate('login')}
              className="btn-emerald rounded-lg px-5 py-2 text-sm font-semibold"
            >
              Masuk
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-linear-to-b from-(--bg-primary) via-(--bg-tertiary) to-(--bg-primary)" />
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-emerald/5 blur-[128px] hero-glow" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-dark/5 blur-[128px] hero-glow" style={{ animationDelay: '2s' }} />
        {/* Additional floating orbs */}
        <div className="absolute top-[30%] right-[10%] h-64 w-64 rounded-full bg-emerald-light/3 blur-[100px] hero-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[20%] left-[5%] h-48 w-48 rounded-full bg-emerald/4 blur-[80px] hero-glow" style={{ animationDelay: '5s' }} />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Subtle center glow behind hero text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-150 w-150 rounded-full bg-emerald/4 blur-[160px] hero-glow" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald"
              data-particle
              style={{
                // Avoid hydration mismatch: do not use Math.random() during render.
                // Deterministic inline styles are applied on mount.
                width: '2px',
                height: '2px',
                left: '50%',
                top: '50%',
                opacity: 0.25,
                animation: 'particle-float 6s ease-in-out infinite',
                animationDelay: '0s',
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5 text-sm text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                Platform Akuntansi Multi-Tenant
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              Kelola Keuangan{' '}
              <span className="gradient-text">BUMDes</span>{' '}
              Lebih Mudah
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10 text-lg text-(--text-secondary) sm:text-xl"
            >
              Platform akuntansi profesional yang dirancang khusus untuk Badan Usaha Milik Desa.
              Kelola banyak unit usaha dalam satu dashboard yang terintegrasi.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <button
                onClick={() => onNavigate('login')}
                className="btn-emerald cta-glow group flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
              >
                Mulai Sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
                <CheckCircle2 className="h-4 w-4 text-emerald" />
                Gratis untuk BUMDes
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview - with glass-morphism */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="glass-card rounded-2xl p-1 pulse-glow">
              <div className="rounded-xl bg-linear-to-b from-(--bg-secondary) to-(--bg-primary) p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 rounded-md bg-(--bg-tertiary) px-4 py-1.5 text-xs text-(--text-secondary)">
                    app.bumdesjuara.id
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
                  {[
                    { label: 'Total Kas', value: 'Rp 245.8 Jt', icon: '💰' },
                    { label: 'Piutang', value: 'Rp 89.2 Jt', icon: '📊' },
                    { label: 'Utang', value: 'Rp 32.5 Jt', icon: '📋' },
                    { label: 'Persediaan', value: 'Rp 67.1 Jt', icon: '📦' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="rounded-lg border border-(--border-color) bg-(--bg-secondary) p-3 sm:p-4 backdrop-blur-sm"
                    >
                      <div className="mb-2 text-lg">{item.icon}</div>
                      <div className="text-xs text-(--text-secondary)">{item.label}</div>
                      <div className="text-sm font-bold text-(--text-primary) sm:text-base">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-(--border-color) bg-(--bg-secondary) p-4 backdrop-blur-sm">
                    <div className="mb-3 text-xs font-medium text-(--text-secondary)">
                      Penjualan vs Pembelian
                    </div>
                    <div className="flex items-end gap-1">
                      {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-linear-to-t from-emerald/30 to-emerald"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-(--border-color) bg-(--bg-secondary) p-4 backdrop-blur-sm">
                    <div className="mb-3 text-xs font-medium text-(--text-secondary)">
                      Simpanan & Pinjaman
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-(--text-secondary)">Simpanan</span>
                        <span className="font-medium text-emerald">Rp 156.4 Jt</span>
                      </div>
                      <div className="h-2 rounded-full bg-(--skeleton-bg)">
                        <div className="h-2 w-3/4 rounded-full bg-linear-to-r from-emerald to-emerald-light" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-(--text-secondary)">Pinjaman Aktif</span>
                        <span className="font-medium text-[#f59e0b]">Rp 45.2 Jt</span>
                      </div>
                      <div className="h-2 rounded-full bg-(--skeleton-bg)">
                        <div className="h-2 w-1/3 rounded-full bg-linear-to-r from-[#f59e0b] to-[#fbbf24]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Fitur <span className="gradient-text">Lengkap</span> untuk BUMDes
            </h2>
            <p className="text-(--text-secondary)">
              Semua yang dibutuhkan untuk mengelola keuangan BUMDes secara profesional dan transparan
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Multi-Tenant',
                desc: 'Kelola banyak BUMDes dalam satu platform. Setiap unit usaha memiliki data terpisah dan aman.',
                gradient: 'from-[#10b981] to-[#059669]',
              },
              {
                icon: BarChart3,
                title: 'Akuntansi Lengkap',
                desc: 'Jurnal umum, buku besar, neraca, laba rugi, dan laporan keuangan lainnya secara otomatis.',
                gradient: 'from-emerald-400 to-[#10b981]',
              },
              {
                icon: Building2,
                title: 'Simpan Pinjam',
                desc: 'Kelola simpanan dan pinjaman anggota dengan perhitungan bunga otomatis dan jadwal angsuran.',
                gradient: 'from-[#34d399] to-emerald-500',
              },
              {
                icon: Users,
                title: 'Multi-User',
                desc: 'Tambahkan pengguna dengan peran berbeda: admin, manajer, kasir, dan staff.',
                gradient: 'from-cyan-500 to-[#10b981]',
              },
              {
                icon: Shield,
                title: 'Keamanan Tinggi',
                desc: 'Data dienkripsi dan terisolasi per tenant. Session management yang aman dengan cookie httpOnly.',
                gradient: 'from-[#10b981] to-teal-600',
              },
              {
                icon: Landmark,
                title: 'BUMDes Friendly',
                desc: 'Dirancang khusus sesuai kebutuhan BUMDes dengan Chart of Accounts dan laporan yang sesuai.',
                gradient: 'from-emerald-500 to-[#059669]',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card glass-card-hover feature-card-lift group rounded-xl p-6 transition-all duration-300 hover:border-emerald/20 hover:bg-emerald/2"
              >
                <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br text-emerald transition-colors group-hover:scale-110" style={{ background: `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))` }}>
                  <feature.icon className="h-7 w-7" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-emerald to-emerald-dark text-[10px] font-bold text-white shadow-sm">{i + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-(--text-secondary)">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats Section */}
      <section id="stats" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald/2 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Dipercaya oleh <span className="gradient-text">Ratusan</span> BUMDes
            </h2>
            <p className="text-(--text-secondary)">
              Angka-angka yang membuktikan komitmen kami dalam mendukung BUMDes seluruh Indonesia
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[
              { value: 500, suffix: '+', label: 'BUMDes Terdaftar', icon: Building2 },
              { value: 10000, suffix: '+', label: 'Transaksi/Bulan', icon: TrendingUp },
              { value: 99, suffix: '.9%', label: 'Uptime', icon: Clock },
              { value: 24, suffix: '/7', label: 'Support', icon: Headphones },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card glass-card-hover stat-card-glow relative rounded-xl p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-emerald/15 to-emerald/5 text-emerald">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="relative inline-block">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <div className="absolute -inset-2 rounded-full bg-emerald/5 blur-xl -z-10" />
                </div>
                <p className="mt-2 text-sm text-(--text-secondary)">{stat.label}</p>
                {i < 3 && <div className="hidden lg:block absolute right-0 top-1/4 h-1/2 w-px bg-linear-to-b from-transparent via-emerald/20 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Apa Kata <span className="gradient-text">Mereka</span>?
            </h2>
            <p className="text-(--text-secondary)">
              Testimoni dari para pengelola BUMDes yang sudah merasakan manfaat BumdesJuara
            </p>
          </motion.div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
            {[
              {
                quote: 'Sejak menggunakan BumdesJuara, laporan keuangan BUMDes kami jadi lebih transparan dan mudah diaudit. Warga desa pun lebih percaya.',
                name: 'Budi Santoso',
                position: 'Ketua Pengelola',
                bumdes: 'BUMDes Makmur Jaya, Jawa Barat',
                rating: 5,
                initials: 'BS',
              },
              {
                quote: 'Fitur simpan pinjam sangat membantu mengelola simpanan anggota. Perhitungan bunga otomatis menghemat waktu kami secara signifikan.',
                name: 'Siti Nurhaliza',
                position: 'Sekretaris BUMDes',
                bumdes: 'BUMDes Sejahtera, NTB',
                rating: 5,
                initials: 'SN',
              },
              {
                quote: 'Dashboard yang intuitif membuat siapa saja bisa langsung mengoperasikan tanpa pelatihan khusus. Anak muda desa kami sangat terbantu.',
                name: 'Ahmad Fauzi',
                position: 'Kepala Desa',
                bumdes: 'BUMDes Bersatu, Kalimantan Selatan',
                rating: 5,
                initials: 'AF',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card gradient-border relative rounded-xl p-6"
              >
                <Quote className="mb-3 h-8 w-8 text-emerald/30" />
                <span className="absolute top-4 right-4 text-5xl font-serif leading-none text-emerald/10">"</span>
                {/* Star Rating */}
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, si) => (
                    <Star key={si} className="h-4 w-4 fill-emerald text-emerald" />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-(--text-secondary)">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald/20 to-emerald/5 text-sm font-bold text-emerald">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-(--text-secondary)">{testimonial.position}</p>
                    <p className="text-xs text-emerald/70">{testimonial.bumdes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted by logo bar */}
        <div className="mt-16 border-t border-(--border-color) pt-12">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-(--text-secondary)/50">Dipercaya oleh berbagai institusi desa</p>
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {['BUMDes Maju Jaya', 'Koperasi Sejahtera', 'UMKM Desa Makmur', 'BUMDes Bersatu', 'Koperasi Mandiri'].map((name) => (
                <div key={name} className="shrink-0 rounded-lg border border-(--border-color) bg-(--bg-secondary) px-4 py-2 text-xs font-medium text-(--text-secondary)/60 sm:text-sm">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald/2 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Cara <span className="gradient-text">Mulai</span>
            </h2>
            <p className="text-(--text-secondary)">
              Tiga langkah sederhana untuk mulai mengelola keuangan BUMDes Anda
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting lines with arrows - desktop only */}
            <div className="absolute top-7 left-[16.67%] right-[16.67%] hidden lg:flex items-center">
              <div className="flex-1 border-t-2 border-dashed border-emerald/20" />
              <div className="mx-1 text-emerald/30">
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="flex-1 border-t-2 border-dashed border-emerald/20" />
              <div className="mx-1 text-emerald/30">
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="flex-1 border-t-2 border-dashed border-emerald/20" />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                {
                  step: 1,
                  title: 'Daftar Tenant',
                  desc: 'Buat akun tenant baru untuk BUMDes Anda. Cukup isi nama perusahaan dan data admin.',
                  icon: UserPlus,
                },
                {
                  step: 2,
                  title: 'Setup Akun',
                  desc: 'Konfigurasi Chart of Accounts dan pengaturan dasar sesuai kebutuhan BUMDes Anda.',
                  icon: Settings,
                },
                {
                  step: 3,
                  title: 'Mulai Kelola',
                  desc: 'Catat transaksi, kelola simpan pinjam, dan lihat laporan keuangan secara real-time.',
                  icon: Rocket,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald to-emerald-dark text-2xl font-extrabold text-white shadow-lg shadow-emerald/20 step-pulse">
                      {item.step}
                    </div>
                  </div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-(--text-secondary)">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald/2 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Pertanyaan yang <span className="gradient-text">Sering Ditanyakan</span>
            </h2>
            <p className="text-(--text-secondary)">
              Temukan jawaban atas pertanyaan umum tentang BumdesJuara
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: 'Apa itu BumdesJuara?',
                a: 'BumdesJuara adalah platform akuntansi multi-tenant yang dirancang khusus untuk Badan Usaha Milik Desa (BUMDes). Dengan BumdesJuara, Anda dapat mengelola keuangan, simpan pinjam, dan laporan keuangan BUMDes secara profesional dalam satu dashboard yang terintegrasi.',
              },
              {
                q: 'Bagaimana sistem multi-tenant bekerja?',
                a: 'Setiap BUMDes mendapatkan tenant terpisah dengan database independen. Data antar BUMDes sepenuhnya terisolasi dan tidak dapat diakses oleh tenant lain. Central Admin mengelola semua tenant dari satu panel kontrol.',
              },
              {
                q: 'Apakah data saya aman?',
                a: 'Tentu saja. Data Anda dienkripsi dan terisolasi per tenant. Kami menggunakan cookie httpOnly untuk session management, dan setiap tenant memiliki database terpisah. Audit log mencatat setiap aktivitas di sistem.',
              },
              {
                q: 'Berapa biaya berlangganan?',
                a: 'BumdesJuara gratis untuk BUMDes! Kami percaya bahwa setiap BUMDes berhak mendapatkan alat pengelolaan keuangan yang profesional tanpa biaya yang memberatkan. Fitur premium akan tersedia di masa depan dengan harga terjangkau.',
              },
              {
                q: 'Bagaimana cara memulai?',
                a: 'Cukup tiga langkah: daftar tenant baru untuk BUMDes Anda, konfigurasi Chart of Accounts sesuai kebutuhan, dan mulai catat transaksi. Tidak perlu instalasi — semua berjalan di browser Anda.',
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-8 text-center sm:p-12"
          >
            {/* Floating notification badges */}
            <div className="absolute top-6 left-6 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1.5 text-xs text-emerald backdrop-blur-sm">
                <Users className="h-3 w-3" />
                +12 BUMDes bulan ini
              </div>
            </div>
            <div className="absolute top-6 right-6 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
              <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-400 backdrop-blur-sm">
                <Zap className="h-3 w-3" />
                Update terbaru v2.0
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Siap Mengelola BUMDes Anda?
            </h2>
            <p className="mb-8 text-(--text-secondary)">
              Bergabung dengan ratusan BUMDes yang sudah menggunakan BumdesJuara untuk pengelolaan keuangan yang lebih baik.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="btn-emerald cta-glow group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold"
            >
              Masuk ke Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                <Building2 className="h-4 w-4 text-emerald" />
                <span>Dipercaya 500+ BUMDes</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                <Wifi className="h-4 w-4 text-emerald" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                <Lock className="h-4 w-4 text-emerald" />
                <span>Data Terenkripsi</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t-2 footer-border-gradient py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-emerald to-emerald-dark">
                  <Landmark className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">
                  Bumdes<span className="text-emerald">Juara</span>
                </span>
              </div>
              <p className="text-xs text-(--text-secondary) leading-relaxed mb-3">
                Platform akuntansi multi-tenant profesional untuk Badan Usaha Milik Desa.
              </p>
              <div className="flex items-center gap-2">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-md border border-(--border-color) text-(--text-secondary) transition-colors hover:border-emerald/30 hover:text-emerald">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-md border border-(--border-color) text-(--text-secondary) transition-colors hover:border-emerald/30 hover:text-emerald">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-md border border-(--border-color) text-(--text-secondary) transition-colors hover:border-emerald/30 hover:text-emerald">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-md border border-(--border-color) text-(--text-secondary) transition-colors hover:border-emerald/30 hover:text-emerald">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-(--text-primary)">Platform</h4>
              <ul className="space-y-1.5">
                {[
                  { label: 'Tentang Kami', href: '#about' },
                  { label: 'Fitur', href: '#features' },
                  { label: 'Harga', href: '#stats' },
                  { label: 'Blog', href: '#' },
                  { label: 'Karir', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#') && link.href.length > 1) {
                          e.preventDefault()
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="flex items-center gap-1 text-xs text-(--text-secondary) transition-colors hover:text-emerald"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fitur */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-(--text-primary)">Fitur</h4>
              <ul className="space-y-1.5">
                {['Akuntansi', 'Simpan Pinjam', 'Multi-Tenant', 'Laporan Keuangan', 'Manajemen User'].map((link) => (
                  <li key={link}>
                    <a href="#" className="flex items-center gap-1 text-xs text-(--text-secondary) transition-colors hover:text-emerald">
                      <ChevronRight className="h-3 w-3" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dukungan */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-(--text-primary)">Dukungan</h4>
              <ul className="space-y-1.5">
                {[
                  { label: 'FAQ', href: '#faq' },
                  { label: 'Pusat Bantuan', href: '#' },
                  { label: 'Dokumentasi', href: '#' },
                  { label: 'Komunitas', href: '#' },
                  { label: 'Hubungi Kami', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#') && link.href.length > 1) {
                          e.preventDefault()
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="flex items-center gap-1 text-xs text-(--text-secondary) transition-colors hover:text-emerald"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-(--border-color) pt-5 sm:flex-row">
            <p className="text-xs text-(--text-secondary)">
              &copy; 2025 BumdesJuara by reinKarnasi. Platform Akuntansi Multi-Tenant
            </p>
            <div className="flex items-center gap-4 text-xs text-(--text-secondary)">
              <a href="#" className="transition-colors hover:text-emerald">Kebijakan Privasi</a>
              <span>·</span>
              <a href="#" className="transition-colors hover:text-emerald">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
