import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PoweredBySection } from '@/components/PoweredBySection'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ParallaxLayer, ScrollScale, ScrollFade3D, Card3D, SectionDepth } from '@/components/ScrollScene'
import {
  ENGINEER_PEDIGREE,
  DIFFERENTIATORS,
  INDUSTRIES,
  CAPABILITIES_SUMMARY,
} from '@/lib/constants'
import { staggerHero, heroWordReveal } from '@/lib/animations'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import SEO from '@/components/SEO'

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
              color: 'var(--color-text-muted)',
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
                  backgroundColor: 'var(--color-text-muted)',
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
          <motion.p variants={heroWordReveal} className="text-eyebrow">
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
                <motion.span key={`a-${i}`} variants={heroWordReveal} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
              {line2.map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  variants={heroWordReveal}
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
            variants={heroWordReveal}
            className="text-body"
            style={{ maxWidth: '560px', fontSize: 'clamp(15px, 1.2vw, 18px)' }}
          >
            <strong>Single Core Labs provides custom AI systems engineering and sovereign AI infrastructure.</strong> We build, deploy, and operate bespoke agentic architectures for enterprises, from data ingestion to air-gapped production deployments.
          </motion.p>

          {/* CTA */}
          <motion.div variants={heroWordReveal} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
<Link to="/contact" className="btn-primary">
                Book a Demo
                <ArrowRight size={15} />
              </Link>
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

// ─── ENTERPRISE GRADE SECTION ────────────────────────────────────────────────
function EnterpriseGradeSection() {
  const checkItem = (text) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: 'var(--color-accent-dim)',
        border: '1px solid var(--color-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Check size={10} style={{ color: 'var(--color-accent)' }} strokeWidth={2.5} />
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '14px',
        color: 'var(--color-text-muted)', lineHeight: 1.5,
      }}>{text}</span>
    </div>
  )

  const COMPLIANCE_BADGES = [
    { label: 'SOC 2 Type II',         color: '#2563eb' },
    { label: 'ISO 27001',              color: '#16a34a' },
    { label: 'DPDP Compliant',        color: '#dc2626' },
    { label: 'Role-based access',     color: '#9333ea' },
    { label: 'Full audit trail',      color: '#ea580c' },
    { label: 'Data residency controls', color: '#dc2626' },
  ]

  return (
    <section id="pipeline" style={{ padding: 'var(--spacing-section-lg) 0', background: 'var(--color-bg-elevated)' }}>
      <div className="container-editorial">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vh, 60px)' }}>
          <RevealText>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              marginBottom: '14px',
            }}>
              Enterprise-grade. Out of the box.
            </h2>
          </RevealText>
          <RevealText delay={1}>
            <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Compliance, control, and confidence. Not bolted on. Built in from day one.
            </p>
          </RevealText>
        </div>

        {/* Top two cards */}
        <ScrollFade3D>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '16px',
          }}>
            {/* Card 1 — Forward deployed */}
            <div style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: 'clamp(24px, 3.5vh, 36px)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
                marginBottom: '12px',
              }}>
                Forward deployed
              </h3>
              <p className="text-body" style={{ marginBottom: '24px', fontSize: '14px' }}>
                Our engineers work alongside yours — designing agents, integrating systems,
                and staying until you're live. Not a handoff. A partnership.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {checkItem('Dedicated engineer from day one')}
                {checkItem('Joint workflow design and build')}
                {checkItem('Ongoing accuracy and cost optimisation')}
                {checkItem('SLA-backed production support')}
              </div>
            </div>

            {/* Card 2 — Deployment flexibility */}
            <div style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: 'clamp(24px, 3.5vh, 36px)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
                marginBottom: '12px',
              }}>
                Deployment flexibility
              </h3>
              <p className="text-body" style={{ marginBottom: '24px', fontSize: '14px' }}>
                Your AI runs where your data already lives. Private cloud, on-premise,
                hybrid, or fully air-gapped environments. Your agents run on your terms.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {checkItem('Private cloud, on-premise, or hybrid')}
                {checkItem('Bring your own model or use ours')}
                {checkItem('Swap vendors without rewriting workflows')}
                {checkItem('Air-gapped deployment available')}
              </div>
            </div>
          </div>
        </ScrollFade3D>

        {/* Bottom card — Security */}
        <ScrollFade3D>
          <div style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            padding: 'clamp(24px, 3.5vh, 36px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 600,
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
                marginBottom: '12px',
              }}>
                Security and governance
              </h3>
              <p className="text-body" style={{ fontSize: '14px', maxWidth: '400px' }}>
                Every agent action is logged and traceable. Role-based access, audit trails,
                and data residency controls are built into the core — not retrofitted.
                We meet you where your risk team is.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {COMPLIANCE_BADGES.map(badge => (
                <span key={badge.label} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  border: `1px solid ${badge.color}22`,
                  background: `${badge.color}0d`,
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: badge.color,
                  letterSpacing: '0.04em',
                  borderRadius: '2px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badge.color, flexShrink: 0 }} />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </ScrollFade3D>
      </div>
    </section>
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
            Let’s build something{' '}
            <span className="text-italic-serif">exceptional.</span>
          </h2>
        </RevealText>

        <RevealText delay={2}>
          <p className="text-body" style={{ maxWidth: '480px', marginBottom: '28px' }}>
            As an applied AI research company, we deploy cutting‑edge solutions for
            enterprises and build innovative in‑house products. Book a free 30‑minute
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

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section style={{ padding: 'var(--spacing-section) 0' }}>
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />

        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>FAQ</p>
        </RevealText>

        <RevealText delay={1}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            Frequently Asked <span className="text-italic-serif">Questions.</span>
          </h2>
        </RevealText>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
          <RevealText delay={2}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>Q: Does Single Core Labs provide cloud GPUs?</h3>
              <p className="text-body" style={{ color: 'var(--color-text-muted)' }}>
                No, Single Core Labs is not a cloud GPU provider. We are an elite AI systems engineering firm. We design, deploy, and operate custom, sovereign AI infrastructure and bespoke agentic architectures tailored specifically for enterprises.
              </p>
            </div>
          </RevealText>
          <RevealText delay={3}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>Q: Who provides custom AI systems engineering?</h3>
              <p className="text-body" style={{ color: 'var(--color-text-muted)' }}>
                Single Core Labs provides expert AI systems engineering. Our embedded experts build production-grade workflows, air-gapped models, and complete AI transformation roadmaps, rather than just renting out compute instances.
              </p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Single Core Labs",
        "url": "https://singlecorelabs.com",
        "logo": "https://singlecorelabs.com/og-image.jpg",
        "description": "Single Core Labs is an elite applied AI research lab and systems engineering firm providing custom AI infrastructure and agentic architectures.",
        "knowsAbout": ["AI Systems Engineering", "Agentic Architectures", "Sovereign AI Infrastructure", "Air-Gapped AI Deployments", "Applied AI Research"],
        "founder": [
          {
            "@type": "Person",
            "name": "Manav Sutar"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@singlecorelabs.com",
          "availableLanguage": ["English"]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does Single Core Labs provide cloud GPUs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, Single Core Labs is not a cloud GPU provider. We are an AI systems engineering firm that builds custom, sovereign AI infrastructure and bespoke agentic architectures for enterprises."
            }
          },
          {
            "@type": "Question",
            "name": "Who provides custom AI systems engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Single Core Labs provides expert AI systems engineering, offering embedded experts who design, deploy, and operate custom agentic architectures and air-gapped AI deployments tailored to specific enterprise needs."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Single Core Labs"
        description="Single Core Labs provides custom AI systems engineering and sovereign AI infrastructure. We build, deploy, and operate bespoke agentic architectures for enterprises."
        keywords="AI systems engineering, sovereign AI infrastructure, custom agentic architectures, applied AI research, enterprise AI solutions"
        schema={schema}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <LogoMarquee />
        <PhilosophySection />
        <EnterpriseGradeSection />
        <DifferentiatorsSection />
        <IndustriesSection />
        <SocialProofSection />
        <PoweredBySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}



