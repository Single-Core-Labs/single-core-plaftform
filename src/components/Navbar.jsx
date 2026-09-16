import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

// Scale-like navbar — fixed, Aeonik-style, h-10 rounded 8px, grid
// theme: "editorial" (paper, home) | "dark" (default, /deployment /security)
export function Navbar({ overlay = false, theme = "dark" }) {
  const isEditorial = theme === "editorial"
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const solutionsRef = useRef(null)

  // Backdrop blur only after scroll — saves full-screen blur repaint on every scroll frame at top
  useEffect(() => {
    if (overlay) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = window.scrollY || document.documentElement.scrollTop
        setIsScrolled(y > 16)
      })
    }
    // also listen to lenis if present
    const lenis = window.lenis
    if (lenis) {
      const onLenis = () => onScroll()
      lenis.on('scroll', onLenis)
      return () => lenis.off('scroll', onLenis)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [overlay])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Keep dropdown pinned after click/hover — close only on outside click or selection
  useEffect(() => {
    if (!solutionsOpen) return
    const onDown = (e) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target)) setSolutionsOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setSolutionsOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [solutionsOpen])

  const close = () => { setOpen(false); setSolutionsOpen(false) }

  return (
    <>
      <header
        data-theme={isEditorial ? undefined : "dark"}
        style={{
          position: overlay ? 'absolute' : 'fixed',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 50,
          background: overlay
            ? 'transparent'
            : isEditorial
              ? (isScrolled ? 'rgba(250,247,242,0.92)' : 'transparent')
              : (isScrolled ? 'rgba(10,10,10,0.82)' : '#0A0A0A'),
          backdropFilter: overlay ? 'none' : (isScrolled ? 'blur(12px)' : 'none'),
          WebkitBackdropFilter: overlay ? 'none' : (isScrolled ? 'blur(12px)' : 'none'),
          borderBottom: overlay
            ? 'none'
            : isEditorial
              ? (isScrolled ? '1px solid rgba(15,35,34,0.10)' : 'none')
              : '1px solid rgba(255,255,255,0.08)',
          transition: 'background 0.25s, backdrop-filter 0.25s',
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'layout paint',
        }}
      >
        <div style={{ maxWidth: '1472px', margin: '0 auto', padding: '12px 24px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}>
          {/* Logo — correct brand mark (public/logo-icon.original.png) at left corner */}
          <Link to="/" aria-label="Home" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0, justifySelf: 'start' }}>
            <img src="/logo-icon.original.png" alt="Single Core Labs" style={{ height: '28px', width: 'auto', display: 'block', objectFit: 'contain', filter: isEditorial ? 'brightness(0)' : 'none' }} />
          </Link>

          {/* Center nav — Scale: Products/Solutions/Research/Resources */}
          <nav aria-label="Primary" className="hidden md:flex" style={{ alignItems: 'center', gap: '4px', justifyContent: 'center', justifySelf: 'center' }}>
            {NAV_LINKS.map((item) => {
              if (item.label === 'Product') {
                return (
                  <div key={item.label} ref={solutionsRef} onMouseEnter={() => setSolutionsOpen(true)} style={{ position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Link
                        to={item.href}
                        style={{
                          height: '40px',
                          padding: '0 14px 0 14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '14px',
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: isEditorial ? '#0F2322' : 'rgba(255,255,255,0.85)',
                          textDecoration: 'none',
                          borderRadius: '8px 0 0 8px',
                          transition: 'background 0.2s, color 0.2s',
                        }}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle Product menu"
                        aria-expanded={solutionsOpen}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSolutionsOpen((o) => !o) }}
                        style={{ height: '40px', padding: '0 10px 0 2px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: isEditorial ? '#0F2322' : 'rgba(255,255,255,0.85)', cursor: 'pointer', borderRadius: '0 8px 8px 0' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ opacity: 0.6, transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6" /></svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {solutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#FFFFFF',
                            border: '1px solid #E5E5E5',
                            borderRadius: '12px',
                            padding: '8px',
                            minWidth: '200px',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                            zIndex: 60,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                          }}
                        >
                          <Link to="/solutions" onClick={() => setSolutionsOpen(false)} style={{ padding: '10px 12px', borderRadius: '8px', color: '#0A0A0A', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Solutions Overview</Link>
                          <Link to="/training" onClick={() => setSolutionsOpen(false)} style={{ padding: '10px 12px', borderRadius: '8px', background: '#FFFFFF', color: '#0A0A0A', textDecoration: 'none', fontSize: '14px', fontWeight: 500, border: '1px solid #E5E7EB' }}>
                            Training <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 400 }}>— Model Lab</span>
                          </Link>
                          <Link to="/solutions/rl-lab" onClick={() => setSolutionsOpen(false)} style={{ padding: '10px 12px', borderRadius: '8px', background: '#F5F5F5', color: '#0A0A0A', textDecoration: 'none', fontSize: '14px', fontWeight: 500, border: '1px solid #EFEFEF' }}>
                            RL Lab <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 400 }}>— new</span>
                          </Link>
                          <Link to="/product/data-foundry" onClick={() => setSolutionsOpen(false)} style={{ padding: '10px 12px', borderRadius: '8px', background: '#0A0A0A', color: '#FFFFFF', textDecoration: 'none', fontSize: '14px', fontWeight: 500, border: '1px solid #0A0A0A', marginTop: '2px' }}>
                            Data Foundry <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>— new</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{
                    height: '40px',
                    padding: '0 14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: isEditorial ? '#0F2322' : 'rgba(255,255,255,0.85)',
                    textDecoration: 'none',
                    borderRadius: '8px',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTAs — Scale: Book demo solid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, justifySelf: 'end' }}>
            <div className="hidden md:flex" style={{ gap: '8px' }}>
              <Link to="/contact" style={{ height: '40px', padding: '0 16px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, borderRadius: '8px', textDecoration: 'none', background: isEditorial ? '#0F2322' : '#FFFFFF', color: isEditorial ? '#FAF7F2' : '#0A0A0A', border: '1px solid transparent' }}>
                Get Started
              </Link>
            </div>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="md:hidden"
              style={{ width: '40px', height: '40px', borderRadius: '8px', border: isEditorial ? '1px solid rgba(15,35,34,0.16)' : '1px solid rgba(255,255,255,0.14)', background: isEditorial ? 'rgba(15,35,34,0.06)' : 'rgba(255,255,255,0.06)', color: isEditorial ? '#0F2322' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ width: '16px', height: '2px', background: 'currentColor', display: 'block', transform: open ? 'rotate(45deg) translateY(4px)' : 'none', transition: 'transform 0.2s' }} />
                <span style={{ width: '16px', height: '2px', background: 'currentColor', display: 'block', opacity: open ? 0 : 1 }} />
                <span style={{ width: '16px', height: '2px', background: 'currentColor', display: 'block', transform: open ? 'rotate(-45deg) translateY(-4px)' : 'none', transition: 'transform 0.2s' }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — Scale: full-screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 49, background: isEditorial ? '#FAF7F2' : '#FFFFFF', padding: '80px 24px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {NAV_LINKS.map((item) => (
              <div key={item.label}>
                <Link to={item.href} onClick={close} style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-0.02em', color: '#0A0A0A', textDecoration: 'none', display: 'block', padding: '8px 0' }}>
                  {item.label}
                </Link>
                {item.label === 'Product' && (
                  <div style={{ marginTop: '8px', paddingLeft: '16px', borderLeft: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link to="/training" onClick={close} style={{ fontSize: '16px', color: '#0A0A0A', textDecoration: 'none', fontWeight: 500 }}>Training — Model Lab</Link>
                    <Link to="/solutions/rl-lab" onClick={close} style={{ fontSize: '16px', color: '#6B7280', textDecoration: 'none' }}>RL Lab — new</Link>
                    <Link to="/product/data-foundry" onClick={close} style={{ fontSize: '16px', color: '#0A0A0A', textDecoration: 'none', fontWeight: 500 }}>Data Foundry — new</Link>
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" onClick={close} style={{ marginTop: '16px', background: '#0A0A0A', color: '#fff', padding: '14px', borderRadius: '999px', textAlign: 'center', textDecoration: 'none', fontWeight: 600, width: '100%', display: 'block' }}>Get Started</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer — skip on overlay heroes (they manage their own inset) */}
      {!overlay && (
        <div aria-hidden="true" style={{ height: '64px' }} className="scale-nav-spacer" />
      )}
    </>
  )
}
