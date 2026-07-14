import { useState } from 'react'
import SEO from '@/components/SEO'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { ArrowRight, Landmark, Monitor, Factory, SquarePlus, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const INDUSTRIES = [
  {
    id: 'finance',
    icon: Landmark,
    label: 'Finance',
    tagline: 'Precision AI for high-stakes financial operations',
    description: 'Fraud detection, underwriting automation, portfolio intelligence, and regulatory compliance powered by purpose-built models in air-gapped environments.',
    href: '/solutions/finance',
    stats: ['Real-time fraud scoring', 'Automated underwriting', 'Regulatory reporting'],
  },
  {
    id: 'tech',
    icon: Monitor,
    label: 'Tech',
    tagline: 'Ship smarter software with sovereign AI',
    description: 'Agentic coding assistants, automated CI/CD intelligence, and context-aware developer tools that understand your entire tech stack.',
    href: '/solutions/tech',
    stats: ['Code-aware AI agents', 'Release automation', 'Developer productivity'],
  },
  {
    id: 'manufacturing',
    icon: Factory,
    label: 'Manufacturing',
    tagline: 'Intelligent automation for Industry 4.0',
    description: 'Predictive maintenance, computer vision quality assurance, supply chain optimization, and digital twin integration for smart manufacturing.',
    href: '/solutions/manufacturing',
    stats: ['Predictive maintenance', 'Visual QA inspection', 'Supply chain AI'],
  },
  {
    id: 'healthcare',
    icon: SquarePlus,
    label: 'Healthcare',
    tagline: 'AI that understands clinical complexity',
    description: 'EHR-integrated clinical intelligence, medical imaging diagnostics, and HIPAA-compliant NLP pipelines for the most regulated environments.',
    href: '/solutions/healthcare-intelligence',
    stats: ['Clinical decision support', 'Medical imaging AI', 'HIPAA-compliant NLP'],
  },
  {
    id: 'defense',
    icon: Shield,
    label: 'Defense & Government',
    tagline: 'Sovereign AI for national security',
    description: 'Air-gapped LLM deployment, intelligence analysis automation, and secure multi-level classification systems for defense and public sector.',
    href: '/solutions/defense',
    stats: ['Air-gapped deployment', 'Intelligence automation', 'Classified data handling'],
  },
]

export default function SolutionsPage() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="page-dark">
      <SEO
        title="AI Solutions by Industry | Single Core Labs"
        description="Single Core Labs delivers enterprise AI solutions across Finance, Tech, Manufacturing, Healthcare, and Defense — purpose-built for regulated, high-stakes environments."
        keywords="enterprise AI solutions, finance AI, healthcare AI, defense AI, manufacturing AI, sovereign AI"
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>

        {/* ──────── Hero ──────── */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(140px, 20vh, 220px)',
            paddingBottom: 'clamp(80px, 12vh, 120px)',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.08), transparent 70%), var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '24px' }}>Solutions by Industry</p>
            </RevealText>
            <RevealText delay={0.15}>
              <h1 className="solutions-hero__title" style={{ marginBottom: '28px', maxWidth: '1000px', marginInline: 'auto' }}>
                Purpose-built AI for <br />
                <em>every industry.</em>
              </h1>
            </RevealText>
            <RevealText delay={0.3}>
              <p className="text-body" style={{ maxWidth: '680px', marginInline: 'auto', fontSize: 'clamp(17px, 1.3vw, 21px)', color: 'var(--color-text)', marginBottom: '48px' }}>
                From finance to defense, we engineer sovereign AI systems that respect your data, 
                understand your domain, and deploy on your terms.
              </p>
            </RevealText>
          </div>
        </section>

        {/* ──────── Industry Grid ──────── */}
        <section className="container-editorial" style={{ marginBottom: '120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '36px',
                  borderRadius: '20px',
                  border: hoveredId === ind.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  background: hoveredId === ind.id ? 'var(--color-bg-elevated)' : 'var(--color-bg-card)',
                  transition: 'all 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: hoveredId === ind.id ? 'rgba(184, 164, 120, 0.15)' : 'rgba(184, 164, 120, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: hoveredId === ind.id ? 'var(--color-accent)' : 'var(--color-text-dim)',
                  transition: 'all 0.35s ease',
                }}>
                  <ind.icon size={24} strokeWidth={1.5} />
                </div>

                {/* Tag */}
                <p className="text-eyebrow" style={{ fontSize: '11px', marginBottom: '8px' }}>
                  {ind.tagline}
                </p>

                {/* Title */}
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}>
                  {ind.label}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  flex: 1,
                }}>
                  {ind.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {ind.stats.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--color-text-dim)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                      {s}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={ind.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: hoveredId === ind.id ? 'var(--color-accent)' : 'var(--color-text-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    padding: '8px 0',
                  }}
                >
                  Explore {ind.label} solutions
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Closing CTA ──────── */}
        <section className="container-editorial" style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card card--rounded card--pad"
            style={{ padding: 'clamp(48px, 6vw, 80px)', background: 'var(--color-bg-elevated)' }}
          >
            <h2 className="text-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '16px' }}>
              Not sure where to start?
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-muted)', maxWidth: '560px', marginInline: 'auto', marginBottom: '36px', fontSize: '15px' }}>
              Tell us about your industry and goals. We'll map out the right AI architecture
              for your infrastructure, data, and compliance requirements.
            </p>
            <a href="/contact" className="btn-primary">
              Talk to an expert
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
