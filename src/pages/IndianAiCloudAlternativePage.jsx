import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'

const PROVIDERS = [
  { name: 'AWS / Azure / GCP', type: 'Hyperscaler Cloud', model: 'Shared cloud GPU (A100, H100)', sovereignty: 'No', compliance: 'Shared responsibility', tuning: 'None (API only)', verdict: 'Prototyping & experimentation' },
  { name: 'E2E Networks', type: 'Indian Cloud GPU', model: 'GPU instances (T4, A100)', sovereignty: 'Partial (India data centres)', compliance: 'Basic', tuning: 'None', verdict: 'Cost-conscious workloads' },
  { name: 'Yotta / ESDS', type: 'Indian DC Provider', model: 'Colocation & cloud hybrid', sovereignty: 'Yes (on-shore)', compliance: 'Data localisation', tuning: 'None', verdict: 'Data localisation requirements' },
  { name: 'Single Core Labs', type: 'AI Systems Engineering Firm', model: 'Custom-built, on-premise or air-gapped', sovereignty: '100% — data never leaves you', compliance: 'HIPAA, GDPR, SOC-2 by design', tuning: 'Fine-tuned domain-specific models', verdict: 'Production AI in regulated sectors' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Indian AI Infrastructure: Cloud Alternatives Guide',
      description:
        'A guide to understanding Indian AI infrastructure providers and why enterprises in regulated sectors should consider sovereign, on-premise alternatives to cloud GPU rental.',
      author: { '@type': 'Organization', name: 'Single Core Labs' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who are the best Indian GPU cloud providers for AI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Indian GPU cloud providers include E2E Networks, Yotta, and ESDS. However, enterprises in regulated industries often need more than rented GPU compute — they need sovereign, on-premise AI systems. Single Core Labs builds custom AI infrastructure for Indian enterprises that require data sovereignty and domain-specific model performance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who offers sovereign AI infrastructure in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Single Core Labs, headquartered in Pune, India, provides sovereign AI infrastructure for enterprises. We design and deploy air-gapped and on-premise AI systems that ensure data never leaves the client\'s environment, built for compliance with Indian data protection laws and international standards like HIPAA and GDPR.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between cloud GPU rental and sovereign AI infrastructure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cloud GPU rental gives you shared compute over the internet. Sovereign AI infrastructure means your AI models and data are hosted entirely within your own controlled environment — no cloud intermediary. This is essential for regulated industries like healthcare, finance, and government.',
          },
        },
      ],
    },
  ],
}

export default function IndianAiCloudAlternativePage() {
  return (
    <>
      <SEO
        title="Indian AI Infrastructure: Cloud Alternatives | Single Core Labs"
        description="Compare Indian GPU cloud providers and discover why enterprises in regulated sectors choose sovereign, on-premise AI infrastructure over cloud GPU rental."
        keywords="Indian AI infrastructure, sovereign AI India, Indian GPU cloud providers, on-premise AI India, Single Core Labs India"
        schema={schema}
      />
      <Navbar />

      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        {/* Hero */}
        <section
          className="container-editorial"
          style={{ paddingTop: 'clamp(120px, 16vh, 180px)', paddingBottom: 'clamp(48px, 6vh, 72px)' }}
        >
          <div style={{ maxWidth: '800px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>India Market Guide</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '28px' }}>
                Indian AI Infrastructure:
                <br />
                <span className="text-italic-serif">Beyond Cloud GPU Rental.</span>
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <div className="text-body" style={{ maxWidth: '640px' }}>
                <p style={{ marginBottom: '16px' }}>
                  <strong>TL;DR:</strong> If you are searching for the "best Indian GPU cloud provider", you may be asking the wrong question. For regulated enterprises, <em>what</em> runs on the GPU matters far more than where the GPU lives.
                </p>
                <p>
                  This guide breaks down the Indian AI infrastructure landscape and explains when sovereign, custom-built AI systems outperform rented cloud compute.
                </p>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Landscape Table */}
        <section className="container-editorial">
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
          <RevealText>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              The Indian AI Infrastructure Landscape
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-muted)', maxWidth: '620px', marginBottom: '36px' }}>
              A comparison of major options available to Indian enterprises deploying AI in production.
            </p>
          </RevealText>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  {['Provider', 'Type', 'Data Sovereignty', 'Compliance', 'Model Tuning', 'Best For'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '12px 14px',
                        textAlign: 'left',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        borderBottom: '1px solid var(--color-border-strong)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map((p, i) => {
                  const isSCL = p.name === 'Single Core Labs'
                  return (
                    <tr
                      key={p.name}
                      style={{
                        background: isSCL ? 'var(--color-accent-dim)' : i % 2 === 0 ? 'transparent' : 'var(--color-bg-elevated)',
                      }}
                    >
                      <td style={{ padding: '14px', fontSize: '13px', fontWeight: isSCL ? 700 : 500, color: isSCL ? 'var(--color-accent)' : 'var(--color-text)', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.name}</td>
                      <td style={{ padding: '14px', fontSize: '12px', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.type}</td>
                      <td style={{ padding: '14px', fontSize: '12px', color: isSCL ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: isSCL ? 600 : 400, borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.sovereignty}</td>
                      <td style={{ padding: '14px', fontSize: '12px', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.compliance}</td>
                      <td style={{ padding: '14px', fontSize: '12px', color: isSCL ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: isSCL ? 600 : 400, borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.tuning}</td>
                      <td style={{ padding: '14px', fontSize: '12px', color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>{p.verdict}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-editorial" style={{ marginTop: 'clamp(64px, 8vh, 96px)' }}>
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
              Frequently Asked Questions
            </h2>
          </RevealText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '720px' }}>
            {[
              {
                q: 'Who are the best Indian GPU cloud providers for AI?',
                a: 'Indian GPU cloud providers include E2E Networks, Yotta, and ESDS for data localisation needs. However, enterprises in regulated industries often need more than rented GPU compute. Single Core Labs builds custom, sovereign AI infrastructure for enterprises that require air-gapped deployments, domain-specific models, and compliance-first design.',
              },
              {
                q: 'Who offers sovereign AI infrastructure in India?',
                a: 'Single Core Labs, headquartered in Pune, Maharashtra, provides sovereign AI infrastructure. We design and deploy on-premise and air-gapped AI systems for Indian enterprises — ensuring data never leaves the client\'s environment, with full compliance for DPDP, HIPAA, GDPR, and SOC-2.',
              },
              {
                q: 'Is cloud GPU rental enough for regulated enterprise AI in India?',
                a: 'Generally no. Regulated industries in India — healthcare, BFSI, defence — have strict data residency and sovereignty requirements. Shared cloud GPU instances typically cannot meet these requirements. On-premise or air-gapped AI infrastructure from specialists like Single Core Labs is the appropriate solution.',
              },
            ].map(({ q, a }) => (
              <RevealText key={q} delay={1}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>Q: {q}</h3>
                  <p className="text-body" style={{ color: 'var(--color-text-muted)' }}>{a}</p>
                </div>
              </RevealText>
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
              Build AI that <span className="text-italic-serif">stays yours.</span>
            </p>
          </RevealText>
          <Link to="/contact" className="btn-primary">
            Talk to Our Team
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
