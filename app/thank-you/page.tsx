import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Home, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terima Kasih',
  description:
    'Pesan atau booking Anda telah berhasil dikirim. Rafly akan merespons secepatnya.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-20">
      <Card className="w-full max-w-lg border-border/40 bg-card/50 backdrop-blur text-center">
        <CardContent className="pt-12 pb-10 px-6 md:px-10">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="mb-3 font-sans text-3xl font-bold tracking-tight">
            Terima Kasih!
          </h1>

          {/* Message */}
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Pesan atau jadwal sesi Anda telah berhasil dikirim. Saya akan merespons
            melalui email dalam waktu <span className="font-semibold text-foreground">24 jam</span>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border/60 hover:bg-accent"
            >
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Masuk Client Portal
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}