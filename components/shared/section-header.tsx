import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  className?: string
}

/**
 * Header section standar untuk konsistensi visual di seluruh halaman.
 *
 * FIX UI/UX AUDIT:
 * - Mobile: margin-bottom 40px (was 48px) untuk kurangi vertikal space
 * - Desktop: margin-bottom 64px untuk breathing room
 * - Title mobile: lebih compact
 * - Description mobile: text-base (readable), line-height 1.6
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary md:text-sm">
          {eyebrow}
        </div>
      )}
      <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 text-base leading-relaxed text-muted-foreground md:mt-4 md:text-lg',
            align === 'center' && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}