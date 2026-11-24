import { Toaster } from 'sonner'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { CursorFollower } from '@/components/ui/cursor-follower'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { GlobalSpotlight } from '@/components/ui/global-spotlight'
import { CommandPalette } from '@/components/ui/command-palette'
import { Navigation } from '@/components/sections/navigation'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Achievements } from '@/components/sections/achievements'
import { Coding } from '@/components/sections/coding'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10002] focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-black"
      >
        Skip to content
      </a>
      <LoadingScreen />
      <CursorFollower />
      <GlobalSpotlight />
      <ScrollProgress />
      <BackToTop />
      <CommandPalette />
      <Toaster theme="dark" position="bottom-center" toastOptions={{ className: 'font-mono !rounded-none !border-primary/30 !bg-[#070707]' }} />
      <Navigation />

      <main id="main" className="relative min-h-screen w-full overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Coding />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
