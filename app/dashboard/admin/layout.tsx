import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Panel administrasi untuk mengelola konten website portfolio.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Admin Layout — Server Component dengan role guard.
 *
 * Keamanan berlapis:
 * 1. Middleware sudah memastikan user authenticated (login)
 * 2. Layout ini memastikan user punya role='admin'
 * 3. RLS di database memastikan hanya admin yang bisa baca/tulis data sensitif
 *
 * Jika bukan admin, redirect ke /dashboard (client dashboard biasa).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Ambil user yang sedang login
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Jika tidak ada user, redirect ke login (shouldn't happen karena middleware, tapi defensive)
  if (!user) {
    redirect('/login?redirect=/dashboard/admin')
  }

  // Cek role user di tabel profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()

  // Jika bukan admin, redirect ke dashboard client biasa
  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Admin Header Banner */}
      <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-sans text-xl font-bold tracking-tight">
                Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground">
                Kelola konten website portfolio Anda
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{profile.full_name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          <AdminSidebar />
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}