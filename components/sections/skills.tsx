'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { motion } from 'framer-motion'
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { TbApi, TbBrain } from 'react-icons/tb'
import { Drama, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { skillGroups } from '@/lib/data'

type Group = (typeof skillGroups)[number]['title']
type OrbitSkill = {
  name: string
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  group: Group
}

const rings: { skills: OrbitSkill[]; duration: number; reverse?: boolean; ratio: number }[] = [
  {
    ratio: 0.36,
    duration: 38,
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776AB', group: 'Languages' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C', group: 'Languages' },
      { name: 'React.js', icon: SiReact, color: '#61DAFB', group: 'Frontend' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', group: 'Backend' },
    ],
  },
  {
    ratio: 0.63,
    duration: 60,
    reverse: true,
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', group: 'Languages' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', group: 'Databases' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff', group: 'Backend' },
      { name: 'Gemini API', icon: SiGooglegemini, color: '#8E75FF', group: 'AI & Data' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', group: 'Databases' },
      { name: 'Playwright', icon: Drama, color: '#2EAD33', group: 'Tools' },
      { name: 'Machine Learning', icon: TbBrain, color: '#FF6F61', group: 'AI & Data' },
    ],
  },
  {
    ratio: 0.9,
    duration: 90,
    skills: [
      { name: 'C', icon: SiC, color: '#A8B9CC', group: 'Languages' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', group: 'Languages' },
      { name: 'REST APIs', icon: TbApi, color: '#D1FF00', group: 'Backend' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#FB015B', group: 'Backend' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', group: 'Frontend' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', group: 'Frontend' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26', group: 'Frontend' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6', group: 'Frontend' },
      { name: 'Pandas', icon: SiPandas, color: '#E70488', group: 'AI & Data' },
      { name: 'NumPy', icon: SiNumpy, color: '#4DABCF', group: 'AI & Data' },
      { name: 'Git', icon: SiGit, color: '#F05032', group: 'Tools' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff', group: 'Tools' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37', group: 'Tools' },
    ],
  },
]

const groupColors: Record<string, string> = {
  Languages: '#D1FF00',
  Backend: '#5FA04E',
  Databases: '#47A248',
  Frontend: '#61DAFB',
  'AI & Data': '#8E75FF',
  Tools: '#FF6C37',
}

export function Skills() {
  const systemRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  useEffect(() => {
    const el = systemRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setSize(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const nodeSize = size < 420 ? 34 : 48
  const activeSkillObj = rings.flatMap((r) => r.skills).find((s) => s.name === activeSkill)

  const isLit = (s: OrbitSkill) =>
    activeSkill ? activeSkill === s.name : activeGroup ? activeGroup === s.group : false
  const isDim = (s: OrbitSkill) => (activeSkill || activeGroup) && !isLit(s)

  return (
    <section id="skills" className="relative overflow-hidden bg-black py-28 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-anton)] text-[25vw] uppercase tracking-tighter text-white/[0.015] select-none"
      >
        Tech Stack
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          solid="Skills"
          outline="Orbit"
          description="The stack behind my audit engines, routing research and MERN platforms. Hover or tap a category to light up its orbit."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Orbit system */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            ref={systemRef}
            className="orbit-system relative mx-auto aspect-square w-full max-w-[560px]"
            onMouseLeave={() => setActiveSkill(null)}
          >
            {/* Core */}
            <div className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-primary bg-black text-center animate-pulse-glow md:h-28 md:w-28">
              {activeSkillObj ? (
                <>
                  <activeSkillObj.icon className="mb-1 h-6 w-6 md:h-8 md:w-8" style={{ color: activeSkillObj.color }} />
                  <span className="px-1 font-mono text-[8px] uppercase leading-tight tracking-wider text-white md:text-[10px]">
                    {activeSkillObj.name}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 text-primary md:h-9 md:w-9" />
                  <span className="mt-1 font-mono text-[8px] uppercase tracking-widest text-white/50 md:text-[9px]">
                    {activeGroup ?? 'Stack'}
                  </span>
                </>
              )}
            </div>

            {size > 0 &&
              rings.map((ring, ri) => {
                const radius = (size / 2) * ring.ratio
                return (
                  <div
                    key={ri}
                    className={`orbit absolute inset-0 ${ring.reverse ? 'orbit-reverse' : ''}`}
                    style={{ ['--orbit-duration' as string]: `${ring.duration}s` }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.07]"
                      style={{ width: radius * 2, height: radius * 2 }}
                    />
                    {ring.skills.map((skill, i) => {
                      const angle = (i / ring.skills.length) * Math.PI * 2 + ri * 0.6
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      const lit = isLit(skill)
                      const dim = isDim(skill)
                      return (
                        <div
                          key={skill.name}
                          className="absolute left-1/2 top-1/2"
                          style={{ transform: `translate(${x - nodeSize / 2}px, ${y - nodeSize / 2}px)`, zIndex: lit ? 20 : 10 }}
                        >
                          <div className="orbit-item">
                            <button
                              type="button"
                              aria-label={skill.name}
                              onMouseEnter={() => setActiveSkill(skill.name)}
                              onFocus={() => setActiveSkill(skill.name)}
                              onBlur={() => setActiveSkill(null)}
                              onClick={() => setActiveSkill((s) => (s === skill.name ? null : skill.name))}
                              className="flex items-center justify-center rounded-full border bg-black transition-all duration-300"
                              style={{
                                width: nodeSize,
                                height: nodeSize,
                                borderColor: lit ? skill.color : 'rgba(255,255,255,0.12)',
                                boxShadow: lit ? `0 0 24px ${skill.color}88` : '0 0 20px rgba(0,0,0,1)',
                                opacity: dim ? 0.25 : 1,
                                transform: lit ? 'scale(1.25)' : 'scale(1)',
                              }}
                            >
                              <skill.icon
                                className="h-1/2 w-1/2 transition-colors duration-300"
                                style={{ color: lit || (!activeSkill && !activeGroup) ? skill.color : '#666' }}
                              />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
          </motion.div>

          {/* Category cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((group, i) => {
              const color = groupColors[group.title] ?? '#D1FF00'
              const active = activeGroup === group.title
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onMouseEnter={() => setActiveGroup(group.title)}
                  onMouseLeave={() => setActiveGroup(null)}
                  onClick={() => setActiveGroup((g) => (g === group.title ? null : group.title))}
                  className="group relative cursor-default overflow-hidden border bg-white/[0.02] p-5 transition-colors"
                  style={{ borderColor: active ? `${color}66` : 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-[2px] origin-top transition-transform duration-500"
                    style={{ backgroundColor: color, transform: active ? 'scaleY(1)' : 'scaleY(0)', boxShadow: `0 0 12px ${color}` }}
                  />
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.25em]" style={{ color: active ? color : '#fff' }}>
                      {group.title}
                    </h3>
                    <span className="font-mono text-[10px] text-white/30">0{i + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border border-white/10 px-2.5 py-1 font-mono text-[11px] text-white/60 transition-colors group-hover:text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
