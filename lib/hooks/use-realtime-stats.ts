'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { StatsMap } from '@/lib/queries/stats'

/**
 * Hook untuk subscribe ke perubahan realtime pada tabel live_stats.
 * Ketika ada UPDATE di database, React Query cache langsung di-update
 * sehingga UI ter-render ulang tanpa perlu refetch manual.
 */
export function useRealtimeStats() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const supabase = getSupabaseClient()

    const channel = supabase
      .channel('live-stats-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_stats',
        },
        (payload) => {
          const newRecord = payload.new as {
            metric_key: string
            metric_value: number
            updated_at: string
          }

          queryClient.setQueryData<StatsMap>(['stats'], (oldData) => {
            if (!oldData) return oldData

            const updatedStats = { ...oldData }

            if (newRecord.metric_key in updatedStats) {
              updatedStats[newRecord.metric_key as keyof Omit<StatsMap, 'updated_at'>] =
                newRecord.metric_value
            }
            updatedStats.updated_at = newRecord.updated_at

            return updatedStats
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}