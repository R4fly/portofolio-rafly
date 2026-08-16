'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { BookingForm } from '@/components/forms/booking-form'
import { SectionHeader } from './section-header'
import ShinyText from './shiny-text'
import { MessageSquare, Calendar } from 'lucide-react'

export function ConversionSection() {
  return (
    <section className="container py-16 md:py-24" id="contact">
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
            className="font-mono text-sm font-medium uppercase tracking-widest"
          />
        }
        title={
          <>
            Mari <span className="text-primary">Berkolaborasi</span>
          </>
        }
        description="Punya proyek web atau ingin kolaborasi musik? Kirim pesan langsung atau jadwalkan sesi konsultasi."
      />

      {/* Tabs: Contact / Booking */}
      <div className="mx-auto max-w-2xl">
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="mb-8 grid h-12 w-full grid-cols-2">
            <TabsTrigger value="contact" className="text-sm font-medium">
              <MessageSquare className="mr-2 h-4 w-4" />
              Kirim Pesan
            </TabsTrigger>
            <TabsTrigger value="booking" className="text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Jadwalkan Sesi
            </TabsTrigger>
          </TabsList>

          {/* Tab: Contact Form */}
          <TabsContent value="contact">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-sans text-xl">Kirim Pesan</CardTitle>
                <CardDescription>
                  Ceritakan kebutuhan Anda. Saya akan merespons dalam 24 jam.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Booking Form */}
          <TabsContent value="booking">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-sans text-xl">Jadwalkan Sesi</CardTitle>
                <CardDescription>
                  Pilih tanggal untuk konsultasi web atau sesi gitar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}