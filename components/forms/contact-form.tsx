'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getSupabaseClient } from '@/lib/supabase/client'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Send, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData): Promise<void> => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('contact_messages').insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      toast.success('Pesan berhasil dikirim!')
      form.reset()
      router.push('/thank-you?type=contact')
    },
    onError: (error: Error) => {
      setSubmitError(
        error.message || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      )
      toast.error('Gagal mengirim pesan')
    },
  })

  function onSubmit(data: ContactFormData): void {
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
          name="name"
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
          name="email"
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

        {/* Subjek */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjek</FormLabel>
              <FormControl>
                <Input
                  placeholder="Apa yang ingin Anda diskusikan?"
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pesan */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ceritakan kebutuhan proyek atau kolaborasi Anda..."
                  rows={5}
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
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Kirim Pesan
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}