'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Keyboard, Command } from 'lucide-react'
import { TAB_ORDER } from '@/hooks/use-keyboard-shortcuts'
import { sidebarGroups } from '@/lib/tenant-sidebar'

interface ShortcutsHelpProps {
  show: boolean
  onClose: () => void
}

const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().includes('MAC')
const modKey = isMac ? '⌘' : 'Ctrl'

// Flatten all sidebar items for tab mapping
const allSidebarItems = sidebarGroups.flatMap((g) => g.items)

export function ShortcutsHelp({ show, onClose }: ShortcutsHelpProps) {
  return (
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="h-1 rounded-t-2xl bg-gradient-to-r from-[#10b981] via-teal-400 to-[#10b981]" />
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/15">
                  <Keyboard className="h-5 w-5 text-[#10b981]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    Pintasan Keyboard
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Navigasi cepat dengan keyboard
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-hover-bg)] hover:text-[var(--text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto px-5 pb-5 space-y-5">
              {/* General Shortcuts */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                  Umum
                </p>
                <div className="space-y-1">
                  <ShortcutRow
                    keys={[modKey, 'K']}
                    description="Buka Command Palette"
                  />
                  <ShortcutRow
                    keys={[modKey, '/']}
                    description="Tampilkan bantuan pintasan"
                  />
                  <ShortcutRow
                    keys={[modKey, 'N']}
                    description="Buat item baru"
                  />
                  <ShortcutRow keys={['Esc']} description="Tutup modal" />
                </div>
              </div>

              {/* Tab Navigation Shortcuts */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                  Navigasi Tab
                </p>
                <div className="space-y-1">
                  {TAB_ORDER.map((tabId, idx) => {
                    const item = allSidebarItems.find((i) => i.id === tabId)
                    if (!item) return null
                    return (
                      <ShortcutRow
                        key={tabId}
                        keys={[modKey, String(idx + 1)]}
                        description={item.label}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Command Palette Navigation */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                  Di Dalam Command Palette
                </p>
                <div className="space-y-1">
                  <ShortcutRow keys={['↑', '↓']} description="Pilih item" />
                  <ShortcutRow keys={['↵']} description="Buka item terpilih" />
                  <ShortcutRow keys={['Esc']} description="Tutup palette" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border-color)] px-5 py-3">
              <p className="text-center text-[10px] text-[var(--text-muted)]">
                Tekan <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-1 py-0.5 text-[9px]">{modKey}+/</kbd> kapan saja untuk melihat pintasan ini
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function ShortcutRow({
  keys,
  description,
}: {
  keys: string[]
  description: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[var(--accent-light)]">
      <span className="text-sm text-[var(--text-primary)]">{description}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, idx) => (
          <span key={idx} className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] min-w-[28px]">
              {key}
            </kbd>
            {idx < keys.length - 1 && (
              <span className="text-[10px] text-[var(--text-muted)]">+</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
