import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginForm } from '@/components/forms/login-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Masuk ke Client Portal Rafly Baehaqi untuk mengakses dashboard dan proyek.',
}

export default function LoginPage() {
  return (
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
  )
}