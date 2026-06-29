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

const highlight = { color: '#00695C' }

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
      border: '1px solid #e8e8e8',
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#f5f5f5',
        border: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00695C',
        marginBottom: '16px',
      }}>
        <Icon size={28} />
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#909090', fontWeight: 400 }}>
        {label}
      </p>
    </div>
  )
}

export default function HealthcareIntelligencePage() {
  return (
    <div className="page-consulting" style={{ color: '#1a1a1a' }}>
      <SEO
        title="Healthcare Intelligence & EHR-Native AI | Single Core Labs"
        description="Deploy secure, FHIR/HL7-compliant clinical intelligence layers that transform raw medical data into actionable insights directly within your EHR."
        keywords="healthcare AI, EHR integration, clinical decision support, HIPAA compliant AI, medical agents"
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>

        {/* Hero Block */}
        <div className="consulting-block" style={{ marginTop: '120px' }}>
          <div className="consulting-grid">
            <div className="consulting-col--divider">
              <FadeIn>
                <p className="consulting-eyebrow">Industry / Healthcare Intelligence</p>
                <h1 className="consulting-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                  Clinical intelligence. <span style={{ fontStyle: 'italic', color: '#00695C' }}>Integrated by design.</span>
                </h1>
                <p className="consulting-body" style={{ marginBottom: '28px', fontSize: '16px' }}>
                  We build secure, FHIR-compliant cognitive layers that sit on top of your EHR, turning unstructured clinical data into immediate, explainable reasoning for care teams.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="/contact" className="consulting-btn consulting-btn--primary">
                    Request a Demo <ArrowRight size={14} />
                  </a>
                  <a href="#use-cases" className="consulting-btn">
                    View Use Cases
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="consulting-col">
              <FadeIn delay={0.15}>
                <VisualPlaceholder icon={Heart} label="Clinical Intelligence Platform" />
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Core Benefits Block */}
        <div className="consulting-block">
          <div className="consulting-grid">
            <div className="consulting-col--divider">
              <FadeIn>
                <p className="consulting-eyebrow">Core Pillars</p>
                <h2 className="consulting-heading">
                  Intelligence that respects <span style={{ fontStyle: 'italic', color: '#00695C' }}>the clinical stakes</span>
                </h2>
              </FadeIn>
            </div>
            <div className="consulting-col">
              <FadeIn delay={0.1}>
                {CORE_BENEFITS.map((b, i) => (
                  <div key={b.id} style={{
                    padding: '20px 0',
                    borderBottom: i < CORE_BENEFITS.length - 1 ? '1px solid #e8e8e8' : 'none',
                  }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <b.icon size={18} style={{ color: '#00695C', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '18px',
                          fontWeight: 400,
                          marginBottom: '4px',
                          color: '#1a1a1a',
                        }}>
                          {b.title}
                        </h3>
                        <p className="consulting-body" style={{ fontSize: '14px', margin: 0 }}>
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
            <div key={uc.id} className="consulting-block">
              <div className="consulting-grid">
                <div className={i % 2 === 0 ? 'consulting-col--divider' : 'consulting-col'}>
                  <FadeIn>
                    {i % 2 === 0 ? (
                      <>
                        <p className="consulting-eyebrow">{uc.category}</p>
                        <h2 className="consulting-heading">{uc.title}</h2>
                        <p className="consulting-body" style={{ marginBottom: '24px' }}>{uc.description}</p>
                        <a href="/contact" className="consulting-btn" style={{ borderColor: '#00695C', color: '#00695C' }}>
                          Learn more <ArrowRight size={14} />
                        </a>
                      </>
                    ) : (
                      <VisualPlaceholder icon={Icon} label={uc.category} />
                    )}
                  </FadeIn>
                </div>
                <div className={i % 2 === 0 ? 'consulting-col' : 'consulting-col--divider'}>
                  <FadeIn delay={0.1}>
                    {i % 2 === 0 ? (
                      <VisualPlaceholder icon={Icon} label={uc.category} />
                    ) : (
                      <>
                        <p className="consulting-eyebrow">{uc.category}</p>
                        <h2 className="consulting-heading">{uc.title}</h2>
                        <p className="consulting-body" style={{ marginBottom: '24px' }}>{uc.description}</p>
                        <a href="/contact" className="consulting-btn" style={{ borderColor: '#00695C', color: '#00695C' }}>
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
        <div className="consulting-block">
          <div className="consulting-grid">
            <div className="consulting-col--divider">
              <FadeIn>
                <p className="consulting-eyebrow">Deployment Architecture</p>
                <h2 className="consulting-heading">Sovereign AI for Health Systems</h2>
                <p className="consulting-body" style={{ marginBottom: '24px' }}>
                  Unlike generic cloud AI, our infrastructure is built for the specific regulatory and technical requirements of modern health systems.
                </p>
                <ul className="consulting-list">
                  {[
                    'On-premise deployment for maximum PHI security',
                    'Bidirectional FHIR/HL7 data orchestration',
                    'Custom fine-tuned models for clinical specialties',
                    'End-to-end observability and clinical audit logs'
                  ].map((item, idx) => (
                    <li key={idx}>
                      <span className="consulting-check">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="consulting-btn">
                  Talk to an Infrastructure Expert <ArrowRight size={14} />
                </a>
              </FadeIn>
            </div>
            <div className="consulting-col">
              <FadeIn delay={0.1}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '260px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                }}>
                  <Server size={40} style={{ color: '#00695C', marginBottom: '12px' }} />
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    marginBottom: '8px',
                    color: '#1a1a1a',
                  }}>
                    Secure Infrastructure
                  </h3>
                  <p className="consulting-body" style={{ fontSize: '14px', margin: 0 }}>
                    Deploying LLMs safely within the hospital network boundary.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Security Block */}
        <div className="consulting-block">
          <div className="consulting-grid">
            <div className="consulting-col--full">
              <FadeIn>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <p className="consulting-eyebrow">Governance & Compliance</p>
                  <h2 className="consulting-heading">
                    Built for <span style={{ fontStyle: 'italic', color: '#00695C' }}>Governance & Compliance</span>
                  </h2>
                  <p className="consulting-body" style={{ maxWidth: '650px', margin: '0 auto' }}>
                    We prioritize data integrity and patient privacy above all else. Our systems meet HIPAA, SOC-2, and international healthcare regulations.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="consulting-card-grid">
                  {SECURITY_FEATURES.map((f, i) => {
                    const Icon = f.icon
                    return (
                      <div key={i} style={{
                        textAlign: 'center',
                        padding: '24px 16px',
                        border: '1px solid #e8e8e8',
                        borderRadius: '8px',
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          margin: '0 auto 12px',
                          borderRadius: '50%',
                          background: '#f5f5f5',
                          border: '1px solid #e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#00695C',
                        }}>
                          <Icon size={18} />
                        </div>
                        <h4 style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '13px',
                          fontWeight: 400,
                          marginBottom: '4px',
                          color: '#1a1a1a',
                        }}>
                          {f.title}
                        </h4>
                        <p style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#909090',
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
          </div>
        </div>

        {/* CTA Block */}
        <div className="consulting-block" style={{ marginBottom: '40px' }}>
          <div className="consulting-col--full" style={{ textAlign: 'center' }}>
            <FadeIn>
              <h2 className="consulting-heading" style={{ marginBottom: '24px' }}>
                Modernize your health system with <span style={{ fontStyle: 'italic', color: '#00695C' }}>sovereign AI.</span>
              </h2>
              <a href="/contact" className="consulting-btn consulting-btn--primary" style={{ padding: '14px 36px' }}>
                Book a Clinical Demo <ArrowRight size={16} />
              </a>
            </FadeIn>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
