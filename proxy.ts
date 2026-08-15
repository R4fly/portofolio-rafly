import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware Next.js untuk handle auth protection.
 *
 * Responsibilities:
 * - Refresh session JWT pada setiap request
 * - Protect /dashboard/* routes (redirect ke /login jika belum login)
 * - Redirect user yang sudah login dari /login ke /dashboard
 * - Allow public routes tanpa auth check
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Set cookies di request (untuk middleware chain)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          // Set cookies di response (untuk browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — CRITICAL untuk keep user logged in
  // Ini juga akan set cookie baru jika session hampir expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected routes — butuh auth
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  // Auth routes — tidak boleh diakses jika sudah login
  const authRoutes = ['/login']
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirect ke login jika akses protected route tanpa auth
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect ke dashboard jika user sudah login akses auth route
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, audio, fonts)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp3|wav|ico)$).*)',
  ],
}