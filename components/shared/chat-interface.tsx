'use client'

import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useAuth } from '@/lib/hooks/use-auth'
import { useSendMessage, useUserMessages } from '@/lib/queries/messages'
import { useRealtimeMessages } from '@/lib/hooks/use-realtime-messages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Send, Loader2, MessageCircle } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

const messageSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'Pesan tidak boleh kosong' })
    .max(1000, { message: 'Pesan maksimal 1000 karakter' })
    .trim(),
})

type MessageFormData = z.infer<typeof messageSchema>

interface ChatInterfaceProps {
  adminId: string
}

export function ChatInterface({ adminId }: ChatInterfaceProps) {
  const { user, profile } = useAuth()
  const { data: messages, isLoading } = useUserMessages()
  const sendMessageMutation = useSendMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Subscribe ke realtime updates
  useRealtimeMessages()

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
    },
  })

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function onSubmit(data: MessageFormData): void {
    if (!user) return

    sendMessageMutation.mutate(
      {
        sender_id: user.id,
        receiver_id: adminId,
        message_text: data.text,
      },
      {
        onSuccess: () => {
          form.reset()
        },
        onError: (error: Error) => {
          toast.error(`Gagal mengirim pesan: ${error.message}`)
        },
      }
    )
  }

  if (!user) {
    return (
      <Card className="border-border/40 bg-card/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Silakan login untuk mengakses chat.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex h-[600px] flex-col border-border/40 bg-card/50 backdrop-blur">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
          Live Chat dengan Developer
        </CardTitle>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-y-auto p-4">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={cn('flex gap-3', i % 2 === 0 ? 'justify-end' : 'justify-start')}
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-64" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && messages && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">Belum Ada Pesan</h3>
            <p className="text-sm text-muted-foreground">
              Mulai percakapan dengan mengirim pesan di bawah.
            </p>
          </div>
        )}

        {/* Messages List */}
        {!isLoading && messages && messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.sender_id === user.id
              const senderName = isOwnMessage
                ? profile?.full_name || 'Anda'
                : 'Rafly (Developer)'
              const initials = senderName
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()

              return (
                <div
                  key={message.id}
                  className={cn('flex gap-3', isOwnMessage ? 'justify-end' : 'justify-start')}
                >
                  {!isOwnMessage && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      'max-w-[70%] space-y-1',
                      isOwnMessage ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-2 text-xs',
                        isOwnMessage ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <span className="font-medium text-foreground">{senderName}</span>
                      <span className="text-muted-foreground">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2',
                        isOwnMessage
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      <p className="break-words text-sm leading-relaxed">
                        {message.message_text}
                      </p>
                    </div>
                  </div>

                  {isOwnMessage && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-secondary/10 text-xs font-semibold text-secondary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      {/* Message Input */}
      <div className="border-t border-border/40 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Ketik pesan Anda..."
                      disabled={sendMessageMutation.isPending}
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={sendMessageMutation.isPending}
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  )
}