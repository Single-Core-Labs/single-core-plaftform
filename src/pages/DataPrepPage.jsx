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
    title: 'Ingest & Land',
    text: 'Pull raw data from object stores, databases, and APIs straight into high-throughput SCL Cloud storage. Parallel loaders skip slow staging layers so terabytes land in minutes, not hours.',
  },
  {
    n: '02',
    title: 'Profile & Clean',
    text: 'Catch bad data before it poisons training. Distributed quality jobs normalize encodings, strip markup, deduplicate records, and redact PII — with a full audit trail for compliance.',
  },
  {
    n: '03',
    title: 'Transform & Structure',
    text: 'Run heavy transforms on SCL managed Kubernetes with Spark or Ray. Shared volumes mount directly into pods for high-speed I/O — tokenization, chunking, MinHash dedup, and conversion to Parquet or WebDataset at scale.',
  },
  {
    n: '04',
    title: 'Validate & Publish',
    text: 'Validate with notebook checks, then publish versioned, training-ready datasets. Compute and storage sit together, so training jobs stream data instantly with zero copying.',
  },
]

const BENEFITS = [
  {
    title: 'No I/O bottlenecks',
    text: 'Petabyte-scale shared storage with hundreds of GB/s aggregate bandwidth keeps GPUs saturated during preprocessing and checkpointing — no starving expensive compute.',
  },
  {
    title: 'Faster data engineering',
    text: 'Spark, Ray, and Kafka run natively on SCL Kubernetes. Burst to GPU instances for tokenization and embedding jobs that would crawl on CPU-only clusters.',
  },
  {
    title: 'Scale without surprise fees',
    text: 'No ingress or egress charges. Move data between stages freely and budget with confidence as volumes grow from gigabytes to petabytes.',
  },
  {
    title: 'Enterprise-grade governance',
    text: 'Encryption at rest and in transit, snapshots, versioning, and role-based access. Every transform is reproducible — re-run any dataset build from its recipe.',
  },
]

const GLANCE = [
  { k: 'Who it’s for', v: 'Data engineers, ML engineers, platform teams' },
  { k: 'Setup time', v: 'Minutes — provision storage + compute from one console' },
  { k: 'Scaling', v: 'Distributed by default across storage and compute' },
  { k: 'Storage', v: 'Shared volumes (multi-node NFS), block volumes, S3-compatible object store' },
  { k: 'Compute', v: 'Managed Kubernetes · Spark / Ray · GPU-accelerated tokenization' },
  { k: 'Formats out', v: 'Parquet, WebDataset, TFRecords, JSONL — versioned and ready for training' },
  { k: 'Data transfer fees', v: 'Zero ingress / egress within SCL Cloud' },
]

function PipelineDiagram() {
  const stages = [
    { title: 'Ingest & Land', sub: 'S3 · APIs · DBs', tools: 'rclone · Airbyte · NiFi' },
    { title: 'Profile & Clean', sub: 'Quality · Dedup · PII', tools: 'Great Expectations' },
    { title: 'Transform & Structure', sub: 'Spark · Ray · GPUs', tools: 'Parquet · WebDataset' },
    { title: 'Validate & Publish', sub: 'Checks · Versioning', tools: 'Jupyter · Registry' },
  ]
  return (
    <div
      role="img"
      aria-label="Data preparation pipeline: Ingest and Land, Profile and Clean, Transform and Structure, Validate and Publish, all on SCL Cloud storage and compute."
      style={{
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
        padding: 'clamp(20px, 3vw, 40px)',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', minWidth: '720px' }}>
        {stages.map((s, i) => (
          <div key={s.title} style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            <div
              style={{
                flex: 1,
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '14px',
                background: 'rgba(0,0,0,0.55)',
                padding: '20px 18px',
                position: 'relative',
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
          Shared storage + managed Kubernetes sit under every stage — data streams straight into training with zero copies.
        </span>
      </div>
    </div>
  )
}

export default function DataPrepPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Data Prep — Prepare Training Data at Scale | Single Core Labs"
        description="Ingest, clean, transform, and publish training-ready datasets on SCL Cloud. High-throughput storage, managed Spark/Ray, GPU tokenization, and zero transfer fees."
        keywords="data preparation, data pipeline, Spark, Ray, tokenization, Parquet, WebDataset, SCL Cloud"
      />

      <main>
        {/* Hero */}
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
                Solutions · Data Prep
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
                Prepare your data at the speed of thought.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '660px', margin: '0 auto 32px' }}>
                Don’t let messy pipelines bottleneck ambitious models. SCL Cloud gives you
                high-throughput storage and elastic compute in one place — so raw data
                becomes training-ready datasets fast, with no hidden transfer fees.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to us</PillCta>
                <a href="#pipeline" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  See the pipeline <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Diagram */}
        <Section>
          <span id="pipeline" style={{ scrollMarginTop: '90px' }} />
          <SectionHead
            kicker="Solution architecture"
            heading="One pipeline, from raw sources to training-ready data."
            lede="Every stage reads and writes to the same SCL Cloud storage layer. Nothing gets copied between silos — validated datasets stream directly into training."
          />
          <PipelineDiagram />
        </Section>

        {/* Steps */}
        <Section>
          <SectionHead
            kicker="How it works"
            heading="Optimize every stage of your data pipeline."
          />
          <BentoGrid>
            {STEPS.map((s) => (
              <BentoCard key={s.n} kicker={s.n} headline={s.title} text={s.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Benefits */}
        <Section>
          <SectionHead
            kicker="Why SCL Cloud"
            heading="Infrastructure built for data preparation."
          />
          <BentoGrid>
            {BENEFITS.map((b) => (
              <BentoCard key={b.title} headline={b.title} text={b.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* At a glance */}
        <Section>
          <SectionHead heading="Data prep at a glance." />
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
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

        {/* Related */}
        <Section>
          <SectionHead heading="What’s next after clean data?" />
          <BentoGrid>
            <BentoCard
              headline="Model Training"
              text="Stream curated datasets straight into distributed training jobs — no export, no re-upload."
              href="/solutions/model-training"
              linkLabel="Explore training"
            />
            <BentoCard
              headline="Model Inference"
              text="Serve the models you trained on clean data with low-latency, autoscaled endpoints."
              href="/solutions/model-inference"
              linkLabel="Explore inference"
            />
          </BentoGrid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(28px, 4vw, 48px)' }}>
            <PillCta to="/contact">Start your data pipeline</PillCta>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
