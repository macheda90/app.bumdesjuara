'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Easing Function ──────────────────────────────────────────────────────────
// Ease out cubic for natural deceleration
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Animated Counter Component ───────────────────────────────────────────────
// Numbers animate from 0 to target value on mount using requestAnimationFrame
// for smooth 60fps animation with configurable duration and easing.

interface AnimatedCounterProps {
  value: number
  duration?: number // milliseconds, default 1000
  prefix?: string // e.g., 'Rp ' for currency
  suffix?: string // e.g., '%' for percentages
  decimals?: number // decimal places, default 0
  className?: string
  formatter?: (value: number) => string // custom formatter
}

export function AnimatedCounter({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatter,
}: AnimatedCounterProps) {
  const displayRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const startValueRef = useRef(0)

  const formatNumber = useCallback((num: number): string => {
    if (formatter) {
      return formatter(num)
    }
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return parts.join(',')
  }, [formatter, decimals])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !displayRef.current) {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${formatNumber(value)}${suffix}`
      }
      return
    }

    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      const currentValue = startValueRef.current + (value - startValueRef.current) * easedProgress

      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${formatNumber(currentValue)}${suffix}`
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        startValueRef.current = value
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [value, duration, prefix, suffix, formatNumber])

  return (
    <span ref={displayRef} className={className}>
      {prefix}{formatNumber(0)}{suffix}
    </span>
  )
}

// ─── Currency-specific Counter ────────────────────────────────────────────────
// Pre-configured for Indonesian Rupiah formatting

interface CurrencyCounterProps {
  value: number
  duration?: number
  className?: string
}

export function CurrencyCounter({ value, duration = 1000, className = '' }: CurrencyCounterProps) {
  const formatRupiah = useCallback((num: number): string => {
    const rounded = Math.round(num)
    const formatted = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return rounded < 0 ? `-Rp${formatted}` : `Rp${formatted}`
  }, [])

  return (
    <AnimatedCounter
      value={value}
      duration={duration}
      formatter={formatRupiah}
      className={className}
    />
  )
}
