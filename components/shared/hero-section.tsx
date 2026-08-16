'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SpecularButtonWrapper } from './specular-button-wrapper'
import RotatingText from './rotating-text'
import { CalendarCheck, Code2, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const ROTATING_ADJECTIVES = ['cepat.', 'presisi.', 'elegan.', 'modern.', 'handal.']

/**
 * Hero Section — Mobile-focused (1 message + 1 CTA)
 *
 * FIX LIGHT MODE:
 * - Semua text pakai text-foreground (auto-contrast di light/dark)
 * - Hindari text-white kecuali di atas background gelap
 * - Trust microcopy pakai text-muted-foreground (lebih visible di light mode)
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background gradient glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative z-10 container flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col items-center justify-center px-5 py-12 text-center md:py-24">
        {/* 1. Badge konteks */}
        <Badge
          variant="outline"
          className="mb-6 border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
          Junior Web Developer & Gitaris — Yogyakarta
        </Badge>

        {/* 2. Headline */}
        <h1
          id="hero-heading"
          className="max-w-4xl font-sans text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground drop-shadow-sm sm:text-5xl md:text-6xl"
        >
          Saya membangun web yang{' '}
          <RotatingText
            texts={ROTATING_ADJECTIVES}
            mainClassName="inline-flex overflow-hidden px-3 py-1 mx-1 align-baseline bg-gradient-to-r from-primary to-secondary text-background rounded-lg"
            staggerFrom="last"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-120%', opacity: 0 }}
            staggerDuration={0.03}
            splitLevelClassName="overflow-hidden"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Seperti ritme musik yang presisi.
          </span>
        </h1>

        {/* 3. Subtitle — FIX: pakai text-foreground/90 (lebih visible di light mode) */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 drop-shadow-sm md:text-lg">
          Junior Web Developer spesialis Next.js, TypeScript & Supabase —
          sekaligus gitaris blues/rock. Lihat karya saya, atau jadwalkan
          konsultasi gratis.
        </p>

        {/* 4. CTA */}
        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <SpecularButtonWrapper
            variant="primary"
            showArrow
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Lihat Proyek Saya
          </SpecularButtonWrapper>

          <Button
            size="lg"
            variant="outline"
            className="hidden h-12 px-8 backdrop-blur-sm sm:inline-flex"
            onClick={() => {
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label="Jadwalkan konsultasi - scroll ke bagian booking"
          >
            <CalendarCheck className="mr-2 h-5 w-5" aria-hidden="true" />
            Jadwalkan Konsultasi
          </Button>
        </div>

        {/* 5. Trust microcopy — FIX: pakai text-muted-foreground (lebih visible di light mode) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
            Respons &lt; 24 jam
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Konsultasi gratis
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
            SMK Negeri 2 Yogyakarta
          </span>
        </div>
      </div>
    </section>
  )
}