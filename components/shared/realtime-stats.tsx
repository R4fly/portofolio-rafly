'use client'

import { Clock, Briefcase, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/shared/icons/github-icon'
import { StatsCard } from './stats-card'
import { useLiveStats } from '@/lib/queries/stats'
import { useRealtimeStats } from '@/lib/hooks/use-realtime-stats'

export function RealtimeStats() {
  const { data: stats, isLoading, isError } = useLiveStats()

  // Subscribe ke realtime updates
  useRealtimeStats()

  if (isError) {
    return (
      <div className="container py-12">
        <div className="text-center text-sm text-muted-foreground">
          Gagal memuat statistik. Coba refresh halaman.
        </div>
      </div>
    )
  }

  return (
    <section className="container py-12 md:py-16" id="stats">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-sans text-2xl font-bold tracking-tight md:text-3xl">
          Live <span className="text-primary">Stats</span>
        </h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
          Metrik kredibilitas yang diperbarui secara realtime langsung dari database
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatsCard
          label="GitHub Commits"
          value={stats?.github_commits ?? 0}
          icon={GithubIcon}
          isLoading={isLoading}
          accentColor="primary"
        />
        <StatsCard
          label="Jam Latihan Gitar"
          value={stats?.hours_practiced ?? 0}
          icon={Clock}
          suffix="hrs"
          isLoading={isLoading}
          accentColor="secondary"
        />
        <StatsCard
          label="Proyek Aktif"
          value={stats?.projects_active ?? 0}
          icon={Briefcase}
          isLoading={isLoading}
          accentColor="primary"
        />
        <StatsCard
          label="Baris Kode"
          value={stats?.lines_of_code ?? 0}
          icon={Code2}
          isLoading={isLoading}
          accentColor="secondary"
        />
      </div>
    </section>
  )
}