import type { Metadata } from 'next'
import Link from 'next/link'
import { Music, Code2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Login ke Client Portal untuk mengakses dashboard, proyek, dan sesi konsultasi.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
      {/* Brand Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <Link href="/" className="mb-4 flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-mono text-xl font-bold text-white">
            R
          </div>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Code2 className="h-4 w-4 text-primary" />
          <span>Client Portal</span>
          <Music className="h-4 w-4 text-secondary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">{children}</div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}