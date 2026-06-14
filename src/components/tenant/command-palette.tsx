'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  ArrowRight,
  Hash,
} from 'lucide-react'
import type { TenantTabType } from '@/lib/tenant-types'
import { sidebarGroups } from '@/lib/tenant-sidebar'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  action: () => void
  group: 'navigasi' | 'aksi'
  keywords?: string[]
}

interface CommandPaletteProps {
  show: boolean
  onClose: () => void
  onNavigate: (tab: TenantTabType) => void
  onCreateNew: () => void
  currentTab: TenantTabType
  recentSearches: string[]
  onAddRecentSearch: (query: string) => void
}


export function CommandPalette({
  show,
  onClose,
  onNavigate,
  onCreateNew,
  currentTab,
  recentSearches,
  onAddRecentSearch,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Build command items
  const allItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = []

    // Navigation items from sidebar groups
    for (const group of sidebarGroups) {
      for (const item of group.items) {
        const Icon = item.icon
        items.push({
          id: `nav-${item.id}`,
          label: item.label,
          description: `Navigasi ke ${item.label}`,
          icon: Icon,
          action: () => onNavigate(item.id),
          group: 'navigasi',
          keywords: [item.label.toLowerCase(), item.id, group.label.toLowerCase()],
        })
      }
    }

    // Quick action items
    const actionLabels: Record<TenantTabType, string> = {
      dashboard: 'Refresh Dashboard',
      jurnal: 'Buat Jurnal Baru',
      akun: 'Tambah Akun Baru',
      laporan: 'Lihat Laporan Keuangan',
      'buku-besar': 'Lihat Buku Besar',
      'neraca-saldo': 'Lihat Neraca Saldo',
      'arus-kas': 'Lihat Arus Kas',
      penjualan: 'Tambah Penjualan',
      pembelian: 'Tambah Pembelian',
      persediaan: 'Tambah Persediaan',
      simpanan: 'Tambah Simpanan',
      pinjaman: 'Tambah Pinjaman',
      pelanggan: 'Tambah Pelanggan',
      pemasok: 'Tambah Pemasok',
      pengaturan: 'Buka Pengaturan',
    }

    items.push({
      id: 'action-new',
      label: actionLabels[currentTab] || 'Buat Baru',
      description: 'Buat item baru di tab aktif',
      icon: Plus,
      shortcut: 'Ctrl+N',
      action: onCreateNew,
      group: 'aksi',
      keywords: ['baru', 'new', 'create', 'tambah', 'buat'],
    })

    return items
  }, [onNavigate, onCreateNew, currentTab])

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems

    const q = query.toLowerCase().trim()
    return allItems.filter((item) => {
      const labelMatch = item.label.toLowerCase().includes(q)
      const descMatch = item.description?.toLowerCase().includes(q)
      const keywordMatch = item.keywords?.some((kw) => kw.includes(q))
      return labelMatch || descMatch || keywordMatch
    })
  }, [allItems, query])

  // Reset state when palette opens - the parent uses key prop to force remount
  // so we just handle the focus here
  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [show])

  // Handle keyboard navigation within palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        )
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          onAddRecentSearch(query)
          filteredItems[selectedIndex].action()
          onClose()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [filteredItems, selectedIndex, onClose, query, onAddRecentSearch]
  )

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      )
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  // Group filtered items
  const navItems = filteredItems.filter((i) => i.group === 'navigasi')
  const actionItems = filteredItems.filter((i) => i.group === 'aksi')

  const getGlobalIndex = (group: 'navigasi' | 'aksi', localIndex: number) => {
    if (group === 'navigasi') return localIndex
    return navItems.length + localIndex
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-[var(--border-color)] px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-[var(--text-secondary)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                placeholder="Cari navigasi, aksi, atau akun..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="max-h-72 overflow-y-auto p-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--border-color) transparent',
              }}
            >
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Search className="mb-2 h-8 w-8 text-[var(--text-muted)]" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    Tidak ada hasil untuk &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <>
                  {/* Navigation group */}
                  {navItems.length > 0 && (
                    <div className="mb-1">
                      <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                        Navigasi
                      </p>
                      {navItems.map((item, localIdx) => {
                        const globalIdx = getGlobalIndex('navigasi', localIdx)
                        const Icon = item.icon
                        const isSelected = selectedIndex === globalIdx
                        return (
                          <button
                            key={item.id}
                            data-index={globalIdx}
                            onClick={() => {
                              onAddRecentSearch(query)
                              item.action()
                              onClose()
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-100 ${
                              isSelected
                                ? 'bg-[#10b981]/10 text-[#10b981]'
                                : 'text-[var(--text-primary)] hover:bg-[var(--accent-light)]'
                            }`}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="flex-1 truncate">{item.label}</span>
                            {isSelected && (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#10b981]" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Actions group */}
                  {actionItems.length > 0 && (
                    <div>
                      <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                        Aksi Cepat
                      </p>
                      {actionItems.map((item, localIdx) => {
                        const globalIdx = getGlobalIndex('aksi', localIdx)
                        const Icon = item.icon
                        const isSelected = selectedIndex === globalIdx
                        return (
                          <button
                            key={item.id}
                            data-index={globalIdx}
                            onClick={() => {
                              onAddRecentSearch(query)
                              item.action()
                              onClose()
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-100 ${
                              isSelected
                                ? 'bg-[#10b981]/10 text-[#10b981]'
                                : 'text-[var(--text-primary)] hover:bg-[var(--accent-light)]'
                            }`}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.shortcut && (
                              <kbd className="inline-flex items-center gap-1 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                                {item.shortcut}
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Recent searches */}
            {recentSearches.length > 0 && !query.trim() && (
              <div className="border-t border-[var(--border-color)] p-2">
                <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]/60">
                  Pencarian Terakhir
                </p>
                {recentSearches.slice(0, 5).map((search, idx) => (
                  <button
                    key={`${search}-${idx}`}
                    onClick={() => setQuery(search)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--text-primary)]"
                  >
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-[var(--border-color)] px-4 py-2">
              <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-1 py-0.5 text-[9px]">↑↓</kbd>
                  navigasi
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-1 py-0.5 text-[9px]">↵</kbd>
                  pilih
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                Ctrl+K untuk membuka
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
