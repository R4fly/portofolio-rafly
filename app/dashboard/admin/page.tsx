'use client'

import Link from 'next/link'
import { useAdminStats } from '@/lib/queries/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Calendar,
  Mail,
  MessageSquare,
  FolderKanban,
  Music,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Sub-component: Card untuk setiap metrik admin.
 * Co-located karena hanya dipakai di halaman ini.
 */
function StatSummaryCard({
  label,
  value,
  icon: Icon,
  href,
  accentColor,
  isLoading,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  href: string
  accentColor: 'primary' | 'secondary'
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <Card className="border-border/40 bg-card/50">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          'border-border/40 bg-card/50 backdrop-blur transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-lg',
          accentColor === 'primary'
            ? 'hover:border-primary/50 hover:shadow-primary/10'
            : 'hover:border-secondary/50 hover:shadow-secondary/10'
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Icon
              className={cn(
                'h-4 w-4',
                accentColor === 'primary' ? 'text-primary' : 'text-secondary'
              )}
            />
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="font-mono text-3xl font-bold tabular-nums">
              {value}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

/**
 * Halaman Overview Admin Dashboard.
 * Menampilkan ringkasan metrik yang butuh perhatian admin.
 */
export default function AdminOverviewPage() {
  const { data: stats, isLoading, isError } = useAdminStats()

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">
          Gagal memuat statistik admin. Silakan refresh halaman.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-sans text-2xl font-bold tracking-tight">Overview</h2>
        <p className="mt-1 text-muted-foreground">
          Ringkasan aktivitas yang membutuhkan perhatian Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatSummaryCard
          label="Booking Pending"
          value={stats?.pendingBookings ?? 0}
          icon={Calendar}
          href="/dashboard/admin/bookings"
          accentColor="secondary"
          isLoading={isLoading}
        />
        <StatSummaryCard
          label="Pesan Belum Dibaca"
          value={stats?.unreadMessages ?? 0}
          icon={Mail}
          href="/dashboard/admin/messages"
          accentColor="primary"
          isLoading={isLoading}
        />
        <StatSummaryCard
          label="Guestbook Menunggu"
          value={stats?.pendingGuestbook ?? 0}
          icon={MessageSquare}
          href="/dashboard/admin/guestbook"
          accentColor="primary"
          isLoading={isLoading}
        />
        <StatSummaryCard
          label="Total Projects"
          value={stats?.totalProjects ?? 0}
          icon={FolderKanban}
          href="/dashboard/admin/projects"
          accentColor="primary"
          isLoading={isLoading}
        />
        <StatSummaryCard
          label="Total Tracks"
          value={stats?.totalTracks ?? 0}
          icon={Music}
          href="/dashboard/admin/tracks"
          accentColor="secondary"
          isLoading={isLoading}
        />
      </div>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Catatan:</strong> Fitur moderasi
            guestbook, manajemen pesan, CRUD projects, bookings, tracks, dan live
            stats akan tersedia di sub-fase berikutnya. Untuk saat ini, Anda dapat
            melihat ringkasan metrik di atas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}