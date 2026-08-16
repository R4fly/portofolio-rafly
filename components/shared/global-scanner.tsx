'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Lazy load Scanner untuk hindari blocking initial paint
const Scanner = dynamic(() => import('./scanner'), {
  ssr: false,
  loading: () => null,
})

/**
 * GlobalScanner — Ambient CRT scan effect yang tampil di SEMUA halaman.
 *
 * Strategi performa:
 * - Lazy load dengan dynamic import (no SSR)
 * - Fixed position, pointer-events: none (tidak block interaksi)
 * - Opacity berbeda untuk light/dark mode (via CSS variables)
 * - z-index 0 (di belakang semua content)
 * - Scanner component sendiri handle IntersectionObserver + visibilitychange
 *
 * Aksesibilitas:
 * - aria-hidden: true (dekoratif, tidak di-read oleh screen reader)
 * - Reduced motion: Scanner component sendiri handle ini
 */
export function GlobalScanner() {
  const [shouldRender, setShouldRender] = useState(false)

  // Delay render hingga setelah hydration untuk hindari layout shift
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShouldRender(true)
    }, 500)
    return (): void => {
      window.clearTimeout(timer)
    }
  }, [])

  // Jangan render di server atau sebelum delay selesai
  if (!shouldRender) return null

  return (
    <div
      className="global-scanner"
      aria-hidden="true"
    >
      <Scanner
        color1="#22d3ee" // cyan (brand primary)
        color2="#f59e0b" // amber (brand secondary)
        color3="#ffffff"
        speed={0.2}
        sweepSpeed={0.12}
        sweepWidth={2}
        sweepFalloff={7}
        scale={2}
        frequency={1.5}
        ripple={0.18}
        bandDensity={7}
        lineSharpness={6.5}
        glow={0.12}
        scanDirection="vertical"
        colorSpread={0.5}
        brightness={0.95}
        contrast={1.1}
        softness={1.5}
        vignette={0.55}
        scanline={false} // Disable untuk kurangi noise di background
        grain={false}
        grainIntensity={0}
        opacity={1.0}
        mouseInteraction
        mouseRadius={1.0}
        mouseStrength={0.2}
      />
    </div>
  )
}