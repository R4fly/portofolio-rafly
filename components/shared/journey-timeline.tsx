'use client'

import { Code2, Music } from 'lucide-react'
import { JOURNEY_COLUMNS } from '@/lib/constants/journey'
import { TimelineItem } from './timeline-item'
import { cn } from '@/lib/utils'

/**
 * Journey Timeline — Dual column (Programming + Guitar).
 *
 * FIX VISIBILITY: MaskedHeading menampilkan gambar gelap DI DALAM huruf,
 * sehingga heading TIDAK TERBACA di dark mode. Diganti dengan heading
 * standar yang konsisten dengan section lain (readable di semua theme).
 */
export function JourneyTimeline() {
  return (
    <section className="container px-5 py-14 md:py-24" id="journey">
      {/* Section Header — readable & konsisten */}
      <div className="mb-10 text-center md:mb-16">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-primary md:text-sm">
          Journey
        </p>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          Dua Ritme, <span className="text-primary">Satu</span>{' '}
          <span className="text-secondary">Perjalanan</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-4 md:text-lg">
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
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border',
                    isPrimary
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-secondary/30 bg-secondary/10 text-secondary'
                  )}
                >
                  <HeaderIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
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