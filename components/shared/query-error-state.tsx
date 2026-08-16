'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface QueryErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

/**
 * Reusable error state untuk semua data sections.
 *
 * Muncul ketika query gagal setelah 3x retry.
 * User bisa klik "Coba Lagi" untuk manual refetch.
 */
export function QueryErrorState({
  title = 'Gagal memuat data',
  message = 'Terjadi masalah saat memuat konten. Silakan coba lagi.',
  onRetry,
  isRetrying = false,
  className = '',
}: QueryErrorStateProps) {
  return (
    <Card className={`border-destructive/30 bg-destructive/5 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className="font-sans text-base font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            disabled={isRetrying}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            {isRetrying ? 'Memuat ulang...' : 'Coba Lagi'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}