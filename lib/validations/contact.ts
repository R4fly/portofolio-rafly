import { z } from 'zod'

/**
 * Skema validasi untuk Contact Form.
 * Digunakan oleh Zod Resolver di react-hook-form untuk validasi client-side.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama minimal 2 karakter' })
    .max(100, { message: 'Nama maksimal 100 karakter' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Format email tidak valid' })
    .max(255, { message: 'Email terlalu panjang' })
    .trim(),
  subject: z
    .string()
    .min(3, { message: 'Subjek minimal 3 karakter' })
    .max(255, { message: 'Subjek maksimal 255 karakter' })
    .trim(),
  message: z
    .string()
    .min(10, { message: 'Pesan minimal 10 karakter' })
    .max(2000, { message: 'Pesan maksimal 2000 karakter' })
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>