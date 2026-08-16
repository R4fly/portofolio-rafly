'use client'

import { useEffect, useState } from 'react'

/**
 * Hook untuk detect loading yang terlalu lama (>10 detik).
 *
 * Jika loading masih true setelah timeout, return true
 * sehingga komponen bisa tampilkan error state.
 *
 * Mencegah "skeleton abadi" yang bikin user bingung.
 */
export function useLoadingTimeout(
  isLoading: boolean,
  timeoutMs = 10000 // 10 detik default
): boolean {
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setTimedOut(false)
      return
    }

    const timer = window.setTimeout(() => {
      setTimedOut(true)
    }, timeoutMs)

    return (): void => {
      window.clearTimeout(timer)
    }
  }, [isLoading, timeoutMs])

  return timedOut
}