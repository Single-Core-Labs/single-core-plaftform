import { useState, useRef, useEffect } from 'react'
import SEO from '@/components/SEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import DnaModel from '@/components/DnaModel'
import { ArrowRight, Shield, Cpu, Cloud, Code2, Workflow, LineChart, BookOpen, Building2, Users, CheckCircle, Lock, Server, GitBranch, BarChart3, MessagesSquare, ChevronRight } from 'lucide-react'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

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

function LazyHeroVideo() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !videoRef.current) return
    const vid = videoRef.current
    vid.src = HERO_VIDEO
    vid.load()
    const onLoad = () => setLoaded(true)
    vid.addEventListener('loadeddata', onLoad)
    return () => vid.removeEventListener('loadeddata', onLoad)
  }, [visible])

  return (
    <div ref={containerRef} className="hero-video-wrap">
      {/* DNA model — always visible as placeholder */}
      <div className="hero-3d-scene" style={{ opacity: loaded ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <DnaModel />
      </div>
      {/* Video — fades in once loaded */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-player"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  )
}

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
            paddingTop: 'clamp(120px, 18vh, 180px)',
            paddingBottom: 'clamp(80px, 12vh, 140px)',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 164, 120, 0.08), transparent 70%), var(--color-bg)',
            overflow: 'hidden',
          }}
        >
          <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-split">
              <div className="hero-split__text">
                <RevealText>
                  <p className="text-eyebrow" style={{ marginBottom: '20px' }}>For Technology Companies</p>
                </RevealText>
                <RevealText delay={0.15}>
                  <h1 className="solutions-hero__title" style={{ marginBottom: '24px', maxWidth: '600px' }}>
                    Ship smarter software <br />
                    with <em>sovereign AI.</em>
                  </h1>
                </RevealText>
                <RevealText delay={0.3}>
                  <p className="text-body" style={{ maxWidth: '520px', fontSize: 'clamp(16px, 1.2vw, 20px)', color: 'var(--color-text)', marginBottom: '36px', lineHeight: 1.6 }}>
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
              <div className="hero-split__media">
                <LazyHeroVideo />
              </div>
            </div>
          </div>

          <style>{`
            .hero-split {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 48px;
              align-items: center;
            }
            .hero-split__text { text-align: left; }

            .hero-video-wrap {
              position: relative;
              width: 100%;
              max-width: 440px;
              margin: 0 auto;
              aspect-ratio: 1 / 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .hero-video-player {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              border-radius: 16px;
              object-fit: cover;
              border: 1px solid rgba(184,164,120,0.1);
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }

            .hero-3d-scene {
              perspective: 800px;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              z-index: 1;
            }

            @media (max-width: 900px) {
              .hero-split { grid-template-columns: 1fr; gap: 32px; }
              .hero-split__text { text-align: center; }
              .hero-video-wrap { max-width: 320px; }
            }
          `}</style>
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
                    <div style={{
                      padding: '0',
                      borderRadius: '16px',
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      minHeight: '340px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      {team.id === 'engineering' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* Divider */}
                          <line x1="200" y1="26" x2="200" y2="322" stroke="rgba(184,164,120,0.08)" strokeWidth="1" strokeDasharray="3,3" />
                          {/* ── LEFT: Traditional ── */}
                          <rect x="36" y="26" width="158" height="18" rx="4" fill="rgba(184,164,120,0.04)" />
                          <text x="44" y="38" fontSize="8" fill="rgba(184,164,120,0.3)" fontFamily="monospace" letterSpacing="1">TRADITIONAL</text>
                          {/* Editor frame */}
                          <rect x="20" y="52" width="174" height="258" rx="6" fill="rgba(0,0,0,0.3)" stroke="rgba(184,164,120,0.06)" strokeWidth="1" />
                          <circle cx="32" cy="66" r="3" fill="#ff5f57" />
                          <circle cx="42" cy="66" r="3" fill="#ffbd2e" />
                          <circle cx="52" cy="66" r="3" fill="#28c840" />
                          {/* Live code — Traditional */}
                          {[' 1  // Manual implementation',' 2  function fetchUser(id: any) {',' 3    // TODO: add error handling',' 4    const res = await fetch(',' 5      /api/user/{id}',' 6    );',' 7    return res.json(); // X no type',' 8  }'].map((line, li) => (
                            <motion.text key={li} x={li===0||li===1||li===7?28:44} y={88+li*12} fontSize="7" fill={li===1?'rgba(100,180,255,0.4)':li===6?'rgba(255,95,87,0.5)':'rgba(200,200,200,0.25)'} fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1+li*0.1}}>{line}</motion.text>
                          ))}
                          {/* Problem pane */}
                          <rect x="28" y="186" width="158" height="42" rx="4" fill="rgba(255,95,87,0.04)" stroke="rgba(255,95,87,0.08)" strokeWidth="1" />
                          <motion.text x="34" y="200" fontSize="6.5" fill="rgba(255,95,87,0.45)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}>✕  PROBLEMS (3)</motion.text>
                          <motion.text x="34" y="211" fontSize="6.5" fill="rgba(255,95,87,0.3)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}>  TS2345  id: any → no type safety</motion.text>
                          <motion.text x="34" y="221" fontSize="6.5" fill="rgba(255,95,87,0.3)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}>  TS7006  missing return type</motion.text>
                          {/* Timer */}
                          <motion.text x="54" y="252" fontSize="7.5" fill="rgba(184,164,120,0.2)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>⏱ Manual review: ~35 min</motion.text>
                          <motion.text x="54" y="264" fontSize="7.5" fill="rgba(184,164,120,0.15)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}>  3 bugs to fix in PR</motion.text>
                          {/* ── RIGHT: AI-Native ── */}
                          <rect x="210" y="26" width="158" height="18" rx="4" fill="rgba(40,200,64,0.04)" />
                          <rect x="210" y="26" width="3" height="18" rx="1.5" fill="rgba(40,200,64,0.3)" />
                          <text x="218" y="38" fontSize="8" fill="rgba(40,200,64,0.5)" fontFamily="monospace" letterSpacing="1">AI-NATIVE</text>
                          {/* Editor frame */}
                          <rect x="208" y="52" width="174" height="258" rx="6" fill="rgba(0,0,0,0.3)" stroke="rgba(40,200,64,0.06)" strokeWidth="1" />
                          <circle cx="220" cy="66" r="3" fill="#ff5f57" />
                          <circle cx="230" cy="66" r="3" fill="#ffbd2e" />
                          <circle cx="240" cy="66" r="3" fill="#28c840" />
                          {/* AI badge */}
                          <rect x="340" y="54" width="36" height="14" rx="7" fill="rgba(40,200,64,0.1)" />
                          <motion.text x="346" y="64" fontSize="6.5" fill="rgba(40,200,64,0.5)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>AI ⚡</motion.text>
                          {/* Live code — AI-native */}
                          {[
                            ' 1  // AI-suggested implementation',
                            ' 2  function fetchUser<T>(id: T):',
                            ' 3    Promise<UserResponse> {',
                            ' 4    const url = buildEndpoint(',
                            " 5      'users', { id }         // <- auto",
                            ' 6    );',
                            ' 7    return request<UserResp>(url);',
                            ' 8  }',
                          ].map((line, li) => (
                            <motion.text key={li} x={li===2||li===4?'232':'216'} y={88+li*12} fontSize="7" fill={li===1||li===2?'rgba(100,180,255,0.5)':li===4?'rgba(255,200,100,0.35)':'rgba(200,200,200,0.3)'} fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2+li*0.1}}>{line}</motion.text>
                          ))}
                          {/* AI suggestion pane */}
                          <rect x="216" y="186" width="158" height="42" rx="4" fill="rgba(40,200,64,0.04)" stroke="rgba(40,200,64,0.08)" strokeWidth="1" />
                          <motion.text x="222" y="200" fontSize="6.5" fill="rgba(40,200,64,0.45)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}>✓  AI SUGGESTIONS (2)</motion.text>
                          <motion.text x="222" y="211" fontSize="6.5" fill="rgba(40,200,64,0.3)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}>  Generic type T inferred → </motion.text>
                          <motion.text x="222" y="221" fontSize="6.5" fill="rgba(40,200,64,0.3)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>  Error handling auto-added</motion.text>
                          {/* Timer */}
                          <motion.text x="240" y="252" fontSize="7.5" fill="rgba(40,200,64,0.3)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}>⚡ AI review: ~12 sec</motion.text>
                          <motion.text x="240" y="264" fontSize="7.5" fill="rgba(40,200,64,0.2)" fontFamily="monospace" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>  0 bugs — merges automatically</motion.text>
                          {/* Blinking cursor */}
                          <motion.rect x="340" y="166" width="5" height="9" rx="1" fill="rgba(184,164,120,0.4)" animate={{opacity:[1,0,1]}} transition={{duration:0.8,repeat:Infinity}} />
                        </svg>
                      )}
                      {team.id === 'operations' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* Pipeline flow */}
                          <rect x="40" y="60" width="80" height="40" rx="6" fill="rgba(184,164,120,0.08)" stroke="rgba(184,164,120,0.15)" strokeWidth="1" />
                          <text x="52" y="84" fontSize="10" fill="rgba(184,164,120,0.5)" fontFamily="monospace">CI BUILD</text>
                          {/* Arrow */}
                          <line x1="120" y1="80" x2="150" y2="80" stroke="rgba(184,164,120,0.2)" strokeWidth="1.5" />
                          <polygon points="148,76 156,80 148,84" fill="rgba(184,164,120,0.2)" />
                          {/* Test */}
                          <rect x="156" y="60" width="80" height="40" rx="6" fill="rgba(184,164,120,0.08)" stroke="rgba(184,164,120,0.15)" strokeWidth="1" />
                          <text x="168" y="84" fontSize="10" fill="rgba(184,164,120,0.5)" fontFamily="monospace">TESTS</text>
                          <line x1="236" y1="80" x2="266" y2="80" stroke="rgba(184,164,120,0.2)" strokeWidth="1.5" />
                          <polygon points="264,76 272,80 264,84" fill="rgba(184,164,120,0.2)" />
                          {/* Deploy */}
                          <rect x="272" y="60" width="80" height="40" rx="6" fill="rgba(184,164,120,0.12)" stroke="rgba(184,164,120,0.25)" strokeWidth="1" />
                          <text x="280" y="84" fontSize="10" fill="rgba(184,164,120,0.6)" fontFamily="monospace">DEPLOY</text>
                          {/* Service boxes */}
                          <rect x="40" y="140" width="100" height="60" rx="6" fill="rgba(0,0,0,0.15)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <rect x="52" y="154" width="76" height="4" rx="2" fill="rgba(184,164,120,0.15)" />
                          <rect x="52" y="166" width="50" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          <rect x="52" y="178" width="60" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          <rect x="150" y="140" width="100" height="60" rx="6" fill="rgba(0,0,0,0.15)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <rect x="162" y="154" width="76" height="4" rx="2" fill="rgba(184,164,120,0.15)" />
                          <rect x="162" y="166" width="50" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          <rect x="162" y="178" width="60" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          <rect x="260" y="140" width="100" height="60" rx="6" fill="rgba(0,0,0,0.15)" stroke="rgba(184,164,120,0.08)" strokeWidth="1" />
                          <rect x="272" y="154" width="76" height="4" rx="2" fill="rgba(184,164,120,0.15)" />
                          <rect x="272" y="166" width="50" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          <rect x="272" y="178" width="60" height="4" rx="2" fill="rgba(184,164,120,0.08)" />
                          {/* Success checkmark */}
                          <circle cx="345" cy="235" r="20" fill="none" stroke="rgba(40,200,64,0.3)" strokeWidth="2" />
                          <polyline points="337,235 343,241 353,229" fill="none" stroke="rgba(40,200,64,0.4)" strokeWidth="2" strokeLinecap="round" />
                          {/* Metrics */}
                          <rect x="40" y="240" width="80" height="30" rx="4" fill="rgba(184,164,120,0.04)" />
                          <text x="48" y="258" fontSize="10" fill="rgba(184,164,120,0.35)" fontFamily="monospace">99.9% uptime</text>
                          <rect x="130" y="240" width="80" height="30" rx="4" fill="rgba(184,164,120,0.04)" />
                          <text x="138" y="258" fontSize="10" fill="rgba(184,164,120,0.35)" fontFamily="monospace">0 failures</text>
                        </svg>
                      )}
                      {team.id === 'customer' && (
                        <svg viewBox="0 0 400 340" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
                          <rect width="400" height="340" fill="var(--color-bg-elevated)" />
                          {/* Dashboard card */}
                          <rect x="30" y="40" width="340" height="260" rx="10" fill="rgba(0,0,0,0.2)" stroke="rgba(184,164,120,0.1)" strokeWidth="1" />
                          {/* Chart area */}
                          <rect x="48" y="72" width="150" height="100" rx="6" fill="rgba(0,0,0,0.15)" />
                          {/* Line chart */}
                          <polyline points="60,152 90,130 110,140 140,110 170,120 185,95" fill="none" stroke="rgba(184,164,120,0.4)" strokeWidth="2" strokeLinecap="round" />
                          <polyline points="60,152 90,145 110,148 140,135 170,138 185,130" fill="none" stroke="rgba(184,164,120,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Bar chart */}
                          <rect x="216" y="120" width="22" height="52" rx="3" fill="rgba(184,164,120,0.15)" />
                          <rect x="246" y="100" width="22" height="72" rx="3" fill="rgba(184,164,120,0.25)" />
                          <rect x="276" y="130" width="22" height="42" rx="3" fill="rgba(184,164,120,0.15)" />
                          <rect x="306" y="110" width="22" height="62" rx="3" fill="rgba(184,164,120,0.2)" />
                          {/* KPI cards */}
                          <rect x="48" y="190" width="100" height="50" rx="6" fill="rgba(184,164,120,0.04)" stroke="rgba(184,164,120,0.06)" strokeWidth="1" />
                          <text x="56" y="210" fontSize="9" fill="rgba(184,164,120,0.3)" fontFamily="monospace">NPS Score</text>
                          <text x="56" y="228" fontSize="16" fill="rgba(184,164,120,0.6)" fontFamily="var(--font-display)" fontWeight="600">72</text>
                          <rect x="160" y="190" width="100" height="50" rx="6" fill="rgba(184,164,120,0.04)" stroke="rgba(184,164,120,0.06)" strokeWidth="1" />
                          <text x="168" y="210" fontSize="9" fill="rgba(184,164,120,0.3)" fontFamily="monospace">Retention</text>
                          <text x="168" y="228" fontSize="16" fill="rgba(40,200,64,0.5)" fontFamily="var(--font-display)" fontWeight="600">94%</text>
                          <rect x="272" y="190" width="80" height="50" rx="6" fill="rgba(184,164,120,0.04)" stroke="rgba(184,164,120,0.06)" strokeWidth="1" />
                          <text x="278" y="210" fontSize="9" fill="rgba(184,164,120,0.3)" fontFamily="monospace">ARR</text>
                          <text x="278" y="228" fontSize="16" fill="rgba(184,164,120,0.6)" fontFamily="var(--font-display)" fontWeight="600">$2.4M</text>
                          {/* Pulse dot */}
                          <circle cx="48" cy="40" r="3" fill="rgba(40,200,64,0.5)" />
                          <circle cx="48" cy="40" r="6" fill="none" stroke="rgba(40,200,64,0.2)" strokeWidth="1" />
                        </svg>
                      )}
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
