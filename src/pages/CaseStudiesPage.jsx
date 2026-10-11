
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { HorizontalRule } from '@/components/HorizontalRule'
import { RevealText } from '@/components/RevealText'
import { ScrollFade3D } from '@/components/ScrollScene'
import SEO from '@/components/SEO'

// ─── Engagement patterns ────────────────────────────────────────────────────
// Representative engagement types for discussion. These are illustrative
// scenarios describing the shape of the work — not customer claims or results.
const CASE_STUDIES = [
  {
    id: 'radiology-ai',
    eyebrow: 'Healthcare · Medical Imaging',
    headline: 'Radiology report drafting inside an isolated deployment',
    summary:
      'A representative pattern: a vision-language model fine-tuned for chest X-ray reads, deployed on-premise so data never leaves the facility, with radiologists reviewing every draft before sign-off.',
    tags: ['Medical Imaging', 'LLM Fine-Tuning', 'Private Deployment'],
    stat: { value: 'Review-led', label: 'Every draft reviewed by a specialist' },
  },
  {
    id: 'credit-risk',
    eyebrow: 'Finance · Risk Intelligence',
    headline: 'Agentic pipelines for high-volume credit decisions',
    summary:
      'A representative pattern: ingesting bureau data, bank statements, and behavioural signals into a unified risk score with evaluation gates and full journals for reviewer inspection.',
    tags: ['Agentic AI', 'Data Pipelines', 'Evaluation'],
    stat: { value: 'Evidence-first', label: 'Every score traceable to sources' },
  },
  {
    id: 'logistics-optimisation',
    eyebrow: 'Logistics · Route Intelligence',
    headline: 'Delivery operations assisted by live-signal routing',
    summary:
      'A representative pattern: an agent that factors traffic, weather, and customer availability into routing suggestions, with dispatchers approving changes before they go out.',
    tags: ['Agentic AI', 'Optimisation', 'Human Approval'],
    stat: { value: 'Human-approved', label: 'Dispatchers decide every change' },
  },
  {
    id: 'emr-integration',
    eyebrow: 'Healthcare · Clinical Intelligence',
    headline: 'Clinical intelligence that meets staff inside the EMR',
    summary:
      'A representative pattern: a standards-based clinical intelligence layer that syncs records and drafts chart summaries for qualified review within existing clinical systems.',
    tags: ['Systems Integration', 'Standards-Based APIs', 'Clinical Review'],
    stat: { value: 'Standards-based', label: 'Built on FHIR/HL7-style interfaces' },
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
    <div className="page-dark">
      <SEO 
        title="Engagement Patterns | Single Core Labs"
        description="Representative engagement patterns across healthcare, finance, and logistics — the shape of the AI infrastructure and engineering work SCL scopes with teams."
        keywords="AI engagement examples, enterprise AI patterns, healthcare AI, finance AI"
      />
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
                  <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Engagement patterns</p>
                  <h1
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                    }}
                  >
                    Representative problems.{' '}
                    <span className="text-italic-serif">Scoped approaches.</span>
                  </h1>
                </div>
              </RevealText>

              <RevealText delay={2}>
                <p className="text-body" style={{ maxWidth: '420px' }}>
                  Illustrative scenarios showing the shape of AI infrastructure and engineering
                  work we scope with teams — not customer claims. Your engagement starts from
                  your systems and success criteria.
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
    </div>
  )
}
