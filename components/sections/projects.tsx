'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    index: '01',
    year: '2026',
    category: '[ FULL-STACK PLATFORM ]',
    title: 'ABV-IIITM REGISTRATION',
    subtitle: 'SMART ACADEMIC MANAGEMENT SYSTEM',
    description: 'Scalable academic workflow platform featuring secure authentication, automated approval pipelines, dynamic course allocation, and real-time validation for 500+ users.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs'],
    liveUrl: 'https://abviiitm-frontend.onrender.com',
    githubUrl: 'https://github.com/psp2535/HCI_PROJECT',
    hoverColor: '#D1FF00' // Lime Green
  },
  {
    index: '02',
    year: '2026',
    category: '[ HACKATHON ]',
    title: 'SMART KIRANA',
    subtitle: 'AI-POWERED RETAIL OPERATING SYSTEM',
    description: 'Comprehensive AI-driven retail platform built during Hacksagon 2026, enabling smart inventory management, AI-powered business insights, automated bill scanning, and conversational retail operations for small businesses.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'Tailwind', 'JWT'],
    liveUrl: 'https://biznova.onrender.com/',
    githubUrl: 'https://github.com/psp2535/Smart-Kirana',
    hoverColor: '#00f2ff' // Cyan
  },
  {
    index: '03',
    year: '2025',
    category: '[ HACKATHON ]',
    title: 'BIZNOVA',
    subtitle: 'AI-POWERED BUSINESS INTELLIGENCE PLATFORM',
    description: 'Built during the AI for All Hackathon 2026, BizNova is an AI-driven retail management platform designed to automate inventory, CRM, analytics, and business operations using intelligent automation and predictive insights.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Tailwind'],
    liveUrl: 'https://biznova.onrender.com/login',
    githubUrl: 'https://github.com/suri5790/Biznova',
    hoverColor: '#bd00ff' // Purple
  },
  {
    index: '04',
    year: '2025',
    category: '[ FULL-STACK PLATFORM ]',
    title: 'BLOGGING PLATFORM',
    subtitle: 'MODERN CONTENT PUBLISHING SYSTEM',
    description: 'Full-stack blogging platform featuring secure authentication, seamless content publishing, and intuitive blog management with a scalable backend architecture and responsive user experience.',
    tech: ['React.js', 'TypeScript', 'Hono', 'Prisma', 'Wrangler', 'Vercel'],
    liveUrl: 'https://blogging-website-livid.vercel.app/',
    githubUrl: 'https://github.com/suri5790/Blogging-Website',
    hoverColor: '#ff0055' // Pink/Red
  },
]

function ProjectCard({ project, index, isInView }: {
  project: typeof projects[0],
  index: number,
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)

    // Update spotlight CSS variables
    cardRef.current.style.setProperty('--mouse-x', `${(e.clientX - rect.left)}px`)
    cardRef.current.style.setProperty('--mouse-y', `${(e.clientY - rect.top)}px`)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const textTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const textTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="group relative bg-[#070707] border border-white/5 p-8 md:p-10 transition-all duration-700 hover:bg-[#0a0a0a] overflow-hidden cursor-default"
    >
      {/* Dynamic Colored Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.hoverColor}25, transparent 80%)`,
        }}
      />

      {/* Accent Hover Line with Glow */}
      <div
        className="absolute left-0 top-0 w-[2px] h-0 transition-all duration-700 group-hover:h-full z-20"
        style={{
          backgroundColor: project.hoverColor,
          boxShadow: `0 0 20px ${project.hoverColor}`
        }}
      />

      {/* Background Noise/Grain Overlay - Bulletproof Data-URI */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* Header Meta Row */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.3em] text-white/40">
          <span className="font-bold group-hover:scale-110 transition-transform" style={{ color: project.hoverColor }}>{project.index}</span>
          <span className="group-hover:text-white/80 transition-colors">{project.year}</span>
          <span className="text-white/20 group-hover:text-primary/40 transition-colors">{project.category}</span>
        </div>
        <div className="flex items-center gap-4 text-white/30">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: project.hoverColor, rotate: 5 }}
            className="transition-all"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: project.hoverColor, rotate: -5 }}
            className="transition-all"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      {/* Title & Subtitle */}
      <motion.div
        style={{ x: textTranslateX, y: textTranslateY }}
        className="mb-8 relative z-10 pointer-events-none"
      >
        <h3
          className="font-[family-name:var(--font-anton)] text-5xl md:text-6xl text-white mb-2 tracking-tight transition-all duration-700"
        >
          <style jsx>{`
            .group:hover h3 {
              color: ${project.hoverColor} !important;
              text-shadow: 0 0 30px ${project.hoverColor}44;
            }
          `}</style>
          {project.title}
        </h3>
        <p className="font-mono text-[10px] tracking-[0.5em] text-white/40 uppercase group-hover:text-white/60 transition-colors">
          {project.subtitle}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        style={{ x: useTransform(textTranslateX, v => v * 0.5), y: useTransform(textTranslateY, v => v * 0.5) }}
        className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-md relative z-10 group-hover:text-white/80 transition-colors pointer-events-none"
      >
        {project.description}
      </motion.p>

      {/* Tech Stack Tags */}
      <motion.div
        style={{ x: useTransform(textTranslateX, v => v * 0.3), y: useTransform(textTranslateY, v => v * 0.3) }}
        className="flex flex-wrap gap-2 relative z-10 pointer-events-none"
      >
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 border border-white/10 rounded-sm text-[9px] font-mono tracking-widest text-white/40 uppercase transition-all duration-500 group-hover:border-primary/30 group-hover:text-white"
          >
            <style jsx>{`
              .group:hover span {
                border-color: ${project.hoverColor}33 !important;
                background: ${project.hoverColor}05;
                box-shadow: 0 0 10px ${project.hoverColor}11;
              }
            `}</style>
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 500px at ${x}px ${y}px, rgba(209, 255, 0, 0.15), transparent 80%)`
  )

  const rotateX = useTransform(spotlightY, [0, 1000], [3, -3])
  const rotateY = useTransform(spotlightX, [0, 1000], [-3, 3])

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

  return (
    <section 
      id="projects" 
      className="relative py-48 bg-black overflow-hidden" 
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Global Spotlight Layer */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: spotlightBg }}
      />
      <motion.div 
        style={{ rotateX, rotateY, y: ySpring, perspective: 1000 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Heading - Matches Skills Orbit Style (Cleaned) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mb-32 text-center"
        >
          <span className="font-mono text-primary text-[10px] tracking-[0.4em] mb-4 block uppercase">03 - PROJECTS</span>
          <div className="relative z-10">
            <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-8xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 leading-none group">
              <span className="text-white uppercase group-hover:text-primary transition-colors duration-500">PROJECTS &</span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(209,255,0,0.5)] uppercase relative inline-block">
                HACKATHONS_
                <motion.span 
                  className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 px-[1px] bg-white/5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* See More on GitHub - Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <motion.a
            href="https://github.com/psp2535"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, borderColor: '#D1FF00', color: '#D1FF00' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-6 px-12 py-8 border border-white/10 rounded-sm group transition-all duration-300"
          >
            <Github className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-2xl md:text-3xl tracking-widest uppercase">
              See more on GitHub
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
