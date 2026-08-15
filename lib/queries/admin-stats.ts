import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface LiveStatRow {
  metric_key: string
  metric_value: number
  updated_at: string
}

export interface StatUpdateInput {
  metric_key: string
  metric_value: number
}

/**
 * Fetch raw live_stats rows untuk admin editor.
 * Berbeda dengan public stats (yang return map), di sini kita butuh
 * array row agar bisa edit setiap metric secara individual.
 */
export async function fetchLiveStatsRows(): Promise<LiveStatRow[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('live_stats')
    .select('metric_key, metric_value, updated_at')
    .order('metric_key')
    .returns<LiveStatRow[]>()

  if (error) {
    throw new Error(`Failed to fetch live stats: ${error.message}`)
  }

  return data ?? []
}

export function useLiveStatsRows() {
  return useQuery<LiveStatRow[]>({
    queryKey: ['admin', 'live-stats'],
    queryFn: fetchLiveStatsRows,
    staleTime: 30 * 1000,
  })
}

/**
 * Mutation untuk bulk update semua stats sekaligus.
 * Menggunakan Promise.all karena Supabase tidak support multi-row update
 * dengan nilai berbeda dalam satu query.
 */
export function useUpdateStats() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, StatUpdateInput[]>({
    mutationFn: async (stats: StatUpdateInput[]) => {
      const supabase = getSupabaseClient()

      const results = await Promise.all(
        stats.map((stat) =>
          supabase
            .from('live_stats')
            .update({ metric_value: stat.metric_value })
            .eq('metric_key', stat.metric_key)
        )
      )

      const firstError = results.find((result) => result.error)
      if (firstError?.error) {
        throw new Error(firstError.error.message)
      }
    },
    onSuccess: () => {
      // Refresh admin editor
      queryClient.invalidateQueries({ queryKey: ['admin', 'live-stats'] })
      // Refresh public stats di homepage (realtime akan broadcast juga)
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })
}