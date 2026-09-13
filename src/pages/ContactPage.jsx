import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const BENEFITS = [
  'Custom AI systems engineered around your data, infrastructure, and compliance requirements.',
  'From agentic workflows to air-gapped deployments — built for production, not demos.',
  'Embedded experts who work alongside your team from day one through go-live.',
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="page-dark">
      <SEO
        title="Get a Demo | Single Core Labs"
        description="Book a personalised demo and see how Single Core Labs can build, deploy, and operate bespoke AI systems for your enterprise."
        keywords="enterprise AI demo, AI systems engineering contact, sovereign AI infrastructure"
      />
      <Navbar />

      <main id="main-content" style={{ minHeight: '100vh' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
          className="contact-grid"
        >
          {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
          <div style={{
            background: 'var(--color-bg-elevated)',
            padding: 'clamp(100px, 14vh, 160px) clamp(32px, 6vw, 88px) clamp(60px, 8vh, 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-eyebrow"
                style={{ marginBottom: '28px' }}
              >
                Book a Consultation
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text)',
                  maxWidth: '480px',
                  marginBottom: '20px',
                }}
              >
                AI that works the way
                <br />your business does
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-body"
                style={{ maxWidth: '400px', marginBottom: '40px' }}
              >
                Tell us about your project. We'll put together a focused plan — no
                generic pitches, no wasted time.
              </motion.p>

              {/* Numbered benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}
              >
                {BENEFITS.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      letterSpacing: '0.06em',
                      flexShrink: 0,
                      paddingTop: '2px',
                      minWidth: '18px',
                    }}>
                      [{i + 1}]
                    </span>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: 'var(--color-text-muted)',
                    }}>
                      {b}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
{/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
          <div style={{
            background: 'var(--color-bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(80px, 12vh, 120px) clamp(24px, 4vw, 64px)',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="card card--rounded card--pad"
              style={{
                width: '100%',
                maxWidth: '480px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
                marginBottom: '28px',
              }}>
                Get in touch
              </h2>

              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                marginBottom: '28px',
              }}>
                Send us an email and we'll get back to you within one business day.
                Prefer LinkedIn? Connect with us there.
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '14px',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  border: 'none',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Email {CONTACT_EMAIL}
                <ArrowRight size={15} />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  marginTop: '16px',
                  padding: '14px',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  border: '1px solid var(--color-border-strong)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Connect on LinkedIn
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}