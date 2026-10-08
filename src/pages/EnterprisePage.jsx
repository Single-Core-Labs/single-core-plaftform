import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'

const PROBLEM_LIST = [
  'Where agents can execute',
  'What data they can access',
  'Which tools they can use',
  'Which models they can call',
  'What changes require approval',
  'What happened during every run',
  'Whether the result actually worked',
  'How agent performance improves over time',
]

const SECURITY_CARDS = [
  { title: 'Private deployment', text: 'Run Marshal inside your cloud, VPC, private cluster, or controlled environment.' },
  { title: 'Air-gapped', text: 'Operate without external network connectivity for environments that require isolation.' },
  { title: 'Egress control', text: 'Control exactly where agents can send or receive data.' },
  { title: 'Sandboxed execution', text: 'Limit filesystem, process, network, and tool access.' },
  { title: 'Secrets isolation', text: "Keep credentials and secrets outside the agent's working context wherever possible." },
]

const IDENTITY_GROUPS = [
  { title: 'Sign in', items: ['SSO', 'SAML', 'OIDC', 'SCIM'] },
  { title: 'Access scope', items: ['RBAC', 'Organization and workspace isolation', 'Team-level permissions', 'Project-level permissions', 'Agent-level permissions'] },
  { title: 'Control', items: ['Approval policies', 'API keys and service identities'] },
]

const POLICY_ROWS = [
  { mark: '✓', tone: 'ok', rule: 'Read repository', note: null },
  { mark: '✓', tone: 'ok', rule: 'Run tests', note: null },
  { mark: '✓', tone: 'ok', rule: 'Create branches', note: null },
  { mark: '✓', tone: 'ok', rule: 'Open pull requests', note: null },
  { mark: '⚠', tone: 'warn', rule: 'Modify infrastructure', note: 'Requires approval' },
  { mark: '⚠', tone: 'warn', rule: 'Production deployment', note: 'Requires approval' },
  { mark: '✕', tone: 'deny', rule: 'Access production secrets', note: null },
  { mark: '✕', tone: 'deny', rule: 'Push directly to main', note: null },
]

const AUDIT_CHAIN = [
  'Agent',
  'Model call',
  'Tool invocation',
  'File modification',
  'Test execution',
  'Approval',
  'Commit',
  'Pull request',
]

const AUDIT_CAPTURE = [
  'User', 'Agent', 'Session', 'Model', 'Tool', 'Command', 'Files changed',
  'Approvals', 'Test results', 'Timestamps', 'Outcome',
]

const OBS_STATS = [
  { value: '247', label: 'Agents' },
  { value: '38', label: 'Active sessions' },
  { value: '12,481', label: 'Tasks completed' },
  { value: '87.4%', label: 'Success rate' },
  { value: '$1.82', label: 'Avg. cost per task' },
  { value: '18m', label: 'Avg. duration' },
]

const OBS_SIGNALS = [
  'Model usage', 'Token usage', 'Cost', 'Tool calls', 'Failure rates',
  'Task success', 'Latency', 'Agent activity', 'Evaluation scores',
]

const MODEL_CONTROLS = [
  'Approved models', 'Approved endpoints', 'Model routing',
  'Cost limits', 'Model fallback', 'Data residency requirements', 'Per-team model policies',
]

const ROUTING_EXAMPLE = [
  { task: 'Architecture', model: 'Frontier model' },
  { task: 'Code generation', model: 'Fast model' },
  { task: 'Sensitive repository', model: 'Private model' },
  { task: 'QA', model: 'Specialized model' },
]

const PRIVACY_POINTS = [
  { title: 'Data isolation', text: 'Agent working data stays within your deployment boundary.' },
  { title: 'Encryption', text: 'Encryption in transit and at rest as part of your deployment.' },
  { title: 'Retention controls', text: 'Define how long session data, journals, and artifacts are kept.' },
  { title: 'Regional deployment', text: 'Run where your data policies require.' },
  { title: 'Your infrastructure', text: 'Customer-managed infrastructure and keys where your environment supports it.' },
]

const COMPLIANCE_FRAMEWORKS = ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'FedRAMP']

const TICKET_FLOW = [
  'Jira ticket', 'Marshal', 'Plan', 'Implement', 'Run tests', 'Security checks',
  'Verifier', 'Human approval', 'Pull request', 'CI', 'Merge',
]

const INCIDENT_FLOW = [
  'Alert', 'Marshal investigates', 'Collects logs', 'Reproduces issue', 'Identifies root cause',
  'Creates patch', 'Runs tests', 'Opens PR', 'Engineer approves',
]

const FACTORY_NODES = ['Build', 'QA', 'Review']

const DEPLOY_OPTIONS = [
  { title: 'Cloud', text: 'Managed Marshal deployment.' },
  { title: 'Private cloud', text: 'Run inside your AWS, GCP, or Azure environment.' },
  { title: 'On-prem', text: 'For organizations requiring infrastructure control.' },
  { title: 'Air-gapped', text: 'For isolated environments.' },
]

const SUPPORT_ITEMS = [
  'Dedicated onboarding', 'Architecture review', 'Deployment assistance', 'Security review support',
  'Migration assistance', 'Dedicated support', 'SLA options', 'Training', 'Custom integrations',
]

function FlowChain({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--color-border)' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', gap: '16px', padding: '13px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', minWidth: '24px' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="text-body" style={{ fontSize: '15px', margin: 0 }}>{s}</p>
        </div>
      ))}
    </div>
  )
}

function Chip({ children }) {
  return (
    <span
      style={{
        fontSize: '14px',
        fontWeight: 550,
        color: 'var(--color-text)',
        border: '1px solid var(--color-border-strong)',
        borderRadius: '999px',
        padding: '9px 20px',
        background: 'var(--color-bg-surface)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

export default function EnterprisePage() {
  return (
    <div className="page-dark">
      <SEO
        title="Marshal for Enterprise — Autonomous Software Engineering Under Your Control | Single Core Labs"
        description="Deploy Marshal across your engineering organization with your infrastructure, models, policies, and security controls. Private by default, auditable by design, model-agnostic."
        keywords="marshal enterprise, AI coding agent enterprise, private deployment, agent governance, audit trail"
      />

      <main style={{ minHeight: '100vh' }}>
        {/* 1. Hero */}
        <section
          className="container-editorial"
          style={{ maxWidth: '880px', paddingTop: 'clamp(120px, 14vh, 160px)', paddingBottom: 'clamp(56px, 7vh, 96px)', textAlign: 'center' }}
        >
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Marshal for enterprise</p>
          </RevealText>
          <RevealText delay={1}>
            <h1 className="text-display" style={{ marginBottom: '16px' }}>
              Autonomous software engineering, <span className="text-italic-serif">under your control.</span>
            </h1>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', margin: '0 auto 16px' }}>
              Deploy Marshal across your engineering organization with your infrastructure, models,
              policies, and security controls.
            </p>
          </RevealText>
          <RevealText delay={3}>
            <p className="text-body" style={{ maxWidth: '640px', margin: '0 auto 32px' }}>
              <strong>Private by default. Auditable by design. Model-agnostic.</strong>
            </p>
          </RevealText>
          <RevealText delay={4}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <a href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                Talk to sales
              </a>
              <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
                Request enterprise pilot
              </a>
            </div>
          </RevealText>
        </section>

        {/* 2. The enterprise problem */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>The enterprise problem</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                AI agents can write code. Enterprises need to <span className="text-italic-serif">control how they work.</span>
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
                Production engineering requires more than model intelligence. Organizations need to know:
              </p>
            </RevealText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px 32px', borderTop: '1px solid var(--color-border)', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
              {PROBLEM_LIST.map((p) => (
                <p key={p} className="text-body" style={{ fontSize: '15px', margin: 0, padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
                  {p}
                </p>
              ))}
            </div>
            <RevealText>
              <p className="text-body" style={{ maxWidth: '680px', fontSize: '16px' }}>
                <strong>Marshal provides the execution, governance, and evaluation layer</strong> around
                autonomous engineering.
              </p>
            </RevealText>
          </div>
        </section>

        {/* 3. Enterprise architecture */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Enterprise architecture</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              One control plane <span className="text-italic-serif">for autonomous work.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
              Your engineers work through Marshal. Marshal enforces your policies, routes your models,
              and records everything — inside your boundary.
            </p>
          </RevealText>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '16px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>Engineering team</p>
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '10px 0' }}>TUI · ACP · API · CI ↓</p>
            <div style={{ border: '1px solid var(--color-accent)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)', textAlign: 'center', letterSpacing: '0.1em' }}>MARSHAL</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['Agent runtime', 'Session manager', 'Policy engine', 'Model router', 'Evaluation engine'].map((c) => (
                  <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: 'var(--color-text)', border: '1px solid var(--color-border-strong)', borderRadius: '8px', padding: '8px 14px', background: 'var(--color-bg-elevated)' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '10px 0' }}>↓</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              {[
                { title: 'Your models', lines: ['OpenAI / Claude', 'Local / private', 'Custom endpoints'] },
                { title: 'Your tools', lines: ['MCP / plugins', 'Jira / Slack', 'Editors via ACP'] },
                { title: 'Your code', lines: ['GitHub / GitLab', 'CI / CD', 'Your branches'] },
              ].map((b) => (
                <div key={b.title} style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '16px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-text)' }}>{b.title}</p>
                  {b.lines.map((l) => (
                    <p key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', margin: '4px 0', color: 'var(--color-text-dim)' }}>{l}</p>
                  ))}
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '10px 0' }}>↓</p>
            <div style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-elevated)', padding: '16px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, margin: '0 0 6px', color: 'var(--color-text)' }}>Enterprise controls</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', margin: 0, color: 'var(--color-text-dim)' }}>IAM · Audit · Policy · Network · Sandbox · Observability</p>
            </div>
          </div>
        </section>

        {/* 4. Security */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Security</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Your code stays <span className="text-italic-serif">where you expect it to.</span>
              </h2>
            </RevealText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: 'clamp(32px, 4vh, 48px)' }}>
              {SECURITY_CARDS.map((c) => (
                <article key={c.title} className="card card--rounded card--pad">
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, marginBottom: '8px', color: 'var(--color-text)' }}>
                    {c.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.65, margin: 0 }}>{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Identity & access */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Identity and access</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              Every agent gets <span className="text-italic-serif">a boundary.</span>
            </h2>
          </RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: 'clamp(32px, 4vh, 48px)' }}>
            {IDENTITY_GROUPS.map((g) => (
              <article key={g.title} className="card card--rounded card--pad">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, marginBottom: '14px', color: 'var(--color-text)' }}>
                  {g.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {g.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="text-body" style={{ maxWidth: '680px', marginTop: '24px', fontSize: '15px' }}>
            Not just granular permissions — explicit control over who agents are, what they can touch,
            and what needs a human to approve.
          </p>
        </section>

        {/* 6. Governance */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Governance</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Define what agents <span className="text-italic-serif">are allowed to do.</span>
              </h2>
            </RevealText>
            <div
              style={{
                marginTop: 'clamp(32px, 4vh, 48px)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: '16px',
                background: 'var(--color-bg-surface)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-text)', letterSpacing: '0.06em' }}>
                  Engineering policy
                </p>
              </div>
              {POLICY_ROWS.map((r) => (
                <div
                  key={r.rule}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'baseline',
                    padding: '14px 24px',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '15px',
                      fontWeight: 700,
                      minWidth: '22px',
                      color: r.tone === 'ok' ? 'var(--color-accent)' : r.tone === 'warn' ? '#d8a94e' : '#c25b5b',
                    }}
                  >
                    {r.mark}
                  </span>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 550, margin: 0, color: 'var(--color-text)' }}>{r.rule}</p>
                    {r.note && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', margin: '2px 0 0', color: 'var(--color-text-dim)' }}>→ {r.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Auditability */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Auditability</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              Know exactly <span className="text-italic-serif">what happened.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
              Every autonomous run carries an audit trail.
            </p>
          </RevealText>
          <div style={{ marginBottom: 'clamp(24px, 3vh, 32px)' }}>
            <FlowChain steps={AUDIT_CHAIN} />
          </div>
          <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Every run captures</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
            {AUDIT_CAPTURE.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <p className="text-body" style={{ maxWidth: '680px', fontSize: '16px' }}>
            <strong>Replay the work.</strong> Marshal&apos;s event journal provides the foundation for
            reconstructing long-running sessions instead of relying on an AI-generated summary.
          </p>
        </section>

        {/* 8. Observability */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Observability</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Operate agents like <span className="text-italic-serif">production infrastructure.</span>
              </h2>
            </RevealText>
            <div
              style={{
                marginTop: 'clamp(32px, 4vh, 48px)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: '16px',
                background: 'var(--color-bg-surface)',
                padding: 'clamp(20px, 3vw, 32px)',
                marginBottom: '24px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: '0 0 16px', color: 'var(--color-text)', letterSpacing: '0.06em' }}>
                Organization
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                {OBS_STATS.map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 650, letterSpacing: '-0.02em', margin: 0, color: 'var(--color-text)' }}>
                      {s.value}
                    </p>
                    <p className="text-body" style={{ fontSize: '13px', margin: '4px 0 0' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {OBS_SIGNALS.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <p className="text-body" style={{ maxWidth: '680px', fontSize: '15px' }}>
              Integrate with your existing observability stack. <strong>OTel, logs, metrics, traces.</strong>
            </p>
          </div>
        </section>

        {/* 9. Model governance */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Model governance</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              Your organization <span className="text-italic-serif">chooses the models.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
              Marshal never forces you into one AI provider.
            </p>
          </RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[
              { title: 'Frontier models', lines: ['GPT / Claude', 'Gemini'] },
              { title: 'Private models', lines: ['Enterprise endpoints'] },
              { title: 'Local models', lines: ['Llama / Qwen', 'Custom models'] },
            ].map((b) => (
              <div key={b.title} style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '18px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 650, margin: '0 0 8px', color: 'var(--color-text)' }}>{b.title}</p>
                {b.lines.map((l) => (
                  <p key={l} className="text-body" style={{ fontSize: '13.5px', margin: '4px 0' }}>{l}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Enterprise controls</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
            {MODEL_CONTROLS.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <p className="text-eyebrow" style={{ marginBottom: '4px' }}>Route by task</p>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {ROUTING_EXAMPLE.map((r) => (
              <div key={r.task} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', padding: '13px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'baseline' }}>
                <p className="text-body" style={{ fontSize: '15px', margin: 0, minWidth: '180px' }}>{r.task}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px', margin: 0, color: 'var(--color-accent)' }}>→ {r.model}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Data & privacy */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Data and privacy</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Your engineering data <span className="text-italic-serif">remains yours.</span>
              </h2>
            </RevealText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: 'clamp(32px, 4vh, 48px)' }}>
              {PRIVACY_POINTS.map((p) => (
                <article key={p.title} className="card card--rounded card--pad">
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, marginBottom: '8px', color: 'var(--color-text)' }}>
                    {p.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.65, margin: 0 }}>{p.text}</p>
                </article>
              ))}
            </div>
            <p className="text-body" style={{ maxWidth: '680px', marginTop: '24px', fontSize: '15px' }}>
              Data handling is defined per deployment. Ask us how training, retention, and residency
              work in your environment — we will answer precisely.
            </p>
          </div>
        </section>

        {/* 11. Compliance */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Compliance</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              Built for regulated <span className="text-italic-serif">engineering environments.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: '24px' }}>
              Marshal provides controls that can support your organization&apos;s compliance requirements.
            </p>
          </RevealText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {COMPLIANCE_FRAMEWORKS.map((f) => (
              <Chip key={f}>{f}</Chip>
            ))}
          </div>
          <p className="text-body" style={{ maxWidth: '680px', marginTop: '20px', fontSize: '14px' }}>
            Frameworks are listed as areas Marshal&apos;s controls are designed to support — bring your
            auditors and we will walk through the evidence together.
          </p>
        </section>

        {/* 12. Enterprise workflows */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Enterprise workflows</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                This is why <span className="text-italic-serif">they pay you.</span>
              </h2>
            </RevealText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px, 4vw, 48px)', marginTop: 'clamp(32px, 4vh, 48px)' }}>
              <div>
                <p className="text-eyebrow" style={{ marginBottom: '12px' }}>From ticket to verified change</p>
                <FlowChain steps={TICKET_FLOW} />
              </div>
              <div>
                <p className="text-eyebrow" style={{ marginBottom: '12px' }}>From incident to resolution</p>
                <FlowChain steps={INCIDENT_FLOW} />
              </div>
            </div>
          </div>
        </section>

        {/* 13. Autonomous software factory */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)', textAlign: 'center' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Autonomous software factory</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              Turn your engineering organization into <span className="text-italic-serif">an autonomous software factory.</span>
            </h2>
          </RevealText>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '0', maxWidth: '560px', margin: 'clamp(32px, 4vh, 48px) auto 0' }}>
            <div style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '14px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-text)', letterSpacing: '0.1em' }}>SIGNALS</p>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '8px 0' }}>↓</p>
            <div style={{ border: '1px solid var(--color-accent)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '14px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-text)', letterSpacing: '0.1em' }}>MARSHAL</p>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '8px 0' }}>↓</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {FACTORY_NODES.map((n) => (
                <div key={n} style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '14px 10px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>{n}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '8px 0' }}>↓</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {['Deploy', 'Verify', 'Approve'].map((n) => (
                <div key={n} style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-surface)', padding: '14px 10px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>{n}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-accent)', margin: '8px 0' }}>↓</p>
            <div style={{ border: '1px solid var(--color-border-strong)', borderRadius: '12px', background: 'var(--color-bg-elevated)', padding: '14px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--color-text)', letterSpacing: '0.1em' }}>EVALUATE → IMPROVE</p>
            </div>
          </div>
        </section>

        {/* 14. Deployment options */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Deployment options</p>
            </RevealText>
            <RevealText delay={1}>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Deploy Marshal <span className="text-italic-serif">where you need it.</span>
              </h2>
            </RevealText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: 'clamp(32px, 4vh, 48px)' }}>
              {DEPLOY_OPTIONS.map((d) => (
                <article key={d.title} className="card card--rounded card--pad">
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400, marginBottom: '8px', color: 'var(--color-text)' }}>
                    {d.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '14px', lineHeight: 1.65, margin: 0 }}>{d.text}</p>
                </article>
              ))}
            </div>
            <p className="text-body" style={{ maxWidth: '680px', marginTop: '24px', fontSize: '14px' }}>
              Deployment options vary by engagement — talk to us about your environment and we will
              scope what fits.
            </p>
          </div>
        </section>

        {/* 15. Enterprise support + pilot */}
        <section className="container-editorial" style={{ maxWidth: '880px', paddingTop: 'var(--spacing-section-lg)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Enterprise support</p>
          </RevealText>
          <RevealText delay={1}>
            <h2 className="text-display" style={{ marginBottom: '16px' }}>
              From pilot <span className="text-italic-serif">to production.</span>
            </h2>
          </RevealText>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'clamp(24px, 3vh, 32px)', marginBottom: 'clamp(24px, 3vh, 32px)' }}>
            {SUPPORT_ITEMS.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <article className="card card--rounded card--pad">
            <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Enterprise pilot</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400, letterSpacing: '-0.015em', marginBottom: '12px', color: 'var(--color-text)' }}>
              Start with one repository and one workflow.
            </h3>
            <p className="text-body" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '640px', margin: 0 }}>
              Measure task success, engineering hours saved, cost per task, and quality before expanding
              across the organization.
            </p>
          </article>
        </section>

        {/* 16. Final CTA */}
        <section style={{ background: 'var(--color-bg-elevated)', padding: 'var(--spacing-section-lg) 0' }}>
          <div className="container-editorial" style={{ maxWidth: '880px', textAlign: 'center' }}>
            <RevealText>
              <h2 className="text-display" style={{ marginBottom: '16px' }}>
                Bring Marshal into <span className="text-italic-serif">your engineering stack.</span>
              </h2>
            </RevealText>
            <RevealText delay={1}>
              <p className="text-body" style={{ maxWidth: '520px', margin: '0 auto 28px' }}>
                Start with one team. Run it against real repositories. Measure the results. Then scale
                autonomous engineering across your organization.
              </p>
            </RevealText>
            <RevealText delay={2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                <a href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Request an enterprise pilot
                </a>
                <a href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
                  Talk to sales
                </a>
              </div>
            </RevealText>
            <p className="text-body" style={{ fontSize: '15px', fontWeight: 550, marginTop: '32px' }}>
              Marshal gives enterprises autonomous software engineering without giving up control of
              their models, code, infrastructure, or governance.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
