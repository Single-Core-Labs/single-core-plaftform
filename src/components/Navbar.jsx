import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NAV_LINKS, CONTACT_EMAIL } from '@/lib/constants'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '12px clamp(16px, 3vw, 40px) 0',
          pointerEvents: 'none',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
            paddingInline: 'clamp(16px, 2.5vw, 32px)',
            maxWidth: '1200px',
            marginInline: 'auto',
            border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
            backgroundColor: scrolled ? 'rgba(250, 250, 250, 0.92)' : 'rgba(250, 250, 250, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : '0 1px 8px rgba(0,0,0,0.03)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'auto',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Single Core Labs home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--color-text)',
            }}
          >
            <img
              src="/logo.webp"
              alt=""
              style={{ height: '24px', width: 'auto', display: 'block' }}
              loading="eager"
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: 'var(--color-text)',
            }}>
              Single Core Labs
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {NAV_LINKS.map((link) => {
              const isHash = link.href.startsWith('#')
              const style = {
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.25s',
              }
              return isHash ? (
                <a key={link.href} href={link.href} style={style}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} to={link.href} style={style}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-primary"
              style={{ padding: '8px 24px', fontSize: '13px' }}
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-text)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>

          <style>{`
            @media (max-width: 1023px) {
              .lg\\:hidden { display: block !important; }
            }
          `}</style>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'rgba(250, 250, 250, 0.98)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const isHash = link.href.startsWith('#')
              const style = {
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 6vw, 42px)',
                fontWeight: 400,
                color: 'var(--color-text)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
              }
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isHash ? (
                    <a href={link.href} onClick={() => setMenuOpen(false)} style={style}>
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} onClick={() => setMenuOpen(false)} style={style}>
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              )
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => setMenuOpen(false)}
                className="btn-primary"
                style={{ marginTop: '20px' }}
              >
                Book a Demo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
