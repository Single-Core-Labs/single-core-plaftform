import { useState } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ParallaxLayer, ScrollFade3D, Card3D, SectionDepth } from '@/components/ScrollScene'
import { ArrowRight, Eye, ShieldAlert, Cpu, Check, Loader2 } from 'lucide-react'
import { supabase } /* cspell:ignore supabase */ from '@/lib/supabase'

export default function AboutPage() {

  // Form State
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    designation: '',
    message: '',
  })
  const [prefix, setPrefix] = useState('+1')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  // Focused state for inputs to apply glowing accent border
  const [focusedField, setFocusedField] = useState(null)

  const handleFocus = (field) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const handleChange = (field) => (e) => {
    if (field === 'message' && e.target.value.length > 1000) return
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Split full name safely for database mapping if required
      const nameParts = form.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Save submission in Supabase
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            company: form.company,
            role: form.designation || 'Visitor',
            email: form.email,
            country: prefix === '+91' ? 'India' : prefix === '+1' ? 'United States' : 'Other',
            budget: 'under-50k',
            help_with: ['about-page-form'],
            message: `[Phone: ${prefix} ${form.phone}] ${form.message}`,
          },
        ])

      if (submitError) throw submitError

      setSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 16px',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text)',
    background: '#FFFFFF',
    border: `1px solid ${focusedField === fieldName ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
    borderRadius: '8px',
    outline: 'none',
    boxShadow: focusedField === fieldName ? '0 0 0 3px var(--color-accent-dim)' : 'none',
    transition: 'all 0.25s ease',
  })

  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <div className="page-consulting">
      <SEO 
        title="About Us | Single Core Labs"
        description="Single Core Labs is an elite applied AI research lab and systems engineering firm. We design, deploy, and operate custom agentic architectures."
        keywords="applied AI research, AI systems engineering firm, custom agentic architectures"
      />
      <Navbar />

      <main style={{ minHeight: '100vh', paddingTop: '120px' }}>
        <div className="consulting-block">
          <div style={{ maxWidth: '800px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Who We Are</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Applied AI research,
                <br />
                translated into <span className="text-italic-serif">enterprise outcomes.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <div className="text-body" style={{ maxWidth: '600px' }}>
                Single Core Labs is an elite applied AI research lab and AI systems engineering firm. We provide:
                <ul style={{ paddingLeft: '20px', marginTop: '12px', marginBottom: '12px', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Custom AI Systems Engineering:</strong> Designing and deploying bespoke agentic architectures.</li>
                  <li style={{ marginBottom: '8px' }}><strong>Sovereign AI Infrastructure:</strong> Implementing air-gapped and on-premise models for strict privacy.</li>
                  <li><strong>Applied AI Research:</strong> Fine-tuning open-source frontier models for enterprise outcomes.</li>
                </ul>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Core Pillars (Who We Are, Mission, Vision) */}
        <section
          className="container-editorial"
          style={{
            position: 'relative',
            zIndex: 1,
            paddingBottom: 'clamp(48px, 6vh, 80px)',
          }}
        >
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'clamp(32px, 4vh, 48px)' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(24px, 3vw, 40px)',
            }}
          >
            {/* Pillar 1: Who We Are */}
            <ScrollFade3D>
              <Card3D intensity={5}>
                <div
                  className="glass-card"
                  style={{
                    padding: 'clamp(24px, 3vh, 36px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Cpu size={24} style={{ color: 'var(--color-accent)', marginBottom: '24px' }} />
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        marginBottom: '16px',
                        color: 'var(--color-text)',
                      }}
                    >
                      Our Team
                    </h2>
                    <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                      We are a collective of ML practitioners, systems architects, and research engineers from
                      frontier environments. We avoid slide decks and hand-offs, choosing to embed directly with
                      teams to build dependable, production-grade AI pipelines.
                    </p>
                  </div>
                </div>
              </Card3D>
            </ScrollFade3D>

            {/* Pillar 2: Our Mission */}
            <ScrollFade3D>
              <Card3D intensity={5}>
                <div
                  className="glass-card"
                  style={{
                    padding: 'clamp(24px, 3vh, 36px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <ShieldAlert size={24} style={{ color: 'var(--color-accent)', marginBottom: '24px' }} />
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        marginBottom: '16px',
                        color: 'var(--color-text)',
                      }}
                    >
                      Our Mission
                    </h2>
                    <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                      To build and deploy private, zero-hallucination agentic models engineered specifically to work
                      under high-stakes corporate constraints. We aim to strip away the fragility of basic wrappers,
                      substituting it with production-grade engineering precision.
                    </p>
                  </div>
                </div>
              </Card3D>
            </ScrollFade3D>

            {/* Pillar 3: Our Vision */}
            <ScrollFade3D>
              <Card3D intensity={5}>
                <div
                  className="glass-card"
                  style={{
                    padding: 'clamp(24px, 3vh, 36px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Eye size={24} style={{ color: 'var(--color-accent)', marginBottom: '24px' }} />
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        marginBottom: '16px',
                        color: 'var(--color-text)',
                      }}
                    >
                      Our Vision
                    </h2>
                    <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                      To pioneer safe, sovereign autonomous operation pipelines that allow modern enterprises to unlock
                      the complete potential of their private datasets. We see a future where company intelligence acts
                      autonomously, securely, and seamlessly at scale.
                    </p>
                  </div>
                </div>
              </Card3D>
            </ScrollFade3D>
          </div>
        </section>

        {/* Core Startup Values (Interactive Depth Section) */}
        <SectionDepth>
          <section
            style={{
              padding: 'var(--spacing-section-lg) 0',
              background: '#F5F5F7',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div className="container-editorial">
              <div style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Core Beliefs</p>
                </RevealText>
                <RevealText delay={1}>
                  <h2 className="text-display" style={{ maxWidth: '700px' }}>
                    Sovereign engineering
                    <br />
                    <span className="text-italic-serif">built on core principles.</span>
                  </h2>
                </RevealText>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Value 1 */}
                <ScrollFade3D>
                  <article
                    className="glass-card"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.2fr',
                      gap: 'clamp(20px, 4vw, 64px)',
                      padding: 'clamp(28px, 4vh, 48px)',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(18px, 2.2vw, 28px)',
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          color: 'var(--color-text)',
                        }}
                      >
                        01 / Precision Over Placeholders
                      </h3>
                    </div>
                    <div>
                      <p className="text-body" style={{ maxWidth: '500px', fontSize: '14px', lineHeight: 1.7 }}>
                        We believe that enterprise AI must be rigorous. We do not write simple API wrappers or leave
                        broken edge cases. Every dataset pipeline, every model configuration, and every custom interface
                        is heavily stress-tested and built for production reliability.
                      </p>
                    </div>
                  </article>
                </ScrollFade3D>

                {/* Value 2 */}
                <ScrollFade3D>
                  <article
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.2fr',
                      gap: 'clamp(20px, 4vw, 64px)',
                      paddingBlock: 'clamp(28px, 4vh, 48px)',
                      borderTop: '1px solid var(--color-border)',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(18px, 2.2vw, 28px)',
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          color: 'var(--color-text)',
                        }}
                      >
                        02 / Complete Sovereign Sovereignty
                      </h3>
                    </div>
                    <div>
                      <p className="text-body" style={{ maxWidth: '500px', fontSize: '14px', lineHeight: 1.7 }}>
                        Your proprietary intelligence should belong solely to you. We architect fully private, HIPAA and SOC-2
                        aligned MLOps setups, with optional offline, air-gapped configuration so your models remain under your
                        absolute control without leaks.
                      </p>
                    </div>
                  </article>
                </ScrollFade3D>

                {/* Value 3 */}
                <ScrollFade3D>
                  <article
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.2fr',
                      gap: 'clamp(20px, 4vw, 64px)',
                      paddingBlock: 'clamp(28px, 4vh, 48px)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(18px, 2.2vw, 28px)',
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          color: 'var(--color-text)',
                        }}
                      >
                        03 / Actual Agentic Orchestration
                      </h3>
                    </div>
                    <div>
                      <p className="text-body" style={{ maxWidth: '500px', fontSize: '14px', lineHeight: 1.7 }}>
                        We build AI systems that go beyond chat boxes. SCL specialized agents are engineered to plan, reflect,
                        safely run custom code, call specific enterprise APIs, and handle complete operational workloads
                        autonomously and correctly.
                      </p>
                    </div>
                  </article>
                </ScrollFade3D>
              </div>
            </div>
          </section>
        </SectionDepth>

        {/* Contact Form Section */}
        <section
          className="container-editorial"
          style={{
            paddingTop: 'var(--spacing-section-lg)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <HorizontalRule style={{ marginBottom: 'clamp(32px, 5vh, 60px)' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gridAutoRows: '1fr',
              gap: '0',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--color-border-strong)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Left Side: Brand Panel */}
            <div
              style={{
                position: 'relative',
                background: '#1A1A1A',
                backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(32px, 5vw, 64px)',
                color: '#FFFFFF',
              }}
            >
              {/* Dark  Backdrop overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0, 137, 123, 0.92) 0%, rgba(26, 26, 26, 0.94) 100%)',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    marginBottom: '16px',
                  }}
                >
                  Need help with
                  <br />
                  your <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Business?</span>
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 400,
                    opacity: 0.9,
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  Don't worry, we've got your back.
                </p>
              </div>
            </div>

            {/* Right Side: Form Panel */}
            <div
              style={{
                background: '#FAFAFA',
                padding: 'clamp(32px, 5vw, 64px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center', padding: '24px 0' }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--color-accent-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                      }}
                    >
                      <Check size={24} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '24px',
                        fontWeight: 400,
                        marginBottom: '10px',
                        color: 'var(--color-text)',
                      }}
                    >
                      Enquiry received.
                    </h3>
                    <p className="text-body" style={{ fontSize: '14px', maxWidth: '320px', margin: '0 auto' }}>
                      Thank you for reaching out. We will get back to you within one business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {/* Row 1: Full name & Mobile number */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      <div>
                        <label htmlFor="fullName" style={labelStyle}>
                          Full name <span style={{ color: 'var(--color-accent)' }}>*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={form.fullName}
                          onChange={handleChange('fullName')}
                          onFocus={() => handleFocus('fullName')}
                          onBlur={handleBlur}
                          style={formInputStyle('fullName')}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" style={labelStyle}>
                          Mobile number <span style={{ color: 'var(--color-accent)' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <select
                              value={prefix}
                              onChange={(e) => setPrefix(e.target.value)}
                              style={{
                                padding: '12px 28px 12px 12px',
                                border: '1px solid var(--color-border-strong)',
                                background: '#FFFFFF',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '14px',
                                color: 'var(--color-text)',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+44">🇬🇧 +44</option>
                            </select>
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              style={{
                                position: 'absolute',
                                right: '10px',
                                pointerEvents: 'none',
                                color: 'var(--color-text-dim)',
                              }}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            required
                            placeholder="Enter your phone"
                            value={form.phone}
                            onChange={handleChange('phone')}
                            onFocus={() => handleFocus('phone')}
                            onBlur={handleBlur}
                            style={formInputStyle('phone')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email address & Company name */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      <div>
                        <label htmlFor="email" style={labelStyle}>
                          Email address <span style={{ color: 'var(--color-accent)' }}>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={handleChange('email')}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          style={formInputStyle('email')}
                        />
                      </div>

                      <div>
                        <label htmlFor="company" style={labelStyle}>
                          Company name
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Enter your company name"
                          value={form.company}
                          onChange={handleChange('company')}
                          onFocus={() => handleFocus('company')}
                          onBlur={handleBlur}
                          style={formInputStyle('company')}
                        />
                      </div>
                    </div>

                    {/* Row 3: Designation */}
                    <div>
                      <label htmlFor="designation" style={labelStyle}>
                        Designation
                      </label>
                      <input
                        id="designation"
                        type="text"
                        placeholder="Enter your designation"
                        value={form.designation}
                        onChange={handleChange('designation')}
                        onFocus={() => handleFocus('designation')}
                        onBlur={handleBlur}
                        style={formInputStyle('designation')}
                      />
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                        <label htmlFor="message" style={{ ...labelStyle, marginBottom: 0 }}>
                          Message <span style={{ color: 'var(--color-accent)' }}>*</span>
                        </label>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {form.message.length}/1000
                        </span>
                      </div>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Enter your message..."
                        value={form.message}
                        onChange={handleChange('message')}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        style={{
                          ...formInputStyle('message'),
                          resize: 'none',
                          minHeight: '100px',
                        }}
                      />
                    </div>

                    {/* Submit Row */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                      {error && (
                        <p style={{ color: 'var(--color-accent)', fontSize: '12px', fontWeight: 500 }}>
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.8 : 1,
                        }}
                      >
                        {loading ? (
                          <>
                            Sending...
                            <Loader2 size={16} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
      </main>

      <Footer />
    </div>
  )
}
