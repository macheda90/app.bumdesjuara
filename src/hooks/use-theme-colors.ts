'use client'

import { useTheme } from 'next-themes'
import { useState } from 'react'

/**
 * Reads CSS custom properties from the document root and returns
 * theme-aware color values for use in Recharts inline styles.
 * Falls back to dark-mode values during SSR / before hydration.
 */
export function useThemeColors() {
  const { resolvedTheme } = useTheme()
  const [mounted] = useState(() => {
    if (typeof window === 'undefined') return false
    return true
  })

  // Provide safe defaults that match dark theme (the original hard-coded values)
  const colors = {
    tooltipBg: mounted ? getCSSVar('--chart-tooltip-bg') : '#0d1b2a',
    tooltipBorder: mounted ? getCSSVar('--chart-tooltip-border') : 'rgba(255,255,255,0.08)',
    tooltipText: mounted ? getCSSVar('--chart-tooltip-text') : '#e0e0e0',
    axisText: mounted ? getCSSVar('--chart-axis-text') : '#8fa8c8',
    gridStroke: mounted ? getCSSVar('--chart-grid-stroke') : 'rgba(255,255,255,0.04)',
  }

  return colors
}

function getCSSVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
