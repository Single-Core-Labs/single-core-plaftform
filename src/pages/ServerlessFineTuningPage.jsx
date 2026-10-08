import { useState } from 'react'
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
    title: 'Select your base model',
    text: 'Choose from a curated library of open models. Find the fit for your use case, whether you need lightweight agility or frontier reasoning power.',
  },
  {
    n: '02',
    title: 'Load your dataset',
    text: 'Upload your training data to your isolated environment in standard JSONL or Parquet format.',
  },
  {
    n: '03',
    title: 'Configure your fine-tuning job',
    text: 'Tune the settings with pre-configured defaults built on best practices. Submit your job through the UI, SDK, or API — no clusters to configure.',
  },
  {
    n: '04',
    title: 'Deploy or download your model',
    text: 'Go live in one click with managed inference, or download your weights to deploy anywhere. Your model goes with you.',
  },
]

const FEATURES = [
  {
    title: 'AI-optimized infrastructure',
    text: 'Tune models reliably and cost-effectively on purpose-built AI infrastructure, without managing it. Automatic recovery keeps downtime minimal when hardware blips.',
  },
  {
    title: 'Cost-effective fine-tuning',
    text: 'Spend tracks directly to model progress, not idle machines. Early stopping halts the job and the billing the moment your model stops improving.',
  },
  {
    title: 'No lock-in',
    text: 'Deploy in one click to managed inference, or download raw weights in standard format to host anywhere — your infrastructure or another platform.',
  },
  {
    title: 'Full lineage, zero guesswork',
    text: 'Fine-tuned models carry full lineage back to the exact dataset, config, and eval that produced them. Any run is reproducible and any outcome is auditable.',
  },
  {
    title: 'Observability that travels',
    text: 'Detailed training metrics and audit trails on every job, integrated with your existing observability stack.',
    span: 'wide',
  },
]

const FAQS = [
  {
    q: 'How does token-based/per-job pricing work vs. GPU-hour pricing?',
    a: 'Serverless fine-tuning bills for actual training work — not reserved machines. GPU-hour pricing charges for the entire time a machine is reserved, including setup, idle time, queueing, and failures, so cost depends on infrastructure efficiency you do not control. Per-job pricing ties spend directly to your dataset size and configuration, and early stopping ends the job and the billing the moment your model stops improving.',
  },
  {
    q: 'Can I upload my own training code / custom configs?',
    a: 'Serverless Fine-Tuning is a managed workflow: you choose the base model, dataset, and hyperparameters without writing training infrastructure. If you need fully custom training code, talk to us about a dedicated cloud environment where you manage the stack.',
  },
  {
    q: 'What models are supported?',
    a: 'A curated library of leading open models across chat, code, embeddings, and vision — updated as new open models are released. Tell us what you need.',
  },
  {
    q: 'Can I download my fine-tuned weights (safetensors) and host them elsewhere?',
    a: 'Yes. Download raw weights in standard format and host them anywhere, or deploy in one click to managed inference. Every model carries full lineage, so runs stay reproducible and auditable wherever you run them.',
  },
  {
    q: 'Do I retain the models I fine-tune, or are there restrictions?',
    a: 'You retain them — your fine-tuned models belong to you. Your data trains your models only and is never used to improve shared or third-party models. Training and storage run in an isolated environment, so datasets and weights stay private to your account.',
  },
  {
    q: 'What sets SCL serverless fine-tuning apart from other platforms?',
    a: 'The full journey under one roof — from base model to live endpoint — with no lock-in at the end. Smart defaults mean your team ships a working model without deep ML-ops expertise, and every artifact carries lineage, so you always know what produced what.',
  },
]

function FaqAccordion({ items }) {
  const [open, setOpen] = useState(-1)
  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} style={{ borderTop: '1px solid rgba(255,255,255,0.18)', ...(i === items.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.18)' } : {}) }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '20px 4px',
                textAlign: 'left',
                color: CREAM,
              }}
            >
              <span style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                {f.q}
              </span>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  fontSize: '22px',
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: 'transform 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.65, margin: '0 0 20px', padding: '0 4px', maxWidth: '720px' }}>
                {f.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ServerlessFineTuningPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Serverless Fine-Tuning — Tune It. Deploy It. Own It. | Single Core Labs"
        description="Adapt open models on your own data with SCL Cloud serverless fine-tuning: no clusters to manage, no lock-in, full lineage — deploy in one click or take your weights anywhere."
        keywords="serverless fine-tuning, LoRA, model customization, open models, SCL Cloud"
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
                Tune it. Deploy it. Own it.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '640px', margin: '0 auto 32px' }}>
                Iterate faster with serverless fine-tuning. No infrastructure wrangling.
                No surprise bills. Just better models.
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
        </section>

        {/* How it works */}
        <Section>
          <SectionHead
            kicker="How it works"
            heading="Fine-tuning, simplified."
          />
          <BentoGrid>
            {STEPS.map((s) => (
              <BentoCard key={s.n} kicker={s.n} headline={s.title} text={s.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Features */}
        <Section>
          <SectionHead
            kicker="Features"
            heading="More tuning. Less tooling."
            lede="Spend your time on model behavior — not infrastructure."
          />
          <BentoGrid>
            {FEATURES.map((f) => (
              <BentoCard key={f.title} headline={f.title} text={f.text} span={f.span} />
            ))}
          </BentoGrid>
        </Section>

        {/* Security */}
        <Section>
          <SectionHead
            kicker="Security"
            heading="Your workload data. Your models. Your keys."
            lede="Training and storage run in an isolated environment. Your datasets and weights stay private to your account — bring your own encryption keys, revoke access at any moment, and clear one less blocker with your security and compliance teams."
          />
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHead
            heading="Frequently asked questions."
          />
          <FaqAccordion items={FAQS} />
        </Section>
      </main>
      <Footer />
    </div>
  )
}
