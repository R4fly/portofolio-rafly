'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LogoutButton } from '@/components/shared/logout-button'
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  FolderKanban,
  Calendar,
  Music,
  BarChart3,
  ArrowLeft,
} from 'lucide-react'

interface AdminNavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const adminNavItems: AdminNavItem[] = [
  {
    href: '/dashboard/admin',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/admin/guestbook',
    label: 'Guestbook',
    icon: MessageSquare,
  },
  {
    href: '/dashboard/admin/messages',
    label: 'Messages',
    icon: Mail,
  },
  {
    href: '/dashboard/admin/projects',
    label: 'Projects',
    icon: FolderKanban,
  },
  {
    href: '/dashboard/admin/bookings',
    label: 'Bookings',
    icon: Calendar,
  },
  {
    href: '/dashboard/admin/tracks',
    label: 'Tracks',
    icon: Music,
  },
  {
    href: '/dashboard/admin/stats',
    label: 'Live Stats',
    icon: BarChart3,
  },
]

/**
 * Sidebar navigasi untuk Admin Dashboard.
 * Menampilkan semua section admin dengan active state berdasarkan pathname.
 */
export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full border-b border-border/40 bg-card/30 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-4">
        {/* Back to Dashboard */}
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Dashboard
        </Link>

        {/* Admin Nav */}
        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-x-visible">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/dashboard/admin'
                ? pathname === '/dashboard/admin'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout di bagian bawah (desktop only) */}
        <div className="mt-auto hidden pt-4 lg:block">
          <LogoutButton variant="outline" className="w-full justify-center" />
        </div>
      </div>
    </aside>
  )
}