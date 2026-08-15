'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { BookingForm } from '@/components/forms/booking-form'
import { MessageSquare, Calendar } from 'lucide-react'

export function ConversionSection() {
  return (
    <section className="container py-16 md:py-24" id="contact">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Mari <span className="text-primary">Berkolaborasi</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Punya proyek web atau ingin kolaborasi musik? Kirim pesan langsung atau
          jadwalkan sesi konsultasi.
        </p>
      </div>

      {/* Tabs: Contact / Booking */}
      <div className="mx-auto max-w-2xl">
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
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