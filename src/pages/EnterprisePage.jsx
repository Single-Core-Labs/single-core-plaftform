import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const FONT = "'Manrope', ui-sans-serif, system-ui, sans-serif"
const EASE = [0.16, 1, 0.3, 1]

const LIFECYCLE = [
  { id: 'evaluate', num: '01', label: 'Evaluate', short: 'Find where models break down' },
  { id: 'curate', num: '02', label: 'Curate', short: 'Build the data that closes the gap' },
  { id: 'train', num: '03', label: 'Post-train', short: 'Train better, sovereign models' },
  { id: 'deploy', num: '04', label: 'Deploy', short: 'Put it to work inside the firm' },
]

const STAGES = [
  {
    id: 'evaluate',
    num: '01',
    label: 'Evaluate',
    title: 'Custom Evals and Benchmarks',
    lead: 'We create evaluation task sets that pinpoint exactly where a model breaks down — across your domain, your workflows, your edge cases.',
    bullets: [
      'Written with practitioners who do the work daily — not generic annotators approximating it.',
      'Graded by expert rubrics and automated verifiers, so every score points at a specific failure mode.',
      'Delivered as a benchmark you can re-run against every new model, checkpoint, and vendor.',
    ],
    link: { to: '/research', text: 'Explore research' },
  },
  {
    id: 'curate',
    num: '02',
    label: 'Curate',
    title: 'Data Foundry',
    lead: 'We design proprietary datasets optimized for fine-tuning — expert-generated data, synthetic generation, and messy enterprise data turned into a form models can learn from.',
    bullets: [
      'Scoped from the failure modes the evals surface — train on the gaps that matter, not the data that is easy to collect.',
      'Captured from domain workflows step by step, decision by decision, and verified before delivery.',
      'Shaped for the method: reasoning traces for SFT, comparison pairs for preference training, verifiable tasks for RL.',
    ],
    link: { to: '/product/data-foundry', text: 'Explore Data Foundry' },
  },
  {
    id: 'train',
    num: '03',
    label: 'Post-train',
    title: 'Training & RL Lab',
    lead: 'We help enterprises train custom models end-to-end on open bases — more performant, cheaper, and fully under your control.',
    bullets: [
      'Data and model treated as one system: generate and curate what is missing before touching a weight.',
      'Warm up on expert demonstrations, then push past imitation with RL against verifiers designed for your domain.',
      'Every checkpoint scored on your benchmark from stage 01 — progress measured, not asserted.',
    ],
    methods: ['SFT', 'DPO', 'RL / RFT', 'RL Lab', 'Eval loops'],
    subcards: [
      { t: 'Data generation', d: 'Build the corpus the run needs' },
      { t: 'SFT warm-up', d: 'Teach the behavior before RL begins' },
      { t: 'Reinforcement learning', d: 'Push past what imitation reaches' },
      { t: 'Reward & verifier design', d: 'Turn expert judgment into a signal' },
      { t: 'Evaluation', d: 'Score every checkpoint, find what breaks' },
      { t: 'Training optimization', d: 'Refine the recipe and run again' },
    ],
    link: { to: '/training', text: 'Explore Training' },
  },
  {
    id: 'deploy',
    num: '04',
    label: 'Deploy',
    title: 'Forward-Deployed Engineering',
    lead: 'Agents and systems integrated with your internal context — files, data sources, workflows — built on off-the-shelf or fine-tuned models, on infra you own.',
    bullets: [
      'Our team works side by side with the people who do the work — on-site or embedded.',
      'We start with the data: the templates, precedents, and workflows your firm actually runs. Agents come last.',
      'VPC, on-prem, or Model Vault — sovereign deployment for regulated Indian enterprises.',
    ],
    link: { to: '/deployment', text: 'View deployment' },
  },
]

function ChartCard({ title, caption, children }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E8E8E8',
      borderRadius: '16px',
      padding: 'clamp(20px, 2.5vw, 28px)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}>
      <p style={{
        fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#9CA3AF', fontWeight: 500, marginBottom: '6px',
      }}>
        {title}
      </p>
      {caption && (
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px', lineHeight: 1.4 }}>
          {caption}
        </p>
      )}
      {!caption && <div style={{ height: '14px' }} />}
      {children}
    </div>
  )
}

/** 01 — Failure-mode bar chart */
function EvalChart({ active }) {
  const bars = [
    { label: 'Reasoning', before: 42, after: 18 },
    { label: 'Tool use', before: 58, after: 22 },
    { label: 'Domain', before: 71, after: 28 },
    { label: 'Edge cases', before: 64, after: 31 },
  ]
  return (
    <ChartCard title="Failure map" caption="Error rate by category — before vs after evals">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {bars.map((b, i) => (
          <div key={b.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{b.label}</span>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{b.before}% → {b.after}%</span>
            </div>
            <div style={{ position: 'relative', height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: `${b.before}%` } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
                style={{ position: 'absolute', inset: 0, background: '#D1D5DB', borderRadius: '4px' }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: `${b.after}%` } : {}}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease: EASE }}
                style={{ position: 'absolute', inset: 0, background: '#0A0A0A', borderRadius: '4px' }}
              />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#D1D5DB' }} /> Baseline
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9CA3AF' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: '#0A0A0A' }} /> After evals
          </span>
        </div>
      </div>
    </ChartCard>
  )
}

/** 02 — Dataset composition donut */
function CurateChart({ active }) {
  const segments = [
    { label: 'Expert traces', pct: 40, color: '#0A0A0A' },
    { label: 'Workflows', pct: 28, color: '#4B5563' },
    { label: 'Synthetic', pct: 20, color: '#9CA3AF' },
    { label: 'Evals', pct: 12, color: '#E5E7EB' },
  ]
  // SVG donut via stroke-dasharray
  const r = 54
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <ChartCard title="Data mix" caption="What goes into a training corpus">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
          <circle cx="70" cy="70" r={r} fill="none" stroke="#F3F4F6" strokeWidth="16" />
          {segments.map((s, i) => {
            const len = (s.pct / 100) * c
            const dash = `${len} ${c - len}`
            const rot = -90 + (offset / c) * 360
            offset += len
            return (
              <motion.circle
                key={s.label}
                cx="70" cy="70" r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="16"
                strokeDasharray={dash}
                strokeLinecap="butt"
                transform={`rotate(${rot} 70 70)`}
                initial={{ strokeDasharray: `0 ${c}` }}
                animate={active ? { strokeDasharray: dash } : {}}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
              />
            )
          })}
          <text x="70" y="66" textAnchor="middle" style={{ fontSize: '20px', fontWeight: 600, fill: '#0A0A0A', fontFamily: FONT }}>100%</text>
          <text x="70" y="84" textAnchor="middle" style={{ fontSize: '10px', fill: '#9CA3AF', fontFamily: FONT }}>owned</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '120px' }}>
          {segments.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                {s.label}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

/** 03 — Training score line chart */
function TrainChart({ active }) {
  const points = [32, 41, 48, 55, 62, 71, 78, 84]
  const w = 280
  const h = 120
  const pad = 8
  const max = 100
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2)
    const y = h - pad - (p / max) * (h - pad * 2)
    return [x, y]
  })
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ')
  const area = `${line} L${coords[coords.length - 1][0]},${h - pad} L${coords[0][0]},${h - pad} Z`

  return (
    <ChartCard title="Checkpoint scores" caption="Benchmark score across training runs">
      <svg width="100%" height="140" viewBox={`0 0 ${w} ${h + 20}`} preserveAspectRatio="xMidYMid meet">
        {[25, 50, 75].map((g) => {
          const y = h - pad - (g / max) * (h - pad * 2)
          return (
            <g key={g}>
              <line x1={pad} y1={y} x2={w - pad} y2={y} stroke="#F3F4F6" strokeWidth="1" />
              <text x={2} y={y + 3} style={{ fontSize: '9px', fill: '#D1D5DB' }}>{g}</text>
            </g>
          )
        })}
        <motion.path
          d={area}
          fill="rgba(10,10,10,0.06)"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        />
        {coords.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r="3.5"
            fill="#fff" stroke="#0A0A0A" strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
          />
        ))}
        <text x={pad} y={h + 16} style={{ fontSize: '10px', fill: '#9CA3AF' }}>ckpt 1</text>
        <text x={w - pad - 30} y={h + 16} style={{ fontSize: '10px', fill: '#9CA3AF' }}>ckpt {points.length}</text>
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>Base → post-train</span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>+52 pts</span>
      </div>
    </ChartCard>
  )
}

/** 04 — Deploy metrics */
function DeployChart({ active }) {
  const metrics = [
    { label: 'Latency p95', value: 180, unit: 'ms', max: 400, good: true },
    { label: 'Uptime', value: 99.9, unit: '%', max: 100, good: true },
    { label: 'Data leaving VPC', value: 0, unit: '%', max: 100, good: true },
  ]
  return (
    <ChartCard title="Production posture" caption="Typical sovereign deploy targets">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {metrics.map((m, i) => (
          <div key={m.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#374151' }}>{m.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>
                {m.value}{m.unit}
              </span>
            </div>
            <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: `${Math.max(4, (m.value / m.max) * 100)}%` } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE }}
                style={{
                  height: '100%',
                  borderRadius: '3px',
                  background: m.label === 'Data leaving VPC' ? '#5A9E8F' : '#0A0A0A',
                }}
              />
            </div>
          </div>
        ))}
        <div style={{
          marginTop: '4px', padding: '12px 14px', borderRadius: '10px',
          background: '#F9FAFB', border: '1px solid #EFEFEF',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '12px', color: '#6B7280' }}>Deployment modes</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>VPC · On-prem · Vault</span>
        </div>
      </div>
    </ChartCard>
  )
}

const CHARTS = {
  evaluate: EvalChart,
  curate: CurateChart,
  train: TrainChart,
  deploy: DeployChart,
}

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  return (
    <section
      data-theme="light"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 64px) clamp(56px, 7vw, 88px)',
        fontFamily: FONT,
        borderBottom: '1px solid #EFEFEF',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{
            fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#9CA3AF', fontWeight: 500, marginBottom: '20px',
          }}>
            For Enterprises
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400,
            letterSpacing: '-0.04em', lineHeight: 1.08, color: '#0A0A0A',
            marginBottom: '24px',
          }}>
            Services across the full evaluation, training, and deployment lifecycle.
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.65,
            color: '#6B7280', maxWidth: '640px', marginBottom: '36px',
          }}>
            We partner with enterprises across the whole arc of model work: finding where models break down in real workflows, building the data that closes the gap, post-training custom models, and deploying agents on your own infrastructure.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0A0A0A', color: '#fff',
              fontSize: '14px', fontWeight: 600, fontFamily: FONT,
              padding: '13px 22px', borderRadius: '8px', textDecoration: 'none',
            }}
          >
            Collaborate with us
            <ArrowUpRight size={15} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

function LifecycleNav({ active }) {
  return (
    <section
      data-theme="light"
      style={{
        background: '#FAFAFA',
        padding: 'clamp(40px, 5vw, 64px) clamp(24px, 5vw, 64px)',
        fontFamily: FONT,
        borderBottom: '1px solid #EFEFEF',
        position: 'sticky',
        top: '64px',
        zIndex: 30,
      }}
      className="ent-lifecycle-nav"
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{
          fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#9CA3AF', fontWeight: 500, marginBottom: '10px',
        }}>
          The lifecycle
        </p>
        <h2 className="ent-lifecycle-title" style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 400,
          letterSpacing: '-0.03em', lineHeight: 1.2, color: '#0A0A0A',
          marginBottom: 'clamp(20px, 2.5vw, 28px)', maxWidth: '520px',
        }}>
          Four services, one arc. Start at any stage — or hand us the whole loop.
        </h2>

        <div
          className="ent-steps"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {LIFECYCLE.map((step) => {
            const isActive = active === step.id
            return (
              <a
                key={step.id}
                href={`#${step.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(step.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'block',
                  padding: '14px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  background: isActive ? '#0A0A0A' : '#FFFFFF',
                  border: `1px solid ${isActive ? '#0A0A0A' : '#E8E8E8'}`,
                  transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <span style={{
                  display: 'block', fontSize: '11px', letterSpacing: '0.08em',
                  color: isActive ? 'rgba(255,255,255,0.45)' : '#9CA3AF',
                  marginBottom: '4px', fontWeight: 500,
                }}>
                  {step.num}
                </span>
                <span style={{
                  display: 'block', fontSize: '14px', fontWeight: 600,
                  color: isActive ? '#fff' : '#0A0A0A', letterSpacing: '-0.02em',
                  marginBottom: '2px',
                }}>
                  {step.label}
                </span>
                <span className="ent-step-short" style={{
                  display: 'block', fontSize: '12px', lineHeight: 1.35,
                  color: isActive ? 'rgba(255,255,255,0.55)' : '#6B7280',
                }}>
                  {step.short}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StageSection({ stage, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const Chart = CHARTS[stage.id]

  return (
    <section
      id={stage.id}
      ref={ref}
      data-theme="light"
      style={{
        background: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
        padding: 'clamp(72px, 9vw, 120px) clamp(24px, 5vw, 64px)',
        fontFamily: FONT,
        borderBottom: '1px solid #EFEFEF',
        scrollMarginTop: '180px',
      }}
    >
      <div
        className="ent-stage-grid"
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 'clamp(32px, 4vw, 56px)',
          alignItems: 'start',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p style={{
            fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em',
            color: '#9CA3AF', marginBottom: '16px',
          }}>
            {stage.num} · {stage.label}
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400,
            letterSpacing: '-0.04em', lineHeight: 1.1, color: '#0A0A0A',
            marginBottom: '20px',
          }}>
            {stage.title}
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.65,
            color: '#6B7280', marginBottom: '32px', maxWidth: '560px',
          }}>
            {stage.lead}
          </p>

          <ul style={{ listStyle: 'none', margin: '0 0 36px', padding: 0, maxWidth: '560px' }}>
            {stage.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '14px 0',
                  borderTop: i === 0 ? '1px solid #E8E8E8' : 'none',
                  borderBottom: '1px solid #E8E8E8',
                }}
              >
                <span style={{
                  flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%',
                  background: '#0A0A0A', marginTop: '8px',
                }} />
                <span style={{ fontSize: '15px', lineHeight: 1.6, color: '#374151' }}>{b}</span>
              </motion.li>
            ))}
          </ul>

          {stage.subcards && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))',
              gap: '10px',
              marginBottom: '36px',
            }}>
              {stage.subcards.map((c, i) => (
                <motion.div
                  key={c.t}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: EASE }}
                  style={{
                    background: index % 2 === 0 ? '#FAFAFA' : '#fff',
                    border: '1px solid #E8E8E8',
                    borderRadius: '12px',
                    padding: '14px 14px',
                  }}
                >
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', marginBottom: '4px', letterSpacing: '-0.01em' }}>{c.t}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, lineHeight: 1.45 }}>{c.d}</p>
                </motion.div>
              ))}
            </div>
          )}

          {stage.methods && (
            <div style={{ marginBottom: '36px' }}>
              <p style={{
                fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#9CA3AF', marginBottom: '12px', fontWeight: 500,
              }}>
                Methods we support
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {stage.methods.map((m) => (
                  <span key={m} style={{
                    fontSize: '13px', fontWeight: 500, color: '#0A0A0A',
                    padding: '7px 14px', borderRadius: '999px',
                    background: '#F3F4F6', border: '1px solid #E5E7EB',
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Link
            to={stage.link.to}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: 600, color: '#0A0A0A',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              paddingBottom: '2px',
            }}
          >
            {stage.link.text}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {Chart && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            style={{ position: 'sticky', top: '200px' }}
            className="ent-chart-col"
          >
            <Chart active={inView} />
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 64px)',
        fontFamily: FONT,
        textAlign: 'center',
      }}
    >
      <FadeIn>
        <h2 style={{
          fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 400,
          letterSpacing: '-0.04em', lineHeight: 1.15, color: '#fff',
          marginBottom: '16px', maxWidth: '520px', margin: '0 auto 16px',
        }}>
          Start at any stage.<br />Or hand us the whole loop.
        </h2>
        <p style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.5)',
          marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px',
        }}>
          Book a demo and see how we evaluate, curate, train, and deploy for your firm.
        </p>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#fff', color: '#0A0A0A',
            fontSize: '14px', fontWeight: 600, fontFamily: FONT,
            padding: '13px 24px', borderRadius: '8px', textDecoration: 'none',
          }}
        >
          Collaborate with us
          <ArrowUpRight size={15} />
        </Link>
      </FadeIn>
    </section>
  )
}

export default function EnterprisePage() {
  const [active, setActive] = useState('evaluate')

  useEffect(() => {
    const ids = STAGES.map((s) => s.id)
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <SEO
        title="For Enterprises — Evaluation, Training & Deployment | Single Core Labs"
        description="Services across the full AI lifecycle: evaluate where models break, curate proprietary data, post-train custom models, and deploy on sovereign infrastructure."
        keywords="enterprise AI, custom evals, data foundry, model training, RL Lab, sovereign deployment"
      />
      <Navbar />
      <Hero />
      <LifecycleNav active={active} />
      {STAGES.map((stage, i) => (
        <StageSection key={stage.id} stage={stage} index={i} />
      ))}
      <ClosingCTA />
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .ent-stage-grid {
            grid-template-columns: 1fr !important;
          }
          .ent-chart-col {
            position: relative !important;
            top: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .ent-steps {
            grid-template-columns: 1fr 1fr !important;
          }
          .ent-lifecycle-nav {
            position: relative !important;
            top: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .ent-steps {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
