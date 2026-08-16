import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "@/components/providers"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { CookieBanner } from "@/components/shared/cookie-banner"
import { MobileCTA } from "@/components/shared/mobile-cta"
import { CommandMenu } from "@/components/shared/command-menu"
import { CommandShortcut } from "@/components/shared/command-shortcut"
import "./globals.css"
import { StructuredData } from "@/components/shared/structured-data"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Rafly Baehaqi — Junior Full-Stack Developer & Gitaris",
    template: "%s | Rafly Baehaqi",
  },
  description:
    "Portfolio mewah Rafly Baehaqi. Membangun aplikasi web responsif dengan ritme kode yang presisi, dipadukan dengan soul musik blues & rock.",
  keywords: [
    "Next.js",
    "React",
    "Supabase",
    "Web Developer",
    "Gitaris",
    "Portfolio",
    "Yogyakarta",
  ],
  authors: [{ name: "Rafly Baehaqi" }],
  creator: "Rafly Baehaqi",
  metadataBase: new URL("https://raflybaehaqi.my.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://raflybaehaqi.my.id",
    title: "Rafly Baehaqi — Developer & Gitaris",
    description: "Membangun aplikasi web responsif dengan ritme kode yang presisi.",
    siteName: "Rafly Baehaqi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafly Baehaqi — Developer & Gitaris",
    description: "Membangun aplikasi web responsif dengan ritme kode yang presisi.",
    creator: "@raflybaehaqi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-body antialiased">
        <StructuredData />
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileCTA />
            <CookieBanner />
            <CommandShortcut />
            <CommandMenu />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}