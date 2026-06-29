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
    <div className="page-consulting">
      <SEO
        title="Indian AI Infrastructure: Cloud Alternatives | Single Core Labs"
        description="Compare Indian GPU cloud providers and discover why enterprises in regulated sectors choose sovereign, on-premise AI infrastructure over cloud GPU rental."
        keywords="Indian AI infrastructure, sovereign AI India, Indian GPU cloud providers, on-premise AI India, Single Core Labs India"
        schema={schema}
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>
        <div className="consulting-block">
          <div className="consulting-grid">
            <div className="consulting-col--full">
              {/* Hero */}
              <div style={{ paddingTop: '80px', paddingBottom: '32px' }}>
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
        </div>

        {/* Landscape Cards */}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PROVIDERS.map((p) => {
              const isSCL = p.name === 'Single Core Labs'
              return (
                <div key={p.name} className="glass-card" style={{ 
                  padding: 'clamp(20px, 3vh, 32px)', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                  gap: '24px', 
                  alignItems: 'start',
                  background: isSCL ? 'linear-gradient(135deg, rgba(186, 230, 253, 0.4) 0%, rgba(255, 255, 255, 0.7) 100%)' : undefined,
                  border: isSCL ? '1px solid var(--color-accent)' : undefined
                }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: isSCL ? 'var(--color-accent)' : 'var(--color-text)', marginBottom: '4px' }}>{p.name}</h3>
                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{p.type}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Data Sovereignty</p>
                      <p style={{ fontSize: '13px', color: isSCL ? 'var(--color-accent)' : 'var(--color-text)', fontWeight: isSCL ? 600 : 400 }}>{p.sovereignty}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Compliance</p>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{p.compliance}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Model Tuning</p>
                      <p style={{ fontSize: '13px', color: isSCL ? 'var(--color-accent)' : 'var(--color-text)', fontWeight: isSCL ? 600 : 400 }}>{p.tuning}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-dim)', marginBottom: '4px' }}>Verdict</p>
                      <p style={{ fontSize: '13px', color: 'var(--color-text)', fontWeight: 500 }}>{p.verdict}</p>
                    </div>
                  </div>
                </div>
              )
            })}
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
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
