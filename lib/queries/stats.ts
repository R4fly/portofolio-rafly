import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import { PUBLIC_QUERY_OPTIONS } from '@/lib/query-config'

/**
 * Interface untuk struktur data stats.
 */
export interface LiveStats {
  github_commits: number
  hours_practiced: number
  projects_active: number
  lines_of_code: number
}

/**
 * Alias type untuk kompatibilitas dengan hook lain (use-realtime-stats).
 * Menggunakan StatsMap sebagai nama legacy untuk backwards compatibility.
 */
export type StatsMap = LiveStats

// Default values jika table kosong atau struktur tidak sesuai
const DEFAULT_STATS: LiveStats = {
  github_commits: 500,
  hours_practiced: 1200,
  projects_active: 3,
  lines_of_code: 50000,
}

/**
 * Interface internal untuk schema flat stats (single row dengan kolom per-metric).
 */
interface FlatStatsRow {
  id?: string
  github_commits?: number | string
  hours_practiced?: number | string
  projects_active?: number | string
  lines_of_code?: number | string
}

/**
 * Interface internal untuk schema key-value (metric_key + metric_value).
 */
interface KeyValueStatsRow {
  metric_key: string
  metric_value: number | string
}

/**
 * useLiveStats — fetch live stats dari Supabase.
 *
 * Handles dua kemungkinan schema:
 * 1. Flat object (single row dengan kolom per-metric) — PREFERRED
 * 2. Key-value pairs (metric_key + metric_value) — fallback transform
 */
export function useLiveStats() {
  return useQuery<LiveStats, Error>({
    queryKey: ['live-stats', 'stats'],
    queryFn: async (): Promise<LiveStats> => {
      const supabase = getSupabaseClient()

      // Coba schema flat dulu
      const { data: flatData, error: flatError } = await supabase
        .from('live_stats')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (flatError && flatError.code !== 'PGRST116') {
        // PGRST116 = no rows, bukan error
        throw new Error(flatError.message)
      }

      // Jika dapat flat data, cast ke interface internal lalu transform
      if (flatData && typeof flatData === 'object') {
        const row = flatData as unknown as FlatStatsRow
        const hasRequiredFields =
          'github_commits' in row ||
          'hours_practiced' in row ||
          'projects_active' in row ||
          'lines_of_code' in row

        if (hasRequiredFields) {
          return {
            github_commits: Number(row.github_commits) || DEFAULT_STATS.github_commits,
            hours_practiced: Number(row.hours_practiced) || DEFAULT_STATS.hours_practiced,
            projects_active: Number(row.projects_active) || DEFAULT_STATS.projects_active,
            lines_of_code: Number(row.lines_of_code) || DEFAULT_STATS.lines_of_code,
          }
        }
      }

      // Coba schema key-value
      const { data: kvData, error: kvError } = await supabase
        .from('live_stats')
        .select('metric_key, metric_value')

      if (!kvError && Array.isArray(kvData) && kvData.length > 0) {
        const stats = { ...DEFAULT_STATS }
        for (const row of kvData as unknown as KeyValueStatsRow[]) {
          const key = row.metric_key
          const value = Number(row.metric_value) || 0
          if (key in stats) {
            stats[key as keyof LiveStats] = value
          }
        }
        return stats
      }

      // Fallback ke default
      return DEFAULT_STATS
    },
    ...PUBLIC_QUERY_OPTIONS,
  })
}