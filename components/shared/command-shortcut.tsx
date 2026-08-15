'use client'

import { useCommandMenuShortcut } from '@/lib/hooks/use-command-menu'

/**
 * Wrapper client component untuk listen global keyboard shortcut CMD+K.
 * Dipisah agar root layout tetap bisa Server Component friendly.
 */
export function CommandShortcut() {
  useCommandMenuShortcut()
  return null
}