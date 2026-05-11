'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import {
  FaReact, FaNodeJs, FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaBootstrap, FaAws, FaGithub, FaCloudflare, FaCode,
  FaGitAlt, FaDatabase, FaGoogle
} from 'react-icons/fa'
import {
  SiMongodb, SiExpress, SiPostgresql, SiTailwindcss,
  SiVercel, SiPostman, SiPrisma, SiCplusplus
} from 'react-icons/si'
import { Star } from 'lucide-react'

const allSkills = [
  // Core Orbit
  { name: 'C++', icon: SiCplusplus, color: '#D1FF00', orbit: 1 },
  { name: 'React.js', icon: FaReact, color: '#61DAFB', orbit: 1 },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', orbit: 1 },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', orbit: 1 },

  // Middle Orbit
  { name: 'Python', icon: FaPython, color: '#3776AB', orbit: 2 },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', orbit: 2 },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff', orbit: 2 },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', orbit: 2 },
  { name: 'AWS', icon: FaAws, color: '#FF9900', orbit: 2 },
  { name: 'Git', icon: FaGitAlt, color: '#F05032', orbit: 2 },

  // Outer Orbit
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26', orbit: 3 },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', orbit: 3 },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', orbit: 3 },
  { name: 'Bootstrap', icon: FaBootstrap, color: '#7952B3', orbit: 3 },
  { name: 'GCP', icon: FaGoogle, color: '#4285F4', orbit: 3 },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff', orbit: 3 },
  { name: 'Cloudflare', icon: FaCloudflare, color: '#F38020', orbit: 3 },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff', orbit: 3 },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', orbit: 3 },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748', orbit: 3 }
]

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [mounted, setMounted] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Motion values for spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50])
  const ySpring = useSpring(yParallax, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 500px at ${x}px ${y}px, rgba(209, 255, 0, 0.15), transparent 80%)`
  )

  const rotateX = useTransform(spotlightY, [0, 1000], [5, -5])
  const rotateY = useTransform(spotlightX, [0, 1000], [-5, 5])

  return (
    <section
      id="skills"
      className="relative py-48 bg-black overflow-hidden min-h-screen flex items-center justify-center"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {mounted && (
        <>
          {/* Dynamic Global Spotlight Layer */}
          <motion.div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ background: spotlightBg }}
          />

          {/* Background Section Title (Ghost) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-anton)] text-[25vw] text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
            Tech Stack
          </div>

          <motion.div 
            style={{ rotateX, rotateY, y: ySpring, perspective: 1000 }}
            className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative mb-32 text-center"
            >
              {/* Background Section Number */}
              <span className="absolute -top-24 left-1/2 -translate-x-1/2 font-[family-name:var(--font-anton)] text-[15vw] text-white/[0.03] select-none pointer-events-none">
                02
              </span>

              <div className="relative z-10">
                <span className="font-mono text-primary text-[10px] tracking-[0.4em] mb-4 block uppercase">02 - SKILLS</span>
                <h2 className="font-[family-name:var(--font-anton)] text-7xl md:text-9xl flex flex-row items-baseline gap-6 md:gap-10 leading-none group">
                  <span className="text-white uppercase group-hover:text-primary transition-colors duration-500">SKILLS</span>
                  <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(209,255,0,0.5)] uppercase relative inline-block">
                    ORBIT_
                    <motion.span 
                      className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* The Orbiting System Container */}
            <div className="relative w-full aspect-square max-w-[800px] flex items-center justify-center">

              {/* Core Center Node */}
              <motion.div
                animate={{
                  boxShadow: ["0 0 20px rgba(209,255,0,0.2)", "0 0 50px rgba(209,255,0,0.4)", "0 0 20px rgba(209,255,0,0.2)"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="z-50 w-24 h-24 rounded-full bg-black border-2 border-primary flex items-center justify-center group"
              >
                <Star className="text-primary w-10 h-10 group-hover:scale-125 transition-transform" />
              </motion.div>

              {/* Orbits */}
              <OrbitGroup
                skills={allSkills.filter(s => s.orbit === 1)}
                radius={140}
                speed={40}
                setHoveredSkill={setHoveredSkill}
                hoveredSkill={hoveredSkill}
                reverse={false}
              />
              <OrbitGroup
                skills={allSkills.filter(s => s.orbit === 2)}
                radius={240}
                speed={60}
                setHoveredSkill={setHoveredSkill}
                hoveredSkill={hoveredSkill}
                reverse={true}
              />
              <OrbitGroup
                skills={allSkills.filter(s => s.orbit === 3)}
                radius={360}
                speed={90}
                setHoveredSkill={setHoveredSkill}
                hoveredSkill={hoveredSkill}
                reverse={false}
              />
            </div>
          </motion.div>
        </>
      )}
    </section>
  )
}

function OrbitGroup({ skills, radius, speed, setHoveredSkill, hoveredSkill, reverse }: any) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* Visual Orbit Ring */}
      <div
        className="absolute rounded-full border border-white/5 pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {skills.map((skill: any, i: number) => {
        const angle = (i / skills.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={skill.name}
            className="absolute pointer-events-auto"
            style={{ x, y }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.3, zIndex: 100 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border border-white/10 flex items-center justify-center cursor-pointer group hover:border-primary transition-all shadow-[0_0_20px_rgba(0,0,0,1)] relative"
              style={{
                boxShadow: hoveredSkill === skill.name ? `0 0 30px ${skill.color}55` : 'none'
              }}
            >
              <skill.icon
                className="w-6 h-6 md:w-8 md:h-8 transition-colors"
                style={{ color: hoveredSkill === skill.name ? skill.color : '#666' }}
              />

              {/* Floating Label Beside Icon */}
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.5 }}
                    animate={{ opacity: 1, x: 50, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.5 }}
                    className="absolute left-full ml-4 z-[110] pointer-events-none"
                  >
                    <div className="bg-black/90 backdrop-blur-md border border-primary/50 px-4 py-1.5 rounded-sm whitespace-nowrap shadow-[0_0_20px_rgba(209,255,0,0.3)]">
                      <span className="font-mono text-sm text-primary uppercase tracking-widest font-bold">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
