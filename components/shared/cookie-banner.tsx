'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, X } from 'lucide-react'

/**
 * Cookie Banner — GDPR/privacy compliant cookie consent.
 *
 * Strategi positioning:
 * - Desktop: bottom-right corner
 * - Mobile: bottom-full-width, di ATAS Sticky Mobile CTA
 * - Z-index: 45 (di bawah modal 50, di atas sticky CTA 40)
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Delay 2 detik agar tidak muncul terlalu agresif
      const timer = window.setTimeout(() => setIsVisible(true), 2000)
      return (): void => {
        window.clearTimeout(timer)
      }
    }
  }, [])

  function handleAccept(): void {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  function handleDecline(): void {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[45] p-3 md:bottom-4 md:left-auto md:right-4 md:max-w-sm md:p-0 safe-bottom">
      <Card className="border-primary/30 bg-card/95 shadow-2xl backdrop-blur-xl">
        <CardContent className="p-4 md:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  Kami Menggunakan Cookie
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Untuk meningkatkan pengalaman Anda dan menganalisis traffic.{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    Pelajari lebih lanjut
                  </Link>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDecline}
              className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Tutup banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="w-full sm:w-auto"
            >
              Tolak
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              Terima Semua
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}