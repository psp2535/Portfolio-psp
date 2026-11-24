'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Trophy } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { AuditVisual, RetailVisual, RoutingVisual } from '@/components/sections/project-visuals'
import { featuredProjects, otherProjects, socials, type Project } from '@/lib/data'

const visuals: Record<string, (p: { color: string }) => React.ReactElement> = {
  'brand-ai-audit': AuditVisual,
  'traffic-ai': RoutingVisual,
  biznova: RetailVisual,
}

/** Black or white text, whichever reads better on the given hex background. */
function textOn(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#000' : '#fff'
}

/** Updates --mx/--my on the element so a CSS radial gradient can follow the cursor. */
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return { ref, onMouseMove }
}

function FeaturedProject({ project, flip }: { project: Project; flip: boolean }) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>()
  const Visual = visuals[project.id]

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden border border-white/[0.07] bg-[#070707] p-6 md:p-10 lg:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), ${project.color}18, transparent 75%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-20 h-0 w-[2px] transition-all duration-700 group-hover:h-full"
        style={{ backgroundColor: project.color, boxShadow: `0 0 20px ${project.color}` }}
      />

      <div className={`relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-14 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Copy */}
        <div className="flex flex-col">
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span className="font-bold" style={{ color: project.color }}>
              {project.index}
            </span>
            <span>{project.period}</span>
          </div>

          {project.badge && (
            <span
              className="mb-4 inline-flex w-fit items-center gap-2 border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: project.color, borderColor: `${project.color}55`, backgroundColor: `${project.color}0d` }}
            >
              <Trophy className="h-3 w-3" /> {project.badge}
            </span>
          )}

          <h3 className="mb-2 font-[family-name:var(--font-anton)] text-4xl uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            {project.title}
          </h3>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">{project.subtitle}</p>
          {project.event && <p className="mb-6 font-mono text-[11px] tracking-wider" style={{ color: project.color }}>{project.event}</p>}

          <p className="mb-6 text-base leading-relaxed text-white/75">{project.summary}</p>

          <ul className="mb-8 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: project.color }} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ backgroundColor: project.color, color: textOn(project.color) }}
              >
                Live demo <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                <Github className="h-4 w-4" /> Source
              </a>
            )}
          </div>
        </div>

        {/* Visual + metrics */}
        <div className="flex flex-col justify-center gap-4">
          <div>{Visual && <Visual color={project.color} />}</div>
          <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-black p-4">
                <span className="block font-[family-name:var(--font-anton)] text-2xl md:text-4xl" style={{ color: project.color }}>
                  {m.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 md:text-[10px]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-black py-28 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          solid="Selected"
          outline="Work"
          description="Three flagship builds, each one measured: an AI-search audit engine, a routing system that beats a published baseline, and a retail platform that won national hackathons."
        />

        <div className="space-y-6 md:space-y-8">
          {featuredProjects.map((p, i) => (
            <FeaturedProject key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        {/* More builds */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.4em] text-white/50"
          >
            <span className="h-px w-8 bg-primary/60" /> More builds
          </motion.h3>
          <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {otherProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col bg-[#070707] p-6 transition-colors hover:bg-[#0c0c0c]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-primary">0{i + 4}</span>
                  <div className="flex gap-3 text-white/40">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="transition-colors hover:text-primary">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="transition-colors hover:text-primary">
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="mb-3 font-[family-name:var(--font-anton)] text-2xl uppercase tracking-tight text-white transition-colors group-hover:text-primary">
                  {p.title}
                </h4>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-white/50">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                      #{t.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex justify-center"
          >
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border border-white/10 px-8 py-6 transition-colors hover:border-primary hover:text-primary md:px-12"
            >
              <Github className="h-7 w-7 opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="font-mono text-lg uppercase tracking-widest md:text-2xl">See more on GitHub</span>
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
