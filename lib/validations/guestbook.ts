import { z } from 'zod'

/**
 * Skema validasi untuk Guestbook form.
 * Zod v4 syntax — gunakan `message` untuk custom error.
 */
export const guestbookFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama minimal 2 karakter' })
    .max(100, { message: 'Nama maksimal 100 karakter' })
    .trim(),
  message: z
    .string()
    .min(5, { message: 'Pesan minimal 5 karakter' })
    .max(500, { message: 'Pesan maksimal 500 karakter' })
    .trim(),
})

export type GuestbookFormData = z.infer<typeof guestbookFormSchema>