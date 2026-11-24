# Portfolio v3.0 · Pathange Sai Pranav

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A "Tech-Noir" portfolio for an AI engineer and full-stack developer. Live at **[portfolio-psp.vercel.app](https://portfolio-psp.vercel.app)**.

## What's inside

- **Case-study projects.** Each flagship build gets real metrics and its own animated visual: an audit-report terminal (Brand AI Readiness Audit), a greedy-vs-ACO route map (Traffic AI), and a multilingual assistant chat (BizNova).
- **Achievements timeline.** A scroll-synced "power line", with every award linked to its certificate.
- **Skills orbit.** A CSS-driven orbit that pauses on hover. Hovering or tapping a category lights up its skills.
- **Competitive programming.** LeetCode and CodeChef cards with progress toward the next rating tier.
- **⌘K / Ctrl+K command palette.** Jump to sections, open projects and profiles, copy the email, or open the resume.
- **One global spotlight.** A single rAF and CSS-variable cursor light replaces six per-section listeners.
- **Built to be read by machines.** JSON-LD (Person, SoftwareSourceCode, ScholarlyArticle), a generated OG image, `sitemap.xml`, `robots.txt` and `/llms.txt`.
- **Accessible.** Skip link, reduced-motion support (no Lenis, no intro, no looping animations) and keyboard-focusable orbit nodes.

## Updating content

All content lives in **[`lib/data.ts`](lib/data.ts)**: profile, projects, achievements, skills and coding stats.
To update the resume, replace `public/Pathange_Sai_Pranav_Resume.pdf` (or change `RESUME_PATH`).
Also update `public/llms.txt` when the resume changes.

## Structure

```
app/            layout (SEO + JSON-LD), page, OG image, sitemap, robots, 404
components/
  sections/     navigation, hero, about, skills, projects (+ project-visuals), achievements, coding, contact, footer
  ui/           command-palette, global-spotlight, counter, section-heading, cursor, loader, shadcn primitives
  providers/    Lenis smooth scroll + useScrollTo()
lib/data.ts     single source of truth for content
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-checked)
```

The contact form posts to Formspree (`FORMSPREE_ENDPOINT` in `components/sections/contact.tsx`).

---

Built by **Pathange Sai Pranav (PSP)**.
