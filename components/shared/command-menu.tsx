'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCommandMenuStore } from '@/lib/stores/command-store'
import { useProjects } from '@/lib/queries/projects'
import { useTracks } from '@/lib/queries/tracks'
import {
  STATIC_COMMANDS,
  NO_RESULTS_TEXT,
  SEARCH_PLACEHOLDER,
} from '@/lib/constants/commands'
import { FolderKanban, Music, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlattenedItem {
  id: string
  label: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  group: string
}

export function CommandMenu() {
  const router = useRouter()
  const { isOpen, close, query, setQuery } = useCommandMenuStore()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const { data: projects = [] } = useProjects()
  const { data: tracks = [] } = useTracks()

  // Flatten semua items untuk keyboard navigation
  const allItems = useMemo<FlattenedItem[]>(() => {
    const items: FlattenedItem[] = []

    // Static commands
    STATIC_COMMANDS.forEach((group) => {
      group.items.forEach((item) => {
        items.push({
          id: item.id,
          label: item.label,
          description: item.description,
          icon: item.icon,
          href: item.href,
          group: group.heading,
        })
      })
    })

    // Dynamic projects
    const lowerQuery = query.toLowerCase()
    if (lowerQuery) {
      projects
        .filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.slug.toLowerCase().includes(lowerQuery) ||
            p.tech_stack?.some((t) => t.toLowerCase().includes(lowerQuery))
        )
        .slice(0, 5)
        .forEach((project) => {
          items.push({
            id: `project-${project.id}`,
            label: project.title,
            description: project.slug,
            icon: FolderKanban,
            href: '/#projects',
            group: 'Proyek',
          })
        })

      tracks
        .filter(
          (t) =>
            t.title.toLowerCase().includes(lowerQuery) ||
            t.genre?.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 5)
        .forEach((track) => {
          items.push({
            id: `track-${track.id}`,
            label: track.title,
            description: track.genre || undefined,
            icon: Music,
            href: '/#audio',
            group: 'Audio Track',
          })
        })
    }

    return items
  }, [query, projects, tracks])

  // Reset selectedIndex saat query berubah
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input saat dialog terbuka
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current || selectedIndex < 0) return

    const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  // Handle navigation
  function handleSelect(item: FlattenedItem): void {
    if (!item.href) return
    close()
    router.push(item.href)
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, allItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 animate-in fade-in-0 bg-black/80"
        onClick={close}
      />

      {/* Dialog */}
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
        <div className="rounded-xl border border-border bg-background p-0 shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Results List */}
          <div
            ref={listRef}
            className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2"
          >
            {allItems.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {NO_RESULTS_TEXT}
              </div>
            ) : (
              allItems.map((item, index) => {
                const Icon = item.icon
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none transition-colors',
                      isSelected
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-1 flex-col text-left">
                      <span className="font-medium">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Footer Hint */}
          <div className="border-t border-border px-3 py-2">
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
        </div>
      </div>
    </>
  )
}