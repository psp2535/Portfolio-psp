'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  
  // Magnetic effect values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 1000)
    })
  }, [scrollY])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) * 0.5)
    mouseY.set((e.clientY - centerY) * 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-10 right-10 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="group relative w-16 h-16 bg-black border border-white/10 flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
          >
            {/* HUD Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-scanline pointer-events-none" />
            
            {/* Magnetic Icon */}
            <motion.div className="relative z-10 text-white group-hover:text-primary transition-colors flex flex-col items-center">
              <ArrowUp className="w-6 h-6 mb-0.5 group-hover:-translate-y-1 transition-transform" />
              <span className="font-mono text-[8px] tracking-tighter uppercase font-bold">Elevate</span>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-primary/50" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20 group-hover:border-primary/50" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20 group-hover:border-primary/50" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-primary/50" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
