'use client'

import { useState } from 'react'
import {
  useAllGuestbookEntries,
  useUpdateGuestbookEntry,
  useDeleteGuestbookEntry,
} from '@/lib/queries/admin-guestbook'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate, cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Trash2,
  Loader2,
} from 'lucide-react'

type FilterTab = 'all' | 'pending' | 'approved'

export default function AdminGuestbookPage() {
  const { data: entries, isLoading, isError } = useAllGuestbookEntries()
  const updateMutation = useUpdateGuestbookEntry()
  const deleteMutation = useDeleteGuestbookEntry()
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  // Filter entries berdasarkan tab aktif
  const filteredEntries = entries?.filter((entry) => {
    if (activeTab === 'pending') return !entry.is_approved
    if (activeTab === 'approved') return entry.is_approved
    return true
  })

  const pendingCount = entries?.filter((e) => !e.is_approved).length ?? 0

  function handleToggleApprove(id: string, currentStatus: boolean): void {
    updateMutation.mutate(
      { id, is_approved: !currentStatus },
      {
        onSuccess: () => {
          toast.success(
            !currentStatus ? 'Pesan disetujui dan kini tampil publik.' : 'Pesan ditarik dari tampilan publik.'
          )
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
      <div>
        <h2 className="font-sans text-2xl font-bold tracking-tight">
          Guestbook Moderation
        </h2>
        <p className="mt-1 text-muted-foreground">
          Kelola pesan pengunjung. Pesan yang disetujui akan tampil di halaman publik.
        </p>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              Gagal memuat guestbook. Silakan refresh halaman.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as FilterTab)}
      >
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-border/40 bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredEntries && filteredEntries.length === 0 && (
            <Card className="border-dashed border-border/40 bg-card/30">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Tidak ada pesan di kategori ini</p>
                <p className="text-sm text-muted-foreground">
                  Pesan baru akan muncul di sini saat pengunjung mengirim ke guestbook.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Entries List */}
          {!isLoading && filteredEntries && filteredEntries.length > 0 && (
            <div className="space-y-3">
              {filteredEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className={cn(
                    'border-border/40 bg-card/50 transition-colors',
                    !entry.is_approved && 'border-l-4 border-l-yellow-500'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      {/* Message Content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{entry.name}</span>
                          <Badge
                            variant={entry.is_approved ? 'default' : 'secondary'}
                            className={cn(
                              entry.is_approved
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                            )}
                          >
                            {entry.is_approved ? 'Approved' : 'Pending'}
                          </Badge>
                          <span className="font-mono text-xs text-muted-foreground">
                            {formatDate(entry.created_at)}
                          </span>
                        </div>
                        <p className="break-words text-sm text-muted-foreground">
                          {entry.message}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex shrink-0 gap-2">
                        <Button
                          variant={entry.is_approved ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handleToggleApprove(entry.id, entry.is_approved)}
                          disabled={updateMutation.isPending}
                          className={cn(
                            !entry.is_approved &&
                              'bg-green-600 text-white hover:bg-green-700'
                          )}
                        >
                          {updateMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : entry.is_approved ? (
                            <>
                              <XCircle className="mr-1 h-4 w-4" />
                              Tarik
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(entry.id)}
                          disabled={deleteMutation.isPending}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Hapus pesan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}