import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Route handler untuk OAuth/magic link callback dari Supabase.
 * Saat ini hanya untuk future-proofing jika Anda ingin enable OAuth nanti.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return ke home dengan error query jika ada masalah
  return NextResponse.redirect(`${origin}/?error=auth_callback_failed`)
}