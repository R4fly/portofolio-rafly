'use client'

import { useLiveStats, type LiveStats } from '@/lib/queries/stats'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { GithubIcon } from './icons/github-icon'
import { QueryErrorState } from './query-error-state'
import { useLoadingTimeout } from './query-loading-timeout'
import CountUp from './count-up'
import { Clock, Briefcase, Code2 } from 'lucide-react'

type StatKey = keyof LiveStats

interface StatConfig {
  key: StatKey
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  fallback: number
}

const STATS_CONFIG: StatConfig[] = [
  {
    key: 'github_commits',
    label: 'GitHub Commits',
    description: 'Total commit di repositori',
    icon: GithubIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    fallback: 500,
  },
  {
    key: 'hours_practiced',
    label: 'Jam Latihan',
    description: 'Latihan gitar kumulatif',
    icon: Clock,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    fallback: 1200,
  },
  {
    key: 'projects_active',
    label: 'Proyek Aktif',
    description: 'Sedang dikerjakan',
    icon: Briefcase,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    fallback: 3,
  },
  {
    key: 'lines_of_code',
    label: 'Baris Kode',
    description: 'Ditulis tahun ini',
    icon: Code2,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    fallback: 50000,
  },
]

export function RealtimeStats() {
  const { data: stats, isLoading, isError, isFetching, refetch } = useLiveStats()
  const loadingTimedOut = useLoadingTimeout(isLoading)
  const showError = isError || loadingTimedOut

  // Fallback data jika gagal load
  const displayStats: LiveStats = stats || {
    github_commits: 500,
    hours_practiced: 1200,
    projects_active: 3,
    lines_of_code: 50000,
  }

  const renderStatsGrid = (isFallback: boolean) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS_CONFIG.map((stat) => {
        const Icon = stat.icon
        const value: number = displayStats[stat.key] ?? stat.fallback

        return (
          <Card
            key={stat.key}
            className={`group border-border/40 bg-card/50 backdrop-blur ${
              isFallback ? '' : 'transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg'
            }`}
          >
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                  <CountUp
                    from={0}
                    to={value}
                    duration={2.2}
                    separator=","
                    direction="up"
                    startWhen
                  />
                </p>
                <p className="text-sm font-semibold text-foreground md:text-base">
                  {stat.label}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  return (
    <section className="container px-5 py-14 md:py-24" id="stats">
      <SectionHeader
        eyebrow="Live Stats"
        title={
          <>
            Angka yang <span className="text-primary">Terus Bergerak</span>
          </>
        }
        description="Metrik realtime dari aktivitas coding dan latihan gitar saya."
      />

      {/* Loading State */}
      {isLoading && !showError && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State dengan fallback data */}
      {showError && !isLoading && (
        <>
          <QueryErrorState
            title="Stats gagal dimuat"
            message="Menampilkan estimasi. Klik 'Coba Lagi' untuk refresh data."
            onRetry={() => refetch()}
            isRetrying={isFetching}
            className="mb-6"
          />
          {renderStatsGrid(true)}
        </>
      )}

      {/* Success State */}
      {!isLoading && !showError && renderStatsGrid(false)}
    </section>
  )
}