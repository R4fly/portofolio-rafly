'use client'

import dynamic from 'next/dynamic'
import { SectionHeader } from './section-header'

// Lazy load ChromaGrid (GSAP dependency)
const ChromaGrid = dynamic(() => import('./chroma-grid'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-2xl bg-muted/40"
          aria-hidden="true"
        />
      ))}
    </div>
  ),
})

/**
 * Tech Stack Showcase — Section baru yang menampilkan tools yang dikuasai.
 *
 * Menggunakan ChromaGrid untuk spotlight effect yang dramatis.
 * Hover untuk "menghidupkan" card dari grayscale ke full color.
 */
export function TechStackShowcase() {
  return (
    <section className="container py-16 md:py-24" id="tech-stack">
      <SectionHeader
        eyebrow="Tech Stack"
        title={
          <>
            Senjata <span className="text-primary">Utama</span> Saya
          </>
        }
        description="Tools dan teknologi yang saya kuasai untuk membangun produk web modern, scalable, dan maintainable."
      />

      <div className="mx-auto" style={{ minHeight: '600px' }}>
        <ChromaGrid
          radius={350}
          columns={3}
          rows={2}
          damping={0.4}
          fadeOut={0.5}
        />
      </div>
    </section>
  )
}