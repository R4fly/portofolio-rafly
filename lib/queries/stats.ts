import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface StatsMap {
  github_commits: number
  hours_practiced: number
  projects_active: number
  lines_of_code: number
  updated_at: string
}

interface LiveStatRow {
  metric_key: string
  metric_value: number
  updated_at: string
}

export async function fetchLiveStats(): Promise<StatsMap> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('live_stats')
    .select('metric_key, metric_value, updated_at')
    .returns<LiveStatRow[]>()

  if (error) {
    throw new Error(`Failed to fetch live stats: ${error.message}`)
  }

  const statsMap: StatsMap = {
    github_commits: 0,
    hours_practiced: 0,
    projects_active: 0,
    lines_of_code: 0,
    updated_at: new Date().toISOString(),
  }

  const rows = data ?? []

  for (const stat of rows) {
    if (stat.metric_key in statsMap) {
      statsMap[stat.metric_key as keyof Omit<StatsMap, 'updated_at'>] = stat.metric_value
    }
  }

  if (rows.length > 0) {
    statsMap.updated_at = rows[0].updated_at
  }

  return statsMap
}

export function useLiveStats() {
  return useQuery<StatsMap>({
    queryKey: ['stats'],
    queryFn: fetchLiveStats,
    staleTime: 30 * 1000, // 30 detik — data realtime
    refetchOnWindowFocus: true,
  })
}