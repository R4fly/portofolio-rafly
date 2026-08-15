/**
 * Mapping teknologi ke warna badge.
 * Digunakan oleh ProjectCard untuk menampilkan tech stack yang konsisten
 * dan mudah dibedakan secara visual.
 */
export const TECH_STACK_COLORS: Record<string, string> = {
  // Frontend
  'Next.js': 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900',
  'React': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100',
  'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  'TailwindCSS': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
  'ShadcnUI': 'bg-zinc-800 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900',

  // Backend & Database
  'Supabase': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
  'PostgreSQL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  'Express': 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100',
  'Prisma': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  'Stripe': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',

  // API & Realtime
  'GraphQL': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
  'tRPC': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  'Web Audio API': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
  'WaveSurfer.js': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',

  // Animation
  'Framer Motion': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  'GSAP': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
}

/**
 * Default fallback color jika teknologi tidak terdaftar.
 */
export const DEFAULT_TECH_COLOR = 'bg-muted text-muted-foreground'

/**
 * Helper untuk mendapatkan warna badge berdasarkan nama teknologi.
 */
export function getTechStackColor(techName: string): string {
  return TECH_STACK_COLORS[techName] ?? DEFAULT_TECH_COLOR
}