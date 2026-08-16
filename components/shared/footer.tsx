'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { GithubIcon } from './icons/github-icon'
import { InstagramIcon } from './icons/instagram-icon'
import { LinkedinIcon } from './icons/linkedin-icon'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
} from 'react-icons/si'
import { Heart, Code2, Music, Mail, Phone } from 'lucide-react'

const LogoLoop = dynamic(() => import('./logo-loop'), {
  ssr: false,
  loading: () => (
    <div className="h-8 animate-pulse rounded bg-muted/40" aria-busy="true" />
  ),
})

const techLogos = [
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org', ariaLabel: 'Next.js' },
  { node: <SiReact />, title: 'React', href: 'https://react.dev', ariaLabel: 'React' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://typescriptlang.org', ariaLabel: 'TypeScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', ariaLabel: 'Tailwind CSS' },
  { node: <SiSupabase />, title: 'Supabase', href: 'https://supabase.com', ariaLabel: 'Supabase' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://postgresql.org', ariaLabel: 'PostgreSQL' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-border/40 bg-background/80 backdrop-blur-xl">
      {/* Compact LogoLoop Marquee */}
      <div className="border-b border-border/40 py-4">
        <div className="container">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Built with
          </p>
          <div className="relative h-8 w-full overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={24}
              gap={48}
              hoverSpeed={0}
              fadeOut
              scaleOnHover={false}
              ariaLabel="Technology stack used to build this site"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-mono font-bold text-white">
                R
              </div>
              <span className="font-sans text-xl font-bold tracking-tight">
                Rafly<span className="text-primary">.dev</span>
              </span>
            </Link>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Junior Web Developer & Gitaris dari Yogyakarta. Membangun aplikasi web modern
              dengan ritme kode yang presisi, dipadukan dengan jiwa musik blues dan rock.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/R4fly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="GitHub profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-rafly-baehaqi-57a349352"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/rafly_baehaqi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:muhammadraflybaehaqi@gmail.com"
                className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border/40 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="Email contact"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://wa.me/6281228660551"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border/40 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="WhatsApp contact"
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/#projects"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="/#audio"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Audio Showcase
              </Link>
              <Link
                href="/#journey"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Journey
              </Link>
              <Link
                href="/#guestbook"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Guestbook
              </Link>
              <Link
                href="/#booking"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Book Session
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">
              Legal
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © {currentYear} Muhammad Rafly Baehaqi. Dibuat dengan{' '}
            <Heart className="inline h-3 w-3 text-red-500" aria-label="love" /> di
            Yogyakarta, Indonesia.
          </p>
          <p className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Code2 className="h-3 w-3" aria-hidden="true" />
              Next.js 16
            </span>
            <span className="flex items-center gap-1">
              <Music className="h-3 w-3" aria-hidden="true" />
              Blues & Rock
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}