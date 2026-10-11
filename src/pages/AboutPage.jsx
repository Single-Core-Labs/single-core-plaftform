import { useRef, useEffect, useState } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { SectionDepth } from '@/components/ScrollScene'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { supabase } /* cspell:ignore supabase */ from '@/lib/supabase'

export default function AboutPage() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Reduced motion: keep the lightweight poster, never load the video.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Small screens get the 480p file (~215KB), desktops the 720p (~573KB).
    const src = window.innerWidth <= 768 ? '/about-hero-480p.webm' : '/about-hero-720p.webm'
    const load = () => {
      if (v.dataset.loaded) return
      v.dataset.loaded = '1'
      v.src = src
      v.load()
      v.play().catch(() => {})
    }
    // Defer the download until the browser is idle so first paint isn't blocked.
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1200))
    const idleId = idle(load)
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  // Fixed JSX tag mismatches

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
    background: 'var(--color-bg-surface)',
    border: `1px solid ${focusedField === fieldName ? '#FFFFFF' : 'var(--color-border-strong)'}`,
    borderRadius: '8px',
    outline: 'none',
    boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(255,255,255,0.15)' : 'none',
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
    <div className="page-dark">
      <SEO 
        title="About SingleCore Labs — AI Research & Engineering"
        description="SingleCore Labs builds the infrastructure behind production AI: model inference and orchestration, post-training and evaluation, and Marshal — our engineering-focused coding agent."
        keywords="AI infrastructure, AI research, post-training, AI agents, inference, singlecore labs"
      />

      <main style={{ minHeight: '100vh' }}>
        {/* Hero: split title + intro over full-bleed image */}
        <section
          style={{
            position: 'relative',
            minHeight: '86vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: '140px',
            paddingBottom: 'clamp(120px, 16vh, 180px)',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster="/about-hero-poster.jpg"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.78) 100%)',
            }}
          />
          <div
            className="container-editorial"
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(24px, 4vw, 64px)',
              alignItems: 'end',
              width: '100%',
            }}
          >
            <RevealText>
              <h1 className="text-display" style={{ color: '#f2efe2' }}>
                About SingleCore Labs
              </h1>
            </RevealText>
            <RevealText delay={1}>
              <p className="text-body" style={{ color: 'rgba(242,239,226,0.85)', maxWidth: '480px' }}>
                <strong>Building the infrastructure behind production AI.</strong>
                <br />
                Artificial intelligence is moving beyond individual models toward systems that must
                be trained, evaluated, deployed, and continuously improved.
              </p>
            </RevealText>
          </div>
        </section>

        {/* Transition statement */}
        <div className="container-editorial" style={{ position: 'relative', zIndex: 2, paddingTop: 'clamp(48px, 7vh, 88px)' }}>
          <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Who we are</p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(22px, 3vw, 34px)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
              maxWidth: '640px',
              margin: 0,
            }}
          >
            SingleCore Labs builds the infrastructure and engineering systems that{' '}
            <span className="text-italic-serif">make this transition possible.</span>
          </p>
        </div>

        {/* What We Build */}
        <section
          className="container-editorial"
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: 'clamp(48px, 7vh, 96px)',
            paddingBottom: 'clamp(48px, 6vh, 80px)',
          }}
        >
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'clamp(32px, 4vh, 48px)' }} />

          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>What We Build</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px', maxWidth: '700px' }}>
              The next layer is <span className="text-italic-serif">infrastructure.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
              AI is moving beyond chat interfaces and individual models. At SingleCore Labs, we build across
              that layer — systems that can train, evaluate, optimize, deploy, and continuously improve AI.
            </p>
          </RevealText>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '680px' }}>
            <div style={{ padding: '28px 0', borderTop: '1px solid var(--color-border)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                  color: 'var(--color-text)',
                }}
              >
                AI Infrastructure
              </h3>
              <p className="text-body" style={{ fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                We engineer systems for model inference, routing, GPU orchestration, serverless
                inference, and cloud-native deployment. Our focus is on scalable, cost-efficient
                AI infrastructure across public cloud, private cloud, on-premises, and specialized
                computing environments.
              </p>
            </div>

            <div style={{ padding: '28px 0', borderTop: '1px solid var(--color-border)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                  color: 'var(--color-text)',
                }}
              >
                AI Research &amp; Post-Training
              </h3>
              <p className="text-body" style={{ fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                We work across reinforcement learning, synthetic data, supervised fine-tuning,
                post-training pipelines, evaluation frameworks, and agent training environments.
                Our goal is to help teams improve model capabilities, measure performance, and
                build more reliable AI systems.
              </p>
            </div>

            <div style={{ padding: '28px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                  color: 'var(--color-text)',
                }}
              >
                AI Agents &amp; Software Engineering
              </h3>
              <p className="text-body" style={{ fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                We develop systems that enable AI agents to tackle complex engineering tasks through
                planning, tool use, implementation, testing, and verification. Marshal, our
                engineering-focused coding agent, is designed to work across complex codebases and
                support long-horizon software development.
              </p>
            </div>
          </div>
        </section>

        {/* From Research to Production */}
        <SectionDepth>
          <section
            style={{
              padding: 'var(--spacing-section-lg) 0',
              background: 'var(--color-bg-elevated)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div className="container-editorial">
              <div style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>From Research to Production</p>
                </RevealText>
                <RevealText delay={1}>
                  <h2 className="text-display" style={{ maxWidth: '700px' }}>
                    Building capable AI is
                    <br />
                    <span className="text-italic-serif">only part of the challenge.</span>
                  </h2>
                </RevealText>
                <RevealText delay={2}>
                  <p className="text-body" style={{ maxWidth: '640px', marginTop: '16px' }}>
                    Production systems require reliable data pipelines, rigorous evaluation, efficient
                    inference, controlled deployment, and continuous monitoring. SingleCore Labs
                    approaches AI as an end-to-end engineering discipline, connecting experimentation
                    with the infrastructure needed to operate systems in real-world environments.
                  </p>
                </RevealText>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Data', 'Training', 'Post-Training', 'Evaluation', 'Guardrails', 'Inference', 'Deployment', 'Monitoring', 'Feedback'].map((stage) => (
                  <span
                    key={stage}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border-strong)',
                      borderRadius: '999px',
                      padding: '8px 18px',
                      background: 'var(--color-bg-surface)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </SectionDepth>

        {/* Engineering First + Built for Real-World AI */}
        <section
          className="container-editorial"
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: 'var(--spacing-section-lg)',
            paddingBottom: 'clamp(48px, 6vh, 80px)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 72px)' }}>
            <div>
              <RevealText>
                <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Engineering First</p>
              </RevealText>
              <RevealText delay={1}>
                <h2 className="text-display" style={{ marginBottom: '16px' }}>
                  Not just <span className="text-italic-serif">demonstrations.</span>
                </h2>
              </RevealText>
              <p className="text-body" style={{ maxWidth: '520px', marginBottom: '16px' }}>
                We prioritize measurable performance, reliability, reproducibility, security, and cost
                efficiency. Rather than stopping at demonstrations, we focus on building, testing,
                benchmarking, and improving systems against practical engineering requirements.
              </p>
            </div>
            <div>
              <RevealText>
                <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Built for Real-World AI</p>
              </RevealText>
              <RevealText delay={1}>
                <h2 className="text-display" style={{ marginBottom: '16px' }}>
                  Run AI <span className="text-italic-serif">where you need it.</span>
                </h2>
              </RevealText>
              <p className="text-body" style={{ maxWidth: '520px', marginBottom: '16px' }}>
                Organizations need to run AI where their data and operations demand it. Our systems work across:
              </p>
              <ul className="text-body" style={{ paddingLeft: '20px', listStyleType: 'disc', lineHeight: 1.9 }}>
                <li>Public cloud</li>
                <li>Private cloud</li>
                <li>Enterprise Kubernetes</li>
                <li>On-premise infrastructure</li>
                <li>Isolated environments (scoped per engagement)</li>
                <li>Edge devices</li>
                <li>Dedicated GPU infrastructure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ecosystem + Philosophy + Vision */}
        <SectionDepth>
          <section
            style={{
              padding: 'var(--spacing-section-lg) 0',
              background: 'var(--color-bg-elevated)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div className="container-editorial">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 72px)' }}>
                <div>
                  <RevealText>
                    <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Our Philosophy</p>
                  </RevealText>
                  <RevealText delay={1}>
                    <h2 className="text-display" style={{ marginBottom: '16px' }}>
                      Build, <span className="text-italic-serif">don&apos;t just integrate.</span>
                    </h2>
                  </RevealText>
                  <p className="text-body" style={{ maxWidth: '520px' }}>
                    Data pipelines, evaluation, inference, infrastructure, security, and deployment determine
                    whether an AI system works in production. That&apos;s where we focus.
                  </p>
                </div>
                <div>
                  <RevealText>
                    <p className="text-eyebrow" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.5)' }}>Our Direction</p>
                  </RevealText>
                  <RevealText delay={1}>
                    <h2 className="text-display" style={{ marginBottom: '16px' }}>
                      An integrated <span className="text-italic-serif">engineering stack.</span>
                    </h2>
                  </RevealText>
                  <p className="text-body" style={{ maxWidth: '520px', marginBottom: '16px' }}>
                    We are building toward an integrated engineering stack for developing, training,
                    evaluating, optimizing, deploying, and operating AI systems.
                  </p>
                  <p className="text-body" style={{ maxWidth: '520px' }}>
                    <strong>SingleCore Labs — AI Research &amp; Engineering.</strong> Building the infrastructure
                    behind production AI. Research. Build. Deploy. Improve.
                  </p>
                </div>
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
                background: 'var(--color-bg-elevated)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(32px, 5vw, 64px)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)',
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
                    color: 'var(--color-text)',
                  }}
                >
                  Discuss an engineering project
                  <br />
                  with <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>our team.</span>
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Tell us about your infrastructure, workflow, or research problem.
                </p>
              </div>
            </div>

            {/* Right Side: Form Panel */}
            <div
              style={{
                background: 'var(--color-bg-surface)',
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
                        background: 'rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                      }}
                    >
                      <Check size={24} style={{ color: '#FFFFFF' }} />
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
                          Full name <span style={{ color: '#FFFFFF' }}>*</span>
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
                          Mobile number <span style={{ color: '#FFFFFF' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <select
                              value={prefix}
                              onChange={(e) => setPrefix(e.target.value)}
                              style={{
                                padding: '12px 28px 12px 12px',
                                border: '1px solid var(--color-border-strong)',
                                background: 'var(--color-bg-surface)',
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
                          Email address <span style={{ color: '#FFFFFF' }}>*</span>
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
                          Message <span style={{ color: '#FFFFFF' }}>*</span>
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
                        <p style={{ color: '#e08080', fontSize: '12px', fontWeight: 500 }}>
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
      </main>
      <Footer />
    </div>
  )
}
