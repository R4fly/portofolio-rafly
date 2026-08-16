import { ImageResponse } from 'next/og'

// Metadata untuk OG image
export const runtime = 'edge'
export const alt = 'Rafly Baehaqi — Junior Full-Stack Developer & Gitaris'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Dynamic Open Graph Image Generator.
 * Gambar ini muncul saat link portfolio di-share di:
 * - WhatsApp, Telegram, iMessage
 * - LinkedIn, Facebook, Twitter/X (fallback)
 * - Slack, Discord
 *
 * Design: sesuai DESIGN.md (dark background, cyan + amber accents)
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#020617',
          color: '#fafafa',
          padding: '60px',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow — cyan (top right) */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Decorative glow — amber (bottom left) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Guitar strings decoration — 6 garis horizontal tipis */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            opacity: 0.08,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                height: '2px',
                width: '100%',
                backgroundColor: '#22d3ee',
              }}
            />
          ))}
        </div>

        {/* Top: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #22d3ee 0%, #f59e0b 100%)',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            R
          </div>
          <span style={{ fontSize: '30px', fontWeight: 700, display: 'flex' }}>
            Rafly
            <span style={{ color: '#22d3ee' }}>.dev</span>
          </span>
        </div>

        {/* Middle: Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              display: 'flex',
            }}
          >
            Rafly Baehaqi
          </h1>
          <p
            style={{
              fontSize: '34px',
              margin: 0,
              color: '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            Junior Full-Stack Developer
            <span style={{ color: '#22d3ee', fontSize: '28px' }}>&</span>
            <span style={{ color: '#f59e0b' }}>Gitaris</span>
          </p>
        </div>

        {/* Bottom: Tagline + Domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '22px', margin: 0, color: '#a1a1aa', display: 'flex' }}>
            Membangun aplikasi web dengan ritme kode yang presisi 🎸
          </p>
          <span
            style={{
              fontSize: '22px',
              color: '#22d3ee',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            raflybaehaqi.my.id
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}