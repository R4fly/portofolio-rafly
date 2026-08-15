import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Message } from '@/types/database'

/**
 * Fetch semua pesan yang melibatkan user yang sedang login.
 * RLS policy memastikan user hanya bisa lihat pesan mereka sendiri.
 */
export async function fetchUserMessages(): Promise<Message[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true })
    .returns<Message[]>()

  if (error) {
    throw new Error(`Failed to fetch messages: ${error.message}`)
  }

  return data ?? []
}

export function useUserMessages() {
  return useQuery<Message[]>({
    queryKey: ['messages', 'user'],
    queryFn: fetchUserMessages,
    staleTime: 30 * 1000, // 30 detik — realtime data
    refetchOnWindowFocus: true,
  })
}

/**
 * Fetch percakapan antara user dan admin.
 * Untuk sekarang kita asumsikan hanya ada 1 admin.
 */
export async function fetchConversationWithAdmin(
  adminId: string,
  userId: string
): Promise<Message[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${adminId}),and(sender_id.eq.${adminId},receiver_id.eq.${userId})`
    )
    .order('created_at', { ascending: true })
    .returns<Message[]>()

  if (error) {
    throw new Error(`Failed to fetch conversation: ${error.message}`)
  }

  return data ?? []
}

export function useConversation(adminId: string, userId: string) {
  return useQuery<Message[]>({
    queryKey: ['messages', 'conversation', adminId, userId],
    queryFn: () => fetchConversationWithAdmin(adminId, userId),
    enabled: !!adminId && !!userId,
    staleTime: 10 * 1000, // 10 detik — realtime data
    refetchOnWindowFocus: true,
  })
}

interface SendMessageInput {
  sender_id: string
  receiver_id: string
  message_text: string
}

/**
 * Mutation untuk mengirim pesan baru.
 * Optimistic update agar pesan langsung muncul di UI sebelum server konfirmasi.
 */
export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, SendMessageInput, { previous: Message[] | undefined }>({
    mutationFn: async (input: SendMessageInput): Promise<void> => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('messages').insert([
        {
          sender_id: input.sender_id,
          receiver_id: input.receiver_id,
          message_text: input.message_text,
          is_read: false,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
    },
    onMutate: async (input: SendMessageInput) => {
      // Batalkan query yang sedang berjalan untuk hindari conflict
      await queryClient.cancelQueries({ queryKey: ['messages'] })

      // Simpan snapshot untuk rollback jika error
      const previous = queryClient.getQueryData<Message[]>(['messages', 'user'])

      // Buat pesan optimistik dengan ID sementara
      const optimisticMessage: Message = {
        id: crypto.randomUUID(),
        sender_id: input.sender_id,
        receiver_id: input.receiver_id,
        message_text: input.message_text,
        is_read: false,
        created_at: new Date().toISOString(),
      }

      // Update cache langsung — UI merespons instant
      queryClient.setQueryData<Message[]>(['messages', 'user'], (old) => [
        ...(old ?? []),
        optimisticMessage,
      ])

      return { previous }
    },
    onError: (_error, _variables, context) => {
      // Rollback ke state sebelumnya jika mutation gagal
      if (context?.previous) {
        queryClient.setQueryData(['messages', 'user'], context.previous)
      }
    },
    onSettled: () => {
      // Sinkronisasi dengan database setelah selesai (sukses atau gagal)
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}