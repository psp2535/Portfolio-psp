'use client'

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollTo = (target: string | number, opts?: { offset?: number }) => void

const ScrollContext = createContext<ScrollTo>(() => {})

/** Scroll to a section id ("#about" / "about") or a pixel offset, Lenis-aware. */
export const useScrollTo = () => useContext(ScrollContext)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect users who prefer reduced motion: native scrolling only.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback<ScrollTo>((target, opts) => {
    const offset = opts?.offset ?? -80
    let el: HTMLElement | number | null = null
    if (typeof target === 'number') el = target
    else el = document.getElementById(target.replace(/^#/, ''))
    if (el === null) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: typeof el === 'number' ? 0 : offset })
    } else if (typeof el === 'number') {
      window.scrollTo({ top: el, behavior: 'smooth' })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
}
