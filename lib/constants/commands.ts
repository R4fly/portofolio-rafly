import type { LucideIcon } from 'lucide-react'
import {
  Home,
  FolderKanban,
  Music,
  MessageCircle,
  Calendar,
  LogIn,
  FileText,
  Shield,
} from 'lucide-react'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon: LucideIcon
  href?: string
  shortcut?: string[]
  action?: () => void
}

export interface CommandGroup {
  heading: string
  items: CommandItem[]
}

/**
 * Static command items untuk navigasi cepat.
 * Dynamic items (projects, tracks) akan di-filter terpisah berdasarkan query.
 */
export const STATIC_COMMANDS: CommandGroup[] = [
  {
    heading: 'Navigasi',
    items: [
      {
        id: 'home',
        label: 'Beranda',
        description: 'Kembali ke halaman utama',
        icon: Home,
        href: '/',
      },
      {
        id: 'projects',
        label: 'Proyek Web',
        description: 'Lihat semua portofolio project',
        icon: FolderKanban,
        href: '/#projects',
      },
      {
        id: 'audio',
        label: 'Audio Showcase',
        description: 'Dengarkan rekaman gitar',
        icon: Music,
        href: '/#audio',
      },
      {
        id: 'guestbook',
        label: 'Buku Tamu',
        description: 'Lihat pesan dari pengunjung',
        icon: MessageCircle,
        href: '/#guestbook',
      },
      {
        id: 'booking',
        label: 'Jadwalkan Sesi',
        description: 'Booking konsultasi atau sesi gitar',
        icon: Calendar,
        href: '/#booking',
      },
    ],
  },
  {
    heading: 'Aksi',
    items: [
      {
        id: 'login',
        label: 'Masuk Client Portal',
        description: 'Login untuk mengakses dashboard',
        icon: LogIn,
        href: '/login',
      },
      {
        id: 'privacy',
        label: 'Privacy Policy',
        description: 'Kebijakan privasi website',
        icon: Shield,
        href: '/privacy-policy',
      },
      {
        id: 'terms',
        label: 'Terms of Service',
        description: 'Syarat dan ketentuan layanan',
        icon: FileText,
        href: '/terms',
      },
    ],
  },
]

/**
 * Label untuk empty state saat search tidak menemukan hasil.
 */
export const NO_RESULTS_TEXT = 'Tidak ditemukan. Coba kata kunci lain.'

/**
 * Placeholder untuk input search.
 */
export const SEARCH_PLACEHOLDER = 'Cari halaman, proyek, atau aksi...'