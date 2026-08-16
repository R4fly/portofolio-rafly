'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAddBooking } from '@/lib/queries/bookings'
import {
  bookingFormSchema,
  type BookingFormData,
} from '@/lib/validations/booking'
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
    addBookingMutation.mutate(data, {
      onSuccess: () => {
        toast.success(
          'Booking berhasil dijadwalkan! Anda akan menerima konfirmasi via email.'
        )
        form.reset()
        router.push('/thank-you')
      },
      onError: (error: Error) => {
        toast.error(`Gagal menjadwalkan booking: ${error.message}`)
      },
    })
  }

  // Min date = sekarang (hindari booking di masa lalu)
  const now = new Date()
  const minDate = now.toISOString().slice(0, 16)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name + Email - stack di mobile, side-by-side di desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={addBookingMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    disabled={addBookingMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Booking Type */}
        <FormField
          control={form.control}
          name="booking_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Sesi *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={addBookingMutation.isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe sesi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web_consultation">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      Konsultasi Web (1 jam)
                    </div>
                  </SelectItem>
                  <SelectItem value="guitar_session">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      Sesi Gitar (1 jam)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Konsultasi gratis untuk sesi pertama
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Scheduled At */}
        <FormField
          control={form.control}
          name="scheduled_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal & Waktu *</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  min={minDate}
                  disabled={addBookingMutation.isPending}
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pilih waktu yang sesuai (WIB). Saya akan konfirmasi ulang.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan Tambahan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Topik yang ingin dibahas, atau hal lain yang perlu saya ketahui..."
                  rows={4}
                  disabled={addBookingMutation.isPending}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={addBookingMutation.isPending}
        >
          {addBookingMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menjadwalkan...
            </>
          ) : (
            <>
              <CalendarCheck className="mr-2 h-4 w-4" />
              Jadwalkan Sesi
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}