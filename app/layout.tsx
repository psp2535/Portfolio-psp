import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Anton } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { achievements, codingProfiles, education, featuredProjects, profile, publication, SITE_URL, socials } from '@/lib/data'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })

const title = `${profile.name} | ${profile.headline}`
const description =
  'Adobe University Hackathon 2026 Grand Finalist (Top 8 of 80,000+). AI engineer & full-stack developer at ABV-IIITM Gwalior building GEO audit engines, ACO vehicle routing and MERN + Gemini platforms.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  keywords: [
    'Pathange Sai Pranav',
    'AI Engineer',
    'Full Stack Developer',
    'Adobe University Hackathon',
    'Generative Engine Optimization',
    'Ant Colony Optimization',
    'MERN',
    'ABV-IIITM Gwalior',
    'Portfolio',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    title,
    description,
    siteName: `${profile.name} · Portfolio`,
    firstName: 'Sai Pranav',
    lastName: 'Pathange',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@psp25305',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/** schema.org Person + projects, so search engines and AI assistants can read the portfolio. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: profile.name,
      url: SITE_URL,
      email: `mailto:${profile.email}`,
      jobTitle: profile.headline,
      description: profile.summary,
      address: { '@type': 'PostalAddress', addressLocality: 'Gwalior', addressCountry: 'IN' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
      knowsAbout: ['Generative AI', 'Generative Engine Optimization', 'Ant Colony Optimization', 'Full-Stack Development', 'Python', 'React', 'Node.js', 'MongoDB'],
      award: achievements.map((a) => `${a.title}: ${a.result} (${a.year})`),
      sameAs: [socials.github, socials.linkedin, socials.twitter, ...codingProfiles.map((c) => c.href)],
    },
    ...featuredProjects.map((p) => ({
      '@type': 'SoftwareSourceCode',
      name: p.title,
      description: p.summary,
      codeRepository: p.github,
      ...(p.live ? { url: p.live } : {}),
      programmingLanguage: p.tech[0],
      author: { '@id': `${SITE_URL}/#person` },
    })),
    {
      '@type': 'ScholarlyArticle',
      headline: publication.title,
      url: publication.href,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@type': 'Organization', name: 'PAKDD' },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-x-hidden bg-black">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${anton.variable} overflow-x-hidden font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
