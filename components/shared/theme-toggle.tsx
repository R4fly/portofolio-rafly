'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import PixelSwap from './pixel-swap'
import { Sun, Moon } from 'lucide-react'

/**
 * Theme Toggle dengan PixelSwap animation.
 *
 * Prinsip desain (sesuai permintaan "tulisan wajib kelihatan!!"):
 * 1. Icon Sun/Moon SELALU terlihat jelas di rest state
 * 2. Pixel animation hanya saat klik (trigger="click", bukan hover)
 * 3. Text label kecil di samping icon untuk extra clarity
 * 4. Size cukup besar (48px icon + label) agar accessible
 * 5. Focus-visible state yang jelas untuk keyboard nav
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Current display mode (use resolvedTheme for accurate value)
  const isDark = (resolvedTheme ?? theme) === 'dark'

  function handleToggle(): void {
    setTheme(isDark ? 'light' : 'dark')
  }

  // SSR: render static sun icon
  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-12 min-w-[120px] items-center justify-center gap-2 rounded-lg border border-border/40 bg-background/50 px-4 text-sm font-medium text-foreground backdrop-blur-sm transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
        <span>Light</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group relative flex h-12 min-w-[120px] items-center justify-center gap-2 overflow-hidden rounded-lg border border-border/40 bg-background/50 px-4 backdrop-blur-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative h-8 w-full">
        <PixelSwap
          firstContent={
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Moon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-semibold whitespace-nowrap">
                Dark
              </span>
            </div>
          }
          secondContent={
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Sun className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-semibold whitespace-nowrap">
                Light
              </span>
            </div>
          }
          pixelSize={18}
          gap={1}
          pixelRadius={10}
          pixelSpin={90}
          pixelScale={0.3}
          fade
          duration={700}
          pixelDuration={300}
          pattern="center"
          randomness={0.1}
          trigger="click"
          active={!isDark}
          aspectRatio="4 / 1"
          className="h-full"
        />
      </div>
    </button>
  )
}