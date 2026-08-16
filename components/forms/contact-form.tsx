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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name + Email - stack di mobile, side-by-side di desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={addMessageMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    disabled={addMessageMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjek *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Konsultasi proyek web development"
                  disabled={addMessageMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesan *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ceritakan kebutuhan atau ide Anda..."
                  rows={5}
                  disabled={addMessageMutation.isPending}
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
          disabled={addMessageMutation.isPending}
        >
          {addMessageMutation.isPending ? (
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