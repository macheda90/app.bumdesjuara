'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Landmark } from 'lucide-react'
import { formatCurrency } from '@/lib/tenant-utils'

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

export const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-2 shadow-xl">
        <p className="mb-1 text-xs text-[var(--text-secondary)]">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// ─── Enhanced Pulse Skeleton Component ────────────────────────────────────────

export function PulseSkeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative overflow-hidden rounded bg-[var(--skeleton-bg)] ${className || ''}`} style={style}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton-shimmer)] to-transparent" />
    </div>
  )
}

// ─── Card Skeleton for loading card states ───────────────────────────────────

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-shimmer rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
      <PulseSkeleton className="mb-3 h-4 w-1/3" />
      <PulseSkeleton className="mb-2 h-8 w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <PulseSkeleton key={i} className="mb-2 h-3" style={{ width: `${60 + Math.random() * 30}%` } as React.CSSProperties} />
      ))}
    </div>
  )
}

// ─── Table Skeleton for loading table states ─────────────────────────────────

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 border-b border-[var(--border-color)] pb-3">
        {Array.from({ length: cols }).map((_, i) => (
          <PulseSkeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4" style={{ opacity: 1 - i * 0.15 }}>
          {Array.from({ length: cols }).map((_, j) => (
            <PulseSkeleton key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Stat Card Skeleton for dashboard loading ───────────────────────────────

export function StatCardSkeleton() {
  return (
    <div className="card-shimmer rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <PulseSkeleton className="mb-2 h-3 w-20" />
          <PulseSkeleton className="h-7 w-36" />
        </div>
        <PulseSkeleton className="h-12 w-12 rounded-xl" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <PulseSkeleton className="h-3 w-24" />
        <PulseSkeleton className="h-3 w-12" />
      </div>
      <PulseSkeleton className="mt-2 h-8 w-full" />
    </div>
  )
}

// ─── Form Skeleton for modal form loading ───────────────────────────────────

export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <PulseSkeleton className="mb-1.5 h-3 w-20" />
          <PulseSkeleton className="h-9 w-full rounded-lg" />
        </div>
      ))}
      <div className="flex justify-end gap-3 pt-2">
        <PulseSkeleton className="h-9 w-20 rounded-lg" />
        <PulseSkeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  )
}

// ─── Card Grid Skeleton for list/card views ─────────────────────────────────

export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-shimmer glass-card rounded-xl p-4">
          <div className="flex items-center gap-4">
            <PulseSkeleton className="h-10 w-10 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <PulseSkeleton className="h-4 w-3/4" />
              <PulseSkeleton className="h-3 w-1/2" />
            </div>
            <PulseSkeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Enhanced Generic Modal Shell ─────────────────────────────────────────────

export function GenericModal({ show, onClose, title, subtitle, icon, iconColor = '#10b981', children, footer }: {
  show: boolean; onClose: () => void; title: string; subtitle?: string; icon?: typeof Plus; iconColor?: string; children: React.ReactNode; footer?: React.ReactNode
}) {
  const Icon = icon
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top accent line */}
            <div className="h-1 rounded-t-2xl bg-gradient-to-r from-[#10b981] via-teal-400 to-[#10b981]" />
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${iconColor}15` }}>
                    <Icon className="h-5 w-5" style={{ color: iconColor }} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
                  {subtitle && <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>}
                </div>
              </div>
              <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-hover-bg)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-5 pb-5">
              {children}
            </div>
            {footer && (
              <>
                <div className="border-t border-[var(--border-color)]" />
                <div className="p-5">{footer}</div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ─── Dark Input ───────────────────────────────────────────────────────────────

export function DarkInput({ label, type = 'text', value, onChange, placeholder }: {
  label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[#10b981]/50 transition-colors"
      />
    </div>
  )
}

// ─── Dark Select ──────────────────────────────────────────────────────────────

export function DarkSelect({ label, value, onChange, children }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[#10b981]/50 transition-colors"
      >
        {children}
      </select>
    </div>
  )
}
