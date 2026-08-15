import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { ContactMessage } from '@/types/database'

/**
 * Fetch semua contact messages (untuk admin).
 * RLS policy memastikan hanya admin yang bisa baca.
 */
export async function fetchAllContactMessages(): Promise<ContactMessage[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<ContactMessage[]>()

  if (error) {
    throw new Error(`Failed to fetch contact messages: ${error.message}`)
  }

  return data ?? []
}

export function useAllContactMessages() {
  return useQuery<ContactMessage[]>({
    queryKey: ['admin', 'contact-messages'],
    queryFn: fetchAllContactMessages,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  })
}

/**
 * Mutation untuk mark read/unread contact message.
 */
export function useUpdateContactMessage() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; is_read: boolean }>({
    mutationFn: async ({ id, is_read }) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contact-messages'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
    },
  })
}

/**
 * Mutation untuk delete contact message permanen.
 */
export function useDeleteContactMessage() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contact-messages'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
    },
  })
}