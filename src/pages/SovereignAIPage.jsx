import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { Section, SectionHead } from '@/system/Container'
import { BentoGrid, BentoCard } from '@/system/Bento'

const CREAM = '#FFFFFF'

function PillCta({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: CREAM,
        borderRadius: '9999px',
        padding: '8px 8px 8px 22px',
        textDecoration: 'none',
      }}
    >
      <span style={{ color: '#000', fontWeight: 500, fontSize: '15px', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <span
        style={{
          background: '#000',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ArrowRight size={16} color={CREAM} />
      </span>
    </Link>
  )
}

const CONTROLS = [
  { title: 'Data', text: 'Keep sensitive data inside your security and jurisdictional boundaries.' },
  { title: 'Models', text: 'Run open and customized models without locking your intelligence to a single provider.' },
  { title: 'Compute', text: 'Control where your AI runs — cloud, private infrastructure, on-premise, or dedicated GPU clusters.' },
  { title: 'Operations', text: 'Control deployment, access, policies, monitoring, and the infrastructure your AI depends on.' },
]

const ENVIRONMENTS = [
  { title: 'Private Cloud', text: 'Deploy AI inside your own network and security boundary.' },
  { title: 'On-Premise', text: 'Run models directly on infrastructure you control.' },
  { title: 'Dedicated Compute', text: 'Reserve GPU capacity for predictable AI workloads.' },
  { title: 'Air-Gapped', text: 'Operate critical AI workloads without external network dependencies.' },
  { title: 'Sovereign Cloud', text: 'Keep compute and data within required geographic and regulatory boundaries.', span: 'wide' },
]

const FLOW = ['Models', 'Adaptations', 'Data', 'Evaluations', 'Feedback', 'Infrastructure']

const SECTORS = ['Government', 'Defense', 'Financial Services', 'Healthcare', 'Energy', 'Research', 'Enterprise']

export default function SovereignAIPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Sovereign AI — Own Your AI. Control Your Compute. | Single Core Labs"
        description="SCL gives organizations the infrastructure to build, run, and scale AI inside the environments they control — private cloud, on-premise, dedicated GPU clusters, and air-gapped infrastructure."
        keywords="sovereign AI, private AI, on-premise AI, air-gapped AI, data sovereignty, AI infrastructure"
      />

      <main>
        {/* Hero */}
        <section style={{ background: '#000', padding: 'clamp(120px, 14vh, 160px) clamp(20px, 4vw, 60px) clamp(56px, 7vh, 96px)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <RevealText>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  color: CREAM,
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.4)',
                  marginBottom: '28px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                Sovereign AI. Engineered for control.
              </span>
            </RevealText>
            <RevealText delay={1}>
              <h1
                style={{
                  color: CREAM,
                  fontSize: 'clamp(34px, 4.5vw, 64px)',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                  textWrap: 'balance',
                }}
              >
                Sovereign AI. Without compromise.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: CREAM, fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 16px' }}>
                Own your AI. Control your compute. Keep your intelligence.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 16px' }}>
                SCL gives organizations the infrastructure to build, run, and scale AI inside
                the environments they control — from private cloud and dedicated GPU clusters
                to on-premise and air-gapped infrastructure.
              </p>
            </RevealText>
            <RevealText delay={4}>
              <p style={{ color: CREAM, fontSize: 'clamp(15px, 1.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 32px' }}>
                Your data. Your models. Your compute. Your control.
              </p>
            </RevealText>
            <RevealText delay={5}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to sales</PillCta>
                <Link to="/enterprise" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  Explore enterprise <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Control */}
        <Section>
          <SectionHead
            heading="AI sovereignty starts with control."
            lede="AI is becoming critical infrastructure. Your models learn from proprietary data, workflows, decisions, and feedback — that intelligence becomes part of your organization. SCL helps you keep control of the entire AI stack."
          />
          <BentoGrid>
            {CONTROLS.map((c) => (
              <BentoCard key={c.title} headline={c.title} text={c.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Environments */}
        <Section>
          <SectionHead
            heading="Run AI where you need it."
          />
          <BentoGrid>
            {ENVIRONMENTS.map((e) => (
              <BentoCard key={e.title} headline={e.title} text={e.text} span={e.span} />
            ))}
          </BentoGrid>
        </Section>

        {/* Intelligence loop */}
        <Section>
          <SectionHead
            heading="Your intelligence should stay yours."
            lede="SCL helps organizations retain control over the intelligence created through AI. Build on your own requirements. Improve continuously. Move workloads between approved environments without rebuilding your AI stack."
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {FLOW.map((f, i) => (
              <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '9999px',
                    padding: '8px 18px',
                    color: CREAM,
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </span>
                {i < FLOW.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>→</span>
                )}
              </span>
            ))}
          </div>
        </Section>

        {/* Sectors */}
        <Section>
          <SectionHead
            heading="Built for critical AI."
            lede="For workloads where data, availability, jurisdiction, and operational control matter."
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {SECTORS.map((s) => (
              <span
                key={s}
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  color: CREAM,
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* Closing */}
        <section style={{ background: '#000', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 60px)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <RevealText>
              <h2
                style={{
                  color: CREAM,
                  fontSize: 'clamp(30px, 4vw, 52px)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                  textWrap: 'balance',
                }}
              >
                Don't rent your intelligence.
              </h2>
            </RevealText>
            <RevealText delay={1}>
              <p style={{ color: CREAM, fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
                Build it. Run it. Own it.
              </p>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 12px' }}>
                SCL provides the compute and infrastructure layer for sovereign AI.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <p style={{ color: CREAM, fontSize: 'clamp(15px, 1.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 32px' }}>
                Own the intelligence. Control the compute.
              </p>
            </RevealText>
            <RevealText delay={4}>
              <PillCta to="/contact">Talk to sales</PillCta>
            </RevealText>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
