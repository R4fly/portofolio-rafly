'use client'

import { useEffect } from 'react'
import { useCommandMenuStore } from '@/lib/stores/command-store'

/**
 * Hook untuk listen keyboard shortcut CMD+K (Mac) / CTRL+K (Windows/Linux).
 * Juga menutup command menu saat user menekan Escape.
 */
export function useCommandMenuShortcut(): void {
  const { isOpen, toggle, close } = useCommandMenuStore()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      // CMD+K (Mac) atau CTRL+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        toggle()
        return
      }

      // Escape hanya jika menu sedang terbuka
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, toggle, close])
}