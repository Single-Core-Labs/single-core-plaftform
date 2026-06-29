import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PoweredBySection } from '@/components/PoweredBySection'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D, SectionDepth } from '@/components/ScrollScene'
import {
  ENGINEER_PEDIGREE,
  CAPABILITIES_SUMMARY,
} from '@/lib/constants'
import { staggerHero, heroWordReveal } from '@/lib/animations'
import { ArrowRight, ChevronDown, Server, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import SEO from '@/components/SEO'

const HERO_VIDEO_SRC = '/hero-curve.webm'

import imgHealthcare from '@/assets/gpu-server/healthcare-tech.png'
import imgDefense from '@/assets/gpu-server/defense-server.png'
import imgFinance from '@/assets/gpu-server/server-1.png'
import imgTech from '@/assets/gpu-server/server-2.png'
import imgManufacturing from '@/assets/gpu-server/manufacturing-server.png'

const SOVEREIGN_PILLARS = [
  {
    icon: Shield,
    title: 'Sovereign by design',
    body: 'Build, deploy, and run AI with full control—on-premise, private cloud, or fully air-gapped environments.',
  },
  {
    icon: Server,
    title: 'Bare-metal performance',
    body: 'Frontier-class inference on custom GPU clusters, engineered for ultra-low latency and production reliability.',
  },
  {
    icon: Users,
    title: 'Human at the core',
    body: 'Forward-deployed engineers work alongside your teams until agents and pipelines are live in production.',
  },
]

const DEPLOYMENT_OPTIONS = [
  {
    title: 'Managed Infrastructure',
    subtitle: 'SCL Cloud',
    description: 'Fully orchestrated, auto-scaling compute with the fastest path to production and zero maintenance overhead.',
  },
  {
    title: 'Sovereign VPC',
    subtitle: 'Private Cloud',
    description: 'Enterprise security within your perimeter. We manage infrastructure while you keep data sovereignty.',
  },
  {
    title: 'Air-Gapped Clusters',
    subtitle: 'On-Premises',
    description: 'Physical isolation and hardware-level control for regulated, mission-critical AI workloads.',
  },
]

const INDUSTRY_CARDS = [
  { id: 'finance', label: 'Finance', image: imgFinance, subtitle: 'High-frequency infrastructure', desc: 'High-frequency trading infrastructure and compliance-driven workflows.' },
  { id: 'tech', label: 'Technology', image: imgTech, subtitle: 'Scalable LLM platforms', desc: 'Scalable LLM routing and vector databases for high-growth platforms.' },
  { id: 'logistics', label: 'Logistics', image: imgManufacturing, subtitle: 'Supply chain intelligence', desc: 'AI-powered route optimization, demand forecasting, and real-time supply chain visibility.' },
  { id: 'healthcare', label: 'Healthcare', image: imgHealthcare, subtitle: 'HIPAA-compliant processing', desc: 'HIPAA-compliant processing for EHR records and multimodal imaging.' },
  { id: 'defense', label: 'Defense', image: imgDefense, subtitle: 'Sovereign AI systems', desc: 'Secure, air-gapped sovereign AI systems built for mission-critical operations.' },
]

// â”€â”€â”€ LOGO MARQUEE (backed by Engineers fromâ€¦) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function LogoMarquee() {
    const logos = [
      ...ENGINEER_PEDIGREE,
      ...ENGINEER_PEDIGREE,
      ...ENGINEER_PEDIGREE,
      ...ENGINEER_PEDIGREE,
    ]

    return (
      <section
        className="logo-marquee"
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
          padding: 'var(--spacing-section) 0',
          background: 'var(--color-bg)',
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
              backed by engineers from
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

// â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function HeroSection() {
    const ref = useRef(null)
    const videoRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '12%']), { stiffness: 60, damping: 20 })
    const contentOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), { stiffness: 60, damping: 20 })

    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      video.loop = true
      const ensurePlaying = () => {
        if (video.paused) {
          video.play().catch(() => {})
        }
      }

      ensurePlaying()
      video.addEventListener('ended', ensurePlaying)
      document.addEventListener('visibilitychange', ensurePlaying)

      return () => {
        video.removeEventListener('ended', ensurePlaying)
        document.removeEventListener('visibilitychange', ensurePlaying)
      }
    }, [])

    return (
      <section
        ref={ref}
        aria-labelledby="hero-heading"
        className="hero-v2"
      >
        <div className="hero-v2__bg" aria-hidden="true" />

        <motion.div
          className="container-editorial hero-v2__grid"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            className="hero-v2__content"
            variants={staggerHero}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={heroWordReveal} className="hero-v2__eyebrow">
              India's Sovereign AI Platform
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={heroWordReveal}
              className="hero-v2__headline"
            >
              AI at scale.{' '}
              <em>Without the chaos.</em>
            </motion.h1>

            <motion.p variants={heroWordReveal} className="hero-v2__subtext">
              Built on sovereign compute. Powered by frontier-class models.
              Engineered from bare-metal kernels to secure, air-gapped deployments.
            </motion.p>

            <motion.div variants={heroWordReveal} className="hero-v2__actions">
              <Link to="/contact" className="btn-primary">
                Book a Demo
                <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-glass">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-v2__visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-v2__video-frame">
              <video
                ref={videoRef}
                className="hero-v2__video hero-v2__video--alpha"
                src={HERO_VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Sovereign AI infrastructure visualization"
              />
            </div>
          </motion.div>
        </motion.div>

        <a href="#pipeline" className="hero-v2__scroll" aria-label="Scroll to explore">
          <ChevronDown size={18} strokeWidth={1.5} />
        </a>
      </section>
    )
  }

// â”€â”€â”€ PLATFORM INFRASTRUCTURE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function SovereignPillarsSection() {
    return (
      <section className="home-section home-section--mesh">
        <div className="container-editorial home-section__inner">
          <div className="home-section-header">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>The Platform Enterprises Build On</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display">
                Powering sovereign
                <br />
                <span className="text-muted-line">AI-first infrastructure.</span>
              </h2>
            </RevealText>
          </div>

          <div className="home-card-grid home-card-grid--3">
            {SOVEREIGN_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <ScrollFade3D key={pillar.title}>
                  <div className="glass-card glass-card--pad glass-card--feature">
                    <div className="glass-card__icon">
                      <Icon size={22} color="var(--color-accent)" strokeWidth={1.75} />
                    </div>
                    <h3 className="glass-card__title">{pillar.title}</h3>
                    <p className="glass-card__body">{pillar.body}</p>
                  </div>
                </ScrollFade3D>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  function POCToProductionSection() {
    return (
      <section className="home-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container-editorial home-section__inner">
          <div className="home-section-header">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>From Idea to Impact</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display">
                POC to Production
                <br />
                <span className="text-muted-line">Sovereign AI Systems for Enterprise Scale.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ marginTop: '16px' }}>
                We don't stop at demos. Our teams embed with yours to ship production-grade agentic systems—
                built on sovereign infrastructure, engineered for reliability, and designed to scale without compromise.
              </p>
            </RevealText>
          </div>

          <div className="home-card-grid home-card-grid--3">
            <ScrollFade3D>
              <div className="glass-card glass-card--pad glass-card--feature">
                <div className="glass-card__icon">
                  <ArrowRight size={22} color="var(--color-accent)" strokeWidth={1.75} />
                </div>
                <h3 className="glass-card__title">Rapid POC Validation</h3>
                <p className="glass-card__body">
                  Prove business value fast with lightweight, focused proof of concepts tailored to your use case.
                </p>
              </div>
            </ScrollFade3D>

            <ScrollFade3D>
              <div className="glass-card glass-card--pad glass-card--feature">
                <div className="glass-card__icon">
                  <Shield size={22} color="var(--color-accent)" strokeWidth={1.75} />
                </div>
                <h3 className="glass-card__title">Production-Grade Build</h3>
                <p className="glass-card__body">
                  Engineer robust, secure, and scalable agentic systems with full compliance and governance controls.
                </p>
              </div>
            </ScrollFade3D>

            <ScrollFade3D>
              <div className="glass-card glass-card--pad glass-card--feature">
                <div className="glass-card__icon">
                  <Server size={22} color="var(--color-accent)" strokeWidth={1.75} />
                </div>
                <h3 className="glass-card__title">Sovereign Deployment</h3>
                <p className="glass-card__body">
                  Deploy on your infrastructure or ours—air-gapped, private cloud, or fully managed sovereign compute.
                </p>
              </div>
            </ScrollFade3D>
          </div>
        </div>
      </section>
    )
  }

  function PlatformInfrastructureSection() {
    return (
      <section id="pipeline" className="home-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container-editorial home-section__inner">
          <div className="home-section-header">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Sovereign GPU Infrastructure</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display">
                High-performance compute.
                <br />
                <span className="text-muted-line">Purpose-built for your industry.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ marginTop: '16px' }}>
                Custom-built GPU clusters for ultra-low latency inference, air-gapped security,
                and sovereign data compliance—tailored to your enterprise requirements.
              </p>
            </RevealText>
          </div>

          <div className="home-card-grid home-card-grid--2">
            <ScrollFade3D>
              <div className="glass-card glass-card--pad glass-card--feature">
                <div className="glass-card__icon">
                  <Server size={22} color="var(--color-accent)" strokeWidth={1.75} />
                </div>
                <h3 className="glass-card__title">Bare-Metal Acceleration</h3>
                <p className="glass-card__body">
                  Direct access to ultra-low latency inference, bypassing slow high-level wrappers
                  for mission-critical AI routing and semantic vector search.
                </p>
                <Link to="/solutions" className="btn-outline" style={{ width: 'fit-content', marginTop: '8px' }}>
                  Learn more
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollFade3D>

            <ScrollFade3D>
              <div className="glass-card glass-card--pad glass-card--feature">
                <div className="glass-card__icon">
                  <Shield size={22} color="var(--color-accent)" strokeWidth={1.75} />
                </div>
                <h3 className="glass-card__title">Air-Gapped Deployments</h3>
                <p className="glass-card__body">
                  Fully sovereign data centers and on-premise GPU clusters ensuring absolute
                  privacy for your most sensitive enterprise workloads.
                </p>
                <Link to="/solutions" className="btn-outline" style={{ width: 'fit-content', marginTop: '8px' }}>
                  Learn more
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollFade3D>
          </div>
        </div>
      </section>
    )
  }

  function DeploymentFlexibilitySection() {
    return (
      <section className="home-section home-section--mesh">
        <div className="container-editorial home-section__inner">
          <div className="home-section-header home-section-header--left">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Built to run anywhere</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display">
                Deployment flexibility
                <br />
                <span className="text-muted-line">your business demands.</span>
              </h2>
            </RevealText>
          </div>

          <div className="home-card-grid home-card-grid--3">
            {DEPLOYMENT_OPTIONS.map((option) => (
              <ScrollFade3D key={option.title}>
                <div className="glass-card glass-card--pad glass-card--feature">
                  <span className="glass-card__label">{option.subtitle}</span>
                  <h3 className="glass-card__title">{option.title}</h3>
                  <p className="glass-card__body">{option.description}</p>
                </div>
              </ScrollFade3D>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function IndustriesSection() {
    return (
      <section className="home-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container-editorial home-section__inner">
          <div className="home-section-header">
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Industries</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display">
                AI solutions built for
                <br />
                <span className="text-muted-line">every sector.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ marginTop: '16px' }}>
                Purpose-built AI for regulated, high-stakes sectors—from healthcare
                diagnostics to financial compliance and defense operations.
              </p>
            </RevealText>
          </div>

          <div className="home-card-grid home-card-grid--industries">
            {INDUSTRY_CARDS.map((industry) => (
              <ScrollFade3D key={industry.id}>
                <div className="glass-card industry-glass-card">
                  <div className="industry-glass-card__image">
                    <img src={industry.image} alt={industry.label} loading="lazy" />
                  </div>
                  <div className="industry-glass-card__content">
                    <span className="glass-card__label">{industry.subtitle}</span>
                    <h3 className="glass-card__title">{industry.label}</h3>
                    <p className="glass-card__body">{industry.desc}</p>
                    <Link
                      to="/solutions"
                      className="link-minimal"
                      style={{ marginTop: 'auto', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Learn More
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </ScrollFade3D>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function SocialProofSection() {
    return (
      <section className="home-section home-section--mesh">
        <div className="container-editorial home-section__inner">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center' }}>
            <div>
              <RevealText>
                <p className="text-eyebrow" style={{ marginBottom: '20px' }}>AI for the Enterprise</p>
              </RevealText>
              <RevealText delay={1}>
                <h2 className="text-display home-section-title">
                  Full-Stack
                  <br />
                  <span className="text-muted-line">AI Solutions.</span>
                </h2>
              </RevealText>
              <RevealText delay={2}>
                <p className="text-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
                  Outcomes delivered with data, models, agents, and deployment.
                  We don't just wrap APIs. We build systems that actually perform in production.
                </p>
              </RevealText>
              <RevealText delay={3}>
                <Link to="/solutions" className="btn-glass">
                  Learn More
                  <ArrowRight size={14} />
                </Link>
              </RevealText>
            </div>

            <RevealText delay={2}>
              <div className="glass-panel capability-glass-panel">
                <StaggerReveal>
                  {CAPABILITIES_SUMMARY.slice(0, 4).map((cap) => (
                    <div key={cap} className="capability-glass-panel__item">
                      <span className="capability-glass-panel__dot" />
                      {cap}
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </RevealText>
          </div>
        </div>
      </section>
    )
  }

// â”€â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function CTASection() {
    return (
      <section id="contact" aria-labelledby="cta-heading" className="home-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container-editorial home-section__inner">
          <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />

          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Connect</p>
          </RevealText>

          <RevealText delay={1}>
            <h2 id="cta-heading" className="text-display" style={{ maxWidth: '800px', marginBottom: '20px' }}>
              Let's build something{' '}
              <span className="text-muted-line">exceptional.</span>
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
            <div className="hero-v2__actions">
              <Link to="/contact" className="btn-primary">
                Start the Conversation
                <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-glass">
                Contact Us
              </Link>
            </div>
          </RevealText>
        </div>
      </section>
    )
  }

// â”€â”€â”€ PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        }
      ]
    };

    return (
      <div className="page-consulting">
        <SEO
          title="Single Core Labs"
          description="Single Core Labs provides custom AI systems engineering and sovereign AI infrastructure. We build, deploy, and operate bespoke agentic architectures for enterprises."
          keywords="AI systems engineering, sovereign AI infrastructure, custom agentic architectures, applied AI research, enterprise AI solutions"
          schema={schema}
        />
        <Navbar />
        <main id="main-content" className="home-page">
          <HeroSection />
          <div className="consulting-block"><LogoMarquee /></div>
          <SovereignPillarsSection />
          <POCToProductionSection />
          <PlatformInfrastructureSection />
          <DeploymentFlexibilitySection />
          <IndustriesSection />
          <SocialProofSection />
          <PoweredBySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    )
  }
