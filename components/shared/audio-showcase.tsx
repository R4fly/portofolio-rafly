'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useTracks } from '@/lib/queries/tracks'
import { Skeleton } from '@/components/ui/skeleton'
import { Music, Headphones } from 'lucide-react'
// Lazy load AudioPlayer karena WaveSurfer.js besar dan tidak support SSR
const AudioPlayer = dynamic(
  () => import('@/components/shared/audio-player').then((mod) => mod.AudioPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-border/40 bg-card/50 p-5">
        <Skeleton className="mb-3 h-5 w-40" />
        <Skeleton className="mb-3 h-1 w-20" />
        <Skeleton className="mb-4 h-[60px] w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    ),
  }
)

export function AudioShowcase() {
  const { data: tracks, isLoading, isError } = useTracks()
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null)

  const handlePlay = (trackId: string): void => {
    setActiveTrackId(trackId)
  }

  const handlePause = (): void => {
    // Tetap biarkan activeTrackId agar UI menunjukkan track terakhir
  }

  const handleFinish = (): void => {
    // Auto-play track berikutnya
    if (!tracks || tracks.length === 0) return
    
    const currentIndex = tracks.findIndex((t) => t.id === activeTrackId)
    const nextIndex = (currentIndex + 1) % tracks.length
    setActiveTrackId(tracks[nextIndex].id)
  }

  return (
    <section className="container py-16 md:py-24" id="audio">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5">
          <Headphones className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">Audio Showcase</span>
        </div>
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Ritme dari <span className="text-secondary">Jari ke Senar</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Koleksi rekaman gitar dari sesi latihan dan jam session.
          Dari blues klasik hingga jazz fusion.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/40 bg-card/50 p-5"
            >
              <Skeleton className="mb-3 h-5 w-40" />
              <Skeleton className="mb-3 h-1 w-20" />
              <Skeleton className="mb-4 h-[60px] w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <Music className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Gagal memuat track audio. Silakan refresh halaman.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tracks && tracks.length === 0 && (
        <div className="text-center py-12">
          <Music className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum Ada Track</h3>
          <p className="text-sm text-muted-foreground">
            Koleksi rekaman gitar akan segera ditambahkan. Stay tuned!
          </p>
        </div>
      )}

      {/* Track List Grid */}
      {!isLoading && tracks && tracks.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <AudioPlayer
              key={track.id}
              track={track}
              isActive={activeTrackId === track.id}
              onPlay={() => handlePlay(track.id)}
              onPause={handlePause}
              onFinish={handleFinish}
            />
          ))}
        </div>
      )}

      {/* Info Note */}
      {!isLoading && tracks && tracks.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            💡 Tip: Gunakan scroll wheel pada volume slider untuk kontrol lebih presisi
          </p>
        </div>
      )}
    </section>
  )
}