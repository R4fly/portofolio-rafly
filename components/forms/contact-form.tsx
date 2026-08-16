'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAddContactMessage } from '@/lib/queries/contact'
import {
  contactFormSchema,
  type ContactFormData,
} from '@/lib/validations/contact'
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

export function ContactForm() {
  const router = useRouter()
  const addMessageMutation = useAddContactMessage()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  function onSubmit(data: ContactFormData): void {
    addMessageMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Pesan Anda berhasil dikirim! Saya akan merespons dalam 24 jam.')
        form.reset()
        router.push('/thank-you')
      },
      onError: (error: Error) => {
        toast.error(`Gagal mengirim pesan: ${error.message}`)
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="contact-name">
                  Nama Lengkap <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'contact-name-error' : undefined}
                    disabled={addMessageMutation.isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage id="contact-name-error" role="alert" />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="contact-email">
                  Email <span className="text-destructive" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'contact-email-error' : undefined}
                    disabled={addMessageMutation.isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage id="contact-email-error" role="alert" />
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="contact-subject">
                Subjek <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="contact-subject"
                  type="text"
                  placeholder="Konsultasi proyek web development"
                  required
                  aria-required="true"
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'contact-subject-error' : undefined}
                  disabled={addMessageMutation.isPending}
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage id="contact-subject-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="contact-message">
                Pesan <span className="text-destructive" aria-hidden="true">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  id="contact-message"
                  placeholder="Ceritakan kebutuhan atau ide Anda..."
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={fieldState.error ? 'true' : 'false'}
                  aria-describedby={fieldState.error ? 'contact-message-error' : undefined}
                  disabled={addMessageMutation.isPending}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage id="contact-message-error" role="alert" />
              )}
            </FormItem>
          )}
        />

        {/* Submit Button — FIX: Use button type="submit", not nested in link */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={addMessageMutation.isPending}
          aria-label={addMessageMutation.isPending ? 'Mengirim pesan...' : 'Kirim pesan'}
        >
          {addMessageMutation.isPending ? (
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