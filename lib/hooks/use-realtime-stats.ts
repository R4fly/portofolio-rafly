'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { LiveStats } from '@/lib/queries/stats'

/**
 * Alias StatsMap untuk kompatibilitas dengan code lama.
 * StatsMap = LiveStats (struktur data stats yang sama).
 */
type StatsMap = LiveStats

/**
 * Hook untuk subscribe ke realtime changes di tabel live_stats.
 *
 * Strategi:
 * - Subscribe ke channel Supabase realtime
 * - Update React Query cache saat ada perubahan
 * - Auto-unsubscribe saat component unmount
 * - Type-safe dengan explicit LiveStats interface
 */
export function useRealtimeStats() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const supabase = getSupabaseClient()

    const channel = supabase
      .channel('live_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_stats',
        },
        (payload) => {
          // Update cache dengan data baru
          queryClient.setQueryData<LiveStats>(
            ['live-stats', 'stats'],
            (oldData: LiveStats | undefined): LiveStats => {
              // Jika belum ada data, return default
              const current = oldData || {
                github_commits: 500,
                hours_practiced: 1200,
                projects_active: 3,
                lines_of_code: 50000,
              }

              // Handle INSERT/UPDATE/DELETE payload
              const newData = payload.new as Record<string, unknown> | null

              if (!newData) return current

              // Schema flat: langsung merge
              if ('github_commits' in newData || 'hours_practiced' in newData) {
                return {
                  github_commits:
                    Number(newData.github_commits) || current.github_commits,
                  hours_practiced:
                    Number(newData.hours_practiced) || current.hours_practiced,
                  projects_active:
                    Number(newData.projects_active) || current.projects_active,
                  lines_of_code:
                    Number(newData.lines_of_code) || current.lines_of_code,
                }
              }

              // Schema key-value: update specific key
              if ('metric_key' in newData && 'metric_value' in newData) {
                const key = newData.metric_key as keyof LiveStats
                const value = Number(newData.metric_value) || 0
                if (key in current) {
                  return { ...current, [key]: value }
                }
              }

              return current
            }
          )

          // Juga invalidate untuk trigger refetch jika perlu
          queryClient.invalidateQueries({
            queryKey: ['live-stats'],
            exact: false,
          })
        }
      )
      .subscribe()

    // Cleanup: unsubscribe saat component unmount
    return (): void => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}

/**
 * Re-export StatsMap type untuk kompatibilitas.
 */
export type { StatsMap }