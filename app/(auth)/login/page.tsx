import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/forms/login-form'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Masuk ke Client Portal Rafly Baehaqi untuk mengakses dashboard dan proyek.',
}

/**
 * Loading fallback untuk LoginForm.
 * Ditampilkan saat component sedang hydrate di client.
 */
function LoginFormSkeleton() {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur">
      <CardHeader className="text-center">
        <Skeleton className="mx-auto h-7 w-48" />
        <Skeleton className="mx-auto h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <Card className="border-border/40 bg-card/50 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="font-sans text-2xl font-bold tracking-tight">
            Selamat Datang Kembali
          </CardTitle>
          <CardDescription>
            Masuk ke akun Anda untuk melanjutkan ke dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Suspense>
  )
}