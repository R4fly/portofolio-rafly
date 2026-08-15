'use client'

import type { ComponentType, SVGProps } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatNumber, cn } from '@/lib/utils'
import { useCountUp } from '@/lib/hooks/use-count-up'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

interface StatsCardProps {
  label: string
  value: number
  icon: IconComponent
  suffix?: string
  isLoading?: boolean
  accentColor?: 'primary' | 'secondary'
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  suffix = '',
  isLoading = false,
  accentColor = 'primary',
}: StatsCardProps) {
  const animatedValue = useCountUp({
    end: value,
    duration: 1200,
    enabled: !isLoading,
  })

  if (isLoading) {
    return (
      <Card className="border-border/40 bg-card/50 backdrop-blur">
        <CardContent className="p-5 md:p-6">
          <div className="mb-3 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'border-border/40 bg-card/50 backdrop-blur transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
      )}
    >
      <CardContent className="p-5 md:p-6">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              accentColor === 'primary'
                ? 'bg-primary/10 text-primary'
                : 'bg-secondary/10 text-secondary'
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold tabular-nums text-foreground md:text-3xl">
            {formatNumber(animatedValue)}
          </span>
          {suffix && (
            <span className="font-mono text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}