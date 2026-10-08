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

const DEPLOYMENTS = [
  {
    title: 'Serverless Inference',
    text: 'Get started fast with usage-based consumption of curated open models through a fully managed inference API.',
    best: ['Early-stage workloads', 'Low-volume traffic', 'Rapid experimentation'],
  },
  {
    title: 'Self-Serve Deployments',
    text: 'Run models with inference tuned for throughput or responsiveness. Fine-tuned models go live in one click.',
    best: ['Production-scale workloads', 'Low-latency applications', 'Predictable costs'],
  },
  {
    title: 'Tailored Deployments',
    text: 'Work with our team for the highest level of optimization and a dedicated, benchmarked endpoint. You bring the model and define the requirements — we handle the rest.',
    best: ['Proprietary models', 'Bespoke inference optimization', 'SLA-backed performance'],
  },
]

const MODEL_GROUPS = [
  { title: 'Chat & reasoning', text: 'General-purpose conversational and reasoning models, from lightweight and fast to large and capable.' },
  { title: 'Code', text: 'Models tuned for completion, review, and agentic coding workloads.' },
  { title: 'Embeddings & retrieval', text: 'Embedding models for search, RAG, and semantic caching pipelines.' },
  { title: 'Vision & multimodal', text: 'Image and multimodal models for document, media, and inspection workloads.' },
  { title: 'Bring your own', text: 'Your fine-tuned or proprietary model, deployed on dedicated infrastructure under your controls.', span: 'wide' },
]

const WHY = [
  {
    title: 'Tuned for speed',
    text: 'Every deployment is tuned per model — batching, quantization, and caching chosen against your latency and throughput targets, then benchmarked before it serves traffic.',
  },
  {
    title: 'Ultimate flexibility',
    text: 'Pay as you go with serverless APIs, optimize further with self-serve deployments, or go bespoke with tailored endpoints. Change options as your workload evolves — no re-architecture.',
  },
  {
    title: 'Seamless scaling',
    text: 'Go from experiment to production without the operational burden. Elastic scaling flexes from single-user testing to sustained, high-volume production deployments.',
  },
]

const DEV_POINTS = [
  {
    title: 'API keys for the fastest path to production',
    text: 'Experiment with curated open models rapidly. Generate API keys, monitor usage and latency, and move to provisioned capacity when you are ready.',
  },
  {
    title: 'Managed endpoints for rapid deployment',
    text: 'Fully managed endpoints tuned per model, with autoscaling that matches capacity to demand.',
  },
  {
    title: 'One environment, teams included',
    text: 'Inference and infrastructure in a single integrated environment, with team access, usage visibility, and cost controls your finance team can read.',
  },
]

const FAQS = [
  {
    q: 'Can I run inference on my own model?',
    a: 'Yes. Choose the Tailored Deployments option and talk to us about your model and requirements — including fine-tuned open models, which can go live in one click from Serverless Fine-Tuning.',
  },
  {
    q: 'What if I want a dedicated instance?',
    a: 'Talk to us about Tailored Deployments. Dedicated capacity is scoped per engagement, with performance targets defined in your agreement.',
  },
  {
    q: 'What optimization profiles are available, and how do I choose?',
    a: 'Self-serve deployments offer two profiles: throughput, optimized for cost and resource efficiency, and responsiveness, optimized for low latency. Start with responsiveness for interactive products and throughput for batch and background workloads.',
  },
  {
    q: 'Which models are available?',
    a: 'A curated catalog of open models across chat, code, embeddings, and vision — plus your own models on request. The catalog grows with demand, so tell us what you need.',
  },
]

export default function ManagedInferencePage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Managed Inference — Inference That Scales | Single Core Labs"
        description="Serve models with low latency and high throughput on SCL Cloud: serverless APIs, self-serve deployments, and tailored endpoints — with your own models welcome."
        keywords="managed inference, serverless inference, model serving, LLM endpoints, SCL Cloud"
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
                SCL Cloud · Managed AI
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
                Inference that scales.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '640px', margin: '0 auto 32px' }}>
                Serve models with low latency and high throughput — with flexible
                deployment options that fit your workload.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to sales</PillCta>
                <Link to="/cloud/overview" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  Cloud overview <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Deployment options */}
        <Section>
          <SectionHead
            kicker="Flexible deployment options"
            heading="The right endpoint for the job."
          />
          <BentoGrid>
            {DEPLOYMENTS.map((d) => (
              <BentoCard
                key={d.title}
                headline={d.title}
                text={d.text}
                href="/contact"
                linkLabel="Talk to sales"
              >
                <p className="scl-card-kicker" style={{ marginTop: '4px' }}>Best for</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {d.best.map((b) => (
                    <li key={b} className="scl-card-text" style={{ fontSize: '14px' }}>• {b}</li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </BentoGrid>
        </Section>

        {/* Model hub */}
        <Section>
          <SectionHead
            kicker="Model hub"
            heading="A curated catalog, plus your own models."
            lede="Pre-configured open models across every major workload — and a clear path for the models you fine-tune or build yourself."
          />
          <BentoGrid>
            {MODEL_GROUPS.map((m) => (
              <BentoCard key={m.title} headline={m.title} text={m.text} span={m.span} />
            ))}
          </BentoGrid>
        </Section>

        {/* Why */}
        <Section>
          <SectionHead
            heading="Performance, flexibility, and scale."
          />
          <BentoGrid>
            {WHY.map((w) => (
              <BentoCard key={w.title} headline={w.title} text={w.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Developer experience */}
        <Section>
          <SectionHead
            kicker="Developer experience"
            heading="Designed for AI developers."
          />
          <BentoGrid>
            {DEV_POINTS.map((d) => (
              <BentoCard key={d.title} headline={d.title} text={d.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHead
            heading="Frequently asked questions."
          />
          <BentoGrid>
            {FAQS.map((f) => (
              <BentoCard key={f.q} headline={f.q} text={f.a} />
            ))}
          </BentoGrid>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
