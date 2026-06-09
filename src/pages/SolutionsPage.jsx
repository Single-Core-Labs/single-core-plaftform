import { useState } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { Plus, Minus, ArrowRight, Check } from 'lucide-react'

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
      { title: 'Insurance AI', detail: 'Computer-vision damage assessment, underwriting automation, and churn prediction at scale.' },
    ],
  },
  {
    id: 'finance-solutions',
    number: '04',
    label: 'Finance Solutions',
    tagline: 'Precision AI for high-stakes financial operations.',
    capabilities: [
      { title: 'Data Transformation', detail: 'Abstract visualization of unstructured documents flowing into clean structured data grids, isometric 3D illustration, glowing teal data streams.' },
      { title: 'Financial Analysis Dashboard', detail: 'Sleek dark-mode analytics dashboard showing candlestick charts and KPI metrics, soft blue glow, shallow depth of field.' },
      { title: 'M&A Deal Scorecard', detail: 'Two puzzle pieces connecting over a clean white desk with financial reports and a laptop, neutral tones with gold accent.' },
      { title: 'Compliance Monitoring', detail: 'Abstract image of a glowing shield overlaid on legal document text, cyber-security aesthetic, hyper-clean render.' },
    ],
  },
  {
    id: 'scientific-research',
    number: '05',
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
    number: '06',
    label: 'Governance & Production MLOps',
    tagline: 'Models that stay secure, auditable, and compliant.',
    capabilities: [
      { title: 'Regulated MLOps Pipelines', detail: 'End-to-end secure model tracking, continuous testing, version control, and automated deployment for regulated industries.' },
      { title: 'Responsible AI & Bias Auditing', detail: 'Transparency frameworks ensuring fairness and compliance across financial and healthcare models globally.' },
    ],
  },
]

export default function SolutionsPage() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <SEO 
        title="AI Solutions | Single Core Labs"
        description="Single Core Labs provides custom AI systems engineering: agentic workflows, private LLM deployments, sovereign AI infrastructure, and regulated MLOps pipelines for enterprises."
        keywords="enterprise AI systems engineering, sovereign AI infrastructure, private LLM deployment, agentic workflows, MLOps pipelines, air-gapped AI"
      />
      <Navbar />

      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        
        {/* Hero Section - Inspired by AI21 Tech */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(140px, 20vh, 220px)',
            paddingBottom: 'clamp(80px, 12vh, 120px)',
            background: 'linear-gradient(rgba(250, 250, 250, 0.9), rgba(250, 250, 250, 0.95)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '24px' }}>Our Services</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h1 className="text-hero" style={{ marginBottom: '32px', maxWidth: '1000px', marginInline: 'auto' }}>
                Enterprise AI Engineered <br />
                for <span className="text-italic-serif">Precision & Scale.</span>
              </h1>
            </RevealText>
            <RevealText delay={0.4}>
              <p className="text-body" style={{ maxWidth: '750px', marginInline: 'auto', fontSize: 'clamp(18px, 1.4vw, 22px)', color: 'var(--color-text)', marginBottom: '48px' }}>
                Single Core Labs provides the following AI services for enterprises:
              </p>
            </RevealText>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px',
              maxWidth: '1200px',
              marginInline: 'auto',
              textAlign: 'left'
            }}>
              {[
                { title: 'Custom Agentic Workflows', detail: 'Autonomous orchestration of multi-step enterprise tasks.' },
                { title: 'Private & Air-Gapped LLM Deployment', detail: 'Sovereign AI with no external cloud dependency.' },
                { title: 'Regulated MLOps Pipelines', detail: 'SOC-2, HIPAA, and GDPR-compliant model operations.' },
                { title: 'Industry Verticals', detail: 'Purpose-built AI for healthcare, finance, insurance, and research.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="glass-card" 
                  style={{ padding: '24px', background: 'rgba(255,255,255,0.6)' }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <div style={{ color: 'var(--color-accent)', marginTop: '4px' }}>
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{item.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Accordion List */}
        <section className="container-editorial" style={{ marginTop: '80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Service Capabilities</h2>
            <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-accent)', marginTop: '16px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SOLUTIONS.map((solution) => {
              const isOpen = openId === solution.id
              return (
                <div key={solution.id} className="glass-card" style={{ 
                  overflow: 'hidden',
                  background: isOpen ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.5)',
                  border: isOpen ? '1px solid var(--color-accent-dim)' : '1px solid var(--color-border)',
                  transition: 'all 0.3s ease'
                }}>
                  <button
                    onClick={() => toggle(solution.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '32px',
                      cursor: 'pointer',
                      display: 'grid',
                      gridTemplateColumns: '48px 1fr auto',
                      alignItems: 'center',
                      gap: '24px',
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: isOpen ? 'var(--color-accent)' : 'var(--color-text-dim)',
                    }}>
                      {solution.number}
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                      }}>
                        {solution.label}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: 'var(--color-text-muted)',
                        marginTop: '4px'
                      }}>
                        {solution.tagline}
                      </span>
                    </div>

                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div style={{ padding: '0 32px 32px 104px' }}>
                          <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                            gap: '32px',
                            borderTop: '1px solid var(--color-border)',
                            paddingTop: '32px'
                          }}>
                            {solution.capabilities.map((cap, i) => (
                              <div key={i}>
                                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>{cap.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{cap.detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="container-editorial" style={{ marginTop: '100px', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '64px', background: 'var(--color-bg-dark)', color: 'white' }}>
            <h2 className="text-display" style={{ color: 'white', marginBottom: '24px' }}>
              Let's architect your next intelligent system, <br />
              precisely and securely.
            </h2>
            <a href="/contact" className="btn-primary" style={{ background: 'white', color: 'black' }}>
              Get Started
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
