import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, FileText, Calendar } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D } from '@/components/ScrollScene'
import SEO from '@/components/SEO'

// ─── DATA ───────────────────────────────────────────────────────────────────

const FEATURED_PAPER = {
  id: 'semantic-cache',
  date: 'June 2026',
  badge: 'Preprint',
  tags: ['LLMOps', 'Inference', 'Systems'],
  title: 'SemanticCache: Reducing Large Language Model Inference Cost via Embedding-Based Prompt Similarity Matching',
  authors: 'Manav Sutar · Single Core Labs',
  abstract:
    'We present SemanticCache, a middleware system that intercepts LLM API requests, encodes prompts into dense vector representations, and retrieves cached responses when semantic similarity to a prior query exceeds an adaptive threshold. Experiments on production traffic traces demonstrate a 47.3% average token reduction, 61% median latency improvement on cache hits, and cost savings of up to $0.42 per 1,000 requests.',
  highlights: [
    '47.3% average token reduction',
    '61% median latency improvement on cache hits',
    '$0.42 cost savings per 1,000 requests',
    '23% fewer false-positive cache hits vs. fixed-threshold baselines',
  ],
  href: '/research/semantic-cache',
}

const ALL_PAPERS = [
  {
    id: 'semantic-cache',
    date: 'June 2026',
    tags: ['LLMOps', 'Inference', 'Systems'],
    title: 'SemanticCache: Reducing LLM Inference Cost via Embedding-Based Prompt Similarity Matching',
    excerpt:
      'A production-grade proxy layer achieving 47.3% token savings and 61% hit-latency reduction through adaptive cosine-similarity caching.',
    href: '/research/semantic-cache',
    type: 'paper',
  },
]

const UNDER_THE_HOOD = [
  {
    id: 'adaptive-threshold',
    date: 'June 2026',
    title: 'Adaptive Threshold Calibration for Semantic Caches',
    excerpt:
      'How we dynamically tune similarity cutoffs per domain to minimise false-positive cache hits without sacrificing hit rate in production LLM deployments.',
    href: '/research/semantic-cache#adaptive-threshold',
  },
  {
    id: 'hnsw-two-tier',
    date: 'June 2026',
    title: 'Two-Tier Cache Architecture: HNSW + Redis',
    excerpt:
      'Deep dive into the hierarchical in-memory HNSW index combined with a Redis persistent store, delivering sub-5ms retrieval at the 99th percentile under concurrent load.',
    href: '/research/semantic-cache#architecture',
  },
  {
    id: 'encoder-ablation',
    date: 'June 2026',
    title: 'Encoder Ablation: Latency vs. Hit-Rate Trade-offs',
    excerpt:
      'Comparing MiniLM-L6-v2, MPNet-base, and BGE-large across production traffic traces to identify the optimal embedding strategy for enterprise deployments.',
    href: '/research/semantic-cache#encoder-ablation',
  },
]

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function Tag({ label }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        background: 'var(--color-accent-dim)',
        padding: '3px 8px',
        borderRadius: '3px',
      }}
    >
      {label}
    </span>
  )
}

function FeaturedPaper({ paper }) {
  return (
    <ScrollFade3D>
      <article
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'clamp(32px, 5vh, 56px) 0',
        }}
      >
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Calendar size={11} />
            {paper.date}
          </span>
          <span style={{
            width: '1px',
            height: '12px',
            background: 'var(--color-border-strong)',
          }} />
          {paper.tags.map(t => <Tag key={t} label={t} />)}
        </div>

        {/* Title + abstract grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 50%, 640px) 1fr',
          gap: 'clamp(24px, 4vw, 64px)',
          alignItems: 'start',
        }}
          className="research-featured-grid"
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                marginBottom: '12px',
              }}
            >
              {paper.title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.02em',
              marginBottom: '24px',
            }}>
              {paper.authors}
            </p>
            <Link
              to={paper.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--color-accent)',
                paddingBottom: '2px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Read Paper
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div>
            <p
              className="text-body"
              style={{ marginBottom: '24px', fontSize: 'clamp(13px, 1vw, 15px)' }}
            >
              {paper.abstract}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {paper.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '1px',
                    background: 'var(--color-accent)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </ScrollFade3D>
  )
}

function PaperCard({ paper, isLast }) {
  return (
    <ScrollFade3D>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(80px, 10vw, 120px) 1fr auto',
          gap: 'clamp(16px, 2.5vw, 36px)',
          paddingBlock: 'clamp(20px, 3vh, 32px)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: isLast ? '1px solid var(--color-border)' : 'none',
          alignItems: 'start',
        }}
        className="research-paper-card"
      >
        {/* Date column */}
        <div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-text-dim)',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}>
            <Calendar size={10} />
            {paper.date}
          </span>
        </div>

        {/* Content column */}
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {paper.tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
              marginBottom: '8px',
            }}
          >
            {paper.title}
          </h3>
          <p className="text-body" style={{ maxWidth: '600px', fontSize: '13px' }}>
            {paper.excerpt}
          </p>
        </div>

        {/* Link column */}
        <div style={{ paddingTop: '4px' }}>
          <Link
            to={paper.href}
            aria-label={`Read ${paper.title}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              border: '1px solid var(--color-border-strong)',
              borderRadius: '50%',
              color: 'var(--color-text)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-text)'
              e.currentTarget.style.color = 'var(--color-bg)'
              e.currentTarget.style.borderColor = 'var(--color-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-text)'
              e.currentTarget.style.borderColor = 'var(--color-border-strong)'
            }}
          >
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
    </ScrollFade3D>
  )
}

function UnderTheHoodCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={item.href}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <article
          style={{
            padding: 'clamp(20px, 2.8vh, 32px)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
            transition: 'background 0.2s, border-color 0.2s, transform 0.25s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-bg-elevated)'
            e.currentTarget.style.borderColor = 'var(--color-border-strong)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--color-bg)'
            e.currentTarget.style.borderColor = 'var(--color-border)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-text-dim)',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <Calendar size={10} />
              {item.date}
            </span>
            <ArrowUpRight
              size={14}
              style={{ color: 'var(--color-text-dim)', flexShrink: 0 }}
            />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(15px, 1.4vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
              marginBottom: '10px',
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-body"
            style={{ fontSize: '13px', lineHeight: 1.55 }}
          >
            {item.excerpt}
          </p>
        </article>
      </Link>
    </motion.div>
  )
}

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

function FeaturedSection() {
  return (
    <section style={{ padding: 'clamp(8px, 2vh, 16px) 0 var(--spacing-section)' }}>
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: 'clamp(20px, 3vh, 32px)' }}>
            Latest Paper
          </p>
        </RevealText>
        <FeaturedPaper paper={FEATURED_PAPER} />
      </div>
    </section>
  )
}

function AllPapersSection() {
  return (
    <section style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-editorial">
        <div style={{ marginBottom: 'clamp(24px, 3.5vh, 40px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '12px' }}>All Papers</p>
          </RevealText>
          <RevealText delay={1}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              Published{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                Research.
              </span>
            </h2>
          </RevealText>
        </div>

        <div>
          {ALL_PAPERS.map((paper, idx) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              isLast={idx === ALL_PAPERS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function UnderTheHoodSection() {
  return (
    <section
      style={{
        padding: 'var(--spacing-section) 0',
        background: 'var(--color-bg-elevated)',
      }}
    >
      <div className="container-editorial">
        <div style={{ marginBottom: 'clamp(24px, 4vh, 48px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '12px' }}>
              Under the Hood
            </p>
          </RevealText>
          <RevealText delay={1}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              A look at our{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                tech.
              </span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p
              className="text-body"
              style={{ maxWidth: '480px', marginTop: '12px' }}
            >
              Deep dives into the engineering decisions, algorithms, and production
              trade-offs behind our systems.
            </p>
          </RevealText>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
          }}
        >
          {UNDER_THE_HOOD.map((item, idx) => (
            <UnderTheHoodCard key={item.id} item={item} index={idx} />
          ))}
        </div>
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
        <FeaturedSection />
        <AllPapersSection />
        <UnderTheHoodSection />
        <CTASection />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .research-featured-grid {
            grid-template-columns: 1fr !important;
          }
          .research-paper-card {
            grid-template-columns: 1fr auto !important;
          }
          .research-paper-card > *:first-child {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
