import { z } from 'zod'

/**
 * Skema validasi untuk Track Form (create & edit).
 * duration disimpan sebagai string di form, di-parse manual saat submit
 * agar input kosong bisa jadi null.
 */
export const trackFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Judul minimal 2 karakter' })
    .max(255, { message: 'Judul maksimal 255 karakter' })
    .trim(),
  genre: z
    .string()
    .max(100, { message: 'Genre maksimal 100 karakter' })
    .trim(),
  audio_url: z
    .string()
    .url({ message: 'URL audio tidak valid' }),
  duration: z.string().optional(),
})

export type TrackFormData = z.infer<typeof trackFormSchema>