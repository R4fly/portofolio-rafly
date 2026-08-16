'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './chroma-grid.css'

interface ChromaItem {
  image: string
  title: string
  subtitle: string
  handle?: string
  location?: string
  borderColor?: string
  gradient: string
  url?: string
}

interface ChromaGridProps {
  items?: ChromaItem[]
  className?: string
  radius?: number
  columns?: number
  rows?: number
  damping?: number
  fadeOut?: number
  ease?: string
}

export default function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const fadeRef = useRef<HTMLDivElement | null>(null)
  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  // Default: tech stack tools yang Anda kuasai
  const defaultItems: ChromaItem[] = [
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      title: 'Next.js',
      subtitle: 'React Framework',
      handle: 'App Router',
      borderColor: '#000000',
      gradient: 'linear-gradient(145deg, #1a1a1a, #000)',
      url: 'https://nextjs.org',
    },
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      title: 'TypeScript',
      subtitle: 'Type-Safe JS',
      handle: 'v5.x',
      borderColor: '#3178C6',
      gradient: 'linear-gradient(180deg, #3178C6, #001a3d)',
      url: 'https://typescriptlang.org',
    },
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      title: 'Supabase',
      subtitle: 'Postgres + Auth',
      handle: 'Realtime',
      borderColor: '#3ECF8E',
      gradient: 'linear-gradient(210deg, #3ECF8E, #0a2e1f)',
      url: 'https://supabase.com',
    },
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      title: 'Tailwind CSS',
      subtitle: 'Utility-first CSS',
      handle: 'v4',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(195deg, #06B6D4, #083344)',
      url: 'https://tailwindcss.com',
    },
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      title: 'React',
      subtitle: 'UI Library',
      handle: 'v19',
      borderColor: '#61DAFB',
      gradient: 'linear-gradient(225deg, #61DAFB, #0a2830)',
      url: 'https://react.dev',
    },
    {
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      title: 'PostgreSQL',
      subtitle: 'Relational DB',
      handle: 'v16',
      borderColor: '#4169E1',
      gradient: 'linear-gradient(135deg, #4169E1, #0a1a3d)',
      url: 'https://postgresql.org',
    },
  ]

  const data = items && items.length > 0 ? items : defaultItems

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    setX.current = gsap.quickSetter(el, '--x', 'px') as (v: number) => void
    setY.current = gsap.quickSetter(el, '--y', 'px') as (v: number) => void

    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number): void => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true,
    })
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    moveTo(e.clientX - r.left, e.clientY - r.top)
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 0,
        duration: 0.25,
        overwrite: true,
      })
    }
  }

  const handleLeave = (): void => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true,
      })
    }
  }

  const handleCardClick = (url?: string): void => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardMove = (e: React.MouseEvent<HTMLElement>): void => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--cols': columns,
          '--rows': rows,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient,
              cursor: c.url ? 'pointer' : 'default',
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" aria-hidden="true" />
      <div ref={fadeRef} className="chroma-fade" aria-hidden="true" />
    </div>
  )
}