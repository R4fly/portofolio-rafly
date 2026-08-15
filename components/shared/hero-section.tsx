'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, Code2, Guitar, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient & decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 md:py-32">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 border-primary/30 bg-primary/5 text-primary px-4 py-1.5 text-sm font-medium"
        >
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Junior Full-Stack Developer & Gitaris
        </Badge>

        {/* Main headline */}
        <h1 className="max-w-4xl text-center font-sans text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Membangun Aplikasi Web dengan{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ritme Kode
          </span>{' '}
          yang Presisi
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-center text-base text-muted-foreground md:text-lg leading-relaxed">
          Memadukan ketepatan engineering dengan jiwa musik — menghasilkan aplikasi web
          yang cepat, aman, dan indah. Dari Yogyakarta untuk dunia digital.
        </p>

        {/* Dual CTA — Above the Fold */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
            asChild
          >
            <Link href="/#projects">
              <Code2 className="mr-2 h-5 w-5" />
              Lihat Proyek Web
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-secondary/50 text-secondary hover:bg-secondary/10 px-8 py-6 text-base transition-all duration-300 hover:-translate-y-0.5"
            asChild
          >
            <Link href="/#booking">
              <Calendar className="mr-2 h-5 w-5" />
              Jadwalkan Sesi
            </Link>
          </Button>
        </div>

        {/* Tech stack quick preview */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-primary" />
            Next.js
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-primary" />
            TypeScript
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4 text-primary" />
            Supabase
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Guitar className="h-4 w-4 text-secondary" />
            Blues & Rock
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}