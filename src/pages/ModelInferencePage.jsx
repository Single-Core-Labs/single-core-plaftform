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

const STEPS = [
  {
    n: '01',
    title: 'Publish an endpoint',
    text: 'Start from a curated model or bring your own fine-tuned weights. One click generates a high-availability API — auth and request normalization handled on a single surface.',
  },
  {
    n: '02',
    title: 'Route intelligently',
    text: 'Requests fan out across replicas with queue-aware routing. Shared KV-cache reuse skips redundant context work, so repeat prompts and long conversations stay fast.',
  },
  {
    n: '03',
    title: 'Execute at speed',
    text: 'Models run on high-performance GPUs with tuned batching, quantization, and caching per model. Capacity scales with queue depth — no manual resizing during traffic spikes.',
  },
  {
    n: '04',
    title: 'Deliver and observe',
    text: 'Tokens stream back with low time-to-first-token. Latency, throughput, and error metrics live next to the endpoint — no third-party observability stack required.',
  },
]

const BENEFITS = [
  {
    title: 'Low latency, high throughput',
    text: 'Continuous batching, smart caching, and per-model tuning cut time-to-first-token and multiply tokens per second versus a naive deployment.',
  },
  {
    title: 'Zero-ops serving',
    text: 'No clusters to nurse. Autoscaling, health checks, and rollouts are managed — your team ships prompts and products, not YAML.',
  },
  {
    title: 'One-click APIs',
    text: 'Every model gets a clean HTTPS endpoint with keys, versioning, and usage tracking. Integrate in minutes from any stack.',
  },
  {
    title: 'Pricing that fits the stage',
    text: 'Pay per token while experimenting, switch to provisioned throughput with SLA backing when production demands it.',
  },
]

const GLANCE = [
  { k: 'Who it’s for', v: 'App developers, startups, enterprises serving LLMs to users' },
  { k: 'Setup time', v: 'Instant — pick a model or upload weights, get an API' },
  { k: 'Scaling', v: 'Automatic, queue-based autoscaling across replicas' },
  { k: 'Models', v: 'Curated open models + bring-your-own fine-tuned weights' },
  { k: 'Optimizations', v: 'Batched execution · quantization · KV-cache reuse' },
  { k: 'Billing', v: 'Per-token for exploration, provisioned throughput for production' },
]

function InferenceDiagram() {
  const stages = [
    { title: 'Publish', sub: 'Model → API', tools: 'Curated · BYO' },
    { title: 'Route', sub: 'Smart dispatch', tools: 'Queue-aware · Cache' },
    { title: 'Execute', sub: 'GPU serving', tools: 'Batching · Quant' },
    { title: 'Deliver', sub: 'Stream + metrics', tools: 'SSE · Dashboards' },
  ]
  return (
    <div
      role="img"
      aria-label="Model inference flow: publish an endpoint, route intelligently, execute on GPUs, deliver streamed tokens."
      style={{
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
        padding: 'clamp(20px, 3vw, 40px)',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch', minWidth: '720px' }}>
        {stages.map((s, i) => (
          <div key={s.title} style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            <div
              style={{
                flex: 1,
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '14px',
                background: 'rgba(0,0,0,0.55)',
                padding: '20px 18px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#4ade80',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Stage {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ color: CREAM, fontSize: '16px', fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>
                {s.title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 12px' }}>{s.sub}</p>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {s.tools}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', flexShrink: 0 }} aria-hidden="true">
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                  <path d="M1 8h24M18 2.5 24.5 8 18 13.5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '18px',
          borderRadius: '12px',
          border: '1px dashed rgba(74,222,128,0.4)',
          background: 'rgba(74,222,128,0.06)',
          padding: '14px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 24px',
          alignItems: 'center',
          minWidth: '720px',
        }}
      >
        <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          SCL managed inference
        </span>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>
          Your app calls one API — routing, scaling, and observability stay behind it. See live options on SCL Cloud managed inference.
        </span>
      </div>
    </div>
  )
}

export default function ModelInferencePage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Model Inference — Serverless AI Inference at Speed | Single Core Labs"
        description="Serve ambitious models without infrastructure overhead. One-click APIs, intelligent routing, GPU execution with autoscaling, and streamed low-latency delivery on SCL Cloud."
        keywords="model inference, serverless inference, LLM serving, autoscaling, time to first token, SCL Cloud"
      />

      <main>
        <section style={{ background: '#000', padding: 'clamp(120px, 14vh, 160px) clamp(20px, 4vw, 60px) clamp(48px, 6vh, 80px)' }}>
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
                Solutions · Model Inference
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
                Serverless inference at extraordinary speed.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '660px', margin: '0 auto 32px' }}>
                Scale ambitious models without infrastructure overhead. Publish an API in
                clicks, get ultra-low latency and high throughput — and stay focused
                on the product, not operations.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to us</PillCta>
                <Link to="/cloud/managed-inference" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  See managed inference <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealText>
          </div>
        </section>

        <Section>
          <span id="how" style={{ scrollMarginTop: '90px' }} />
          <SectionHead
            kicker="Solution architecture"
            heading="From weights to streamed tokens in four steps."
            lede="One managed path handles publishing, routing, execution, and delivery — with metrics visible next to every endpoint."
          />
          <InferenceDiagram />
        </Section>

        <Section>
          <SectionHead
            kicker="How it works"
            heading="Zero-ops inference, end to end."
          />
          <BentoGrid>
            {STEPS.map((s) => (
              <BentoCard key={s.n} kicker={s.n} headline={s.title} text={s.text} />
            ))}
          </BentoGrid>
        </Section>

        <Section>
          <SectionHead
            kicker="Why SCL Cloud"
            heading="Efficiency that fuels innovation."
          />
          <BentoGrid>
            {BENEFITS.map((b) => (
              <BentoCard key={b.title} headline={b.title} text={b.text} />
            ))}
          </BentoGrid>
        </Section>

        <Section>
          <SectionHead heading="Managed inference at a glance." />
          <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', overflow: 'hidden' }}>
            {GLANCE.map((row, i) => (
              <div
                key={row.k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 240px) 1fr',
                  gap: '16px',
                  padding: '16px 22px',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', fontWeight: 600 }}>{row.k}</span>
                <span style={{ color: CREAM, fontSize: '14px', lineHeight: 1.5 }}>{row.v}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '14px' }}>
            Prefer to run your own clusters? SCL Cloud VMs remain available for fully custom serving stacks.
          </p>
        </Section>

        <Section>
          <SectionHead heading="Complete the lifecycle." />
          <BentoGrid>
            <BentoCard
              headline="Data Prep"
              text="Start with clean, versioned datasets purpose-built for training."
              href="/solutions/data-prep"
              linkLabel="Explore data prep"
            />
            <BentoCard
              headline="Model Training"
              text="Train and fine-tune on managed clusters, then promote straight to serving."
              href="/solutions/model-training"
              linkLabel="Explore training"
            />
            <BentoCard
              headline="SCL Managed Inference"
              text="See live deployment options — serverless, self-serve, and tailored endpoints."
              href="/cloud/managed-inference"
              linkLabel="Open managed inference"
            />
          </BentoGrid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(28px, 4vw, 48px)' }}>
            <PillCta to="/contact">Serve your model with us</PillCta>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
