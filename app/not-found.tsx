'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GuitarStrings } from '@/components/shared/guitar-strings'
import { useCommandMenuStore } from '@/lib/stores/command-store'
import { Home, Command, MessageCircle } from 'lucide-react'

/**
 * Custom 404 Page — Tema "Senar Putus & Kode Crash"
 *
 * Sesuai MASTER BLUEPRINT Section VIII:
 * - Big 404 dengan angka 0 diganti lubang suara gitar
 * - Interactive guitar strings (1 putus)
 * - Copywriting tematik
 * - CTA penyelamat konversi
 */
export default function NotFound() {
  const openCommandMenu = useCommandMenuStore((state) => state.open)

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      {/* ===== BIG 404 VISUAL ===== */}
      <div className="mb-4 flex items-center justify-center font-mono text-7xl font-bold text-muted-foreground/20 md:text-9xl">
        <span className="select-none">4</span>

        {/* Angka 0 diganti lubang suara gitar (soundhole) */}
        <span className="relative mx-3 flex h-16 w-16 items-center justify-center md:h-24 md:w-24">
          {/* Ring luar soundhole */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 ring-2 ring-secondary/30" />
          {/* Ring tengah */}
          <span className="absolute inset-2 rounded-full bg-background ring-1 ring-muted/30" />
          {/* Lubang gelap di tengah */}
          <span className="absolute inset-4 rounded-full bg-gradient-to-br from-black/80 via-black/60 to-transparent md:inset-6" />
          {/* Reflection highlight */}
          <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-white/20 blur-[1px] md:h-3 md:w-3" />
        </span>

        <span className="select-none">4</span>
      </div>

      {/* ===== INTERACTIVE GUITAR STRINGS ===== */}
      <GuitarStrings />

      {/* ===== COPYWRITING ===== */}
      <div className="mx-auto mt-8 max-w-lg space-y-3">
        <h1 className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
          Waduh, Senarnya Putus & Kodenya Crash!
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Halaman yang Anda cari tampaknya telah keluar dari nada ritme yang tepat
          atau skripnya terhapus dari repositori. Jangan khawatir, mari kita stem
          ulang alurnya.
        </p>
      </div>

      {/* ===== CTA PENYELAMAT KONVERSI ===== */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Studio
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={openCommandMenu}
          className="border-border/60 hover:bg-accent"
        >
          <Command className="mr-2 h-4 w-4" />
          Jalankan CMD+K
        </Button>

        <Button
          asChild
          size="lg"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href="/#contact">
            <MessageCircle className="mr-2 h-4 w-4" />
            Laporkan Bug
          </Link>
        </Button>
      </div>

      {/* ===== TERMINAL ERROR FOOTER ===== */}
      <div className="mt-12 w-full max-w-md rounded-lg border border-border/40 bg-card/30 p-4 text-left">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            terminal
          </span>
        </div>
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground">
          <code>
            <span className="text-red-500">Error: String_Exception_Unhandled</span>
            {'\n'}  at Guitar.tune(<span className="text-primary">string:3</span>)
            {'\n'}  at Router.navigate(<span className="text-primary">path:unknown</span>)
            {'\n'}  <span className="text-muted-foreground/60">
              # Hint: coba `git checkout main` lalu balik ke beranda
            </span>
          </code>
        </pre>
      </div>
    </div>
  )
}