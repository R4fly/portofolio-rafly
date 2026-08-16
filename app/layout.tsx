import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { CommandMenu } from '@/components/shared/command-menu'
import { CookieBanner } from '@/components/shared/cookie-banner'
import { StickyMobileCta } from '@/components/shared/sticky-mobile-cta'
import { GlobalScanner } from '@/components/shared/global-scanner'
import { StructuredData } from '@/components/shared/structured-data'

// Font optimization
const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
})

export const metadata: Metadata = {
  title: {
    default: 'Rafly Baehaqi — Junior Full-Stack Developer & Gitaris',
    template: '%s | Rafly Baehaqi',
  },
  description:
    'Portfolio Rafly Baehaqi. Junior Full-Stack Developer & Gitaris dari Yogyakarta. Next.js, TypeScript, Supabase + blues & rock.',
  keywords: [
    'Next.js',
    'React',
    'Supabase',
    'Web Developer',
    'Gitaris',
    'Portfolio',
    'Yogyakarta',
    'Full-Stack',
    'TypeScript',
  ],
  authors: [{ name: 'Rafly Baehaqi' }],
  creator: 'Rafly Baehaqi',
  metadataBase: new URL('https://raflybaehaqi.my.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://raflybaehaqi.my.id',
    title: 'Rafly Baehaqi — Developer & Gitaris',
    description: 'Membangun aplikasi web responsif dengan ritme kode yang presisi.',
    siteName: 'Rafly Baehaqi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafly Baehaqi — Developer & Gitaris',
    description: 'Membangun aplikasi web responsif dengan ritme kode yang presisi.',
    creator: '@raflybaehaqi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1c' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Critical CSS inlining untuk FCP optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                margin: 0;
                font-family: var(--font-sans), system-ui, sans-serif;
                -webkit-font-smoothing: antialiased;
                background-color: hsl(var(--background));
                color: hsl(var(--foreground));
              }
              .dark body {
                background-color: hsl(222 47% 6%);
                color: hsl(210 40% 98%);
              }
              header, main, footer {
                position: relative;
                z-index: 10;
              }
              .container {
                width: 100%;
                max-width: 1280px;
                margin: 0 auto;
                padding: 0 1rem;
              }
              @media (min-width: 640px) {
                .container { padding: 0 1.5rem; }
              }
              @media (min-width: 1024px) {
                .container { padding: 0 2rem; }
              }
            `,
          }}
        />

        {/* Inline theme script - di <head> untuk avoid flash, suppressHydrationWarning handle mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <StructuredData />

        {/* Global Ambient Scanner */}
        <GlobalScanner />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CommandMenu />
            <CookieBanner />
            <StickyMobileCta />
            <Toaster position="top-right" richColors />
          </Providers>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}