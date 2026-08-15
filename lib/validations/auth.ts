import { z } from 'zod'

/**
 * Skema validasi untuk Login Form.
 * Zod v4 syntax — gunakan `message` untuk custom error.
 */
export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Format email tidak valid' })
    .max(255, { message: 'Email terlalu panjang' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password minimal 6 karakter' })
    .max(100, { message: 'Password terlalu panjang' }),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

/**
 * Skema validasi untuk Register Form (jika diperlukan nanti).
 */
export const registerFormSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: 'Nama minimal 2 karakter' })
      .max(100, { message: 'Nama maksimal 100 karakter' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Format email tidak valid' })
      .max(255, { message: 'Email terlalu panjang' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password minimal 8 karakter' })
      .max(100, { message: 'Password terlalu panjang' })
      .regex(/[A-Z]/, { message: 'Password harus mengandung huruf kapital' })
      .regex(/[0-9]/, { message: 'Password harus mengandung angka' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>