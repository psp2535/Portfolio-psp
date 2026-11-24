'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, Command } from 'lucide-react'
import { Counter } from '@/components/ui/counter'
import { openCommandPalette } from '@/components/ui/command-palette'
import { useScrollTo } from '@/components/providers/smooth-scroll-provider'
import { profile, socials, stats } from '@/lib/data'

const marqueeItems = [
  { name: 'GITHUB', url: socials.github },
  { name: 'LINKEDIN', url: socials.linkedin },
  { name: 'LEETCODE', url: socials.leetcode },
  { name: 'CODECHEF', url: socials.codechef },
  { name: 'CODEFORCES', url: socials.codeforces },
  { name: 'GMAIL', url: socials.email },
  { name: 'TWITTER', url: socials.twitter },
]

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Normalised mouse position: -0.5 … 0.5 on both axes.
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const px = useMotionValue(-1000)
  const py = useMotionValue(-1000)
  const fastX = useSpring(px, { stiffness: 50, damping: 20 })
  const fastY = useSpring(py, { stiffness: 50, damping: 20 })
  const slowX = useSpring(px, { stiffness: 20, damping: 30 })
  const slowY = useSpring(py, { stiffness: 20, damping: 30 })
  const orbAX = useTransform(fastX, (v) => v - 300)
  const orbAY = useTransform(fastY, (v) => v - 300)
  const orbBX = useTransform(slowX, (v) => v - 250)
  const orbBY = useTransform(slowY, (v) => v - 250)
  const tiltX = useSpring(useTransform(ny, [-0.5, 0.5], [8, -8]), { stiffness: 40, damping: 20 })
  const tiltY = useSpring(useTransform(nx, [-0.5, 0.5], [-8, 8]), { stiffness: 40, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    px.set(e.clientX - rect.left)
    py.set(e.clientY - rect.top)
    nx.set((e.clientX - rect.left) / rect.width - 0.5)
    ny.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-32 pt-28 md:px-12 lg:px-20"
    >
      {/* Ambient orb */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-orb absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(209,255,0,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Cursor-reactive colour orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden="true">
        <motion.div
          className="hero-orb-a absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
          style={{ x: orbAX, y: orbAY }}
        />
        <motion.div
          className="hero-orb-b absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
          style={{ x: orbBX, y: orbBY }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Status row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Open to internships</span>
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">| {profile.location}</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
          className="relative mb-8 cursor-default select-none"
        >
          <h1 className="flex flex-col items-start gap-1 font-[family-name:var(--font-anton)] text-[16vw] uppercase leading-[0.88] tracking-tighter md:flex-row md:flex-nowrap md:items-baseline md:gap-x-[0.2em] md:whitespace-nowrap md:text-[min(10.5vw,10rem)]">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true" className="relative inline-block text-white">
              {profile.firstName.split('').map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scaleY: 1.2, color: '#D1FF00', textShadow: '0 0 50px rgba(209,255,0,0.8)' }}
                  whileTap={{ scaleY: 1.2, color: '#D1FF00' }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span aria-hidden="true" className="text-outline-strong relative inline-block">
              {profile.lastName.split('').map((char, i) =>
                char === ' ' ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, color: '#D1FF00', textShadow: '0 0 40px rgba(209,255,0,1)' }}
                    whileTap={{ scale: 1.1, color: '#D1FF00' }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ),
              )}
              <span className="ml-2 animate-pulse text-primary">_</span>
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 max-w-3xl font-mono text-base text-muted-foreground sm:text-lg"
        >
          <span className="text-primary">//</span> {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-14 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group flex items-center gap-3 bg-primary px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-white"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="border border-white/20 px-7 py-4 font-mono text-sm uppercase tracking-wider text-white transition-colors hover:border-primary hover:text-primary"
          >
            Let&apos;s talk
          </button>
          <button
            onClick={openCommandPalette}
            className="hidden items-center gap-2 px-2 py-4 font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-primary md:flex"
          >
            or press
            <kbd className="flex items-center gap-1 border border-white/15 px-2 py-1 text-white/70">
              <Command className="h-3 w-3" /> K
            </kbd>
          </button>
        </motion.div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid max-w-4xl grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="group bg-black/80 p-4 backdrop-blur-sm transition-colors hover:bg-[#0b0b0b] md:p-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter
                  value={s.value}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="block font-[family-name:var(--font-anton)] text-3xl text-white transition-colors group-hover:text-primary md:text-4xl"
                />
                <span className="mt-1 block font-mono text-[10px] uppercase leading-snug tracking-wider text-white/40">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Social marquee */}
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden border-t border-white/5 bg-black/60 py-4 backdrop-blur-sm">
        <div className="marquee flex w-max">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={group === 1}>
              {[...marqueeItems, ...marqueeItems].map((social, i) => (
                <div key={i} className="flex items-center gap-12">
                  <a
                    href={social.url}
                    target={social.url.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    tabIndex={group === 1 ? -1 : undefined}
                    className="font-mono text-xs tracking-[0.4em] text-white/40 transition-colors hover:text-primary"
                  >
                    {social.name}
                  </a>
                  <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-20 right-6 hidden flex-col items-center gap-4 md:right-12 lg:flex"
      >
        <div className="h-20 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-widest text-primary" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
