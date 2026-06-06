import { useState } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { Plus, Minus, ArrowRight } from 'lucide-react'

const PILLARS = [
  {
    id: 'embedded-experts',
    number: '01',
    label: 'Embedded Experts',
    tagline: 'We work where you work, not from a slide deck.',
    capabilities: [
      { title: 'On-Site & Async Collaboration', detail: 'Our engineers embed directly inside your team to surface the highest-impact use cases and build them the right way. No hand-offs, no black boxes.' },
      { title: 'Use Case Discovery Workshops', detail: 'We run structured discovery sessions with your stakeholders to identify where AI can move the needle fastest, and where it can\'t.' },
      { title: 'Outcome-Based Milestones', detail: 'Transparent delivery roadmaps tied to business outcomes, not engineering hours. You always know what\'s being built and why.' },
    ],
  },
  {
    id: 'engineering-velocity',
    number: '02',
    label: 'Engineering Velocity',
    tagline: 'From demo to deployed, in days not months.',
    capabilities: [
      { title: 'Same-Day Environment Setup', detail: 'Our internal platform and tooling are purpose-built for speed. We can stand up a working AI system in your environment within days of alignment.' },
      { title: 'Air-Gapped & On-Premise Deployments', detail: 'For regulated industries and high-security environments. Fully offline AI deployments with no cloud dependency and complete data sovereignty.' },
      { title: 'Continuous Monitoring & Iteration', detail: 'Post-deployment isn\'t the finish line. We instrument your models for drift, performance, and quality, and ship improvements on a rolling cadence.' },
    ],
  },
  {
    id: 'applied-ai-research',
    number: '03',
    label: 'Applied AI Research',
    tagline: 'Lab-quality thinking, enterprise-grade delivery.',
    capabilities: [
      { title: 'Frontier Model Fine-Tuning', detail: 'We don\'t just wrap GPT APIs. We fine-tune open-source frontier models on your domain data for higher accuracy, lower cost, and full data privacy.' },
      { title: 'Production Stress-Testing', detail: 'Our research team runs adversarial evaluations against your real production constraints: edge cases, data quality issues, and distribution shifts included.' },
      { title: 'Proprietary Tooling & Benchmarks', detail: 'We build and maintain internal evaluation frameworks so your AI systems are measured against what actually matters in your business context.' },
    ],
  },
  {
    id: 'enterprise-trust',
    number: '04',
    label: 'Enterprise Trust & Compliance',
    tagline: 'Secure, auditable, and built for regulated industries.',
    capabilities: [
      { title: 'SOC-2 Aligned Data Handling', detail: 'Security-first architecture across every layer. Encrypted data pipelines, access controls, and audit logging built in from day one.' },
      { title: 'Responsible AI & Bias Auditing', detail: 'We build transparency frameworks and bias detection pipelines to ensure your AI systems are fair, explainable, and compliant with emerging regulations.' },
      { title: 'Regulated MLOps Pipelines', detail: 'End-to-end model tracking, version control, and automated deployment pipelines designed for HIPAA, GDPR, and financial compliance requirements.' },
    ],
  },
]

export default function EnterprisePage() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Applied AI Research",
        "provider": {
          "@type": "Organization",
          "name": "Single Core Labs"
        },
        "description": "Forward-thinking enterprises trust Single Core Labs to build, deploy, and operate custom, sovereign AI systems that actually perform in production."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What companies provide MLOps services for enterprises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Single Core Labs provides enterprise-grade MLOps pipelines. We implement end-to-end model tracking, version control, and automated deployment pipelines designed for HIPAA, GDPR, and financial compliance requirements."
            }
          },
          {
            "@type": "Question",
            "name": "How does Single Core Labs handle data privacy for AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We build sovereign, air-gapped, and on-premise AI deployments. This ensures complete data sovereignty with no cloud dependencies for regulated industries."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Enterprise AI | Single Core Labs"
        description="Forward-thinking enterprises trust Single Core Labs to build, deploy, and operate AI systems that actually perform in production."
        keywords="enterprise AI solutions, applied AI research, regulated MLOps pipelines"
        schema={schema}
      />
      <Navbar />

      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        {/* Hero */}
        <section className="container-editorial" style={{ paddingTop: 'clamp(120px, 16vh, 180px)', paddingBottom: '48px' }}>
          <div style={{ maxWidth: '760px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Enterprise AI</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Dependable AI for the decisions
                <br />
                your <span className="text-italic-serif">business runs on.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <div className="text-body" style={{ maxWidth: '600px' }}>
                Forward-thinking enterprises trust Single Core Labs to build, deploy, and operate custom AI systems. Our enterprise offerings include:
                <ul style={{ paddingLeft: '20px', marginTop: '12px', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '8px' }}><strong>Air-Gapped & On-Premise Deployments:</strong> Full data sovereignty.</li>
                  <li style={{ marginBottom: '8px' }}><strong>Regulated MLOps Pipelines:</strong> SOC-2, HIPAA, and GDPR compliant architectures.</li>
                  <li><strong>Embedded Experts:</strong> We work directly inside your team, not from a slide deck.</li>
                </ul>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Accordion */}
        <section className="container-editorial">
          <div style={{ height: '1px', backgroundColor: 'var(--color-border-strong)' }} />

          {PILLARS.map((pillar) => {
            const isOpen = openId === pillar.id
            return (
              <div key={pillar.id} className="glass-card" style={{ 
                marginBottom: '20px', 
                padding: '0 clamp(20px, 4vw, 40px)',
                background: isOpen ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.45)',
                transform: 'none' // Disable global hover transform here
              }}>
                <button
                  onClick={() => toggle(pillar.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 'clamp(28px, 4vh, 40px) 0',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: 'clamp(32px, 5vw, 64px) 1fr auto',
                    alignItems: 'start',
                    gap: '24px',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: isOpen ? 'var(--color-accent)' : 'var(--color-text-dim)',
                    paddingTop: '6px',
                    transition: 'color 0.3s',
                  }}>
                    {pillar.number}
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      letterSpacing: '-0.015em',
                      color: isOpen ? 'var(--color-text)' : 'var(--color-text-muted)',
                      transition: 'color 0.3s',
                    }}>
                      {pillar.label}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isOpen ? 0 : 0.6, height: isOpen ? 0 : 'auto' }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '13px',
                        fontStyle: 'italic',
                        color: 'var(--color-text-dim)',
                        overflow: 'hidden',
                        display: 'block',
                      }}
                    >
                      {pillar.tagline}
                    </motion.span>
                  </div>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--glass-border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '4px',
                    transition: 'border-color 0.3s',
                  }}>
                    {isOpen ? <Minus size={12} style={{ color: 'var(--color-accent)' }} /> : <Plus size={12} style={{ color: 'var(--color-text-dim)' }} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        paddingBottom: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}>
                        {pillar.capabilities.map((cap, cIdx) => (
                          <motion.div
                            key={cIdx}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: cIdx * 0.08, ease: 'easeOut' }}
                            style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                          >
                            <span style={{
                              display: 'inline-block',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-accent-dim)',
                              border: '1px solid var(--color-accent)',
                              flexShrink: 0,
                              marginTop: '6px',
                            }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--color-text)',
                                lineHeight: 1.3,
                              }}>
                                {cap.title}
                              </span>
                              <span style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '13px',
                                color: 'var(--color-text-muted)',
                                lineHeight: 1.75,
                              }}>
                                {cap.detail}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
              </div>
            )
          })}
        </section>

        {/* Bottom CTA */}
        <section className="container-editorial" style={{ paddingTop: 'clamp(48px, 6vh, 80px)' }}>
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
          <RevealText>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '700px',
            }}>
              Let's build AI your enterprise can actually{' '}
              <span className="text-italic-serif">rely on.</span>
            </p>
          </RevealText>
          <RevealText delay={2}>
            <a
              href="/contact"
              className="link-underline"
              style={{ marginTop: '40px', display: 'inline-flex', fontSize: '14px', fontWeight: 600 }}
            >
              Schedule a consultation
              <ArrowRight size={14} />
            </a>
          </RevealText>
        </section>
      </main>

      <Footer />
    </>
  )
}
