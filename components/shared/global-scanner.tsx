'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'

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
 * - DISABLED di mobile untuk Lighthouse performance
 * - Scanner component sendiri handle IntersectionObserver + visibilitychange
 *
 * Aksesibilitas:
 * - aria-hidden: true (dekoratif, tidak di-read oleh screen reader)
 * - Reduced motion: Scanner component sendiri handle ini
 *
 * Proper mount checks untuk avoid React warnings.
 */
export function GlobalScanner() {
  const [shouldRender, setShouldRender] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mountedRef = useRef(false)

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true
    return (): void => {
      mountedRef.current = false
    }
  }, [])

  // Delay render hingga setelah hydration untuk hindari layout shift
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (mountedRef.current) {
        setShouldRender(true)
      }
    }, 500)
    return (): void => {
      window.clearTimeout(timer)
    }
  }, [])

  // Detect mobile untuk disable Scanner (performance optimization)
  useEffect(() => {
    const checkMobile = (): void => {
      if (!mountedRef.current) return
      // Disable Scanner di mobile (max-width: 768px)
      const mobile = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(mobile)
    }

    checkMobile() // Initial check

    // Listen untuk resize events
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', checkMobile)

    return (): void => {
      mediaQuery.removeEventListener('change', checkMobile)
    }
  }, [])

  // Jangan render di server, sebelum delay selesai, atau di mobile
  if (!shouldRender || isMobile) return null

  return (
    <div
      className="global-scanner"
      aria-hidden="true"
    >
      <Scanner
        color1="#22d3ee"
        color2="#f59e0b"
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
        scanline={false}
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