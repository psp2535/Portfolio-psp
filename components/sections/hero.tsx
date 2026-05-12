'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, ArrowDown, Download, Send } from 'lucide-react'
import { gsap } from 'gsap'

const socialLinks = [
  { icon: Github, href: 'https://github.com/saipranav', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/saipranav', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saipranav@example.com', label: 'Email' },
  { icon: Code2, href: 'https://leetcode.com/saipranav', label: 'LeetCode' },
]

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse tracking for colorful background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const slowSpringX = useSpring(mouseX, { stiffness: 20, damping: 30 })
  const slowSpringY = useSpring(mouseY, { stiffness: 20, damping: 30 })

  const [roleIndex, setRoleIndex] = useState(0)
  const roles = [
    "MERN Developer",
    "Freelancer",
    "Coder",
    "OpenSource Contributor",
    "FullStack Developer"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [roles.length])

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-20"
    >
      {/* Default Static background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-orb"
          style={{
            background: 'radial-gradient(circle, rgba(209, 255, 0, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Interactive Colorful Mouse Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
        {/* Dynamic Rainbow Orbs - Matching Cursor Style */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(209,255,0,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,0,255,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,165,0,0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(209,255,0,0.4) 0%, transparent 70%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            x: useTransform(springX, x => x - 300),
            y: useTransform(springY, y => y - 300),
            filter: 'blur(100px)',
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(209,255,0,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
          style={{
            x: useTransform(slowSpringX, x => x - 250),
            y: useTransform(slowSpringY, y => y - 250),
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Social Marquee with Real Links - MOVED OUT of pointer-events-none */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 py-4 bg-black/50 backdrop-blur-sm z-40">
        <div className="flex whitespace-nowrap">
          {[1, 2].map((group) => (
            <motion.div
              key={group}
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex items-center gap-12 px-6 shrink-0"
            >
              {[
                { name: "GITHUB", url: "https://github.com/psp2535" },
                { name: "GMAIL", url: "mailto:saipranav974@gmail.com" },
                { name: "LINKEDIN", url: "https://www.linkedin.com/in/pathangesaipranav" },
                { name: "TWITTER", url: "https://x.com/psp25305?s=11" },
                { name: "GITHUB", url: "https://github.com/psp2535" },
                { name: "GMAIL", url: "mailto:saipranav974@gmail.com" },
                { name: "LINKEDIN", url: "https://www.linkedin.com/in/pathangesaipranav" },
                { name: "TWITTER", url: "https://x.com/psp25305?s=11" }
              ].map((social, i) => (
                <div key={i} className="flex items-center gap-12">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs tracking-[0.4em] text-white/40 hover:text-primary cursor-pointer transition-colors relative z-50"
                  >
                    {social.name}
                  </a>
                  <div className="w-1.5 h-1.5 rotate-45 bg-primary" />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-fit mx-auto flex flex-col items-start text-left pt-20"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-primary text-xs font-semibold tracking-widest uppercase">
              OPEN TO WORK
            </span>
          </div>
          <span className="font-mono text-muted-foreground text-xs tracking-widest uppercase">
            |&nbsp;&nbsp;&nbsp;GWALIOR, INDIA
          </span>
        </motion.div>

        {/* Revamped Name with Editorial Style and Perspective Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            rotateX: useTransform(slowSpringY, [0, 1080], [10, -10]),
            rotateY: useTransform(slowSpringX, [0, 1920], [-10, 10]),
            perspective: 1000
          }}
          className="relative z-20 mb-8 mt-4 flex flex-col items-start cursor-default select-none"
        >
          <h1 className="font-[family-name:var(--font-anton)] text-[15vw] md:text-[11vw] leading-[0.9] tracking-tighter uppercase flex flex-col md:flex-row items-start md:items-baseline gap-2 md:gap-x-10">
            <span className="relative inline-block group text-white">
              {"PATHANGE".split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    scaleY: 1.2,
                    color: "#D1FF00",
                    textShadow: "0 0 50px rgba(209,255,0,0.8)"
                  }}
                  whileTap={{
                    scaleY: 1.2,
                    color: "#D1FF00",
                    textShadow: "0 0 50px rgba(209,255,0,0.8)"
                  }}
                  className="inline-block transition-all duration-300 origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="relative inline-block text-transparent [-webkit-text-stroke:2px_rgba(209,255,0,0.6)] hover:[-webkit-text-stroke:2px_#D1FF00] transition-all duration-500">
              {"SAI PRANAV".split("").map((char, i) => (char === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <motion.span
                  key={i}
                  whileHover={{
                    scale: 1.1,
                    color: "#D1FF00",
                    textShadow: "0 0 40px rgba(209,255,0,1)"
                  }}
                  whileTap={{
                    scale: 1.1,
                    color: "#D1FF00",
                    textShadow: "0 0 40px rgba(209,255,0,1)"
                  }}
                  className="inline-block transition-all duration-300"
                >
                  {char}
                </motion.span>
              )))}
              <span className="text-primary animate-pulse ml-2">_</span>
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6 max-w-2xl mb-10"
        >
          <motion.p 
            whileHover={{ scale: 1.02, x: 10 }}
            className="font-mono text-muted-foreground text-lg sm:text-xl cursor-default group transition-colors duration-300 hover:text-white"
          >
            <span className="text-primary group-hover:drop-shadow-[0_0_10px_#D1FF00]">//</span> I build & contribute for things I love
          </motion.p>
          <div className="text-xl sm:text-2xl text-muted-foreground font-light flex flex-wrap items-center gap-x-3">
            <motion.span 
              whileHover={{ color: "#D1FF00", scale: 1.1 }}
              className="shrink-0 cursor-default transition-all duration-300"
            >
              I am a
            </motion.span>
            <div className="relative h-[2.5em] overflow-hidden min-w-[280px] md:min-w-[450px] perspective-[1000px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[roleIndex]}
                  initial={{ rotateX: -90, opacity: 0, y: 20 }}
                  animate={{
                    rotateX: 0,
                    opacity: 1,
                    y: 0,
                    textShadow: [
                      "0 0 0px rgba(209,255,0,0)",
                      "0 0 20px rgba(209,255,0,0.6)",
                      "0 0 10px rgba(209,255,0,0.4)"
                    ]
                  }}
                  exit={{ rotateX: 90, opacity: 0, y: -20 }}
                  whileHover={{
                    scale: 1.2,
                    color: "#ffffff",
                    textShadow: "0 0 30px rgba(209,255,0,1)"
                  }}
                  whileTap={{
                    scale: 1.2,
                    color: "#ffffff",
                    textShadow: "0 0 30px rgba(209,255,0,1)"
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute left-0 text-primary font-[family-name:var(--font-anton)] uppercase tracking-[0.1em] whitespace-nowrap cursor-pointer origin-left"
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start gap-6 mb-12"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-black font-mono uppercase tracking-wider text-sm font-bold flex items-center gap-3 hover:bg-white transition-colors rounded-sm"
          >
            View my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 text-white font-mono uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-colors rounded-sm"
          >
            Let&apos;s talk
          </a>
        </motion.div>
      </motion.div>

      {/* SCROLL Indicator positioned at bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-4 hidden sm:flex"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 to-transparent"></div>
        <span className="font-mono text-primary text-xs uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
      </motion.div>
    </section>
  )
}
