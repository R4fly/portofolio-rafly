'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getTechStackColor } from '@/lib/constants/tech-stack'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/database'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onOpenDialog: (project: Project) => void
}

/**
 * Card individual untuk setiap project.
 * Menampilkan thumbnail, title, deskripsi singkat, dan tech stack badges.
 * Klik card akan membuka dialog detail via callback.
 */
export function ProjectCard({ project, onOpenDialog }: ProjectCardProps) {
  const { title, slug, description, thumbnail_url, tech_stack, is_featured } = project

  // Preview deskripsi (max 100 karakter)
  const shortDescription = description
    ? description.length > 100
      ? `${description.slice(0, 100)}...`
      : description
    : 'Deskripsi proyek akan segera tersedia.'

  return (
    <Card
      className={cn(
        'group relative cursor-pointer overflow-hidden border-border/40 bg-card/50 backdrop-blur',
        'transition-all duration-300 hover:-translate-y-1 hover:border-primary/50',
        'hover:shadow-xl hover:shadow-primary/10',
        is_featured && 'ring-1 ring-secondary/30'
      )}
      onClick={() => onOpenDialog(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenDialog(project)
        }
      }}
      aria-label={`Lihat detail project: ${title}`}
    >
      {/* Featured badge */}
      {is_featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="secondary"
            className="bg-secondary/90 text-secondary-foreground px-2 py-0.5 text-xs font-semibold"
          >
            Featured
          </Badge>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {thumbnail_url ? (
          <Image
            src={thumbnail_url}
            alt={`Screenshot project ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <ExternalLink className="h-8 w-8 text-primary" />
              </div>
              <p className="font-mono text-xs text-muted-foreground">{slug}</p>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <h3 className="mb-2 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {shortDescription}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5">
          {tech_stack.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className={cn(
                'px-2 py-0.5 font-mono text-xs font-medium',
                getTechStackColor(tech)
              )}
            >
              {tech}
            </Badge>
          ))}
          {tech_stack.length > 4 && (
            <Badge
              variant="outline"
              className="border-border/60 px-2 py-0.5 font-mono text-xs"
            >
              +{tech_stack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}