'use client'

import { useTracks } from '@/lib/queries/tracks'
import type { Track } from '@/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { AudioPlayer } from './audio-player'
import { QueryErrorState } from './query-error-state'
import { useLoadingTimeout } from './query-loading-timeout'
import { Music } from 'lucide-react'

export function AudioShowcase() {
  const { data: tracks, isLoading, isError, isFetching, refetch } = useTracks()
  const loadingTimedOut = useLoadingTimeout(isLoading)
  const showError = isError || loadingTimedOut

  // Type guard
  const trackList: Track[] = Array.isArray(tracks) ? tracks : []

  return (
    <section className="container px-5 py-14 md:py-24" id="audio">
      <SectionHeader
        eyebrow="Audio Showcase"
        title={
          <>
            Petikan <span className="text-secondary">Gitar</span> Saya
          </>
        }
        description="Koleksi rekaman blues & rock yang saya mainkan."
      />

      {/* Loading State */}
      {isLoading && !showError && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {showError && !isLoading && (
        <QueryErrorState
          title="Audio gagal dimuat"
          message="Tidak bisa memuat daftar track. Klik 'Coba Lagi' untuk refresh."
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      )}

      {/* Empty State */}
      {!isLoading && !showError && trackList.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Music className="mb-3 h-12 w-12 text-muted-foreground" />
            <p className="font-medium">Belum ada audio</p>
            <p className="text-sm text-muted-foreground">
              Audio akan muncul di sini setelah ditambahkan.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {!isLoading && !showError && trackList.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {trackList.map((track: Track) => (
            <AudioPlayer key={track.id} track={track} />
          ))}
        </div>
      )}
    </section>
  )
}