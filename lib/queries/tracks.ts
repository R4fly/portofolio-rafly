import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Track } from '@/types/database'

export async function fetchAllTracks(): Promise<Track[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Track[]>()

  if (error) {
    throw new Error(`Failed to fetch tracks: ${error.message}`)
  }

  return data ?? []
}

export function useTracks() {
  return useQuery<Track[]>({
    queryKey: ['tracks'],
    queryFn: fetchAllTracks,
    staleTime: 60 * 60 * 1000, // 1 jam - audio tracks jarang berubah
  })
}