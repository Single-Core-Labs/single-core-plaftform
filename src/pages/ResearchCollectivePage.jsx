import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Cpu, Microscope, Network, FlaskConical, Users, Zap, BookOpen, Award, Loader2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { submitResearchApplication } from '@/lib/researchCollective'
import SEO from '@/components/SEO'

const RESEARCH_TRACKS = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Core ML research — architectures, optimisation, representation learning, and scalable training pipelines.',
  },
  {
    icon: Zap,
    title: 'Reinforcement Learning',
    description: 'RL algorithms, reward shaping, multi-agent systems, and recursive self-improvement architectures.',
  },
  {
    icon: FlaskConical,
    title: 'Generative AI',
    description: 'LLMs, diffusion models, multimodal generation, alignment, and efficient inference techniques.',
  },
  {
    icon: Microscope,
    title: 'Healthcare AI',
    description: 'Clinical NLP, medical imaging, genomic inference, and sovereign AI for regulated healthcare environments.',
  },
  {
    icon: Network,
    title: 'AI Infrastructure',
    description: 'Distributed training, air-gapped deployment, caching systems, and production-grade MLOps tooling.',
  },
]

const BENEFITS = [
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Direct guidance from engineers and researchers who have shipped AI systems from the ground up.',
  },
  {
    icon: Cpu,
    title: 'Compute Resources',
    description: 'Access to GPU clusters and infrastructure for running experiments, training models, and validating results.',
  },
  {
    icon: Award,
    title: 'Publication Support',
    description: 'Editorial review, conference submission guidance, and co-authorship opportunities with SCL researchers.',
  },
  {
    icon: BookOpen,
    title: 'Collaboration',
    description: 'Co-author opportunities with SCL researchers and connections across our academic and industry network.',
  },
]

const RESEARCH_AREAS = [
  'Machine Learning',
  'Reinforcement Learning',
  'Generative AI',
  'Healthcare AI',
  'AI Infrastructure',
  'Other',
]

const baseInput = {
  width: '100%',
  padding: '10px 0',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  color: 'var(--color-text)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-border)',
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
        color: 'var(--color-text-muted)', letterSpacing: '0.01em',
      }}>
        {label}{required && <span style={{ color: 'var(--color-accent)' }}> *</span>}
      </label>
      <input
        id={id} type={type} required={required}
        placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...baseInput, borderBottomColor: focused ? 'var(--color-accent)' : 'var(--color-border)' }}
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
        color: 'var(--color-text-muted)', letterSpacing: '0.01em',
      }}>
        {label}{required && <span style={{ color: 'var(--color-accent)' }}> *</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          id={id} required={required} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...baseInput,
            borderBottomColor: focused ? 'var(--color-accent)' : 'var(--color-border)',
            paddingRight: '24px', cursor: 'pointer',
          }}
        >
          {children}
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-dim)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section
      aria-labelledby="rc-heading"
      style={{
        position: 'relative',
        paddingTop: 'clamp(110px, 15vh, 170px)',
        paddingBottom: 'clamp(48px, 6vh, 72px)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: 'clamp(300px, 45vw, 620px)',
          height: 'clamp(300px, 45vw, 620px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>
            SCL Research Collective
          </p>
        </RevealText>
        <RevealText delay={1}>
          <h1
            id="rc-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '860px',
              marginBottom: '20px',
            }}
          >
            Empower the next generation of{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
              }}
            >
              AI researchers.
            </span>
          </h1>
        </RevealText>
        <RevealText delay={2}>
          <p
            className="text-body"
            style={{
              maxWidth: '600px',
              fontSize: 'clamp(15px, 1.2vw, 17px)',
            }}
          >
            A community of researchers, engineers, students, and practitioners working across
            Machine Learning, Reinforcement Learning, Generative AI, Healthcare AI, and
            AI Infrastructure. Research. Build. Publish. Impact.
          </p>
        </RevealText>
      </div>
    </section>
  )
}

function MissionSection() {
  return (
    <section style={{ padding: 'var(--spacing-section-lg) 0', borderTop: '1px solid var(--color-border)' }}>
      <div className="container-editorial">
        <div style={{
          maxWidth: '800px',
          marginInline: 'auto',
          textAlign: 'center',
        }}>
          <RevealText>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(24px, 3vh, 36px)',
            }}>
              Our mission is simple: empower the next generation of AI researchers.
            </h2>
          </RevealText>
          <RevealText delay={1}>
            <p className="text-body" style={{ fontSize: '15px', maxWidth: '640px', marginInline: 'auto' }}>
              Through the Research Collective, Single Core Labs supports promising research with
              mentorship, collaboration opportunities, compute resources, and funding for selected
              papers and projects. If you are passionate about advancing AI research and building
              real-world systems, we would love to have you join us.
            </p>
          </RevealText>
        </div>
      </div>
    </section>
  )
}

function ResearchTracksSection() {
  return (
    <section style={{
      padding: 'var(--spacing-section-lg) 0',
      background: 'var(--color-bg-elevated)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Research Tracks</p>
        </RevealText>
        <RevealText delay={1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            maxWidth: '680px',
            marginBottom: 'clamp(36px, 5vh, 56px)',
          }}>
            Five pillars of{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              frontier research.
            </span>
          </h2>
        </RevealText>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {RESEARCH_TRACKS.map((track, i) => {
            const Icon = track.icon
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card card--pad"
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-accent)',
                }}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}>
                  {track.title}
                </h3>
                <p className="text-body" style={{ fontSize: '13px', lineHeight: 1.7, flex: 1 }}>
                  {track.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section style={{ padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>What You Get</p>
        </RevealText>
        <RevealText delay={1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            maxWidth: '680px',
            marginBottom: 'clamp(36px, 5vh, 56px)',
          }}>
            Support designed to{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              accelerate.
            </span>
          </h2>
        </RevealText>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card card--pad card--elevated"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  minHeight: '200px',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-bg-card)',
                  color: 'var(--color-accent)',
                }}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}>
                  {benefit.title}
                </h3>
                <p className="text-body" style={{ fontSize: '13px', lineHeight: 1.7 }}>
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ApplicationFormSection() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    researchArea: '',
    affiliation: '',
    statement: '',
    link: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statementFocused, setStatementFocused] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await submitResearchApplication(form)
    setLoading(false)
    if (err) {
      setError(err)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <section style={{
        padding: 'var(--spacing-section-lg) 0',
        background: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '600px', marginInline: 'auto', textAlign: 'center' }}
          >
            <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Application Received</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}>
              We will be in touch{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>shortly.</span>
            </h2>
            <p className="text-body" style={{ maxWidth: '460px', marginInline: 'auto' }}>
              Thank you for your interest in the Single Core Labs Research Collective.
              Our team will review your application and reach out with next steps.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section style={{
      padding: 'var(--spacing-section-lg) 0',
      background: 'var(--color-bg-elevated)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="container-editorial">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
          className="rc-form-grid"
        >
          <div>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Apply Now</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                maxWidth: '480px',
                marginBottom: '20px',
              }}>
                Join the{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                  Founding Research Cohort.
                </span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '440px', marginBottom: '28px' }}>
                Applications for our Founding Research Cohort are now open. Selected members
                will receive dedicated mentorship, compute credits, and funding support for
                their research projects.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Open to researchers, engineers, students, and practitioners worldwide',
                  'All research tracks — ML, RL, GenAI, Healthcare AI, Infrastructure',
                  'Funding for selected papers, projects, and conference attendance',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0, paddingTop: '2px' }}>
                      <ArrowRight size={14} strokeWidth={2} />
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'var(--color-text-muted)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </RevealText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="card card--rounded card--pad"
            style={{
              width: '100%',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Field label="Full name" id="fullName" required
                  value={form.fullName} onChange={set('fullName')} placeholder="e.g. Jane Smith" />

                <Field label="Email address" id="email" type="email" required
                  value={form.email} onChange={set('email')} placeholder="jane@example.com" />

                <SelectField label="Primary research area" id="researchArea" required
                  value={form.researchArea} onChange={set('researchArea')}
                >
                  <option value="" disabled>Select a track</option>
                  {RESEARCH_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </SelectField>

                <Field label="Affiliation / Institution (optional)" id="affiliation"
                  value={form.affiliation} onChange={set('affiliation')} placeholder="e.g. MIT, Google, Independent" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <label htmlFor="statement" style={{
                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
                    color: 'var(--color-text-muted)', letterSpacing: '0.01em',
                  }}>
                    Your research interests & motivation <span style={{ color: 'var(--color-accent)' }}> *</span>
                  </label>
                  <textarea
                    id="statement"
                    rows={3}
                    required
                    value={form.statement}
                    onChange={set('statement')}
                    onFocus={() => setStatementFocused(true)}
                    onBlur={() => setStatementFocused(false)}
                    placeholder="What are you working on? Why do you want to join?"
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${statementFocused ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s',
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                <Field label="Link to your work (optional)" id="link"
                  value={form.link} onChange={set('link')} placeholder="e.g. GitHub, Google Scholar, blog" />

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
                    color: 'var(--color-text-muted)',
                  }}>
                    I agree to receive communications from Single Core Labs about the Research
                    Collective and related programs, and acknowledge that my information will be
                    used in accordance with the{' '}
                    <a href="/privacy" style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>
                      Privacy Policy
                    </a>.
                  </span>
                </label>

                {error && (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-accent)', fontWeight: 500 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !form.consent}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: loading || !form.consent ? 'var(--color-border-strong)' : 'var(--color-accent)',
                    color: loading || !form.consent ? 'var(--color-text-dim)' : '#0B0B0B',
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
                    <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .rc-form-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section style={{ padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Questions</p>
        </RevealText>
        <RevealText delay={1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '720px',
            marginBottom: '20px',
          }}>
            Want to learn more about the{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              Collective?
            </span>
          </h2>
        </RevealText>
        <RevealText delay={2}>
          <p className="text-body" style={{ maxWidth: '460px', marginBottom: '28px' }}>
            Reach out to us directly. We are happy to answer questions about the program,
            eligibility, or partnership opportunities.
          </p>
        </RevealText>
        <RevealText delay={3}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn-primary">
              Contact Us
              <ArrowRight size={15} />
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

export default function ResearchCollectivePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: 'Single Core Labs Research Collective',
    url: 'https://singlecorelabs.com/research-collective',
    description:
      'Single Core Labs Research Collective — empowering the next generation of AI researchers with mentorship, compute resources, and funding.',
  }

  return (
    <div className="page-dark">
      <SEO
        title="Research Collective | Single Core Labs"
        description="Join the Single Core Labs Research Collective — mentorship, compute resources, and funding for the next generation of AI researchers."
        keywords="AI research collective, machine learning research, reinforcement learning, generative AI, healthcare AI, AI infrastructure research funding"
        schema={schema}
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '100vh' }}>
        <HeroSection />
        <MissionSection />
        <ResearchTracksSection />
        <BenefitsSection />
        <ApplicationFormSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
