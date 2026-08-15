'use client'

import { useState } from 'react'
import { useProjects } from '@/lib/queries/projects'
import { ProjectCard } from './project-card'
import { ProjectDialog } from './project-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import type { Project } from '@/types/database'
import { FolderOpen } from 'lucide-react'

/**
 * Grid layout untuk semua project portofolio.
 * Menangani loading state, empty state, dan dialog detail.
 */
export function ProjectsGrid() {
  const { data: projects, isLoading, isError } = useProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = (project: Project): void => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  const handleCloseDialog = (open: boolean): void => {
    setDialogOpen(open)
    if (!open) {
      // Delay reset selectedProject agar animasi close dialog selesai
      setTimeout(() => setSelectedProject(null), 200)
    }
  }

  if (isError) {
    return (
      <div className="container py-16 text-center">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Gagal Memuat Proyek</h3>
        <p className="text-sm text-muted-foreground">
          Terjadi kesalahan saat mengambil data proyek. Silakan refresh halaman.
        </p>
      </div>
    )
  }

  return (
    <section className="container py-16 md:py-24" id="projects">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Proyek <span className="text-primary">Unggulan</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          Koleksi aplikasi web yang saya bangun dengan standar engineering tinggi,
          dari SaaS hingga tools kreatif.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects && projects.length === 0 && (
        <div className="text-center py-16">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum Ada Proyek</h3>
          <p className="text-sm text-muted-foreground">
            Proyek portofolio akan segera ditambahkan. Stay tuned!
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && projects && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDialog={handleOpenDialog}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <ProjectDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
      />
    </section>
  )
}