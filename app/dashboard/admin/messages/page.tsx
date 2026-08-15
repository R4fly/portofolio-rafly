'use client'

import { useState } from 'react'
import {
  useAllContactMessages,
  useUpdateContactMessage,
  useDeleteContactMessage,
} from '@/lib/queries/admin-messages'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate, cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

export default function AdminMessagesPage() {
  const { data: messages, isLoading, isError } = useAllContactMessages()
  const updateMutation = useUpdateContactMessage()
  const deleteMutation = useDeleteContactMessage()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const unreadCount = messages?.filter((m) => !m.is_read).length ?? 0

  function handleToggleExpand(id: string, isRead: boolean): void {
    // Toggle expand/collapse
    setExpandedId((prev) => (prev === id ? null : id))

    // Mark as read saat pertama kali dibuka
    if (!isRead) {
      updateMutation.mutate(
        { id, is_read: true },
        {
          onError: (error: Error) => {
            toast.error(`Gagal menandai dibaca: ${error.message}`)
          },
        }
      )
    }
  }

  function handleToggleRead(id: string, currentStatus: boolean): void {
    updateMutation.mutate(
      { id, is_read: !currentStatus },
      {
        onSuccess: () => {
          toast.success(!currentStatus ? 'Ditandai sebagai dibaca.' : 'Ditandai sebagai belum dibaca.')
        },
        onError: (error: Error) => {
          toast.error(`Gagal mengubah status: ${error.message}`)
        },
      }
    )
  }

  function handleDelete(id: string): void {
    if (!window.confirm('Hapus pesan ini secara permanen? Tindakan ini tidak bisa dibatalkan.')) {
      return
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Pesan berhasil dihapus.')
      },
      onError: (error: Error) => {
        toast.error(`Gagal menghapus pesan: ${error.message}`)
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight">
            Contact Messages
          </h2>
          <p className="mt-1 text-muted-foreground">
            Pesan dari contact form. Klik untuk membaca detail.
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="w-fit">
            {unreadCount} belum dibaca
          </Badge>
        )}
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              Gagal memuat pesan. Silakan refresh halaman.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && messages && messages.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Mail className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium">Belum ada pesan masuk</p>
            <p className="text-sm text-muted-foreground">
              Pesan dari contact form akan muncul di sini.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      {!isLoading && messages && messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((message) => {
            const isExpanded = expandedId === message.id

            return (
              <Card
                key={message.id}
                className={cn(
                  'border-border/40 bg-card/50 transition-colors',
                  !message.is_read && 'border-l-4 border-l-primary'
                )}
              >
                <CardContent className="p-4">
                  {/* Header Row (clickable) */}
                  <button
                    type="button"
                    onClick={() => handleToggleExpand(message.id, message.is_read)}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        {!message.is_read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                        <span className={cn('font-semibold', !message.is_read && 'text-primary')}>
                          {message.subject}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {message.name} • {message.email}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                    <div className="shrink-0 text-muted-foreground">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 border-t border-border/40 pt-4">
                      <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {message.message}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleRead(message.id, message.is_read)}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? (
                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                          ) : message.is_read ? (
                            <Mail className="mr-1 h-4 w-4" />
                          ) : (
                            <MailOpen className="mr-1 h-4 w-4" />
                          )}
                          {message.is_read ? 'Tandai Belum Dibaca' : 'Tandai Dibaca'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(message.id)}
                          disabled={deleteMutation.isPending}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}