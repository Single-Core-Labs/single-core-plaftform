import { useEffect, useRef } from 'react'
import SEO from '@/components/SEO'
import { SOCIAL_LINKS } from '@/lib/constants'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_075824_7c8a2ef3-826c-43ca-81a1-162429faa306.mp4'
// Blend window (seconds) — second copy fades in over the ending one,
// so there is no black flash on loop restart.
const CROSSFADE = 0.8

// Seamless looping background: two copies of the same video take turns.
// Near the end of the active copy, the standby copy starts from 0 and
// fades in over it, then the old copy parks at 0. Continuous motion,
// no loop-restart flicker.
function SeamlessLoop() {
  const aRef = useRef(null)
  const bRef = useRef(null)

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return
    for (const v of [a, b]) {
      v.muted = true
      v.defaultMuted = true
    }

    let active = a
    let standby = b
    let stopped = false
    let raf = 0

    const tryPlay = (v) => {
      try {
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {
        /* autoplay blocked — stays on glow fallback */
      }
    }

    a.style.opacity = '1'
    b.style.opacity = '0'
    tryPlay(a)

    const tick = () => {
      if (stopped) return
      const d = active.duration
      if (d && Number.isFinite(d)) {
        const remaining = d - active.currentTime
        if (remaining <= CROSSFADE && standby.paused) {
          try {
            standby.currentTime = 0
          } catch {
            /* not seekable yet — retry next frame */
          }
          tryPlay(standby)
          standby.style.opacity = '1'
          active.style.opacity = '0'
          const old = active
          active = standby
          standby = old
          window.setTimeout(() => {
            if (stopped) return
            try {
              old.pause()
            } catch {
              /* noop */
            }
            try {
              old.currentTime = 0
            } catch {
              /* noop */
            }
          }, CROSSFADE * 1000 + 120)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      stopped = true
      cancelAnimationFrame(raf)
    }
  }, [])

  const base = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    transition: `opacity ${CROSSFADE}s linear`,
  }

  return (
    <>
      <video
        ref={aRef}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        src={VIDEO_SRC}
        style={base}
      />
      <video
        ref={bRef}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        src={VIDEO_SRC}
        style={{ ...base, opacity: 0 }}
      />
    </>
  )
}

// Minimal single-screen splash — prometheus.ai style.
// Matches reference: black canvas, warm glow from the left,
// centered brand lockup, honest build note, no marketing copy.
export default function HomePage() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: '#060606',
        color: '#FAFAFA',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <SEO
        title="Single Core Labs"
        description="Building the infrastructure, data and intelligence for the next era of AI."
      />

      {/* Video background — seamless crossfade loop, no restart flash */}
      <SeamlessLoop />
      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(6,6,6,0.35) 0%, rgba(6,6,6,0.45) 50%, rgba(6,6,6,0.65) 100%)',
        }}
      />

      {/* Center lockup */}
      <main
        id="main-content"
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div
          className="scl-lockup"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(18px, 3vw, 36px)',
            maxWidth: '1020px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Brand — white S mark + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <img
              src="/logo-mark-white.png"
              alt="Single Core Labs"
              style={{
                height: 'clamp(40px, 5vw, 62px)',
                width: 'auto',
                display: 'block',
              }}
            />
            <span
              style={{
                fontSize: 'clamp(24px, 3.4vw, 42px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Single Core Labs
            </span>
          </div>

          {/* Orange divider */}
          <div
            aria-hidden="true"
            className="scl-divider"
            style={{ width: '2px', alignSelf: 'stretch', minHeight: '56px', background: '#FF5A00', flexShrink: 0 }}
          />

          {/* Tagline */}
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(14px, 1.6vw, 19px)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
              color: 'rgba(250,250,250,0.82)',
              maxWidth: '30ch',
            }}
          >
            Building the infrastructure,
            <br />
            data and intelligence for the next era of AI.
          </p>
        </div>
      </main>

      {/* Bottom bar — honest status, no hype */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 24px',
          padding: '20px clamp(20px, 4vw, 48px)',
          fontSize: '12.5px',
          letterSpacing: '0.01em',
          color: 'rgba(250,250,250,0.55)',
        }}
      >
        <span>© 2026 Single Core Labs</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
            </svg>
          </a>
          <a
            href="https://x.com/Singlecorelabs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none', display: 'inline-flex' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            </svg>
          </a>
        </span>
      </footer>

      <style>{`
        @media (max-width: 720px) {
          .scl-lockup { flex-direction: column; text-align: center; gap: 20px; }
          .scl-divider { width: 48px !important; min-height: 0 !important; height: 2px !important; align-self: center !important; }
        }
      `}</style>
    </div>
  )
}
