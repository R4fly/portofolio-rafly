'use client'

import dynamic from 'next/dynamic'
import { SectionHeader } from './section-header'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiGit,
  SiNodedotjs,
} from 'react-icons/si'

// Simple fallback SVG for lucide-react users without react-icons
// (If react-icons not installed, replace the <Si... /> below with text labels)

const LogoLoop = dynamic(() => import('./logo-loop'), {
  ssr: false,
  loading: () => (
    <div
      className="h-16 animate-pulse rounded-md bg-muted/40"
      aria-busy="true"
    />
  ),
})

/**
 * Tools Marquee — Compact scrolling logo bar.
 *
 * Menampilkan tech stack icons sebagai subtle marquee.
 * Berbeda dari ChromaGrid (yang detail & interactive),
 * marquee ini berfungsi sebagai "trust band" visual.
 */
export function ToolsMarquee() {
  const logos = [
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org', ariaLabel: 'Next.js' },
    { node: <SiReact />, title: 'React', href: 'https://react.dev', ariaLabel: 'React' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://typescriptlang.org', ariaLabel: 'TypeScript' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', ariaLabel: 'Tailwind CSS' },
    { node: <SiSupabase />, title: 'Supabase', href: 'https://supabase.com', ariaLabel: 'Supabase' },
    { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://postgresql.org', ariaLabel: 'PostgreSQL' },
    { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org', ariaLabel: 'Node.js' },
    { node: <SiGit />, title: 'Git', href: 'https://git-scm.com', ariaLabel: 'Git' },
  ]

  return (
    <section className="container py-12 md:py-16">
      <SectionHeader
        eyebrow="Tools of the Trade"
        title={
          <>
            Tech yang <span className="text-primary">Saya Kuasai</span>
          </>
        }
        description="Stack modern yang saya gunakan setiap hari untuk membangun produk web yang scalable dan maintainable."
        className="mb-8 md:mb-12"
      />

      <div className="relative h-16 w-full overflow-hidden md:h-20">
        <LogoLoop
          logos={logos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={64}
          hoverSpeed={20}
          fadeOut
          scaleOnHover
          ariaLabel="Technology stack logos"
        />
      </div>
    </section>
  )
}