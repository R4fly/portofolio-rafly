'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Send } from 'lucide-react'

const guestbookFormSchema = z.object({
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

type GuestbookFormData = z.infer<typeof guestbookFormSchema>

export function GuestbookForm() {
  const queryClient = useQueryClient()

  const form = useForm<GuestbookFormData>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  })

  const submitMutation = useMutation<void, Error, GuestbookFormData>({
    mutationFn: async (data: GuestbookFormData) => {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('guestbook').insert([
        {
          name: data.name,
          message: data.message,
          is_approved: false,
        },
      ])
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      toast.success(
        'Pesan Anda telah dikirim! Akan tampil setelah disetujui admin.'
      )
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['guestbook'] })
    },
    onError: (error: Error) => {
      toast.error(`Gagal mengirim pesan: ${error.message}`)
    },
  })

  function onSubmit(data: GuestbookFormData): void {
    submitMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="guestbook-name">
                Nama <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="guestbook-name"
                  type="text"
                  placeholder="Nama Anda"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'guestbook-name-error' : undefined}
                  disabled={submitMutation.isPending}
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage id="guestbook-name-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="guestbook-message">
                Pesan <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  id="guestbook-message"
                  placeholder="Tulis pesan, kesan, atau pertanyaan Anda..."
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'guestbook-message-error' : undefined}
                  disabled={submitMutation.isPending}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage id="guestbook-message-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={submitMutation.isPending}
          aria-label={submitMutation.isPending ? 'Mengirim pesan...' : 'Kirim pesan'}
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span aria-live="polite">Mengirim...</span>
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              Kirim Pesan
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}