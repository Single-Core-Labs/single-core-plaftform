import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import SEO from '@/components/SEO'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Other',
]

const BENEFITS = [
  'Custom AI systems engineered around your data, infrastructure, and compliance requirements.',
  'From agentic workflows to air-gapped deployments — built for production, not demos.',
  'Embedded experts who work alongside your team from day one through go-live.',
]

// ─── FIELD ATOMS ─────────────────────────────────────────────────────────────
const baseInput = {
  width: '100%',
  padding: '10px 0',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  color: 'var(--color-text)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.18)',
  outline: 'none',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
  transition: 'border-color 0.2s',
}

function Field({ label, id, type = 'text', required, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
        color: 'rgba(0,0,0,0.55)', letterSpacing: '0.01em',
      }}>
        {label}{required && <span style={{ color: '#c0392b' }}> *</span>}
      </label>
      <input
        id={id} type={type} required={required}
        placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...baseInput, borderBottomColor: focused ? 'var(--color-accent)' : 'rgba(0,0,0,0.18)' }}
      />
    </div>
  )
}

function SelectField({ label, id, required, value, onChange, children }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
        color: 'rgba(0,0,0,0.55)', letterSpacing: '0.01em',
      }}>
        {label}{required && <span style={{ color: '#c0392b' }}> *</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          id={id} required={required} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...baseInput,
            borderBottomColor: focused ? 'var(--color-accent)' : 'rgba(0,0,0,0.18)',
            paddingRight: '24px', cursor: 'pointer',
          }}
        >
          {children}
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(0,0,0,0.4)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', jobTitle: '', country: '', message: '', consent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [msgFocused, setMsgFocused] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error: err } = await supabase.from('contact_submissions').insert([{
        first_name: form.firstName,
        last_name:  form.lastName,
        email:      form.email,
        phone:      form.phone,
        company:    form.company,
        role:       form.jobTitle,
        country:    form.country,
        message:    form.message,
      }])
      if (err) throw err
      setSubmitted(true)
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <SEO title="Message Sent | Single Core Labs" description="Thank you for reaching out." />
        <Navbar />
        <main id="main-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container-editorial" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Message sent</p>
              <h1 style={{
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px',
              }}>
                We'll be in touch{' '}
                <span className="text-italic-serif">shortly.</span>
              </h1>
              <p className="text-body" style={{ maxWidth: '440px' }}>
                Thanks for reaching out. Someone from our team will review your enquiry
                and get back to you within one business day.
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── Main layout ────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title="Get a Demo | Single Core Labs"
        description="Book a personalised demo and see how Single Core Labs can build, deploy, and operate bespoke AI systems for your enterprise."
        keywords="enterprise AI demo, AI systems engineering contact, sovereign AI infrastructure"
      />
      <Navbar />

      <main id="main-content" style={{ minHeight: '100vh' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
          className="contact-grid"
        >
          {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
          <div style={{
            background: 'rgba(250, 250, 250, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.05)',
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
            background: 'rgba(250, 250, 250, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(80px, 12vh, 120px) clamp(24px, 4vw, 64px)',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '480px',
                padding: 'clamp(28px, 4vh, 44px) clamp(24px, 3.5vw, 40px)',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#1a1a1a',
                letterSpacing: '-0.01em',
                marginBottom: '28px',
              }}>
                Start the conversation
              </h2>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Row: First / Last name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <Field label="First name" id="firstName" required
                      value={form.firstName} onChange={set('firstName')} />
                    <Field label="Last name" id="lastName" required
                      value={form.lastName} onChange={set('lastName')} />
                  </div>

                  {/* Work email */}
                  <Field label="Work email" id="email" type="email" required
                    value={form.email} onChange={set('email')} />

                  {/* Row: Phone / Company */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <Field label="Phone number (optional)" id="phone"
                      value={form.phone} onChange={set('phone')} />
                    <Field label="Company name" id="company" required
                      value={form.company} onChange={set('company')} />
                  </div>

                  {/* Row: Job title / Country */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <Field label="Job title" id="jobTitle" required
                      value={form.jobTitle} onChange={set('jobTitle')} />
                    <SelectField label="Country" id="country" required
                      value={form.country} onChange={set('country')}
                    >
                      <option value="" disabled>Country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </SelectField>
                  </div>

                  {/* How can we help */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <label htmlFor="message" style={{
                      fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
                      color: 'rgba(0,0,0,0.55)', letterSpacing: '0.01em',
                    }}>
                      How can our team help you?
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={set('message')}
                      onFocus={() => setMsgFocused(true)}
                      onBlur={() => setMsgFocused(false)}
                      style={{
                        width: '100%',
                        padding: '8px 0',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${msgFocused ? 'var(--color-accent)' : 'rgba(0,0,0,0.18)'}`,
                        outline: 'none',
                        resize: 'none',
                        transition: 'border-color 0.2s',
                        lineHeight: 1.6,
                      }}
                    />
                  </div>

                  {/* Consent checkbox */}
                  <label style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer',
                  }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                      required
                      style={{ marginTop: '3px', accentColor: 'var(--color-accent)', flexShrink: 0 }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: 'rgba(0,0,0,0.6)',
                    }}>
                      I agree to receive communications from Single Core Labs about its products,
                      services, and events, and acknowledge that my information will be used in
                      accordance with the{' '}
                      <a href="/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
                        Privacy Policy
                      </a>.
                    </span>
                  </label>

                  {/* Error */}
                  {error && (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#c0392b', fontWeight: 500 }}>
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !form.consent}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: loading || !form.consent ? 'rgba(0,0,0,0.35)' : 'var(--color-text)',
                      color: '#fff',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: 'none',
                      cursor: loading || !form.consent ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    {loading ? (
                      <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            background-attachment: scroll !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
