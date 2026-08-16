'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, type MouseEventHandler } from 'react'
import { ArrowRight } from 'lucide-react'

// Lazy load untuk hindari SSR WebGL issues dan kurangi initial bundle
const SpecularButtonRaw = dynamic(() => import('./specular-button'), {
  ssr: false,
  loading: () => (
    <button
      type="button"
      className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg transition-opacity"
      aria-busy="true"
    >
      Loading...
    </button>
  ),
})

interface SpecularButtonWrapperProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  /**
   * Color theme:
   * - 'primary' (cyan) — untuk CTA utama
   * - 'secondary' (amber) — untuk CTA musik
   */
  variant?: 'primary' | 'secondary'
  /** Tampilkan icon ArrowRight di sebelah kanan label */
  showArrow?: boolean
}

/**
 * Wrapper yang menyediakan theme-aware colors dan safe SSR loading state.
 * Gunakan ini di aplikasi, jangan import SpecularButton langsung.
 */
export function SpecularButtonWrapper({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  showArrow = false,
}: SpecularButtonWrapperProps) {
  const themeConfig =
    variant === 'primary'
      ? {
          lineColor: '#22d3ee', // cyan-400 (primary)
          baseColor: '#164e63', // cyan-900 (edge)
          textColor: '#f8fafc', // slate-50
          tint: '#22d3ee',
          tintOpacity: 0.08,
        }
      : {
          lineColor: '#fbbf24', // amber-400 (secondary)
          baseColor: '#78350f', // amber-900 (edge)
          textColor: '#f8fafc',
          tint: '#fbbf24',
          tintOpacity: 0.08,
        }

  return (
    <SpecularButtonRaw
      size="lg"
      radius={14}
      tint={themeConfig.tint}
      tintOpacity={themeConfig.tintOpacity}
      blur={8}
      textColor={themeConfig.textColor}
      lineColor={themeConfig.lineColor}
      baseColor={themeConfig.baseColor}
      intensity={1.2}
      shineSize={12}
      shineFade={45}
      thickness={1.5}
      speed={0.35}
      followMouse
      proximity={300}
      autoAnimate={false}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
      {showArrow && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
    </SpecularButtonRaw>
  )
}