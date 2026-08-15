'use client'

import { Code2, Music } from 'lucide-react'
import { JOURNEY_COLUMNS } from '@/lib/constants/journey'
import { TimelineItem } from './timeline-item'
import { cn } from '@/lib/utils'

export function JourneyTimeline() {
  return (
    <section className="container py-16 md:py-24" id="journey">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Dua Ritme, <span className="text-primary">Satu</span>{' '}
          <span className="text-secondary">Perjalanan</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Evolusi paralel antara disiplin coding dan ekspresi musik — keduanya
          saling membentuk cara saya berkarya.
        </p>
      </div>

      {/* Dual Timeline Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {JOURNEY_COLUMNS.map((column) => {
          const isPrimary = column.accentColor === 'primary'
          const HeaderIcon = isPrimary ? Code2 : Music

          return (
            <div key={column.id}>
              {/* Column Header */}
              <div className="mb-8 flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl border',
                    isPrimary
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-secondary/30 bg-secondary/10 text-secondary'
                  )}
                >
                  <HeaderIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold tracking-tight">
                    {column.label}
                  </h3>
                  <p
                    className={cn(
                      'font-mono text-xs uppercase tracking-wider',
                      isPrimary ? 'text-primary' : 'text-secondary'
                    )}
                  >
                    {column.tagline}
                  </p>
                </div>
              </div>

              {/* Timeline Items */}
              <div>
                {column.items.map((item, index) => (
                  <TimelineItem
                    key={`${column.id}-${item.year}`}
                    item={item}
                    accentColor={column.accentColor}
                    index={index}
                    isLast={index === column.items.length - 1}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}