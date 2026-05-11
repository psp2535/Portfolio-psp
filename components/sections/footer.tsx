'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* HUD Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* System Diagnostic HUD Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-white/5 pb-16">
          <div className="space-y-2">
            <span className="block font-mono text-[8px] tracking-[0.4em] text-white/20 uppercase">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-white/60 tracking-widest uppercase">Nominal</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="block font-mono text-[8px] tracking-[0.4em] text-white/20 uppercase">Encryption</span>
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">AES-256 Active</span>
          </div>

          <div className="space-y-2">
            <span className="block font-mono text-[8px] tracking-[0.4em] text-white/20 uppercase">Local Time</span>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{formattedTime} (IST)</span>
          </div>

          <div className="space-y-2">
            <span className="block font-mono text-[8px] tracking-[0.4em] text-white/20 uppercase">Terminal</span>
            <span className="font-mono text-xs text-white/60 tracking-widest uppercase">PSP_OS V2.0</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase">
            © {currentYear} — BUILT BY PSP
          </div>
          
          <div className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">
            Pathange Sai Pranav
          </div>
        </div>
      </div>
    </footer>
  )
}
