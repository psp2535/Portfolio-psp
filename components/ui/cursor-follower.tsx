'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export function CursorFollower() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 250 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [clicks, setClicks] = useState<{ x: number, y: number, id: number }[]>([])

  useEffect(() => {
    setMounted(true)
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      // If we detect mouse movement, it's not a restricted touch device
      if (isTouchDevice) setIsTouchDevice(false)
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = (e: MouseEvent) => {
      // Only show the name signature ~20% of the time to keep it rare
      if (Math.random() > 0.2) return;

      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      setClicks(prev => [...prev.slice(-3), newClick])
      
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id))
      }, 1500)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = Boolean(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-btn')
      )
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementHover)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover)
    }
  }, [mounted, isTouchDevice, cursorX, cursorY])

  // Don't render on server or touch devices
  if (!mounted || isTouchDevice) {
    return null
  }

  return (
    <>
      {/* Click Name Signatures */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ 
              opacity: [0, 1, 0.8, 0], 
              scale: [0.5, 1.2, 1, 1.5],
              y: -50,
              x: (Math.random() - 0.5) * 40,
              filter: ["blur(0px)", "blur(10px)", "blur(0px)", "blur(5px)"]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-[10001] font-[family-name:var(--font-anton)] text-primary text-xl md:text-2xl uppercase tracking-tighter whitespace-nowrap mix-blend-difference"
            style={{ 
              left: click.x, 
              top: click.y,
              translateX: '-50%',
              translateY: '-50%',
              textShadow: "0 0 20px rgba(209,255,0,0.8)"
            }}
          >
            PATHANGE SAI PRANAV
          </motion.div>
        ))}
      </AnimatePresence>
      {/* The Dot (Instant) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#D1FF00] shadow-[0_0_10px_rgba(209,255,0,0.8)]" />
      </motion.div>

      {/* The Circle (Trailing) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`rounded-full transition-all duration-300 border-2 ${
            isHovering 
              ? 'w-12 h-12 bg-transparent' 
              : 'w-8 h-8 bg-transparent'
          }`}
          animate={isHovering ? {
            borderColor: ['#D1FF00', '#0000ff', '#9333ea', '#ff00ff', '#ff0000', '#ffa500', '#ffff00', '#D1FF00'],
            boxShadow: [
              '0 0 25px rgba(209, 255, 0, 0.6)',
              '0 0 25px rgba(0, 0, 255, 0.6)',
              '0 0 25px rgba(147, 51, 234, 0.6)',
              '0 0 25px rgba(255, 0, 255, 0.6)',
              '0 0 25px rgba(255, 0, 0, 0.6)',
              '0 0 25px rgba(255, 165, 0, 0.6)',
              '0 0 25px rgba(255, 255, 0, 0.6)',
              '0 0 25px rgba(209, 255, 0, 0.6)'
            ]
          } : {
            borderColor: '#D1FF00',
            boxShadow: '0 0 10px rgba(209, 255, 0, 0.2)'
          }}
          transition={isHovering ? {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          } : { duration: 0.3 }}
        />
      </motion.div>
      
      {/* Trailing glow effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-48 h-48 rounded-full opacity-25"
          animate={isHovering ? {
            background: [
              'radial-gradient(circle, rgba(209, 255, 0, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(0, 0, 255, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(209, 255, 0, 0.4) 0%, transparent 70%)'
            ]
          } : {
            background: 'radial-gradient(circle, rgba(209, 255, 0, 0.2) 0%, transparent 70%)'
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ filter: 'blur(30px)' }}
        />
      </motion.div>
    </>
  )
}
