import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D, Card3D } from '@/components/ScrollScene'
import { ArrowRight, Layers, Lock, Check, FileText, Shield, Eye, Server, RefreshCw, Settings, Activity, Microscope, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'

const CORE_BENEFITS = [
  {
    id: 'decision-support',
    icon: Activity,
    title: 'Precision Decision Support',
    description: 'Empower clinicians with zero-hallucination diagnostic reasoning models fine-tuned on specialized clinical journals and real-time patient data.',
  },
  {
    id: 'ehr-native',
    icon: Layers,
    title: 'EHR-Native Intelligence',
    description: 'Seamlessly integrate into existing workflows via FHIR/HL7 bidirectional pipelines. Our agents live where your clinicians work, reducing friction and fatigue.',
  },
  {
    id: 'sovereign-governance',
    icon: Shield,
    title: 'Sovereign Data Governance',
    description: 'Maintain absolute control over sensitive PHI with air-gapped deployment options. Your data never leaves your infrastructure, ensuring 100% HIPAA compliance.',
  }
]

const USE_CASES = [
  {
    id: 'diagnostic-reasoning',
    icon: Stethoscope,
    category: 'Diagnostic Support',
    title: 'Real-time Clinical Reasoning',
    description: 'Analyze complex patient histories and lab results to surface critical insights. Our AI provides explainable diagnostic suggestions cross-referenced with the latest medical research.'
  },
  {
    id: 'documentation-automation',
    icon: FileText,
    category: 'Clinical Operations',
    title: 'Automated Charting & Documentation',
    description: 'Eliminate the "pajama time" burden. Automatically generate structured clinical notes and summaries from physician-patient interactions and unstructured data.'
  },
  {
    id: 'predictive-outcomes',
    icon: Activity,
    category: 'Population Health',
    title: 'Predictive Patient Risk Profiling',
    description: 'Identify at-risk patients before complications arise. Monitor longitudinal records to flag potential readmissions, sepsis risks, or chronic disease progression.'
  },
  {
    id: 'research-acceleration',
    icon: Microscope,
    category: 'Clinical Research',
    title: 'Accelerated Evidence-Based Research',
    description: 'Scan vast repositories of clinical trials and internal datasets to accelerate drug discovery and treatment optimization while maintaining a rigorous audit trail.'
  }
]

const SECURITY_FEATURES = [
  { icon: Lock, title: 'Air-Gapped Privacy', description: 'Deploy fully offline within your hospital network.' },
  { icon: Eye, title: 'Full Auditability', description: 'Trace every AI-generated insight back to its source.' },
  { icon: Server, title: 'Hybrid Deployment', description: 'Flexible hosting: On-premise, VPC, or secure cloud.' },
  { icon: RefreshCw, title: 'Active Learning', description: 'Models that adapt to your institution\'s specific protocols.' },
  { icon: Settings, title: 'Workflow Integration', description: 'Custom APIs for Epic, Cerner, and specialized EHRs.' }
]

export default function HealthcareIntelligencePage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <SEO 
        title="Healthcare Intelligence & EHR-Native AI | Single Core Labs"
        description="Deploy secure, FHIR/HL7-compliant clinical intelligence layers that transform raw medical data into actionable insights directly within your EHR."
        keywords="healthcare AI, EHR integration, clinical decision support, HIPAA compliant AI, medical agents"
      />
      <Navbar />

      <main style={{ minHeight: '100vh', overflow: 'hidden' }}>
        
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(140px, 20vh, 220px)',
            paddingBottom: 'clamp(80px, 12vh, 120px)',
            backgroundImage: 'linear-gradient(rgba(250, 250, 250, 0.88), rgba(250, 250, 250, 0.96)), url("https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=2000")',
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
              <p className="text-eyebrow" style={{ marginBottom: '24px' }}>Industry / Healthcare Intelligence</p>
            </RevealText>
            <RevealText delay={0.2}>
              <h1 className="text-hero" style={{ marginBottom: '32px', maxWidth: '1000px', marginInline: 'auto' }}>
                Clinical intelligence. <span className="text-italic-serif">Integrated by design.</span>
              </h1>
            </RevealText>
            <RevealText delay={0.4}>
              <p className="text-body" style={{ maxWidth: '750px', marginInline: 'auto', fontSize: 'clamp(18px, 1.4vw, 22px)', color: 'var(--color-text)' }}>
                We build secure, FHIR-compliant cognitive layers that sit on top of your EHR, turning unstructured clinical data into immediate, explainable reasoning for care teams.
              </p>
            </RevealText>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}
            >
              <a href="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                Request a Demo
                <ArrowRight size={18} />
              </a>
              <a href="#use-cases" className="btn-outline" style={{ padding: '16px 32px', fontSize: '16px' }}>
                View Use Cases
              </a>
            </motion.div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="container-editorial" style={{ paddingBlock: 'var(--spacing-section-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-display">Intelligence that respects the clinical stakes</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '60px' 
          }}>
            {CORE_BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '12px', 
                    backgroundColor: 'var(--color-accent-dim)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--color-accent)'
                  }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-editorial" style={{ fontSize: '26px', fontWeight: 500 }}>{benefit.title}</h3>
                  <p className="text-body">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <HorizontalRule />

        {/* Use Cases Section */}
        <section id="use-cases" className="container-editorial" style={{ paddingBlock: 'var(--spacing-section-lg)' }}>
          <div style={{ marginBottom: '64px' }}>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Impact Areas</p>
            <h2 className="text-display">Modernizing high-stakes care</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
            gap: '32px' 
          }}>
            {USE_CASES.map((useCase) => {
              const Icon = useCase.icon
              return (
                <ScrollFade3D key={useCase.id}>
                  <Card3D intensity={5}>
                    <div className="glass-card" style={{ height: '100%', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div style={{ 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '12px', 
                        backgroundColor: 'var(--color-bg-surface)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--color-accent)'
                      }}>
                        <Icon size={28} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <p className="text-label" style={{ color: 'var(--color-accent)' }}>{useCase.category}</p>
                        <h3 className="text-editorial" style={{ fontSize: '22px', lineHeight: 1.3 }}>{useCase.title}</h3>
                        <p className="text-body" style={{ fontSize: '15px' }}>{useCase.description}</p>
                      </div>
                    </div>
                  </Card3D>
                </ScrollFade3D>
              )
            })}
          </div>
        </section>

        {/* Deployment Section (Replacing Maestro) */}
        <section style={{ backgroundColor: 'var(--color-bg-elevated)', paddingBlock: 'var(--spacing-section-lg)' }}>
          <div className="container-editorial">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
              <div>
                <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Deployment Architecture</p>
                <h2 className="text-display" style={{ marginBottom: '24px' }}>Sovereign AI for Health Systems</h2>
                <p className="text-body" style={{ marginBottom: '32px', fontSize: '18px' }}>
                  Unlike generic cloud AI, our infrastructure is built for the specific regulatory and technical requirements of modern health systems. We provide a bridge between legacy record systems and modern agentic intelligence.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: 0, listStyle: 'none', marginBottom: '32px' }}>
                  {[
                    'On-premise deployment for maximum PHI security',
                    'Bidirectional FHIR/HL7 data orchestration',
                    'Custom fine-tuned models for clinical specialties',
                    'End-to-end observability and clinical audit logs'
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--color-text)' }}>
                      <div style={{ color: 'var(--color-accent)', display: 'flex' }}>
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <span className="text-body" style={{ color: 'var(--color-text)', fontWeight: 500 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="btn-outline">
                  Talk to an Infrastructure Expert
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  aspectRatio: '1/1', 
                  background: 'radial-gradient(circle at center, var(--color-accent-dim) 0%, transparent 70%)',
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '40px'
                }}>
                  <div className="glass-card" style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                    <Server size={48} style={{ color: 'var(--color-accent)', marginInline: 'auto', marginBottom: '20px' }} />
                    <h3 className="text-editorial" style={{ fontSize: '24px', marginBottom: '12px' }}>Secure Infrastructure</h3>
                    <p className="text-body" style={{ fontSize: '14px' }}>
                      Deploying LLMs safely within the hospital network boundary.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="container-editorial" style={{ paddingBlock: 'var(--spacing-section-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-display" style={{ marginBottom: '24px' }}>Built for Governance & Compliance</h2>
            <p className="text-body" style={{ maxWidth: '750px', marginInline: 'auto' }}>
              We prioritize data integrity and patient privacy above all else. Our systems are engineered to meet the stringent demands of HIPAA, SOC-2, and international healthcare regulations.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px' 
          }}>
            {SECURITY_FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    marginInline: 'auto', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent)'
                  }}>
                    <Icon size={32} />
                  </div>
                  <h4 className="text-label" style={{ marginBottom: '8px', color: 'var(--color-text)' }}>{feature.title}</h4>
                  <p className="text-body" style={{ fontSize: '13px', lineHeight: 1.4 }}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ paddingBlock: 'var(--spacing-section-lg)', textAlign: 'center' }}>
          <div className="container-narrow">
            <h2 className="text-display" style={{ marginBottom: '32px' }}>Modernize your health system with sovereign AI.</h2>
            <a href="/contact" className="btn-primary" style={{ padding: '18px 40px', fontSize: '18px' }}>
              Book a Clinical Demo
              <ArrowRight size={20} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
