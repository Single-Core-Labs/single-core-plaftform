import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import {
  ArrowRight, Check, Server, Activity, Microscope,
  Stethoscope, FileText, Lock, Eye, RefreshCw, Settings,
  Shield, Layers, Heart
} from 'lucide-react'
import { motion } from 'framer-motion'

const CORE_BENEFITS = [
  {
    id: 'decision-support',
    icon: Activity,
    title: 'Precision Decision Support',
    description: 'Zero-hallucination diagnostic reasoning models fine-tuned on specialized clinical journals and real-time patient data.',
  },
  {
    id: 'ehr-native',
    icon: Layers,
    title: 'EHR-Native Intelligence',
    description: 'Seamless integration via FHIR/HL7 bidirectional pipelines. Our agents work where your clinicians work, reducing friction and fatigue.',
  },
  {
    id: 'sovereign-governance',
    icon: Shield,
    title: 'Sovereign Data Governance',
    description: 'Absolute control over sensitive PHI with air-gapped deployment. Your data never leaves your infrastructure, ensuring 100% HIPAA compliance.',
  }
]

const USE_CASES = [
  {
    id: 'diagnostic-reasoning',
    icon: Stethoscope,
    category: 'Diagnostic Support',
    title: 'Real-time Clinical Reasoning',
    description: 'Analyze complex patient histories and lab results to surface critical insights. Our AI provides explainable diagnostic suggestions cross-referenced with the latest medical research.',
  },
  {
    id: 'documentation-automation',
    icon: FileText,
    category: 'Clinical Operations',
    title: 'Automated Charting & Documentation',
    description: 'Eliminate the "pajama time" burden. Automatically generate structured clinical notes and summaries from physician-patient interactions and unstructured data.',
  },
  {
    id: 'predictive-outcomes',
    icon: Heart,
    category: 'Population Health',
    title: 'Predictive Patient Risk Profiling',
    description: 'Identify at-risk patients before complications arise. Monitor longitudinal records to flag potential readmissions, sepsis risks, or chronic disease progression.',
  },
  {
    id: 'research-acceleration',
    icon: Microscope,
    category: 'Clinical Research',
    title: 'Accelerated Evidence-Based Research',
    description: 'Scan vast repositories of clinical trials and internal datasets to accelerate drug discovery and treatment optimization while maintaining a rigorous audit trail.',
  }
]

const SECURITY_FEATURES = [
  { icon: Lock, title: 'Air-Gapped Privacy', description: 'Deploy fully offline within your hospital network.' },
  { icon: Eye, title: 'Full Auditability', description: 'Trace every AI-generated insight back to its source.' },
  { icon: Server, title: 'Hybrid Deployment', description: 'Flexible hosting: On-premise, VPC, or secure cloud.' },
  { icon: RefreshCw, title: 'Active Learning', description: 'Models that adapt to your institution\'s specific protocols.' },
  { icon: Settings, title: 'Workflow Integration', description: 'Custom APIs for Epic, Cerner, and specialized EHRs.' }
]

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function VisualPlaceholder({ icon: Icon, label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '260px',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
      background: 'var(--color-bg-card)',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-accent)',
        marginBottom: '16px',
      }}>
        <Icon size={28} />
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-dim)', fontWeight: 400 }}>
        {label}
      </p>
    </div>
  )
}

export default function HealthcareIntelligencePage() {
  return (
    <div className="page-dark">
      <SEO
        title="Healthcare Intelligence & EHR-Native AI | Single Core Labs"
        description="Deploy secure, FHIR/HL7-compliant clinical intelligence layers that transform raw medical data into actionable insights directly within your EHR."
        keywords="healthcare AI, EHR integration, clinical decision support, HIPAA compliant AI, medical agents"
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>

        {/* Hero Block */}
        <div className="card card--rounded card--pad" style={{ marginTop: '120px', padding: '64px', background: 'var(--color-bg-elevated)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <FadeIn>
                <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Industry / Healthcare Intelligence</p>
                <h1 className="text-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                  Clinical intelligence. <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Integrated by design.</span>
                </h1>
                <p className="text-body" style={{ marginBottom: '28px', fontSize: '16px' }}>
                  We build secure, FHIR-compliant cognitive layers that sit on top of your EHR, turning unstructured clinical data into immediate, explainable reasoning for care teams.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="/contact" className="btn-primary">
                    Request a Demo <ArrowRight size={14} />
                  </a>
                  <a href="#use-cases" className="btn-outline">
                    View Use Cases
                  </a>
                </div>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.15}>
                <VisualPlaceholder icon={Heart} label="Clinical Intelligence Platform" />
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Core Benefits Block */}
        <div className="card card--rounded card--pad" style={{ marginTop: '80px', padding: '64px', background: 'var(--color-bg-elevated)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '64px' }}>
              <FadeIn>
                <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Core Pillars</p>
                <h2 className="text-display">
                  Intelligence that respects <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>the clinical stakes</span>
                </h2>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.1}>
                {CORE_BENEFITS.map((b, i) => (
                  <div key={b.id} style={{
                    padding: '20px 0',
                    borderBottom: i < CORE_BENEFITS.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <b.icon size={18} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '18px',
                          fontWeight: 400,
                          marginBottom: '4px',
                          color: 'var(--color-text)',
                        }}>
                          {b.title}
                        </h3>
                        <p className="text-body" style={{ fontSize: '14px', margin: 0 }}>
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Use Cases — alternating blocks */}
        {USE_CASES.map((uc, i) => {
          const Icon = uc.icon
          return (
            <div key={uc.id} className="card card--rounded card--pad" style={{ marginTop: '40px', padding: '64px', background: 'var(--color-bg-elevated)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                <div>
                  <FadeIn>
                    {i % 2 === 0 ? (
                      <>
                        <p className="text-eyebrow" style={{ marginBottom: '16px' }}>{uc.category}</p>
                        <h2 className="text-display">{uc.title}</h2>
                        <p className="text-body" style={{ marginBottom: '24px' }}>{uc.description}</p>
                        <a href="/contact" className="btn-outline">
                          Learn more <ArrowRight size={14} />
                        </a>
                      </>
                    ) : (
                      <VisualPlaceholder icon={Icon} label={uc.category} />
                    )}
                  </FadeIn>
                </div>
                <div>
                  <FadeIn delay={0.1}>
                    {i % 2 === 0 ? (
                      <VisualPlaceholder icon={Icon} label={uc.category} />
                    ) : (
                      <>
                        <p className="text-eyebrow" style={{ marginBottom: '16px' }}>{uc.category}</p>
                        <h2 className="text-display">{uc.title}</h2>
                        <p className="text-body" style={{ marginBottom: '24px' }}>{uc.description}</p>
                        <a href="/contact" className="btn-outline">
                          Learn more <ArrowRight size={14} />
                        </a>
                      </>
                    )}
                  </FadeIn>
                </div>
              </div>
            </div>
          )
        })}

        {/* Deployment Block */}
        <div className="card card--rounded card--pad" style={{ marginTop: '40px', padding: '64px', background: 'var(--color-bg-elevated)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div style={{ borderRight: '1px solid var(--color-border)', paddingRight: '64px' }}>
              <FadeIn>
                <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Deployment Architecture</p>
                <h2 className="text-display">Sovereign AI for Health Systems</h2>
                <p className="text-body" style={{ marginBottom: '24px' }}>
                  Unlike generic cloud AI, our infrastructure is built for the specific regulatory and technical requirements of modern health systems.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'On-premise deployment for maximum PHI security',
                    'Bidirectional FHIR/HL7 data orchestration',
                    'Custom fine-tuned models for clinical specialties',
                    'End-to-end observability and clinical audit logs'
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }}>
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-outline" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Talk to an Infrastructure Expert <ArrowRight size={14} />
                </a>
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.1}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '260px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: 'var(--color-bg-card)',
                }}>
                  <Server size={40} style={{ color: 'var(--color-accent)', marginBottom: '12px' }} />
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    marginBottom: '8px',
                    color: 'var(--color-text)',
                  }}>
                    Secure Infrastructure
                  </h3>
                  <p className="text-body" style={{ fontSize: '14px', margin: 0 }}>
                    Deploying LLMs safely within the hospital network boundary.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Security Block */}
        <div className="card card--rounded card--pad" style={{ marginTop: '40px', padding: '64px', background: 'var(--color-bg-elevated)' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Governance & Compliance</p>
              <h2 className="text-display">
                Built for <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Governance & Compliance</span>
              </h2>
              <p className="text-body" style={{ maxWidth: '650px', margin: '0 auto' }}>
                We prioritize data integrity and patient privacy above all else. Our systems meet HIPAA, SOC-2, and international healthcare regulations.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {SECURITY_FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '24px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    background: 'var(--color-bg-card)',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      margin: '0 auto 12px',
                      borderRadius: '50%',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                    }}>
                      <Icon size={18} />
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 400,
                      marginBottom: '4px',
                      color: 'var(--color-text)',
                    }}>
                      {f.title}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'var(--color-text-dim)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {f.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>

        {/* CTA Block */}
        <div style={{ marginTop: '40px', marginBottom: '40px', textAlign: 'center' }}>
          <FadeIn>
            <h2 className="text-display" style={{ marginBottom: '24px' }}>
              Modernize your health system with <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>sovereign AI.</span>
            </h2>
            <a href="/contact" className="btn-primary" style={{ padding: '14px 36px' }}>
              Book a Clinical Demo <ArrowRight size={16} />
            </a>
          </FadeIn>
        </div>

      </main>
      <Footer />
    </div>
  )
}
