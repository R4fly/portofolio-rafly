'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

/**
 * Sticky Mobile CTA — Fixed bottom CTA button yang hanya tampil di mobile.
 *
 * Hidden di:
 * - Halaman login (user sedang fokus ke form)
 * - Halaman dashboard (sudah dalam portal client)
 * - Desktop (width >= 768px)
 * - Saat Cookie Banner visible (hindari overlap)
 *
 * Strategi anti-overlap dengan Cookie Banner:
 * - Poll localStorage setiap 500ms untuk cek cookie-consent
 * - Jika belum ada consent, sembunyikan Mobile CTA
 * - Jika sudah ada consent, tampilkan Mobile CTA
 *
 * Accessibility: respects safe-area-inset untuk iPhone notch
 */
export function StickyMobileCta() {
  const pathname = usePathname()
  const [hasConsent, setHasConsent] = useState(false)

  // Poll localStorage untuk cek cookie consent
  useEffect(() => {
    function checkConsent(): void {
      const consent = localStorage.getItem('cookie-consent')
      setHasConsent(!!consent)
    }

    checkConsent() // Initial check

    const interval = window.setInterval(checkConsent, 500)
    return (): void => {
      window.clearInterval(interval)
    }
  }, [])

  // Hide di halaman yang tidak perlu CTA floating
  const hiddenPaths = ['/login', '/dashboard']
  const isPageHidden = hiddenPaths.some((path) => pathname.startsWith(path))

  // Hide jika belum ada cookie consent (banner masih visible)
  const isHidden = isPageHidden || !hasConsent

  if (isHidden) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/95 p-3 backdrop-blur-xl',
        'md:hidden',
        'safe-bottom'
      )}
    >
      <Button
        asChild
        size="lg"
        className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
      >
        <Link href="/#contact">
          <MessageCircle className="mr-2 h-5 w-5" />
          Hubungi Saya Sekarang
        </Link>
      </Button>
    </div>
  )
}