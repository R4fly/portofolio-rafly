'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'

/**
 * Subscribe ke INSERT dan UPDATE event pada tabel messages.
 * Ketika ada perubahan, invalidate queries untuk trigger refetch.
 * RLS memastikan user hanya mendapat pesan yang relevan.
 */
export function useRealtimeMessages(): void {
  const queryClient = useQueryClient()

  useEffect(() => {
    const supabase = getSupabaseClient()

    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        () => {
          // Invalidate semua queries messages untuk trigger refetch.
          // RLS akan memastikan user hanya dapat pesan mereka sendiri.
          queryClient.invalidateQueries({ queryKey: ['messages'] })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
        },
        () => {
          // Invalidate saat ada update (misal: mark as read)
          queryClient.invalidateQueries({ queryKey: ['messages'] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}