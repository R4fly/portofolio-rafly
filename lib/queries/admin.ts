import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

/**
 * Statistik ringkasan untuk Admin Dashboard overview.
 * Menggunakan count query dengan head:true untuk efisiensi
 * (tidak fetch semua row, hanya hitung jumlahnya).
 */
export interface AdminStats {
  pendingBookings: number
  unreadMessages: number
  pendingGuestbook: number
  totalProjects: number
  totalTracks: number
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const supabase = getSupabaseClient()

  // Jalankan semua count query secara paralel untuk performa
  const [
    bookingsResult,
    messagesResult,
    guestbookResult,
    projectsResult,
    tracksResult,
  ] = await Promise.all([
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false),
    supabase
      .from('guestbook')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', false),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('tracks')
      .select('*', { count: 'exact', head: true }),
  ])

  // Cek error dari setiap query
  const errors = [
    bookingsResult.error,
    messagesResult.error,
    guestbookResult.error,
    projectsResult.error,
    tracksResult.error,
  ].filter(Boolean)

  if (errors.length > 0) {
    throw new Error(`Failed to fetch admin stats: ${errors[0]?.message}`)
  }

  return {
    pendingBookings: bookingsResult.count ?? 0,
    unreadMessages: messagesResult.count ?? 0,
    pendingGuestbook: guestbookResult.count ?? 0,
    totalProjects: projectsResult.count ?? 0,
    totalTracks: tracksResult.count ?? 0,
  }
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ['admin', 'stats'],
    queryFn: fetchAdminStats,
    staleTime: 30 * 1000, // 30 detik — data sering berubah
    refetchOnWindowFocus: true,
  })
}