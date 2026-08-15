import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Track } from '@/types/database'

/**
 * Payload untuk create/update track.
 * waveform_data tidak di-edit manual (terlalu kompleks untuk UI).
 */
export interface TrackInput {
  title: string
  genre: string | null
  audio_url: string
  duration: number | null
}

export async function fetchAllTracksAdmin(): Promise<Track[]> {
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

export function useAllTracksAdmin() {
  return useQuery<Track[]>({
    queryKey: ['admin', 'tracks'],
    queryFn: fetchAllTracksAdmin,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}

export function useCreateTrack() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, TrackInput>({
    mutationFn: async (input: TrackInput) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('tracks').insert([input])

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tracks'] })
      queryClient.invalidateQueries({ queryKey: ['tracks'] })
    },
  })
}

export function useUpdateTrack() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; data: Partial<TrackInput> }>({
    mutationFn: async ({ id, data }) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('tracks')
        .update(data)
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tracks'] })
      queryClient.invalidateQueries({ queryKey: ['tracks'] })
    },
  })
}

export function useDeleteTrack() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('tracks')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tracks'] })
      queryClient.invalidateQueries({ queryKey: ['tracks'] })
    },
  })
}