'use client'

import Image from 'next/image'
import { useProjects } from '@/lib/queries/projects'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from './section-header'
import { GithubIcon } from './icons/github-icon'
import { QueryErrorState } from './query-error-state'
import { useLoadingTimeout } from './query-loading-timeout'
import BorderGlow from './border-glow'
import { ExternalLink, FolderKanban, Star } from 'lucide-react'

export function ProjectsGrid() {
  const { data: projects, isLoading, isError, isFetching, refetch } = useProjects()
  const loadingTimedOut = useLoadingTimeout(isLoading)

  // Treat timeout sebagai error
  const showError = isError || loadingTimedOut

  return (
    <section className="container px-5 py-14 md:py-24" id="projects">
      <SectionHeader
        eyebrow="Selected Work"
        title={
          <>
            Proyek <span className="text-primary">Unggulan</span>
          </>
        }
        description="Koleksi proyek web terbaik yang saya bangun — dari SaaS hingga eksperimen teknis."
      />

      {/* Loading State - Skeleton (max 10 detik) */}
      {isLoading && !showError && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-border/40 bg-card/50">
              <CardContent className="p-0">
                <Skeleton className="aspect-video w-full rounded-t-lg" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex gap-2 border-t border-border/40 pt-4">
                    <Skeleton className="h-11 flex-1" />
                    <Skeleton className="h-11 flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State - dengan tombol Retry */}
      {showError && !isLoading && (
        <QueryErrorState
          title="Proyek gagal dimuat"
          message={
            loadingTimedOut
              ? 'Koneksi terlalu lambat. Silakan coba lagi.'
              : 'Terjadi masalah saat memuat daftar proyek.'
          }
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      )}

      {/* Empty State */}
      {!isLoading && !showError && projects && projects.length === 0 && (
        <Card className="border-dashed border-border/40 bg-card/30">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FolderKanban className="mb-3 h-12 w-12 text-muted-foreground" />
            <p className="font-medium">Belum ada proyek</p>
            <p className="text-sm text-muted-foreground">
              Proyek akan muncul di sini setelah ditambahkan.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      {!isLoading && !showError && projects && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project) => {
            const ProjectCard = (
              <Card
                key={project.id}
                className="group flex h-full flex-col overflow-hidden border-border/40 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
                  {project.thumbnail_url ? (
                    <Image
                      src={project.thumbnail_url}
                      alt={`Screenshot ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      quality={85}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  {project.is_featured && (
                    <Badge className="absolute right-3 top-3 bg-secondary text-secondary-foreground">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="mb-3">
                    <h3 className="mb-1.5 line-clamp-1 font-sans text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 min-h-[3rem] text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.description || 'Tidak ada deskripsi.'}
                    </p>
                  </div>

                  <div className="mb-4 flex min-h-[2.5rem] flex-wrap gap-1.5">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <Badge variant="outline" className="font-mono text-xs">
                        +{project.tech_stack.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-auto flex gap-2 border-t border-border/40 pt-4">
                    {project.live_url && (
                      <Button
                        variant="default"
                        size="lg"
                        asChild
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.repository_url && (
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className={project.live_url ? 'flex-1' : 'w-full'}
                      >
                        <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="mr-2 h-4 w-4" />
                          Source
                        </a>
                      </Button>
                    )}
                    {!project.live_url && !project.repository_url && (
                      <p className="text-xs text-muted-foreground">Link tidak tersedia</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )

            if (project.is_featured) {
              return (
                <BorderGlow
                  key={project.id}
                  borderRadius={20}
                  glowColor="199 89 55"
                  glowIntensity={1.2}
                  glowRadius={30}
                  colors={['#22d3ee', '#f59e0b', '#a855f7']}
                  className="h-full"
                >
                  {ProjectCard}
                </BorderGlow>
              )
            }

            return ProjectCard
          })}
        </div>
      )}
    </section>
  )
}