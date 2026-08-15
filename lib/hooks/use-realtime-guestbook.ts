'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { GuestbookEntry } from '@/lib/queries/guestbook'

/**
 * Subscribe ke INSERT event pada tabel guestbook.
 * Ketika ada pesan baru dari pengunjung lain, langsung update cache React Query
 * sehingga semua client melihat pesan tanpa reload.
 */
export function useRealtimeGuestbook(): void {
  const queryClient = useQueryClient()

  useEffect(() => {
    const supabase = getSupabaseClient()

    const channel = supabase
      .channel('guestbook-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook',
        },
        (payload) => {
          const newEntry = payload.new as GuestbookEntry

          // Abaikan pesan yang belum approved
          if (!newEntry.is_approved) return

          queryClient.setQueryData<GuestbookEntry[]>(['guestbook'], (old) => {
            if (!old) return [newEntry]

            // Cegah duplicate saat optimistic update + realtime event tiba bersamaan
            if (old.some((entry) => entry.id === newEntry.id)) return old

            return [newEntry, ...old]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}