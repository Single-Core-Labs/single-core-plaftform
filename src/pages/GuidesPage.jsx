import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'

const GUIDES = [
  {
    href: '/ai-infrastructure-vs-cloud',
    category: 'Infrastructure',
    title: 'Custom AI Infrastructure vs Traditional Cloud GPUs',
    description:
      'A side-by-side breakdown of bespoke, sovereign AI infrastructure against rented cloud GPU services. Understand the trade-offs in data sovereignty, compliance, cost, and model accuracy.',
    readTime: '6 min read',
  },
  {
    href: '/indian-ai-cloud-market-alternative',
    category: 'Market Guide',
    title: 'Indian AI Infrastructure: Beyond Cloud GPU Rental',
    description:
      'A guide to the Indian AI infrastructure landscape and why enterprises in regulated sectors should consider sovereign, on-premise alternatives to cloud GPU providers.',
    readTime: '5 min read',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Guides — Single Core Labs',
  description: 'In-depth guides on AI infrastructure, sovereign AI, and enterprise AI engineering from Single Core Labs.',
  url: 'https://singlecorelabs.com/guides',
  publisher: { '@type': 'Organization', name: 'Single Core Labs' },
}

export default function GuidesPage() {
  return (
    <>
      <SEO
        title="Guides | Single Core Labs"
        description="In-depth guides on AI infrastructure, sovereign AI, and enterprise AI engineering from Single Core Labs."
        keywords="AI infrastructure guides, sovereign AI guide, enterprise AI engineering, Indian AI market"
        schema={schema}
      />
      <Navbar />

      <main style={{ minHeight: '100vh', paddingBottom: '120px' }}>
        {/* Hero */}
        <section
          className="container-editorial"
          style={{ paddingTop: 'clamp(120px, 16vh, 180px)', paddingBottom: 'clamp(48px, 6vh, 72px)' }}
        >
          <div style={{ maxWidth: '720px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '28px' }}>Resources</p>
            </RevealText>
            <RevealText delay={1}>
              <h1 className="text-display" style={{ marginBottom: '24px' }}>
                Guides
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '520px', color: 'var(--color-text-muted)' }}>
                In-depth explainers on AI infrastructure, sovereign AI, and the decisions that matter for enterprise AI engineering.
              </p>
            </RevealText>
          </div>
        </section>

        {/* Guide Cards */}
        <section className="container-editorial">
          <HorizontalRule style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {GUIDES.map((guide, i) => (
              <RevealText key={guide.href} delay={i + 1}>
                <Link
                  to={guide.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: '24px',
                      padding: 'clamp(28px, 4vh, 40px) 0',
                      borderBottom: '1px solid var(--color-border)',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--color-accent)',
                        }}>
                          {guide.category}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
                          {guide.readTime}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                          marginBottom: '12px',
                          color: 'var(--color-text)',
                        }}
                      >
                        {guide.title}
                      </h2>
                      <p className="text-body" style={{ maxWidth: '640px', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                        {guide.description}
                      </p>
                    </div>
                    <ArrowRight size={20} style={{ color: 'var(--color-text-dim)', flexShrink: 0 }} />
                  </div>
                </Link>
              </RevealText>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
