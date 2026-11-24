'use client'

import { motion } from 'framer-motion'
import { Mic, ScanLine } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Brand AI Readiness Audit: an audit-report terminal                  */
/* ------------------------------------------------------------------ */

const auditAreas = [
  { label: 'crawl_access', w: 92 },
  { label: 'rendering', w: 74 },
  { label: 'structured_data', w: 58 },
  { label: 'content_freshness', w: 81 },
  { label: 'user_engagement', w: 66 },
]

const findings = [
  { sev: 'HIGH', color: '#FF4D4D', text: 'Key pages hidden from AI crawlers' },
  { sev: 'MED', color: '#FFB020', text: 'Content missing until JS renders' },
  { sev: 'LOW', color: '#D1FF00', text: 'Stale dateModified in JSON-LD' },
]

export function AuditVisual({ color }: { color: string }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#050505] font-mono text-[11px]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate text-white/40">$ geo-audit --site example.com --read-only</span>
      </div>
      <div className="space-y-4 p-4 md:p-5">
        <div>
          <p className="mb-2 text-white/40">› running 9 agent skills · 70+ checks</p>
          <div className="space-y-1.5">
            {auditAreas.map((a, i) => (
              <div key={a.label} className="grid grid-cols-[110px_1fr] items-center gap-3 sm:grid-cols-[140px_1fr]">
                <span className="truncate text-white/60">{a.label}</span>
                <div className="h-1.5 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-dashed border-white/10 pt-3">
          <p className="mb-2 text-white/40">
            › severity = <span style={{ color }}>impact × reach × certainty</span>
          </p>
          <ul className="space-y-1.5">
            {findings.map((f, i) => (
              <motion.li
                key={f.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="w-10 shrink-0 text-center text-[9px] font-bold" style={{ color: f.color, border: `1px solid ${f.color}55` }}>
                  {f.sev}
                </span>
                <span className="truncate text-white/70">{f.text}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-3 text-white/30">
            ✓ action plan ready · every finding cites a page URL<span className="animate-pulse">▋</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Traffic AI: greedy vs ACO route comparison                          */
/* ------------------------------------------------------------------ */

const stops = [
  [60, 60], [140, 40], [230, 70], [300, 40], [330, 120], [260, 160], [180, 130], [90, 170], [40, 120],
] as const

const greedyPath = 'M60 60 L140 40 L180 130 L230 70 L300 40 L330 120 L260 160 L90 170 L40 120 L60 60'
const acoPath = 'M60 60 L140 40 L230 70 L300 40 L330 120 L260 160 L180 130 L90 170 L40 120 L60 60'

const deltas = [
  { label: 'Distance', value: 13 },
  { label: 'Fuel', value: 14 },
  { label: 'Travel time', value: 18 },
]

export function RoutingVisual({ color }: { color: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#050505]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest">
        <span className="text-white/40">Beijing · T-Drive</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-white/40">
            <span className="h-px w-4 border-t border-dashed border-white/40" /> greedy
          </span>
          <span className="flex items-center gap-1.5" style={{ color }}>
            <span className="h-px w-4" style={{ backgroundColor: color }} /> ACO + TD-Dijkstra
          </span>
        </span>
      </div>
      <div className="relative flex-1 p-3">
        <svg viewBox="0 0 380 210" className="h-full min-h-[180px] w-full" role="img" aria-label="Greedy route versus ACO-optimised route between delivery stops">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="380" height="210" fill="url(#grid)" />
          <path d={greedyPath} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <motion.path
            d={acoPath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
          {stops.map(([x, y], i) => (
            <g key={i}>
              {i === 0 ? (
                <rect x={x - 7} y={y - 7} width="14" height="14" fill="#000" stroke={color} strokeWidth="2" />
              ) : (
                <circle cx={x} cy={y} r="5" fill="#000" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
              )}
            </g>
          ))}
          <text x="40" y="44" fill={color} fontSize="9" fontFamily="monospace">DEPOT</text>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
        {deltas.map((d, i) => (
          <div key={d.label} className="bg-[#050505] p-3">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">{d.label}</span>
              <span className="font-mono text-xs font-bold" style={{ color }}>−{d.value}%</span>
            </div>
            <div className="h-1 bg-white/10">
              <motion.div
                initial={{ width: '100%' }}
                whileInView={{ width: `${100 - d.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.2 + i * 0.15 }}
                className="h-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* BizNova: multilingual AI assistant                                  */
/* ------------------------------------------------------------------ */

const chat = [
  { from: 'user', lang: 'HI', text: '“Aaj ka profit kitna hua?”', icon: Mic },
  { from: 'ai', text: 'Today: ₹4,820 sales · ₹1,150 expenses · ₹3,670 profit' },
  { from: 'user', lang: 'TE', text: '“5 kilos biyyam stock lo add cheyyi”', icon: Mic },
  { from: 'ai', text: 'Inventory updated: Rice +5 kg ✓' },
  { from: 'user', lang: 'EN', text: 'Scanned wholesaler bill · 12 items', icon: ScanLine },
  { from: 'ai', text: '12 items matched & restocked from photo ✓' },
] as const

export function RetailVisual({ color }: { color: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#050505]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
          AI
        </span>
        <div className="font-mono text-[10px] uppercase tracking-widest">
          <p className="text-white/80">BizNova Assistant</p>
          <p className="text-white/30">Gemini 2.5 Flash · EN / HI / TE</p>
        </div>
      </div>
      <div className="flex-1 space-y-2.5 p-4">
        {chat.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.25 }}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 text-xs leading-snug ${
                m.from === 'user' ? 'border border-white/10 bg-white/[0.04] text-white/80' : 'text-white font-medium'
              }`}
              style={m.from === 'ai' ? { backgroundColor: color } : undefined}
            >
              {m.from === 'user' && (
                <span className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/40">
                  <m.icon className="h-3 w-3" /> {m.lang}
                </span>
              )}
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
