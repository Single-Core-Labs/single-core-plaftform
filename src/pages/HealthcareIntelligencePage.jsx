import { useState, useRef, useEffect } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import {
  ArrowRight, Shield, Activity, Microscope,
  Stethoscope, FileText, Lock, CheckCircle,
  Users, Building2, BarChart3, ChevronRight, Search,
  Zap, FlaskConical, ClipboardList, BrainCircuit,
} from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Stethoscope,
    label: 'Diagnose',
    title: 'Clinical intelligence at the point of care',
    detail: 'Equip clinicians with AI that understands patient histories, lab results, and the latest research — without leaving the EHR workflow.',
    features: [
      'Zero-hallucination diagnostic suggestions',
      'Explainable reasoning traced to source literature',
      'FHIR/HL7-native integration with Epic and Cerner',
    ],
  },
  {
    icon: Zap,
    label: 'Automate',
    title: 'Eliminate documentation burden',
    detail: 'Cut the hours clinicians spend on notes, coding, and admin. Generate structured charts, summaries, and billing codes from patient conversations.',
    features: [
      'Auto-generated clinical notes from encounters',
      'Real-time ICD-10 and CPT code suggestions',
      'Automated referral summaries and discharge plans',
    ],
  },
  {
    icon: FlaskConical,
    label: 'Accelerate',
    title: 'Speed discovery from bench to bedside',
    detail: 'Help research teams move faster with AI that analyzes trials, publications, and lab data to uncover insights and surface potential targets.',
    features: [
      'Clinical trial matching and protocol analysis',
      'Literature review automation with citation tracing',
      'Drug-target interaction discovery from public datasets',
    ],
  },
]

const TEAMS = [
  {
    id: 'clinical',
    icon: Activity,
    label: 'Clinical',
    title: 'Enhance patient support and clinician efficiency',
    description: 'Empower care teams with AI that reduces admin overhead and delivers faster, more personalized support at every touchpoint.',
    points: [
      'Generate tailored post-visit plans from records and care team notes',
      'Answer common patient questions about policies and protocols instantly',
      'Lighten physician workload with AI-optimized documentation tools',
    ],
    stat: '60%',
    statLabel: 'less documentation time',
  },
  {
    id: 'operations',
    icon: ClipboardList,
    label: 'Operations',
    title: 'Automate back-office and compliance workflows',
    description: 'Cut manual workload, maintain regulatory alignment, and free up teams to focus on higher-impact work.',
    points: [
      'Automatically extract key insights from intake forms, lab results, and claims',
      'Analyze unstructured health data to uncover meaningful trends',
      'Keep regulatory filings up-to-date as requirements evolve',
    ],
    stat: '3x',
    statLabel: 'faster claims processing',
  },
  {
    id: 'research',
    icon: Microscope,
    label: 'R&D',
    title: 'Accelerate progress from bench to bedside',
    description: 'Help research and development teams move faster from early-stage exploration to clinical application.',
    points: [
      'Analyze experimental results to uncover trends, anomalies, and potential targets',
      'Summarize publications, lab notes, and trial data for faster knowledge transfer',
      'Connect insights across teams and phases to support translational research',
    ],
    stat: '40%',
    statLabel: 'faster literature review',
  },
]

const SERVICES = [
  {
    icon: BrainCircuit,
    title: 'Clinical Decision Support',
    detail: 'Fine-tuned diagnostic models cross-referenced with the latest medical research. Explainable, auditable, and always grounded in source data.',
  },
  {
    icon: Lock,
    title: 'Private LLM Deployment',
    detail: 'Air-gapped, on-premise deployment within your hospital network. PHI never leaves your boundary. HIPAA compliance built in from day one.',
  },
  {
    icon: FileText,
    title: 'EHR-Native Integration',
    detail: 'Bidirectional FHIR/HL7 pipelines connecting directly to Epic, Cerner, and Meditec. AI that works where your clinicians already work.',
  },
  {
    icon: Search,
    title: 'Medical Imaging AI',
    detail: 'Computer vision models for radiology, pathology, and dermatology. Automated triage, anomaly detection, and structured reporting.',
  },
  {
    icon: BarChart3,
    title: 'Predictive Population Health',
    detail: 'Identify at-risk patients before complications arise. Flag readmission risks, sepsis indicators, and chronic disease progression from longitudinal records.',
  },
  {
    icon: FlaskConical,
    title: 'Clinical Trial Analytics',
    detail: 'Automated patient-to-trial matching, protocol feasibility analysis, and real-time safety monitoring across study populations.',
  },
]

const DEPLOYMENT_FEATURES = [
  { icon: Lock, title: 'Privately deployable', detail: 'Deploy in your own VPC, on-prem, or fully air-gapped. Zero PHI leaves your boundary.' },
  { icon: CheckCircle, title: 'Regulator-ready', detail: 'HIPAA-compliant with auditable outputs, usage monitoring, and built-in governance tools.' },
  { icon: Building2, title: 'Fully customizable', detail: 'Fine-tune models on your institutional data, protocols, and clinical specialty requirements.' },
  { icon: Users, title: 'Expert-implemented', detail: 'Work with our forward-deployed engineers who understand healthcare infrastructure and compliance.' },
]

const HERO_IMAGE = 'https://images.pexels.com/photos/3912992/pexels-photo-3912992.jpeg'

function LazyHeroVisual() {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image()
          img.onload = () => setLoaded(true)
          img.src = HERO_IMAGE
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={imgRef} className="hc-hero-visual">
      <div
        className="hc-hero-image-wrap"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        <img
          src={HERO_IMAGE}
          alt="Healthcare AI technology"
          className="hc-hero-image"
        />
        <div className="hc-hero-image-overlay" />
      </div>
      {/* Placeholder shown while loading */}
      {!loaded && (
        <div className="hc-hero-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(184,164,120,0.2)" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default function HealthcareIntelligencePage() {
  const [activeTeam, setActiveTeam] = useState('clinical')

  return (
    <div className="page-dark">
      <SEO
        title="AI Solutions for Healthcare & Life Sciences | Single Core Labs"
        description="Single Core Labs delivers enterprise AI for healthcare and life sciences: clinical decision support, EHR-native intelligence, HIPAA-compliant private LLM deployment, and research acceleration."
        keywords="healthcare AI, EHR integration, clinical decision support, HIPAA compliant AI, medical imaging AI, life sciences AI"
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>

        {/* ──────── Hero ──────── */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(120px, 18vh, 180px)',
            paddingBottom: 'clamp(80px, 12vh, 140px)',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.08), transparent 70%), var(--color-bg)',
            overflow: 'hidden',
          }}
        >
          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            <div className="hc-hero-split">
              <div className="hc-hero-split__text">
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Healthcare & Life Sciences</p>
                </RevealText>
                <RevealText delay={0.15}>
                  <h1 className="solutions-hero__title" style={{ marginBottom: '24px', maxWidth: '600px' }}>
                    Transform care and <br />
                    discovery with <em>sovereign AI.</em>
                  </h1>
                </RevealText>
                <RevealText delay={0.3}>
                  <p className="text-body" style={{ maxWidth: '520px', fontSize: 'clamp(16px, 1.2vw, 20px)', color: 'var(--color-text)', marginBottom: '36px', lineHeight: 1.6 }}>
                    Streamline operations, surface clinical insights, and accelerate research with AI
                    built for the unique complexity of healthcare — deployed on your terms.
                  </p>
                </RevealText>
                <RevealText delay={0.45}>
                  <a href="/contact" className="btn-primary">
                    Request a demo
                    <ArrowRight size={18} />
                  </a>
                </RevealText>
              </div>
              <div className="hc-hero-split__media">
                <LazyHeroVisual />
              </div>
            </div>
          </div>

          <style>{`
            .hc-hero-split {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 48px;
              align-items: center;
            }
            .hc-hero-split__text { text-align: left; }

            .hc-hero-visual {
              position: relative;
              width: 100%;
              max-width: 440px;
              margin: 0 auto;
              aspect-ratio: 1 / 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .hc-hero-image-wrap {
              position: absolute;
              inset: 0;
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid rgba(184,164,120,0.1);
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .hc-hero-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .hc-hero-image-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(
                135deg,
                rgba(11, 11, 11, 0.55) 0%,
                rgba(11, 11, 11, 0.15) 50%,
                rgba(11, 11, 11, 0.4) 100%
              );
              mix-blend-mode: multiply;
            }
            .hc-hero-placeholder {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(17, 17, 17, 0.6);
              border-radius: 16px;
              border: 1px solid rgba(184,164,120,0.06);
            }

            @media (max-width: 900px) {
              .hc-hero-split { grid-template-columns: 1fr; gap: 32px; }
              .hc-hero-split__text { text-align: center; }
              .hc-hero-visual { max-width: 320px; }
            }
          `}</style>
        </section>

        {/* ──────── Core Capabilities ──────── */}
        <section className="container-editorial" style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Core Capabilities</p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', maxWidth: '700px', marginInline: 'auto' }}>
                Synchronize data, decisions, <br className="hidden-mobile" />
                and delivery.
              </h2>
            </RevealText>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card card--rounded card--pad"
                style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(184, 164, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--color-accent)' }}>
                  <cap.icon size={22} strokeWidth={1.5} />
                </div>
                <p className="text-eyebrow" style={{ fontSize: '11px', marginBottom: '8px', letterSpacing: '2px' }}>
                  {cap.label}
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                  {cap.detail}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cap.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: 'var(--color-text-dim)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Teams Section ──────── */}
        <section style={{ marginBottom: '120px', position: 'relative' }}>
          <div style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.04), transparent 70%)',
            paddingTop: '80px',
            paddingBottom: '100px',
          }}>
            <div className="container-editorial">
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Use Cases by Team</p>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                    Transform patient care. <br className="hidden-mobile" />
                    Turbocharge research.
                  </h2>
                </RevealText>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
                {TEAMS.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setActiveTeam(team.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: '100px',
                      border: activeTeam === team.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: activeTeam === team.id ? 'rgba(184, 164, 120, 0.1)' : 'transparent',
                      color: activeTeam === team.id ? 'var(--color-accent)' : 'var(--color-text-dim)',
                      cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <team.icon size={16} strokeWidth={1.5} />
                    {team.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {TEAMS.filter(t => t.id === activeTeam).map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}
                    className="hc-teams-grid"
                  >
                    <div>
                      <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '16px', lineHeight: 1.3 }}>
                        {team.title}
                      </h3>
                      <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                        {team.description}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                        {team.points.map((p, i) => (
                          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                            <ChevronRight size={14} style={{ color: 'var(--color-accent)', marginTop: '3px', flexShrink: 0 }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
                          {team.stat}
                        </span>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                          {team.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* SVG illustration per team */}
                    <div style={{
                      padding: 0, borderRadius: '16px',
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      minHeight: '320px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', position: 'relative',
                    }}>
                      {team.id === 'clinical' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* EHR screen */}
                          <rect x="40" y="40" width="320" height="180" rx="10" fill="rgba(0,0,0,0.25)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <rect x="56" y="56" width="120" height="8" rx="3" fill="rgba(184,164,120,0.12)" />
                          <rect x="56" y="72" width="80" height="8" rx="3" fill="rgba(184,164,120,0.06)" />
                          {/* Patient vitals card */}
                          <rect x="56" y="98" width="150" height="80" rx="6" fill="rgba(0,0,0,0.15)" />
                          <text x="68" y="116" fontSize="8" fill="rgba(184,164,120,0.3)" fontFamily="monospace">Patient: #4815</text>
                          <text x="68" y="130" fontSize="8" fill="rgba(40,200,64,0.4)" fontFamily="monospace">HR: 72 bpm</text>
                          <text x="68" y="144" fontSize="8" fill="rgba(184,164,120,0.3)" fontFamily="monospace">BP: 118/76</text>
                          <text x="68" y="158" fontSize="8" fill="rgba(255,200,100,0.4)" fontFamily="monospace">Temp: 37.2 C</text>
                          {/* AI suggestion panel */}
                          <rect x="220" y="98" width="126" height="80" rx="6" fill="rgba(40,200,64,0.04)" stroke="rgba(40,200,64,0.1)" strokeWidth="1" />
                          <text x="232" y="116" fontSize="8" fill="rgba(40,200,64,0.4)" fontFamily="monospace">AI Clinical Note</text>
                          <text x="232" y="130" fontSize="7" fill="rgba(184,164,120,0.25)" fontFamily="monospace">Acute bronchitis</text>
                          <text x="232" y="144" fontSize="7" fill="rgba(184,164,120,0.25)" fontFamily="monospace">Recommended: Amox</text>
                          <text x="232" y="158" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Follow-up: 7 days</text>
                          {/* Bottom bars */}
                          <rect x="56" y="200" width="100" height="14" rx="4" fill="rgba(40,200,64,0.04)" />
                          <text x="64" y="210" fontSize="7" fill="rgba(40,200,64,0.35)" fontFamily="monospace">EHR synced</text>
                          <rect x="170" y="200" width="176" height="14" rx="4" fill="rgba(184,164,120,0.03)" />
                          <text x="178" y="210" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">FHIR/HL7 | Epic EHR</text>
                          {/* Physician icon */}
                          <circle cx="340" cy="270" r="32" fill="rgba(184,164,120,0.04)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <circle cx="340" cy="260" r="8" fill="rgba(184,164,120,0.1)" />
                          <rect x="328" y="274" width="24" height="16" rx="8" fill="rgba(184,164,120,0.06)" />
                        </svg>
                      )}
                      {team.id === 'operations' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* Claims pipeline */}
                          <text x="40" y="56" fontSize="9" fill="rgba(184,164,120,0.25)" fontFamily="monospace">Claims Processing Pipeline</text>
                          <rect x="40" y="70" width="90" height="36" rx="6" fill="rgba(184,164,120,0.06)" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <text x="50" y="92" fontSize="8" fill="rgba(184,164,120,0.35)" fontFamily="monospace">Intake</text>
                          <line x1="130" y1="88" x2="160" y2="88" stroke="rgba(184,164,120,0.15)" strokeWidth="1" />
                          <polygon points="158,85 166,88 158,91" fill="rgba(184,164,120,0.15)" />
                          <rect x="166" y="70" width="90" height="36" rx="6" fill="rgba(184,164,120,0.06)" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <text x="176" y="92" fontSize="8" fill="rgba(184,164,120,0.35)" fontFamily="monospace">Validate</text>
                          <line x1="256" y1="88" x2="286" y2="88" stroke="rgba(184,164,120,0.15)" strokeWidth="1" />
                          <polygon points="284,85 292,88 284,91" fill="rgba(184,164,120,0.15)" />
                          <rect x="292" y="70" width="90" height="36" rx="6" fill="rgba(40,200,64,0.04)" stroke="rgba(40,200,64,0.1)" strokeWidth="1" />
                          <text x="312" y="92" fontSize="8" fill="rgba(40,200,64,0.35)" fontFamily="monospace">Auto-pay</text>
                          {/* Processing metrics */}
                          <rect x="40" y="130" width="342" height="80" rx="6" fill="rgba(0,0,0,0.1)" />
                          <rect x="56" y="144" width="80" height="50" rx="4" fill="rgba(0,0,0,0.1)" />
                          <text x="66" y="162" fontSize="18" fill="rgba(40,200,64,0.5)" fontFamily="var(--font-display)" fontWeight="600">847</text>
                          <text x="62" y="180" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Claims/day</text>
                          <rect x="152" y="144" width="80" height="50" rx="4" fill="rgba(0,0,0,0.1)" />
                          <text x="162" y="162" fontSize="18" fill="rgba(184,164,120,0.5)" fontFamily="var(--font-display)" fontWeight="600">94%</text>
                          <text x="156" y="180" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Auto-approved</text>
                          <rect x="248" y="144" width="80" height="50" rx="4" fill="rgba(0,0,0,0.1)" />
                          <text x="258" y="162" fontSize="18" fill="rgba(255,200,100,0.5)" fontFamily="var(--font-display)" fontWeight="600">2.4h</text>
                          <text x="252" y="180" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Avg processing</text>
                          {/* Regulatory */}
                          <rect x="40" y="230" width="342" height="40" rx="6" fill="rgba(0,0,0,0.08)" />
                          <text x="56" y="248" fontSize="8" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Regulatory compliance: HIPAA | SOC 2 | DPDP</text>
                          <text x="56" y="260" fontSize="8" fill="rgba(40,200,64,0.25)" fontFamily="monospace">All audits passed — no findings</text>
                        </svg>
                      )}
                      {team.id === 'research' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* Research dashboard */}
                          <text x="40" y="50" fontSize="9" fill="rgba(184,164,120,0.25)" fontFamily="monospace">Clinical Research Platform</text>
                          {/* Trial card */}
                          <rect x="40" y="66" width="150" height="100" rx="6" fill="rgba(0,0,0,0.15)" />
                          <text x="52" y="84" fontSize="8" fill="rgba(184,164,120,0.3)" fontFamily="monospace">Active Trials</text>
                          <text x="52" y="106" fontSize="22" fill="rgba(184,164,120,0.5)" fontFamily="var(--font-display)" fontWeight="600">12</text>
                          <text x="52" y="124" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Phase II: 4 | Phase III: 8</text>
                          <text x="52" y="140" fontSize="7" fill="rgba(40,200,64,0.25)" fontFamily="monospace">Enrolling: 3 new sites</text>
                          {/* Molecule / network visualization */}
                          <circle cx="280" cy="100" r="50" fill="rgba(184,164,120,0.02)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <circle cx="280" cy="100" r="3" fill="rgba(184,164,120,0.3)" />
                          <circle cx="260" cy="80" r="2" fill="rgba(184,164,120,0.2)" />
                          <circle cx="300" cy="80" r="2" fill="rgba(184,164,120,0.2)" />
                          <circle cx="260" cy="120" r="2" fill="rgba(184,164,120,0.2)" />
                          <circle cx="300" cy="120" r="2" fill="rgba(184,164,120,0.2)" />
                          <line x1="280" y1="100" x2="260" y2="80" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <line x1="280" y1="100" x2="300" y2="80" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <line x1="280" y1="100" x2="260" y2="120" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <line x1="280" y1="100" x2="300" y2="120" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          <text x="270" y="168" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Compound DB</text>
                          {/* Publication feed */}
                          <rect x="40" y="186" width="342" height="28" rx="4" fill="rgba(0,0,0,0.08)" />
                          <text x="52" y="204" fontSize="7" fill="rgba(184,164,120,0.25)" fontFamily="monospace">Latest: AI-driven target identification in oncology — Nature Medicine</text>
                          <rect x="40" y="220" width="342" height="28" rx="4" fill="rgba(0,0,0,0.05)" />
                          <text x="52" y="238" fontSize="7" fill="rgba(184,164,120,0.2)" fontFamily="monospace">Automated: 47 new trials matched to patient cohort</text>
                          {/* Metrics */}
                          <rect x="40" y="268" width="110" height="30" rx="4" fill="rgba(0,0,0,0.06)" />
                          <text x="52" y="286" fontSize="8" fill="rgba(40,200,64,0.3)" fontFamily="monospace">3.2x discovery speed</text>
                          <rect x="160" y="268" width="110" height="30" rx="4" fill="rgba(0,0,0,0.06)" />
                          <text x="172" y="286" fontSize="8" fill="rgba(184,164,120,0.25)" fontFamily="monospace">847 patients matched</text>
                          <rect x="280" y="268" width="102" height="30" rx="4" fill="rgba(0,0,0,0.06)" />
                          <text x="292" y="286" fontSize="8" fill="rgba(184,164,120,0.25)" fontFamily="monospace">12 protocols optimized</text>
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ──────── Platform Services ──────── */}
        <section className="container-editorial" style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Platform Services</p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', maxWidth: '700px', marginInline: 'auto' }}>
                Everything you need to deploy <br className="hidden-mobile" />
                AI in regulated healthcare.
              </h2>
            </RevealText>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  padding: '28px', borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-card)',
                  transition: 'all 0.3s ease',
                }}
                className="hc-service-card"
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(184, 164, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-accent)' }}>
                  <svc.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {svc.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Security & Deployment ──────── */}
        <section style={{ marginBottom: '120px' }}>
          <div className="container-editorial">
            <div style={{
              background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
              borderRadius: '24px', padding: 'clamp(40px, 6vw, 80px)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Deployment & Security</p>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                    Secure, compliant, and <br className="hidden-mobile" />
                    ready for production.
                  </h2>
                </RevealText>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
                {DEPLOYMENT_FEATURES.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ textAlign: 'center' }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(184, 164, 120, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-accent)' }}>
                      <feat.icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '280px', marginInline: 'auto' }}>
                      {feat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────── Closing CTA ──────── */}
        <section className="container-editorial" style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card card--rounded card--pad"
            style={{ padding: 'clamp(48px, 6vw, 80px)', background: 'var(--color-bg-elevated)' }}
          >
            <h2 className="text-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '16px' }}>
              Accelerate your healthcare AI roadmap.
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-muted)', maxWidth: '560px', marginInline: 'auto', marginBottom: '36px', fontSize: '15px' }}>
              Connect with an expert to explore how Single Core Labs fits your clinical workflows, data infrastructure, and compliance requirements.
            </p>
            <a href="/contact" className="btn-primary">
              Get started
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />

      <style>{`
        .hc-service-card:hover {
          border-color: var(--color-accent) !important;
          background: var(--color-bg-elevated) !important;
        }
      `}</style>
    </div>
  )
}
