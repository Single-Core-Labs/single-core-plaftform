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

const JOURNEY = [
  {
    n: '01',
    title: 'Build',
    text: 'Move quickly from idea to architecture. Provision the resources you need in isolated environments with developer tools your team already knows.',
    points: [
      'Developer tools — provision and manage resources through a console, CLI, APIs, and infrastructure-as-code with a consistent experience.',
      'Performant networking — private, isolated networking built for the throughput AI workloads demand.',
      'Scalable storage — high-throughput storage co-located with compute for datasets, checkpoints, and artifacts.',
    ],
  },
  {
    n: '02',
    title: 'Train',
    text: 'Scale training with compute, networking, and orchestration that remove friction from large runs.',
    points: [
      'High-performance compute — GPU capacity sized to your workload, from single-node experiments to large clusters.',
      'Managed orchestration — scheduling and fault handling without manual babysitting of clusters.',
    ],
  },
  {
    n: '03',
    title: 'Serve',
    text: 'Go from model to production without the overhead. Tune and deploy on managed infrastructure with autoscaling that matches capacity to demand.',
    points: [
      'Managed inference — low-latency, high-throughput endpoints for open and custom models.',
      'Fine-tuning — adapt models on your own data in a few steps, then deploy or take the artifact anywhere.',
      'Flexible deployment — cloud, private cloud, on-prem, or air-gapped, scoped per engagement.',
    ],
  },
  {
    n: '04',
    title: 'Trust',
    text: 'Ship confidently on infrastructure designed for production AI, with support that treats your uptime like our own.',
    points: [
      'Enterprise-grade support — onboarding, architecture review, and deployment assistance from pilot to production.',
      'Reliability by design — monitoring, fault detection, and remediation so workloads keep moving.',
      'Security and compliance — private deployment, network isolation, audit trails, and controls that support your compliance requirements.',
    ],
  },
]

const PLATFORM_CARDS = [
  { title: 'Managed Slurm', text: 'Keep massive training runs moving with automated orchestration and topology-aware scheduling — without manual overhead.' },
  { title: 'Managed Kubernetes', text: 'Deploy across GPUs in a fault-tolerant environment with automatic remediation and a clear path from development to production.' },
  { title: 'Self-hosted applications', text: 'Host, manage, and serve production AI systems with regional controls, deep observability, and enterprise identity management.', span: 'wide' },
]

const CONTROL_CARDS = [
  { title: 'Observability', text: 'Dashboards, logs, and metrics built in — zero extra cost. GPU health, power, thermals, ECC, throughput. Per-job telemetry, streamed to the tools you already run.' },
  { title: 'Governance', text: 'SSO and SCIM out of the box. RBAC maps to workload accounts. Secrets, key management, audit trails, CI/CD webhooks.' },
  { title: 'Reliability', text: 'Enterprise-grade SLAs across training and inference, with dedicated incident response.' },
  { title: 'Support', text: 'Infrastructure and AI specialists on every tier, with direct escalation to the engineering team behind the platform.' },
  { title: 'Security', text: 'Purpose-built security for large-scale AI workloads: isolated networks, AES-256 encryption at rest with BYOK, and defined data-wiping protocols.', span: 'wide' },
]
const TRUST_CARDS = [
  { title: 'Support', text: 'Onboarding, architecture review, deployment assistance, training, and SLA options — defined in your agreement, not assumed.' },
  { title: 'Reliability', text: 'Health monitoring, fault detection, and remediation designed in, with observability into every layer you depend on.' },
  { title: 'Security', text: 'Private and air-gapped options, network isolation, sandboxed execution, and audit logging on every run.' },
  { title: 'Observability', text: 'Usage, cost, latency, and evaluation signals integrated with your existing observability stack via OTel, logs, metrics, and traces.' },
]

export default function CloudOverviewPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="SCL Cloud Overview — Build, Train, and Serve Without Switching Clouds | Single Core Labs"
        description="SCL Cloud clears the path for AI builders: provision GPUs in minutes, train at scale, and serve with managed inference and fine-tuning — inside your boundary and under your controls."
        keywords="SCL Cloud, AI cloud platform, GPU clusters, managed inference, fine-tuning"
      />

      <main>
        {/* Hero */}
        <section style={{ background: '#000', padding: 'clamp(96px, 11vh, 128px) clamp(12px, 1.5vw, 24px) clamp(28px, 3.5vh, 48px)' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '72dvh',
              borderRadius: 'clamp(16px, 2vw, 32px)',
              overflow: 'hidden',
              background: '#050505',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src="/scl-cloud-hero.mp4"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.7) 100%)',
                zIndex: 1,
              }}
            />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 6vh, 80px) clamp(20px, 4vw, 60px)' }}>
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
                SCL Cloud
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
                Build, train, and serve without switching clouds.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '640px', margin: '0 auto 32px' }}>
                Clusters to endpoints, zero friction. Fast to start, easy to scale, reliable in production.
                SCL Cloud clears the path for AI builders.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to sales</PillCta>
                <Link to="/cloud/managed-inference" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  Managed inference <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealText>
          </div>
        </div>
        </section>

        {/* Journey */}
        <Section>
          <SectionHead
            kicker="The full AI stack"
            heading="Built for performance at scale."
            lede="Accelerate AI training and inference on managed infrastructure that cuts complexity and cost."
          />
          <BentoGrid>
            {JOURNEY.map((j) => (
              <BentoCard key={j.n} kicker={j.n} headline={j.title} text={j.text}>
                <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: '12px 0 0', borderTop: '1px solid var(--scl-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {j.points.map((p) => (
                    <li key={p} className="scl-card-text" style={{ fontSize: '14px' }}>{p}</li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </BentoGrid>
        </Section>

        {/* Trust */}
        <Section>
          <SectionHead
            kicker="Trust"
            heading="Build ambitiously. Trust built in."
          />
          <BentoGrid>
            {TRUST_CARDS.map((c) => (
              <BentoCard key={c.title} headline={c.title} text={c.text} />
            ))}
          </BentoGrid>
        </Section>
        {/* Dedicated compute */}
        <Section>
          <SectionHead
            kicker="Dedicated compute"
            heading="Reserve dedicated, high-performance GPUs in Europe."
            lede="Without having to source, build, or operate infrastructure."
          />
          <p className="scl-heading" style={{ marginBottom: '8px' }}>
            Frontier-grade infrastructure, now yours.
          </p>
          <p className="scl-lede" style={{ marginBottom: 'clamp(28px, 3.5vw, 44px)' }}>
            Latest-generation hardware.
          </p>
          <BentoGrid>
            {PLATFORM_CARDS.map((c) => (
              <BentoCard key={c.title} headline={c.title} text={c.text} span={c.span} />
            ))}
          </BentoGrid>
        </Section>

        {/* Control */}
        <Section>
          <SectionHead
            heading="Control at every layer."
          />
          <BentoGrid>
            {CONTROL_CARDS.map((c) => (
              <BentoCard key={c.title} headline={c.title} text={c.text} span={c.span} />
            ))}
          </BentoGrid>
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
                  margin: '0 0 16px',
                  textWrap: 'balance',
                }}
              >
                Let's talk.
              </h2>
            </RevealText>
            <RevealText delay={1}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 32px' }}>
                Work with us to build your Sovereign AI.
              </p>
            </RevealText>
            <RevealText delay={2}>
              <PillCta to="/contact">Get in touch</PillCta>
            </RevealText>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
