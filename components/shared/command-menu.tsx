'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useCommandMenuStore } from '@/lib/stores/command-store'
import { useProjects } from '@/lib/queries/projects'
import { useTracks } from '@/lib/queries/tracks'
import {
  STATIC_COMMANDS,
  NO_RESULTS_TEXT,
  SEARCH_PLACEHOLDER,
} from '@/lib/constants/commands'
import { FolderKanban, Music } from 'lucide-react'

export function CommandMenu() {
  const router = useRouter()
  const { isOpen, close, query, setQuery } = useCommandMenuStore()

  const { data: projects = [] } = useProjects()
  const { data: tracks = [] } = useTracks()

  // Dynamic items dari database (filter by query)
  const dynamicCommands = useMemo(() => {
    const lowerQuery = query.toLowerCase()

    const filteredProjects = projects
      .filter((p) => {
        if (!lowerQuery) return true
        return (
          p.title.toLowerCase().includes(lowerQuery) ||
          p.slug.toLowerCase().includes(lowerQuery) ||
          p.tech_stack?.some((t) => t.toLowerCase().includes(lowerQuery))
        )
      })
      .slice(0, 5) // Batasi 5 hasil untuk performa

    const filteredTracks = tracks
      .filter((t) => {
        if (!lowerQuery) return true
        return (
          t.title.toLowerCase().includes(lowerQuery) ||
          t.genre?.toLowerCase().includes(lowerQuery)
        )
      })
      .slice(0, 5)

    return { filteredProjects, filteredTracks }
  }, [query, projects, tracks])

  const { filteredProjects, filteredTracks } = dynamicCommands

  // Handle navigation setelah item dipilih
  function handleSelect(href: string): void {
    close()
    // Use router untuk internal navigation
    if (href.startsWith('/')) {
      router.push(href)
    } else {
      window.location.href = href
    }
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <CommandInput
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>{NO_RESULTS_TEXT}</CommandEmpty>

        {/* Static Commands */}
        {STATIC_COMMANDS.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => item.href && handleSelect(item.href)}
                >
                  <Icon className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}

        {/* Dynamic: Projects */}
        {filteredProjects.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Proyek">
              {filteredProjects.map((project) => (
                <CommandItem
                  key={`project-${project.id}`}
                  value={`project-${project.slug}`}
                  onSelect={() => handleSelect('/#projects')}
                >
                  <FolderKanban className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {project.title}
                    </span>
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      {project.slug}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Dynamic: Tracks */}
        {filteredTracks.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Audio Track">
              {filteredTracks.map((track) => (
                <CommandItem
                  key={`track-${track.id}`}
                  value={`track-${track.id}`}
                  onSelect={() => handleSelect('/#audio')}
                >
                  <Music className="mr-2 h-4 w-4 text-secondary" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {track.title}
                    </span>
                    {track.genre && (
                      <span className="font-mono text-xs text-muted-foreground">
                        {track.genre}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Footer hint */}
        <div className="border-t border-border/40 px-3 py-2">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                ↑↓
              </kbd>
              navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>
              pilih
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              tutup
            </span>
          </div>
        </div>
      </CommandList>
    </CommandDialog>
  )
}