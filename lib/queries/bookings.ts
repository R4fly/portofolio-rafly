import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Booking } from '@/types/database'

/**
 * Fetch semua bookings milik user yang sedang login.
 * RLS policy memastikan user hanya bisa lihat booking mereka sendiri.
 */
export async function fetchUserBookings(): Promise<Booking[]> {
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

export function useUserBookings() {
  return useQuery<Booking[]>({
    queryKey: ['bookings', 'user'],
    queryFn: fetchUserBookings,
    staleTime: 2 * 60 * 1000, // 2 menit
    refetchOnWindowFocus: true,
  })
}

/**
 * Fetch satu booking berdasarkan ID.
 */
export async function fetchBookingById(bookingId: string): Promise<Booking | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .maybeSingle<Booking>()

  if (error) {
    throw new Error(`Failed to fetch booking: ${error.message}`)
  }

  return data
}

export function useBooking(bookingId: string) {
  return useQuery<Booking | null>({
    queryKey: ['bookings', bookingId],
    queryFn: () => fetchBookingById(bookingId),
    enabled: !!bookingId,
    staleTime: 2 * 60 * 1000,
  })
}