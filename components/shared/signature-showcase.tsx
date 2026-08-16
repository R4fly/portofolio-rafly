'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GradientText from './gradient-text'
import { ArrowRight, Code2, Music2 } from 'lucide-react'

const ScrollExpand = dynamic(() => import('./scroll-expand'), {
  ssr: false,
  loading: () => (
    <div className="h-[140vh] w-full bg-muted/20" aria-hidden="true" />
  ),
})

/**
 * Signature Showcase — ScrollExpand full-bleed section.
 *
 * FIX VISIBILITY: Tombol "Lihat Karya Saya" sebelumnya pakai
 * text-foreground (putih di dark mode) di atas bg-white = TIDAK KELIHATAN.
 * Sekarang pakai text-zinc-900 (gelap permanen) di atas putih.
 */
export function SignatureShowcase() {
  const IMAGE_URL =
    'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=1920&q=80&auto=format&fit=crop'

  return (
    <section className="relative w-full" aria-label="Signature Showcase">
      <div className="h-[140vh] w-full">
        <ScrollExpand
          src={IMAGE_URL}
          alt="Rafly Baehaqi — Developer & Gitaris"
          title="Code. Chord. Craft."
          scrollHint="↓ scroll to expand"
          startWidth={60}
          startHeight={55}
          startRadius={32}
          endRadius={0}
          mediaZoom={1.2}
          scrollDistance={1}
          holdDistance={0.4}
          smoothing={0.12}
          overlayScrim={0.65}
          useWindowScroll
        >
          <div className="max-w-2xl space-y-6 text-white">
            <div className="flex justify-center gap-2">
              <Badge
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm"
              >
                <Code2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Next.js Specialist
              </Badge>
              <Badge
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm"
              >
                <Music2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                Blues Guitarist
              </Badge>
            </div>

            <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              <GradientText
                colors={['#ffffff', '#22d3ee', '#fbbf24', '#ffffff']}
                animationSpeed={6}
                showBorder={false}
                direction="horizontal"
                yoyo
                className="inline-block"
              >
                Dua dunia, satu visi:
              </GradientText>
              <span className="block text-white/90">
                membuat karya yang bermakna.
              </span>
            </h2>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Dari baris TypeScript hingga petikan gitar — setiap proyek
              dibangun dengan disiplin, intuisi, dan perhatian pada detail
              yang sama.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              {/* FIX: text-zinc-900 = gelap permanen di atas putih (visible di semua theme) */}
              <Button
                size="lg"
                asChild
                className="h-12 bg-white px-8 text-zinc-900 shadow-xl hover:bg-white/90"
              >
                <Link href="/#projects">
                  Lihat Karya Saya
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 border-white/30 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/#audio">Dengarkan Musik</Link>
              </Button>
            </div>
          </div>
        </ScrollExpand>
      </div>
    </section>
  )
}