import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { GuestbookEntry } from '@/types/database'

/**
 * Fetch SEMUA guestbook entries (approved + pending).
 * Hanya admin yang bisa akses ini (RLS policy is_admin()).
 */
export async function fetchAllGuestbookEntries(): Promise<GuestbookEntry[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<GuestbookEntry[]>()

  if (error) {
    throw new Error(`Failed to fetch guestbook entries: ${error.message}`)
  }

  return data ?? []
}

export function useAllGuestbookEntries() {
  return useQuery<GuestbookEntry[]>({
    queryKey: ['admin', 'guestbook'],
    queryFn: fetchAllGuestbookEntries,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  })
}

/**
 * Mutation untuk approve/unapprove guestbook entry.
 * Invalidate kedua query: admin view + public guestbook.
 */
export function useUpdateGuestbookEntry() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; is_approved: boolean }>({
    mutationFn: async ({ id, is_approved }) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('guestbook')
        .update({ is_approved })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      // Refresh admin view
      queryClient.invalidateQueries({ queryKey: ['admin', 'guestbook'] })
      // Refresh public guestbook juga agar perubahan langsung terlihat
      queryClient.invalidateQueries({ queryKey: ['guestbook'] })
    },
  })
}

/**
 * Mutation untuk delete guestbook entry permanen.
 */
export function useDeleteGuestbookEntry() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'guestbook'] })
      queryClient.invalidateQueries({ queryKey: ['guestbook'] })
    },
  })
}