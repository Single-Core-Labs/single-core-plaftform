import { useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'
import WordsPullUp from '@/components/WordsPullUp'
import WordsPullUpMultiStyle from '@/components/WordsPullUpMultiStyle'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CREAM = '#E1E0CC'
const CREAM_70 = 'rgba(225,224,204,0.7)'

const FEATURE_CARDS = [
  {
    id: 'bioformer',
    title: 'BioFormer.',
    icon: '/logo-icon.png',
    items: [
      'Original transformer architecture',
      'Trained on ClinVar & gnomAD',
      'Genetic mutation effect prediction',
      'Built for diagnostic labs',
    ],
    href: '/research',
  },
  {
    id: 'platform-agent',
    title: 'Platform-Agent.',
    icon: '/logo-icon.png',
    items: [
      'Open-source CLI coding agent',
      'Composable tool workflows',
      'Built for developer teams',
    ],
    href: '/solutions',
  },
  {
    id: 'agentwatch',
    title: 'AgentWatch.',
    icon: '/logo-icon.png',
    items: [
      'LLM observability & tracing',
      'Cost and performance explorer',
      'Built for teams running agents in production',
    ],
    href: '/solutions',
  },
]

// ─── ANIMATED LETTER (scroll-linked opacity) ─────────────────────────────────

function AnimatedChar({ char, index, total, targetRef }) {
  const charProgress = index / total
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.15, 1]
  )
  if (char === ' ') return <span>&nbsp;</span>
  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {char}
    </motion.span>
  )
}

function AnimatedBody({ text, className = '', style: customStyle }) {
  const ref = useRef(null)
  const chars = text.split('')
  return (
    <p ref={ref} className={className} style={{ display: 'block', wordBreak: 'break-word', ...customStyle }}>
      {chars.map((ch, i) => (
        <AnimatedChar key={i} char={ch} index={i} total={chars.length} targetRef={ref} />
      ))}
    </p>
  )
}

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────

function HeroSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
    const resume = () => { if (v.paused) v.play().catch(() => {}) }
    document.addEventListener('visibilitychange', resume)
    return () => document.removeEventListener('visibilitychange', resume)
  }, [])

  const easeCustom = [0.16, 1, 0.3, 1]

  return (
    <section
      style={{
        background: '#000',
        padding: 'clamp(12px, 1.5vw, 24px)',
        height: '100dvh',
        minHeight: '600px',
        fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Inset rounded container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 'clamp(16px, 2vw, 32px)',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Noise overlay */}
        <div
          className="noise-overlay"
          style={{ zIndex: 1, opacity: 0.7, mixBlendMode: 'overlay' }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 45%, rgba(0,0,0,0.65) 100%)',
            zIndex: 2,
          }}
        />

        {/* ── NAVBAR ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '0 0 20px 20px',
              padding: 'clamp(10px, 1.2vw, 16px) clamp(20px, 3vw, 40px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(14px, 2.5vw, 56px)',
            }}
          >
            {[
              { label: 'Research', href: '/research' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'About', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  color: 'rgba(225,224,204,0.8)',
                  textDecoration: 'none',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.target.style.color = CREAM)}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(225,224,204,0.8)')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── HERO CONTENT (bottom-aligned) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: '8fr 4fr',
            alignItems: 'flex-end',
            padding: 'clamp(20px, 3vw, 48px)',
            paddingBottom: 'clamp(24px, 3.5vw, 52px)',
            gap: 'clamp(16px, 2vw, 32px)',
          }}
        >
          {/* Left: Giant SCL wordmark */}
          <div style={{ overflow: 'hidden', lineHeight: 0 }}>
            <h1
              style={{
                fontSize: 'clamp(18vw, 20vw, 22vw)',
                fontWeight: 500,
                lineHeight: 0.85,
                letterSpacing: '-0.07em',
                color: CREAM,
                fontFamily: "'Almarai', sans-serif",
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <WordsPullUp
                text="SCL"
                showAsterisk
                stagger={0.08}
              />
            </h1>
          </div>

          {/* Right: description + CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 28px)',
              paddingBottom: 'clamp(8px, 1.5vw, 20px)',
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: easeCustom }}
              style={{
                color: CREAM_70,
                fontSize: 'clamp(11px, 1.1vw, 16px)',
                lineHeight: 1.2,
                fontWeight: 300,
                fontFamily: "'Almarai', sans-serif",
              }}
            >
              Single Core Labs is an applied AI research lab building foundation models and
              end-to-end AI products — bound not by a single domain, but by a discipline
              for turning novel architectures into systems that ship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: easeCustom }}
            >
              <Link
                to="/research"
                className="group"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: CREAM,
                  borderRadius: '9999px',
                  padding: 'clamp(6px, 0.7vw, 10px) clamp(6px, 0.7vw, 10px) clamp(6px, 0.7vw, 10px) clamp(16px, 1.8vw, 24px)',
                  textDecoration: 'none',
                  transition: 'gap 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '16px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '12px')}
              >
                <span
                  style={{
                    color: '#000',
                    fontWeight: 500,
                    fontSize: 'clamp(12px, 1.1vw, 16px)',
                    fontFamily: "'Almarai', sans-serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  See our research
                </span>
                <span
                  style={{
                    background: '#000',
                    borderRadius: '50%',
                    width: 'clamp(32px, 3vw, 40px)',
                    height: 'clamp(32px, 3vw, 40px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <ArrowRight size={16} color={CREAM} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 2: ABOUT ────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      style={{
        background: '#000',
        padding: 'clamp(64px, 8vw, 120px) clamp(20px, 4vw, 60px)',
        fontFamily: "'Almarai', sans-serif",
      }}
    >
      <div
        style={{
          background: '#101010',
          borderRadius: 'clamp(16px, 2vw, 28px)',
          padding: 'clamp(48px, 6vw, 96px) clamp(28px, 5vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: CREAM,
            fontSize: 'clamp(10px, 0.9vw, 12px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: 'clamp(24px, 3vw, 44px)',
          }}
        >
          Applied AI research
        </motion.p>

        {/* Heading */}
        <div
          style={{
            fontSize: 'clamp(28px, 5vw, 72px)',
            lineHeight: 0.95,
            maxWidth: '860px',
            margin: '0 auto',
            marginBottom: 'clamp(36px, 4vw, 64px)',
          }}
        >
          <WordsPullUpMultiStyle
            wrapperClassName=""
            segments={[
              {
                text: 'We build foundation models',
                className: '',
                style: { fontWeight: 400, color: CREAM, fontFamily: "'Almarai', sans-serif" },
              },
              {
                text: 'and the products',
                className: 'font-serif',
                style: { fontStyle: 'italic', color: CREAM, fontFamily: "'Instrument Serif', serif" },
              },
              {
                text: 'that put them to work.',
                className: '',
                style: { fontWeight: 400, color: CREAM, fontFamily: "'Almarai', sans-serif" },
              },
            ]}
            stagger={0.045}
            defaultStyle={{ color: CREAM, fontSize: 'inherit', lineHeight: 'inherit' }}
          />
        </div>

        {/* Body — scroll-linked character reveal in box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid rgba(225, 224, 204, 0.12)',
            borderRadius: 'clamp(12px, 1.5vw, 20px)',
            padding: 'clamp(24px, 3vw, 40px)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <AnimatedBody
            text="Over the past year, our team has designed original transformer architectures from scratch, shipped MLOps pipelines from training to deployment, and built AI systems for enterprise clients across healthcare, infrastructure, and developer tooling. Together, we're building toward a research lab that publishes as seriously as it ships."
            className=""
            style={{
              color: CREAM,
              fontSize: 'clamp(13px, 1.2vw, 17px)',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─── SECTION 3: FEATURES ─────────────────────────────────────────────────────

function FeatureCard({ card, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        background: '#212121',
        borderRadius: 'clamp(12px, 1.5vw, 20px)',
        padding: 'clamp(24px, 2.5vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
        minHeight: '320px',
      }}
    >
      {/* Icon */}
      <img
        src={card.icon}
        alt=""
        style={{
          width: 'clamp(36px, 3vw, 48px)',
          height: 'clamp(36px, 3vw, 48px)',
          borderRadius: '10px',
          objectFit: 'contain',
        }}
      />

      {/* Title */}
      <h3
        style={{
          color: CREAM,
          fontSize: 'clamp(18px, 1.8vw, 26px)',
          fontWeight: 700,
          fontFamily: "'Almarai', sans-serif",
          lineHeight: 1.1,
        }}
      >
        {card.title}
      </h3>

      {/* Checklist */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {card.items.map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: '#9CA3AF',
              fontSize: 'clamp(12px, 1vw, 14px)',
              fontFamily: "'Almarai', sans-serif",
              fontWeight: 300,
              lineHeight: 1.4,
            }}
          >
            <Check
              size={14}
              style={{ color: CREAM, flexShrink: 0, marginTop: '2px' }}
              strokeWidth={2.5}
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Learn more */}
      <Link
        to={card.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: CREAM,
          textDecoration: 'none',
          fontSize: 'clamp(12px, 1vw, 14px)',
          fontWeight: 500,
          fontFamily: "'Almarai', sans-serif",
          opacity: 0.8,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
      >
        Learn more
        <ArrowRight size={13} style={{ transform: 'rotate(-45deg)' }} />
      </Link>
    </motion.div>
  )
}

function VideoFeatureCard({ index }) {
  const videoRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        borderRadius: 'clamp(12px, 1.5vw, 20px)',
        overflow: 'hidden',
        minHeight: '320px',
        height: '100%',
      }}
    >
      <video
        ref={videoRef}
        src="/original-a9b30b0413131d806620dc5db95c99f1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Dark gradient at bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        }}
      />
      <p
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 2.5vw, 32px)',
          left: 'clamp(20px, 2.5vw, 32px)',
          color: CREAM,
          fontSize: 'clamp(14px, 1.3vw, 19px)',
          fontWeight: 500,
          fontFamily: "'Almarai', sans-serif",
          lineHeight: 1.2,
        }}
      >
        Where models get built.
      </p>
    </motion.div>
  )
}

function FeaturesSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        background: '#000',
        minHeight: '100vh',
        position: 'relative',
        padding: 'clamp(64px, 8vw, 120px) clamp(20px, 4vw, 48px)',
        fontFamily: "'Almarai', sans-serif",
      }}
    >
      {/* Noise background */}
      <div className="bg-noise" style={{ zIndex: 0, opacity: 0.15 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}
        >
          <div
            style={{
              fontSize: 'clamp(20px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Research-grade systems for enterprise AI.',
                  style: { color: CREAM, display: 'block' },
                },
              ]}
              stagger={0.04}
              defaultStyle={{ color: CREAM, fontFamily: "'Almarai', sans-serif" }}
            />
            <br />
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Built for rigor. Shipped like a product.',
                  style: { color: '#6B7280' },
                },
              ]}
              stagger={0.04}
              defaultStyle={{ color: '#6B7280', fontFamily: "'Almarai', sans-serif" }}
            />
          </div>
        </div>

        {/* 4-col card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(8px, 1vw, 12px)',
          }}
        >
          <VideoFeatureCard index={0} />
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCard key={card.id} card={card} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <SEO
        title="Single Core Labs — Applied AI Research"
        description="Single Core Labs is an applied AI research lab building foundation models and end-to-end AI products — bound not by a single domain, but by a discipline for turning novel architectures into systems that ship."
        keywords="applied AI research, foundation models, AI products, BioFormer, machine learning, enterprise AI"
      />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}
