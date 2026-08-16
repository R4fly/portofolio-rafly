'use client'

import { useLiveStats } from '@/lib/queries/stats'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { GithubIcon } from './icons/github-icon'
import CountUp from './count-up'
import { Clock, Briefcase, Code2 } from 'lucide-react'

const STATS_CONFIG = [
  {
    key: 'github_commits',
    label: 'GitHub Commits',
    description: 'Total commit di repositori',
    icon: GithubIcon,
    color: 'text-primary' as const,
    bgColor: 'bg-primary/10' as const,
  },
  {
    key: 'hours_practiced',
    label: 'Jam Latihan',
    description: 'Latihan gitar kumulatif',
    icon: Clock,
    color: 'text-secondary' as const,
    bgColor: 'bg-secondary/10' as const,
  },
  {
    key: 'projects_active',
    label: 'Proyek Aktif',
    description: 'Sedang dikerjakan',
    icon: Briefcase,
    color: 'text-primary' as const,
    bgColor: 'bg-primary/10' as const,
  },
  {
    key: 'lines_of_code',
    label: 'Baris Kode',
    description: 'Ditulis tahun ini',
    icon: Code2,
    color: 'text-secondary' as const,
    bgColor: 'bg-secondary/10' as const,
  },
]

export function RealtimeStats() {
  const { data: stats, isLoading } = useLiveStats()

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_CONFIG.map((stat) => {
          const Icon = stat.icon
          const value = stats?.[stat.key as keyof typeof stats] ?? 0

          return (
            <Card
              key={stat.key}
              className="group border-border/40 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <CardContent className="p-5 md:pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  {isLoading ? (
                    <Skeleton className="h-9 w-20" />
                  ) : (
                    <p className="font-mono text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                      <CountUp
                        from={0}
                        to={typeof value === 'number' ? value : parseInt(String(value), 10) || 0}
                        duration={2.2}
                        separator=","
                        direction="up"
                        startWhen
                      />
                    </p>
                  )}
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
    </section>
  )
}