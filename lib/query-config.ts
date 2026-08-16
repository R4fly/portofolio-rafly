import type { UseQueryOptions } from '@tanstack/react-query'

/**
 * Default React Query config untuk semua data publik portfolio.
 *
 * Strategi anti-skeleton-abadi:
 * - retry: 3x (jika gagal pertama, coba lagi 3x dengan backoff)
 * - retryDelay: exponential backoff (1s, 2s, 4s)
 * - staleTime: 5 menit (cache lebih lama, kurangi request berulang)
 * - gcTime: 30 menit (garbage collection lebih lambat)
 * - refetchOnWindowFocus: false (jangan spam saat user switch tab)
 * - refetchOnReconnect: true (fetch ulang saat online kembali)
 */
export const PUBLIC_QUERY_OPTIONS = {
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 8000),
  staleTime: 5 * 60 * 1000, // 5 menit
  gcTime: 30 * 60 * 1000, // 30 menit (sebelumnya cacheTime)
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchInterval: false,
} satisfies Partial<UseQueryOptions<unknown, Error, unknown, readonly unknown[]>>

/**
 * Default config untuk query admin (lebih agresif, fresh data)
 */
export const ADMIN_QUERY_OPTIONS = {
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 4000),
  staleTime: 30 * 1000, // 30 detik
  gcTime: 5 * 60 * 1000, // 5 menit
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
} satisfies Partial<UseQueryOptions<unknown, Error, unknown, readonly unknown[]>>