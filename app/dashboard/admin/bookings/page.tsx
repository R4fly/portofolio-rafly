'use client'

import { useState } from 'react'
import { useAllBookingsAdmin, useUpdateBookingStatus } from '@/lib/queries/admin-bookings'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate, cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Calendar,
  Code2,
  Music,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Loader2,
} from 'lucide-react'

type FilterTab = 'all' | 'pending' | 'confirmed' | 'cancelled'

export default function AdminBookingsPage() {
  const { data: bookings, isLoading, isError } = useAllBookingsAdmin()
  const updateStatusMutation = useUpdateBookingStatus()
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const filteredBookings = bookings?.filter((booking) => {
    if (activeTab === 'all') return true
    return booking.status === activeTab
  })

  const pendingCount = bookings?.filter((b) => b.status === 'pending').length ?? 0

  function handleStatusChange(id: string, status: 'confirmed' | 'cancelled'): void {
    updateStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast.success(
            status === 'confirmed'
              ? 'Booking dikonfirmasi.'
              : 'Booking dibatalkan.'
          )
        },
        onError: (error: Error) => {
          toast.error(`Gagal mengubah status: ${error.message}`)
        },
      }
    )
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-sans text-2xl font-bold tracking-tight">
          Kelola Bookings
        </h2>
        <p className="mt-1 text-muted-foreground">
          Konfirmasi atau batalkan sesi konsultasi dan kolaborasi musik.
        </p>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              Gagal memuat bookings. Silakan refresh halaman.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as FilterTab)}
      >
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-border/40 bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredBookings && filteredBookings.length === 0 && (
            <Card className="border-dashed border-border/40 bg-card/30">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <Calendar className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Tidak ada booking di kategori ini</p>
                <p className="text-sm text-muted-foreground">
                  Booking baru akan muncul di sini saat klien menjadwalkan sesi.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Bookings List */}
          {!isLoading && filteredBookings && filteredBookings.length > 0 && (
            <div className="space-y-3">
              {filteredBookings.map((booking) => {
                const isWebConsultation = booking.booking_type === 'web_consultation'
                const TypeIcon = isWebConsultation ? Code2 : Music
                const status = statusConfig[booking.status]
                const StatusIcon = status.icon

                return (
                  <Card
                    key={booking.id}
                    className={cn(
                      'border-border/40 bg-card/50',
                      booking.status === 'pending' && 'border-l-4 border-l-yellow-500'
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        {/* Booking Info */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <div
                              className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg',
                                isWebConsultation ? 'bg-primary/10' : 'bg-secondary/10'
                              )}
                            >
                              <TypeIcon
                                className={cn(
                                  'h-4 w-4',
                                  isWebConsultation ? 'text-primary' : 'text-secondary'
                                )}
                              />
                            </div>
                            <span className="font-semibold">
                              {booking.client_name}
                            </span>
                            <Badge
                              variant="secondary"
                              className={cn('text-xs font-medium', status.color)}
                            >
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5" />
                              {booking.client_email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(booking.scheduled_at)} •{' '}
                              {new Date(booking.scheduled_at).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            <p className="font-mono text-xs">
                              {isWebConsultation ? 'Konsultasi Web' : 'Sesi Gitar'}
                            </p>
                          </div>
                          {booking.notes && (
                            <div className="mt-2 rounded-md bg-muted/50 p-2">
                              <p className="text-xs text-muted-foreground">
                                <strong>Catatan:</strong> {booking.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons — hanya untuk pending */}
                        {booking.status === 'pending' && (
                          <div className="flex shrink-0 gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              disabled={updateStatusMutation.isPending}
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              {updateStatusMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle2 className="mr-1 h-4 w-4" />
                                  Konfirmasi
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              disabled={updateStatusMutation.isPending}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Batalkan
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}