import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import { PUBLIC_QUERY_OPTIONS } from '@/lib/query-config'
import type { Track } from '@/types/database'

export function useTracks() {
  return useQuery<Track[], Error>({
    queryKey: ['tracks'],
    queryFn: async (): Promise<Track[]> => {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw new Error(error.message)

      // Transform waveform_data dari Json ke number[] | null
      return (data || []).map((row) => ({
        id: row.id,
        title: row.title,
        genre: row.genre,
        audio_url: row.audio_url,
        duration: row.duration,
        waveform_data: Array.isArray(row.waveform_data)
          ? (row.waveform_data as number[])
          : null,
        created_at: row.created_at,
      }))
    },
    ...PUBLIC_QUERY_OPTIONS,
  })
}