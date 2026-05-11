'use client'

import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { CursorFollower } from '@/components/ui/cursor-follower'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { Navigation } from '@/components/sections/navigation'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Achievements } from '@/components/sections/achievements'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CursorFollower />
      <ScrollProgress />
      <BackToTop />
      <Navigation />
      
      <main className="relative min-h-screen w-full overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      
      <Footer />
    </SmoothScrollProvider>
  )
}
