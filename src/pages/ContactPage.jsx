import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HorizontalRule } from '@/components/HorizontalRule'
import { RevealText } from '@/components/RevealText'
import { ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import SEO from '@/components/SEO'

const BUDGET_OPTIONS = [
  { value: 'under-50k',   label: 'Under ₹50L' },
  { value: '50k-200k',    label: '₹50L – ₹2Cr' },
  { value: '200k-500k',   label: '₹2Cr – ₹5Cr' },
  { value: '500k-plus',   label: '₹5Cr+' },
]
// ... rest of constants ...
const HELP_OPTIONS = [
  { value: 'agentic-ai',        label: 'Agentic AI & Autonomous Workflows' },
  { value: 'medical-imaging',   label: 'Medical Imaging & Clinical Diagnostics' },
  { value: 'data-pipelines',    label: 'AI-Ready Data Pipelines & ETL' },
  { value: 'llm-finetuning',    label: 'LLM Fine-Tuning & Domain Adaptation' },
  { value: 'air-gapped',        label: 'Air-Gapped & Offline Deployment' },
  { value: 'system-integration',label: 'EMR, CRM & Core System Integration' },
  { value: 'other',             label: 'Something else entirely' },
]

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Other',
]
// ... styles ...
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  color: 'var(--color-text)',
  background: 'transparent',
  border: '1px solid var(--color-border-strong)',
  outline: 'none',
  transition: 'border-color 0.2s',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
}

function InputField({ label, id, type = 'text', required, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        {label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--color-accent)' : 'rgba(0,0,0,0.15)',
        }}
      />
    </div>
  )
}

function SelectField({ label, id, required, value, onChange, children }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}
      >
        {label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            borderColor: focused ? 'var(--color-accent)' : 'rgba(0,0,0,0.15)',
            paddingRight: '40px',
            cursor: 'pointer',
          }}
        >
          {children}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--color-text-muted)',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    country: '',
    budget: '',
    helpWith: [],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messageFocused, setMessageFocused] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggleHelp = (val) => {
    setForm((f) => ({
      ...f,
      helpWith: f.helpWith.includes(val)
        ? f.helpWith.filter((v) => v !== val)
        : [...f.helpWith, val],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: form.firstName,
            last_name: form.lastName,
            company: form.company,
            role: form.role,
            email: form.email,
            country: form.country,
            budget: form.budget,
            help_with: form.helpWith,
            message: form.message,
          },
        ])

      if (submitError) throw submitError

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SEO title="Message Sent | Single Core Labs" description="Thank you for reaching out to Single Core Labs." />
        <Navbar />
        <main id="main-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container-editorial" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Message sent</p>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '20px',
                }}
              >
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

  return (
    <>
      <SEO 
        title="Contact Us | Single Core Labs"
        description="Tell us about your project and we'll put together a tailored plan. Contact Single Core Labs for enterprise AI solutions."
      />
      <Navbar />
      <main id="main-content">
        <section
          style={{
            paddingTop: 'clamp(100px, 14vh, 140px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)',
          }}
        >
          <div className="container-editorial">
            <HorizontalRule style={{ marginBottom: 'clamp(32px, 4vh, 48px)' }} />

            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 64px)',
                marginBottom: 'clamp(48px, 6vh, 72px)',
                alignItems: 'end',
              }}
            >
              <RevealText>
                <div>
                  <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Get in touch</p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                    }}
                  >
                    Build something{' '}
                    <span className="text-italic-serif">real.</span>
                  </h1>
                </div>
              </RevealText>
              <RevealText delay={2}>
                <p className="text-body" style={{ maxWidth: '420px' }}>
                  Tell us about your project and we'll put together a tailored plan.
                  No generic pitches — just a focused conversation about what you
                  actually need.
                </p>
              </RevealText>
            </div>

            {/* Form */}
            <RevealText delay={1}>
              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: 'grid',
                    gap: 'clamp(20px, 2.5vh, 28px)',
                  }}
                >
                  {/* Row 1 — Name */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'clamp(16px, 2vw, 24px)',
                    }}
                  >
                    <InputField
                      label="First name" id="firstName" required
                      placeholder="Arjun"
                      value={form.firstName} onChange={set('firstName')}
                    />
                    <InputField
                      label="Last name" id="lastName" required
                      placeholder="Sharma"
                      value={form.lastName} onChange={set('lastName')}
                    />
                  </div>

                  {/* Row 2 — Company / Role */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'clamp(16px, 2vw, 24px)',
                    }}
                  >
                    <InputField
                      label="Company" id="company" required
                      placeholder="Acme Corp"
                      value={form.company} onChange={set('company')}
                    />
                    <InputField
                      label="Your role" id="role" required
                      placeholder="CTO"
                      value={form.role} onChange={set('role')}
                    />
                  </div>

                  {/* Row 3 — Email / Country */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'clamp(16px, 2vw, 24px)',
                    }}
                  >
                    <InputField
                      label="Work email" id="email" type="email" required
                      placeholder="arjun@acme.com"
                      value={form.email} onChange={set('email')}
                    />
                    <SelectField
                      label="Country" id="country" required
                      value={form.country} onChange={set('country')}
                    >
                      <option value="" disabled>Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </SelectField>
                  </div>

                  {/* Budget */}
                  <fieldset style={{ border: 'none', padding: 0 }}>
                    <legend
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        marginBottom: '14px',
                        display: 'block',
                      }}
                    >
                      Approximate budget
                    </legend>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {BUDGET_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '10px 18px',
                            border: `1px solid ${form.budget === opt.value ? 'var(--color-accent)' : 'rgba(0,0,0,0.15)'}`,
                            background: form.budget === opt.value ? 'var(--color-accent-dim)' : 'transparent',
                            transition: 'all 0.2s',
                            userSelect: 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={opt.value}
                            checked={form.budget === opt.value}
                            onChange={set('budget')}
                            style={{ display: 'none' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '13px',
                              fontWeight: form.budget === opt.value ? 500 : 400,
                              color: form.budget === opt.value ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            }}
                          >
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Help with */}
                  <fieldset style={{ border: 'none', padding: 0 }}>
                    <legend
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        marginBottom: '14px',
                        display: 'block',
                      }}
                    >
                      What are you looking to solve? <span style={{ color: 'var(--color-text-dim)', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>(select all that apply)</span>
                    </legend>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {HELP_OPTIONS.map((opt) => {
                        const checked = form.helpWith.includes(opt.value)
                        return (
                          <label
                            key={opt.value}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '14px',
                              padding: '13px 0',
                              borderBottom: '1px solid var(--color-border)',
                              cursor: 'pointer',
                              userSelect: 'none',
                            }}
                          >
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={checked}
                              onChange={() => toggleHelp(opt.value)}
                              style={{ display: 'none' }}
                            />
                            {/* Custom checkbox */}
                            <span
                              style={{
                                width: '16px',
                                height: '16px',
                                border: `1px solid ${checked ? 'var(--color-accent)' : 'rgba(0,0,0,0.2)'}`,
                                background: checked ? 'var(--color-accent)' : 'transparent',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s',
                              }}
                            >
                              {checked && (
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '14px',
                                fontWeight: checked ? 500 : 400,
                                color: checked ? 'var(--color-text)' : 'var(--color-text-muted)',
                                transition: 'color 0.15s',
                              }}
                            >
                              {opt.label}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label
                      htmlFor="message"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      Tell us more <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Describe your project — what you're building, the data involved, your timeline, and any constraints we should know about."
                      value={form.message}
                      onChange={set('message')}
                      onFocus={() => setMessageFocused(true)}
                      onBlur={() => setMessageFocused(false)}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '140px',
                        borderColor: messageFocused ? 'var(--color-accent)' : 'rgba(0,0,0,0.15)',
                      }}
                    />
                  </div>

                  {/* Footer row */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      paddingTop: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '12px',
                          color: 'var(--color-text-dim)',
                          maxWidth: '420px',
                          lineHeight: 1.6,
                        }}
                      >
                        By submitting this form you agree to us contacting you about your enquiry.
                        We don't share your data with third parties.
                      </p>
                      {error && (
                        <p style={{ color: 'var(--color-accent)', fontSize: '12px', fontWeight: 500 }}>
                          {error}
                        </p>
                      )}
                    </div>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={loading}
                      style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                      {loading ? (
                        <>
                          Sending...
                          <Loader2 size={15} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send enquiry
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </RevealText>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
