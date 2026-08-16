'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ElasticSlider from './elastic-slider'
import { cn, formatTime } from '@/lib/utils'
import type { Track } from '@/types/database'
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  track: Track
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [duration, setDuration] = useState<number>(track.duration ?? 0)
  const [hasError, setHasError] = useState(false)
  const [volume, setVolume] = useState<number>(75)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'hsl(var(--muted-foreground) / 0.3)',
      progressColor: 'hsl(var(--secondary))',
      cursorColor: 'transparent',
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      height: 60,
      normalize: true,
      url: track.audio_url,
    })

    wavesurferRef.current = wavesurfer

    // Set initial volume
    wavesurfer.setVolume(volume / 100)

    wavesurfer.on('ready', () => {
      setIsReady(true)
      setDuration(wavesurfer.getDuration())
    })

    wavesurfer.on('error', (err: unknown) => {
      const errorMessage =
        err instanceof Error
          ? err.message
          : err instanceof MediaError
            ? `Media error code ${err.code}: ${err.message || 'Audio file gagal dimuat'}`
            : typeof err === 'string'
              ? err
              : 'Unknown audio error'

      console.warn(`[AudioPlayer] Track "${track.title}" gagal dimuat:`, errorMessage)

      setHasError(true)
      setIsReady(true)
      setDuration(track.duration ?? 30)
    })

    wavesurfer.on('play', () => setIsPlaying(true))
    wavesurfer.on('pause', () => setIsPlaying(false))
    wavesurfer.on('finish', () => setIsPlaying(false))

    return () => {
      wavesurfer.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.audio_url, track.duration, track.title])

  // Sync volume ke wavesurfer
  useEffect(() => {
    if (!wavesurferRef.current) return
    wavesurferRef.current.setVolume(isMuted ? 0 : volume / 100)
  }, [volume, isMuted])

  function togglePlay(): void {
    if (!wavesurferRef.current || hasError) return
    wavesurferRef.current.playPause()
  }

  function toggleMute(): void {
    setIsMuted((prev) => !prev)
  }

  return (
    <Card
      className={cn(
        'border-border/40 bg-card/50 backdrop-blur transition-all duration-300',
        'hover:border-secondary/30',
        hasError && 'opacity-60'
      )}
    >
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Play Button */}
          <Button
            size="icon"
            variant="secondary"
            onClick={togglePlay}
            disabled={!isReady || hasError}
            className="h-12 w-12 shrink-0 rounded-full bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
            aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 pl-0.5" />
            )}
          </Button>

          {/* Info + Waveform */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-sans text-base font-semibold text-foreground">
                  {track.title}
                </h3>
                {track.genre && (
                  <Badge variant="secondary" className="font-mono text-xs">
                    {track.genre}
                  </Badge>
                )}
                {hasError && (
                  <Badge
                    variant="outline"
                    className="font-mono text-xs text-destructive"
                  >
                    Audio unavailable
                  </Badge>
                )}
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>

            <div
              ref={containerRef}
              className={cn(
                'h-[60px] w-full',
                hasError && 'flex items-center justify-center bg-muted/30'
              )}
              aria-hidden="true"
            >
              {hasError && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span className="font-mono text-xs">
                    Audio file tidak kompatibel dengan browser
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Volume Control — ElasticSlider */}
          <div className="flex shrink-0 items-center gap-2 md:w-48">
            <button
              type="button"
              onClick={toggleMute}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <ElasticSlider
              defaultValue={volume}
              startingValue={0}
              maxValue={100}
              onChange={(v) => setVolume(v)}
              leftIcon={<span className="text-xs text-muted-foreground">−</span>}
              rightIcon={<span className="text-xs text-muted-foreground">+</span>}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}