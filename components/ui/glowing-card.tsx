'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'primary' | 'secondary' | 'accent'
}

export function GlowingCard({
  children,
  className,
  glowColor = 'primary',
}: GlowingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  const glowColorMap = {
    primary: 'rgba(209, 255, 0, 0.15)',
    secondary: 'rgba(0, 0, 51, 0.15)',
    accent: 'rgba(34, 34, 34, 0.15)',
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/20',
        className
      )}
    >
      {/* Spotlight glow effect */}
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColorMap[glowColor]}, transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
