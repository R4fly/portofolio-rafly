'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface GuitarString {
  id: number
  note: string
  isBroken: boolean
}

/**
 * Konfigurasi 6 senar gitar.
 * Senar #3 (G) adalah yang putus — sesuai blueprint.
 */
const GUITAR_STRINGS: GuitarString[] = [
  { id: 1, note: 'E', isBroken: false },
  { id: 2, note: 'B', isBroken: false },
  { id: 3, note: 'G', isBroken: true },
  { id: 4, note: 'D', isBroken: false },
  { id: 5, note: 'A', isBroken: false },
  { id: 6, note: 'E', isBroken: false },
]

/**
 * Komponen interaktif 6 senar gitar untuk halaman 404.
 * - Senar putus (#3) menampilkan animasi + error text
 * - Senar intact bergetar + play sound saat hover
 * - Audio graceful fallback jika file tidak tersedia
 */
export function GuitarStrings() {
  const [hoveredString, setHoveredString] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const snapAudioRef = useRef<HTMLAudioElement | null>(null)
  const pluckAudioRef = useRef<HTMLAudioElement | null>(null)

  // Load audio files dengan graceful fallback
  useEffect(() => {
    setIsMounted(true)

    const snapAudio = new Audio('/audio/string-snap.mp3')
    const pluckAudio = new Audio('/audio/string-pluck.mp3')

    snapAudio.preload = 'auto'
    pluckAudio.preload = 'auto'

    // Hanya set ref jika audio berhasil load (avoid error saat play)
    snapAudio.addEventListener(
      'canplaythrough',
      () => {
        snapAudioRef.current = snapAudio
        // Play snap sound sekali saat mount
        snapAudio.play().catch(() => {
          // Autoplay diblokir browser atau file tidak ada — silent fallback
        })
      },
      { once: true }
    )

    pluckAudio.addEventListener(
      'canplaythrough',
      () => {
        pluckAudioRef.current = pluckAudio
      },
      { once: true }
    )

    // Cleanup
    return () => {
      snapAudio.pause()
      pluckAudio.pause()
      snapAudio.src = ''
      pluckAudio.src = ''
    }
  }, [])

  const handleStringHover = useCallback((stringId: number): void => {
    setHoveredString(stringId)

    // Play pluck sound dengan reset position
    if (pluckAudioRef.current) {
      pluckAudioRef.current.currentTime = 0
      pluckAudioRef.current.play().catch(() => {
        // Silent fallback
      })
    }
  }, [])

  const handleStringLeave = useCallback((): void => {
    setHoveredString(null)
  }, [])

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-xl space-y-4 py-8 transition-opacity duration-500',
        isMounted ? 'opacity-100' : 'opacity-0'
      )}
      role="img"
      aria-label="Ilustrasi enam senar gitar, satu senar putus di tengah"
    >
      {GUITAR_STRINGS.map((string) => (
        <div
          key={string.id}
          className="group relative flex h-2 items-center"
          onMouseEnter={() => !string.isBroken && handleStringHover(string.id)}
          onMouseLeave={handleStringLeave}
        >
          {/* Label note di kiri */}
          <span className="mr-3 w-4 font-mono text-xs text-muted-foreground/50">
            {string.note}
          </span>

          {string.isBroken ? (
            // ===== BROKEN STRING =====
            <div className="relative flex w-full items-center">
              {/* Segmen kiri senar putus */}
              <div className="h-[2px] w-[42%] animate-pulse bg-primary/40" />

              {/* Gap putus dengan spark effect */}
              <div className="mx-2 flex items-center">
                <span className="h-2 w-2 animate-ping rounded-full bg-red-500/60" />
                <span className="absolute h-1 w-1 rounded-full bg-red-500" />
              </div>

              {/* Segmen kanan senar putus */}
              <div className="h-[2px] w-[42%] animate-pulse bg-primary/40" />

              {/* Error text di bawah senar putus */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-red-500 md:text-xs">
                404: Rhythm Not Found
              </div>
            </div>
          ) : (
            // ===== INTACT STRING =====
            <div
              className={cn(
                'h-[2px] w-full cursor-pointer bg-primary/50 transition-all duration-150',
                hoveredString === string.id &&
                  'h-[3px] scale-y-150 bg-primary shadow-[0_0_12px_rgba(34,211,238,0.5)]'
              )}
            />
          )}
        </div>
      ))}

      {/* Hint untuk hover interaction */}
      <p className="mt-8 text-center font-mono text-xs text-muted-foreground/40">
        sentuh senar yang masih utuh untuk memetiknya 🎸
      </p>
    </div>
  )
}