'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Award } from 'lucide-react'
import { Counter } from '@/components/ui/counter'
import { SectionHeading } from '@/components/ui/section-heading'
import { achievements, type Achievement } from '@/lib/data'

function HighlightCard({ a }: { a: Achievement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mb-20 overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-[#070707] to-[#070707] p-7 md:p-12"
    >
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
      <div aria-hidden="true" className="sheen pointer-events-none absolute inset-0" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
            <Award className="h-3.5 w-3.5" /> Highlight · {a.year}
          </span>
          <h3 className="mb-3 font-[family-name:var(--font-anton)] text-4xl uppercase leading-[0.95] text-white md:text-6xl">
            {a.title}
          </h3>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">{a.result}</p>
          <p className="mb-8 max-w-xl leading-relaxed text-white/70">{a.description}</p>
          {a.link && (
            <a
              href={a.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-black"
            >
              View {a.link.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
          <div className="col-span-2 bg-black p-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Final rank</span>
            <p className="font-[family-name:var(--font-anton)] text-7xl leading-none text-primary md:text-8xl text-glow">
              <Counter value={8} prefix="#" duration={1.2} />
            </p>
          </div>
          <div className="bg-black p-5">
            <Counter value={80000} suffix="+" className="block font-[family-name:var(--font-anton)] text-3xl text-white" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">teams</span>
          </div>
          <div className="bg-black p-5">
            <span className="block font-[family-name:var(--font-anton)] text-3xl text-white">0.01%</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">top nationwide</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineCard({ a, index }: { a: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className="group relative overflow-hidden border border-white/[0.07] bg-[#070707] p-6 transition-colors hover:bg-[#0b0b0b] md:p-7"
    >
      <div
        className="absolute left-0 top-0 z-20 h-0 w-[2px] transition-all duration-500 group-hover:h-full"
        style={{ backgroundColor: a.color, boxShadow: `0 0 15px ${a.color}` }}
      />
      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em]">
        <span style={{ color: a.color }}>{a.org}</span>
        <span className="text-white/30">{a.year}</span>
      </div>
      <h3 className="mb-1 font-[family-name:var(--font-anton)] text-2xl uppercase tracking-tight text-white md:text-3xl">{a.title}</h3>
      <p className="mb-3 font-mono text-xs uppercase tracking-wider" style={{ color: a.color }}>
        {a.result}
      </p>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70">{a.description}</p>
      {a.link && (
        <a
          href={a.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/50 transition-colors hover:text-white"
        >
          {a.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </motion.div>
  )
}

export function Achievements() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start center', 'end center'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [highlight, ...rest] = achievements

  return (
    <section id="achievements" className="relative overflow-hidden bg-black py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-anton)] text-[25vw] uppercase tracking-tighter text-white/[0.015] select-none"
      >
        Milestones
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          index="04"
          eyebrow="Achievements"
          solid="Wins &"
          outline="Milestones"
          description="Hackathon podiums, a peer-reviewed publication and selective programs. Every claim links to its certificate."
        />

        <HighlightCard a={highlight} />

        <div className="relative" ref={timelineRef}>
          <div className="absolute bottom-0 left-3 top-0 w-[2px] overflow-hidden bg-white/[0.04] md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#D1FF00] via-[#00E5FF] to-[#B026FF] shadow-[0_0_25px_rgba(209,255,0,0.6)]"
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            {rest.map((a, i) => (
              <div key={a.title} className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full pl-10 md:w-[calc(50%-48px)] md:pl-0">
                  <TimelineCard a={a} index={i} />
                </div>
                <div className="absolute left-3 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:static md:flex md:w-24 md:translate-x-0 md:translate-y-0 md:justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="h-4 w-4 rounded-full border-2 bg-black"
                    style={{ borderColor: a.color, boxShadow: `0 0 15px ${a.color}` }}
                  />
                </div>
                <div className="hidden md:block md:w-[calc(50%-48px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
