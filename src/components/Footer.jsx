import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from '@/lib/constants'
import { fadeUp, viewport, staggerContainer } from '@/lib/animations'

const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, isExternal: true },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Healthcare', href: '/solutions' },
      { label: 'Finance', href: '/solutions' },
      { label: 'Logistics', href: '/solutions' },
      { label: 'E-commerce', href: '/solutions' },
    ],
  },
]

function FooterLink({ link }) {
  const style = {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-dim)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };
  if (link.isExternal) return <a href={link.href} target="_blank" rel="noopener noreferrer" style={style}>{link.label}</a>;
  if (link.isHash) return <a href={link.href} style={style}>{link.label}</a>;
  return <Link to={link.href} style={style}>{link.label}</Link>;
}

export function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        position: 'relative',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container-editorial" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}>
              {/* Brand */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link to="/" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}>
                  Single Core Labs
                </Link>
                <p style={{ fontSize: '13px', color: 'var(--color-text-dim)', lineHeight: 1.8, maxWidth: '280px' }}>
                  We translate deep expertise in building frontier models and agents
                  into enterprise solutions that operate with precision at scale.
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Pune, Maharashtra</p>
              </div>

              {/* Link columns */}
              {FOOTER_LINKS.map((col) => (
                <nav key={col.heading} aria-label={`${col.heading} links`}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '16px',
                  }}>
                    {col.heading}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {col.links.map((link) => (
                      <li key={link.label}><FooterLink link={link} /></li>
                    ))}
                  </ul>
                </nav>
              ))}

              {/* Socials */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '16px',
                }}>
                  Connect
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {[
                    { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.135 1.445-2.135 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.604 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.225 0z' },
                    { href: SOCIAL_LINKS.twitter, label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.504 11.24h-6.66l-5.214-6.82-5.967 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.713 6.23 5.451-6.23zm-1.16 17.52h1.833L7.13 4.126H5.163l11.92 15.644z' },
                    { href: SOCIAL_LINKS.github, label: 'GitHub', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Single Core Labs on ${social.label}`}
                      style={{ color: 'var(--color-text-dim)', transition: 'color 0.2s' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar — floating inset rectangle matching navbar */}
        </motion.div>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        marginTop: '20px',
        paddingBottom: '40px', // Space for the watermark
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(60px, 14vw, 200px)',
          fontWeight: 700,
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,0,0,0.1)',
          whiteSpace: 'nowrap',
        }}>
          Single Core Labs
        </span>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: 0,
        right: 0,
        padding: '0 clamp(16px, 3vw, 40px)',
        zIndex: 10,
      }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            height: '56px',
            paddingInline: 'clamp(16px, 2.5vw, 32px)',
            maxWidth: '1200px',
            marginInline: 'auto',
            border: '1px solid rgba(0,0,0,0.2)',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.02em', fontWeight: 500 }}>
            © {new Date().getFullYear()} Single Core Labs. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/privacy" style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            >Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}