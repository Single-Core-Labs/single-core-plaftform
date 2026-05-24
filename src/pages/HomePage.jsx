import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ParallaxLayer, ScrollScale, ScrollFade3D, Card3D, SectionDepth } from '@/components/ScrollScene'
import {
  ENGINEER_PEDIGREE,
  CORE_PIPELINE,
  DIFFERENTIATORS,
  INDUSTRIES,
  CAPABILITIES_SUMMARY,
} from '@/lib/constants'
import { staggerHero, wordReveal } from '@/lib/animations'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { usePageMeta } from '@/lib/seo'

// ─── LOGO MARQUEE (backed by Engineers from…) ───────────────────────────────
function LogoMarquee() {
  const logos = [
    ...ENGINEER_PEDIGREE,
    ...ENGINEER_PEDIGREE,
    ...ENGINEER_PEDIGREE,
    ...ENGINEER_PEDIGREE,
  ]

  return (
    <section
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden',
        padding: 'clamp(16px, 2.5vh, 28px) 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Static label */}
        <div
          style={{
            flexShrink: 0,
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 3vw, 48px)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-text-dim)',
              whiteSpace: 'nowrap',
            }}
          >
            backed by Engineers from
          </span>
        </div>

        {/* Scrolling names */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              animation: 'marquee 20s linear infinite',
              whiteSpace: 'nowrap',
            }}
          >
            {logos.map((name, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: 'var(--color-text-muted)',
                  paddingInline: 'clamp(28px, 4vw, 56px)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(28px, 4vw, 56px)',
                }}
              >
                {name}
                <span style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-text-dim)',
                  flexShrink: 0,
                }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const line1 = ['AI', 'at', 'scale.']
  const line2 = ['Without', 'the', 'chaos.']
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroY    = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '18%']), { stiffness: 60, damping: 20 })
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), { stiffness: 60, damping: 20 })

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(100px, 14vh, 160px) 0 clamp(48px, 6vh, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background orb */}
      <ParallaxLayer
        speed={-0.4}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          width: 'clamp(300px, 50vw, 700px)',
          height: 'clamp(300px, 50vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,137,123,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </ParallaxLayer>

      <motion.div
        className="container-editorial"
        style={{ position: 'relative', zIndex: 1, y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Eyebrow */}
          <motion.p variants={wordReveal} className="text-eyebrow">
            Enterprise AI & Research
          </motion.p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-hero"
            aria-label="AI at scale. Without the chaos."
            style={{ maxWidth: '1000px' }}
          >
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
              {line1.map((word, i) => (
                <motion.span key={`a-${i}`} variants={wordReveal} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
              {line2.map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  variants={wordReveal}
                  style={{
                    display: 'inline-block',
                    fontStyle: 'italic',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            variants={wordReveal}
            className="text-body"
            style={{ maxWidth: '520px', fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            Single Core Labs delivers agentic solutions to power the next generation
            of enterprise AI, from data ingestion to production deployment.
          </motion.p>

          {/* CTA */}
          <motion.div variants={wordReveal} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact" className="btn-primary">
              Book a Demo
              <ArrowRight size={15} />
            </a>
            <a href="#pipeline" className="btn-outline">
              Explore Platform
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── PHILOSOPHY ─────────────────────────────────────────────────────────────
function PhilosophySection() {
  return (
    <section style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(32px, 4vh, 48px)' }} />
        <ScrollScale from={0.92}>
          <RevealText>
            <blockquote
              className="text-editorial"
              style={{
                maxWidth: '900px',
                fontStyle: 'italic',
                lineHeight: 1.4,
              }}
            >
              "We translate deep expertise in building frontier models and agents
              into enterprise solutions, combining our platform, experienced teams,
              and advanced processes to accelerate your AI transformation."
            </blockquote>
          </RevealText>
          <RevealText delay={2}>
            <p style={{
              marginTop: '20px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}>
              Single Core Labs
            </p>
          </RevealText>
        </ScrollScale>
      </div>
    </section>
  )
}

// ─── PIPELINE ───────────────────────────────────────────────────────────────
function PipelineSection() {
  return (
    <section id="pipeline" style={{ padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <div style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Deployment Architecture</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ maxWidth: '700px' }}>
              Full-Stack AI
              <br />
              <span className="text-italic-serif">Integration.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '560px', marginTop: '16px' }}>
              From raw data ingestion to domain-specific model fine-tuning and
              secure offline deployment. We handle the complete AI lifecycle.
            </p>
          </RevealText>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CORE_PIPELINE.map((step, idx) => (
            <PipelineStep key={step.id} step={step} isLast={idx === CORE_PIPELINE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PipelineStep({ step, isLast }) {
  return (
    <ScrollFade3D>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(36px, 5vw, 64px) 1fr',
          gap: 'clamp(16px, 2.5vw, 36px)',
          paddingBlock: 'clamp(24px, 3.5vh, 40px)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: isLast ? '1px solid var(--color-border)' : 'none',
          alignItems: 'start',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(24px, 3.5vw, 44px)',
            fontWeight: 400,
            lineHeight: 1,
            color: 'var(--color-text-dim)',
            letterSpacing: '-0.03em',
          }}
        >
          {step.number}
        </span>

        <div>
          <p className="text-eyebrow" style={{ marginBottom: '6px', color: 'var(--color-accent)' }}>
            {step.label}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
              marginBottom: '8px',
            }}
          >
            {step.headline}
          </h3>
          <p className="text-body" style={{ maxWidth: '560px' }}>
            {step.description}
          </p>
        </div>
      </article>
    </ScrollFade3D>
  )
}

// ─── DIFFERENTIATORS ────────────────────────────────────────────────────────
function DifferentiatorsSection() {
  return (
    <SectionDepth>
      <section style={{ padding: 'var(--spacing-section-lg) 0' }}>
        <div className="container-editorial">
          <div style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Why Single Core Labs</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ maxWidth: '700px' }}>
                Convert your proprietary data
                <br />
                <span className="text-italic-serif">into intelligent agents.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '520px', marginTop: '16px' }}>
                Build AI systems that don't just respond. They learn, adapt, and improve
                with every interaction.
              </p>
            </RevealText>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {DIFFERENTIATORS.map((item, idx) => (
              <ScrollFade3D key={item.id}>
                <Card3D intensity={4}>
                  <article
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'clamp(20px, 3vw, 56px)',
                      paddingBlock: 'clamp(24px, 3.5vh, 44px)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: idx === DIFFERENTIATORS.length - 1 ? '1px solid var(--color-border)' : 'none',
                      alignItems: 'start',
                    }}
                  >
                    <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(20px, 2.8vw, 34px)',
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: '-0.02em',
                          color: 'var(--color-text)',
                        }}
                      >
                        {item.headline}
                      </h3>
                    </div>
                    <div style={{ order: idx % 2 === 0 ? 1 : 0, paddingTop: '4px' }}>
                      <p className="text-body" style={{ maxWidth: '420px' }}>
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Card3D>
              </ScrollFade3D>
            ))}
          </div>
        </div>
      </section>
    </SectionDepth>
  )
}

// ─── INDUSTRIES — CHECKS GRID ───────────────────────────────────────────────
function IndustriesSection() {
  return (
    <section style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-editorial">
        <div style={{ marginBottom: 'clamp(32px, 4vh, 48px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Industries</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ maxWidth: '600px' }}>
              AI solutions built for
              <br />
              <span className="text-italic-serif">every sector.</span>
            </h2>
          </RevealText>
        </div>

        <StaggerReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0',
              borderTop: '1px solid var(--color-border)',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {INDUSTRIES.map((industry) => (
              <Card3D
                key={industry.id}
                intensity={6}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 'clamp(16px, 2.5vh, 24px) clamp(16px, 2vw, 28px)',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                  cursor: 'default',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={11} style={{ color: 'var(--color-accent)' }} strokeWidth={2.5} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  letterSpacing: '0.01em',
                }}>
                  {industry.label}
                </span>
              </Card3D>
            ))}
          </div>
        </StaggerReveal>

        <RevealText>
          <p className="text-body" style={{ maxWidth: '560px', marginTop: 'clamp(20px, 3vh, 32px)' }}>
            From healthcare diagnostics to financial compliance, logistics
            optimization to e-commerce intelligence. Purpose-built AI for
            regulated, high-stakes sectors.
          </p>
        </RevealText>
      </div>
    </section>
  )
}

// ─── SOCIAL PROOF ───────────────────────────────────────────────────────────
function SocialProofSection() {
  return (
    <section style={{
      padding: 'var(--spacing-section) 0',
      background: 'var(--color-bg-elevated)',
    }}>
      <div className="container-editorial">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'start',
        }}>
          <RevealText>
            <div>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>AI for the Enterprise</p>
              <h2 className="text-display">
                Full-Stack
                <br />
                <span className="text-italic-serif">AI Solutions.</span>
              </h2>
            </div>
          </RevealText>
          <RevealText delay={2}>
            <div style={{ paddingTop: '4px' }}>
              <p className="text-body" style={{ marginBottom: '20px' }}>
                Outcomes delivered with data, models, agents, and deployment.
                We don't just wrap APIs. We build systems that actually perform
                in production.
              </p>
              <StaggerReveal>
                {CAPABILITIES_SUMMARY.slice(0, 4).map((cap) => (
                  <p
                    key={cap}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      paddingBlock: '10px',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '1px',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }} />
                    {cap}
                  </p>
                ))}
              </StaggerReveal>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      style={{
        padding: 'var(--spacing-section-lg) 0',
        position: 'relative',
      }}
    >
      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />

        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Connect</p>
        </RevealText>

        <RevealText delay={1}>
          <h2
            id="cta-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '800px',
              marginBottom: '20px',
            }}
          >
            Let's build something{' '}
            <span className="text-italic-serif">exceptional.</span>
          </h2>
        </RevealText>

        <RevealText delay={2}>
          <p className="text-body" style={{ maxWidth: '480px', marginBottom: '28px' }}>
            As an applied AI research company, we deploy cutting-edge solutions for
            enterprises and build innovative in-house products. Book a free 30-minute
            consultation to learn how we can help.
          </p>
        </RevealText>

        <RevealText delay={3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
<Link to="/contact" className="btn-primary">
               Start the Conversation
               <ArrowRight size={15} />
            </Link>
          </div>
        </RevealText>
      </div>
    </section>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  usePageMeta('/')

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <LogoMarquee />
        <PhilosophySection />
        <PipelineSection />
        <DifferentiatorsSection />
        <IndustriesSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
