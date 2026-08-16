import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import { PUBLIC_QUERY_OPTIONS } from '@/lib/query-config'
import type { Project } from '@/types/database'

export async function fetchAllProjects(): Promise<Project[]> {
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

export async function fetchFeaturedProjects(): Promise<Project[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .returns<Project[]>()

  if (error) {
    throw new Error(`Failed to fetch featured projects: ${error.message}`)
  }

  return data ?? []
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<Project>()

  if (error) {
    throw new Error(`Failed to fetch project: ${error.message}`)
  }

  return data
}

export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    },
    ...PUBLIC_QUERY_OPTIONS,
  })
}

export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects', 'featured'],
    queryFn: fetchFeaturedProjects,
    staleTime: 5 * 60 * 1000,
  })
}

export function useProject(slug: string) {
  return useQuery<Project | null>({
    queryKey: ['projects', slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}