import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface GuestbookEntry {
  id: string
  name: string
  message: string
  is_approved: boolean
  created_at: string
}

interface GuestbookInsertInput {
  name: string
  message: string
}

export async function fetchGuestbookEntries(): Promise<GuestbookEntry[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(50)
    .returns<GuestbookEntry[]>()

  if (error) {
    throw new Error(`Failed to fetch guestbook entries: ${error.message}`)
  }

  return data ?? []
}

export function useGuestbook() {
  return useQuery<GuestbookEntry[]>({
    queryKey: ['guestbook'],
    queryFn: fetchGuestbookEntries,
    staleTime: 10 * 1000, // 10 detik — data realtime
  })
}

/**
 * Mutation untuk menambah entri guestbook dengan OPTIMISTIC UPDATE.
 * Pesan langsung muncul di UI sebelum server konfirmasi,
 * lalu sinkronisasi via invalidateQueries + realtime subscription.
 */
export function useAddGuestbookEntry() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, GuestbookInsertInput, { previous: GuestbookEntry[] | undefined }>({
    mutationFn: async (entry: GuestbookInsertInput): Promise<void> => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('guestbook').insert([
        {
          name: entry.name,
          message: entry.message,
          is_approved: true,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
    },
    onMutate: async (entry: GuestbookInsertInput) => {
      // Batalkan query yang sedang berjalan untuk hindari conflict
      await queryClient.cancelQueries({ queryKey: ['guestbook'] })

      // Simpan snapshot untuk rollback jika error
      const previous = queryClient.getQueryData<GuestbookEntry[]>(['guestbook'])

      // Buat entri optimistik dengan ID sementara
      const optimisticEntry: GuestbookEntry = {
        id: crypto.randomUUID(),
        name: entry.name,
        message: entry.message,
        is_approved: true,
        created_at: new Date().toISOString(),
      }

      // Update cache langsung — UI merespons instant
      queryClient.setQueryData<GuestbookEntry[]>(['guestbook'], (old) => [
        optimisticEntry,
        ...(old ?? []),
      ])

      return { previous }
    },
    onError: (_error, _variables, context) => {
      // Rollback ke state sebelumnya jika mutation gagal
      if (context?.previous) {
        queryClient.setQueryData(['guestbook'], context.previous)
      }
    },
    onSettled: () => {
      // Sinkronisasi dengan database setelah selesai (sukses atau gagal)
      queryClient.invalidateQueries({ queryKey: ['guestbook'] })
    },
  })
}