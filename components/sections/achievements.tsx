'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Trophy, Star, Award, Code2, Rocket, Target } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: 'WINNER — AI FOR ALL HACKATHON 2026',
    subtitle: 'INDIA AI IMPACT SUMMIT',
    description: 'Secured 2nd place among elite developers, placing in the top 1% of participants nationwide.',
    color: '#D1FF00', // Lime
    index: '01'
  },
  {
    icon: Rocket,
    title: 'TOP PERFORMER — HACKSAGON 2026',
    subtitle: 'NATIONAL LEVEL HACKATHON',
    description: 'Distinguished as a top performer among 2600+ competing teams from across the country.',
    color: '#00f2ff', // Cyan
    index: '02'
  },
  {
    icon: Award,
    title: 'FINALIST — OPENAI X NXTWAVE 2025',
    subtitle: 'AI PRODUCT INNOVATION',
    description: 'Recognized for product innovation in AI-based solutions at the national Buildathon.',
    color: '#bd00ff', // Purple
    index: '03'
  },
  {
    icon: Target,
    title: 'RANK 1578 CODEFEST\'25',
    subtitle: 'NATIONAL COMPETITIVE PROGRAMMING',
    description: 'Demonstrated algorithmic excellence in a high-stakes national programming contest.',
    color: '#ff0055', // Pink
    index: '04'
  },
  {
    icon: Code2,
    title: '300+ DSA PROBLEMS SOLVED',
    subtitle: 'PROBLEM SOLVING EXCELLENCE',
    description: 'Consistent practice and mastery of complex data structures and algorithmic challenges.',
    color: '#D1FF00', // Lime
    index: '05'
  }
]

function AchievementCard({ achievement, index, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative bg-[#070707] border border-white/5 p-8 transition-all duration-500 hover:bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dynamic Glow Background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: achievement.color }}
      />

      {/* Kinetic Border */}
      <div
        className="absolute left-0 top-0 w-[2px] h-0 transition-all duration-500 group-hover:h-full z-20"
        style={{
          backgroundColor: achievement.color,
          boxShadow: `0 0 15px ${achievement.color}`
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
        {/* Achievement Index */}
        <div className="relative shrink-0">
          <div 
            className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-sm bg-white/[0.02] group-hover:border-white/20 transition-all duration-500"
            style={{ 
              color: achievement.color,
              boxShadow: `0 0 20px ${achievement.color}11`
            }}
          >
            <span className="font-mono text-xl font-bold">{achievement.index}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
            <h3 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white tracking-tight uppercase group-hover:text-primary transition-colors">
              <style jsx>{`
                .group:hover h3 {
                  color: ${achievement.color} !important;
                }
              `}</style>
              {achievement.title}
            </h3>
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">
              {achievement.subtitle}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl group-hover:text-white/60 transition-colors">
            {achievement.description}
          </p>
        </div>

        {/* Status indicator (HUD element) */}
        <div className="hidden lg:flex flex-col items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-1 bg-white/10 overflow-hidden">
            <div className="w-full h-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" style={{ backgroundColor: achievement.color }} />
          </div>
          <span className="font-mono text-[8px] tracking-tighter text-white/40">AUTH_VERIFIED</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Achievements() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30])
  const ySpring = useSpring(yParallax, { stiffness: 100, damping: 30 })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 500px at ${x}px ${y}px, rgba(209, 255, 0, 0.15), transparent 80%)`
  )

  const rotateX = useTransform(spotlightY, [0, 1000], [4, -4])
  const rotateY = useTransform(spotlightX, [0, 1000], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      id="achievements"
      className="relative py-48 bg-black overflow-hidden"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Global Spotlight Layer */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Background Noise/Grain Overlay - Bulletproof Data-URI */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      {/* Background Ghost Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-anton)] text-[25vw] text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0">
        Roadmap
      </div>

      <motion.div 
        style={{ rotateX, rotateY, y: ySpring, perspective: 1000 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Heading - Perfectly Matched to Projects Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mb-40 text-center"
        >
          <span className="font-mono text-primary text-[10px] tracking-[0.4em] mb-4 block uppercase">04 - ACHIEVEMENTS</span>
          <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-8xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 leading-none group">
            <span className="text-white uppercase group-hover:text-primary transition-colors duration-500">ACHIEVEMENTS &</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(209,255,0,0.5)] uppercase relative inline-block">
              MILESTONES_
              <motion.span
                className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </span>
          </h2>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Central Power Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.03] overflow-hidden">
            <motion.div 
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#D1FF00] via-[#00f2ff] to-[#bd00ff] origin-top shadow-[0_0_25px_rgba(209,255,0,0.6)]"
            />
          </div>

          <div className="flex flex-col gap-12">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`flex items-center justify-center w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Achievement Card Wrapper */}
                <div className="w-full md:w-[calc(50%-60px)]">
                  <AchievementCard
                    achievement={achievement}
                    index={index}
                    isInView={isInView}
                  />
                </div>

                {/* Central Node */}
                <div className="hidden md:flex items-center justify-center w-[120px] relative z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="w-4 h-4 rounded-full bg-black border-2 transition-all duration-500 group-hover:scale-150"
                    style={{
                      borderColor: achievement.color,
                      boxShadow: `0 0 15px ${achievement.color}`
                    }}
                  />
                </div>

                {/* Empty spacer for the other side */}
                <div className="hidden md:block w-[calc(50%-60px)]" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
