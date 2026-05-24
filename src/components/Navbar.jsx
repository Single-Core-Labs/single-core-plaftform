import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '@/lib/constants'

// ─── Resources mega-dropdown data ────────────────────────────────────────────
const RESOURCES_LEFT = {
  label: 'Single Core Labs',
  items: [
    { label: 'About',    href: '/about' },
    { label: 'Security', href: '/security' },
    { label: 'Guides',   href: '/guides' },
    { label: 'Careers',  href: '/careers' },
  ],
}

const RESOURCES_RIGHT = [
  { label: 'Contact us',    href: '/contact' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Events',        href: '/events' },
  { label: 'Documentation', href: '/docs' },
]

// ─── Mega Dropdown ────────────────────────────────────────────────────────────
function ResourcesDropdown({ onClose }) {
  const colLinkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--color-text)',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    lineHeight: 1,
    transition: 'color 0.15s',
    display: 'block',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 14px)',
        right: 0,
        width: '480px',
        background: 'rgba(245, 245, 243, 0.98)',
        border: '1px solid rgba(0,0,0,0.09)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
        zIndex: 200,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* Left column */}
      <div style={{
        padding: '28px 24px 32px',
        borderRight: '1px solid rgba(0,0,0,0.07)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--color-text-dim)',
          display: 'block',
          marginBottom: '20px',
        }}>
          {RESOURCES_LEFT.label}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {RESOURCES_LEFT.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              style={colLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div style={{ padding: '28px 24px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '30px' }}>
          {RESOURCES_RIGHT.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              style={colLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const linkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.02em',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    transition: 'color 0.25s',
  }

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

            {/* Regular nav links from constants */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={linkStyle}
                onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
              >
                {link.label}
              </Link>
            ))}

            {/* Case Studies */}
            <Link
              to="/case-studies"
              style={linkStyle}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
            >
              Case Studies
            </Link>

            {/* Resources dropdown */}
            <div
              ref={resourcesRef}
              style={{ position: 'relative' }}
            >
              <button
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((o) => !o)}
                style={{
                  ...linkStyle,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                  color: resourcesOpen ? 'var(--color-text)' : 'var(--color-text-muted)',
                }}
              >
                Resources
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    transition: 'transform 0.2s',
                    transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    marginTop: '1px',
                  }}
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <ResourcesDropdown onClose={() => setResourcesOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            <button type="button" onClick={() => window.openChatModal()} className="btn-primary">
              Book a Demo
            </button>
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
              gap: '36px',
            }}
          >
            {/* Regular links */}
            {[...NAV_LINKS, { label: 'Case Studies', href: '/case-studies' }].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(28px, 6vw, 42px)',
                    fontWeight: 400,
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Resources sub-links in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 1) * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-text-dim)',
              }}>
                Resources
              </span>
              {[...RESOURCES_LEFT.items, ...RESOURCES_RIGHT].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(22px, 4.5vw, 32px)',
                    fontWeight: 400,
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
<button
  type="button"
  onClick={() => { setMenuOpen(false); window.openChatModal(); }}
  className="btn-primary"
  style={{ marginTop: '8px' }}
>
  Book a Demo
</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
