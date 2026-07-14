import { useState } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { ArrowRight, Shield, Cpu, Cloud, Code2, Workflow, LineChart, BookOpen, Building2, Users, CheckCircle, Lock, Server, GitBranch, BarChart3, MessagesSquare, ChevronRight } from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Code2,
    label: 'Build',
    title: 'Ship faster with context-aware AI agents',
    detail: 'Equip your engineering team with AI that understands your codebase, docs, and workflows. Accelerate development without compromising quality.',
    features: [
      'Autonomous code review and PR summarization',
      'Context-aware answers grounded in your repos',
      'Automated documentation and API reference generation',
    ],
  },
  {
    icon: Shield,
    label: 'Secure',
    title: 'Sovereign AI with zero data exposure',
    detail: 'Your intellectual property stays yours. Deploy in your VPC, on-prem, or air-gapped environment with full control over data boundaries.',
    features: [
      'Private LLM deployment with no external calls',
      'Fine-tuned models that never share your data',
      'SOC-2, HIPAA, and GDPR-compliant infrastructure',
    ],
  },
  {
    icon: Cloud,
    label: 'Scale',
    title: 'Enterprise MLOps for production AI',
    detail: 'From pilot to thousands of requests per second. Governance, monitoring, and reliability baked into every layer of your AI stack.',
    features: [
      'Automated model testing and version control',
      'Real-time monitoring with bias and drift detection',
      'Multi-cloud deployment with zero-downtime updates',
    ],
  },
]

const TEAMS = [
  {
    id: 'engineering',
    icon: Code2,
    label: 'Engineering',
    title: 'Unblock your engineers with AI-native workflows',
    description: 'Give your team an AI copilot that understands your entire tech stack — from legacy monoliths to microservices.',
    points: [
      'Explain APIs with live code examples and module references',
      'Diagnose failing builds and propose fixes from historical patterns',
      'Draft RFCs, suggest reviewers, and auto-generate release notes',
    ],
    stat: '40%',
    statLabel: 'faster code reviews',
  },
  {
    id: 'operations',
    icon: Workflow,
    label: 'Operations',
    title: 'Automate release workflows from CI to deplou',
    description: 'Orchestrate complex multi-service releases with intelligent automation that coordinates across teams and environments.',
    points: [
      'Auto-triage incidents with log analysis and root cause suggestions',
      'Coordinate rollouts by service, region, and risk profile',
      'Generate changelogs, stakeholder updates, and compliance reports',
    ],
    stat: '3x',
    statLabel: 'faster incident resolution',
  },
  {
    id: 'customer',
    icon: MessagesSquare,
    label: 'Customer Success',
    title: 'Surface insights that drive retention and growth',
    description: 'Combine product telemetry with CRM data to uncover risks, opportunities, and next-best actions for every account.',
    points: [
      'Summarize account health with cohort-linked incident context',
      'Draft renewal notes and EBR slides with sourced metrics',
      'Trigger playbooks for adoption nudges, migrations, and beta invites',
    ],
    stat: '60%',
    statLabel: 'faster account reviews',
  },
]

const SERVICES = [
  {
    icon: Cpu,
    title: 'Agentic Workflows',
    detail: 'Autonomous orchestration of multi-step enterprise tasks across claims, risk reporting, and operational automation — with human-in-the-loop guardrails.',
  },
  {
    icon: Lock,
    title: 'Private LLM Deployment',
    detail: 'Fine-tuned open-source models deployed in secure, air-gapped environments. Full control over your weights, data, and inference pipeline.',
  },
  {
    icon: Server,
    title: 'Enterprise Data Engineering',
    detail: 'Unified data lake architecture merging data science, ML, and BI into a single governed source of truth. Real-time streaming pipelines included.',
  },
  {
    icon: GitBranch,
    title: 'Regulated MLOps',
    detail: 'End-to-end model tracking, continuous testing, version control, and automated deployment with SOC-2, HIPAA, and GDPR compliance built in.',
  },
  {
    icon: BarChart3,
    title: 'Domain-Specific RAG',
    detail: 'Zero-hallucination retrieval pipelines across medical journals, compliance codes, financial portfolios, and proprietary knowledge bases.',
  },
  {
    icon: LineChart,
    title: 'Predictive Risk Analytics',
    detail: 'Mathematical modeling for market trends, epidemic outbreaks, and multi-variable risk surfaces trained on your institutional data.',
  },
]

const DEPLOYMENT_FEATURES = [
  { icon: Lock, title: 'Privately deployable', detail: 'Deploy in your own VPC, on-prem, or air-gapped. Zero data leaves your boundary.' },
  { icon: CheckCircle, title: 'Regulator-ready', detail: 'Auditable outputs, usage monitoring, and built-in governance tools for compliance.' },
  { icon: Building2, title: 'Fully customizable', detail: 'Tailor models to your unique data, use cases, and infrastructure requirements.' },
  { icon: Users, title: 'Expert-implemented', detail: 'Work with our forward-deployed engineers for fast, secure implementation.' },
]

export default function TechPage() {
  const [activeTeam, setActiveTeam] = useState('engineering')

  return (
    <div className="page-dark">
      <SEO
        title="AI Solutions for Technology Companies | Single Core Labs"
        description="Single Core Labs provides enterprise AI solutions for technology companies: agentic workflows, private LLM deployment, sovereign AI infrastructure, and regulated MLOps pipelines."
        keywords="AI solutions, enterprise AI, private LLM, sovereign AI, agentic workflows, MLOps, technology companies"
      />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>

        {/* ──────── Hero ──────── */}
        <section
          style={{
            position: 'relative',
            paddingTop: 'clamp(140px, 20vh, 220px)',
            paddingBottom: 'clamp(100px, 14vh, 160px)',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.08), transparent 70%), var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '24px' }}>For Technology Companies</p>
            </RevealText>
            <RevealText delay={0.15}>
              <h1 className="solutions-hero__title" style={{ marginBottom: '28px', maxWidth: '1050px', marginInline: 'auto' }}>
                Ship smarter software <br />
                with <em>sovereign AI.</em>
              </h1>
            </RevealText>
            <RevealText delay={0.3}>
              <p className="text-body" style={{ maxWidth: '680px', marginInline: 'auto', fontSize: 'clamp(17px, 1.3vw, 21px)', color: 'var(--color-text)', marginBottom: '40px' }}>
                Turn your data into your competitive advantage. Build, deploy, and scale AI systems
                engineered for precision, privacy, and performance.
              </p>
            </RevealText>
            <RevealText delay={0.45}>
              <a href="/contact" className="btn-primary">
                Request a demo
                <ArrowRight size={18} />
              </a>
            </RevealText>
          </div>
        </section>

        {/* ──────── Core Capabilities ──────── */}
        <section className="container-editorial" style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Core Platform</p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', maxWidth: '700px', marginInline: 'auto' }}>
                Intelligence that ships with your code.
              </h2>
            </RevealText>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card card--rounded card--pad"
                style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(184, 164, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--color-accent)' }}>
                  <cap.icon size={22} strokeWidth={1.5} />
                </div>
                <p className="text-eyebrow" style={{ fontSize: '11px', marginBottom: '8px', letterSpacing: '2px' }}>
                  {cap.label}
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '10px', lineHeight: 1.3 }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                  {cap.detail}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cap.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: 'var(--color-text-dim)' }}>
                      <CheckCircle size={14} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Teams Section ──────── */}
        <section style={{ marginBottom: '120px', position: 'relative' }}>
          <div style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.04), transparent 70%)',
            paddingTop: '80px',
            paddingBottom: '100px',
          }}>
            <div className="container-editorial">
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Use Cases by Team</p>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                    Empower every role across <br className="hidden-mobile" />
                    the product lifecycle.
                  </h2>
                </RevealText>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px', flexWrap: 'wrap' }}>
                {TEAMS.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setActiveTeam(team.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '100px',
                      border: activeTeam === team.id ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: activeTeam === team.id ? 'rgba(184, 164, 120, 0.1)' : 'transparent',
                      color: activeTeam === team.id ? 'var(--color-accent)' : 'var(--color-text-dim)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <team.icon size={16} strokeWidth={1.5} />
                    {team.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {TEAMS.filter(t => t.id === activeTeam).map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '48px',
                      alignItems: 'center',
                    }}
                    className="teams-grid"
                  >
                    <div>
                      <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '16px', lineHeight: 1.3 }}>
                        {team.title}
                      </h3>
                      <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                        {team.description}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                        {team.points.map((p, i) => (
                          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>
                            <ChevronRight size={14} style={{ color: 'var(--color-accent)', marginTop: '3px', flexShrink: 0 }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>
                          {team.stat}
                        </span>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                          {team.statLabel}
                        </span>
                      </div>
                    </div>
                    <div className="card card--rounded card--pad" style={{
                      padding: '48px',
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      minHeight: '320px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                      <team.icon size={64} strokeWidth={1} style={{ color: 'var(--color-accent)', marginBottom: '24px', opacity: 0.4 }} />
                      <p style={{ fontSize: '14px', color: 'var(--color-text-dim)', fontStyle: 'italic', maxWidth: '280px' }}>
                        Visual illustration of {team.label} workflow will appear here.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ──────── Platform Services ──────── */}
        <section className="container-editorial" style={{ marginBottom: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <RevealText>
              <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Platform Services</p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', maxWidth: '700px', marginInline: 'auto' }}>
                Everything you need to ship production AI.
              </h2>
            </RevealText>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-card)',
                  transition: 'all 0.3s ease',
                }}
                className="service-card"
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(184, 164, 120, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-accent)' }}>
                  <svc.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {svc.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Security & Deployment ──────── */}
        <section style={{ marginBottom: '120px' }}>
          <div className="container-editorial">
            <div style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: '24px',
              padding: 'clamp(40px, 6vw, 80px)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '12px' }}>Deployment & Security</p>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                    Secure, compliant, and <br className="hidden-mobile" />
                    ready for production.
                  </h2>
                </RevealText>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
                {DEPLOYMENT_FEATURES.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ textAlign: 'center' }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(184, 164, 120, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-accent)' }}>
                      <feat.icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '280px', marginInline: 'auto' }}>
                      {feat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────── Closing CTA ──────── */}
        <section className="container-editorial" style={{ textAlign: 'center', marginBottom: '120px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card card--rounded card--pad"
            style={{ padding: 'clamp(48px, 6vw, 80px)', background: 'var(--color-bg-elevated)' }}
          >
            <h2 className="text-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '16px' }}>
              Accelerate your AI roadmap.
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-muted)', maxWidth: '560px', marginInline: 'auto', marginBottom: '36px', fontSize: '15px' }}>
              Connect with an expert to explore how Single Core Labs fits your stack, data, and goals.
              From pilot to production — safely and securely.
            </p>
            <a href="/contact" className="btn-primary">
              Get started
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />

      <style>{`
        .service-card:hover {
          border-color: var(--color-accent) !important;
          background: var(--color-bg-elevated) !important;
        }
      `}</style>
    </div>
  )
}
