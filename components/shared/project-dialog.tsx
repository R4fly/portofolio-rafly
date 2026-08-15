'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GithubIcon } from '@/components/shared/icons/github-icon'
import { getTechStackColor } from '@/lib/constants/tech-stack'
import { cn, formatDate } from '@/lib/utils'
import type { Project } from '@/types/database'
import { Calendar, ExternalLink, Tag } from 'lucide-react'

interface ProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Dialog detail untuk project.
 * Menampilkan informasi lengkap: thumbnail, deskripsi full, tech stack, dan link eksternal.
 */
export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  const { title, slug, description, thumbnail_url, tech_stack, live_url, repository_url, created_at } = project

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {slug}
            </span>
          </div>
          <DialogTitle className="font-sans text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Dibuat pada {formatDate(created_at)}
          </DialogDescription>
        </DialogHeader>

        {/* Thumbnail */}
        {thumbnail_url && (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg border border-border/40 bg-muted">
            <Image
              src={thumbnail_url}
              alt={`Screenshot detail project ${title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-6 space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Deskripsi Proyek
          </h4>
          <p className="leading-relaxed text-foreground">
            {description ?? 'Deskripsi detail belum tersedia.'}
          </p>
        </div>

        {/* Tech Stack Full */}
        <div className="mb-6 space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {tech_stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={cn(
                  'px-3 py-1 font-mono text-sm font-medium',
                  getTechStackColor(tech)
                )}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 border-t border-border/40 pt-4 sm:flex-row">
          {live_url && (
            <Button
              asChild
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href={live_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Kunjungi Website
              </Link>
            </Button>
          )}
          {repository_url && (
            <Button
              asChild
              variant="outline"
              className="flex-1 border-border hover:bg-accent"
            >
              <Link href={repository_url} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                Lihat Repository
              </Link>
            </Button>
          )}
          {!live_url && !repository_url && (
            <div className="py-2 text-center text-sm text-muted-foreground">
              Link project belum tersedia
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}