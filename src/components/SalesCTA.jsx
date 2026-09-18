import { useEffect, useRef, useState } from 'react'

const SALES_COPY =
  "Tell us about your project and requirements — we'll help you find the right plan and pricing for your needs."

const INTERESTS = [
  'AI Infrastructure & Deployment',
  'Data Pipelines, Annotation & Curation',
  'Custom LLMs and Fine-Tuning',
  'Enterprise AI Agents & Platform',
  'Model Testing & Evaluation',
  'Healthcare Intelligence Solutions',
  'Public Sector: Defense, Government & Non-Profits',
  'Other',
]

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Singapore',
  'United Arab Emirates',
  'Japan',
  'Brazil',
  'Other',
]

const REFERRALS = ['Google Search', 'LinkedIn', 'X (Twitter)', 'Referral', 'Blog / Content', 'Event / Conference', 'Other']

const ERROR_BORDER = '#F87171'
const IDLE_BORDER = 'rgba(255,255,255,0.14)'

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  fontSize: '14px',
  fontFamily: 'var(--font-sans)',
  color: '#FAFAFA',
  background: '#131313',
  border: `1px solid ${IDLE_BORDER}`,
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  colorScheme: 'dark',
}

const errorText = {
  margin: '4px 0 0',
  fontSize: '12px',
  color: '#F87171',
}

const initial = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  country: '',
  interests: [],
  referral: '',
}

export default function SalesCTA() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Pause background smooth-scroll while the modal owns the wheel
    window.__lenis?.stop()
    // Move focus into the dialog for keyboard / screen-reader users
    closeBtnRef.current?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.__lenis?.start()
    }
  }, [open ])

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const toggleInterest = (item) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item) ? f.interests.filter((i) => i !== item) : [...f.interests, item],
    }))
    setErrors((e) => ({ ...e, interests: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Please complete this required field.'
    if (!form.lastName.trim()) e.lastName = 'Please complete this required field.'
    if (!form.company.trim()) e.company = 'Please complete this required field.'
    if (!form.jobTitle.trim()) e.jobTitle = 'Please complete this required field.'
    if (!form.email.trim()) e.email = 'Please complete this required field.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid work email.'
    if (!form.country) e.country = 'Please complete this required field.'
    if (!form.referral) e.referral = 'Please complete this required field.'
    if (form.interests.length === 0) e.interests = 'Select at least one option.'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    const subject = encodeURIComponent(`Sales inquiry — ${form.company} (${form.firstName} ${form.lastName})`)
    const body = encodeURIComponent(
      [`Name: ${form.firstName} ${form.lastName}`, `Company: ${form.company}`, `Title: ${form.jobTitle}`, `Email: ${form.email}`, `Country: ${form.country}`, `Interests: ${form.interests.join(', ')}`, `Heard via: ${form.referral}`].join('\n'),
    )
    window.location.href = `mailto:contact@singlecorelabs.in?subject=${subject}&body=${body}`
    setSent(true)
  }

  const close = () => {
    setOpen(false)
    window.setTimeout(() => {
      setSent(false)
      setForm(initial)
      setErrors({})
    }, 300)
  }

  return (
    <>
      <button
        type="button"
        className="scl-rise scl-rise-1"
        onClick={() => setOpen(true)}
        style={{
          marginTop: '28px',
          padding: '13px 32px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.01em',
          fontFamily: 'var(--font-sans)',
          color: '#FAFAFA',
          background: 'transparent',
          border: '1px solid rgba(250,250,250,0.35)',
          borderRadius: '999px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'border-color 0.25s, background 0.25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(250,250,250,0.7)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(250,250,250,0.35)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        Talk to our sales team
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Talk to our sales team"
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="scl-sales-modal scl-modal-pop"
            data-lenis-prevent
            style={{
              width: '100%',
              maxWidth: '1020px',
              maxHeight: '92dvh',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '360px 1fr',
              background: '#0B0B0B',
              borderRadius: '18px',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'var(--font-sans)',
              color: '#FAFAFA',
            }}
          >
            {/* Left — brand panel, site theme */}
            <div
              className="scl-sales-aside"
              style={{
                position: 'relative',
                minHeight: '100%',
                color: '#FAFAFA',
                background:
                  'linear-gradient(180deg, rgba(6,6,6,0.30) 0%, rgba(6,6,6,0.80) 68%, rgba(6,6,6,0.94) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80) center/cover no-repeat, #060606',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '14px',
              }}
            >
              <div style={{ marginBottom: 'auto' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: 'rgba(250,250,250,0.75)',
                    border: '1px solid rgba(250,250,250,0.28)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  Enterprise Sales
                </span>
              </div>
              <div aria-hidden="true" style={{ width: '48px', height: '2px', background: '#FF5A00' }} />
              <h2 style={{ margin: 0, fontSize: '30px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Let&apos;s build
                <br />
                together.
              </h2>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.65, color: 'rgba(250,250,250,0.72)' }}>{SALES_COPY}</p>
            </div>

            {/* Right — form in site dark theme */}
            <div className="scl-sales-formwrap" style={{ overflowY: 'auto', padding: 'clamp(24px, 3.5vw, 40px)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2.6vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#FAFAFA' }}>
                    Talk to our sales team
                  </h3>
                  <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: 1.6, color: 'rgba(250,250,250,0.6)' }}>
                    Join leading enterprises partnering with Single Core Labs. Book a 1:1 intro call with us to get
                    started.
                  </p>
                </div>
                <button
                  type="button"
                  ref={closeBtnRef}
                  onClick={close}
                  aria-label="Close"
                  style={{
                    flexShrink: 0,
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#FAFAFA',
                    fontSize: '18px',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {sent ? (
                <div style={{ marginTop: '24px', border: '1px solid rgba(52,211,153,0.35)', background: 'rgba(52,211,153,0.08)', borderRadius: '12px', padding: '24px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '17px', color: '#FAFAFA' }}>Thanks {form.firstName || 'there'} — we&apos;ll be in touch.</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(250,250,250,0.7)', lineHeight: 1.6 }}>
                    Your email client should have opened with your inquiry addressed to contact@singlecorelabs.in. We
                    typically reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    style={{ marginTop: '16px', padding: '11px 28px', borderRadius: '999px', border: '1px solid #FAFAFA', background: '#FAFAFA', color: '#060606', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="scl-sales-form" style={{ marginTop: '22px' }}>
                  <div className="scl-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <input placeholder="First name*" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} style={{ ...inputStyle, borderColor: errors.firstName ? ERROR_BORDER : IDLE_BORDER }} />
                      {errors.firstName && <p style={errorText}>{errors.firstName}</p>}
                    </div>
                    <div>
                      <input placeholder="Last name*" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} style={{ ...inputStyle, borderColor: errors.lastName ? ERROR_BORDER : IDLE_BORDER }} />
                      {errors.lastName && <p style={errorText}>{errors.lastName}</p>}
                    </div>
                    <div>
                      <input placeholder="Company name*" value={form.company} onChange={(e) => set('company', e.target.value)} style={{ ...inputStyle, borderColor: errors.company ? ERROR_BORDER : IDLE_BORDER }} />
                      {errors.company && <p style={errorText}>{errors.company}</p>}
                    </div>
                    <div>
                      <input placeholder="Job title*" value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} style={{ ...inputStyle, borderColor: errors.jobTitle ? ERROR_BORDER : IDLE_BORDER }} />
                      {errors.jobTitle && <p style={errorText}>{errors.jobTitle}</p>}
                    </div>
                    <div>
                      <input placeholder="Work email*" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} style={{ ...inputStyle, borderColor: errors.email ? ERROR_BORDER : IDLE_BORDER }} />
                      {errors.email && <p style={errorText}>{errors.email}</p>}
                    </div>
                    <div>
                      <select value={form.country} onChange={(e) => set('country', e.target.value)} style={{ ...inputStyle, borderColor: errors.country ? ERROR_BORDER : IDLE_BORDER, color: form.country ? '#FAFAFA' : 'rgba(250,250,250,0.45)' }}>
                        <option value="">Country*</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.country && <p style={errorText}>{errors.country}</p>}
                    </div>
                  </div>

                  <p style={{ margin: '20px 0 10px', fontSize: '14px', fontWeight: 500, color: '#FAFAFA' }}>
                    What can we help with? Select all that apply:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                    {INTERESTS.map((item) => (
                      <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(250,250,250,0.82)', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={form.interests.includes(item)}
                          onChange={() => toggleInterest(item)}
                          style={{ width: '17px', height: '17px', accentColor: '#FF5A00', cursor: 'pointer' }}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                  {errors.interests && <p style={errorText}>{errors.interests}</p>}

                  <div style={{ marginTop: '18px' }}>
                    <select value={form.referral} onChange={(e) => set('referral', e.target.value)} style={{ ...inputStyle, borderColor: errors.referral ? ERROR_BORDER : IDLE_BORDER }}>
                      <option value="">How did you hear about us?*</option>
                      {REFERRALS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.referral && <p style={errorText}>{errors.referral}</p>}
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '22px',
                      width: '100%',
                      padding: '14px 24px',
                      borderRadius: '999px',
                      border: '1px solid #FAFAFA',
                      background: '#FAFAFA',
                      color: '#060606',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scl-sales-form input::placeholder { color: rgba(250,250,250,0.40); }
        .scl-sales-form input:focus, .scl-sales-form select:focus { border-color: rgba(250,250,250,0.55) !important; background: #1B1B1B !important; }
        .scl-sales-form select option { background: #131313; color: #FAFAFA; }
        @media (max-width: 820px) {
          .scl-sales-modal { grid-template-columns: 1fr !important; max-height: 92dvh !important; overflow-y: auto !important; }
          .scl-sales-aside { min-height: 280px !important; }
          .scl-sales-formwrap { overflow: visible !important; }
          .scl-grid2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
