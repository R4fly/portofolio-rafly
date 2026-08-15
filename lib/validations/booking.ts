import { z } from 'zod'

/**
 * Skema validasi untuk Booking Form.
 * scheduled_at harus date di masa depan (tidak boleh booking untuk masa lalu).
 */
export const bookingFormSchema = z.object({
  client_name: z
    .string()
    .min(2, { message: 'Nama minimal 2 karakter' })
    .max(255, { message: 'Nama maksimal 255 karakter' })
    .trim(),
  client_email: z
    .string()
    .email({ message: 'Format email tidak valid' })
    .max(255, { message: 'Email terlalu panjang' })
    .trim(),
  booking_type: z.enum(['web_consultation', 'guitar_session'], {
    errorMap: () => ({ message: 'Pilih jenis sesi terlebih dahulu' }),
  }),
  scheduled_at: z.date({
    required_error: 'Pilih tanggal dan waktu sesi',
    invalid_type_error: 'Pilih tanggal dan waktu sesi',
  }),
  notes: z
    .string()
    .max(1000, { message: 'Catatan maksimal 1000 karakter' })
    .optional()
    .or(z.literal('')),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>