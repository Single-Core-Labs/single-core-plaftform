
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HorizontalRule } from '@/components/HorizontalRule'
import { RevealText } from '@/components/RevealText'
import { ScrollFade3D } from '@/components/ScrollScene'
import SEO from '@/components/SEO'

// ─── Case study data ──────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: 'radiology-ai',
    eyebrow: 'Healthcare · Medical Imaging',
    headline: 'Automating Radiology Report Generation with Air-Gapped LLMs',
    summary:
      'A 400-bed hospital in Pune needed faster turnaround on chest X-ray reads. We deployed a fine-tuned vision-language model on-premise, reducing report generation time by 68% while maintaining full data sovereignty.',
    tags: ['Medical Imaging', 'LLM Fine-Tuning', 'Air-Gapped Deployment'],
    stat: { value: '68%', label: 'Faster report turnaround' },
  },
  {
    id: 'credit-risk',
    eyebrow: 'Finance · Risk Intelligence',
    headline: 'Real-Time Credit Risk Scoring for an NBFC',
    summary:
      'A non-banking financial company required sub-second credit decisions across 50,000 daily applications. We built an agentic pipeline that ingests bureau data, bank statements, and behavioural signals into a unified risk score.',
    tags: ['Agentic AI', 'Data Pipelines', 'Real-Time Inference'],
    stat: { value: '50K+', label: 'Daily decisions automated' },
  },
  {
    id: 'logistics-optimisation',
    eyebrow: 'Logistics · Route Intelligence',
    headline: 'Last-Mile Delivery Optimisation for a D2C Brand',
    summary:
      'A fast-growing D2C brand was losing 12% of revenue to failed deliveries. Our agent continuously re-routes drivers based on live traffic, weather, and customer availability signals, cutting failed deliveries by half.',
    tags: ['Agentic AI', 'Optimisation', 'Real-Time Data'],
    stat: { value: '50%', label: 'Reduction in failed deliveries' },
  },
  {
    id: 'emr-integration',
    eyebrow: 'Healthcare · Clinical Intelligence',
    headline: 'Epic-Native Clinical Intelligence & Bidirectional EMR Integration',
    summary:
      'A multi-specialty clinic chain ran incompatible EMR systems. We built a secure, FHIR/HL7-compliant clinical intelligence layer that syncs patient records in real time and automates chart summaries directly within their Epic environment.',
    tags: ['Epic Integration', 'FHIR/HL7 APIs', 'Clinical Reasoning'],
    stat: { value: '94%', label: 'Clinical charting accuracy' },
  },
]

// ─── Single card ──────────────────────────────────────────────────────────────
function CaseStudyCard({ study, index }) {
  return (
    <ScrollFade3D>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(24px, 4vw, 64px)',
          paddingBlock: 'clamp(36px, 5vh, 56px)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: index === CASE_STUDIES.length - 1 ? '1px solid var(--color-border)' : 'none',
          alignItems: 'start',
        }}
      >
        {/* Left — text */}
        <div>
          <p className="text-eyebrow" style={{ marginBottom: '14px', color: 'var(--color-accent)' }}>
            {study.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}
          >
            {study.headline}
          </h2>
          <p className="text-body" style={{ maxWidth: '480px', marginBottom: '24px' }}>
            {study.summary}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {study.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  padding: '5px 12px',
                  border: '1px solid var(--color-border-strong)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — stat */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            gap: '32px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'var(--color-text)',
              }}
            >
              {study.stat.value}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                marginTop: '8px',
                letterSpacing: '0.01em',
              }}
            >
              {study.stat.label}
            </p>
          </div>
        </div>
      </article>
    </ScrollFade3D>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  return (
    <>
      <SEO 
        title="Case Studies | Single Core Labs"
        description="Real problems. Real results. We've deployed production AI systems for enterprises across healthcare, finance, and logistics."
        keywords="AI case studies, enterprise AI deployments, healthcare AI results"
      />
      <Navbar />
      <main id="main-content">
        {/* Header */}
        <section
          style={{
            paddingTop: 'clamp(100px, 14vh, 140px)',
            paddingBottom: 'clamp(48px, 6vh, 72px)',
          }}
        >
          <div className="container-editorial">
            <HorizontalRule style={{ marginBottom: 'clamp(32px, 4vh, 48px)' }} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(24px, 4vw, 64px)',
                marginBottom: 'clamp(48px, 6vh, 72px)',
                alignItems: 'end',
              }}
            >
              <RevealText>
                <div>
                  <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Case Studies</p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                    }}
                  >
                    Real problems.{' '}
                    <span className="text-italic-serif">Real results.</span>
                  </h1>
                </div>
              </RevealText>

              <RevealText delay={2}>
                <p className="text-body" style={{ maxWidth: '420px' }}>
                  A selection of engagements where we've deployed production AI systems
                  for enterprises across healthcare, finance, and logistics.
                </p>
              </RevealText>
            </div>
          </div>
        </section>

        {/* Case study list */}
        <section style={{ paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
          <div className="container-editorial">
            {CASE_STUDIES.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: 'clamp(48px, 7vh, 96px) 0',
            background: 'var(--color-bg-elevated)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="container-editorial">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Work with us</p>
            </RevealText>
            <RevealText delay={1}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '20px',
                  maxWidth: '700px',
                }}
              >
                Ready to build your{' '}
                <span className="text-italic-serif">success story?</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '440px', marginBottom: '28px' }}>
                Tell us about your challenge and we'll put together a tailored plan.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <Link to="/contact" className="btn-primary">
                Start the Conversation
                <ArrowRight size={15} />
              </Link>
            </RevealText>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
