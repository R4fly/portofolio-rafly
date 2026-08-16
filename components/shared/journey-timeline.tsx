'use client'

import dynamic from 'next/dynamic'
import { Code2, Music } from 'lucide-react'
import { JOURNEY_COLUMNS } from '@/lib/constants/journey'
import { TimelineItem } from './timeline-item'
import { cn } from '@/lib/utils'

// Lazy load MaskedHeading (GSAP dependency ~50KB)
const MaskedHeading = dynamic(() => import('./masked-heading'), {
  ssr: false,
  loading: () => (
    <h2 className="text-center font-sans text-3xl font-bold tracking-tight md:text-4xl">
      Dua Ritme, Satu Perjalanan
    </h2>
  ),
})

export function JourneyTimeline() {
  return (
    <section className="container py-16 md:py-24" id="journey">
      {/* Masked Heading with code/guitar imagery through text */}
      <div className="mb-12 md:mb-16">
        <p className="mb-3 text-center font-mono text-sm font-medium uppercase tracking-widest text-primary">
          Journey
        </p>
        <MaskedHeading
          text="Dua Ritme Satu Perjalanan"
          tag="h2"
          mediaType="image"
          src="https://images.unsplash.com/photo-1511376777868-611b54f68947?w=1920&q=80&auto=format&fit=crop"
          fillScale={1.3}
          parallax={30}
          drift={15}
          brightness={0.85}
          saturation={1.1}
          reveal="rise"
          trigger="view"
          duration={1.2}
          stagger={0.1}
          align="center"
          weight={800}
          tracking={-0.02}
          lineHeight={1.05}
          textScale={0.13}
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
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