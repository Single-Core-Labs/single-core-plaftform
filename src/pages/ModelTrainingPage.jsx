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
    title: 'Provision clusters in minutes',
    text: 'Launch GPU clusters on managed Kubernetes or managed Slurm without hand-tuning drivers, fabrics, or schedulers. Images arrive ready for PyTorch, Ray, and Kubeflow so first jobs submit the same day.',
  },
  {
    n: '02',
    title: 'Place jobs topology-aware',
    text: 'The scheduler maps distributed jobs to the best node topology for your parallelism strategy. Interrupted jobs re-queue automatically instead of dying at 3 AM.',
  },
  {
    n: '03',
    title: 'Stay up through failures',
    text: 'Cluster health is monitored continuously. Bad nodes are swapped for hot spares and jobs resume from checkpoints — multi-day runs finish without babysitting.',
  },
  {
    n: '04',
    title: 'Run Slurm your way',
    text: 'Already on Slurm? Managed Slurm clusters arrive pre-configured with workload manager and job scheduler, so existing HPC scripts and habits carry over unchanged.',
  },
]

const BENEFITS = [
  {
    title: 'Never lose a run to hardware',
    text: 'Automatic failure detection, node replacement, and checkpoint resume mean a dead GPU costs you minutes — not a week of training.',
  },
  {
    title: 'Ship experiments, not tickets',
    text: 'Reproducible environments via CLI or Terraform. Spin up NGC-ready stacks in minutes and keep researchers iterating instead of waiting on ops.',
  },
  {
    title: 'See everything in one place',
    text: 'Dataset ingress, job status, and fleet health from a single command center. Know which run is where, what it costs, and what finished while you slept.',
  },
  {
    title: 'Scale with confidence',
    text: 'Near-linear scaling to thousands of GPUs on reference architectures with high-bandwidth fabrics — the same setup that trains 7B models stretches to frontier-scale runs.',
  },
]

const GLANCE = [
  { k: 'Who it’s for', v: 'ML teams, startups scaling past single-node, enterprises running frontier workloads' },
  { k: 'Setup time', v: 'Minutes — managed Kubernetes or managed Slurm, drivers included' },
  { k: 'Scaling', v: 'To thousands of GPUs with autoscaling and self-healing clusters' },
  { k: 'Frameworks', v: 'PyTorch · Ray · Kubeflow · Slurm workloads' },
  { k: 'Data ingress', v: 'S3-compatible object store + high-performance block and shared storage' },
  { k: 'Operability', v: 'Health monitoring, checkpoint resume, single-pane fleet visibility' },
]

function TrainingDiagram() {
  const stages = [
    { title: 'Provision', sub: 'GPU clusters', tools: 'K8s · Slurm' },
    { title: 'Distribute', sub: 'Topology-aware', tools: 'PyTorch · Ray' },
    { title: 'Recover', sub: 'Self-healing', tools: 'Hot spares · Resume' },
    { title: 'Observe', sub: 'Track & govern', tools: 'Jobs · Health · Cost' },
  ]
  return (
    <div
      role="img"
      aria-label="Model training flow: provision clusters, distribute jobs, recover automatically, observe everything."
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
          SCL Cloud foundation
        </span>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>
          GPU fleet + high-bandwidth fabric + shared storage under every run — datasets are ready the moment training starts.
        </span>
      </div>
    </div>
  )
}

export default function ModelTrainingPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Model Training — Train Faster at Scale | Single Core Labs"
        description="Managed Kubernetes and Slurm for distributed training on SCL Cloud. Rapid provisioning, topology-aware scheduling, self-healing clusters, and full fleet visibility."
        keywords="model training, distributed training, managed Kubernetes, Slurm, GPU clusters, PyTorch, Ray"
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
                Solutions · Model Training
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
                Train faster, scale without the ops burden.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '660px', margin: '0 auto 32px' }}>
                We handle provisioning, placement, and failover — you focus on the model.
                Managed orchestration on SCL Cloud keeps large runs efficient and reliable
                from first experiment to thousand-GPU training.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to us</PillCta>
                <a href="#how" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  How training works <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealText>
          </div>
        </section>

        <Section>
          <span id="how" style={{ scrollMarginTop: '90px' }} />
          <SectionHead
            kicker="Solution architecture"
            heading="Managed training, from cluster to checkpoint."
            lede="Curated datasets stream in from SCL storage, jobs land on the right topology automatically, and failures heal without human intervention."
          />
          <TrainingDiagram />
        </Section>

        <Section>
          <SectionHead
            kicker="How it works"
            heading="Orchestration that disappears into the background."
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
            heading="Infrastructure that turns training into an advantage."
          />
          <BentoGrid>
            {BENEFITS.map((b) => (
              <BentoCard key={b.title} headline={b.title} text={b.text} />
            ))}
          </BentoGrid>
        </Section>

        <Section>
          <SectionHead heading="Managed training at a glance." />
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
        </Section>

        <Section>
          <SectionHead heading="Keep the pipeline moving." />
          <BentoGrid>
            <BentoCard
              headline="Data Prep"
              text="Feed training with clean, versioned datasets built on the same storage layer."
              href="/solutions/data-prep"
              linkLabel="Explore data prep"
            />
            <BentoCard
              headline="Model Inference"
              text="Serve what you train — low-latency endpoints with autoscaling built in."
              href="/solutions/model-inference"
              linkLabel="Explore inference"
            />
          </BentoGrid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(28px, 4vw, 48px)' }}>
            <PillCta to="/contact">Start training with us</PillCta>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
