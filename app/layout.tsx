import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Anton } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap'
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Pathange Sai Pranav | Full Stack Developer & AI Engineer ',
  description: 'Building AI-powered digital experiences. Third-year B.Tech student passionate about AI systems, scalable backend engineering, and immersive web experiences.',
  keywords: ['AI Engineer', 'Full Stack Developer', 'React', 'Node.js', 'Machine Learning', 'Web Development'],
  authors: [{ name: 'Pathange Sai Pranav' }],
  creator: 'Pathange Sai Pranav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Pathange Sai Pranav | AI Engineer & Full Stack Developer',
    description: 'Building AI-powered digital experiences. Third-year B.Tech student passionate about AI systems, scalable backend engineering, and immersive web experiences.',
    siteName: 'Pathange Sai Pranav Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathange Sai Pranav | AI Engineer & Full Stack Developer',
    description: 'Building AI-powered digital experiences.',
    creator: '@saipranav',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  }
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
import { CursorFollower } from '@/components/ui/cursor-follower'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { LoadingScreen } from '@/components/ui/loading-screen'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#000000] overflow-x-hidden">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${anton.variable} font-sans antialiased overflow-x-hidden`}>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
