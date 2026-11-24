/**
 * Single source of truth for every piece of portfolio content.
 * Update this file when the resume changes — every section reads from here.
 */

export const SITE_URL = 'https://portfolio-psp.vercel.app'
export const RESUME_PATH = '/Pathange_Sai_Pranav_Resume.pdf'

export const profile = {
  name: 'Pathange Sai Pranav',
  shortName: 'PSP',
  firstName: 'PATHANGE',
  lastName: 'SAI PRANAV',
  headline: 'AI Engineer & Full-Stack Developer',
  tagline: 'I build AI systems that ship, and the web platforms around them.',
  location: 'Gwalior, India',
  email: 'saipranav974@gmail.com',
  phone: '+91-8977539901',
  summary:
    'Integrated B.Tech + M.Tech (IT) student at ABV-IIITM Gwalior building AI-first products: website audit engines for AI search, ant-colony vehicle routing, and MERN platforms used by small retailers.',
}

export const socials = {
  github: 'https://github.com/psp2535',
  linkedin: 'https://www.linkedin.com/in/pathangesaipranav',
  twitter: 'https://x.com/psp25305',
  instagram: 'https://www.instagram.com/pathange_saipranav_325',
  leetcode: 'https://leetcode.com/u/Suraj2304/',
  codechef: 'https://www.codechef.com/users/saipranav_974',
  codeforces: 'https://codeforces.com/profile/psp7',
  email: 'mailto:saipranav974@gmail.com',
}

export const education = {
  school: 'ABV-Indian Institute of Information Technology and Management',
  short: 'ABV-IIITM Gwalior',
  degree: 'Integrated B.Tech + M.Tech in Information Technology',
  cgpa: '8.45',
  period: 'Aug 2023 – May 2028',
  location: 'Gwalior, India',
  coursework: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems'],
}

/** Headline numbers shown in the hero / about stat strip. */
export const stats = [
  { value: 8, prefix: 'Top ', suffix: '', label: 'of 80,000+ teams · Adobe Hackathon' },
  { value: 4, prefix: '', suffix: '', label: 'national hackathon podiums & finals' },
  { value: 360, prefix: '', suffix: '+', label: 'DSA problems solved' },
  { value: 8.45, prefix: '', suffix: '', label: 'CGPA at ABV-IIITM', decimals: 2 },
]

export type Metric = { value: string; label: string }

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  event?: string
  period: string
  color: string
  summary: string
  highlights: string[]
  metrics: Metric[]
  tech: string[]
  github?: string
  live?: string
  badge?: string
}

export const featuredProjects: Project[] = [
  {
    id: 'brand-ai-audit',
    index: '01',
    title: 'Brand AI Readiness Audit',
    subtitle: 'GEO audit engine for AI search visibility',
    event: 'Adobe University Hackathon 2026',
    badge: 'Grand Finalist · Top 8 / 80,000+',
    period: 'Aug 2026 – Oct 2026',
    color: '#D1FF00',
    summary:
      'A Python audit engine that tells brands why AI assistants can’t find them, and exactly what to fix first. It is built from 9 modular Agent Skills.',
    highlights: [
      'Engineered 9 modular Agent Skills running 70+ checks across crawl access, rendering, structured data, content freshness and user engagement.',
      'Built a read-only crawler that respects robots.txt, discovers pages from sitemaps and links, and diffs raw HTML against browser-rendered content.',
      'Designed a severity engine (impact × reach × certainty) that ranks findings into a step-by-step action plan, with every issue backed by a cited page URL.',
      'Wrote 635+ unit tests and 35 test websites to keep false positives low, then validated on live sites including adobe.com.',
    ],
    metrics: [
      { value: '70+', label: 'audit checks' },
      { value: '9', label: 'agent skills' },
      { value: '635+', label: 'unit tests' },
    ],
    tech: ['Python', 'Playwright', 'Web Crawling', 'JSON-LD', 'JSON Schema', 'Unit Testing', 'Agent Skills'],
    github: 'https://github.com/psp2535/AdobeUniversityHackathon26',
  },
  {
    id: 'traffic-ai',
    index: '02',
    title: 'Traffic AI · IM-VRM',
    subtitle: 'Intelligent multi-depot vehicle routing',
    event: 'Research build · IEEE T-ITS 2025 reproduction',
    period: 'May 2026 – Jul 2026',
    color: '#00E5FF',
    summary:
      'Reproduced an IEEE T-ITS 2025 routing model on Microsoft’s T-Drive Beijing taxi dataset, then beat it with Ant Colony Optimization and time-dependent Dijkstra.',
    highlights: [
      'Reproduced the base model (greedy stop ordering + Dijkstra path finding) from an IEEE T-ITS 2025 paper.',
      'Processed GPS logs of 1,000 Beijing taxis into 1.3M clean GPS points and 18K+ trips.',
      'Replaced greedy stop ordering with ACO, cutting route distance by 13% and fuel use by 14% across 1,000 vehicles.',
      'Added time-dependent Dijkstra on hourly traffic speeds. Combined with ACO, it cut travel time by 18% vs. the base model.',
    ],
    metrics: [
      { value: '−18%', label: 'travel time' },
      { value: '−14%', label: 'fuel use' },
      { value: '1.3M', label: 'GPS points' },
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Ant Colony Optimization', 'Dijkstra'],
    github: 'https://github.com/psp2535/td-dijkstra-aco-router',
    live: 'https://fleetmaster-api.vercel.app/',
  },
  {
    id: 'biznova',
    index: '03',
    title: 'BizNova',
    subtitle: 'AI-integrated retail platform for small shops',
    event: 'AI for All Hackathon 2026 · Winner',
    badge: '2nd Place · 1500+ teams',
    period: 'Oct 2025 – Apr 2026',
    color: '#B026FF',
    summary:
      'A full-stack MERN platform that runs a small shop end-to-end: inventory, sales, expenses and profit, with a Gemini-powered assistant that speaks English, Hindi and Telugu.',
    highlights: [
      'Built and deployed a MERN platform with separate roles for retailers, customers and wholesalers.',
      'Developed 20+ Express REST APIs with JWT auth, role-based access, rate limiting and parallel queries (Promise.all).',
      'Designed 13 MongoDB collections with 35+ compound & geospatial indexes, aggregation pipelines and $near geo-queries.',
      'Integrated Gemini 2.5 Flash for an AI business assistant and a bill scanner that updates inventory from photos, plus voice & text commands.',
    ],
    metrics: [
      { value: '20+', label: 'REST APIs' },
      { value: '35+', label: 'Mongo indexes' },
      { value: '3', label: 'languages (voice)' },
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'JWT'],
    github: 'https://github.com/psp2535/Smart-Kirana',
    live: 'https://smart-kirana-beta.vercel.app/',
  },
]

export type MiniProject = {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
}

export const otherProjects: MiniProject[] = [
  {
    title: 'ABV-IIITM Registration',
    description:
      'Academic workflow platform with secure auth, automated approval pipelines and dynamic course allocation for 500+ users.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/psp2535/HCI_PROJECT',
    live: 'https://abviiitm-frontend.onrender.com',
  },
  {
    title: 'TransitOps',
    description:
      'End-to-end transport operations platform digitizing vehicles, drivers, dispatch, maintenance and expenses with enforced business rules.',
    tech: ['MERN', 'REST APIs', 'Analytics'],
    github: 'https://github.com/psp2535/TransitOps',
    live: 'https://transitops-fsrh.onrender.com',
  },
  {
    title: 'AI Wiki Quiz',
    description:
      'Paste any Wikipedia URL and Gemini generates a fresh 7–10 question quiz, with scoring and attempt tracking on PostgreSQL.',
    tech: ['Python', 'PostgreSQL', 'Gemini API', 'React'],
    github: 'https://github.com/psp2535/Wiki-Quiz-App',
    live: 'https://wiki-quiz-app-pi.vercel.app',
  },
  {
    title: 'Blogging Platform',
    description:
      'Serverless blogging platform on Cloudflare Workers with Hono and Prisma, typed end-to-end in TypeScript.',
    tech: ['TypeScript', 'Hono', 'Prisma', 'Cloudflare'],
    github: 'https://github.com/psp2535/Blogging-website',
    live: 'https://blogging-website-taupe.vercel.app',
  },
]

export type Achievement = {
  title: string
  org: string
  result: string
  description: string
  year: string
  color: string
  link?: { href: string; label: string }
  highlight?: boolean
}

export const achievements: Achievement[] = [
  {
    title: 'Adobe University Hackathon',
    org: 'Adobe',
    result: 'Grand Finalist · Top 8 of 80,000+ teams',
    description:
      'Top 0.01% nationwide with Brand AI Readiness Audit, a tool that scores websites for AI search visibility and generates prioritized fixes.',
    year: '2026',
    color: '#D1FF00',
    highlight: true,
    link: {
      href: 'https://drive.google.com/file/d/1I_8HHu271BdvLh_kZyUnLKaN3-nuxQkm/view?usp=sharing',
      label: 'Certificate',
    },
  },
  {
    title: 'AI for All Hackathon',
    org: 'AI Impact Summit',
    result: 'Winner · 2nd Place among 1500+ teams',
    description: 'Won with an upgraded BizNova, an AI-integrated retail platform for small shop owners.',
    year: '2026',
    color: '#00E5FF',
    link: {
      href: 'https://drive.google.com/file/d/18pUfM5r0lo9-Vzm85FrxTeRDOY3vTNxe/view?usp=sharing',
      label: 'Certificate',
    },
  },
  {
    title: 'PAKDD 2026 Publication',
    org: 'Pacific-Asia KDD',
    result: 'Co-author',
    description:
      '“HiBias: A Nine-Faceted Bias Annotation Dataset for Media Bias Detection in Hindi.”',
    year: '2026',
    color: '#FF2E88',
    link: { href: 'https://openreview.net/forum?id=mpmGNudGa0', label: 'Paper' },
  },
  {
    title: 'HACKSAGON',
    org: 'National Hackathon',
    result: 'Top Performer · #1 of 2,600+ teams',
    description:
      'Final BizNova release: AI bill scanner, voice commands in English, Hindi & Telugu, and nearby-wholesaler search.',
    year: '2026',
    color: '#B026FF',
    link: {
      href: 'https://drive.google.com/file/d/1mO5bsIrMvbQ5viRVPMHBhSFT2dlWZSmT/view?usp=sharing',
      label: 'Certificate',
    },
  },
  {
    title: 'Amazon ML Summer School',
    org: 'Amazon',
    result: 'Selected',
    description: 'Selected among top engineering students in India for Amazon’s ML program.',
    year: '2026',
    color: '#FF9900',
    link: {
      href: 'https://drive.google.com/file/d/1DiFgZXpTXeYQnencTrLOGU-38ZxrT4sT/view?usp=sharing',
      label: 'Certificate',
    },
  },
  {
    title: 'OpenAI × NxtWave Buildathon',
    org: 'OpenAI × NxtWave',
    result: 'Finalist',
    description:
      'Finalist with the first prototype of BizNova, an AI-powered inventory and sales platform for small retailers.',
    year: '2025',
    color: '#10A37F',
    link: {
      href: 'https://drive.google.com/file/d/1tItuENrQNQsvYKyT23N2n6xQPuPQVVUi/view?usp=sharing',
      label: 'Certificate',
    },
  },
]

export const publication = {
  venue: 'PAKDD 2026',
  title: 'HiBias: A Nine-Faceted Bias Annotation Dataset for Media Bias Detection in Hindi',
  role: 'Co-author',
  href: 'https://openreview.net/forum?id=mpmGNudGa0',
}

export const codingProfiles = [
  {
    platform: 'LeetCode',
    handle: 'Suraj2304',
    href: 'https://leetcode.com/u/Suraj2304/',
    color: '#FFA116',
    headline: { value: 1590, label: 'contest rating' },
    stats: [
      { value: '360+', label: 'problems solved' },
      { value: '17', label: 'rated contests' },
    ],
  },
  {
    platform: 'CodeChef',
    handle: 'saipranav_974',
    href: 'https://www.codechef.com/users/saipranav_974',
    color: '#C08B5C',
    headline: { value: 1451, label: 'max rating · 2★' },
    stats: [
      { value: '#435', label: 'best global rank' },
      { value: '22', label: 'rated contests' },
    ],
  },
  {
    platform: 'Codeforces',
    handle: 'psp7',
    href: 'https://codeforces.com/profile/psp7',
    color: '#1F8ACB',
    headline: { value: 1158, label: 'contest rating · newbie' },
    stats: [
      { value: '58', label: 'problems solved' },
      { value: '5', label: 'rated contests' },
    ],
  },
]

export type SkillGroup = { title: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['C++', 'C', 'Python', 'JavaScript', 'TypeScript'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { title: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
  { title: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  {
    title: 'AI & Data',
    items: ['Machine Learning', 'Generative AI', 'Gemini API', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  { title: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Playwright', 'Vercel'] },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'coding', label: 'Coding' },
  { id: 'contact', label: 'Contact' },
] as const
