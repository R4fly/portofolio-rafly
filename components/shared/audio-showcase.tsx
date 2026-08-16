'use client'

import { useTracks } from '@/lib/queries/tracks'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { AudioPlayer } from './audio-player'
import { Music } from 'lucide-react'

export function AudioShowcase() {
  const { data: tracks, isLoading, isError } = useTracks()

  return (
    <section className="container py-16 md:py-24" id="audio">
      <SectionHeader
        eyebrow="Audio Showcase"
        title={
          <>
            Ritme dari <span className="text-secondary">Jari ke Senar</span>
          </>
        }
        description="Rekaman gitar blues, rock, dan jazz fusion — sisi lain dari saya yang tak terlihat di layar kode."
      />

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-destructive">
              Gagal memuat tracks. Silakan refresh halaman.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && tracks && tracks.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Music className="mb-3 h-12 w-12 text-muted-foreground" />
            <p className="font-medium">Belum ada track</p>
            <p className="text-sm text-muted-foreground">
              Track audio akan muncul di sini setelah ditambahkan.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracks List */}
      {!isLoading && tracks && tracks.length > 0 && (
        <div className="space-y-4">
          {tracks.map((track) => (
            <AudioPlayer key={track.id} track={track} />
          ))}
        </div>
      )}
    </section>
  )
}