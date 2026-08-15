'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  enabled?: boolean
}

export function useCountUp({
  end,
  duration = 1500,
  start = 0,
  enabled = true,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(start)
  const previousEnd = useRef(start)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const startValue = previousEnd.current
    const endValue = end
    const startTime = performance.now()

    // Jika nilai tidak berubah, skip animasi
    if (startValue === endValue) {
      setCount(endValue)
      return
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function: ease-out cubic untuk efek smooth
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOutCubic)

      setCount(currentValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        previousEnd.current = endValue
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      previousEnd.current = endValue
    }
  }, [end, duration, enabled])

  return count
}