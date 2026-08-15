'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { getSupabaseClient } from '@/lib/supabase/client'
import { loginFormSchema, type LoginFormData } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(data: LoginFormData): Promise<void> {
    setSubmitError(null)
    const supabase = getSupabaseClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        // Map Supabase error ke pesan user-friendly
        let userMessage = 'Login gagal. Silakan coba lagi.'
        if (error.message.includes('Invalid login credentials')) {
          userMessage = 'Email atau password salah. Periksa kembali kredensial Anda.'
        } else if (error.message.includes('Email not confirmed')) {
          userMessage = 'Email belum dikonfirmasi. Cek inbox Anda.'
        } else if (error.message.includes('Too many requests')) {
          userMessage = 'Terlalu banyak percobaan. Tunggu beberapa saat.'
        }

        setSubmitError(userMessage)
        toast.error(userMessage)
        return
      }

      toast.success('Login berhasil! Mengalihkan...')
      form.reset()
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan tidak terduga'
      setSubmitError(message)
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Server/Network Error Alert */}
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password dengan toggle show/hide */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    className="pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password Link (placeholder untuk future) */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            onClick={() => {
              toast.info('Fitur reset password akan segera tersedia.')
            }}
          >
            Lupa password?
          </button>
        </div>

        {/* Submit Button dengan Loading State */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Masuk
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}