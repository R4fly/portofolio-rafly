'use client'

import { Button } from '@/components/ui/button'
import { useLogout } from '@/lib/hooks/use-auth'
import { Loader2, LogOut } from 'lucide-react'
import { toast } from 'sonner'

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'icon'
  className?: string
}

export function LogoutButton({
  variant = 'ghost',
  size = 'sm',
  className = '',
}: LogoutButtonProps) {
  const { logout, isLoggingOut } = useLogout()

  async function handleLogout(): Promise<void> {
    try {
      await logout()
      toast.success('Berhasil logout. Sampai jumpa!')
    } catch {
      toast.error('Gagal logout. Silakan coba lagi.')
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={className}
    >
      {isLoggingOut ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          {size !== 'icon' && <span className="ml-2">Keluar</span>}
        </>
      )}
    </Button>
  )
}