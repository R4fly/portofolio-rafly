import { create } from 'zustand'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

interface CookieStore {
  consent: ConsentStatus
  setConsent: (status: 'accepted' | 'declined') => void
  hasConsent: () => boolean
}

/**
 * Zustand store untuk mengelola cookie consent state.
 * 
 * Strategi:
 * - Initial state baca dari localStorage
 * - Set consent juga update localStorage
 * - Komponen subscribe ke store untuk reactivity
 * - Tidak perlu polling lagi (reactive update)
 */
export const useCookieStore = create<CookieStore>((set, get) => ({
  consent: (() => {
    // Only access localStorage in browser
    if (typeof window === 'undefined') return 'pending'
    const stored = localStorage.getItem('cookie-consent')
    if (stored === 'accepted' || stored === 'declined') return stored
    return 'pending'
  })(),

  setConsent: (status: 'accepted' | 'declined') => {
    localStorage.setItem('cookie-consent', status)
    set({ consent: status })
  },

  hasConsent: () => {
    const { consent } = get()
    return consent !== 'pending'
  },
}))