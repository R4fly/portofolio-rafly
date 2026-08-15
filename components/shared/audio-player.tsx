'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatTime } from '@/lib/utils'
import { parseWaveformData, generateSyntheticPeaks } from '@/lib/utils/waveform'
import { cn } from '@/lib/utils'
import type { Track } from '@/types/database'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  track: Track
  isActive: boolean
  onPlay: () => void
  onPause: () => void
  onFinish: () => void
}

export function AudioPlayer({
  track,
  isActive,
  onPlay,
  onPause,
  onFinish,
}: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(track.duration ?? 0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  // Initialize WaveSurfer
  useEffect(() => {
    if (!containerRef.current) return

    const waveformPeaks = parseWaveformData(track.waveform_data) ?? [generateSyntheticPeaks(100)]

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'rgba(34, 211, 238, 0.3)', // primary/30
      progressColor: '#22d3ee', // primary
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 60,
      normalize: true,
      peaks: waveformPeaks,
      duration: track.duration ?? undefined,
      url: track.audio_url,
    })

    wavesurferRef.current = wavesurfer

    wavesurfer.on('ready', () => {
      setIsReady(true)
      setDuration(wavesurfer.getDuration())
      wavesurfer.setVolume(volume)
    })

    wavesurfer.on('play', () => {
      setIsPlaying(true)
      onPlay()
    })

    wavesurfer.on('pause', () => {
      setIsPlaying(false)
      onPause()
    })

    wavesurfer.on('finish', () => {
      setIsPlaying(false)
      onFinish()
    })

    wavesurfer.on('timeupdate', (time: number) => {
      setCurrentTime(time)
    })

    wavesurfer.on('error', (err: unknown) => {
      const errorMessage = err instanceof Error
        ? err.message
        : err instanceof MediaError
          ? `Media error code ${err.code}: ${err.message || 'Audio file gagal dimuat'}`
          : typeof err === 'string'
            ? err
            : 'Unknown audio error'

      console.error(`[AudioPlayer] Gagal memuat track "${track.title}":`, errorMessage)
      console.warn(`[AudioPlayer] URL yang gagal: ${track.audio_url}`)
      
      // Fallback: tetap tampilkan card dengan synthetic waveform
      setIsReady(true)
      setDuration(track.duration ?? 30)
    })

    return () => {
      wavesurfer.destroy()
      wavesurferRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.id])

  // Pause when another track is active
  useEffect(() => {
    if (!isActive && isPlaying && wavesurferRef.current) {
      wavesurferRef.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  // Volume control
  useEffect(() => {
    if (wavesurferRef.current && isReady) {
      wavesurferRef.current.setVolume(isMuted ? 0 : volume)
    }
  }, [volume, isMuted, isReady])

  const togglePlay = useCallback(() => {
    if (!wavesurferRef.current || !isReady) return

    if (isPlaying) {
      wavesurferRef.current.pause()
    } else {
      wavesurferRef.current.play()
    }
  }, [isPlaying, isReady])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return (
    <div
      className={cn(
        'group rounded-xl border bg-card/50 p-4 md:p-5 backdrop-blur transition-all duration-300',
        isActive
          ? 'border-primary/50 shadow-lg shadow-primary/10'
          : 'border-border/40 hover:border-border'
      )}
    >
      {/* Header: Title & Genre */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-base font-semibold tracking-tight text-foreground truncate">
            {track.title}
          </h3>
          <p className="mt-0.5 text-xs font-mono text-muted-foreground">
            {track.genre ?? 'Unknown Genre'}
          </p>
        </div>
        {isActive && isPlaying && (
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="h-3 w-0.5 bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="h-4 w-0.5 bg-primary animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-0.5 bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="h-3 w-0.5 bg-primary animate-pulse" style={{ animationDelay: '450ms' }} />
          </div>
        )}
      </div>

      {/* Waveform */}
      <div className="relative mb-4">
        {!isReady && (
          <div className="h-[60px] flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            'w-full cursor-pointer transition-opacity',
            !isReady && 'opacity-0 absolute inset-0'
          )}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <Button
          size="icon"
          variant={isActive ? 'default' : 'outline'}
          className={cn(
            'h-10 w-10 shrink-0 rounded-full',
            isActive
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'border-border/60 hover:border-primary hover:text-primary'
          )}
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        {/* Time Display */}
        <div className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
          <span className={isActive ? 'text-foreground' : ''}>
            {formatTime(currentTime)}
          </span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Volume Control */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-primary cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}