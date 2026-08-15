import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Project } from '@/types/database'

/**
 * Payload untuk create/update project.
 * Semua nullable field menggunakan null (bukan empty string) untuk konsistensi database.
 */
export interface ProjectInput {
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  tech_stack: string[]
  live_url: string | null
  repository_url: string | null
  is_featured: boolean
}

/**
 * Fetch semua projects untuk admin view.
 * QueryKey terpisah dari public agar tidak saling interfere.
 */
export async function fetchAllProjectsAdmin(): Promise<Project[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<Project[]>()

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data ?? []
}

export function useAllProjectsAdmin() {
  return useQuery<Project[]>({
    queryKey: ['admin', 'projects'],
    queryFn: fetchAllProjectsAdmin,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}

/**
 * Mutation untuk create project baru.
 */
export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ProjectInput>({
    mutationFn: async (input: ProjectInput) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('projects').insert([input])

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

/**
 * Mutation untuk update project existing.
 */
export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; data: Partial<ProjectInput> }>({
    mutationFn: async ({ id, data }) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

/**
 * Mutation untuk delete project permanen.
 */
export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const supabase = getSupabaseClient()

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}