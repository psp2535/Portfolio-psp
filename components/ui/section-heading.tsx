'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  solid: string
  outline: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** The signature "SOLID / OUTLINE_" heading used by every section. */
export function SectionHeading({
  index,
  eyebrow,
  solid,
  outline,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative mb-16 md:mb-24', centered && 'text-center', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -top-10 md:-top-20 font-[family-name:var(--font-anton)] text-[28vw] md:text-[13vw] leading-none text-white/[0.03] select-none pointer-events-none',
          centered ? 'left-1/2 -translate-x-1/2' : '-left-2 md:-left-8',
        )}
      >
        {index}
      </span>

      <div className="relative z-10">
        <span
          className={cn(
            'font-mono text-primary text-[10px] md:text-xs tracking-[0.4em] mb-4 flex items-center gap-3 uppercase',
            centered && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-primary/60" />
          {index} — {eyebrow}
        </span>
        <h2
          className={cn(
            'group font-[family-name:var(--font-anton)] text-[13vw] sm:text-6xl md:text-8xl uppercase leading-[0.95] flex flex-wrap items-baseline gap-x-5 md:gap-x-8',
            centered && 'justify-center',
          )}
        >
          <span className="text-white transition-colors duration-500 group-hover:text-primary">{solid}</span>
          <span className="text-outline relative">
            {outline}
            <span className="text-primary">_</span>
          </span>
        </h2>
        {description && (
          <p
            className={cn(
              'mt-6 max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed',
              centered && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
