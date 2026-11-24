'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'
import { useScrollTo } from '@/components/providers/smooth-scroll-provider'
import { openCommandPalette } from '@/components/ui/command-palette'
import { navItems, RESUME_PATH, socials } from '@/lib/data'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const scrollTo = useScrollTo()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Highlight whichever section crosses the upper-middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const hero = document.getElementById('home')
    if (hero) observer.observe(hero)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (id: string) => {
    if (open) {
      // Release the scroll lock first, otherwise the page can't move.
      document.documentElement.style.overflow = ''
      setOpen(false)
      setTimeout(() => scrollTo(id), 50)
    } else {
      scrollTo(id)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div
            className={`flex items-center justify-between gap-3 rounded-full px-4 py-2.5 md:px-6 transition-all duration-300 ${
              isScrolled ? 'glass shadow-[0_8px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent'
            }`}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                go('home')
              }}
              className="flex items-center gap-2 font-mono text-xl md:text-2xl font-bold tracking-wider text-white"
              aria-label="Back to top"
            >
              [ PSP ]
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#D1FF00]" />
            </a>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {navItems.map((item, i) => {
                const isActive = active === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    <span className="mr-1 font-mono text-[10px] text-primary">0{i + 1}.</span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={openCommandPalette}
                className="hidden md:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/50 transition-colors hover:border-primary/50 hover:text-primary"
                aria-label="Open command palette"
              >
                <Command className="h-3.5 w-3.5" />K
              </button>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary px-3 py-1.5 md:px-5 md:py-2 font-mono text-[10px] md:text-sm uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-black"
              >
                Resume ↗
              </a>
              <button
                className="lg:hidden rounded-full p-2 glass"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  onClick={() => go(item.id)}
                  className={`flex items-baseline gap-4 text-left font-[family-name:var(--font-anton)] text-5xl uppercase transition-colors ${
                    active === item.id ? 'text-primary' : 'text-white hover:text-primary'
                  }`}
                >
                  <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
              >
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
                <a href={socials.email} className="hover:text-primary">Email</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
