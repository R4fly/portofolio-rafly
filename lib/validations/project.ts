import { z } from 'zod'

/**
 * Skema validasi untuk Project Form (create & edit).
 * Field URL menggunakan pattern `.url().or(z.literal(''))` agar
 * boleh kosong tapi harus valid URL jika diisi.
 */
export const projectFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Judul minimal 2 karakter' })
    .max(255, { message: 'Judul maksimal 255 karakter' })
    .trim(),
  slug: z
    .string()
    .max(255, { message: 'Slug maksimal 255 karakter' })
    .trim(),
  description: z
    .string()
    .max(2000, { message: 'Deskripsi maksimal 2000 karakter' }),
  thumbnail_url: z
    .string()
    .url({ message: 'URL thumbnail tidak valid' })
    .or(z.literal('')),
  tech_stack_input: z
    .string()
    .max(500, { message: 'Tech stack terlalu panjang' }),
  live_url: z
    .string()
    .url({ message: 'URL live tidak valid' })
    .or(z.literal('')),
  repository_url: z
    .string()
    .url({ message: 'URL repository tidak valid' })
    .or(z.literal('')),
  is_featured: z.boolean(),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>