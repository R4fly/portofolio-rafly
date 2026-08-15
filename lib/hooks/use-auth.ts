'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/types/database'

/**
 * Response dari hook useAuth.
 * Berisi data user, session, profile, dan status loading.
 */
export interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

/**
 * Fetch profile dari database berdasarkan user ID.
 */
async function fetchProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle<Profile>()

  if (error) {
    console.error('Failed to fetch profile:', error)
    return null
  }

  return data
}

/**
 * Hook utama untuk akses auth state di seluruh aplikasi.
 * Menggunakan React Query untuk caching profile + listener untuk session changes.
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()
  const supabase = getSupabaseClient()

  // Fetch profile jika user sudah login
  const { data: profile } = useQuery<Profile | null>({
    queryKey: ['profile', user?.id],
    queryFn: () => (user ? fetchProfile(user.id) : Promise.resolve(null)),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 menit
  })

  useEffect(() => {
    // Set initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession)
      setUser(initialSession?.user ?? null)
      setIsLoading(false)
    })

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)

      // Invalidate profile query ketika auth state berubah
      if (newSession?.user) {
        queryClient.invalidateQueries({ queryKey: ['profile', newSession.user.id] })
      } else {
        queryClient.clear()
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, queryClient])

  return {
    user,
    session,
    profile: profile ?? null,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
  }
}

/**
 * Hook untuk handle logout.
 * Redirect ke home setelah logout berhasil.
 */
export function useLogout(): {
  logout: () => Promise<void>
  isLoggingOut: boolean
} {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = getSupabaseClient()

  const logout = async (): Promise<void> => {
    setIsLoggingOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      queryClient.clear()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    } finally {
      setIsLoggingOut(false)
    }
  }

  return { logout, isLoggingOut }
}