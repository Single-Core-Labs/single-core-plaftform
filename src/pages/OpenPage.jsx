import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Box, FileText, Code2, Layers, Factory, Puzzle, Building2, Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { Preloader } from '@/components/preloader'
import SEO from '@/components/SEO'

function PreloaderWrapper({ onDone }) {
  // Demo: words variant adapted to Open page tokens; respects reduced-motion
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    // skip animation, call done immediately
    setTimeout(onDone, 0)
    return null
  }
  return <Preloader variant="words" words={['Open', 'Intelligence']} duration={1600} onDone={onDone} theme="dark" />
}

const EASE = [0.16, 1, 0.3, 1]
const FONT = "'Manrope', ui-sans-serif, system-ui, sans-serif"
const MONO = "'IBM Plex Mono', ui-monospace, monospace"

const COMMITMENTS = [
  {
    n: '01',
    icon: Box,
    title: 'Model Weights',
    text: 'We will release open weights for our models — permissively licensed, reproducible, and built for real control over your intelligence. Own the weights, own the roadmap.',
  },
  {
    n: '02',
    icon: FileText,
    title: 'Science',
    text: 'We will publish the research behind our models as papers, including technical reports that describe our methods, data, and evaluations — no black boxes.',
  },
  {
    n: '03',
    icon: Code2,
    title: 'Software',
    text: 'We will open source software that lets the community customize and build with our models, including reinforcement learning tools and environments. A full AI stack around open models.',
  },
]

// Reordered to match requested hierarchy: AI factory → open core stack → open model (then solutions)
const STACK = [
  {
    icon: Factory,
    kicker: 'The AI factory',
    title: 'Physical and operational infrastructure at scale',
    desc: 'The physical and operational infrastructure that runs the open core stack at production scale — sovereign, observable, and secure.',
    accent: '#0A0A0A',
  },
  {
    icon: Layers,
    kicker: 'The open core AI stack',
    title: 'The open source software, with easily deployable containers and recipes to customize and run your agents',
    desc: 'Open source software to customize and run agents: training, RL, eval, and serving — containerized and reproducible. Extend with your tools, your data.',
    accent: '#5A9E8F',
  },
  {
    icon: Box,
    kicker: 'The open model',
    title: 'Built for customization and long-term control',
    desc: 'We build open models that let anyone control their intelligence — permissively licensed weights you can fine-tune, distill, and deploy on your terms.',
    accent: '#9CA3AF',
  },
  {
    icon: Puzzle,
    kicker: 'AI solutions',
    title: 'Turning infrastructure into outcomes',
    desc: 'Solutions and integrations on top of the AI factory, turning infrastructure into outcomes — healthcare, finance, and operations.',
    accent: '#111111',
  },
]

const AUDIENCES = [
  {
    icon: Code2,
    title: 'Developers',
    body: 'Build with open models and the freedom to experiment, customize, and deploy on your own terms. We support the open community through permissive licensing, direct developer support, and an ecosystem of components and integrations, without relying on closed systems or vendor lock-in.',
  },
  {
    icon: Building2,
    title: 'Enterprises',
    body: 'Deploy intelligence with the control, flexibility, and transparency enterprise environments require. Customize and run models on your own infrastructure or on our ecosystem of partners, without relying on closed systems or vendor lock-in.',
  },
  {
    icon: Landmark,
    title: 'Public Sector',
    body: 'Deploy open-weight models on sovereign infrastructure. We give you full control over governance, security, and long-term operation, without a dependency on a closed system.',
  },
]

function OpenCommitments() {
  return (
    <section className="container-editorial" style={{ marginBottom: 'clamp(64px, 8vw, 100px)', paddingTop: 'clamp(48px, 6vw, 80px)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
        <RevealText><p className="text-eyebrow" style={{ marginBottom: 12 }}>Our commitment</p></RevealText>
        <RevealText delay={1}><h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', maxWidth: 720, margin: '0 auto' }}>Open by design. <em style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Three promises.</em></h2></RevealText>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%),1fr))', gap: 20 }}>
        {COMMITMENTS.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div key={c.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }} className="card card--rounded card--pad" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}><Icon size={18} strokeWidth={1.5} /></div>
              <p className="text-eyebrow" style={{ fontSize: 11, marginBottom: 0 }}>{c.n} · {c.title}</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.3, margin: 0 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>{c.text}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function OpenStack() {
  return (
    <>
      {/* Full AI Stack — like TechPage Platform Services + WhoWeWork style */}
      <section style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'clamp(72px, 9vw, 110px) 0' }}>
        <div className="container-editorial">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
            <RevealText><p className="text-eyebrow" style={{ marginBottom: 12 }}>The full AI stack</p></RevealText>
            <RevealText delay={1}><h2 className="text-display" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', maxWidth: 760, margin: '0 auto' }}>From open weights to <em style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>production outcomes.</em></h2></RevealText>
            <RevealText delay={2}><p className="text-body" style={{ maxWidth: 640, margin: '16px auto 0' }}>We are building a full AI stack around our open models — so you don’t stitch vendors. One loop from model to factory to solution.</p></RevealText>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%),1fr))', gap: 20 }}>
            {STACK.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.kicker} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }} className="card card--rounded card--pad" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--color-bg-card)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}><Icon size={18} strokeWidth={1.5} /></div>
                  <p className="text-eyebrow" style={{ fontSize: 11, marginBottom: 0 }}>{s.kicker}</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, lineHeight: 1.25, color: 'var(--color-text)', margin: 0 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function WhoWeWorkWith() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} data-theme="light" style={{ background: '#FFFFFF', padding: 'clamp(72px, 9vw, 110px) clamp(20px, 4vw, 48px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }} style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto clamp(32px, 5vw, 56px)' }}>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 12 }}>Who we work with</p>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 3.8vw, 42px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#0A0A0A' }}>Open for everyone, <span style={{ color: '#9CA3AF' }}>built for you.</span></h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div key={a.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease: EASE }} style={{ background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 16, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 12, transform: 'translateZ(0)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F9FAFB', border: '1px solid #E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0A' }}><Icon size={16} /></div>
                  <h3 style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: '#0A0A0A', margin: 0 }}>{a.title}</h3>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 13, lineHeight: 1.7, color: '#6B7280', margin: 0 }}>{a.body}</p>
              </motion.div>
            )
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0A0A0A', color: '#FFFFFF', fontFamily: FONT, fontSize: 14, fontWeight: 600, padding: '12px 20px', borderRadius: 999, textDecoration: 'none' }}>Start with open <ArrowRight size={14} /></Link>
          <Link to="/deployment" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFFFFF', color: '#0A0A0A', border: '1px solid #E8E8E8', fontFamily: FONT, fontSize: 14, fontWeight: 500, padding: '12px 20px', borderRadius: 999, textDecoration: 'none' }}>See sovereign deployment</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function OpenPage() {
  const [showPreloader, setShowPreloader] = useState(true)
  return (
    <div className="page-dark" style={{ minHeight: '100vh' }}>
      <SEO
        title="Open Models — Own Your Intelligence | Single Core Labs"
        description="We build open models that let anyone control their intelligence. Open weights, open science, open software — a full AI stack from open models to AI factory to outcomes."
        keywords="open weights, open models, sovereign AI, AI factory, open core stack"
      />
      {showPreloader && <PreloaderWrapper onDone={() => setShowPreloader(false)} />}
      <Navbar />
      {/* HERO — Cinematic like TechPage/HealthcareIntelligencePage */}
      <section style={{ position: 'relative', paddingTop: 'clamp(120px, 18vh, 180px)', paddingBottom: 'clamp(64px, 10vh, 100px)', background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 70%), var(--color-bg)', overflow: 'hidden', textAlign: 'center' }}>
        <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
          <RevealText><p className="text-eyebrow" style={{ marginBottom: 16 }}>Single Core Labs • Open</p></RevealText>
          <RevealText delay={1}><h1 className="text-display open-hero-title" style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', maxWidth: 'none', margin: '0 auto 16px', whiteSpace: 'nowrap' }}>Open models <em style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)' }}>you control.</em></h1></RevealText>
          <RevealText delay={2}><p className="text-body" style={{ maxWidth: 640, margin: '0 auto 28px' }}>Open weights, open science, open software — and a full stack to run it at production scale. No vendor lock-in. No closed gate.</p></RevealText>
          <RevealText delay={3}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Build with open <ArrowRight size={16} /></Link>
              <Link to="/research" className="btn-outline">Read the research</Link>
            </div>
          </RevealText>
        </div>
        <style>{`@media (max-width: 1100px){ .open-hero-title{ white-space: normal !important; } }`}</style>
      </section>

      <main>
        <OpenCommitments />
        <OpenStack />
        <WhoWeWorkWith />
        {/* Closing CTA — like TechPage */}
        <section className="container-editorial" style={{ textAlign: 'center', marginBottom: 'clamp(64px, 8vw, 100px)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="card card--rounded card--pad" style={{ padding: 'clamp(36px, 6vw, 56px)', background: 'var(--color-bg-elevated)', textAlign: 'center' }}>
            <h2 className="text-display" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', maxWidth: 640, margin: '0 auto 12px' }}>Open, but production-ready.</h2>
            <p className="text-body" style={{ maxWidth: 560, margin: '0 auto 20px' }}>We pair permissive licensing with enterprise hardening — evals, guardrails, VPC and air-gapped recipes, and direct support.</p>
            <Link to="/contact" className="btn-primary">Talk to us <ArrowRight size={14} /></Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
