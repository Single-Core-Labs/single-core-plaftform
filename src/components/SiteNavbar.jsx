import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CREAM = '#FFFFFF'

const LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions/reinforcement-learning' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Sovereign AI', href: '/sovereign-ai' },
  { label: 'SCL Cloud', href: '/cloud' },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const PRODUCTS = [
  { label: 'Marshal', desc: 'Coding and automation agent', href: '/product/marshal' },
]

const INDUSTRIES = [
  { label: 'Defense & NatSec', href: '/solutions/defense' },
  { label: 'Federal', href: '/federal' },
  { label: 'Financial Services', href: '/financial-services' },
  { label: 'Healthcare', href: '/enterprise' },
  { label: 'Technology', href: '/enterprise' },
  { label: 'Telecom', href: '/telecom' },
]

const SOLUTIONS = [
  { label: 'Solutions', href: '/solutions/ai-modernization' },
  { label: 'Data Prep', href: '/solutions/data-prep' },
  { label: 'Model Training', href: '/solutions/model-training' },
  { label: 'Model Inference', href: '/solutions/model-inference' },
  { label: 'RL Environments', href: '/solutions/reinforcement-learning' },
]

const CLOUD_MENU = [
  {
    heading: 'AI Cloud Platform',
    items: [
      { label: 'Cloud Overview', href: '/cloud/overview' },
    ],
  },
  {
    heading: 'Managed AI',
    items: [
      { label: 'Managed Inference', href: '/cloud/managed-inference' },
      { label: 'Serverless Fine-Tuning', href: '/cloud/serverless-fine-tuning' },
    ],
  },
]

function useIsMobile(breakpoint = 860) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [breakpoint])
  return isMobile
}

// Single site-wide navbar — desktop pill, hamburger menu on mobile.
// Fixed so it stays visible while scrolling on every page.
export function SiteNavbar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [prodOpen, setProdOpen] = useState(false)
  const [prodMobileOpen, setProdMobileOpen] = useState(false)
  const [entOpen, setEntOpen] = useState(false)
  const [entMobileOpen, setEntMobileOpen] = useState(false)
  const [solOpen, setSolOpen] = useState(false)
  const [solMobileOpen, setSolMobileOpen] = useState(false)
  const [cloudOpen, setCloudOpen] = useState(false)
  const [cloudMobileOpen, setCloudMobileOpen] = useState(false)

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open && isMobile ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open, isMobile])

  const closeTimer = useRef(null)
  const closeAll = () => {
    setProdOpen(false)
    setSolOpen(false)
    setEntOpen(false)
    setCloudOpen(false)
  }
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  if (!isMobile) {
    return (
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
        <nav
          aria-label="Main navigation"
          style={{
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '0 0 20px 20px',
            padding: 'clamp(10px, 1.2vw, 16px) clamp(20px, 3vw, 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(14px, 2.5vw, 56px)',
            whiteSpace: 'nowrap',
          }}
        >
          <Link
            to="/"
            aria-label="Single Core Labs home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              marginRight: 'clamp(8px, 1.5vw, 24px)',
            }}
          >
            <img
              src="/logo-icon.png"
              alt=""
              style={{ height: '26px', width: 'auto', display: 'block' }}
            />
            <span style={{ color: CREAM, fontWeight: 600, fontSize: '14px', letterSpacing: '0.02em' }}>
              Single Core Labs
            </span>
          </Link>
          {LINKS.map((item) => item.label === 'Product' ? (
            <div
              key="Product"
              onMouseEnter={() => { cancelClose(); closeAll(); setProdOpen(true) }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setProdOpen(false), 150) }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setProdOpen(false) }}
              onKeyDown={(e) => { if (e.key === 'Escape') setProdOpen(false) }}
              style={{ position: 'relative' }}
            >
              <Link
                to={item.href}
                aria-haspopup="true"
                aria-expanded={prodOpen}
                onFocus={() => { closeAll(); setProdOpen(true) }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
              >
                {item.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: prodOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {prodOpen && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={() => setProdOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    minWidth: '250px',
                    zIndex: 70,
                  }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 12px 8px' }}>
                    Products
                  </p>
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.label}
                      to={p.href}
                      onClick={() => setProdOpen(false)}
                      style={{ display: 'block', padding: '10px 12px', textDecoration: 'none', minHeight: '44px', borderRadius: '8px' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                    >
                      <span style={{ display: 'block', color: CREAM, fontSize: '14px', fontWeight: 600 }}>
                        {p.label}
                      </span>
                      <span style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '12.5px', marginTop: '2px' }}>
                        {p.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'Enterprise' ? (
            <div
              key="Enterprise"
              onMouseEnter={() => { cancelClose(); closeAll(); setEntOpen(true) }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setEntOpen(false), 150) }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setEntOpen(false) }}
              onKeyDown={(e) => { if (e.key === 'Escape') setEntOpen(false) }}
              style={{ position: 'relative' }}
            >
              <Link
                to={item.href}
                aria-haspopup="true"
                aria-expanded={entOpen}
                onFocus={() => { closeAll(); setEntOpen(true) }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
              >
                {item.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: entOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {entOpen && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={() => setEntOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    minWidth: '250px',
                    zIndex: 70,
                  }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 12px 8px' }}>
                    Industries
                  </p>
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.label}
                      to={ind.href}
                      onClick={() => setEntOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '44px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = CREAM; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'none' }}
                    >
                      {ind.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'Solutions' ? (
            <div
              key="Solutions"
              onMouseEnter={() => { cancelClose(); closeAll(); setSolOpen(true) }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setSolOpen(false), 150) }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setSolOpen(false) }}
              onKeyDown={(e) => { if (e.key === 'Escape') setSolOpen(false) }}
              style={{ position: 'relative' }}
            >
              <Link
                to={item.href}
                aria-haspopup="true"
                aria-expanded={solOpen}
                onFocus={() => { closeAll(); setSolOpen(true) }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
              >
                {item.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: solOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {solOpen && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={() => setSolOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    minWidth: '250px',
                    zIndex: 70,
                  }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 12px 8px' }}>
                    Solutions
                  </p>
                      {SOLUTIONS.map((sol) => (
                    <Link
                      key={sol.label}
                      to={sol.href}
                      onClick={() => setSolOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '44px',
                        padding: '8px 12px',
                        paddingLeft: sol.indent ? '24px' : '12px',
                        borderRadius: '8px',
                        color: sol.indent ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = CREAM; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'none' }}
                    >
                      {sol.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'SCL Cloud' ? (
            <div
              key="SCL Cloud"
              onMouseEnter={() => { cancelClose(); closeAll(); setCloudOpen(true) }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setCloudOpen(false), 150) }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setCloudOpen(false) }}
              onKeyDown={(e) => { if (e.key === 'Escape') setCloudOpen(false) }}
              style={{ position: 'relative' }}
            >
              <Link
                to={item.href}
                aria-haspopup="true"
                aria-expanded={cloudOpen}
                onFocus={() => { closeAll(); setCloudOpen(true) }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
              >
                {item.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: cloudOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {cloudOpen && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={() => setCloudOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    minWidth: '260px',
                    zIndex: 70,
                  }}
                >
                  {CLOUD_MENU.map((group) => (
                    <div key={group.heading} style={{ marginBottom: '4px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 12px 8px' }}>
                        {group.heading}
                      </p>
                      {group.items.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setCloudOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '44px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            color: 'rgba(255,255,255,0.85)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = CREAM; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'none' }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: 'clamp(10px, 1vw, 14px)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = CREAM)}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.8)')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    )
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60 }}>
        <nav
          aria-label="Main navigation"
          style={{
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '0 0 16px 16px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Single Core Labs home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', color: CREAM, textDecoration: 'none' }}
          >
            <img
              src="/logo-icon.png"
              alt=""
              style={{ height: '24px', width: 'auto', display: 'block' }}
            />
            <span style={{ fontWeight: 700, letterSpacing: '0.04em', fontSize: '15px' }}>
              Single Core Labs
            </span>
          </Link>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              color: CREAM,
              cursor: 'pointer',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open
                ? <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                : <><path strokeLinecap="round" d="M3 7h18" /><path strokeLinecap="round" d="M3 12h18" /><path strokeLinecap="round" d="M3 17h18" /></>}
            </svg>
          </button>
        </nav>

        {open && (
          <div
            style={{
              background: 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '0 0 16px 16px',
              padding: '8px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          {LINKS.map((item) => item.label === 'Product' ? (
            <div key="Product" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: CREAM,
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 500,
                    padding: '12px 0',
                  }}
                >
                  {item.label}
                </Link>
                <button
                  aria-label={prodMobileOpen ? 'Collapse products' : 'Expand products'}
                  aria-expanded={prodMobileOpen}
                  onClick={() => setProdMobileOpen((o) => !o)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: CREAM,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: prodMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
              {prodMobileOpen && (
                <div style={{ paddingBottom: '8px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 4px' }}>
                    Products
                  </p>
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.label}
                      to={p.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'block',
                        minHeight: '44px',
                        color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: '10px 0 10px 12px',
                      }}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'Enterprise' ? (
            <div key="Enterprise" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: CREAM,
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 500,
                    padding: '12px 0',
                  }}
                >
                  {item.label}
                </Link>
                <button
                  aria-label={entMobileOpen ? 'Collapse industries' : 'Expand industries'}
                  aria-expanded={entMobileOpen}
                  onClick={() => setEntMobileOpen((o) => !o)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: CREAM,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: entMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
              {entMobileOpen && (
                <div style={{ paddingBottom: '8px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 4px' }}>
                    Industries
                  </p>
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.label}
                      to={ind.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '44px',
                        color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: '6px 0 6px 12px',
                      }}
                    >
                      {ind.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'Solutions' ? (
            <div key="Solutions" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: CREAM,
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 500,
                    padding: '12px 0',
                  }}
                >
                  {item.label}
                </Link>
                <button
                  aria-label={solMobileOpen ? 'Collapse solutions' : 'Expand solutions'}
                  aria-expanded={solMobileOpen}
                  onClick={() => setSolMobileOpen((o) => !o)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: CREAM,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: solMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
              {solMobileOpen && (
                <div style={{ paddingBottom: '8px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 4px' }}>
                    Solutions
                  </p>
                      {SOLUTIONS.map((sol) => (
                    <Link
                      key={sol.label}
                      to={sol.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '44px',
                        color: sol.indent ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        padding: sol.indent ? '6px 0 6px 24px' : '6px 0 6px 12px',
                      }}
                    >
                      {sol.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.label === 'SCL Cloud' ? (
            <div key="SCL Cloud" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: CREAM,
                    textDecoration: 'none',
                    fontSize: '17px',
                    fontWeight: 500,
                    padding: '12px 0',
                  }}
                >
                  {item.label}
                </Link>
                <button
                  aria-label={cloudMobileOpen ? 'Collapse cloud menu' : 'Expand cloud menu'}
                  aria-expanded={cloudMobileOpen}
                  onClick={() => setCloudMobileOpen((o) => !o)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: CREAM,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ transition: 'transform 0.2s', transform: cloudMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
              {cloudMobileOpen && (
                <div style={{ paddingBottom: '12px' }}>
                  {CLOUD_MENU.map((group) => (
                    <div key={group.heading} style={{ marginTop: '12px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '4px 0 4px' }}>
                        {group.heading}
                      </p>
                      {group.items.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '44px',
                            color: 'rgba(255,255,255,0.85)',
                            textDecoration: 'none',
                            fontSize: '16px',
                            padding: '6px 0 6px 12px',
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              style={{
                color: CREAM,
                textDecoration: 'none',
                fontSize: '17px',
                fontWeight: 500,
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {item.label}
            </Link>
          ))}
          </div>
        )}
      </div>
    </>
  )
}
