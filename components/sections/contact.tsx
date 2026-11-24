'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowUpRight, Check, CheckCircle2, Copy, Github, Linkedin, Loader2, Send, Twitter } from 'lucide-react'
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si'
import { SectionHeading } from '@/components/ui/section-heading'
import { profile, RESUME_PATH, socials } from '@/lib/data'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykolvog'

type Status = 'idle' | 'sending' | 'success' | 'error'

const links = [
  { name: 'GitHub', icon: Github, href: socials.github, handle: 'psp2535' },
  { name: 'LinkedIn', icon: Linkedin, href: socials.linkedin, handle: 'pathangesaipranav' },
  { name: 'LeetCode', icon: SiLeetcode, href: socials.leetcode, handle: 'Suraj2304' },
  { name: 'CodeChef', icon: SiCodechef, href: socials.codechef, handle: 'saipranav_974' },
  { name: 'Codeforces', icon: SiCodeforces, href: socials.codeforces, handle: 'psp7' },
  { name: 'X / Twitter', icon: Twitter, href: socials.twitter, handle: 'psp25305' },
]

const inputClass =
  'w-full border-b border-white/10 bg-white/[0.02] p-5 font-mono text-sm text-white placeholder:text-white/20 transition-all focus:border-primary/60 focus:bg-white/[0.04] focus:outline-none'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._gotcha) return // bot
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setForm({ name: '', email: '', message: '', _gotcha: '' })
      toast.success('Message sent', { description: "Thanks! I'll get back to you soon." })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      toast.error('Could not send message', { description: `Please email me directly at ${profile.email}` })
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      toast.success('Email copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = socials.email
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 bg-black py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          solid="Let's"
          outline="Build"
          description="Hiring for an SDE or AI role, putting together a hackathon team, or just want to talk routing algorithms? My inbox is open."
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-10" noValidate={false}>
              <div className="grid gap-10 sm:grid-cols-2">
                <label className="block space-y-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Your name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="What do people call you?"
                    className={inputClass}
                  />
                </label>
                <label className="block space-y-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="block space-y-3">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Message</span>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role, the project, or just say hello…"
                  className={`${inputClass} resize-none`}
                />
              </label>
              {/* Honeypot: hidden from humans, bots fill it in */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={form._gotcha}
                onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
                className="hidden"
                aria-hidden="true"
              />

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-4 overflow-hidden px-10 py-5 font-[family-name:var(--font-anton)] text-xl uppercase transition-colors disabled:opacity-70 ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-primary text-black'
                }`}
              >
                <span className="relative z-10">
                  {status === 'idle' && 'Send message'}
                  {status === 'sending' && 'Transmitting…'}
                  {status === 'success' && 'Message received'}
                  {status === 'error' && 'Try again'}
                </span>
                {status === 'idle' && <Send className="relative z-10 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />}
                {status === 'sending' && <Loader2 className="relative z-10 h-5 w-5 animate-spin" />}
                {status === 'success' && <CheckCircle2 className="relative z-10 h-5 w-5" />}
                <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 border border-green-500/20 bg-green-500/5 p-4 font-mono text-[10px] uppercase tracking-widest text-green-500"
                    role="status"
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Transmission complete. I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="space-y-12 lg:col-span-5"
          >
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Direct email</h3>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={socials.email}
                  className="break-all font-[family-name:var(--font-anton)] text-3xl text-white transition-colors hover:text-primary md:text-4xl"
                >
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/50 transition-colors hover:border-primary hover:text-primary"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">Online</h3>
              <ul>
                {links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 border-b border-white/5 py-4 text-white/50 transition-colors hover:text-white"
                    >
                      <l.icon className="h-5 w-5 transition-colors group-hover:text-primary" />
                      <span className="font-mono text-sm uppercase tracking-widest">{l.name}</span>
                      <span className="ml-auto hidden font-mono text-xs text-white/25 sm:inline">@{l.handle}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative overflow-hidden border border-white/5 bg-white/[0.02] p-7">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/10" />
              <div className="relative z-10 flex items-start gap-4">
                <span className="mt-2 h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_#D1FF00]" />
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">Available for opportunities</h4>
                  <p className="text-sm leading-relaxed text-white/50">
                    Open to SDE / AI internships, full-time roles and hackathon collaborations.
                  </p>
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 pt-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:underline"
                  >
                    Download resume <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
