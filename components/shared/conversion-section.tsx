'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ContactForm } from '@/components/forms/contact-form'
import { BookingForm } from '@/components/forms/booking-form'
import { SectionHeader } from './section-header'
import ShinyText from './shiny-text'
import { MessageSquare, Calendar, Users, Clock, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabValue = 'contact' | 'booking'

/**
 * Conversion Section — Custom tab switcher.
 *
 * FIX LAYOUT: shadcn Tabs ternyata render TabsList & TabsContent side-by-side
 * di environment ini. Diganti dengan custom switcher berbasis useState yang
 * PASTI stack vertikal (tablist di atas, form di bawah, full-width).
 *
 * Accessibility: role="tablist"/"tab", aria-selected, aria-controls,
 * dan keyboard support native via <button>.
 */
export function ConversionSection() {
  const [activeTab, setActiveTab] = useState<TabValue>('contact')

  return (
    <section className="container px-5 py-14 md:py-24" id="contact">
      <SectionHeader
        eyebrow={
          <ShinyText
            text="GET IN TOUCH"
            color="hsl(199, 89%, 55%)"
            shineColor="#ffffff"
            speed={3}
            spread={120}
            direction="left"
            yoyo
            pauseOnHover
            className="font-mono text-xs font-semibold uppercase tracking-[0.15em] md:text-sm"
          />
        }
        title={
          <>
            Mari <span className="text-primary">Berkolaborasi</span>
          </>
        }
        description="Punya proyek web atau ingin kolaborasi musik? Kirim pesan langsung atau jadwalkan sesi konsultasi."
      />

      {/* Social Proof Badges */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Respons &lt; 24 jam
        </Badge>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Shield className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Konsultasi pertama gratis
        </Badge>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Users className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden="true" />
          10+ klien puas
        </Badge>
      </div>

      {/* Custom Tab Switcher — PASTI stack vertikal */}
      <div className="mx-auto w-full max-w-2xl">
        {/* Tablist */}
        <div
          role="tablist"
          aria-label="Pilih metode kontak"
          className="mb-6 grid h-12 w-full grid-cols-2 gap-1 rounded-lg bg-muted p-1"
        >
          <button
            type="button"
            role="tab"
            id="tab-contact"
            aria-selected={activeTab === 'contact'}
            aria-controls="panel-contact"
            onClick={() => setActiveTab('contact')}
            className={cn(
              'flex h-full items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors md:text-base',
              activeTab === 'contact'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Kirim Pesan
          </button>
          <button
            type="button"
            role="tab"
            id="tab-booking"
            aria-selected={activeTab === 'booking'}
            aria-controls="panel-booking"
            onClick={() => setActiveTab('booking')}
            className={cn(
              'flex h-full items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors md:text-base',
              activeTab === 'booking'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Jadwalkan Sesi
          </button>
        </div>

        {/* Panel: Contact Form */}
        {activeTab === 'contact' && (
          <div
            role="tabpanel"
            id="panel-contact"
            aria-labelledby="tab-contact"
            className="w-full"
          >
            <Card className="w-full border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="font-sans text-xl md:text-2xl">
                  Kirim Pesan
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Ceritakan kebutuhan Anda. Saya akan merespons dalam 24 jam.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Panel: Booking Form */}
        {activeTab === 'booking' && (
          <div
            role="tabpanel"
            id="panel-booking"
            aria-labelledby="tab-booking"
            className="w-full"
          >
            <Card className="w-full border-border/40 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="font-sans text-xl md:text-2xl">
                  Jadwalkan Sesi
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Pilih tanggal untuk konsultasi web atau sesi gitar.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <BookingForm />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}