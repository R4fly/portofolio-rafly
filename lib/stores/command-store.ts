import { create } from 'zustand'

/**
 * State global untuk Command Palette (CMD+K).
 * Menggunakan Zustand karena state ini diakses oleh banyak komponen:
 * - Header (trigger button)
 * - Layout (global shortcut listener)
 * - CommandMenu (UI)
 * - CommandMenuResult (navigation)
 */
interface CommandMenuState {
  isOpen: boolean
  query: string
  open: () => void
  close: () => void
  toggle: () => void
  setQuery: (query: string) => void
}

export const useCommandMenuStore = create<CommandMenuState>((set) => ({
  isOpen: false,
  query: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '' }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setQuery: (query: string) => set({ query }),
}))