import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'
import WordsPullUp from '@/components/WordsPullUp'
import { RevealText } from '@/components/RevealText'
import { PixelGrid } from '@/system/PixelGrid'
import { Section, SectionHead } from '@/system/Container'
import { BentoGrid, BentoCard } from '@/system/Bento'
import { WordStrip } from '@/system/home'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CREAM = '#FFFFFF'

const STACK_CARDS = [
  { title: 'Compute', text: 'GPU and CPU infrastructure built for training, inference, agents, and AI workloads.' },
  { title: 'Optimization', text: 'Maximize GPU utilization, memory efficiency, throughput, and cost efficiency.' },
  { title: 'Runtime', text: 'High-performance runtimes for training, inference, and model serving.' },
  { title: 'Orchestration', text: 'Intelligent scheduling and workload placement across heterogeneous compute.' },
  { title: 'Networking', text: 'High-performance infrastructure for distributed AI workloads.' },
  { title: 'Infrastructure', text: 'Deploy across public cloud, private cloud, on-premise, and sovereign environments.' },
]

const GAINS = [
  { title: 'Higher utilization', text: 'Get more productive work from the infrastructure you already have.' },
  { title: 'Lower cost', text: 'Reduce idle capacity and cost per AI workload.' },
  { title: 'Higher throughput', text: 'Run more training and inference on the same compute.' },
  { title: 'Faster scaling', text: 'Move from a single GPU to distributed infrastructure without rebuilding your stack.' },
]

const WORKLOADS = ['Training', 'Post-training', 'Inference', 'Agents', 'Evaluation', 'Simulation']

const ENVIRONMENTS = ['Cloud', 'Private Cloud', 'On-Premise', 'Sovereign']

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

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────

function HeroSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Reduced motion: keep the lightweight poster, never load the video.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Small screens get the 480p file (~272KB), desktops the 720p (~771KB).
    // Shared with the About hero (same shoot) — see public/about-hero-*.
    const src = window.innerWidth <= 768 ? '/about-hero-480p.webm' : '/about-hero-720p.webm'
    const load = () => {
      if (v.dataset.loaded) return
      v.dataset.loaded = '1'
      v.src = src
      v.load()
      v.play().catch(() => {})
    }
    // Defer the download until the browser is idle so first paint isn't blocked.
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1200))
    const idleId = idle(load)
    const resume = () => { if (v.paused && v.dataset.loaded) v.play().catch(() => {}) }
    document.addEventListener('visibilitychange', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  const easeCustom = [0.16, 1, 0.3, 1]

  return (
    <section
      style={{
        background: '#000',
        padding: 'clamp(12px, 1.5vw, 24px)',
        height: '88dvh',
        minHeight: '540px',
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
          loop
          muted
          playsInline
          preload="none"
          poster="/about-hero-poster.jpg"
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

        {/* Pixel-grid pattern: structure, faded toward content */}
        <PixelGrid
          cover
          seed={7}
          accents={12}
          fade
          mask="bottom"
          opacity={0.55}
          style={{ zIndex: 3 }}
        />

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
            <motion.a
              href="#programs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: easeCustom }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'flex-start',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '9999px',
                padding: '6px 14px',
                color: CREAM,
                fontSize: 'clamp(10px, 0.9vw, 12px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: "'Almarai', sans-serif",
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              Backed by Anthropic · Z.ai · Neo4j startups programs
            </motion.a>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: easeCustom }}
              style={{
                color: CREAM,
                fontSize: 'clamp(28px, 3.5vw, 56px)',
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                fontFamily: "'Almarai', sans-serif",
              }}
            >
              The compute stack for superintelligence
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: easeCustom }}
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 'clamp(14px, 1.4vw, 19px)',
                lineHeight: 1.5,
                fontWeight: 400,
                fontFamily: "'Almarai', sans-serif",
                maxWidth: '560px',
              }}
            >
              Single Core Labs lets you decide how AI runs in your organization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: easeCustom }}
            >
              <Link
                to="/contact"
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
                  Talk to sales
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

// ─── BACKED BY ───────────────────────────────────────────────────────────────

function BackedBySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const companies = ['Cognizant', 'Bank of America', 'Global Logic']

  return (
    <section
      ref={ref}
      style={{
        background: '#000',
        padding: 'clamp(28px, 3.5vw, 56px) clamp(20px, 4vw, 60px)',
        fontFamily: "'Almarai', sans-serif",
      }}
    >
      <div style={{
        textAlign: 'center',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(10px, 0.85vw, 12px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: 'clamp(24px, 3vw, 40px)',
          }}
        >
          Backed by engineers from
        </motion.p>

        <div
          aria-hidden={false}
          style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div className="scl-marquee-track" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(48px, 6vw, 96px)',
            width: 'max-content',
            paddingRight: 'clamp(48px, 6vw, 96px)',
          }}>
            {[...companies, ...companies, ...companies, ...companies].map((c, i) => (
              <span
                key={`${c}-${i}`}
                style={{
                  color: CREAM,
                  fontSize: 'clamp(18px, 1.8vw, 26px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scl-marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .scl-marquee-track {
            animation: scl-marquee-left 22s linear infinite;
            will-change: transform;
          }
          .scl-marquee-track:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .scl-marquee-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; }
          }
        `}</style>
      </div>
    </section>
  )
}

// ─── STARTUP PROGRAMS ────────────────────────────────────────────────────────

const STARTUP_PROGRAMS = [
  { name: 'Anthropic', program: 'Claude for Startups', logo: '/partners/anthropic.png' },
  { name: 'Z.ai', program: 'Z.ai for Startups', logo: '/partners/zai.png' },
  { name: 'Neo4j', program: 'Neo4j Startup Program', logo: '/partners/neo4j.png' },
]

function StartupProgramsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="programs"
      ref={ref}
      style={{
        background: '#000',
        padding: 'clamp(28px, 3.5vw, 56px) clamp(20px, 4vw, 60px)',
        fontFamily: "'Almarai', sans-serif",
        scrollMarginTop: '80px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(10px, 0.85vw, 12px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: 'clamp(24px, 3vw, 40px)',
          }}
        >
          Supported by startup programs
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(12px, 1.5vw, 20px)',
        }}>
          {STARTUP_PROGRAMS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 'clamp(8px, 1vw, 12px)',
                textAlign: 'center',
              }}
            >
              <img
                src={s.logo}
                alt={`${s.name} logo`}
                loading="lazy"
                style={{
                  height: 'clamp(36px, 4vw, 52px)',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto 16px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(11px, 1vw, 13px)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {s.program}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COMPUTE INTRO ───────────────────────────────────────────────────────────

function ComputeIntro() {
  return (
    <section style={{ background: '#000', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 60px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <RevealText>
          <h2
            style={{
              color: CREAM,
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
              textWrap: 'balance',
            }}
          >
            The compute stack for superintelligence.
          </h2>
        </RevealText>
        <RevealText delay={1}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 16px' }}>
            We build AI compute and infrastructure that makes every GPU work harder. SCL
            optimizes the full AI compute stack — from GPUs, networking, and storage to
            runtimes, inference, orchestration, and workloads.
          </p>
        </RevealText>
        <RevealText delay={2}>
          <p style={{ color: CREAM, fontSize: 'clamp(15px, 1.5vw, 20px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 32px' }}>
            Higher performance. Better utilization. Lower cost.
          </p>
        </RevealText>
        <RevealText delay={3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <PillCta to="/cloud/overview">Explore SCL Cloud</PillCta>
            <Link to="/contact" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
              Talk to us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

// ─── BOTTLENECK ──────────────────────────────────────────────────────────────

function BottleneckSection() {
  return (
    <Section>
      <SectionHead
        heading="AI is scaling. Compute is the bottleneck."
        lede="More capable AI requires more compute. Simply adding GPUs isn't enough."
      />
      <p className="scl-lede" style={{ marginBottom: '16px' }}>
        Idle accelerators, inefficient workloads, memory bottlenecks, network overhead,
        and fragmented infrastructure leave performance and capital on the table.
      </p>
      <p style={{ color: CREAM, fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, letterSpacing: '-0.015em', margin: 0, textWrap: 'balance' }}>
        SCL turns infrastructure into optimized, usable compute.
      </p>
    </Section>
  )
}

// ─── FULL STACK ──────────────────────────────────────────────────────────────

function FullStackSection() {
  return (
    <Section>
      <SectionHead
        heading="Optimize the entire compute stack."
      />
      <BentoGrid>
        {STACK_CARDS.map((c) => (
          <BentoCard key={c.title} headline={c.title} text={c.text} />
        ))}
      </BentoGrid>
    </Section>
  )
}

// ─── GAINS ───────────────────────────────────────────────────────────────────

function GainsSection() {
  return (
    <Section>
      <SectionHead
        heading="More intelligence from every GPU."
      />
      <BentoGrid>
        {GAINS.map((g) => (
          <BentoCard key={g.title} headline={g.title} text={g.text} />
        ))}
      </BentoGrid>
    </Section>
  )
}

// ─── WORKLOADS + ENVIRONMENTS ────────────────────────────────────────────────

function ChipRow({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {items.map((w) => (
        <span
          key={w}
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '9999px',
            padding: '8px 18px',
            color: CREAM,
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {w}
        </span>
      ))}
    </div>
  )
}

function WorkloadsSection() {
  return (
    <Section>
      <SectionHead
        heading="Built for the AI workloads of tomorrow."
        lede="From experimentation to production, SCL provides the compute and infrastructure layer needed to run increasingly capable AI."
      />
      <ChipRow items={WORKLOADS} />
    </Section>
  )
}

function EnvironmentsSection() {
  return (
    <Section>
      <SectionHead
        heading="One stack. Any infrastructure."
        lede="Run AI where your data and workloads need to live — while managing compute through a unified infrastructure layer."
      />
      <ChipRow items={ENVIRONMENTS} />
    </Section>
  )
}

// ─── CLOSING ─────────────────────────────────────────────────────────────────

function ClosingSection() {
  return (
    <section style={{ background: '#000', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 60px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <RevealText>
          <h2
            style={{
              color: CREAM,
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
              textWrap: 'balance',
            }}
          >
            Build what comes next.
          </h2>
        </RevealText>
        <RevealText delay={1}>
          <p style={{ color: CREAM, fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
            The next generation of AI needs a new compute stack.
          </p>
        </RevealText>
        <RevealText delay={2}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 32px' }}>
            SCL is building it.
          </p>
        </RevealText>
        <RevealText delay={3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <PillCta to="/cloud/overview">Explore SCL Cloud</PillCta>
            <Link to="/contact" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
              Talk to SCL <span aria-hidden="true">→</span>
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Single Core Labs — The Compute Stack for Superintelligence"
        description="SCL optimizes the full AI compute stack — GPUs, networking, storage, runtimes, inference, orchestration, and workloads. Higher performance. Better utilization. Lower cost."
        keywords="AI compute, GPU infrastructure, AI orchestration, inference, SCL Cloud, sovereign AI"
      />
      <HeroSection />
      <WordStrip />
      <BackedBySection />
      <StartupProgramsSection />
      <ComputeIntro />
      <BottleneckSection />
      <FullStackSection />
      <GainsSection />
      <WorkloadsSection />
      <EnvironmentsSection />
      <ClosingSection />
      <Footer />
    </div>
  )
}
