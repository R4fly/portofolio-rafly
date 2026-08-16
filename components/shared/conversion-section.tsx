'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

/**
 * Conversion Section — FIX UI/UX AUDIT: "Conversion Clarity High Risk"
 *
 * Perubahan:
 * - Social proof badges di atas form (lebih visible, build trust)
 * - CTA lebih prominent
 * - Section spacing lebih lega di mobile
 */
export function ConversionSection() {
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

      {/* Social Proof Badges — FIX: Moved above form untuk build trust */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
          Respons &lt; 24 jam
        </Badge>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Shield className="mr-1.5 h-3.5 w-3.5 text-primary" />
          Konsultasi pertama gratis
        </Badge>
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground md:text-sm"
        >
          <Users className="mr-1.5 h-3.5 w-3.5 text-primary" />
          10+ klien puas
        </Badge>
      </div>

      {/* Tabs: Contact / Booking */}
      <div className="mx-auto max-w-2xl">
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="mb-6 grid h-12 w-full grid-cols-2 md:mb-8">
            <TabsTrigger value="contact" className="text-sm font-medium md:text-base">
              <MessageSquare className="mr-2 h-4 w-4" />
              Kirim Pesan
            </TabsTrigger>
            <TabsTrigger value="booking" className="text-sm font-medium md:text-base">
              <Calendar className="mr-2 h-4 w-4" />
              Jadwalkan Sesi
            </TabsTrigger>
          </TabsList>

          {/* Tab: Contact Form */}
          <TabsContent value="contact">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
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
          </TabsContent>

          {/* Tab: Booking Form */}
          <TabsContent value="booking">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}