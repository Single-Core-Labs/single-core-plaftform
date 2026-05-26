import { useState } from 'react'
import { usePageMeta } from '@/lib/seo'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { Plus, Minus, ArrowRight } from 'lucide-react'

const SOLUTIONS = [
  {
    id: 'core-ai',
    number: '01',
    label: 'Core AI & Intelligent Agents',
    tagline: 'Autonomy, precision, and privacy by design.',
    capabilities: [
      { title: 'Agentic Workflows', detail: 'Autonomous orchestration of multi-step enterprise tasks: insurance claims, financial risk reporting, and operational automation.' },
      { title: 'Domain-Specific RAG Systems', detail: 'Zero-hallucination retrieval pipelines across medical journals, compliance codes, and financial portfolios.' },
      { title: 'Private LLM Deployment', detail: 'Fine-tuned open-source models in secure, air-gapped environments protecting PII and PHI at rest and in transit.' },
    ],
  },
  {
    id: 'data-engineering',
    number: '02',
    label: 'Enterprise Data Engineering',
    tagline: 'The data infrastructure your AI models deserve.',
    capabilities: [
      { title: 'Unified Data Lake Architecture', detail: 'Modern platforms merging data science, ML, and business intelligence into a single governed source of truth.' },
      { title: 'Real-Time Streaming Pipelines', detail: 'High-throughput pipelines for instant fraud detection, live patient monitoring, and sub-second analytics.' },
      { title: 'Legacy Data Modernization', detail: 'Seamless migration from on-premise warehouses into scalable, AI-ready cloud data lakes.' },
    ],
  },
  {
    id: 'vertical-solutions',
    number: '03',
    label: 'Industry Vertical Solutions',
    tagline: 'Purpose-built AI for regulated, high-stakes sectors.',
    capabilities: [
      { title: 'EHR-Integrated Clinical Intelligence', detail: 'FHIR/HL7-compliant clinical reasoning systems compatible with Epic. Automates clinical note drafting, structures raw patient charts, and provides secure bedside decision support directly in EMR workflows.' },
      { title: 'Financial AI', detail: 'Algorithmic credit scoring, AML detection, regulatory compliance, and portfolio optimization engines.' },
      { title: 'Insurance AI', detail: 'Computer-vision damage assessment, underwriting automation, and churn prediction at scale.' },
    ],
  },
  {
    id: 'scientific-research',
    number: '04',
    label: 'AI for Scientific Research',
    tagline: 'Accelerating discovery with machine precision.',
    capabilities: [
      { title: 'Biomedical & Clinical Trial AI', detail: 'Drug discovery acceleration, automated patient-to-trial matching, and deep clinical dataset analysis.' },
      { title: 'Predictive Risk Analytics', detail: 'Complex mathematical modeling designed to accurately forecast market trends, epidemic outbreaks, and multi-variable risk surfaces.' },
      { title: 'Automated Literature Review', detail: 'Instant parsing of scientific documents into structured semantic knowledge graphs and research summaries.' },
    ],
  },
  {
    id: 'governance-ops',
    number: '05',
    label: 'Governance & Production MLOps',
    tagline: 'Models that stay secure, auditable, and compliant.',
    capabilities: [
      { title: 'Regulated MLOps Pipelines', detail: 'End-to-end secure model tracking, continuous testing, version control, and automated deployment for regulated industries.' },
      { title: 'Responsible AI & Bias Auditing', detail: 'Transparency frameworks ensuring fairness and compliance across financial and healthcare models globally.' },
    ],
  },
]

export default function SolutionsPage() {
  usePageMeta('/solutions')
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        {/* Hero */}
        <section className="container-editorial" style={{ paddingTop: 'clamp(120px, 16vh, 180px)', paddingBottom: '48px' }}>
          <div style={{ maxWidth: '760px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Our Services</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Enterprise AI Engineered
                <br />
                for <span className="text-italic-serif">Precision & Scale.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '560px' }}>
                Secure, customized, and air-gapped intelligence systems
                for enterprises operating in high-stakes, regulated industries.
              </p>
            </RevealText>
          </div>
        </section>

        {/* Accordion */}
        <section className="container-editorial">
          <div style={{ height: '1px', backgroundColor: 'var(--color-border-strong)' }} />

          {SOLUTIONS.map((solution) => {
            const isOpen = openId === solution.id
            return (
              <div key={solution.id}>
                <button
                  onClick={() => toggle(solution.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 'clamp(28px, 4vh, 40px) 0',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: 'clamp(40px, 5vw, 64px) 1fr auto',
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
                    {solution.number}
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
                      {solution.label}
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
                      {solution.tagline}
                    </motion.span>
                  </div>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
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
                        paddingLeft: 'clamp(64px, 8vw, 88px)',
                        paddingBottom: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px',
                      }}>
                        {solution.capabilities.map((cap, cIdx) => (
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
              Let's architect your next intelligent system,{' '}
              <span className="text-italic-serif">precisely and securely.</span>
            </p>
          </RevealText>
          <RevealText delay={2}>
            <a
              href="/contact"
              className="link-underline"
              style={{ marginTop: '40px', display: 'inline-flex', fontSize: '14px', fontWeight: 600 }}
            >
              Consult with our engineering team
              <ArrowRight size={14} />
            </a>
          </RevealText>
        </section>
      </main>

      <Footer />
    </>
  )
}
