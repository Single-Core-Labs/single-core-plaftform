import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PoweredBySection } from '@/components/PoweredBySection'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D, SectionDepth } from '@/components/ScrollScene'
import {
  ENGINEER_PEDIGREE,
  DIFFERENTIATORS,
  CAPABILITIES_SUMMARY,
} from '@/lib/constants'
import { staggerHero, heroWordReveal } from '@/lib/animations'
import { ArrowRight, Check, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import SEO from '@/components/SEO'

import imgHealthcare from '@/assets/gpu-server/healthcare-tech.png'
import imgServerRoom from '@/assets/gpu-server/server-room.png'
import imgServer3 from '@/assets/gpu-server/server-3.png'
import imgDefense from '@/assets/gpu-server/defense-server.png'
import imgFinance from '@/assets/gpu-server/server-1.png'
import imgTech from '@/assets/gpu-server/server-2.png'
import imgManufacturing from '@/assets/gpu-server/manufacturing-server.png'
import imgAgenticAi from '@/assets/gpu-server/agentic-ai.png'
import imgFullStack from '@/assets/gpu-server/full-stack.png'
import imgAiWorkload from '@/assets/gpu-server/ai-workload.png'

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
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '18%']), { stiffness: 60, damping: 20 })
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), { stiffness: 60, damping: 20 })

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"

      className="hero-section-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(100px, 14vh, 160px) 0 clamp(48px, 6vh, 80px)',
        overflow: 'hidden',
        background: `linear-gradient(to right, rgba(250, 250, 250, 0.98) 0%, rgba(250, 250, 250, 0.94) 40%, rgba(250, 250, 250, 0.85) 70%, rgba(250, 250, 250, 0.15) 100%), url(${imgServerRoom}) center right / cover no-repeat`,
      }}
    >
      {/* Animated glass orbs */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '60vw', height: '60vw', maxWidth: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186, 230, 253, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'heroOrb1 12s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '-5%',
          width: '50vw', height: '50vw', maxWidth: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'heroOrb2 14s ease-in-out infinite alternate',
        }} />
      </div>

      <style>{`
        @keyframes heroOrb1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes heroOrb2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-5%, 4%) scale(1.12); }
        }
        @media (max-width: 768px) {
          .hero-section-bg {
            background: linear-gradient(180deg, rgba(250, 250, 250, 0.98) 0%, rgba(250, 250, 250, 0.92) 100%), url(${imgServerRoom}) center right / cover no-repeat !important;
          }
        }
      `}</style>

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
            Sovereign AI Infrastructure
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
            Bespoke agentic routing and sovereign GPU clusters, engineered from bare-metal kernels to secure, air-gapped deployments.
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

// ─── PLATFORM INFRASTRUCTURE ────────────────────────────────────────────────
function PlatformInfrastructureSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative'
  }

  const collapsedHeight = 'clamp(180px, 22vh, 240px)'
  const expandedImageHeight = 'clamp(250px, 30vh, 320px)'

  return (
    <SectionDepth>
      <section style={{ padding: 'var(--spacing-section-lg) 0', background: '#FAFAFA' }}>
        <div className="container-editorial">
          <div style={{ marginBottom: 'clamp(48px, 6vh, 64px)', textAlign: 'center' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Sovereign GPU Infrastructure</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ maxWidth: '800px', margin: '0 auto' }}>
                High-performance compute.
                <br />
                <span className="text-italic-serif">Purpose-built for your industry.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '600px', margin: '16px auto 0', color: 'var(--color-text-muted)' }}>
                A distributed backend system for intelligent LLM routing, semantic caching, and provider abstraction—running securely on custom GPU kernels.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Card: Bare-Metal Acceleration */}
            <ScrollFade3D>
              <div 
                style={{ ...cardStyle, height: '100%' }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div style={{ position: 'relative', width: '100%', height: isExpanded ? expandedImageHeight : collapsedHeight, transition: 'height 0.4s ease' }}>
                  <img 
                    src={imgServer3} 
                    alt="Bare-Metal Acceleration" 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: isExpanded ? 'linear-gradient(to top, #FFFFFF 0%, transparent 20%)' : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', transition: 'background 0.4s ease' }} />
                  
                  {/* Title overlay when closed */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isExpanded ? 0 : 1 }}
                    style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                      Bare-Metal Acceleration
                    </h3>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Plus size={20} />
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, marginBottom: '16px' }}>
                      Bare-Metal Acceleration
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                      Direct access to ultra-low latency inference, bypassing slow high-level wrappers for mission-critical AI routing and semantic vector search.
                    </p>
                    <button 
                      style={{ 
                        background: 'var(--color-text)', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '12px 24px', 
                        borderRadius: '8px', 
                        fontWeight: 500, 
                        fontSize: '14px', 
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        marginTop: 'auto'
                      }}
                      className="hover:opacity-90"
                    >
                      View details
                    </button>
                  </div>
                </motion.div>
              </div>
            </ScrollFade3D>

            {/* Right Card: Air-Gapped Deployments */}
            <ScrollFade3D>
              <div 
                style={{ ...cardStyle, height: '100%' }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {/* Expanding text container AT THE TOP */}
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0, marginBottom: '16px' }}>
                      Air-Gapped Deployments
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                      Fully sovereign data centers and on-premise GPU clusters ensuring absolute privacy for your most sensitive enterprise workloads.
                    </p>
                    <button 
                      style={{ 
                        background: 'var(--color-text)', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '12px 24px', 
                        borderRadius: '8px', 
                        fontWeight: 500, 
                        fontSize: '14px', 
                        cursor: 'pointer',
                        transition: 'opacity 0.2s'
                      }}
                      className="hover:opacity-90"
                    >
                      View infrastructure
                    </button>
                  </div>
                </motion.div>
                
                {/* Image AT THE BOTTOM */}
                <div style={{ position: 'relative', width: '100%', height: isExpanded ? expandedImageHeight : collapsedHeight, transition: 'height 0.4s ease' }}>
                  <div style={{ position: 'absolute', inset: 0, background: isExpanded ? 'linear-gradient(to bottom, #FFFFFF 0%, transparent 20%)' : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', zIndex: 1, transition: 'background 0.4s ease' }} />
                  <img 
                    src={imgServerRoom} 
                    alt="Air-Gapped Server Room" 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                  
                  {/* Title overlay when closed */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isExpanded ? 0 : 1 }}
                    style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                      Air-Gapped Deployments
                    </h3>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Plus size={20} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollFade3D>

          </div>
        </div>
      </section>
    </SectionDepth>
  )
}

// ─── INDUSTRIES — CAROUSEL ──────────────────────────────────────────────────
function IndustriesSection() {
  const INDUSTRY_CARDS = [
    { id: 'finance', label: 'Finance', image: imgFinance, subtitle: 'High-frequency infrastructure', desc: 'High-frequency trading infrastructure and compliance-driven workflows.' },
    { id: 'tech', label: 'Technology', image: imgTech, subtitle: 'Scalable LLM platforms', desc: 'Scalable LLM routing and vector databases for high-growth platforms.' },
    { id: 'manufacturing', label: 'Manufacturing', image: imgManufacturing, subtitle: 'Robotics optimization', desc: 'Predictive maintenance and robotics optimization powered by edge inference.' },
    { id: 'healthcare', label: 'Healthcare', image: imgHealthcare, subtitle: 'HIPAA-compliant processing', desc: 'HIPAA-compliant processing for EHR records and multimodal imaging.' },
    { id: 'defense', label: 'Defense', image: imgDefense, subtitle: 'Sovereign AI systems', desc: 'Secure, air-gapped sovereign AI systems built for mission-critical operations.' }
  ]

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '24px',
    border: '1px solid var(--color-border)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
    color: 'var(--color-text)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <section style={{ padding: 'var(--spacing-section) 0', background: '#FFFFFF' }}>
      <div className="container-editorial">
        <div style={{ marginBottom: 'clamp(40px, 6vh, 60px)', textAlign: 'center' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Industries</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ maxWidth: '600px', margin: '0 auto' }}>
              AI solutions built for
              <br />
              <span className="text-italic-serif">every sector.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '560px', margin: '20px auto 0', color: 'var(--color-text-muted)' }}>
              From healthcare diagnostics to financial compliance, logistics
              optimization to e-commerce intelligence. Purpose-built AI for
              regulated, high-stakes sectors.
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {INDUSTRY_CARDS.map((industry) => (
            <ScrollFade3D key={industry.id} style={{ display: 'flex' }}>
              <div 
                style={cardStyle}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(0, 105, 92, 0.2)'
                  const img = e.currentTarget.querySelector('img')
                  if (img) img.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  const img = e.currentTarget.querySelector('img')
                  if (img) img.style.transform = 'scale(1)'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', width: '100%' }}>
                  <img 
                    src={industry.image} 
                    alt={industry.label} 
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      display: 'block', 
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)' }} />
                </div>

                {/* Content */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '11px', 
                    fontWeight: 600, 
                    letterSpacing: '0.08em', 
                    textTransform: 'uppercase', 
                    color: 'var(--color-accent)' 
                  }}>
                    {industry.subtitle}
                  </span>
                  
                  <h3 style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '20px', 
                    fontWeight: 600, 
                    color: 'var(--color-text)', 
                    margin: 0,
                    letterSpacing: '-0.01em' 
                  }}>
                    {industry.label}
                  </h3>
                  
                  <p style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '14px', 
                    lineHeight: 1.6, 
                    color: 'var(--color-text-muted)', 
                    margin: 0,
                    marginBottom: '16px' 
                  }}>
                    {industry.desc}
                  </p>

                  <Link 
                    to="/solutions" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '14px', 
                      fontWeight: 500, 
                      color: 'var(--color-text)', 
                      textDecoration: 'none', 
                      marginTop: 'auto',
                      transition: 'color 0.2s' 
                    }}
                    className="hover:text-accent font-sans"
                    onMouseEnter={e => {
                      const svg = e.currentTarget.querySelector('svg')
                      if (svg) svg.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      const svg = e.currentTarget.querySelector('svg')
                      if (svg) svg.style.transform = 'translateX(0)'
                    }}
                  >
                    Learn More
                    <ArrowRight size={14} style={{ transition: 'transform 0.2s' }} />
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

// ─── SOCIAL PROOF ───────────────────────────────────────────────────────────
function SocialProofSection() {
  return (
    <section style={{ backgroundColor: '#FAFAFA', padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
          
          <div style={{ order: 0 }}>
            <RevealText>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
                AI FOR THE ENTERPRISE
              </p>
            </RevealText>
            <RevealText delay={1}>
              <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Full-Stack
                <br />
                <span className="text-italic-serif" style={{ color: 'var(--color-text-muted)' }}>AI Solutions.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                Outcomes delivered with data, models, agents, and deployment.
                We don't just wrap APIs. We build systems that actually perform
                in production.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <Link to="/solutions" className="btn-outline">
                Learn More
              </Link>
            </RevealText>
          </div>

          <div style={{ order: 1 }}>
            <RevealText delay={2}>
              <div style={{ position: 'relative', paddingLeft: 'clamp(20px, 4vw, 60px)' }}>
                {/* Vertical line matching the EliseAI screenshot */}
                <div 
                  className="hidden lg:block" 
                  style={{ 
                    position: 'absolute', 
                    top: '0', 
                    bottom: '0', 
                    left: '0', 
                    width: '1px', 
                    background: 'var(--color-border)' 
                  }} 
                />
                
                <StaggerReveal>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {CAPABILITIES_SUMMARY.slice(0, 4).map((cap) => (
                      <p
                        key={cap}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(16px, 1.5vw, 18px)',
                          fontWeight: 400,
                          color: 'var(--color-text)',
                          paddingBlock: '16px',
                          borderBottom: '1px solid var(--color-border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--color-accent)',
                          flexShrink: 0,
                        }} />
                        {cap}
                      </p>
                    ))}
                  </div>
                </StaggerReveal>
              </div>
            </RevealText>
          </div>

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
        <PlatformInfrastructureSection />
        <IndustriesSection />
        <SocialProofSection />
        <PoweredBySection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
