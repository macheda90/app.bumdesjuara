'use client'

import { useEffect, useCallback } from 'react'
import type { TenantTabType } from '@/lib/tenant-types'

interface ShortcutActions {
  onOpenCommandPalette: () => void
  onCloseAllModals: () => void
  onSwitchTab: (tab: TenantTabType) => void
  onCreateNew: () => void
  onShowShortcutsHelp: () => void
  isAnyModalOpen?: boolean
}

// Tab order for Ctrl+1-9 shortcuts
const TAB_ORDER: TenantTabType[] = [
  'dashboard',
  'jurnal',
  'akun',
  'laporan',
  'buku-besar',
  'neraca-saldo',
  'arus-kas',
  'penjualan',
  'pembelian',
]

export function useKeyboardShortcuts(actions: ShortcutActions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey

      // Escape: close any open modal
      if (e.key === 'Escape') {
        e.preventDefault()
        actions.onCloseAllModals()
        return
      }

      // Don't trigger shortcuts when typing in input/select/textarea unless it's Escape
      const target = e.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA'

      // Ctrl+K / Cmd+K: Open command palette
      if (isMod && e.key === 'k') {
        e.preventDefault()
        actions.onOpenCommandPalette()
        return
      }

      // Ctrl+/ / Cmd+/: Show shortcuts help
      if (isMod && e.key === '/') {
        e.preventDefault()
        actions.onShowShortcutsHelp()
        return
      }

      // Skip remaining shortcuts when typing
      if (isTyping) return

      // Ctrl+1-9: Switch between tabs
      if (isMod && e.key >= '1' && e.key <= '9') {
        e.preventDefault()
        const index = parseInt(e.key, 10) - 1
        if (index < TAB_ORDER.length) {
          actions.onSwitchTab(TAB_ORDER[index])
        }
        return
      }

      // Ctrl+N / Cmd+N: Create new item
      if (isMod && e.key === 'n') {
        e.preventDefault()
        actions.onCreateNew()
        return
      }
    },
    [actions]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export { TAB_ORDER }
