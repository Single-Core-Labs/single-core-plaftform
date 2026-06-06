import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ParallaxLayer, ScrollFade3D, Card3D, SectionDepth } from '@/components/ScrollScene'
import { ArrowRight, HeartPulse, Layers, Lock, Check, Stethoscope, Bone, Droplets, Heart, Microscope, Activity } from 'lucide-react'

// cspell:ignore flowsheet nephrology
const HEALTHCARE_PILLARS = [
  {
    id: 'clinical-decision-support',
    icon: HeartPulse,
    title: 'Clinical Decision Support',
    description: 'Empower clinicians with zero-hallucination diagnostic reasoning models fine-tuned on specialized clinical journals and radiological data.',
    features: [
      'Multimodal analysis of DICOM imaging and history records',
      'Explainable diagnostic suggestions with confidence profiling',
      'Differential diagnostics cross-checked against live clinical datasets'
    ]
  },
  {
    id: 'epic-native-integration',
    icon: Layers,
    title: 'Epic & EHR-Native Integration',
    description: 'Bypass friction with enterprise-grade FHIR and HL7-compliant bidirectional pipelines built directly into your active EMR/EHR system.',
    features: [
      'Direct read/write access safely orchestrated via secure APIs',
      'Context-aware chart summaries generated inside Epic InBasket',
      'Automatic population of flowsheet data with full clinical audit logs'
    ]
  },
  {
    id: 'air-gapped-governance',
    icon: Lock,
    title: 'Air-Gapped Privacy & Security',
    description: 'Deliver cutting-edge clinical reasoning safely with strict on-premise models, ensuring PII and PHI never leave your network boundary.',
    features: [
      '100% offline edge deployment inside hospital infrastructure',
      'HIPAA and SOC-2 Type II aligned data containment guarantees',
      'Zero model retention or external cloud leakage risks'
    ]
  }
]

const STANDALONE_SPECIALTIES = [
  {
    id: 'dental',
    icon: Stethoscope,
    label: 'Oral Health',
    title: 'Dental',
    description: 'Dentists play a critical role in preventing periodontal disease linked to inflammation and chronic conditions. Our intelligence layer integrates with clinical dental workflows to document oral health, plan treatments, manage preventive care, and coordinate seamlessly with the broader care team.',
    highlight: 'Coordinated oral-systemic care documentation'
  },
  {
    id: 'orthopaedics',
    icon: Bone,
    label: 'Musculoskeletal',
    title: 'Orthopaedics',
    description: 'Orthopaedic centers require precise, location-specific documentation and registry reporting. Our agents support structured documentation for joint injections, patient-reported outcomes, and direct data submission to orthopaedics registries — all within the active EHR workflow.',
    highlight: 'Registry reporting & patient-reported outcomes'
  },
  {
    id: 'urology',
    icon: Activity,
    label: 'Urological Procedures',
    title: 'Urology',
    description: 'Urology clinics demand efficient ordering, documentation, and charge capture for complex procedural workflows. Our intelligence layer surfaces specialty-specific content to make urological procedures, consults, and follow-up visits faster and more accurate.',
    highlight: 'Procedure-specific charge capture automation'
  },
  {
    id: 'nephrology',
    icon: Droplets,
    label: 'Dialysis & Renal Care',
    title: 'Nephrology',
    description: 'Dialysis centers require intelligent management of clinical care quality and operational efficiency. Our AI integrates with nephrology workflows to assist treatment teams with dialysis plan management, interdisciplinary care coordination, and quality reporting for improvement initiatives.',
    highlight: 'Interdisciplinary care plans & QI reporting'
  },
  {
    id: 'cardiology',
    icon: Heart,
    label: 'Cardiovascular',
    title: 'Cardiology',
    description: 'Cardiology centers rely on structured reporting across invasive and non-invasive procedures. Our cognitive layer standardizes cardiology report generation, improving continuity of care and enabling robust downstream analytics directly within cardiovascular information systems.',
    highlight: 'Structured cardiology report standardization'
  },
  {
    id: 'oncology',
    icon: Microscope,
    label: 'Cancer Care',
    title: 'Oncology',
    // cspell:ignore AJCC
    description: 'Cancer centers need airtight protocol management for chemotherapy, radiation tracking, and national registry submissions including AJCC. Our AI automates oncology-specific ordering workflows, protocol adherence tracking, and data submission pipelines to reduce clinician burden.',
    highlight: 'Chemotherapy protocols & registry submissions'
  }
]

export default function HealthcareIntelligencePage() {
  return (
    <>
      <SEO 
        title="Healthcare Intelligence & EHR Co-Pilots | Single Core Labs"
        description="FHIR/HL7-compliant clinical intelligence layers and Epic-native co-pilots fine-tuned for high-stakes clinical workflows."
        keywords="healthcare AI, EHR co-pilots, clinical intelligence layer, Epic-native integration"
      />
      <Navbar />

      <main style={{ minHeight: '100vh', overflow: 'hidden', paddingBottom: '120px' }}>
        {/* Parallax Background Orb */}
        <div style={{ position: 'relative', width: '100%' }}>
          <ParallaxLayer
            speed={-0.15}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: 'clamp(300px, 45vw, 600px)',
                height: 'clamp(300px, 45vw, 600px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,137,123,0.06) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </ParallaxLayer>
        </div>

        {/* Hero Section */}
        <section
          className="container-editorial"
          style={{
            paddingTop: 'clamp(120px, 16vh, 180px)',
            paddingBottom: 'clamp(48px, 6vh, 80px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Specialized Verticals</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Clinical intelligence.
                <br />
                Integrated <span className="text-italic-serif">directly inside the EMR.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '600px' }}>
                We build secure, FHIR/HL7-compliant cognitive layers that sit on top of record systems like Epic.
                Our agents turn raw, unstructured clinical data into immediate, explainable reasoning to support
                care teams and drastically cut down on charting overhead.
              </p>
            </RevealText>
          </div>
        </section>

        {/* Core Pillars */}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(24px, 3vw, 40px)',
            }}
          >
            {HEALTHCARE_PILLARS.map((pillar) => {
              const IconComp = pillar.icon
              return (
                <ScrollFade3D key={pillar.id}>
                  <Card3D intensity={6}>
                    <div
                      className="glass-card"
                      style={{
                        padding: 'clamp(24px, 3.5vh, 40px)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(0, 137, 123, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '24px'
                        }}>
                          <IconComp size={24} style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <h2
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(20px, 2.5vw, 24px)',
                            fontWeight: 400,
                            letterSpacing: '-0.015em',
                            marginBottom: '16px',
                            color: 'var(--color-text)',
                          }}
                        >
                          {pillar.title}
                        </h2>
                        <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(26, 26, 26, 0.7)', marginBottom: '24px' }}>
                          {pillar.description}
                        </p>

                        <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.4)', marginBottom: '20px' }} />

                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: 0, listStyle: 'none' }}>
                          {pillar.features.map((feat, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'start', fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text)' }}>
                              <Check size={14} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card3D>
                </ScrollFade3D>
              )
            })}
          </div>
        </section>

        {/* ── Standalone Specialties ─────────────────────────────────────────── */}
        <section
          style={{
            padding: 'var(--spacing-section-lg) 0',
            background: '#F5F5F7',
            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background ambient light */}
          <div style={{
            position: 'absolute', top: '10%', left: '5%',
            width: '30vw', height: '30vw',
            background: 'radial-gradient(circle, rgba(186, 230, 253, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
          }} />

          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ marginBottom: 'clamp(40px, 6vh, 72px)' }}>
              <RevealText>
                <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Standalone Specialties</p>
              </RevealText>
              <RevealText delay={1}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                    maxWidth: '760px',
                    marginBottom: '20px',
                  }}
                >
                  Connecting specialty-focused care to the{' '}
                  <span className="text-italic-serif">intelligence grid.</span>
                </h2>
              </RevealText>
              <RevealText delay={2}>
                <p className="text-body" style={{ maxWidth: '600px', color: 'var(--color-text-muted)' }}>
                  Our clinical intelligence layer supports standalone hospitals and clinics across specialties,
                  ensuring continuity of care and a comprehensive patient record — integrated directly with the
                  EMR workflows your teams already use.
                </p>
              </RevealText>
            </div>

            {/* Specialty Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(20px, 2.5vw, 32px)',
              }}
            >
              {STANDALONE_SPECIALTIES.map((spec) => {
                const IconComp = spec.icon
                return (
                  <ScrollFade3D key={spec.id}>
                    <Card3D intensity={5}>
                      <div
                        className="glass-card"
                        style={{
                          padding: 'clamp(24px, 3.5vw, 36px)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                        }}
                      >
                        {/* Top row: icon + label */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '1px solid rgba(0, 137, 123, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconComp size={20} style={{ color: 'var(--color-accent)' }} />
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--color-accent)',
                            }}
                          >
                            {spec.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(20px, 2.5vw, 26px)',
                            fontWeight: 400,
                            letterSpacing: '-0.015em',
                            lineHeight: 1.15,
                            color: 'var(--color-text)',
                            margin: 0,
                          }}
                        >
                          {spec.title}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13.5px',
                            lineHeight: 1.7,
                            color: 'rgba(26, 26, 26, 0.7)',
                            margin: 0,
                            flexGrow: 1,
                          }}
                        >
                          {spec.description}
                        </p>

                        {/* Divider */}
                        <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }} />

                        {/* Highlight tag + CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              color: 'var(--color-text-dim)',
                              padding: '4px 10px',
                              border: '1px solid rgba(255, 255, 255, 0.6)',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.4)',
                              backdropFilter: 'blur(4px)',
                            }}
                          >
                            {spec.highlight}
                          </span>
                          <a
                            href="/contact"
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: 'var(--color-accent)',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              letterSpacing: '0.01em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Explore integration
                            <ArrowRight size={12} />
                          </a>
                        </div>
                      </div>
                    </Card3D>
                  </ScrollFade3D>
                )
              })}
            </div>
          </div>
        </section>

        {/* Epic System Architecture Block */}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'center' }}>
                <div>
                  <RevealText>
                    <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Technical Architecture</p>
                  </RevealText>
                  <RevealText delay={1}>
                    <h2 className="text-display" style={{ marginBottom: '24px', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                      Connecting systems of record with <span className="text-italic-serif">systems of intelligence.</span>
                    </h2>
                  </RevealText>
                  <RevealText delay={2}>
                    <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '32px' }}>
                      EHR databases act as secure data vaults. Our integration orchestrates patient context
                      and runs sub-second clinical inference via private models, generating structures that are
                      injected safely back into EMR records without any external exposure.
                    </p>
                  </RevealText>
                  <RevealText delay={3}>
                    <a href="/contact" className="btn-primary">
                      Consult with our team
                      <ArrowRight size={15} />
                    </a>
                  </RevealText>
                </div>

                <div className="glass-card" style={{
                  padding: 'clamp(24px, 4vw, 48px)',
                  background: 'rgba(255, 255, 255, 0.8)',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                    SCL Healthcare Integration Protocol
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { step: '01 / Ingestion', desc: 'Secure retrieval of patient history, medical imaging (DICOM) and EMR logs via FHIR/HL7 standard APIs.' },
                      { step: '02 / Private Inference', desc: 'Models fine-tuned for healthcare analyze unstructured notes to extract clinical insights with clear confidence factors.' },
                      { step: '03 / Bidirectional Pushes', desc: 'Bidirectional write-back synchronizes clinical notes and triage workflows directly to EMR logs.' }
                    ].map((stepObj, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-text)', fontWeight: 600 }}>
                          {stepObj.step}
                        </span>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.6, color: 'rgba(26, 26, 26, 0.7)', margin: 0 }}>
                          {stepObj.desc}
                        </p>
                        {idx < 2 && <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.4)', marginBlock: '8px' }} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionDepth>

        {/* Dynamic CTA */}
        <section className="container-editorial" style={{ paddingTop: 'clamp(48px, 6vh, 80px)', textAlign: 'center' }}>
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
          <RevealText>
            <h2 className="text-display" style={{ maxWidth: '720px', marginInline: 'auto', marginBottom: '24px' }}>
              Architecting secure, clinical workflows for <span className="text-italic-serif">modern healthcare.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '520px', marginInline: 'auto', marginBottom: '36px' }}>
              Learn how our private agentic systems reduce overhead and deliver reliable clinical decision support for major clinics and hospital networks.
            </p>
          </RevealText>
          <RevealText delay={3}>
            <a href="/contact" className="btn-primary" style={{ display: 'inline-flex', marginInline: 'auto' }}>
              Schedule a technical demo
              <ArrowRight size={15} />
            </a>
          </RevealText>
        </section>
      </main>

      <Footer />
    </>
  )
}
