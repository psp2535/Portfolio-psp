'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, GraduationCap, Layers, MapPin, Route } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { education, publication } from '@/lib/data'

const pillars = [
  {
    icon: BrainCircuit,
    title: 'AI Systems',
    body: 'Agentic audit engines, Gemini-powered assistants, and LLM features that ship with tests rather than demos.',
    color: '#D1FF00',
  },
  {
    icon: Route,
    title: 'Optimization',
    body: 'Ant Colony Optimization and time-dependent Dijkstra on real GPS data, measured against published baselines.',
    color: '#00E5FF',
  },
  {
    icon: Layers,
    title: 'Full-Stack',
    body: 'MERN platforms with JWT and RBAC, geospatial MongoDB, and REST APIs built to stay fast under load.',
    color: '#B026FF',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-28 md:py-40">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading index="01" eyebrow="About" solid="About" outline="Me" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <div className="lg:col-span-7">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-lg font-light leading-relaxed text-muted-foreground md:text-xl"
            >
              <p>
                I&apos;m a <span className="font-medium text-white">4th-year Integrated B.Tech + M.Tech (IT) student at ABV-IIITM Gwalior</span>.
                I like problems where a clever algorithm and a well-built product have to meet.
              </p>
              <p>
                Most recently I built <span className="text-primary">Brand AI Readiness Audit</span>, a 70+ check engine
                that explains why AI assistants can&apos;t find a brand&apos;s website. It took my team to the{' '}
                <span className="text-white">Adobe University Hackathon Grand Finale (Top 8 of 80,000+)</span>.
              </p>
              <p>
                Before that I cut fleet travel time by <span className="text-white">18%</span> with ACO + time-dependent
                routing on Beijing taxi data, and shipped <span className="text-white">BizNova</span>, a multilingual AI
                retail platform that won or placed at three national hackathons.
              </p>
              <p>
                I&apos;m also a co-author at <span className="text-white">{publication.venue}</span>, and I keep my problem-solving sharp
                on LeetCode and CodeChef.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25"
                >
                  <div
                    className="absolute left-0 top-0 h-0 w-[2px] transition-all duration-500 group-hover:h-full"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 16px ${p.color}` }}
                  />
                  <p.icon className="mb-4 h-6 w-6" style={{ color: p.color }} />
                  <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6 lg:col-span-5">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative overflow-hidden border border-white/10 bg-white/[0.03] p-7 md:p-8"
            >
              <img
                src="/iiitm-logo.png"
                alt=""
                aria-hidden="true"
                className="absolute -right-4 -top-4 h-32 w-32 object-contain opacity-15 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
              />
              <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                <GraduationCap className="h-4 w-4" /> Education
              </div>
              <h3 className="mb-1 text-2xl font-medium text-white">{education.short}</h3>
              <p className="mb-1 text-sm text-white/60">{education.school}</p>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">{education.degree}</p>

              <div className="my-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                <div className="bg-black p-4">
                  <span className="block font-[family-name:var(--font-anton)] text-4xl text-primary">{education.cgpa}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">CGPA / 10</span>
                </div>
                <div className="bg-black p-4">
                  <span className="block font-[family-name:var(--font-anton)] text-4xl text-white">2028</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Graduating (M.Tech)</span>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-white/50">
                <span>{education.period}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {education.location}
                </span>
              </div>

              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Relevant coursework</p>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span key={c} className="border border-white/10 px-3 py-1 font-mono text-[11px] text-white/70">
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-6 h-1 w-12 bg-primary/40 transition-all duration-700 group-hover:w-full" />
            </motion.div>

            <motion.a
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.3 }}
              href={publication.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-white/10 bg-gradient-to-br from-[#FF2E88]/[0.07] to-transparent p-7 transition-colors hover:border-[#FF2E88]/50"
            >
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF2E88]">
                Publication · {publication.venue}
              </span>
              <p className="mb-3 text-lg leading-snug text-white">&ldquo;{publication.title}&rdquo;</p>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors group-hover:text-white">
                {publication.role} · Read on OpenReview ↗
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
