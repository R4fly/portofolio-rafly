'use client'

import { useGuestbook, type GuestbookEntry } from '@/lib/queries/guestbook'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { GuestbookForm } from '@/components/forms/guestbook-form'
import { QueryErrorState } from './query-error-state'
import { useLoadingTimeout } from './query-loading-timeout'
import { MessageCircle, Quote } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export function RealtimeGuestbook() {
  const { data: entries, isLoading, isError, isFetching, refetch } = useGuestbook()
  const loadingTimedOut = useLoadingTimeout(isLoading)
  const showError = isError || loadingTimedOut

  return (
    <section className="container px-5 py-14 md:py-24" id="guestbook">
      <SectionHeader
        eyebrow="Guestbook"
        title={
          <>
            Tinggalkan <span className="text-primary">Jejak</span> Anda
          </>
        }
        description="Tulis pesan, kesan, atau pertanyaan. Semua pesan akan saya baca dan balas."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form (selalu render) */}
        <div>
          <Card className="border-border/40 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-sans text-xl">
                <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                Tulis Pesan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GuestbookForm />
            </CardContent>
          </Card>
        </div>

        {/* Entries List */}
        <div>
          {/* Loading State */}
          {isLoading && !showError && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-border/40 bg-card/50">
                  <CardContent className="space-y-2 pt-5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {showError && !isLoading && (
            <QueryErrorState
              title="Guestbook gagal dimuat"
              message="Pesan Anda tetap bisa dikirim. Klik 'Coba Lagi' untuk lihat pesan lain."
              onRetry={() => refetch()}
              isRetrying={isFetching}
            />
          )}

          {/* Empty State */}
          {!isLoading && !showError && Array.isArray(entries) && entries.length === 0 && (
            <Card className="border-dashed border-border/40 bg-card/30">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <Quote className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Belum ada pesan</p>
                <p className="text-sm text-muted-foreground">
                  Jadilah yang pertama menulis di guestbook ini!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {!isLoading && !showError && Array.isArray(entries) && entries.length > 0 && (
            <div className="space-y-4">
              {entries.slice(0, 10).map((entry: GuestbookEntry) => (
                <Card
                  key={entry.id}
                  className="border-border/40 bg-card/50 backdrop-blur transition-colors hover:border-primary/30"
                >
                  <CardContent className="pt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-foreground">{entry.name}</p>
                      <time className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(entry.created_at), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </time>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {entry.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}