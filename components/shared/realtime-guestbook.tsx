'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useGuestbook, useAddGuestbookEntry } from '@/lib/queries/guestbook'
import type { GuestbookEntry } from '@/lib/queries/guestbook'
import { useRealtimeGuestbook } from '@/lib/hooks/use-realtime-guestbook'
import { guestbookFormSchema, type GuestbookFormData } from '@/lib/validations/guestbook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formatDate, cn } from '@/lib/utils'
import { Loader2, Send, MessageCircle, Radio } from 'lucide-react'

/**
 * Sub-component: Card untuk setiap pesan guestbook.
 * Co-located karena hanya dipakai di RealtimeGuestbook.
 */
function GuestbookMessageCard({ entry }: { entry: GuestbookEntry }) {
  const initials = entry.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card
      className={cn(
        'animate-fade-in border-border/40 bg-card/50 backdrop-blur',
        'transition-all duration-300 hover:border-primary/30'
      )}
    >
      <CardContent className="flex gap-4 p-5">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/10 font-mono text-sm font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-sans text-sm font-semibold text-foreground">
              {entry.name}
            </span>
            <time className="font-mono text-xs text-muted-foreground">
              {formatDate(entry.created_at)}
            </time>
          </div>
          <p className="break-words text-sm leading-relaxed text-muted-foreground">
            {entry.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Sub-component: Skeleton loading untuk message list.
 */
function GuestbookSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="border-border/40 bg-card/50">
          <CardContent className="flex gap-4 p-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function RealtimeGuestbook() {
  const { data: entries, isLoading } = useGuestbook()
  const addEntryMutation = useAddGuestbookEntry()

  // Subscribe ke realtime updates
  useRealtimeGuestbook()

  const form = useForm<GuestbookFormData>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  })

  function onSubmit(data: GuestbookFormData): void {
    addEntryMutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        toast.success('Pesan Anda berhasil dikirim!')
      },
      onError: (error: Error) => {
        toast.error(`Gagal mengirim pesan: ${error.message}`)
      },
    })
  }

  return (
    <section className="container py-16 md:py-24" id="guestbook">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
          <Radio className="h-4 w-4 animate-pulse text-primary" />
          <span className="text-sm font-medium text-primary">Live Realtime</span>
        </div>
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Buku <span className="text-primary">Tamu</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Tinggalkan jejak Anda. Setiap pesan muncul secara realtime di layar
          semua pengunjung tanpa perlu reload.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form Submit */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-border/40 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama Anda"
                            autoComplete="name"
                            disabled={addEntryMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tulis pesan untuk Rafly..."
                            rows={4}
                            disabled={addEntryMutation.isPending}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={addEntryMutation.isPending}
                  >
                    {addEntryMutation.isPending ? (
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
            </CardContent>
          </Card>
        </div>

        {/* Message List */}
        <div className="space-y-4">
          {/* Loading State */}
          {isLoading && <GuestbookSkeleton />}

          {/* Empty State */}
          {!isLoading && entries && entries.length === 0 && (
            <Card className="border-dashed border-border/40 bg-card/30">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <MessageCircle className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium text-foreground">Belum ada pesan</p>
                <p className="text-sm text-muted-foreground">
                  Jadilah yang pertama meninggalkan pesan!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Messages */}
          {!isLoading &&
            entries &&
            entries.map((entry) => (
              <GuestbookMessageCard key={entry.id} entry={entry} />
            ))}
        </div>
      </div>
    </section>
  )
}