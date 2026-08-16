'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAddBooking } from '@/lib/queries/bookings'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Loader2, CalendarCheck } from 'lucide-react'

const bookingFormSchema = z.object({
  client_name: z.string().min(2, { message: 'Nama minimal 2 karakter' }).max(100).trim(),
  client_email: z.string().email({ message: 'Email tidak valid' }).max(255).trim(),
  booking_type: z.enum(['web_consultation', 'guitar_session'], { message: 'Pilih tipe sesi' }),
  scheduled_at: z.string().min(1, { message: 'Tanggal dan waktu wajib diisi' }),
  notes: z.string().max(1000).optional(),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

export function BookingForm() {
  const router = useRouter()
  const addBookingMutation = useAddBooking()

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      client_name: '',
      client_email: '',
      booking_type: 'web_consultation',
      scheduled_at: '',
      notes: '',
    },
  })

  function onSubmit(data: BookingFormData): void {
    const scheduledAtISO = new Date(data.scheduled_at).toISOString()

    addBookingMutation.mutate(
      {
        client_name: data.client_name,
        client_email: data.client_email,
        booking_type: data.booking_type,
        scheduled_at: scheduledAtISO,
        notes: data.notes?.trim() || null,
      },
      {
        onSuccess: () => {
          toast.success('Booking berhasil dijadwalkan! Anda akan menerima konfirmasi via email.')
          form.reset()
          router.push('/thank-you')
        },
        onError: (error: Error) => {
          toast.error(`Gagal menjadwalkan booking: ${error.message}`)
        },
      }
    )
  }

  const now = new Date()
  const minDate = now.toISOString().slice(0, 16)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="client_name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="booking-name">
                  Nama Lengkap <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="booking-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'booking-name-error' : undefined}
                    disabled={addBookingMutation.isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage id="booking-name-error" role="alert" />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client_email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="booking-email">
                  Email <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'booking-email-error' : undefined}
                    disabled={addBookingMutation.isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage id="booking-email-error" role="alert" />
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Booking Type */}
        <FormField
          control={form.control}
          name="booking_type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="booking-type">
                Tipe Sesi <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={addBookingMutation.isPending}
              >
                <FormControl>
                  <SelectTrigger
                    id="booking-type"
                    aria-required="true"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'booking-type-error' : 'booking-type-desc'}
                  >
                    <SelectValue placeholder="Pilih tipe sesi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web_consultation">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Konsultasi Web (1 jam)
                    </div>
                  </SelectItem>
                  <SelectItem value="guitar_session">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Sesi Gitar (1 jam)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription id="booking-type-desc">
                Konsultasi gratis untuk sesi pertama
              </FormDescription>
              {fieldState.error && (
                <FormMessage id="booking-type-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        {/* Scheduled At */}
        <FormField
          control={form.control}
          name="scheduled_at"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="booking-datetime">
                Tanggal & Waktu <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="booking-datetime"
                  type="datetime-local"
                  min={minDate}
                  required
                  aria-required="true"
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'booking-datetime-error' : 'booking-datetime-desc'}
                  disabled={addBookingMutation.isPending}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription id="booking-datetime-desc">
                Pilih waktu yang sesuai (WIB). Saya akan konfirmasi ulang.
              </FormDescription>
              {fieldState.error && (
                <FormMessage id="booking-datetime-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="booking-notes">Catatan Tambahan</FormLabel>
              <FormControl>
                <Textarea
                  id="booking-notes"
                  placeholder="Topik yang ingin dibahas, atau hal lain yang perlu saya ketahui..."
                  rows={4}
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'booking-notes-error' : undefined}
                  disabled={addBookingMutation.isPending}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage id="booking-notes-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={addBookingMutation.isPending}
          aria-label={addBookingMutation.isPending ? 'Menjadwalkan sesi...' : 'Jadwalkan sesi'}
        >
          {addBookingMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span aria-live="polite">Menjadwalkan...</span>
            </>
          ) : (
            <>
              <CalendarCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              Jadwalkan Sesi
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}