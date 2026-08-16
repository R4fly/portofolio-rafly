import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

export interface ContactMessageInput {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Mutation untuk menambahkan contact message baru.
 * Message akan muncul di admin dashboard sebagai "unread".
 */
export function useAddContactMessage() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ContactMessageInput>({
    mutationFn: async (input: ContactMessageInput) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('contact_messages').insert([
        {
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          is_read: false,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] })
    },
  })
}