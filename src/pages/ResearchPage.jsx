import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Cpu, GitBranch, Globe, Repeat, Microscope, Atom, Brain, RotateCcw, Layers, Workflow } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import SEO from '@/components/SEO'

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const RESEARCH_LINEAGE = [
  {
    year: '2024',
    icon: Cpu,
    title: 'BioFormer — Original Transformer Architecture',
    summary: 'Designed and trained a novel transformer architecture from scratch for genetic mutation effect prediction, trained on ClinVar and gnomAD. Built for diagnostic labs requiring explainable, high-confidence genomic inference.',
    tags: ['Transformer Design', 'Genomics', 'Foundation Model'],
  },
  {
    year: '2024',
    icon: Repeat,
    title: 'Semantic Cache — Adaptive LLM Inference Optimisation',
    summary: 'Developed a production-grade semantic caching system using embedding-based prompt similarity with Adaptive Threshold Calibration. Achieves 47.3% token savings and 61% latency reduction on cache hits with zero client-side changes.',
    tags: ['LLM Inference', 'Semantic Search', 'Optimisation'],
  },
  {
    year: '2025',
    icon: GitBranch,
    title: 'Platform-Agent — Open-Source Composable Agent Framework',
    summary: 'Built an open-source CLI coding agent with composable tool workflows, designed for developer teams that need transparent, auditable AI-assisted engineering pipelines.',
    tags: ['Agentic AI', 'Open Source', 'Developer Tools'],
  },
  {
    year: '2025',
    icon: Microscope,
    title: 'Enterprise Agentic Workflows — Production Multi-Step Orchestration',
    summary: 'Deployed autonomous orchestration systems for insurance claims processing, financial risk reporting, and clinical documentation — each operating under strict regulatory constraints with full audit trails.',
    tags: ['Agentic Workflows', 'Enterprise', 'Regulated AI'],
  },
  {
    year: '2026',
    icon: Globe,
    title: 'Sovereign AI Infrastructure — Air-Gapped Deployments',
    summary: 'Designed and deployed fully offline, air-gapped AI systems for regulated healthcare and defence clients. Complete data sovereignty with HIPAA and SOC-2 compliance, fine-tuned open-source models running entirely within client networks.',
    tags: ['Sovereign AI', 'Air-Gapped', 'Compliance'],
  },
  {
    year: '2026',
    icon: Atom,
    title: 'AgentWatch — LLM Observability & Production Tracing',
    summary: 'Built a comprehensive observability platform for LLM agents in production: cost and performance explorer, trace visualisation, and continuous drift monitoring for teams running mission-critical agent deployments.',
    tags: ['Observability', 'MLOps', 'Production AI'],
  },
]

// ─── HERO ────────────────────────────────────────────────────────────────────

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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 'clamp(240px, 40vw, 560px)',
          height: 'clamp(240px, 40vw, 560px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)',
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

// ─── RESEARCH LINEAGE ───────────────────────────────────────────────────────

function LineageItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = item.icon
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: 'clamp(20px, 3vw, 40px)',
        padding: 'clamp(32px, 4vh, 48px)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-card)',
        marginBottom: '16px',
        position: 'relative',
      }}
    >
      {/* Year badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'var(--color-accent)',
            padding: '4px 12px',
            border: '1px solid var(--color-accent-dim)',
          }}
        >
          {item.year}
        </span>
        <div style={{ height: '1px', flex: 1, background: 'var(--color-border)' }} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'clamp(16px, 2.5vw, 28px)',
          alignItems: 'start',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border-strong)',
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-accent)',
            flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={1.5} />
        </div>

        <div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '10px',
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-body"
            style={{
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}
          >
            {item.summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="tag"
                style={{ fontSize: '10px', padding: '4px 10px' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function LineageSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: 'var(--spacing-section-lg) 0' }}>
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Our Lineage</p>
        </RevealText>
        <RevealText delay={1}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '720px',
              marginBottom: '20px',
            }}
          >
            From architecture design to{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              production deployment.
            </span>
          </h2>
        </RevealText>
        <RevealText delay={2}>
          <p className="text-body" style={{ maxWidth: '580px', marginBottom: 'clamp(40px, 5vh, 64px)' }}>
            Every line of research we ship moves through the same loop: identify a hard constraint,
            design an architecture that respects it, prove it works in production. Below is the work
            that defines us.
          </p>
        </RevealText>

        <div style={{ position: 'relative' }}>
          {RESEARCH_LINEAGE.map((item, i) => (
            <LineageItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TRAJECTORY ─────────────────────────────────────────────────────────────

const PHASES = [
  {
    number: '01',
    title: 'Foundation Architectures',
    description: 'Designing original transformer architectures and domain-specific models that outperform generic alternatives on specialised tasks — from genomic inference to clinical reasoning.',
    label: 'Current',
  },
  {
    number: '02',
    title: 'Autonomous Agent Systems',
    description: 'Deploying composable, auditable agentic workflows that orchestrate multi-step enterprise tasks under regulatory constraints, with full observability and human-in-the-loop control.',
    label: 'Current',
  },
  {
    number: '03',
    title: 'Self-Improving Pipelines',
    description: 'Building feedback loops where production models inform research — deployment telemetry shapes the next architecture, and each deployed system becomes a better starting point for the next.',
    label: 'In Progress',
  },
  {
    number: '04',
    title: 'Sovereign AI Infrastructure',
    description: 'Making frontier AI deployable anywhere — air-gapped, on-premise, in regulated environments — without sacrificing capability. The geography of AI should not determine who benefits from it.',
    label: 'Scaling',
  },
]

function TrajectorySection() {
  return (
    <section
      style={{
        padding: 'var(--spacing-section-lg) 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-bg-elevated)',
      }}
    >
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Our Trajectory</p>
        </RevealText>
        <RevealText delay={1}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '680px',
              marginBottom: 'clamp(36px, 5vh, 56px)',
            }}
          >
            Engineering the engine of{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              recursive discovery.
            </span>
          </h2>
        </RevealText>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(16px, 2vw, 24px)',
          }}
        >
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card card--pad card--elevated"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                minHeight: '260px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 500,
                    letterSpacing: '-0.04em',
                    color: 'var(--color-accent)',
                    opacity: 0.4,
                    lineHeight: 1,
                  }}
                >
                  {phase.number}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    padding: '3px 8px',
                    border: '1px solid var(--color-accent-dim)',
                  }}
                >
                  {phase.label}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}
              >
                {phase.title}
              </h3>
              <p
                className="text-body"
                style={{ fontSize: '13px', lineHeight: 1.7, flex: 1 }}
              >
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────────────

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

// ─── RSI SECTION ────────────────────────────────────────────────────────────

function RSIDiagram() {
  return (
    <svg viewBox="0 0 800 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '760px', height: 'auto', margin: '0 auto', display: 'block' }}>
      {/* Background */}
      <rect width="800" height="360" rx="12" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />

      {/* RL Loop: Agent → Environment → Reward → Update */}
      <defs>
        <marker id="arrowRight" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
        </marker>
        <marker id="arrowDim" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-text-dim)" />
        </marker>
        <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-bg-elevated)" />
          <stop offset="100%" stopColor="var(--color-bg-card)" />
        </linearGradient>
      </defs>

      {/* 1. Agent box */}
      <rect x="40" y="100" width="170" height="70" rx="6" fill="url(#boxGrad)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <text x="125" y="135" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="13" fontWeight="600">Agent</text>
      <text x="125" y="153" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-sans)" fontSize="10">Policy π(a|s)</text>

      {/* 2. Environment box */}
      <rect x="330" y="100" width="170" height="70" rx="6" fill="url(#boxGrad)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <text x="415" y="135" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="13" fontWeight="600">Environment</text>
      <text x="415" y="153" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-sans)" fontSize="10">State s, Reward r</text>

      {/* 3. Update box */}
      <rect x="170" y="250" width="200" height="60" rx="6" fill="url(#boxGrad)" stroke="var(--color-text-dim)" strokeWidth="1.2" />
      <text x="270" y="276" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="13" fontWeight="600">Policy Update</text>
      <text x="270" y="294" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-sans)" fontSize="10">θ ← θ + α∇J(θ)</text>

      {/* 4. RSI Overlay box */}
      <rect x="590" y="100" width="170" height="70" rx="6" fill="url(#boxGrad)" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="675" y="130" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600">Self-Improvement</text>
      <text x="675" y="148" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-sans)" fontSize="10">Meta-Learning Loop</text>
      <text x="675" y="162" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-sans)" fontSize="9">RSI Controller</text>

      {/* Arrows: Agent → Environment */}
      <line x1="210" y1="125" x2="325" y2="125" stroke="var(--color-accent)" strokeWidth="1.5" markerEnd="url(#arrowRight)" />
      <text x="267" y="118" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="500">action a</text>

      {/* Arrows: Environment → Agent (reward) */}
      <line x1="410" y1="170" x2="410" y2="225" stroke="var(--color-accent)" strokeWidth="1.2" markerEnd="url(#arrowRight)" />
      <line x1="410" y1="225" x2="155" y2="225" stroke="var(--color-accent)" strokeWidth="1.2" />
      <line x1="155" y1="225" x2="155" y2="170" stroke="var(--color-accent)" strokeWidth="1.2" markerEnd="url(#arrowRight)" />
      <text x="285" y="220" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="500">reward r, state s'</text>

      {/* Arrows: Environment → RSI (experience) */}
      <line x1="500" y1="115" x2="585" y2="115" stroke="var(--color-text-dim)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrowDim)" />
      <text x="542" y="108" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-mono)" fontSize="9">experience buffer</text>

      {/* Arrows: RSI → Update */}
      <line x1="620" y1="170" x2="620" y2="220" stroke="var(--color-text-dim)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="620" y1="220" x2="370" y2="220" stroke="var(--color-text-dim)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="370" y1="220" x2="370" y2="248" stroke="var(--color-text-dim)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrowDim)" />
      <text x="545" y="216" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-mono)" fontSize="9">meta-parameters</text>

      {/* Arrows: Update → Agent */}
      <line x1="270" y1="250" x2="270" y2="210" stroke="var(--color-text-dim)" strokeWidth="1.2" />
      <line x1="270" y1="210" x2="125" y2="210" stroke="var(--color-text-dim)" strokeWidth="1.2" />
      <line x1="125" y1="210" x2="125" y2="172" stroke="var(--color-text-dim)" strokeWidth="1.2" markerEnd="url(#arrowDim)" />
      <text x="202" y="206" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-mono)" fontSize="9">θ′</text>

      {/* Labels */}
      <text x="400" y="350" textAnchor="middle" fill="var(--color-text-dim)" fontFamily="var(--font-sans)" fontSize="11" fontStyle="italic">Recursive Self-Improvement Loop — the agent learns to improve its own learning algorithm</text>
    </svg>
  )
}

function RSISection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{
      padding: 'var(--spacing-section-lg) 0',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div className="container-editorial">
        <RevealText>
          <p className="text-eyebrow" style={{ marginBottom: '20px' }}>Frontier Research</p>
        </RevealText>
        <RevealText delay={1}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '720px',
              marginBottom: '20px',
            }}
          >
            Recursive{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              Self-Improvement.
            </span>
          </h2>
        </RevealText>
        <RevealText delay={2}>
          <p className="text-body" style={{ maxWidth: '620px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
            We are exploring architectures where AI systems learn not just to perform tasks, but to improve
            their own learning algorithms — a recursive loop where each generation of models helps design
            the next. This is the natural evolution of our work in agentic systems and optimised inference.
          </p>
        </RevealText>

        {/* Diagram */}
        <RevealText delay={3}>
          <div style={{ marginBottom: 'clamp(40px, 5vh, 64px)' }}>
            <RSIDiagram />
          </div>
        </RevealText>

        {/* Info cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          {[
            {
              icon: Brain,
              title: 'Meta-Reinforcement Learning',
              body: 'Agents trained to optimise their own policy update rules via a meta-gradient. The outer loop learns a update function that generalises across tasks, enabling few-shot adaptation to new environments without full retraining.',
            },
            {
              icon: RotateCcw,
              title: 'Self-Improving Code Generation',
              body: 'LLMs that generate, execute, and evaluate their own code modifications in a sandboxed RL environment. Successful patches are reincorporated into the training distribution, creating a compounding improvement cycle.',
            },
            {
              icon: Layers,
              title: 'Hierarchical Reward Modelling',
              body: 'Multi-level reward structures where sparse task rewards are augmented with learned dense reward shaping from past trajectories, enabling efficient exploration in high-dimensional action spaces.',
            },
            {
              icon: Workflow,
              title: 'RL Environment for Agent Tuning',
              body: 'Our custom RL environment benchmarks agentic workflows across tool-use, multi-turn reasoning, and retrieval tasks. Agents receive reward signals for correctness, efficiency, and safety — and must learn to balance all three.',
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card card--pad"
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-accent)',
                }}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}>
                  {item.title}
                </h3>
                <p className="text-body" style={{ fontSize: '13px', lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </motion.div>
            )
          })}
        </div>
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
    <div className="page-dark">
      <SEO
        title="Research | Single Core Labs"
        description="Frontier research in LLM inference optimisation, agentic systems, and sovereign AI infrastructure by Single Core Labs."
        keywords="LLM inference, semantic cache, agentic AI research, LLMOps, AI systems engineering, Single Core Labs"
        schema={schema}
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '100vh' }}>
        <HeroSection />
        <LineageSection />
        <TrajectorySection />
        <RSISection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
