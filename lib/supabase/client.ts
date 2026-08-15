import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Singleton client untuk browser
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (typeof window === 'undefined') {
    return createClient();
  }
  
  if (!supabaseInstance) {
    supabaseInstance = createClient();
  }
  
  return supabaseInstance;
}