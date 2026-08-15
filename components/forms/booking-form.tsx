'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getSupabaseClient } from '@/lib/supabase/client'
import { bookingFormSchema, type BookingFormData } from '@/lib/validations/booking'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, CalendarIcon, AlertCircle, Code2, Music } from 'lucide-react'

export function BookingForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      client_name: '',
      client_email: '',
      notes: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData): Promise<void> => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('bookings').insert([
        {
          client_name: data.client_name,
          client_email: data.client_email,
          booking_type: data.booking_type,
          scheduled_at: data.scheduled_at.toISOString(),
          notes: data.notes || null,
          status: 'pending',
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      toast.success('Booking berhasil dibuat!')
      form.reset()
      router.push('/thank-you?type=booking')
    },
    onError: (error: Error) => {
      setSubmitError(
        error.message || 'Terjadi kesalahan saat membuat booking. Silakan coba lagi.'
      )
      toast.error('Gagal membuat booking')
    },
  })

  function onSubmit(data: BookingFormData): void {
    setSubmitError(null)
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Server/Network Error Alert */}
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Nama */}
        <FormField
          control={form.control}
          name="client_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nama Anda"
                  autoComplete="name"
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="client_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jenis Sesi (Radio Group) */}
        <FormField
          control={form.control}
          name="booking_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Jenis Sesi</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                  disabled={mutation.isPending}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-border/40 p-3 transition-colors hover:border-primary/50">
                    <FormControl>
                      <RadioGroupItem value="web_consultation" />
                    </FormControl>
                    <FormLabel className="flex cursor-pointer items-center gap-2 font-normal">
                      <Code2 className="h-4 w-4 text-primary" />
                      Konsultasi Web Development
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border border-border/40 p-3 transition-colors hover:border-secondary/50">
                    <FormControl>
                      <RadioGroupItem value="guitar_session" />
                    </FormControl>
                    <FormLabel className="flex cursor-pointer items-center gap-2 font-normal">
                      <Music className="h-4 w-4 text-secondary" />
                      Sesi Gitar / Kolaborasi Musik
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tanggal Sesi — Calendar INLINE (tanpa Popover, aman dari isu Base UI) */}
        <FormField
          control={form.control}
          name="scheduled_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Tanggal Sesi
              </FormLabel>
              <FormControl>
                <div className="rounded-md border border-input bg-background">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Catatan (Optional) */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Catatan <span className="text-muted-foreground">(opsional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tambahkan detail atau preferensi khusus..."
                  rows={3}
                  disabled={mutation.isPending}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button dengan Loading State */}
        <Button
          type="submit"
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses Booking...
            </>
          ) : (
            <>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Jadwalkan Sesi
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}