'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, X } from 'lucide-react'
import { useCookieStore } from '@/lib/stores/cookie-store'

/**
 * Cookie Banner — GDPR/privacy compliant cookie consent.
 *
 * FIX TALOS AUDIT:
 * - Gunakan button elements untuk actions (bukan links)
 * - Proper aria-labels dan keyboard support
 * - Clear semantic structure
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { consent, setConsent } = useCookieStore()
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return (): void => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (consent === 'pending') {
      const timer = window.setTimeout(() => {
        if (mountedRef.current) {
          setIsVisible(true)
        }
      }, 2000)
      return (): void => {
        window.clearTimeout(timer)
      }
    } else {
      if (mountedRef.current) {
        setIsVisible(false)
      }
    }
  }, [consent])

  function handleAccept(): void {
    setConsent('accepted')
    setIsVisible(false)
  }

  function handleDecline(): void {
    setConsent('declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[45] p-3 md:bottom-4 md:left-auto md:right-4 md:max-w-sm md:p-0 safe-bottom"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <Card className="border-primary/30 bg-card/95 shadow-2xl backdrop-blur-xl">
        <CardContent className="p-4 md:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10" aria-hidden="true">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 id="cookie-title" className="font-sans text-sm font-semibold text-foreground">
                  Kami Menggunakan Cookie
                </h3>
                <p id="cookie-description" className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
              aria-label="Tutup banner cookie"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="w-full sm:w-auto"
              aria-label="Tolak penggunaan cookie"
            >
              Tolak
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAccept}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              aria-label="Terima semua cookie"
            >
              Terima Semua
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}