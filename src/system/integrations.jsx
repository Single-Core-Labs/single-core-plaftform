import { BentoGrid } from './Bento'
import { Terminal } from './Tabs'

/* Marshal integrations bento — native rebuild (no Magic UI).
   Slack, Jira, GitHub beam + file chips + event list + sessions. */

const FILES = [
  { name: 'AGENTS.md', body: 'Project guidance Marshal reads before every task.' },
  { name: 'journal.jsonl', body: 'Replay-exact event log of every model call and tool run.' },
  { name: 'clamp.mjs', body: 'Source under test, referenced with @ in the TUI.' },
  { name: 'SKILL.md', body: 'Custom skill: tools, permissions, and workflow in one file.' },
  { name: 'eval-set.jsonl', body: 'Passing runs kept as training data by rejection sampling.' },
  { name: 'session.db', body: 'SQLite state: sessions, turns, queues, and handoffs.' },
]

const EVENTS = [
  { lead: 'tests passed', rest: '· 14 files · verifier done' },
  { lead: 'approval needed', rest: '· push to main' },
  { lead: 'session resumed', rest: '· replay-exact · 0 context lost' },
  { lead: 'subagent done', rest: '· builder → verifier handoff' },
  { lead: 'eval queued', rest: '· nightly harness · 06:00' },
  { lead: 'incident triaged', rest: '· root cause proposed' },
]

function FileChips() {
  const half = (hidden) => (
    <span aria-hidden={hidden || undefined} style={{ display: 'contents' }}>
      {FILES.map((f) => (
        <span key={`${hidden ? 'b' : 'a'}-${f.name}`} style={{ display: 'contents' }}>
          <span className="scl-chip">
            <span className="scl-chip-name">{f.name}</span>
            <span className="scl-chip-body">{f.body}</span>
          </span>
        </span>
      ))}
    </span>
  )
  return (
    <div className="scl-marquee" style={{ border: 'none' }}>
      <div className="scl-marquee-track scl-chips" style={{ animationDuration: '28s', padding: '8px 4px' }}>
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}

function EventList() {
  const half = (hidden) => (
    <span aria-hidden={hidden || undefined} style={{ display: 'contents' }}>
      {EVENTS.map((e) => (
        <span key={`${hidden ? 'b' : 'a'}-${e.lead}`} className="scl-aevent">
          <i />
          <span><b>{e.lead}</b> {e.rest}</span>
        </span>
      ))}
    </span>
  )
  return (
    <div className="scl-alist" role="img" aria-label="Agent events streaming: approvals, completions, and resumes">
      {half(false)}
      {half(true)}
    </div>
  )
}

function Beam() {
  const line = { fill: 'none', strokeWidth: 1.5 }
  const nodeFill = '#0d0d0d'
  const nodeStroke = 'rgba(255,255,255,0.1)'
  const mono = 'ui-monospace, Menlo, monospace'
  return (
    <svg className="scl-beam" viewBox="0 0 400 200" role="img" aria-label="Marshal connected to Slack, Jira, and GitHub">
      <path d="M200 115 L65 45" {...line} stroke="var(--scl-accent)" strokeOpacity="0.7" className="scl-beam-flow" />
      <path d="M200 115 L335 45" {...line} stroke="var(--scl-accent)" strokeOpacity="0.7" className="scl-beam-flow" />
      <path d="M200 115 L200 168" {...line} stroke="var(--scl-accent)" strokeOpacity="0.7" className="scl-beam-flow" />
      {[
        { x: 20, y: 25, label: 'Slack' },
        { x: 290, y: 25, label: 'Jira' },
        { x: 155, y: 168, label: 'GitHub' },
      ].map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={90} height={40} rx={8} fill={nodeFill} stroke={nodeStroke} />
          <text x={n.x + 45} y={n.y + 25} textAnchor="middle" fontFamily={mono} fontSize="12.5" fill="#a8a494">
            {n.label}
          </text>
        </g>
      ))}
      <rect x={150} y={92} width={100} height={46} rx={8} fill="#101010" stroke="var(--scl-accent)" strokeOpacity="0.65" strokeWidth={1.5} />
      <text x={200} y={120} textAnchor="middle" fontFamily={mono} fontSize="13" fill="#e4dec9">
        Marshal
      </text>
    </svg>
  )
}

function IntCard({ span, visual, kicker, headline, text }) {
  return (
    <article className={`scl-card${span === 'wide' ? ' scl-card-wide' : ''}`}>
      <div className="scl-int-visual">{visual}</div>
      <p className="scl-card-kicker">{kicker}</p>
      <h3 className="scl-card-headline">{headline}</h3>
      <p className="scl-card-text">{text}</p>
    </article>
  )
}

export function IntegrationBento() {
  return (
    <BentoGrid>
      <IntCard
        span="wide"
        kicker="Integrations"
        headline="Slack, Jira, GitHub — wired in."
        text="Notify channels, triage issues, and open PRs only on approval. Vendor routing with pagination and bounded diffs."
        visual={<Beam />}
      />
      <IntCard
        kicker="Files"
        headline="Your repo, referenced."
        text="@ files and / commands with gitignore-respecting search and repo-aware ranking."
        visual={<FileChips />}
      />
      <IntCard
        kicker="Sessions"
        headline="Leave and come back."
        text="Picker, fork, and rewind. Every resume reconstructs replay-exact state."
        visual={
          <div style={{ padding: '8px 4px' }}>
            <Terminal
              title="Resume a session"
              lines={[
                { prompt: true, text: 'marshal --session' },
                { text: '3 sessions · resumed replay-exact', ok: true },
              ]}
            />
          </div>
        }
      />
      <IntCard
        span="wide"
        kicker="Agent events"
        headline="Know the moment it happens."
        text="Approvals, completions, and failures stream as they occur — background output coalesced so logs stay cheap."
        visual={<EventList />}
      />
      <IntCard
        span="wide"
        kicker="MCP and plugins"
        headline="Extend without forking."
        text="20+ builtin skills, custom SKILL.md files, MCP servers, and GitHub-importable plugins over a 30-preset BYOK provider catalog."
        visual={
          <div style={{ padding: '8px 4px' }}>
            <Terminal
              title="Install a plugin"
              lines={[
                { prompt: true, text: 'marshal plugin add org/repo' },
                { text: 'skill registered · tools declared · ready', ok: true },
              ]}
            />
          </div>
        }
      />
    </BentoGrid>
  )
}
