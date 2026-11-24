'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingSteps = [
  "INITIALIZING_CORE...",
  "LOADING_AGENT_SKILLS...",
  "OPTIMIZING_ROUTES_ACO...",
  "MAPPING_TECH_ORBITS...",
  "BOOTING_SYSTEM_V3.0...",
  "ACCESS_GRANTED_"
]

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    // Only play the intro once per browser session, and never for reduced-motion users.
    let seen = false
    try {
      seen = sessionStorage.getItem('psp-intro') === '1'
      sessionStorage.setItem('psp-intro', '1')
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoading(false)
      return
    }

    document.documentElement.style.overflow = 'hidden'
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 6 + Math.random() * 10)
        setStepIndex(Math.min(loadingSteps.length - 1, Math.floor((next / 100) * loadingSteps.length)))
        if (next >= 100) clearInterval(interval)
        return next
      })
    }, 110)

    const timeout = setTimeout(() => setIsLoading(false), 1700)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!isLoading) document.documentElement.style.overflow = ''
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.7, ease: "circIn" }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* CRT Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          
          {/* Background Digital Pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-[family-name:var(--font-anton)] text-[40vw] leading-none select-none">
              {Math.min(Math.round(progress), 100)}
            </span>
          </motion.div>

          {/* Glowing Aura Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
                x: [0, 100, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, -100, 0],
                y: [0, 100, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Initials with High-End Staggered Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-16 flex flex-col items-center"
            >
              <div className="font-[family-name:var(--font-anton)] text-9xl md:text-[12rem] leading-none flex items-baseline gap-2">
                <span className="text-white">P</span>
                <span className="text-transparent [-webkit-text-stroke:1.5px_#D1FF00] -translate-y-8 select-none">S</span>
                <span className="text-white">P<span className="text-primary animate-pulse">_</span></span>
              </div>
              
              {/* Technical Tagline */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex gap-8 font-mono text-[10px] text-white tracking-[0.4em] uppercase"
              >
                <span>[ ABV-IIITM ]</span>
                <span>[ AI · FULL-STACK ]</span>
              </motion.div>
            </motion.div>

            {/* Terminal Style Status */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-2 rounded-full bg-primary" 
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stepIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-primary text-xs tracking-[0.3em] uppercase"
                  >
                    {loadingSteps[stepIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              {/* Fake Console Output (Small) */}
              <div className="h-4 overflow-hidden">
                <motion.span 
                  animate={{ y: [0, -20, -40, -60] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="block font-mono text-[8px] text-white/20 uppercase tracking-tighter"
                >
                  FETCHING_ASSETS...<br/>
                  PARSING_DOM_TREE...<br/>
                  LOAD_SCRIPTS_OK...<br/>
                  RENDER_ENGINE_START...
                </motion.span>
              </div>
            </div>

            {/* Premium Progress Bar */}
            <div className="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Glint effect on progress */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </div>
          </div>
          
          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-1"
          >
            <span className="font-mono text-[10px] text-white/40 tracking-[0.5em] uppercase">
              Portfolio V3.0
            </span>
            <div className="w-8 h-[1px] bg-primary/30" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
