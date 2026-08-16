import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import { PUBLIC_QUERY_OPTIONS } from '@/lib/query-config'

export interface GuestbookEntry {
  id: string
  name: string
  message: string
  is_approved: boolean
  created_at: string
}

export function useGuestbook() {
  return useQuery<GuestbookEntry[], Error>({
    queryKey: ['guestbook'],
    queryFn: async (): Promise<GuestbookEntry[]> => {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('guestbook')
        .select('id, name, message, is_approved, created_at')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw new Error(error.message)
      return (data || []) as GuestbookEntry[]
    },
    ...PUBLIC_QUERY_OPTIONS,
  })
}