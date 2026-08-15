import { z } from 'zod'

/**
 * Skema validasi untuk Booking Form.
 * Zod v4 syntax — gunakan `message` untuk custom error.
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
    message: 'Pilih jenis sesi terlebih dahulu',
  }),
  scheduled_at: z.date({
    message: 'Pilih tanggal dan waktu sesi',
  }),
  notes: z
    .string()
    .max(1000, { message: 'Catatan maksimal 1000 karakter' })
    .optional()
    .or(z.literal('')),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>