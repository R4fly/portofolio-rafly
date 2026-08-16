'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Sticky Mobile CTA — Fixed bottom CTA button yang hanya tampil di mobile.
 *
 * Hidden di:
 * - Halaman login (user sedang fokus ke form)
 * - Halaman dashboard (sudah dalam portal client)
 * - Desktop (width >= 768px)
 *
 * Accessibility: respects safe-area-inset untuk iPhone notch
 */
export function StickyMobileCta() {
  const pathname = usePathname()

  // Hide di halaman yang tidak perlu CTA floating
  const hiddenPaths = ['/login', '/dashboard']
  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path))

  if (isHidden) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/95 p-3 backdrop-blur-xl',
        'md:hidden', // Hidden di desktop
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