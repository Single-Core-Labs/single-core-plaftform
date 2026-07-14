import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
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
    color: 'rgba(184, 164, 120, 0.12)',
  },
  {
    id: 'tech',
    icon: Monitor,
    label: 'Tech',
    tagline: 'Ship smarter software with sovereign AI',
    description: 'Agentic coding assistants, automated CI/CD intelligence, and context-aware developer tools that understand your entire tech stack.',
    href: '/solutions/tech',
    color: 'rgba(184, 164, 120, 0.12)',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    label: 'Manufacturing',
    tagline: 'Intelligent automation for Industry 4.0',
    description: 'Predictive maintenance, computer vision quality assurance, supply chain optimization, and digital twin integration for smart manufacturing.',
    href: '/solutions/manufacturing',
    color: 'rgba(184, 164, 120, 0.12)',
  },
  {
    id: 'healthcare',
    icon: SquarePlus,
    label: 'Healthcare',
    tagline: 'AI that understands clinical complexity',
    description: 'EHR-integrated clinical intelligence, medical imaging diagnostics, and HIPAA-compliant NLP pipelines for the most regulated environments.',
    href: '/solutions/healthcare-intelligence',
    color: 'rgba(184, 164, 120, 0.12)',
  },
  {
    id: 'defense',
    icon: Shield,
    label: 'Defense & Government',
    tagline: 'Sovereign AI for national security',
    description: 'Air-gapped LLM deployment, intelligence analysis automation, and secure multi-level classification systems for defense and public sector.',
    href: '/solutions/defense',
    color: 'rgba(184, 164, 120, 0.12)',
  },
]

function TreeBranch({ left, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <svg
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        [left ? 'right' : 'left']: '50%',
        width: '50%',
        height: '100%',
        overflow: 'visible',
      }}
      viewBox={left ? '0 0 200 100' : '0 0 200 100'}
      preserveAspectRatio="none"
    >
      <motion.path
        d={left ? 'M 200 0 L 200 50 L 0 50 L 0 100' : 'M 0 0 L 0 50 L 200 50 L 200 100'}
        fill="none"
        stroke="rgba(184, 164, 120, 0.15)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

function IndustryNode({ industry, index, isLeft }) {
  const nodeRef = useRef(null)
  const inView = useInView(nodeRef, { once: true, margin: '-40px' })

  const branchDelay = 0.3 + index * 0.15
  const nodeDelay = 0.5 + index * 0.15

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        padding: '24px 0',
      }}
    >
      {/* Branch lines */}
      <TreeBranch left={isLeft} delay={branchDelay} />

      {/* Connector dot */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: [0, 1.3, 1] } : {}}
        transition={{ duration: 0.5, delay: nodeDelay - 0.15, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Card */}
      <motion.div
        style={{
          width: 'calc(50% - 40px)',
          marginLeft: isLeft ? '0' : '40px',
          marginRight: isLeft ? '40px' : '0',
          padding: '32px',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-card)',
          transition: 'all 0.35s ease',
        }}
        className="industry-card"
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: nodeDelay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(184, 164, 120, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
            flexShrink: 0,
          }}>
            <industry.icon size={22} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.2 }}>
                {industry.label}
              </h3>
              <span className="text-eyebrow" style={{ fontSize: '11px' }}>
                {industry.tagline}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              {industry.description}
            </p>
            <Link
              to={industry.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-accent)',
                textDecoration: 'none',
                transition: 'gap 0.3s ease',
              }}
              className="industry-cta"
            >
              Explore solutions
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SolutionsPage() {
  const treeRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: treeRef,
    offset: ['start 55%', 'end 30%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

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
            paddingBottom: 'clamp(60px, 10vh, 100px)',
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
              <p className="text-body" style={{ maxWidth: '640px', marginInline: 'auto', fontSize: 'clamp(16px, 1.2vw, 20px)', color: 'var(--color-text)', marginBottom: '40px' }}>
                From finance to defense, we engineer sovereign AI systems that respect your data,
                understand your domain, and deploy on your terms.
              </p>
            </RevealText>
          </div>
        </section>

        {/* ──────── Industry Tree ──────── */}
        <section ref={treeRef} style={{ position: 'relative', paddingBottom: '100px' }}>
          <div className="container-editorial" style={{ position: 'relative' }}>

            {/* Root node */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                borderRadius: '100px',
                border: '1px solid var(--color-accent)',
                background: 'rgba(184, 164, 120, 0.06)',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text)', letterSpacing: '0.02em' }}>
                  Single Core Labs
                </span>
              </div>
            </motion.div>

            {/* Spine (vertical trunk) */}
            <div style={{ position: 'relative', minHeight: '800px' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: '1px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, transparent, rgba(225,224,204,0.2) 8%, rgba(225,224,204,0.2) 92%, transparent)',
                  transform: 'translateX(-50%)',
                  scaleY,
                  originY: 0,
                }}
              />

              {/* Branch nodes alternating left/right */}
              <div style={{ position: 'relative' }}>
                {INDUSTRIES.map((industry, i) => (
                  <IndustryNode
                    key={industry.id}
                    industry={industry}
                    index={i}
                    isLeft={i % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>

          <style>{`
            .industry-card:hover {
              border-color: var(--color-accent) !important;
              background: var(--color-bg-elevated) !important;
            }
            .industry-card:hover .industry-cta {
              gap: 10px !important;
            }
          `}</style>
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
