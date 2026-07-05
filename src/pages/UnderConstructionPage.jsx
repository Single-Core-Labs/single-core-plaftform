import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ─── Animated Grid Background ────────────────────────────────────────────────
function AnimatedGrid() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {/* Subtle grid lines */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.035 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute',
          top: '45%',
          right: '30%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}

// ─── Floating Particles ──────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 4,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'rgba(99,102,241,0.6)',
          }}
        />
      ))}
    </div>
  )
}

// ─── Animated Progress Bar ───────────────────────────────────────────────────
function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const targets = [23, 41, 58, 67, 74, 82]
    let i = 0
    const advance = () => {
      if (i < targets.length) {
        setProgress(targets[i])
        i++
        setTimeout(advance, 800 + Math.random() * 600)
      }
    }
    setTimeout(advance, 600)
  }, [])

  return (
    <div style={{ width: '100%', maxWidth: '380px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        color: 'rgba(26,26,26,0.4)',
        letterSpacing: '0.04em',
      }}>
        <span>BUILD PROGRESS</span>
        <motion.span
          key={progress}
          animate={{ opacity: [0.3, 1] }}
          transition={{ duration: 0.4 }}
          style={{ fontWeight: 600, color: 'rgba(99,102,241,0.8)' }}
        >
          {progress}%
        </motion.span>
      </div>
      <div style={{
        width: '100%',
        height: '3px',
        background: 'rgba(0,0,0,0.07)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            boxShadow: '0 0 8px rgba(99,102,241,0.5)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Status Pill ─────────────────────────────────────────────────────────────
function StatusPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '100px',
        border: '1px solid rgba(99,102,241,0.25)',
        background: 'rgba(99,102,241,0.06)',
        marginBottom: '36px',
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#6366f1',
          boxShadow: '0 0 6px rgba(99,102,241,0.8)',
        }}
      />
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#6366f1',
      }}>
        Under Construction
      </span>
    </motion.div>
  )
}

// ─── Lock Icon ───────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

// ─── Locked Nav Link ─────────────────────────────────────────────────────────
function LockedLink({ children }) {
  return (
    <div
      title="This page is under construction"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 400,
        color: 'rgba(26,26,26,0.3)',
        cursor: 'not-allowed',
        userSelect: 'none',
        pointerEvents: 'all',
      }}
    >
      {children}
      <LockIcon />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UnderConstructionPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8F8F7',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <AnimatedGrid />
      <Particles />

      {/* ── Locked Navbar ── */}
      <header role="banner" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '12px clamp(16px, 3vw, 40px) 0',
        pointerEvents: 'none',
      }}>
        <nav aria-label="Main navigation" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '56px',
          paddingInline: 'clamp(16px, 2.5vw, 32px)',
          maxWidth: '1200px',
          marginInline: 'auto',
          border: '1px solid rgba(255,255,255,0.4)',
          backgroundColor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          pointerEvents: 'auto',
        }}>

          {/* Logo — not a link, just the brand */}
          <div aria-label="Single Core Labs" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none', color: 'var(--color-text)',
          }}>
            <img src="/logo-icon.png" alt="Single Core Labs Logo"
              style={{ height: '28px', width: 'auto', display: 'block' }} loading="eager" />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.02em', color: 'var(--color-text)',
            }}>
              Single Core Labs
            </span>
          </div>

          {/* Locked desktop nav items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <LockedLink>Solutions</LockedLink>
            <LockedLink>Research</LockedLink>
            <LockedLink>Case Studies</LockedLink>
            <LockedLink>Resources</LockedLink>
            <div style={{
              padding: '8px 18px',
              borderRadius: '6px',
              border: '1px solid rgba(0,0,0,0.12)',
              background: 'rgba(0,0,0,0.04)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(26,26,26,0.3)',
              cursor: 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              Book a Demo <LockIcon />
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .uc-nav-links { display: none !important; }
            }
          `}</style>
        </nav>
      </header>

      {/* ── Hero Content ── */}
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(100px, 15vh, 160px) clamp(20px, 5vw, 60px) 60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <StatusPill />

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--color-text)',
            marginBottom: '28px',
            maxWidth: '720px',
          }}>
            Something remarkable
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(26,26,26,0.55)' }}>is being built.</em>
          </h1>
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 400,
            color: 'rgba(26,26,26,0.5)',
            lineHeight: 1.65,
            maxWidth: '460px',
            marginBottom: '48px',
          }}
        >
          We're crafting the next version of Single Core Labs — a platform for enterprise AI
          that's faster, smarter, and more powerful than ever. Stay tuned.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '52px', width: '100%', maxWidth: '380px' }}
        >
          <ProgressBar />
        </motion.div>

        {/* Notify CTA + email */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(26,26,26,0.35)',
          }}>
            In the meantime, reach us at
          </p>
          <a
            href="mailto:hello@singlecorelabs.in"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 400,
              color: 'var(--color-text)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              borderBottom: '1px solid rgba(26,26,26,0.2)',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#6366f1'
              e.currentTarget.style.borderColor = '#6366f1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-text)'
              e.currentTarget.style.borderColor = 'rgba(26,26,26,0.2)'
            }}
          >
            hello@singlecorelabs.in
          </a>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.15), rgba(0,0,0,0))',
            margin: '52px auto 0',
          }}
        />
      </main>

      {/* ── Minimal Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 20px 32px',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          color: 'rgba(26,26,26,0.3)',
          letterSpacing: '0.02em',
        }}>
          © {new Date().getFullYear()} Single Core Labs. All rights reserved.
        </p>
      </motion.footer>
    </div>
  )
}
