'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { type ReactNode, type MouseEventHandler } from 'react'
import { ArrowRight } from 'lucide-react'

// Lazy load untuk hindari WebGL init saat first paint
const SpecularButtonRaw = dynamic(() => import('./specular-button'), {
  ssr: false,
  loading: () => (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg"
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
  variant?: 'primary' | 'secondary'
  showArrow?: boolean
}

/**
 * Wrapper theme-aware untuk SpecularButton.
 *
 * FIX LIGHT MODE:
 * - Light: teks GELAP (#0f172a) + rim cyan/amber gelap → visible di background putih
 * - Dark: teks TERANG (#f8fafc) + rim cyan/amber terang → visible di background gelap
 *
 * Server render default ke dark config; client switch setelah mount
 * (resolvedTheme undefined di server → tidak ada hydration mismatch).
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
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme === 'light'

  const themeConfig =
    variant === 'primary'
      ? isLight
        ? {
            lineColor: '#0284c7', // sky-600 (rim gelap, visible di putih)
            baseColor: '#64748b', // slate-500 (edge stroke)
            textColor: '#0f172a', // slate-900 (LABEL GELAP — visible di putih)
            tint: '#0ea5e9',
            tintOpacity: 0.12,
          }
        : {
            lineColor: '#22d3ee',
            baseColor: '#164e63',
            textColor: '#f8fafc',
            tint: '#22d3ee',
            tintOpacity: 0.08,
          }
      : isLight
        ? {
            lineColor: '#d97706', // amber-600
            baseColor: '#64748b',
            textColor: '#0f172a',
            tint: '#f59e0b',
            tintOpacity: 0.12,
          }
        : {
            lineColor: '#fbbf24',
            baseColor: '#78350f',
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