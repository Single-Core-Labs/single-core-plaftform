import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '@/lib/constants'

// ─── DATA ────────────────────────────────────────────────────────────────────

const RESOURCES_LEFT = {
  label: 'Single Core Labs',
  items: [
    { label: 'About',    href: '/about' },
    { label: 'Security', href: '/security' },
    { label: 'Careers',  href: '/careers' },
  ],
}

const RESOURCES_RIGHT = [
  { label: 'Contact us',    href: '/contact' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Events',        href: '/events' },
  { label: 'Documentation', href: '/docs' },
]

const INDUSTRIES = [
  {
    label: 'Healthcare',
    href: '/solutions/healthcare-intelligence',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
  },
  {
    label: 'Finance',
    href: '/solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: 'Insurance',
    href: '/solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
      </svg>
    ),
  },
  {
    label: 'Logistics',
    href: '/solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'defect',
    href: '/solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
]

// ─── SOLUTIONS MEGA DROPDOWN ─────────────────────────────────────────────────
function SolutionsDropdown({ onClose }) {
  const colLabel = {
    fontFamily: 'var(--font-display)',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text-dim)',
    display: 'block',
    marginBottom: '18px',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.75)',
        borderTop: '1px solid rgba(255,255,255,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.04)',
        zIndex: 99,
      }}
    >
      <div style={{
        maxWidth: '1200px',
        marginInline: 'auto',
        paddingInline: 'clamp(16px, 2.5vw, 32px)',
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
      }}>
        {/* ── Col 1: Product ── */}
        <div style={{
          padding: '32px 32px 36px 0',
          borderRight: '1px solid rgba(0,0,0,0.07)',
        }}>
          <span style={colLabel}>Solutions</span>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            color: 'var(--color-text)',
            marginBottom: '10px',
          }}>
            Custom AI Systems
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            lineHeight: 1.65,
            color: 'var(--color-text-muted)',
            marginBottom: '20px',
            maxWidth: '220px',
          }}>
            Built by AI engineers and tuned to your data, infrastructure, and compliance requirements.
          </p>
          <Link
            to="/solutions"
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-accent)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Explore all solutions
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 9.5l7-7M3 2.5h6.5V9"/>
            </svg>
          </Link>
        </div>

        {/* ── Col 2: Industries ── */}
        <div style={{ padding: '32px 0 36px 40px' }}>
          <span style={colLabel}>Industries</span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '4px',
          }}>
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.label}
                to={ind.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '8px',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  background: 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-accent-dim)'
                  e.currentTarget.querySelector('.ind-icon').style.color = 'var(--color-accent)'
                  e.currentTarget.querySelector('.ind-label').style.color = 'var(--color-text)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.querySelector('.ind-icon').style.color = 'var(--color-text-dim)'
                  e.currentTarget.querySelector('.ind-label').style.color = 'var(--color-text-muted)'
                }}
              >
                <span className="ind-icon" style={{ color: 'var(--color-text-dim)', transition: 'color 0.15s' }}>
                  {ind.icon}
                </span>
                <span className="ind-label" style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.15s',
                }}>
                  {ind.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── RESOURCES MEGA DROPDOWN ─────────────────────────────────────────────────
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
        width: '520px',
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
      <div style={{ padding: '28px 24px 32px', borderRight: '1px solid rgba(0,0,0,0.07)' }}>
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
              key={item.href} to={item.href} onClick={onClose}
              style={colLinkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ padding: '28px 24px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '30px' }}>
          {RESOURCES_RIGHT.map((item) => (
            <Link
              key={item.href} to={item.href} onClick={onClose}
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

// ─── ENTERPRISE DROPDOWN ─────────────────────────────────────────────────────
function EnterpriseDropdown({ onClose }) {
  const linkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--color-text)',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    transition: 'color 0.15s, background-color 0.15s',
    display: 'block',
    padding: '10px 16px',
    borderRadius: '6px',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 14px)',
        left: 0,
        width: '240px',
        background: 'rgba(245, 245, 243, 0.98)',
        border: '1px solid rgba(0,0,0,0.09)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
        zIndex: 200,
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <Link
        to="/enterprise" onClick={onClose} style={linkStyle}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        Overview
      </Link>
      <Link
        to="/solutions/healthcare-intelligence" onClick={onClose} style={linkStyle}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-accent-dim)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        Healthcare Intelligence
      </Link>
    </motion.div>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [enterpriseOpen, setEnterpriseOpen] = useState(false)

  const solutionsRef  = useRef(null)
  const resourcesRef  = useRef(null)
  const enterpriseRef = useRef(null)
  const { scrollY }   = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 60))

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function handleClick(e) {
      if (solutionsRef.current  && !solutionsRef.current.contains(e.target))  setSolutionsOpen(false)
      if (resourcesRef.current  && !resourcesRef.current.contains(e.target))  setResourcesOpen(false)
      if (enterpriseRef.current && !enterpriseRef.current.contains(e.target)) setEnterpriseOpen(false)
    }
    function handleScroll() { setSolutionsOpen(false) }
    document.addEventListener('mousedown', handleClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeAll = () => {
    setSolutionsOpen(false)
    setResourcesOpen(false)
    setEnterpriseOpen(false)
    setMenuOpen(false)
  }

  const linkStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.02em',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    transition: 'color 0.25s',
  }

  const chevron = (open) => (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: '1px' }}>
      <path d="M2 4l4 4 4-4" />
    </svg>
  )

  const dropdownBtn = (label, open, toggle) => (
    <button
      aria-haspopup="true"
      aria-expanded={open}
      onClick={toggle}
      style={{
        ...linkStyle,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: 0,
        color: open ? 'var(--color-text)' : 'var(--color-text-muted)',
      }}
    >
      {label}
      {chevron(open)}
    </button>
  )

  return (
    <>
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
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.04)' : '0 1px 8px rgba(0,0,0,0.02)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto',
        }}>

          {/* Logo */}
          <Link to="/" aria-label="Single Core Labs home" style={{
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
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

            {/* Solutions dropdown */}
            <div ref={solutionsRef} style={{ position: 'relative' }}>
              {dropdownBtn('Solutions', solutionsOpen, () => setSolutionsOpen(o => !o))}
              <AnimatePresence>
                {solutionsOpen && <SolutionsDropdown onClose={closeAll} />}
              </AnimatePresence>
            </div>

            {/* Other NAV_LINKS */}
            {NAV_LINKS.filter(l => l.label !== 'Solutions').map((link) => {
              if (link.label === 'Enterprise') {
                return (
                  <div key={link.href} ref={enterpriseRef} style={{ position: 'relative' }}>
                    {dropdownBtn('Enterprise', enterpriseOpen, () => setEnterpriseOpen(o => !o))}
                    <AnimatePresence>
                      {enterpriseOpen && <EnterpriseDropdown onClose={closeAll} />}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <Link key={link.href} to={link.href} style={linkStyle}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Case Studies */}
            <Link to="/case-studies" style={linkStyle}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
            >
              Case Studies
            </Link>

            {/* Resources dropdown */}
            <div ref={resourcesRef} style={{ position: 'relative' }}>
              {dropdownBtn('Resources', resourcesOpen, () => setResourcesOpen(o => !o))}
              <AnimatePresence>
                {resourcesOpen && <ResourcesDropdown onClose={closeAll} />}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="btn-primary">Book a Demo</Link>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none', border: '1px solid rgba(0,0,0,0.10)',
              color: 'var(--color-text)', cursor: 'pointer',
              padding: '7px 9px', borderRadius: '6px',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen
                ? <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                : <><path strokeLinecap="round" d="M3 7h18" /><path strokeLinecap="round" d="M3 12h12" /><path strokeLinecap="round" d="M3 17h18" /></>
              }
            </svg>
          </button>

          <style>{`@media (max-width: 1023px) { .mobile-menu-btn { display: flex !important; } }`}</style>
        </nav>
      </header>

      {/* Mobile menu */}
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
              position: 'fixed', inset: 0, zIndex: 90,
              background: 'rgba(250, 250, 250, 0.98)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', gap: '32px',
            }}
          >
            {/* Solutions industries in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-text-dim)' }}>
                Solutions
              </span>
              {INDUSTRIES.map(ind => (
                <Link key={ind.label} to={ind.href} onClick={closeAll}
                  style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(22px,4.5vw,32px)', fontWeight:400, color:'var(--color-text-muted)', textDecoration:'none', letterSpacing:'-0.02em' }}
                >
                  {ind.label}
                </Link>
              ))}
            </motion.div>

            {[...NAV_LINKS.filter(l => l.label !== 'Solutions'), { label: 'Case Studies', href: '/case-studies' }].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={link.href} onClick={closeAll}
                  style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,6vw,42px)', fontWeight:400, color:'var(--color-text)', textDecoration:'none', letterSpacing:'-0.02em' }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Resources in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 1) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-text-dim)' }}>
                Resources
              </span>
              {[...RESOURCES_LEFT.items, ...RESOURCES_RIGHT].map(item => (
                <Link key={item.href} to={item.href} onClick={closeAll}
                  style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(20px,4vw,28px)', fontWeight:400, color:'var(--color-text-muted)', textDecoration:'none', letterSpacing:'-0.02em' }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45, duration:0.4 }}>
              <Link to="/contact" onClick={closeAll} className="btn-primary" style={{ marginTop:'8px' }}>
                Book a Demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
