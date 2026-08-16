'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCookieStore } from '@/lib/stores/cookie-store'
import { useEffect, useState } from 'react'

/**
 * Sticky Mobile CTA — Fixed bottom CTA button yang hanya tampil di mobile.
 *
 * FIX: Sekarang langsung link ke WhatsApp untuk respons cepat.
 */
export function StickyMobileCta() {
  const pathname = usePathname()
  const { hasConsent } = useCookieStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hiddenPaths = ['/login', '/dashboard']
  const isPageHidden = hiddenPaths.some((path) => pathname.startsWith(path))
  const isHidden = isPageHidden || !hasConsent()

  if (!mounted || isHidden) return null

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
        <a
          href="https://wa.me/6281228660551"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Chat via WhatsApp
        </a>
      </Button>
    </div>
  )
}