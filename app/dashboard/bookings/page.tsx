'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUserBookings } from '@/lib/queries/bookings'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import {
  Calendar,
  Clock,
  Code2,
  Music,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react'

// Metadata dipindahkan ke parent layout atau di-handle via generateMetadata
// karena 'use client' component tidak bisa export metadata secara langsung
export default function BookingsPage() {
  const { data: bookings, isLoading, isError } = useUserBookings()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          <Calendar className="mr-2 inline-block h-8 w-8 text-primary" />
          Booking Saya
        </h1>
        <p className="text-muted-foreground">
          Lihat semua jadwal sesi konsultasi web dan kolaborasi musik yang Anda pesan.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardHeader>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">
                Gagal memuat booking. Silakan refresh halaman.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && bookings && bookings.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">Belum Ada Booking</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Anda belum menjadwalkan sesi konsultasi atau kolaborasi musik.
            </p>
            <Button asChild>
              <a href="/#booking">Jadwalkan Sesi Sekarang</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bookings Grid */}
      {!isLoading && bookings && bookings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const isWebConsultation = booking.booking_type === 'web_consultation'
            const Icon = isWebConsultation ? Code2 : Music
            const iconColor = isWebConsultation ? 'text-primary' : 'text-secondary'

            const statusConfig = {
              pending: {
                label: 'Pending',
                icon: Clock,
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
              },
              confirmed: {
                label: 'Confirmed',
                icon: CheckCircle2,
                color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
              },
              cancelled: {
                label: 'Cancelled',
                icon: XCircle,
                color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
              },
            }

            const status = statusConfig[booking.status]
            const StatusIcon = status.icon

            return (
              <Card
                key={booking.id}
                className="border-border/40 bg-card/50 backdrop-blur transition-all hover:border-primary/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          isWebConsultation ? 'bg-primary/10' : 'bg-secondary/10'
                        )}
                      >
                        <Icon className={cn('h-5 w-5', iconColor)} />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {isWebConsultation ? 'Konsultasi Web' : 'Sesi Gitar'}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {booking.client_name}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn('text-xs font-medium', status.color)}
                    >
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(booking.scheduled_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(booking.scheduled_at).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {booking.notes && (
                    <div className="mt-3 rounded-md bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        <strong>Catatan:</strong> {booking.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}