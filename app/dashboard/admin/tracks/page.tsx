'use client'

import { useState } from 'react'
import {
  useAllTracksAdmin,
  useCreateTrack,
  useUpdateTrack,
  useDeleteTrack,
  type TrackInput,
} from '@/lib/queries/admin-tracks'
import { TrackForm } from '@/components/forms/track-form'
import type { TrackFormData } from '@/lib/validations/track'
import type { Track } from '@/types/database'
import { formatTime } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { Music, Plus, Pencil, Trash2 } from 'lucide-react'

export default function AdminTracksPage() {
  const { data: tracks, isLoading, isError } = useAllTracksAdmin()
  const createMutation = useCreateTrack()
  const updateMutation = useUpdateTrack()
  const deleteMutation = useDeleteTrack()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTrack, setEditingTrack] = useState<Track | null>(null)

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  function openCreateDialog(): void {
    setEditingTrack(null)
    setDialogOpen(true)
  }

  function openEditDialog(track: Track): void {
    setEditingTrack(track)
    setDialogOpen(true)
  }

  function closeDialog(): void {
    setDialogOpen(false)
    setEditingTrack(null)
  }

  function handleDelete(track: Track): void {
    if (!window.confirm(`Hapus track "${track.title}" secara permanen?`)) {
      return
    }

    deleteMutation.mutate(track.id, {
      onSuccess: () => {
        toast.success(`Track "${track.title}" berhasil dihapus.`)
      },
      onError: (error: Error) => {
        toast.error(`Gagal menghapus track: ${error.message}`)
      },
    })
  }

  function handleSubmitForm(data: TrackFormData): void {
    const duration = data.duration ? parseInt(data.duration, 10) : null

    const payload: TrackInput = {
      title: data.title,
      genre: data.genre.trim() || null,
      audio_url: data.audio_url,
      duration: isNaN(duration as number) ? null : duration,
    }

    if (editingTrack) {
      updateMutation.mutate(
        { id: editingTrack.id, data: payload },
        {
          onSuccess: () => {
            toast.success(`Track "${payload.title}" berhasil diperbarui.`)
            closeDialog()
          },
          onError: (error: Error) => {
            toast.error(`Gagal memperbarui track: ${error.message}`)
          },
        }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success(`Track "${payload.title}" berhasil ditambahkan.`)
          closeDialog()
        },
        onError: (error: Error) => {
          toast.error(`Gagal menambahkan track: ${error.message}`)
        },
      })
    }
  }

  const editingFormData: TrackFormData | null = editingTrack
    ? {
        title: editingTrack.title,
        genre: editingTrack.genre ?? '',
        audio_url: editingTrack.audio_url,
        duration: editingTrack.duration?.toString() ?? '',
      }
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight">
            Kelola Tracks
          </h2>
          <p className="mt-1 text-muted-foreground">
            Tambah, edit, dan hapus rekaman audio untuk showcase gitar.
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Track
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              Gagal memuat tracks. Silakan refresh halaman.
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
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tracks && tracks.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Music className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium">Belum ada track</p>
            <p className="text-sm text-muted-foreground">
              Klik &quot;Tambah Track&quot; untuk menambahkan rekaman pertama Anda.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracks List */}
      {!isLoading && tracks && tracks.length > 0 && (
        <div className="space-y-3">
          {tracks.map((track) => (
            <Card key={track.id} className="border-border/40 bg-card/50">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Track Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Music className="h-4 w-4 shrink-0 text-secondary" />
                      <span className="font-semibold">{track.title}</span>
                      {track.genre && (
                        <Badge variant="secondary" className="text-xs">
                          {track.genre}
                        </Badge>
                      )}
                    </div>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {track.audio_url}
                    </p>
                    <div className="mt-1 flex gap-3 font-mono text-xs text-muted-foreground">
                      {track.duration !== null && (
                        <span>⏱ {formatTime(track.duration)}</span>
                      )}
                      <span>📅 {formatDate(track.created_at)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(track)}
                    >
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(track)}
                      disabled={deleteMutation.isPending}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTrack ? 'Edit Track' : 'Tambah Track Baru'}
            </DialogTitle>
          </DialogHeader>
          <TrackForm
            initialData={editingFormData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}