import { ImageResponse } from 'next/og'

export const alt = 'Pathange Sai Pranav: AI Engineer & Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#000',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(209,255,0,0.25), transparent 45%), linear-gradient(rgba(209,255,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(209,255,0,0.05) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#D1FF00', letterSpacing: 6 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#D1FF00' }} />
          [ PSP ] · PORTFOLIO
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3 }}>PATHANGE</div>
          <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.95, letterSpacing: -3, color: '#D1FF00' }}>SAI PRANAV_</div>
          <div style={{ marginTop: 28, fontSize: 34, color: '#A0A0A0' }}>AI Engineer &amp; Full-Stack Developer · ABV-IIITM Gwalior</div>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 24 }}>
          {['Adobe Hackathon Grand Finalist · Top 8 / 80,000+', 'AI for All · Winner', 'PAKDD 2026'].map((t) => (
            <div key={t} style={{ display: 'flex', border: '2px solid rgba(209,255,0,0.4)', padding: '10px 18px', color: '#fff' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
