import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PoweredBySection } from '@/components/PoweredBySection'
import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D, Card3D, SectionDepth } from '@/components/ScrollScene'
import {
  ENGINEER_PEDIGREE,
  DIFFERENTIATORS,
  INDUSTRIES,
  CAPABILITIES_SUMMARY,
} from '@/lib/constants'
import { staggerHero, heroWordReveal } from '@/lib/animations'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import SEO from '@/components/SEO'

import imgHealthcare from '@/assets/gpu-server/healthcare-tech.png'
import imgNvidiaDsx from '@/assets/gpu-server/nvidia-dsx.png'
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
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(100px, 14vh, 160px) 0 clamp(48px, 6vh, 80px)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(186, 230, 253, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(192, 132, 252, 0.05) 100%)',
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
            Bespoke agentic architectures for enterprises, from data ingestion to air-gapped deployments.
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

// ─── ENTERPRISE GRADE SECTION ────────────────────────────────────────────────
function EnterpriseGradeSection() {
  const checkItem = (text) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 105, 92, 0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Check size={11} style={{ color: 'var(--color-accent)' }} strokeWidth={3} />
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '14px',
        color: 'rgba(26, 26, 26, 0.8)', lineHeight: 1.5,
        fontWeight: 400
      }}>{text}</span>
    </div>
  )

  const COMPLIANCE_BADGES = [
    { label: 'SOC 2 Type II', color: '#2563eb' },
    { label: 'ISO 27001', color: '#16a34a' },
    { label: 'DPDP Compliant', color: '#dc2626' },
    { label: 'Role-based access', color: '#9333ea' },
    { label: 'Full audit trail', color: '#ea580c' },
    { label: 'Data residency controls', color: '#dc2626' },
  ]

  const glassCardStyle = {
    background: 'linear-gradient(135deg, rgba(240, 247, 255, 0.6) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
    padding: 'clamp(28px, 4vh, 40px)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }

  return (
    <section id="pipeline" style={{
      padding: 'var(--spacing-section-lg) 0',
      background: '#F5F5F7', // Soft neutral gray
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background ambient light */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(186, 230, 253, 0.3) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none'
      }} />

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vh, 72px)' }}>
          <RevealText>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}>
              Enterprise-grade. <span className="text-italic-serif">Out of the box.</span>
            </h2>
          </RevealText>
          <RevealText delay={1}>
            <p className="text-body" style={{ maxWidth: '520px', margin: '0 auto', color: 'var(--color-text-muted)' }}>
              Compliance, control, and confidence. Built for the most regulated
              environments from day one.
            </p>
          </RevealText>
        </div>

        {/* Top two cards */}
        <ScrollFade3D>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}>
            {/* Card 1 — Forward deployed */}
            <div
              style={glassCardStyle}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}>
                Forward deployed
              </h3>
              <p className="text-body" style={{ marginBottom: '28px', fontSize: '15px', color: 'rgba(26, 26, 26, 0.7)' }}>
                Our engineers work alongside yours — designing agents, integrating systems,
                and staying until you're live. A true engineering partnership.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: 'auto' }}>
                {checkItem('Dedicated engineer from day one')}
                {checkItem('Joint workflow design and build')}
                {checkItem('Ongoing accuracy optimization')}
                {checkItem('SLA-backed production support')}
              </div>
            </div>

            {/* Card 2 — Deployment flexibility */}
            <div
              style={glassCardStyle}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)';
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}>
                Deployment flexibility
              </h3>
              <p className="text-body" style={{ marginBottom: '28px', fontSize: '15px', color: 'rgba(26, 26, 26, 0.7)' }}>
                Your AI runs where your data lives. Private cloud, on-premise,
                hybrid, or fully air-gapped. Your agents, your terms.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: 'auto' }}>
                {checkItem('Private cloud or hybrid')}
                {checkItem('Bring your own model')}
                {checkItem('Vendor-agnostic workflows')}
                {checkItem('Air-gapped deployment ready')}
              </div>
            </div>
          </div>
        </ScrollFade3D>

        {/* Bottom card — Security */}
        <ScrollFade3D>
          <div
            style={{
              ...glassCardStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)';
            }}
          >
            <div>
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(18px, 1.5vw, 22px)',
                fontWeight: 600,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}>
                Security and governance
              </h3>
              <p className="text-body" style={{ fontSize: '15px', maxWidth: '440px', color: 'rgba(26, 26, 26, 0.7)' }}>
                Every action is logged and traceable. Role-based access and
                data residency are core features, built to meet the strictest
                risk assessments.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {COMPLIANCE_BADGES.map(badge => (
                <span key={badge.label} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(4px)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  letterSpacing: '0.04em',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
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
  const item1 = DIFFERENTIATORS[0];
  const item2 = DIFFERENTIATORS[1];
  const item3 = DIFFERENTIATORS[2];

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '24px',
    border: '1px solid var(--color-border)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
    color: 'var(--color-text)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex'
  }

  return (
    <SectionDepth>
      <section style={{ padding: 'clamp(60px, 10vh, 120px) 0' }}>
        <div className="container-editorial">
          
          <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vh, 100px)' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Why Single Core Labs</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ maxWidth: '800px', margin: '0 auto' }}>
                Convert your proprietary data
                <br />
                <span className="text-italic-serif">into intelligent agents.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
                Build AI systems that don't just respond. They learn, adapt, and improve with every interaction. Experience enterprise-grade engineering designed to bring your most ambitious ideas from prototype to production securely and reliably.
              </p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Card 1: Adaptive Agents (Col 1 & 2, Wide) */}
            <ScrollFade3D style={{ display: 'flex' }} className="lg:col-span-2">
              <div 
                className="flex flex-col md:flex-row w-full"
                style={cardStyle}
              >
                <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px, 4vw, 48px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '16px' }}>
                    {item1.headline}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6 }}>
                    {item1.description}
                  </p>
                </div>
                <div style={{ flex: '1 1 50%', position: 'relative', minHeight: '250px' }}>
                  <img src={imgAgenticAi} alt="Adaptive Agents" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </ScrollFade3D>

            {/* Card 2: Full-Stack (Col 3, Row span 2, Tall) */}
            <ScrollFade3D style={{ display: 'flex' }} className="lg:col-span-1 lg:row-span-2">
              <div 
                className="flex flex-col w-full h-full"
                style={cardStyle}
              >
                 <div style={{ flex: '1 1 auto', position: 'relative', minHeight: '200px' }}>
                   <img src={imgFullStack} alt="Full Stack AI" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ padding: 'clamp(24px, 4vw, 40px)', background: '#FFFFFF' }}>
                   <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '16px' }}>
                    {item2.headline}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6 }}>
                    {item2.description}
                  </p>
                 </div>
              </div>
            </ScrollFade3D>

            {/* Card 3: Demanding Workloads (Col 1 & 2, Wide) */}
            <ScrollFade3D style={{ display: 'flex' }} className="lg:col-span-2">
              <div 
                className="flex flex-col md:flex-row-reverse w-full"
                style={cardStyle}
              >
                <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(24px, 4vw, 48px)' }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '16px' }}>
                    {item3.headline}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1.6 }}>
                    {item3.description}
                  </p>
                </div>
                <div style={{ flex: '1 1 50%', position: 'relative', minHeight: '250px' }}>
                  <img src={imgAiWorkload} alt="Demanding Workloads" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </ScrollFade3D>

          </div>
        </div>
      </section>
    </SectionDepth>
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
                The SCL Aggregator is a distributed backend system for intelligent LLM routing, semantic caching, and provider abstraction—running securely on custom GPU kernels.
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
  const [activeIndex, setActiveIndex] = useState(0)

  const INDUSTRY_CARDS = [
    { id: 'finance', label: 'Finance', image: imgFinance, subtitle: 'High-frequency infrastructure', desc: 'High-frequency trading infrastructure and compliance-driven workflows.' },
    { id: 'tech', label: 'Technology', image: imgTech, subtitle: 'Scalable LLM platforms', desc: 'Scalable LLM routing and vector databases for high-growth platforms.' },
    { id: 'manufacturing', label: 'Manufacturing', image: imgManufacturing, subtitle: 'Robotics optimization', desc: 'Predictive maintenance and robotics optimization powered by edge inference.' },
    { id: 'healthcare', label: 'Healthcare', image: imgHealthcare, subtitle: 'HIPAA-compliant processing', desc: 'HIPAA-compliant processing for EHR records and multimodal imaging.' },
    { id: 'defense', label: 'Defense', image: imgDefense, subtitle: 'Sovereign AI systems', desc: 'Secure, air-gapped sovereign AI systems built for mission-critical operations.' }
  ]

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % INDUSTRY_CARDS.length)
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + INDUSTRY_CARDS.length) % INDUSTRY_CARDS.length)

  const activeData = INDUSTRY_CARDS[activeIndex]

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

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">

          {/* Left Navigation Tabs (Vertical) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {INDUSTRY_CARDS.map((industry, idx) => {
              const isActive = activeIndex === idx
              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: isActive ? 'var(--color-bg-elevated)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-border)' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--color-accent)' : '4px solid transparent',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isActive ? 1 : 0.6,
                    textAlign: 'left',
                    boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.03)' : 'none'
                  }}
                  className="hover:opacity-100 hover:bg-black/5"
                >
                  <img
                    src={industry.image}
                    alt={industry.label}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
                      {industry.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, marginTop: '2px' }}>
                      {industry.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Large Image */}
            <Card3D intensity={2} style={{ borderRadius: '24px', overflow: 'hidden' }}>
              <motion.img
                key={activeData.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                src={activeData.image}
                alt={activeData.label}
                style={{ width: '100%', height: 'clamp(300px, 40vh, 450px)', objectFit: 'cover', display: 'block' }}
              />
            </Card3D>

            {/* Text and Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <motion.div
                key={activeData.id + "-text"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '64px', color: 'var(--color-accent)', lineHeight: 0.8, opacity: 0.2 }}>"</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.6, color: 'var(--color-text)', margin: 0 }}>
                      {activeData.desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Arrows & CTA */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
                <Link to="/solutions" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '30px', fontSize: '14px' }}>
                  Learn More
                  <ArrowRight size={14} />
                </Link>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
                  <button
                    onClick={handlePrev}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                    className="hover:bg-black/5"
                  >
                    <ChevronLeft size={20} color="var(--color-text)" />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                    className="hover:bg-black/5"
                  >
                    <ChevronRight size={20} color="var(--color-text)" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

// ─── SOCIAL PROOF ───────────────────────────────────────────────────────────
function SocialProofSection() {
  return (
    <section style={{ backgroundColor: '#0B0F19', padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
          
          <div style={{ order: 0 }}>
            <RevealText>
              <p style={{ color: '#5B7CFF', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
                AI FOR THE ENTERPRISE
              </p>
            </RevealText>
            <RevealText delay={1}>
              <h2 style={{ color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Full-Stack
                <br />
                <span className="text-italic-serif" style={{ color: '#A0AABF' }}>AI Solutions.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: '#A0AABF', fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                Outcomes delivered with data, models, agents, and deployment.
                We don't just wrap APIs. We build systems that actually perform
                in production.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <Link to="/solutions" style={{ display: 'inline-flex', padding: '14px 28px', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', borderRadius: '4px', textDecoration: 'none', fontSize: '15px', transition: 'all 0.2s', fontFamily: 'var(--font-sans)' }} className="hover:border-white hover:bg-white/5">
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
                    background: 'rgba(255,255,255,0.15)' 
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
                          color: '#FFFFFF',
                          paddingBlock: '16px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
                          background: '#5B7CFF',
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
        <DifferentiatorsSection />
        <EnterpriseGradeSection />
        <PoweredBySection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}



