import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import SEO from '@/components/SEO'

// ─── SECTIONS ───────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      aria-labelledby="research-heading"
      style={{
        position: 'relative',
        paddingTop: 'clamp(110px, 15vh, 170px)',
        paddingBottom: 'clamp(32px, 5vh, 56px)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 'clamp(240px, 40vw, 560px)',
          height: 'clamp(240px, 40vw, 560px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,105,92,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Research</p>
        </RevealText>
        <RevealText delay={1}>
          <h1
            id="research-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '820px',
              marginBottom: '20px',
            }}
          >
            Working at the{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
              }}
            >
              frontier.
            </span>
          </h1>
        </RevealText>
        <RevealText delay={2}>
          <p
            className="text-body"
            style={{
              maxWidth: '540px',
              fontSize: 'clamp(15px, 1.2vw, 17px)',
            }}
          >
            Our team solves complex scientific challenges in AI inference, agentic systems,
            and language model architecture — translating that work into real-world enterprise impact.
          </p>
        </RevealText>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section style={{ padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Collaborate</p>
        </RevealText>
        <RevealText delay={1}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '720px',
              marginBottom: '20px',
            }}
          >
            Interested in our{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              work?
            </span>
          </h2>
        </RevealText>
        <RevealText delay={2}>
          <p
            className="text-body"
            style={{ maxWidth: '460px', marginBottom: '28px' }}
          >
            We're open to research collaborations, preprint discussions, and
            partnering with enterprises that want to push AI systems to their limits.
          </p>
        </RevealText>
        <RevealText delay={3}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn-primary">
              Get in Touch
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/blog"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              Read Our Blog
              <ArrowRight size={13} />
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: 'Single Core Labs',
    url: 'https://singlecorelabs.com/research',
    description:
      'Single Core Labs research — LLMOps, inference optimisation, agentic systems, and sovereign AI infrastructure.',
  }

  return (
    <>
      <SEO
        title="Research | Single Core Labs"
        description="Frontier research in LLM inference optimisation, agentic systems, and sovereign AI infrastructure by Single Core Labs."
        keywords="LLM inference, semantic cache, agentic AI research, LLMOps, AI systems engineering, Single Core Labs"
        schema={schema}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
