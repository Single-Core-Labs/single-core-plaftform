import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { Terminal } from '@/system/Tabs'
import { Marquee } from '@/system/Marquee'
import { Section, SectionHead } from '@/system/Container'
import { BentoGrid, BentoCard } from '@/system/Bento'

const CREAM = '#FFFFFF'
const ACCENT = '#B8A478'
const BORDER = 'rgba(255,255,255,0.12)'
const BORDER_STRONG = 'rgba(255,255,255,0.2)'
const MUTED = 'rgba(255,255,255,0.65)'
const DIM = 'rgba(255,255,255,0.45)'
const SURFACE = '#111111'
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

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

function TextLink({ to, children }) {
  return (
    <Link to={to} style={{ color: CREAM, fontSize: '15px', fontWeight: 500, textDecoration: 'none', opacity: 0.8 }}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  )
}

const INDUSTRIES = [
  { label: 'Financial Services', text: 'Controlled autonomous development with auditability and policy enforcement.', href: '/industries/financial-services' },
  { label: 'Healthcare', text: 'Isolated development workflows for sensitive code and infrastructure.', href: '/industries/healthcare' },
  { label: 'Defense & Government', text: 'Controlled development environments with approved models.', href: '/industries/defense' },
  { label: 'Technology', text: 'Large-scale engineering automation across complex repositories.', href: '/industries/technology' },
]

const ENTERPRISE_PILLARS = [
  { title: 'Security', items: ['Sandboxed execution', 'Granular permissions', 'Egress controls', 'Approved model endpoints'] },
  { title: 'Governance', items: ['Audit trails', 'Centralized configuration', 'Approval gates', 'Policy enforcement'] },
  { title: 'Infrastructure', items: ['Private deployment', 'Controlled environments', 'Identity integration', 'OTEL observability'] },
  { title: 'Economics', items: ['Model routing', 'Cost controls', 'Usage visibility', 'Provider flexibility'] },
]

const MODEL_ROWS = [
  [
    { label: 'GPT', logo: '/models/openai.png' },
    { label: 'Claude', logo: '/models/anthropic.svg' },
    { label: 'Gemini', logo: '/models/googlegemini.svg' },
    { label: 'Llama' },
    { label: 'Custom endpoint' },
  ],
]

function ModelPills() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      {MODEL_ROWS.map((row, r) => (
        <Marquee key={r} items={row} pill bare duration={38 + r * 9} reverse={r % 2 === 1} />
      ))}
      <p className="scl-card-text" style={{ fontSize: '13px', margin: '8px 0 0' }}>
        + Any model via OpenAI, Anthropic, Google, or custom endpoints
      </p>
    </div>
  )
}

const WHEN_CARDS = [
  { title: 'Build', text: 'Implement features across large codebases.' },
  { title: 'Fix', text: 'Investigate bugs, reproduce failures, and ship verified fixes.' },
  { title: 'Refactor', text: 'Make large architectural changes while keeping tests and dependencies intact.' },
  { title: 'Review', text: 'Analyze pull requests, run checks, and surface issues before merge.' },
  { title: 'Operate', text: 'Triage incidents, investigate production failures, and automate recurring engineering workflows.' },
  { title: 'Evaluate', text: 'Run autonomous coding tasks against controlled evaluation sets.' },
]

const ARTIFACTS = [
  { name: 'AGENTS.md', text: 'Project instructions and conventions.' },
  { name: 'journal.jsonl', text: 'Replay-exact record of model + tool activity.' },
  { name: 'session.db', text: 'Persistent sessions, turns, queues and handoffs.' },
  { name: 'SKILL.md', text: 'Reusable tools, permissions and workflows.' },
  { name: 'eval-set.jsonl', text: 'Verified trajectories retained for training.' },
  { name: 'clamp.mjs', text: 'Source under test.' },
]

const SESSION_EVENTS = [
  { mark: '✓', text: 'tests passed · 14 files · verifier done' },
  { mark: '⚠', text: 'approval needed · push to main' },
  { mark: '✓', text: 'session resumed · 0 context lost' },
  { mark: '✓', text: 'builder → verifier handoff' },
  { mark: '○', text: 'nightly evaluation queued' },
  { mark: '✓', text: 'incident triaged · root cause proposed' },
]

const TOOL_CHIPS = ['GitHub', 'Jira', 'Slack', 'MCP', 'ACP', 'CI/CD']

const SELF_LOOP_STEPS = [
  { title: 'Work', text: 'Marshal runs against your repository using your tools, skills, conventions, and models.' },
  { title: 'Record', text: 'The event journal captures model calls, tool executions, decisions, and outcomes.' },
  { title: 'Evaluate', text: 'Trajectories are replayed and graded against objective task outcomes.' },
  { title: 'Keep the winners', text: 'Passing trajectories become training data through rejection sampling. Failures don\u2019t become training data.' },
  { title: 'Retrain', text: 'Fine-tune your model on the resulting dataset.' },
  { title: 'Measure', text: 'Run the same evaluation set again and measure whether the new model actually improved.' },
]

const WHY_ROWS = [
  { concern: 'Persistent sessions', approach: 'Agents continue working across hundreds of tool calls without losing the state of the task.' },
  { concern: 'Replay-exact state', approach: 'Every model call, tool invocation, approval, and outcome is recorded in an event journal. Resume a session without reconstructing what happened from a summary.' },
  { concern: 'Delegated execution', approach: 'Separate planner, builder, and verifier sessions can work together with durable handoffs.' },
  { concern: 'Verification first', approach: "Tasks aren't considered complete because the model says they're complete. Marshal can run tests, inspect results, evaluate outcomes, and reject failed work." },
  { concern: 'Multi-model routing', approach: 'Use different models for different jobs — optimized for capability, latency, or cost.' },
  { concern: 'Human control', approach: 'Permissions, sandboxing, approvals, egress controls, and policy enforcement keep autonomous work steerable.' },
]

const COMPARE_COLS = ['Marshal', 'OpenCode', 'Codex', 'Claude Code']

const COMPARE_ROWS = [
  {
    label: 'Any model, no vendor lock-in',
    cells: ['✓', '✓', 'OpenAI only', 'Claude only'],
  },
  {
    label: 'MCP servers, plugins, custom skills',
    cells: ['✓', '✓', '✓', '✓'],
  },
  {
    label: 'Terminal UI plus headless CI and editor integration',
    cells: ['✓', '✓', '✓', '✓'],
  },
  {
    label: 'Replay-exact session journal',
    cells: ['✓', '—', '—', '—'],
  },
  {
    label: 'Evaluation sets plus retraining flywheel',
    cells: ['✓', '—', '—', '—'],
  },
  {
    label: 'Private deployment plus policy engine',
    cells: ['✓', 'Self-hosted', '—', 'Via Bedrock / Vertex'],
  },
  {
    label: 'Observability: cost, usage, and evaluation scores',
    cells: ['✓', '—', '—', 'Team plans'],
  },
]

const LIVE_LINES = [
  { prefix: '$ ', text: 'marshal --session', tone: 'cmd' },
  { prefix: '', text: '3 sessions · resumed replay-exact', tone: 'dim' },
  ...SESSION_EVENTS.map((e) => ({
    prefix: `${e.mark} `,
    text: e.text,
    tone: e.mark === '⚠' ? 'warn' : e.mark === '○' ? 'dim' : 'ok',
  })),
]

function prefixColor(tone) {
  if (tone === 'warn') return '#d8a94e'
  if (tone === 'dim') return DIM
  return ACCENT
}

function LiveSessionTerminal() {
  const [started, setStarted] = useState(false)
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [blink, setBlink] = useState(true)
  const boxRef = useRef(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = boxRef.current
    if (!el || reduced) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduced])

  useEffect(() => {
    if (!started || reduced) return
    const current = LIVE_LINES[lineIdx]
    let t
    if (charIdx < current.text.length) {
      t = setTimeout(() => setCharIdx((c) => c + 1), current.tone === 'cmd' ? 45 : 16)
    } else if (lineIdx < LIVE_LINES.length - 1) {
      t = setTimeout(() => {
        setLineIdx((i) => i + 1)
        setCharIdx(0)
      }, 550)
    } else {
      t = setTimeout(() => {
        setLineIdx(0)
        setCharIdx(0)
      }, 6000)
    }
    return () => clearTimeout(t)
  }, [started, lineIdx, charIdx, reduced])

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530)
    return () => clearInterval(id)
  }, [])

  const renderLine = (line, typed, isActive) => (
    <>
      <span style={{ color: prefixColor(line.tone), fontWeight: 700 }}>{line.prefix}</span>
      <span
        style={{
          color: line.tone === 'cmd' ? CREAM : line.tone === 'dim' && !line.prefix ? DIM : CREAM,
        }}
      >
        {typed}
      </span>
      {isActive && (
        <span aria-hidden="true" style={{ opacity: blink ? 1 : 0, color: ACCENT, fontWeight: 700 }}>
          ▍
        </span>
      )}
    </>
  )

  return (
    <div
      ref={boxRef}
      style={{
        border: `1px solid ${BORDER_STRONG}`,
        borderRadius: '16px',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 18px',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        {['#e0655f', '#e0a44f', '#6fbf73'].map((c) => (
          <span key={c} aria-hidden="true" style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{ fontFamily: MONO, fontSize: '12.5px', color: DIM, marginLeft: '8px' }}>
          marshal --session
        </span>
      </div>
      <div
        aria-live="off"
        style={{
          padding: '20px 22px',
          minHeight: '264px',
          fontFamily: MONO,
          fontSize: '14.5px',
          lineHeight: 1.9,
        }}
      >
        {reduced || !started
          ? (reduced ? LIVE_LINES : []).map((line) => (
              <div key={line.text}>{renderLine(line, line.text, false)}</div>
            ))
          : LIVE_LINES.slice(0, lineIdx + 1).map((line, i) => (
              <div key={line.text}>
                {renderLine(line, i < lineIdx ? line.text : line.text.slice(0, charIdx), i === lineIdx)}
              </div>
            ))}
      </div>
    </div>
  )
}

function CompareMark({ value, highlight }) {
  if (value === '✓' || value === '—') {
    return (
      <span
        aria-label={value === '✓' ? 'yes' : 'no'}
        style={{
          fontFamily: MONO,
          fontSize: '16px',
          fontWeight: 700,
          color: value === '✓' ? ACCENT : DIM,
        }}
      >
        {value}
      </span>
    )
  }
  return (
    <span style={{ fontSize: '13.5px', lineHeight: 1.5, color: highlight ? CREAM : DIM }}>
      {value}
    </span>
  )
}
const FACTORY_STEPS = [
  { title: 'Triage customer signals', text: 'Route and prioritize inbound signals automatically.' },
  { title: 'Ticket to code', text: 'Pick up and implement backlog tickets automatically.' },
  { title: 'Code review', text: 'Every PR reviewed in minutes with zero noise.' },
  { title: 'QA', text: 'Continuous test generation that catches regressions early.' },
  { title: 'Incident response', text: 'Cut MTTR with AI-powered root cause analysis.' },
  { title: 'Documentation', text: 'Docs that write themselves and never go stale.' },
]

const INTEGRATION_POINTS = [
  'Read and update issues',
  'Open and review pull requests',
  'Notify engineering channels',
  'Invoke approved MCP tools',
  'Connect to editors through ACP',
  'Run headless jobs in CI',
  'Execute scheduled engineering workflows',
]

export default function MarshalPage() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Reduced motion: keep the lightweight poster, never load the video.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Small screens get the 480p file, desktops the 720p.
    const src = window.innerWidth <= 768 ? '/marshal-hero-480p.webm' : '/marshal-hero-720p.webm'
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
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <SEO
        title="Marshal — Autonomous Software Engineering for the Enterprise | Single Core Labs"
        description="Marshal is persistent autonomous software engineering infrastructure: durable sessions, verification, replay-exact audit trails, evaluation flywheels, and model freedom — deployed inside your boundary."
        keywords="marshal, coding agent, terminal AI, software engineering agent, BYOK"
      />

      <main style={{ minHeight: '100vh' }}>
        {/* Hero over video background (bright daylight footage: heavy overlay) */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(120px, 14vh, 160px)',
            paddingBottom: 'clamp(56px, 7vh, 96px)',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster="/marshal-hero-poster.jpg"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.88) 100%)',
            }}
          />
          {/* Hero: centered headline, lede, CTAs, screenshot below */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)', textAlign: 'center', position: 'relative' }}>
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
              Marshal · Enterprise-ready
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
              Build your autonomous software factory.
            </h1>
          </RevealText>
          <RevealText delay={2}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 32px' }}>
              Self-improving coding automation with verification and replay — on your infrastructure,
              models, and policies.
            </p>
          </RevealText>
          <RevealText delay={3}>
            <div id="install" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center', marginBottom: 'clamp(40px, 5vh, 64px)', scrollMarginTop: '120px' }}>
              <button
                type="button"
                onClick={() => {
                  const cmd = 'npm install -g marshal-code@latest'
                  if (navigator.clipboard) navigator.clipboard.writeText(cmd).catch(() => {})
                }}
                title="Click to copy"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  border: `1px solid ${BORDER_STRONG}`,
                  borderRadius: '10px',
                  padding: '14px 20px',
                  color: CREAM,
                  fontFamily: MONO,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: ACCENT }}>$</span>
                <span>npm install -g marshal-code@latest</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ opacity: 0.6 }}>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
              <PillCta to="/contact">Talk to sales</PillCta>
            </div>
            <p style={{ color: CREAM, fontSize: '15px', fontWeight: 600, margin: '20px 0 0' }}>
              Private by default. Auditable by design. Model-agnostic.
            </p>
          </RevealText>
          <RevealText delay={4}>
            <div style={{ marginBottom: 'clamp(56px, 7vh, 96px)' }}>
              <img
                src="/marshal-tui.jpg"
                alt="Marshal Code terminal UI"
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  border: `1px solid ${BORDER_STRONG}`,
                }}
              />
              <p style={{ color: MUTED, fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
                Requires Node.js 22.19+, 24.2+, or 26. Installs the <code>marshal</code> command.
              </p>
            </div>
          </RevealText>
        </div>
        </section>

        {/* Demo: Marshal resolving an issue in a large Rust repo */}
        <Section>
          <SectionHead
            kicker="Demo"
            heading="Watch it resolve a real issue in a large Rust repository."
            lede="A full working session: Marshal scopes the issue, navigates the codebase, implements the fix, and verifies it — press play."
          />
          <video
            controls
            playsInline
            preload="metadata"
            src="/marshal-demo.mp4"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              border: `1px solid ${BORDER_STRONG}`,
              background: '#000',
            }}
          />
          <p style={{ color: MUTED, fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
            Real Marshal session, unedited — working through an issue in a large repository.
          </p>
        </Section>

        {/* When to use */}
        <Section>
          <SectionHead
            kicker="When to use Marshal"
            heading="Give Marshal work, not prompts."
            lede="Use Marshal for verifiable software tasks — in your repo, terminal, tests, or CI, under your policies."
          />
          <BentoGrid>
            {WHEN_CARDS.map((c) => (
              <BentoCard key={c.title} headline={c.title} text={c.text} />
            ))}
          </BentoGrid>
          <p className="scl-lede" style={{ marginTop: '24px' }}>
            Interactive TUI for engineers. Headless execution for automation and evals. ACP for editor integrations. Identity integration, audit trails, and policy controls for the organization.
          </p>
        </Section>

        {/* Why Marshal */}
        <Section>
          <SectionHead
            kicker="Why Marshal"
            heading="Built for software work that doesn't fit in one context window."
            lede="Most coding agents are optimized around a conversation. Marshal is built around a persistent engineering session."
          />
          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            {WHY_ROWS.map((row) => (
              <div
                key={row.concern}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '8px 32px',
                  padding: '20px 0',
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <h3 className="scl-card-headline" style={{ margin: 0 }}>
                  {row.concern}
                </h3>
                <p className="scl-card-text" style={{ fontSize: '14px', margin: 0 }}>{row.approach}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Self-improving loop */}
        <Section>
          <SectionHead
            kicker="Marshal learns from the work it does"
            heading="A closed engineering loop."
            lede="Every completed task creates evidence about what worked — and what didn't."
          />
          <div style={{ marginBottom: 'clamp(32px, 4vh, 48px)' }}>
            <Terminal
              title="Install Marshal"
              lines={[
                { prompt: true, text: 'npm install -g marshal-code@latest' },
                { prompt: true, text: 'marshal --version', ok: true },
              ]}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
              <PillCta to="/contact">Talk to sales</PillCta>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${BORDER}` }}>
            {SELF_LOOP_STEPS.map((s, i) => (
              <div key={s.title} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontFamily: MONO, fontSize: '13px', color: ACCENT, minWidth: '28px', paddingTop: '3px' }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: CREAM }}>
                    {s.title}
                  </h3>
                  <p className="scl-card-text" style={{ fontSize: '14px', margin: 0 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="scl-lede" style={{ marginTop: '28px' }}>
            <strong>The result:</strong> your engineering workflow becomes an evaluation and improvement
            system for your agents.
          </p>
        </Section>

        {/* Artifacts */}
        <Section>
          <SectionHead
            kicker="Evidence, not promises"
            heading="Every task leaves evidence."
            lede="Agent activity becomes inspectable artifacts — review, reproduce, and improve."
          />
          <BentoGrid>
            {ARTIFACTS.map((a) => (
              <BentoCard key={a.name} headline={a.name} text={a.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Sessions */}
        <Section>
          <SectionHead
            kicker="Sessions"
            heading="Leave the task. Come back later."
            lede="Marshal sessions are persistent. Long-running engineering work doesn't have to live inside one terminal window."
          />
          <LiveSessionTerminal />
          <p style={{ color: CREAM, fontSize: '15px', fontWeight: 600, marginTop: '20px' }}>
            Fork. Resume. Rewind. Delegate.
          </p>
        </Section>

        {/* Integrations */}
        <Section>
          <SectionHead
            kicker="Integrations"
            heading="Fits into the stack you already run."
            lede="Deploys into the tools your engineering organization already runs — with the governance it already expects."
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
            {TOOL_CHIPS.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px 32px', borderTop: `1px solid ${BORDER}` }}>
            {INTEGRATION_POINTS.map((c) => (
              <p key={c} className="scl-card-text" style={{ fontSize: '15px', margin: 0, padding: '14px 0', borderBottom: `1px solid ${BORDER}` }}>
                {c}
              </p>
            ))}
          </div>
          <p className="scl-lede" style={{ marginTop: '28px' }}>
            <strong>Extend Marshal without forking it.</strong> Use built-in skills, custom SKILL.md files,
            MCP servers, and plugins to give agents the tools your organization already relies on.
          </p>
        </Section>

        {/* Supported models */}
        <Section>
          <SectionHead
            kicker="Supported models"
            heading="One agent, any model."
            lede="Switch providers in a config change. The right model per task — never locked to a lab."
          />
          <ModelPills />
        </Section>

        {/* Industries */}
        <Section>
          <SectionHead
            kicker="Industries"
            heading="Built for industries that need AI the most."
            lede="For organizations where software quality is non-negotiable."
          />
          <BentoGrid>
            {INDUSTRIES.map((ind) => (
              <BentoCard key={ind.label} headline={ind.label} text={ind.text} href={ind.href} linkLabel="Explore" />
            ))}
          </BentoGrid>
          <div style={{ marginTop: '24px' }}>
            <TextLink to="/enterprise">Explore enterprise deployments</TextLink>
          </div>
        </Section>

        {/* Enterprise */}
        <Section>
          <SectionHead
            kicker="Enterprise"
            heading="Autonomous engineering without giving up control."
            lede="Marshal operates inside real security and governance boundaries."
          />
          <BentoGrid>
            {ENTERPRISE_PILLARS.map((p) => (
              <BentoCard key={p.title} headline={p.title}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.items.map((item) => (
                    <li key={item} className="scl-card-text" style={{ fontSize: '14px', margin: 0 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </BentoGrid>
          <p className="scl-lede" style={{ marginTop: '24px', marginBottom: '28px' }}>
            Your code and data don&apos;t need to leave your environment just because you&apos;re using an agent.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <PillCta to="/contact">Request enterprise pilot</PillCta>
            <TextLink to="/enterprise">Explore enterprise deployments</TextLink>
          </div>
        </Section>

        {/* Comparison: Marshal vs OpenCode, Codex, Claude Code */}
        <Section>
          <SectionHead
            kicker="Why Marshal"
            heading="Your models, your sessions, your evidence."
            lede="Single-vendor agents rent intelligence. Marshal gives you infrastructure."
          />
          <div style={{ overflowX: 'auto', border: `1px solid ${BORDER_STRONG}`, borderRadius: '16px', background: SURFACE }}>
            <div style={{ minWidth: '680px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1.5fr) repeat(4, minmax(110px, 1fr))', borderBottom: `1px solid ${BORDER_STRONG}` }}>
                <div style={{ padding: '16px 20px' }} />
                {COMPARE_COLS.map((c) => (
                  <div
                    key={c}
                    style={{
                      padding: '16px 12px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: c === 'Marshal' ? ACCENT : CREAM,
                      background: c === 'Marshal' ? 'rgba(184, 164, 120, 0.08)' : 'transparent',
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              {COMPARE_ROWS.map((row) => (
                <div
                  key={row.label}
                  style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1.5fr) repeat(4, minmax(110px, 1fr))', borderBottom: `1px solid ${BORDER}` }}
                >
                  <div style={{ padding: '16px 20px', fontSize: '14.5px', fontWeight: 550, color: CREAM, lineHeight: 1.5 }}>
                    {row.label}
                  </div>
                  {row.cells.map((cell, i) => (
                    <div
                      key={COMPARE_COLS[i]}
                      style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                        alignContent: 'center',
                        background: i === 0 ? 'rgba(184, 164, 120, 0.08)' : 'transparent',
                      }}
                    >
                      <CompareMark value={cell} highlight={i === 0} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="scl-card-text" style={{ fontSize: '13px', marginTop: '16px', maxWidth: '680px' }}>
            Based on publicly documented capabilities, which change fast — verify against current docs
            before deciding.
          </p>
        </Section>

        {/* Factory steps */}
        <Section>
          <SectionHead
            kicker="Autonomous software factory"
            heading="Make your software improve itself."
            lede="Every run improves the next — engineers design the factory, humans govern it."
          />
          <BentoGrid>
            {FACTORY_STEPS.map((s, i) => (
              <BentoCard key={s.title} kicker={`0${i + 1}`} headline={s.title} text={s.text} />
            ))}
          </BentoGrid>
        </Section>

        {/* Closing CTA */}
        <section style={{ background: '#000', padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 60px)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
            <RevealText>
              <p className="scl-kicker" style={{ marginBottom: '16px' }}>Get started</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="scl-heading" style={{ marginBottom: '16px' }}>
                Give Marshal a repository.
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="scl-lede" style={{ marginBottom: '28px' }}>
                Start with one team and one codebase. Measure task success, engineering hours saved,
                and cost per task — then scale autonomous engineering across your organization.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'flex-start', alignItems: 'center' }}>
                <PillCta to="#install">Start with Marshal</PillCta>
                <TextLink to="/contact">Talk to the team</TextLink>
              </div>
            </RevealText>
            <p className="scl-card-text" style={{ fontSize: '14px', marginTop: '28px' }}>
              Single Core Labs lets you decide how AI runs in your organization.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
