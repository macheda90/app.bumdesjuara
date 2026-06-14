'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCircle2, XCircle, Edit3, Trash2, LogIn, Shield } from 'lucide-react'

interface Notification {
  id: string
  action: string
  resource: string
  username: string | null
  createdAt: string
  details: string | null
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch recent notifications (audit logs)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/tenant/audit-log?page=1&limit=10')
        if (res.ok) {
          const data = await res.json()
          setNotifications(data.logs || [])
          // Count recent ones (last hour) as "unread"
          const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
          setUnreadCount(
            (data.logs || []).filter((l: Notification) => new Date(l.createdAt) > oneHourAgo).length
          )
        }
      } catch { /* silent */ } finally { setLoading(false) }
    }
    fetchNotifications()
    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return CheckCircle2
      case 'UPDATE': return Edit3
      case 'DELETE': return Trash2
      case 'LOGIN': return LogIn
      case 'APPROVE': return Shield
      case 'REJECT': return XCircle
      default: return Bell
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'text-emerald-400'
      case 'UPDATE': return 'text-amber-400'
      case 'DELETE': return 'text-red-400'
      case 'LOGIN': return 'text-blue-400'
      case 'APPROVE': return 'text-green-400'
      case 'REJECT': return 'text-red-400'
      default: return 'text-[var(--text-secondary)]'
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes} menit lalu`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} jam lalu`
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)]"
      >
        <Bell className="h-4 w-4 text-[var(--text-secondary)]" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#10b981] px-1 text-[10px] font-bold text-white"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-xl"
          >
            <div className="border-b border-[var(--border-color)] p-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notifikasi</h3>
              <p className="text-xs text-[var(--text-secondary)]">Aktivitas terbaru</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#10b981] border-t-transparent" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center p-6 text-center">
                  <Bell className="mb-2 h-8 w-8 text-[var(--text-secondary)]/30" />
                  <p className="text-sm text-[var(--text-secondary)]">Tidak ada notifikasi</p>
                </div>
              ) : (
                notifications.map((notif, idx) => {
                  const Icon = getActionIcon(notif.action)
                  const color = getActionColor(notif.action)
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-start gap-3 border-b border-[var(--border-color)] p-3 transition-colors hover:bg-[var(--accent-light)]"
                    >
                      <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-light)] ${color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[var(--text-primary)]">
                          {notif.username || 'System'} — {notif.action} {notif.resource}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                          {formatTime(notif.createdAt)}
                        </p>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
            <div className="border-t border-[var(--border-color)] p-2">
              <button
                onClick={() => { setIsOpen(false) }}
                className="w-full rounded-lg p-2 text-center text-xs font-medium text-[#10b981] transition-colors hover:bg-[var(--accent-light)]"
              >
                Lihat Semua di Log Aktivitas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
