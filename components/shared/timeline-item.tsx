'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { JourneyItem } from '@/lib/constants/journey'

interface TimelineItemProps {
  item: JourneyItem
  accentColor: 'primary' | 'secondary'
  index: number
  isLast: boolean
}

export function TimelineItem({ item, accentColor, index, isLast }: TimelineItemProps) {
  const Icon = item.icon
  const isPrimary = accentColor === 'primary'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative pb-8 pl-12 last:pb-0"
    >
      {/* Garis vertikal penghubung */}
      {!isLast && (
        <span
          className={cn(
            'absolute bottom-0 left-[19px] top-11 w-px',
            isPrimary ? 'bg-primary/20' : 'bg-secondary/20'
          )}
          aria-hidden="true"
        />
      )}

      {/* Node icon */}
      <div
        className={cn(
          'absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110',
          isPrimary
            ? 'border-primary/40 bg-primary/10 text-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/25'
            : 'border-secondary/40 bg-secondary/10 text-secondary group-hover:border-secondary group-hover:shadow-lg group-hover:shadow-secondary/25'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Konten card */}
      <div
        className={cn(
          'rounded-xl border bg-card/50 p-4 backdrop-blur transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-lg',
          isPrimary
            ? 'border-border/40 hover:border-primary/50 hover:shadow-primary/10'
            : 'border-border/40 hover:border-secondary/50 hover:shadow-secondary/10'
        )}
      >
        <div className="mb-2">
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-xs',
              isPrimary
                ? 'border-primary/30 text-primary'
                : 'border-secondary/30 text-secondary'
            )}
          >
            {item.year}
          </Badge>
        </div>
        <h4 className="mb-1.5 font-sans text-base font-semibold tracking-tight text-foreground">
          {item.title}
        </h4>
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-2 py-0.5 font-mono text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}