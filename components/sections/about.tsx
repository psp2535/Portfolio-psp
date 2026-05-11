'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import {
  FaGraduationCap, FaTrophy, FaBolt, FaCode, FaServer, FaReact, FaNodeJs
} from 'react-icons/fa'
import {
  SiCplusplus, SiMongodb, SiExpress, SiOpenai
} from 'react-icons/si'
import { Sparkles, Binary } from 'lucide-react'

const achievements = [
  {
    image: 'https://www.uxdt.nic.in/wp-content/uploads/2025/10/auto-draft-ai-impact-summit-india2025-01.jpg',
    title: 'Winner, AI for All Hackathon',
    desc: 'India AI Impact Summit (Top 1%)',
    color: '#D1FF00'
  },
  {
    image: 'https://assets.devfolio.co/hackathons/f19cef0394ce46468a38da2b6612aa54/assets/logo/81.png',
    title: 'Top Performer, HACKSAGON',
    desc: 'Among 2600+ teams nationwide',
    color: '#06b6d4'
  },
  {
    image: '/nxtwave-logo.png',
    title: 'OpenAI x Nxtwave Finalist',
    desc: 'Buildathon 2025 AI Innovation',
    color: '#9333ea'
  },
  {
    icon: Binary,
    title: 'Rank 1578, CodeFest’25',
    desc: 'National Programming Contest',
    color: '#ff00ff'
  },
]

const skills = [
  { icon: SiCplusplus, name: 'C++', color: '#00599C' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiExpress, name: 'Express.js', color: '#ffffff' },
  { icon: FaReact, name: 'React.js', color: '#61DAFB' },
  { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50])
  const ySpring = useSpring(yParallax, { stiffness: 100, damping: 30 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(springY, [0, 1000], [5, -5])
  const rotateY = useTransform(springX, [0, 1920], [-5, 5])

  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 500px at ${x}px ${y}px, rgba(209, 255, 0, 0.15), transparent 80%)`
  )

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      // Only update if mouse is within a reasonable range of the section
      if (e.clientY >= rect.top - 500 && e.clientY <= rect.bottom + 500) {
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  return (
    <section
      id="about"
      className="relative pt-48 pb-32 bg-black overflow-hidden"
      ref={ref}
    >
      {/* Dynamic Global Spotlight Layer */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl ml-auto mr-auto lg:ml-20 px-6">
        <motion.div
          style={{ rotateX, rotateY, y: ySpring, perspective: 1000 }}
          className="grid lg:grid-cols-12 gap-16"
        >

          {/* Left Column - Heading and Bio */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Background Section Number */}
              <span className="absolute -top-20 -left-10 font-[family-name:var(--font-anton)] text-[15vw] text-white/[0.03] select-none pointer-events-none">
                01
              </span>

              <div className="relative z-10">
                <span className="font-mono text-primary text-[10px] tracking-[0.4em] mb-4 block uppercase">01 - ABOUT</span>
                <h2 className="font-[family-name:var(--font-anton)] text-7xl md:text-9xl mb-16 flex flex-row items-baseline gap-6 md:gap-10 leading-none group">
                  <span className="text-white group-hover:text-primary transition-colors duration-500">ABOUT</span>
                  <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(209,255,0,0.5)] relative inline-block">
                    ME_
                    <motion.span
                      className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg md:text-xl leading-relaxed font-light max-w-3xl">
                <p className="hover:text-white transition-colors duration-300">
                  <span className="text-white font-medium">Third-year Integrated B.Tech–M.Tech student at ABV-IIITM Gwalior</span>, passionate about building scalable digital products and solving complex engineering problems.
                </p>
                <p className="hover:text-white transition-colors duration-300">
                  I specialize in <span className="text-primary">full-stack development with the MERN stack</span>, crafting modern web applications that combine clean user experiences with efficient and scalable backend systems.
                </p>
                <p className="hover:text-white transition-colors duration-300">
                  Driven by curiosity and continuous learning, I’m currently focused on <span className="text-white">Data Structures & Algorithms</span>, <span className="text-primary">AI-powered applications</span>, and building impactful software through real-world projects and collaborations.
                </p>
              </div>

              {/* Skills Quick Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-2xl">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-sm group hover:border-primary/50 transition-all cursor-default"
                  >
                    <skill.icon className="w-4 h-4 transition-colors" style={{ color: skill.color }} />
                    <span className="text-sm font-mono text-white/70 group-hover:text-white">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Experience and Achievements */}
          <div className="lg:col-span-4 space-y-8">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 border border-white/10 rounded-sm relative group overflow-hidden cursor-default"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all">
                <img
                  src="/iiitm-logo.png"
                  alt="ABV-IIITM"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="font-mono text-primary text-xs uppercase tracking-widest mb-4">Education</h3>
              <p className="text-white font-medium text-xl mb-1">ABV-IIITM Gwalior</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wide">Integrated B.Tech–M.Tech (IT)</p>
              <div className="mt-4 w-12 h-1 bg-primary/30 group-hover:w-full transition-all duration-700" />
            </motion.div>

            {/* Achievements Section */}
            <div className="space-y-4">
              <h3 className="font-mono text-muted-foreground text-xs uppercase tracking-widest mb-6 px-2">Achievements & Recognition</h3>
              {achievements.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-sm group transition-all cursor-default"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-sm bg-black border border-white/10 group-hover:border-primary/50 transition-colors p-2">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      ) : Icon && (
                        <Icon className="w-full h-full group-hover:scale-110 transition-transform" style={{ color: item.color }} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
