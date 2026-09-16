import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from '@/lib/constants'
import { fadeUp, viewport, staggerContainer } from '@/lib/animations'

const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'For Enterprises', href: '/enterprise' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Research', href: '/research' },
      { label: 'Contact', href: '/contact' },
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, isExternal: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/guides' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
]

const linkStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  color: 'color-mix(in srgb, var(--color-text) 50%, transparent)',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

const linkProminentStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  fontWeight: 600,
  color: 'color-mix(in srgb, var(--color-text) 85%, transparent)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  letterSpacing: '0.01em',
};

const FooterLink = memo(function FooterLink({ link }) {
  const style = link.prominent ? linkProminentStyle : linkStyle;
  const leaveColor = link.prominent ? 'color-mix(in srgb, var(--color-text) 85%, transparent)' : 'color-mix(in srgb, var(--color-text) 50%, transparent)';
  if (link.isExternal) return <a href={link.href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={e => e.target.style.color = 'var(--color-text)'} onMouseLeave={e => e.target.style.color = leaveColor}>{link.label}</a>;
  if (link.isHash) return <a href={link.href} style={style} onMouseEnter={e => e.target.style.color = 'var(--color-text)'} onMouseLeave={e => e.target.style.color = leaveColor}>{link.label}</a>;
  return <Link to={link.href} style={style} onMouseEnter={e => e.target.style.color = 'var(--color-text)'} onMouseLeave={e => e.target.style.color = leaveColor}>{link.label}</Link>;
});

export function Footer({ theme = "dark" }) {
  const isEditorial = theme === "editorial"
  return (
    <footer
      role="contentinfo"
      data-theme={isEditorial ? undefined : "dark"}
      style={{
        position: 'relative',
        background: isEditorial ? 'var(--e-canvas, #FAF7F2)' : '#0A0A0A',
        color: isEditorial ? 'var(--e-ink-deep, #0F2322)' : '#FAFAFA',
        borderTop: isEditorial ? '1px solid var(--e-rule-thin, rgba(15,35,34,0.10))' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container-editorial" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        {isEditorial && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'var(--e-ink-muted, #5A6B69)',
            margin: '0 0 32px',
          }}>
            <span style={{ color: 'var(--e-bracket, #94A3A1)' }}>[</span> AI infrastructure · data platform <span style={{ color: 'var(--e-bracket, #94A3A1)' }}>]</span>
          </p>
        )}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}>
                  Single Core Labs
                </Link>
                <p style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--color-text) 40%, transparent)' }}>Pune, Maharashtra</p>
              </div>

              {FOOTER_LINKS.map((col) => (
                <nav key={col.heading} aria-label={`${col.heading} links`}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
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

              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
                  marginBottom: '16px',
                }}>
                  Connect
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {[
                    { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.135 1.445-2.135 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.604 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.225 0z' },
                   ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Single Core Labs on ${social.label}`}
                      style={{ color: 'color-mix(in srgb, var(--color-text) 50%, transparent)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                      onMouseLeave={e => e.target.style.color = 'color-mix(in srgb, var(--color-text) 50%, transparent)'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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
        paddingBottom: '40px',
      }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(60px, 14vw, 200px)',
            fontWeight: 600,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: isEditorial ? '1px var(--e-rule-thin, rgba(15,35,34,0.10))' : '1px color-mix(in srgb, var(--color-text) 5%, transparent)',
            whiteSpace: 'nowrap',
            transition: 'filter 0.4s ease, text-shadow 0.4s ease',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter = 'drop-shadow(0 0 30px color-mix(in srgb, var(--color-text) 15%, transparent)) drop-shadow(0 0 60px color-mix(in srgb, var(--color-text) 8%, transparent))'
            e.currentTarget.style.WebkitTextStroke = '1px color-mix(in srgb, var(--color-text) 25%, transparent)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'none'
            e.currentTarget.style.WebkitTextStroke = '1px color-mix(in srgb, var(--color-text) 5%, transparent)'
          }}
        >
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
            gap: '16px 32px',
            minHeight: '56px',
            padding: '12px clamp(16px, 2.5vw, 32px)',
            maxWidth: '1200px',
            marginInline: 'auto',
            border: isEditorial ? '1px solid var(--e-rule-thin, rgba(15,35,34,0.10))' : '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
            backgroundColor: isEditorial ? 'rgba(250,247,242,0.85)' : 'color-mix(in srgb, var(--color-bg) 85%, transparent)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: isEditorial ? 'none' : '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '13px', color: 'color-mix(in srgb, var(--color-text) 80%, transparent)', letterSpacing: '0.02em', fontWeight: 500 }}>
              Copyright © {new Date().getFullYear()} Single Core Labs. All rights reserved.
            </p>
            <a href="https://claude.com/programs/startups" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>  <span style={{
              fontSize: '10px',
              color: 'color-mix(in srgb, var(--color-text) 30%, transparent)',
              letterSpacing: '0.08em',
              fontWeight: 400,
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
              borderRadius: '100px',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Claude for Startups
            </span></a>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px' }}>
            {[
              { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy', prominent: true },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  fontSize: '11px',
                  color: 'color-mix(in srgb, var(--color-text) 40%, transparent)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                onMouseLeave={(e) => e.target.style.color = 'color-mix(in srgb, var(--color-text) 40%, transparent)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
