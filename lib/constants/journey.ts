import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  GitBranch,
  Rocket,
  Database,
  Music,
  Disc3,
  Mic,
  Headphones,
} from 'lucide-react'

export interface JourneyItem {
  year: string
  title: string
  description: string
  icon: LucideIcon
  tags?: string[]
}

export interface JourneyColumn {
  id: 'programming' | 'guitar'
  label: string
  tagline: string
  accentColor: 'primary' | 'secondary'
  items: JourneyItem[]
}

/**
 * PERHATIAN: Data di bawah adalah TEMPLATE.
 * Sesuaikan tahun, judul, dan deskripsi dengan perjalanan asli Anda.
 */
export const PROGRAMMING_JOURNEY: JourneyItem[] = [
  {
    year: '2022',
    title: 'First Line of Code',
    description:
      'Memulai perjalanan dengan HTML & CSS. Membangun halaman web statis pertama dan menemukan passion di balik layar.',
    icon: Code2,
    tags: ['HTML', 'CSS'],
  },
  {
    year: '2023',
    title: 'JavaScript & React',
    description:
      'Mendalami JavaScript modern dan React. Mulai membangun aplikasi interaktif dengan arsitektur berbasis komponen.',
    icon: GitBranch,
    tags: ['JavaScript', 'React'],
  },
  {
    year: '2024',
    title: 'TypeScript & Next.js',
    description:
      'Adopsi TypeScript untuk type safety dan Next.js untuk framework full-stack. Fokus pada performa dan SEO.',
    icon: Rocket,
    tags: ['TypeScript', 'Next.js'],
  },
  {
    year: '2025',
    title: 'Full-Stack dengan Supabase',
    description:
      'Menguasai Supabase sebagai backend-as-a-service: database, auth, realtime, dan storage. Membangun aplikasi SaaS-ready.',
    icon: Database,
    tags: ['Supabase', 'PostgreSQL', 'Realtime'],
  },
]

export const GUITAR_JOURNEY: JourneyItem[] = [
  {
    year: '2020',
    title: 'Chord Pertama',
    description:
      'Pertama kali memegang gitar dan belajar chord dasar. Dari momen ini, cinta pada musik tumbuh tak terbendung.',
    icon: Music,
    tags: ['Akustik', 'Chord Dasar'],
  },
  {
    year: '2021',
    title: 'Fondasi Blues & Rock',
    description:
      'Mendalami teknik pentatonic blues dan rhythm rock. Mulai memahami feel dan dinamika dalam bermain.',
    icon: Headphones,
    tags: ['Blues', 'Rock'],
  },
  {
    year: '2023',
    title: 'Eksplorasi Jazz Fusion',
    description:
      'Menjelajahi kompleksitas jazz fusion. Belajar improvisasi dan teori musik tingkat lanjut.',
    icon: Disc3,
    tags: ['Jazz', 'Fusion', 'Improvisasi'],
  },
  {
    year: '2025',
    title: 'Studio & Panggung',
    description:
      'Aktif merekam dan tampil. Menggabungkan teknik dan emosi dalam setiap permainan.',
    icon: Mic,
    tags: ['Recording', 'Live Performance'],
  },
]

export const JOURNEY_COLUMNS: JourneyColumn[] = [
  {
    id: 'programming',
    label: 'Programming Journey',
    tagline: 'Ritme Kode',
    accentColor: 'primary',
    items: PROGRAMMING_JOURNEY,
  },
  {
    id: 'guitar',
    label: 'Guitar Journey',
    tagline: 'Ritme Senar',
    accentColor: 'secondary',
    items: GUITAR_JOURNEY,
  },
]