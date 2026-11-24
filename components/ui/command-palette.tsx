'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowRight,
  Code2,
  Copy,
  FileDown,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  Trophy,
  Twitter,
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useScrollTo } from '@/components/providers/smooth-scroll-provider'
import { featuredProjects, navItems, profile, RESUME_PATH, socials } from '@/lib/data'

export const OPEN_PALETTE_EVENT = 'psp:open-command-palette'

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    // let the dialog close before scrolling / opening tabs
    setTimeout(fn, 60)
  }

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast.success('Email copied', { description: profile.email })
    } catch {
      window.location.href = socials.email
    }
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section, open a project or get in touch"
      className="border border-primary/30 bg-[#070707] sm:max-w-xl rounded-none shadow-[0_0_60px_rgba(209,255,0,0.12)]"
    >
      <CommandInput placeholder="Type a command or search…" className="font-mono" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty className="py-8 text-center font-mono text-xs uppercase tracking-widest text-white/40">
          No results.
        </CommandEmpty>

        <CommandGroup heading="Navigate">
          {navItems.map((item, i) => (
            <CommandItem key={item.id} onSelect={() => run(() => scrollTo(item.id))}>
              <ArrowRight className="text-primary" />
              {item.label}
              <CommandShortcut>0{i + 1}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => openUrl(RESUME_PATH))}>
            <FileDown className="text-primary" />
            View / download resume
          </CommandItem>
          <CommandItem onSelect={() => run(copyEmail)}>
            <Copy className="text-primary" />
            Copy email address
          </CommandItem>
          <CommandItem onSelect={() => run(() => (window.location.href = socials.email))}>
            <Mail className="text-primary" />
            Send an email
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {featuredProjects.map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.title} ${p.subtitle}`}
              onSelect={() => run(() => openUrl(p.live ?? p.github ?? socials.github))}
            >
              <FolderGit2 style={{ color: p.color }} />
              {p.title}
              <span className="ml-auto truncate text-xs text-white/30">{p.live ? 'live' : 'code'}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Profiles">
          <CommandItem onSelect={() => run(() => openUrl(socials.github))}>
            <Github /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => run(() => openUrl(socials.linkedin))}>
            <Linkedin /> LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => run(() => openUrl(socials.leetcode))}>
            <Code2 /> LeetCode
          </CommandItem>
          <CommandItem onSelect={() => run(() => openUrl(socials.codechef))}>
            <Trophy /> CodeChef
          </CommandItem>
          <CommandItem onSelect={() => run(() => openUrl(socials.codeforces))}>
            <Code2 /> Codeforces
          </CommandItem>
          <CommandItem onSelect={() => run(() => openUrl(socials.twitter))}>
            <Twitter /> X / Twitter
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
