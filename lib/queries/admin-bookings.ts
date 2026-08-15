import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Booking } from '@/types/database'

/**
 * Fetch semua bookings untuk admin view.
 * RLS policy is_admin() memastikan hanya admin yang bisa akses.
 */
export async function fetchAllBookingsAdmin(): Promise<Booking[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('scheduled_at', { ascending: false })
    .returns<Booking[]>()

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`)
  }

  return data ?? []
}

export function useAllBookingsAdmin() {
  return useQuery<Booking[]>({
    queryKey: ['admin', 'bookings'],
    queryFn: fetchAllBookingsAdmin,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  })
}

/**
 * Mutation untuk mengubah status booking.
 * Status valid: 'pending' | 'confirmed' | 'cancelled'
 */
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; status: Booking['status'] }>({
    mutationFn: async ({ id, status }) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] })
      // Update juga view booking milik client
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}