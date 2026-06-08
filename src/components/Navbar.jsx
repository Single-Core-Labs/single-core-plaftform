import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Factory, Landmark, Monitor, Shield, SquarePlus } from 'lucide-react'
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
  { label: 'Finance', href: '/solutions', icon: Landmark },
  { label: 'Tech', href: '/solutions', icon: Monitor },
  { label: 'Manufacturing', href: '/solutions', icon: Factory },
  { label: 'Healthcare', href: '/solutions/healthcare-intelligence', icon: SquarePlus },
  { label: 'Defense', href: '/solutions', icon: Shield },
]

// ─── SOLUTIONS MEGA DROPDOWN ─────────────────────────────────────────────────
function SolutionsDropdown({ onClose }) {
  const colLabel = {
    fontFamily: 'var(--font-serif)',
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1,
    color: 'rgba(26, 26, 26, 0.45)',
    display: 'block',
    marginBottom: '14px',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: '72px',
        left: 0,
        right: 0,
        background: '#F8F8F7',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.045)',
        zIndex: 99,
      }}
    >
      <div style={{
        maxWidth: '860px',
        marginInline: 'auto',
        padding: '14px clamp(18px, 3vw, 32px) 18px',
        display: 'grid',
        gridTemplateColumns: '180px 190px',
        alignItems: 'start',
        columnGap: 'clamp(32px, 6vw, 74px)',
      }}>
        {/* ── Col 1: Product ── */}
        <div style={{
          paddingTop: '2px',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: 1.1,
            color: 'var(--color-text)',
            marginBottom: '10px',
          }}>
            Custom AI Solutions
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            lineHeight: 1.45,
            color: 'rgba(26, 26, 26, 0.48)',
            maxWidth: '172px',
          }}>
            Built by AI experts and tuned to your data and use case
          </p>
        </div>

        {/* ── Col 2: Industries ── */}
        <div>
          <span style={colLabel}>Industries</span>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.label}
                to={ind.href}
                onClick={onClose}
                className="solutions-industry-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: 'max-content',
                  minHeight: '18px',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  transition: 'color 0.18s',
                }}
              >
                <span style={{ color: 'currentColor', display: 'inline-flex' }}>
                  <ind.icon size={15} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: 1,
                }}>
                  {ind.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <style>{`
        .solutions-industry-link:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
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
              justifyContent: 'flex-start', alignItems: 'center', gap: '32px',
              overflowY: 'auto',
              paddingTop: '100px',
              paddingBottom: '60px',
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
