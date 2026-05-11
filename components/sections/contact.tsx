'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, Send, Globe, CheckCircle2, Loader2 } from 'lucide-react'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  })
  const ref = useRef<HTMLElement>(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      // Live Connection established with your Formspree ID: mykolvog
      const response = await fetch("https://formspree.io/f/mykolvog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(209, 255, 0, 0.15), transparent 80%)`
  )

  const rotateX = useTransform(spotlightY, [0, 1000], [3, -3])
  const rotateY = useTransform(spotlightX, [0, 1000], [-3, 3])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40])
  const ySpring = useSpring(yParallax, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section 
      id="contact" 
      className="relative py-48 bg-black overflow-hidden border-t border-white/5" 
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

      <motion.div 
        style={{ rotateX, rotateY, y: ySpring, perspective: 1000 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Heading - Matches Project Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-32 text-center"
        >
          <span className="font-mono text-primary text-[10px] tracking-[0.4em] mb-4 block uppercase">05 - CONTACT</span>
          <div className="relative z-10">
            <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-8xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 leading-none group">
              <span className="text-white uppercase group-hover:text-primary transition-colors duration-500">GET IN TOUCH /</span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(209,255,0,0.5)] uppercase relative inline-block">
                LET'S WORK_
                <motion.span 
                  className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground mt-8 text-sm md:text-base max-w-xl mx-auto font-mono uppercase tracking-widest opacity-60">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <label className="block font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">YOUR NAME</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="What do people call you?"
                  className="w-full bg-white/[0.02] border-b border-white/10 p-6 font-mono text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">EMAIL</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.02] border-b border-white/10 p-6 font-mono text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">MESSAGE</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  className="w-full bg-white/[0.02] border-b border-white/10 p-6 font-mono text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 text-white resize-none"
                />
              </div>

              <motion.button
                disabled={status !== 'idle'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-10 py-5 font-[family-name:var(--font-anton)] text-xl uppercase flex items-center gap-4 overflow-hidden transition-colors ${
                  status === 'success' ? 'bg-green-500 text-white' : 'bg-primary text-black'
                }`}
              >
                <span className="relative z-10">
                  {status === 'idle' && 'Send message'}
                  {status === 'sending' && 'Transmitting...'}
                  {status === 'success' && 'Message Received'}
                </span>
                
                {status === 'idle' && <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                {status === 'sending' && <Loader2 className="w-5 h-5 relative z-10 animate-spin" />}
                {status === 'success' && <CheckCircle2 className="w-5 h-5 relative z-10" />}
                
                <motion.div 
                  className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                />
              </motion.button>
              
              {/* Status Message HUD */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 border border-green-500/20 bg-green-500/5 font-mono text-[10px] tracking-widest text-green-500 uppercase flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Secure Transmission Complete. I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 border border-red-500/20 bg-red-500/5 font-mono text-[10px] tracking-widest text-red-500 uppercase flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Transmission Interrupted. Please check your connection and try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Column - Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-16"
          >
            {/* Direct Email */}
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">DIRECT EMAIL</h4>
              <a 
                href="mailto:saipranav974@gmail.com" 
                className="block font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-white hover:text-primary transition-colors"
              >
                saipranav974@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">ONLINE</h4>
              <div className="flex flex-col gap-6">
                {[
                  { name: 'GitHub', icon: Github, href: 'https://github.com/psp2535' },
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/pathangesaipranav' },
                  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/pathange_saipranav_325?igsh=NWtocHIzZnZ2bDU%3D&utm_source=qr' }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white/40 hover:text-white transition-all group border-b border-white/5 pb-4"
                  >
                    <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span className="font-mono text-sm tracking-widest uppercase">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="p-8 border border-white/5 bg-white/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse shadow-[0_0_10px_#D1FF00]" />
                <div className="space-y-2">
                  <h5 className="font-mono text-xs font-bold text-white tracking-widest uppercase">Available for work</h5>
                  <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-tighter">
                    Open to full-time, contract & freelance
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
