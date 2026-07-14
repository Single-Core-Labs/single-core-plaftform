import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ArrowRight, Check, X } from 'lucide-react'
import SEO from '@/components/SEO'

const COMPARISON = [
  {
    dimension: 'Architecture',
    cloud: 'Shared, multi-tenant compute clusters rented by the hour.',
    custom: 'Bespoke, single-tenant systems designed around your exact workflows and data topology.',
  },
  {
    dimension: 'Data Sovereignty',
    cloud: 'Data leaves your premises and transits third-party cloud providers.',
    custom: 'Full air-gapped or on-premise deployment. Data never leaves your servers.',
  },
  {
    dimension: 'Compliance',
    cloud: 'Shared responsibility model. You manage your layer.',
    custom: 'Compliance-first design for HIPAA, GDPR, SOC-2 baked in from day one.',
  },
  {
    dimension: 'Model Tuning',
    cloud: 'Generic foundational models accessed via API.',
    custom: 'Fine-tuned, domain-specific models trained on your proprietary data for higher accuracy.',
  },
  {
    dimension: 'Cost Model',
    cloud: 'Unpredictable per-hour GPU billing that scales with usage.',
    custom: 'Fixed-scope engineering engagement. Predictable total cost of ownership.',
  },
  {
    dimension: 'Ongoing Support',
    cloud: 'Ticket-based vendor support with no domain context.',
    custom: 'Embedded engineers who continuously monitor, iterate, and optimise your system.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Custom AI Infrastructure vs Traditional Cloud GPUs',
      description:
        'A detailed comparison of custom, sovereign AI infrastructure against rented cloud GPU services. Understand the trade-offs between data sovereignty, compliance, cost, and model quality.',
      author: { '@type': 'Organization', name: 'Single Core Labs' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between custom AI infrastructure and cloud GPU rental?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cloud GPU rental provides shared compute instances from providers like AWS or GCP. Custom AI infrastructure means your AI systems are purpose-built and deployed in your own environment — on-premise or air-gapped — with models fine-tuned on your data, ensuring full data sovereignty and compliance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why would an enterprise choose custom AI infrastructure over cloud GPUs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Enterprises in regulated industries (healthcare, finance, defence) choose custom AI infrastructure for data sovereignty, regulatory compliance (HIPAA, GDPR), and higher model accuracy through fine-tuning on proprietary data. Cloud GPUs are suitable for prototyping but often fall short for production-grade regulated AI.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Single Core Labs approach AI infrastructure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Single Core Labs is an AI systems engineering firm, not a cloud provider. We design, deploy, and operate custom sovereign AI infrastructure — including air-gapped deployments — tailored to your enterprise\'s specific regulatory, performance, and privacy requirements.',
          },
        },
      ],
    },
  ],
}

export default function AiVsCloudPage() {
  return (
    <div className="page-dark">
      <SEO
        title="Custom AI Infrastructure vs Cloud GPUs | Single Core Labs"
        description="Compare custom, sovereign AI infrastructure against traditional cloud GPU rental. Learn the trade-offs in data sovereignty, compliance, cost, and model accuracy."
        keywords="custom AI infrastructure, sovereign AI, cloud GPU comparison, air-gapped AI deployment, enterprise AI vs cloud"
        schema={schema}
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>
        <div style={{ paddingTop: '80px', paddingBottom: '32px' }}>
          <div style={{ maxWidth: '800px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Deep Dive</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Custom AI Infrastructure
                <br />
                vs <span className="text-italic-serif">Traditional Cloud GPUs.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <div className="text-body" style={{ maxWidth: '600px' }}>
                <p style={{ marginBottom: '16px' }}>
                  <strong>TL;DR:</strong> Cloud GPUs are convenient for experimentation. Custom, sovereign AI infrastructure is what regulated enterprises actually need in production.
                </p>
                <p>
                  Single Core Labs is an AI systems engineering firm. We build custom AI infrastructure — not rent cloud GPU time. Here is an honest breakdown of the trade-offs.
                </p>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Comparison Cards */}
        <section className="container-editorial">
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />

          <RevealText>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              Side-by-Side Comparison
            </h2>
          </RevealText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {COMPARISON.map((row) => (
              <div key={row.dimension} className="card card--rounded card--pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '8px' }}>{row.dimension}</h3>
                  <div style={{ height: '2px', width: '24px', background: 'var(--color-accent-dim)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <X size={12} /> Rented Cloud GPUs
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.cloud}</p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={12} /> Custom AI Infrastructure
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: 1.6, fontWeight: 500 }}>{row.custom}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial" style={{ marginTop: 'clamp(64px, 8vh, 96px)' }}>
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
          <RevealText>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: '640px',
                marginBottom: '28px',
              }}
            >
              Ready to move beyond <span className="text-italic-serif">rented compute?</span>
            </p>
          </RevealText>
          <Link to="/contact" className="btn-primary">
            Talk to Our Team
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
