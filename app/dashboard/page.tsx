import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, MessageCircle, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard Overview',
  description: 'Ringkasan aktivitas dan proyek Anda di Client Portal.',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-sans text-3xl font-bold tracking-tight md:text-4xl">
            <LayoutDashboard className="mr-2 inline-block h-8 w-8 text-primary" />
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Selamat datang di Client Portal Anda.
          </p>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
            <CardDescription>Komunikasi realtime dengan developer</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard/chat">Buka Chat</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-secondary" />
              Booking Saya
            </CardTitle>
            <CardDescription>Lihat jadwal sesi yang Anda pesan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/bookings">Lihat Booking</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              Proyek Aktif
            </CardTitle>
            <CardDescription>Progress proyek yang sedang dikerjakan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Segera Hadir
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}