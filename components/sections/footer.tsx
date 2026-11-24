'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useScrollTo } from '@/components/providers/smooth-scroll-provider'
import { navItems, profile, RESUME_PATH, socials } from '@/lib/data'

const istFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function Footer() {
  const [time, setTime] = useState<string | null>(null)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const tick = () => setTime(istFormatter.format(new Date()))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black pb-10 pt-24">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-16 grid grid-cols-2 gap-8 border-b border-white/5 pb-16 md:grid-cols-4">
          <div className="space-y-2">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Status</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/70">Open to work</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Latest</span>
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">Adobe Grand Finalist</span>
          </div>
          <div className="space-y-2">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Local time</span>
            <span className="font-mono text-xs uppercase tracking-widest text-primary" suppressHydrationWarning>
              {time ?? '--:--:--'} IST
            </span>
          </div>
          <div className="space-y-2">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Based in</span>
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">{profile.location}</span>
          </div>
        </div>

        <div className="mb-16 grid gap-10 md:grid-cols-3">
          <nav aria-label="Footer" className="space-y-3">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Sections</span>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="font-mono text-sm text-white/60 transition-colors hover:text-primary">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">Elsewhere</span>
            <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-white/60">
              <li><a className="hover:text-primary" href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a className="hover:text-primary" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="hover:text-primary" href={socials.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a></li>
              <li><a className="hover:text-primary" href={socials.codechef} target="_blank" rel="noopener noreferrer">CodeChef</a></li>
              <li><a className="hover:text-primary" href={RESUME_PATH} target="_blank" rel="noopener noreferrer">Resume</a></li>
              <li><a className="hover:text-primary" href={socials.email}>Email</a></li>
            </ul>
          </div>
          <div className="flex items-start md:justify-end">
            <button
              onClick={() => scrollTo(0)}
              className="group flex items-center gap-3 border border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-primary hover:text-primary"
            >
              Back to top <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mb-10 select-none whitespace-nowrap text-center font-[family-name:var(--font-anton)] text-[10vw] uppercase leading-none tracking-tighter text-white/[0.05] lg:text-[8.5rem]"
        >
          {profile.name}
        </p>

        <div className="flex flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed & built by PSP · Next.js + Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
