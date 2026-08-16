import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: ReactNode  // Changed from string to ReactNode
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  className?: string
}

/**
 * Header section standar untuk konsistensi visual di seluruh halaman.
 * - Eyebrow: label kecil monospace (bisa string ATAU React element seperti ShinyText)
 * - Title: heading besar dengan hierarki jelas
 * - Description: supporting text dengan kontras AA
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
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-muted-foreground md:text-lg',
            align === 'center' && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}