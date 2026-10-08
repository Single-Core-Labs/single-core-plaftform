import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { Section, SectionHead } from '@/system/Container'
import { BentoGrid, BentoCard } from '@/system/Bento'

const CREAM = '#FFFFFF'

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

const WHY = [
  {
    title: 'Realistic task environments',
    text: 'Agents need more than static datasets. We create interactive environments with the tools, state, constraints, and workflows required to solve real-world tasks.',
  },
  {
    title: 'Deterministic rewards and evaluation',
    text: 'Define what success means. Every environment can expose structured rewards, verifiable outcomes, evaluation criteria, and complete execution traces.',
  },
  {
    title: 'Built for repeated training',
    text: 'Environments are designed for large numbers of episodes and continuous iteration — with reproducible resets, checkpoints, telemetry, and scalable execution.',
  },
  {
    title: 'Environments that evolve',
    text: 'As agents become better, tasks and evaluation criteria can become harder. Environments, benchmarks, and reward functions can evolve alongside the model.',
  },
]

const CAPABILITIES = [
  'Interactive environments',
  'Tool and API execution',
  'Task and trajectory generation',
  'Reward and evaluation systems',
  'Reproducible environments',
  'Training telemetry',
]

const STEPS = [
  {
    n: '01',
    title: 'Define the task',
    text: 'We identify the capabilities and workflows the agent needs to master, including available tools, constraints, state, and measurable outcomes.',
  },
  {
    n: '02',
    title: 'Build the environment',
    text: 'We implement the environment, tools, state transitions, tasks, and evaluation logic required to reproduce the learning problem.',
  },
  {
    n: '03',
    title: 'Define rewards and evaluation',
    text: 'We establish verifiable success criteria, reward signals, evaluators, and telemetry for every episode.',
  },
  {
    n: '04',
    title: 'Scale training and iterate',
    text: 'Run environments repeatedly across training and evaluation pipelines. As the agent improves, increase task difficulty and refine the environment.',
  },
]

const FAQS = [
  {
    q: 'What types of environments can you build?',
    a: 'UI, API, terminal, data, tool-use, and multi-step workflow environments — depending on the capability being trained or evaluated.',
  },
  {
    q: 'Do environments have to replicate our production systems?',
    a: 'No. An environment can reproduce the relevant behavior and constraints without reproducing the entire production system. The goal is to create a reliable learning and evaluation environment around the task.',
  },
  {
    q: 'Can environments be used for both RL and evaluation?',
    a: 'Yes. The same environment architecture can support training, evaluation, benchmarking, and regression testing.',
  },
  {
    q: 'What do we get?',
    a: 'The environment, task definitions, evaluation and reward logic, telemetry, and supporting infrastructure built as part of the program can be delivered for your organization to operate and extend.',
  },
]

export default function ReinforcementLearningPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="RL Environments — Reinforcement Learning for Capable AI Agents | Single Core Labs"
        description="Build, train, and evaluate agents in environments designed around real-world tasks, tools, APIs, and workflows — from environment design to rewards, evaluation, telemetry, and scalable execution."
        keywords="RL environments, agent training, reinforcement learning, reward functions, agent evaluation"
      />

      <main>
        {/* Hero */}
        <section style={{ background: '#000', padding: 'clamp(120px, 14vh, 160px) clamp(20px, 4vw, 60px) clamp(56px, 7vh, 96px)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <RevealText>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  color: CREAM,
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.4)',
                  marginBottom: '28px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                Solutions · RL Environments
              </span>
            </RevealText>
            <RevealText delay={1}>
              <h1
                style={{
                  color: CREAM,
                  fontSize: 'clamp(34px, 4.5vw, 64px)',
                  lineHeight: 1.05,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                  textWrap: 'balance',
                }}
              >
                Reinforcement learning environments for capable AI agents.
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '640px', margin: '0 auto 12px' }}>
                Build, train, and evaluate agents in environments designed around real-world
                tasks, tools, APIs, and workflows.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.5, maxWidth: '640px', margin: '0 auto 32px' }}>
                SCL builds the infrastructure behind agent reinforcement learning — from
                environment design and task generation to reward functions, evaluation,
                telemetry, and scalable execution.
              </p>
            </RevealText>
            <RevealText delay={4}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <PillCta to="/contact">Talk to us</PillCta>
                <a href="#why" style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
                  How it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Why */}
        <Section>
          <span id="why" style={{ scrollMarginTop: '90px' }} />
          <SectionHead
            kicker="Why RL environments"
            heading="Train agents against the work that matters."
          />
          <BentoGrid>
            {WHY.map((w) => (
              <BentoCard key={w.title} headline={w.title} text={w.text} />
            ))}
          </BentoGrid>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: 'clamp(20px, 2.5vw, 32px)' }}>
            {CAPABILITIES.map((c) => (
              <span
                key={c}
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
                {c}
              </span>
            ))}
          </div>
        </Section>

        {/* How we build */}
        <Section>
          <SectionHead
            kicker="How we build"
            heading="From real-world workflows to agent training environments."
          />
          <BentoGrid>
            {STEPS.map((s) => (
              <BentoCard key={s.n} kicker={s.n} headline={s.title} text={s.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHead
            heading="Frequently asked questions."
          />
          <BentoGrid>
            {FAQS.map((f) => (
              <BentoCard key={f.q} headline={f.q} text={f.a} span="wide" />
            ))}
          </BentoGrid>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
