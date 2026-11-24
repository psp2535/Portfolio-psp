'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si'
import { Counter } from '@/components/ui/counter'
import { SectionHeading } from '@/components/ui/section-heading'
import { codingProfiles } from '@/lib/data'

const meta: Record<
  string,
  { icon: typeof SiLeetcode; tierFrom: number; tierTo: number; nextTier: string; extra?: React.ReactNode }
> = {
  LeetCode: { icon: SiLeetcode, tierFrom: 1500, tierTo: 1850, nextTier: 'Knight' },
  CodeChef: {
    icon: SiCodechef,
    tierFrom: 1400,
    tierTo: 1600,
    nextTier: '3★',
    extra: (
      <div className="flex shrink-0 items-center gap-0.5 pb-2" aria-label="2 star coder">
        {[0, 1].map((i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#C08B5C] text-[#C08B5C]" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3.5 w-3.5 text-white/15" />
        ))}
      </div>
    ),
  },
  Codeforces: { icon: SiCodeforces, tierFrom: 0, tierTo: 1200, nextTier: 'Pupil' },
}

export function Coding() {
  return (
    <section id="coding" className="relative overflow-hidden bg-black py-28 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          index="05"
          eyebrow="Competitive Programming"
          solid="Problem"
          outline="Solving"
          description="Rated contests keep my DSA fundamentals sharp, and those fundamentals carry straight into routing heuristics and audit-engine performance."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {codingProfiles.map((p, i) => {
            const m = meta[p.platform]
            const Icon = m.icon
            const progress = Math.min(1, Math.max(0, (p.headline.value - m.tierFrom) / (m.tierTo - m.tierFrom)))
            return (
              <motion.a
                key={p.platform}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`group relative block overflow-hidden border border-white/[0.08] bg-[#070707] p-7 transition-colors md:p-8 ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ ['--c' as string]: p.color }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: p.color }}
                />
                <Icon
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-8 h-44 w-44 opacity-[0.04] transition-all duration-700 group-hover:rotate-12 group-hover:opacity-[0.08]"
                  style={{ color: p.color }}
                />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center border border-white/10 bg-black">
                        <Icon className="h-6 w-6" style={{ color: p.color }} />
                      </span>
                      <div>
                        <p className="font-mono text-sm font-bold uppercase tracking-widest text-white">{p.platform}</p>
                        <p className="font-mono text-xs text-white/40">@{p.handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                  </div>

                  <div className="mb-2 flex items-end justify-between gap-4">
                    <Counter
                      value={p.headline.value}
                      className="font-[family-name:var(--font-anton)] text-7xl leading-none"
                    />
                    {m.extra}
                  </div>
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em]" style={{ color: p.color }}>
                    {p.headline.label}
                  </p>

                  <div className="mb-8">
                    <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/40">
                      <span>Now {p.headline.value}</span>
                      <span>Next: {m.nextTier} · {m.tierTo}</span>
                    </div>
                    <div className="h-1.5 bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full"
                        style={{ backgroundColor: p.color, boxShadow: `0 0 12px ${p.color}` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10">
                    {p.stats.map((s) => (
                      <div key={s.label} className="bg-black p-4">
                        <span className="block font-[family-name:var(--font-anton)] text-3xl text-white">{s.value}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {p.platform === 'CodeChef' && (
                    <p className="mt-4 font-mono text-[11px] text-white/40">
                      Best global ranks: <span className="text-white/70">435</span> (Starters 188) ·{' '}
                      <span className="text-white/70">851</span> (Starters 173)
                    </p>
                  )}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
