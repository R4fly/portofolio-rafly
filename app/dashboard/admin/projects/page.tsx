'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  useAllProjectsAdmin,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  type ProjectInput,
} from '@/lib/queries/admin-projects'
import { ProjectForm } from '@/components/forms/project-form'
import type { ProjectFormData } from '@/lib/validations/project'
import type { Project } from '@/types/database'
import { slugify } from '@/lib/utils'
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
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Star,
  ExternalLink,
} from 'lucide-react'

export default function AdminProjectsPage() {
  const { data: projects, isLoading, isError } = useAllProjectsAdmin()
  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject()
  const deleteMutation = useDeleteProject()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  function openCreateDialog(): void {
    setEditingProject(null)
    setDialogOpen(true)
  }

  function openEditDialog(project: Project): void {
    setEditingProject(project)
    setDialogOpen(true)
  }

  function closeDialog(): void {
    setDialogOpen(false)
    setEditingProject(null)
  }

  function handleDelete(project: Project): void {
    if (!window.confirm(`Hapus proyek "${project.title}" secara permanen?`)) {
      return
    }

    deleteMutation.mutate(project.id, {
      onSuccess: () => {
        toast.success(`Proyek "${project.title}" berhasil dihapus.`)
      },
      onError: (error: Error) => {
        toast.error(`Gagal menghapus proyek: ${error.message}`)
      },
    })
  }

  function handleToggleFeatured(project: Project): void {
    updateMutation.mutate(
      { id: project.id, data: { is_featured: !project.is_featured } },
      {
        onSuccess: () => {
          toast.success(
            !project.is_featured
              ? `"${project.title}" kini featured.`
              : `"${project.title}" tidak lagi featured.`
          )
        },
        onError: (error: Error) => {
          toast.error(`Gagal mengubah status featured: ${error.message}`)
        },
      }
    )
  }

  function handleSubmitForm(data: ProjectFormData): void {
    // Konversi tech_stack_input (comma-separated) jadi array
    const techStack = data.tech_stack_input
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)

    // Auto-generate slug jika kosong
    const slug = data.slug.trim() || slugify(data.title)

    const payload: ProjectInput = {
      title: data.title,
      slug,
      description: data.description.trim() || null,
      thumbnail_url: data.thumbnail_url.trim() || null,
      tech_stack: techStack,
      live_url: data.live_url.trim() || null,
      repository_url: data.repository_url.trim() || null,
      is_featured: data.is_featured,
    }

    if (editingProject) {
      // UPDATE mode
      updateMutation.mutate(
        { id: editingProject.id, data: payload },
        {
          onSuccess: () => {
            toast.success(`Proyek "${payload.title}" berhasil diperbarui.`)
            closeDialog()
          },
          onError: (error: Error) => {
            toast.error(`Gagal memperbarui proyek: ${error.message}`)
          },
        }
      )
    } else {
      // CREATE mode
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success(`Proyek "${payload.title}" berhasil dibuat.`)
          closeDialog()
        },
        onError: (error: Error) => {
          toast.error(`Gagal membuat proyek: ${error.message}`)
        },
      })
    }
  }

  // Pre-fill form data saat edit mode
  const editingFormData: ProjectFormData | null = editingProject
    ? {
        title: editingProject.title,
        slug: editingProject.slug,
        description: editingProject.description ?? '',
        thumbnail_url: editingProject.thumbnail_url ?? '',
        tech_stack_input: editingProject.tech_stack.join(', '),
        live_url: editingProject.live_url ?? '',
        repository_url: editingProject.repository_url ?? '',
        is_featured: editingProject.is_featured,
      }
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold tracking-tight">
            Kelola Projects
          </h2>
          <p className="mt-1 text-muted-foreground">
            Tambah, edit, dan kelola proyek portofolio Anda.
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Proyek
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">
              Gagal memuat projects. Silakan refresh halaman.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-20 w-32 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects && projects.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <FolderKanban className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-medium">Belum ada proyek</p>
            <p className="text-sm text-muted-foreground">
              Klik &quot;Tambah Proyek&quot; untuk membuat proyek pertama Anda.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      {!isLoading && projects && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={cn(
                'border-border/40 bg-card/50 transition-colors',
                project.is_featured && 'border-secondary/50'
              )}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
                    {project.thumbnail_url ? (
                      <Image
                        src={project.thumbnail_url}
                        alt={`Thumbnail ${project.title}`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <FolderKanban className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold">{project.title}</h3>
                      {project.is_featured && (
                        <Badge
                          variant="secondary"
                          className="bg-secondary/10 text-secondary"
                        >
                          <Star className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="mb-1 truncate font-mono text-xs text-muted-foreground">
                      /{project.slug}
                    </p>
                    <p className="mb-2 line-clamp-1 text-sm text-muted-foreground">
                      {project.description || 'Tidak ada deskripsi'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(project)}
                  >
                    <Pencil className="mr-1 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(project)}
                    disabled={updateMutation.isPending}
                  >
                    <Star className="mr-1 h-3.5 w-3.5" />
                    {project.is_featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  {project.live_url && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3.5 w-3.5" />
                        Live
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project)}
                    disabled={deleteMutation.isPending}
                    className="ml-auto text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            initialData={editingFormData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}