'use client'

import { useEffect, useRef } from 'react'

/**
 * One fixed, cursor-tracking light for the whole page.
 * Replaces the per-section spotlights: a single listener + rAF + CSS variables,
 * so nothing re-renders in React while the mouse moves.
 */
export function GlobalSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let cx = x
    let cy = y
    let frame = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = '1'
    }
    const tick = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      el.style.setProperty('--sx', `${cx}px`)
      el.style.setProperty('--sy', `${cy}px`)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[40] opacity-0 transition-opacity duration-700 mix-blend-screen"
      style={{
        background:
          'radial-gradient(520px circle at var(--sx, 50%) var(--sy, 30%), rgba(209,255,0,0.10), transparent 75%)',
      }}
    />
  )
}
