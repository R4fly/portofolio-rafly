import Link from "next/link"
import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-sans tracking-tight">
              Rafly<span className="text-primary">.dev</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Junior Full-Stack Developer & Gitaris. Membangun aplikasi web presisi dengan ritme kode yang clean, sambil menjaga soul musik tetap hidup.
            </p>
            <div className="flex gap-3">
              <Link href="https://github.com/raflybaehaqi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="mailto:hello@raflybaehaqi.my.id" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">Proyek Web</Link></li>
              <li><Link href="/#audio" className="text-muted-foreground hover:text-primary transition-colors">Audio Showcase</Link></li>
              <li><Link href="/#guestbook" className="text-muted-foreground hover:text-primary transition-colors">Buku Tamu</Link></li>
              <li><Link href="/#booking" className="text-muted-foreground hover:text-primary transition-colors">Jadwalkan Sesi</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Yogyakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@raflybaehaqi.my.id</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>WhatsApp (On Request)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Rafly Baehaqi. All rights reserved. Built with Next.js & Supabase.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}