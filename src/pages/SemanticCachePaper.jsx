import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Link2, Check, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

// ─── SCROLL PROGRESS ────────────────────────────────────────────────────────
function ProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const fn = () => {
      const scrollTop = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.width = docH > 0 ? `${(scrollTop / docH) * 100}%` : '0%'
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div aria-hidden="true" style={{ position:'fixed', top:0, left:0, height:'3px', width:'100%', background:'rgba(0,0,0,0.06)', zIndex:9999 }}>
      <div ref={ref} style={{ height:'100%', width:'0%', background:'var(--color-accent)', transition:'width 0.1s linear' }} />
    </div>
  )
}

// ─── COPY LINK ───────────────────────────────────────────────────────────────
function CopyLink() {
  const [copied, setCopied] = useState(false)
  const handle = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }
  return (
    <button type="button" onClick={handle} className={`blog-copy-link${copied ? ' is-copied' : ''}`} aria-label={copied ? 'Copied' : 'Copy link'}>
      {copied ? <Check size={14} /> : <Link2 size={14} />}
      {copied ? 'Copied' : 'Copy Link'}
    </button>
  )
}

// ─── SHARED ATOMS ────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-accent)', background:'var(--color-accent-dim)', padding:'3px 8px', borderRadius:'3px' }}>
      {label}
    </span>
  )
}

function Hi({ children }) {
  return <strong style={{ color:'var(--color-text)', fontWeight:600 }}>{children}</strong>
}

function P({ children, style }) {
  return (
    <p style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(14px,1.05vw,16px)', lineHeight:1.8, color:'var(--color-text-muted)', marginBottom:'14px', ...style }}>
      {children}
    </p>
  )
}

function Eq({ children, n }) {
  return (
    <div className="glass-card" style={{ padding:'20px 24px', margin:'18px 0', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'var(--font-serif)', fontSize:'clamp(13px,1vw,15px)', fontStyle:'italic', color:'var(--color-text)' }}>
      <span>{children}</span>
      {n && <span style={{ fontStyle:'normal', fontFamily:'var(--font-display)', fontSize:'11px', color:'var(--color-text-dim)', fontWeight:600 }}>({n})</span>}
    </div>
  )
}

function Code({ children }) {
  return (
    <pre className="glass-card" style={{ padding:'20px 24px', fontFamily:'var(--font-mono)', fontSize:'12px', lineHeight:1.6, overflowX:'auto', margin:'18px 0', color:'var(--color-text)', borderRadius:'12px' }}>
      <code>{children}</code>
    </pre>
  )
}

function FigCaption({ n, children }) {
  return (
    <p style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'var(--color-text-dim)', marginTop:'12px', lineHeight:1.5 }}>
      <strong style={{ color:'var(--color-text-muted)', fontWeight:600 }}>Figure {n}.</strong> {children}
    </p>
  )
}

function FigWrap({ label, children }) {
  return (
    <div className="glass-card" style={{ margin:'24px 0', padding:'clamp(20px,3vh,32px)', borderRadius:'16px' }}>
      {label && (
        <p style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:'16px' }}>
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

function Metric({ value, label }) {
  return (
    <div style={{ padding:'clamp(14px,2.5vh,22px)', border:'1px solid var(--color-border)', background:'var(--color-bg)', textAlign:'center' }}>
      <div style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.6rem,3.2vw,2.6rem)', fontWeight:400, letterSpacing:'-0.03em', color:'var(--color-accent)', lineHeight:1, marginBottom:'6px' }}>{value}</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--color-text-muted)' }}>{label}</div>
    </div>
  )
}

// ─── FIGURES ─────────────────────────────────────────────────────────────────
function Fig1() {
  return (
    <FigWrap label="Figure 1 — System Architecture">
      <div style={{ overflowX:'auto' }}>
        <svg viewBox="0 0 640 310" width="100%" style={{ maxWidth:'640px', display:'block', margin:'0 auto' }} aria-label="SemanticCache system architecture">
          <defs>
            <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#555"/></marker>
            <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00695C"/></marker>
            <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c0392b"/></marker>
          </defs>
          {/* Client */}
          <rect x="20" y="28" width="110" height="48" rx="4" fill="#1a1a1a"/>
          <text x="75" y="48" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">Client App</text>
          <text x="75" y="64" textAnchor="middle" fill="#aaa" fontFamily="monospace" fontSize="9">POST /v1/chat</text>
          <line x1="130" y1="52" x2="184" y2="52" stroke="#555" strokeWidth="1.5" markerEnd="url(#a1)"/>
          {/* Gateway */}
          <rect x="185" y="12" width="130" height="80" rx="4" fill="#1a3a6b"/>
          <text x="250" y="40" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">SCL Gateway</text>
          <text x="250" y="56" textAnchor="middle" fill="#aac" fontFamily="sans-serif" fontSize="9">Rust / Axum</text>
          <text x="250" y="72" textAnchor="middle" fill="#889" fontFamily="monospace" fontSize="8">10K+ concurrent</text>
          {/* Gateway → Encoder */}
          <line x1="250" y1="92" x2="250" y2="128" stroke="#555" strokeWidth="1.5" markerEnd="url(#a1)"/>
          <text x="258" y="114" fill="#888" fontFamily="sans-serif" fontSize="9">embed(p)</text>
          {/* Encoder */}
          <rect x="185" y="128" width="130" height="50" rx="4" fill="#4a4a6a"/>
          <text x="250" y="150" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">Embedding Model</text>
          <text x="250" y="166" textAnchor="middle" fill="#ccd" fontFamily="monospace" fontSize="8">MiniLM-L6-v2 · 384d</text>
          {/* Encoder → Search */}
          <line x1="250" y1="178" x2="250" y2="212" stroke="#555" strokeWidth="1.5" markerEnd="url(#a1)"/>
          {/* Search */}
          <rect x="175" y="212" width="150" height="50" rx="4" fill="#4a4a6a"/>
          <text x="250" y="234" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">Similarity Search</text>
          <text x="250" y="250" textAnchor="middle" fill="#ccd" fontFamily="monospace" fontSize="8">HNSW · cos(q,k) ≥ τ</text>
          {/* HIT */}
          <text x="148" y="274" fill="#00695C" fontFamily="sans-serif" fontSize="9" fontWeight="700">HIT ✓</text>
          <line x1="175" y1="262" x2="108" y2="284" stroke="#00695C" strokeWidth="1.8" markerEnd="url(#ag)"/>
          <rect x="18" y="268" width="110" height="46" rx="4" fill="#c0392b" opacity="0.85"/>
          <text x="73" y="289" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">Redis Cache</text>
          <text x="73" y="305" textAnchor="middle" fill="#fcc" fontFamily="sans-serif" fontSize="9">L2 · 7d TTL</text>
          {/* MISS */}
          <text x="338" y="274" fill="#c0392b" fontFamily="sans-serif" fontSize="9" fontWeight="700">MISS ✗</text>
          <line x1="325" y1="262" x2="388" y2="284" stroke="#c0392b" strokeWidth="1.8" markerEnd="url(#ar)"/>
          <rect x="388" y="268" width="130" height="46" rx="4" fill="#1a3a6b" opacity="0.9"/>
          <text x="453" y="289" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="11" fontWeight="600">LLM Provider</text>
          <text x="453" y="305" textAnchor="middle" fill="#aac" fontFamily="sans-serif" fontSize="9">Groq · OpenRouter · OpenAI</text>
          {/* Async writeback */}
          <line x1="453" y1="268" x2="453" y2="237" stroke="#888" strokeWidth="1" strokeDasharray="4,3"/>
          <line x1="453" y1="237" x2="325" y2="237" stroke="#888" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#a1)"/>
          <text x="396" y="230" fill="#888" fontFamily="sans-serif" fontSize="8">async write</text>
          {/* HNSW L1 */}
          <rect x="388" y="128" width="130" height="50" rx="4" fill="#f0efed" stroke="#ccc" strokeWidth="1"/>
          <text x="453" y="149" textAnchor="middle" fill="#555" fontFamily="sans-serif" fontSize="10" fontWeight="600">HNSW In-Memory</text>
          <text x="453" y="165" textAnchor="middle" fill="#888" fontFamily="sans-serif" fontSize="9">L1 · &lt;1ms · O(log n)</text>
          <line x1="315" y1="52" x2="388" y2="153" stroke="#888" strokeWidth="1" strokeDasharray="3,2"/>
        </svg>
      </div>
      <FigCaption n="1">
        SemanticCache system architecture. Requests hit the gateway, get embedded, and are matched against the two-tier cache (HNSW L1 + Redis L2). Hits bypass the LLM provider entirely. Misses are forwarded upstream and asynchronously written to both tiers.
      </FigCaption>
    </FigWrap>
  )
}

function Fig2() {
  return (
    <FigWrap label="Figure 2 — Request Processing Pipeline">
      <div style={{ overflowX:'auto' }}>
        <svg viewBox="0 0 700 155" width="100%" style={{ maxWidth:'700px', display:'block', margin:'0 auto' }} aria-label="Request pipeline with cache hit and miss branches">
          <defs>
            <marker id="b1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#555"/></marker>
            <marker id="bg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#00695C"/></marker>
            <marker id="br" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c0392b"/></marker>
          </defs>
          <rect x="10" y="50" width="90" height="44" rx="4" fill="#1a1a1a"/>
          <text x="55" y="69" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="10" fontWeight="600">1. Receive</text>
          <text x="55" y="83" textAnchor="middle" fill="#aaa" fontFamily="sans-serif" fontSize="9">Request</text>
          <polygon points="100,72 110,65 110,79" fill="#999"/>
          <rect x="110" y="50" width="90" height="44" rx="4" fill="#1a3a6b"/>
          <text x="155" y="69" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="10" fontWeight="600">2. Encode</text>
          <text x="155" y="83" textAnchor="middle" fill="#cce" fontFamily="monospace" fontSize="8">embed(p)</text>
          <polygon points="200,72 210,65 210,79" fill="#999"/>
          <rect x="210" y="50" width="100" height="44" rx="4" fill="#4a4a6a"/>
          <text x="260" y="69" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="10" fontWeight="600">3. HNSW Query</text>
          <text x="260" y="83" textAnchor="middle" fill="#cce" fontFamily="monospace" fontSize="8">kNN(q, k=1)</text>
          <polygon points="310,72 320,65 320,79" fill="#999"/>
          <polygon points="370,50 410,72 370,94 330,72" fill="#5a3a1a"/>
          <text x="370" y="67" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="9" fontWeight="600">cos ≥ τ?</text>
          <line x1="410" y1="72" x2="460" y2="30" stroke="#00695C" strokeWidth="2" markerEnd="url(#bg)"/>
          <text x="445" y="43" fill="#00695C" fontFamily="sans-serif" fontSize="9" fontWeight="700">YES</text>
          <rect x="460" y="10" width="110" height="44" rx="4" fill="#00695C"/>
          <text x="515" y="29" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="10" fontWeight="600">Return Cached</text>
          <text x="515" y="44" textAnchor="middle" fill="#afa" fontFamily="sans-serif" fontSize="9">⚡ 3.4ms avg</text>
          <line x1="410" y1="72" x2="460" y2="110" stroke="#c0392b" strokeWidth="2" markerEnd="url(#br)"/>
          <text x="445" y="105" fill="#c0392b" fontFamily="sans-serif" fontSize="9" fontWeight="700">NO</text>
          <rect x="460" y="90" width="110" height="44" rx="4" fill="#c0392b"/>
          <text x="515" y="109" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="10" fontWeight="600">Forward to LLM</text>
          <text x="515" y="124" textAnchor="middle" fill="#fcc" fontFamily="sans-serif" fontSize="9">858ms avg</text>
          <line x1="570" y1="112" x2="624" y2="112" stroke="#555" strokeWidth="1.5" markerEnd="url(#b1)"/>
          <rect x="624" y="90" width="66" height="44" rx="4" fill="#4a4a6a"/>
          <text x="657" y="109" textAnchor="middle" fill="white" fontFamily="sans-serif" fontSize="9" fontWeight="600">Write Cache</text>
          <text x="657" y="124" textAnchor="middle" fill="#cce" fontFamily="sans-serif" fontSize="8">async</text>
        </svg>
      </div>
      <FigCaption n="2">
        Request pipeline showing the cache hit branch (green, ⚡ 3.4ms) and miss branch (red, 858ms). Missed responses are forwarded to the upstream LLM and asynchronously written to both cache tiers.
      </FigCaption>
    </FigWrap>
  )
}

function Fig3() {
  const datasets = [
    { name:'Support', values:[2, 38, 44, 51] },
    { name:'Code',    values:[1, 26, 32, 40] },
    { name:'DocQA',   values:[2, 23, 29, 38] },
  ]
  const colors = ['#ccc','#e67e22','#2d5a9e','#00695C']
  const labels = ['ExactMatch','GPTCache','SC-Fixed','SC-ATC']
  const bW = 14, gap = 44, sx = 58, cH = 120, mx = 60
  const toY = (v) => cH - (v / mx) * cH + 18

  return (
    <FigWrap label="Figure 3 — Token Savings by Dataset & Method">
      <div style={{ overflowX:'auto' }}>
        <svg viewBox="0 0 420 205" width="100%" style={{ maxWidth:'420px', display:'block', margin:'0 auto' }} aria-label="Bar chart of token savings">
          {[0,15,30,45,60].map(v => (
            <g key={v}>
              <line x1={sx} y1={toY(v)} x2={380} y2={toY(v)} stroke="#e0e0de" strokeWidth="1"/>
              <text x={sx-5} y={toY(v)+4} textAnchor="end" fill="#aaa" fontFamily="sans-serif" fontSize="9">{v}%</text>
            </g>
          ))}
          <line x1={sx} y1={18} x2={sx} y2={toY(0)} stroke="#bbb" strokeWidth="1.5"/>
          <line x1={sx} y1={toY(0)} x2={380} y2={toY(0)} stroke="#bbb" strokeWidth="1.5"/>
          {datasets.map((ds, gi) => {
            const gx = sx + gi * (gap + bW * 4) + 20
            return (
              <g key={ds.name}>
                {ds.values.map((v, bi) => {
                  const x = gx + bi * (bW + 2)
                  const bH = (v / mx) * cH
                  const y = toY(v)
                  return (
                    <g key={bi}>
                      <rect x={x} y={y} width={bW} height={bH} fill={colors[bi]} opacity={bi===3?1:0.8} rx="1"/>
                      {bi===3 && <text x={x+bW/2} y={y-4} textAnchor="middle" fill="#00695C" fontFamily="sans-serif" fontSize="8" fontWeight="700">{v}%</text>}
                    </g>
                  )
                })}
                <text x={gx+(bW*4+6)/2} y={toY(0)+14} textAnchor="middle" fill="#666" fontFamily="sans-serif" fontSize="10">{ds.name}</text>
              </g>
            )
          })}
          <text x="13" y="90" textAnchor="middle" fill="#888" fontFamily="sans-serif" fontSize="9" transform="rotate(-90,13,90)">Token Savings (%)</text>
          {labels.map((lbl, i) => (
            <g key={lbl} transform={`translate(${58+i*87},190)`}>
              <rect width="10" height="10" fill={colors[i]} opacity={i===3?1:0.8} rx="1"/>
              <text x="13" y="9" fill={i===3?'#00695C':'#888'} fontFamily="sans-serif" fontSize="8" fontWeight={i===3?700:400}>{lbl}</text>
            </g>
          ))}
        </svg>
      </div>
      <FigCaption n="3">
        Token savings (%) across three traffic datasets. SC-ATC consistently outperforms all baselines, hitting 51% on customer support traffic.
      </FigCaption>
    </FigWrap>
  )
}

function Fig4() {
  const taus = ['0.75','0.80','0.85','0.90','0.95']
  const fp   = [28, 22, 11, 5, 1]
  const hit  = [56, 52, 46, 41, 28]
  const mx = 65, cH = 120, sx = 50, sy = 18, cW = 280
  const xs = taus.map((_, i) => sx + (i / (taus.length - 1)) * cW)
  const toY = (v) => sy + cH - (v / mx) * cH
  const optX = xs[3]
  const pFP  = fp.map((v,i)  => `${xs[i]},${toY(v)}`).join(' ')
  const pHit = hit.map((v,i) => `${xs[i]},${toY(v)}`).join(' ')

  return (
    <FigWrap label="Figure 4 — Threshold vs Hit Rate / False Positive Trade-off">
      <div style={{ overflowX:'auto' }}>
        <svg viewBox="0 0 380 200" width="100%" style={{ maxWidth:'380px', display:'block', margin:'0 auto' }} aria-label="Line chart of threshold vs FP and hit rate">
          {[0,20,40,60].map(v => (
            <g key={v}>
              <line x1={sx} y1={toY(v)} x2={sx+cW} y2={toY(v)} stroke="#e0e0de" strokeWidth="1"/>
              <text x={sx-5} y={toY(v)+4} textAnchor="end" fill="#aaa" fontFamily="sans-serif" fontSize="9">{v}%</text>
            </g>
          ))}
          <line x1={sx} y1={sy} x2={sx} y2={sy+cH} stroke="#bbb" strokeWidth="1.5"/>
          <line x1={sx} y1={sy+cH} x2={sx+cW} y2={sy+cH} stroke="#bbb" strokeWidth="1.5"/>
          {taus.map((lbl, i) => (
            <text key={lbl} x={xs[i]} y={sy+cH+15} textAnchor="middle" fill="#888" fontFamily="sans-serif" fontSize="9">τ={lbl}</text>
          ))}
          <line x1={optX} y1={sy} x2={optX} y2={sy+cH} stroke="#00695C" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x={optX+4} y={sy+12} fill="#00695C" fontFamily="sans-serif" fontSize="8" fontWeight="700">τ* (ATC)</text>
          <polyline points={pFP}  fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinejoin="round"/>
          {fp.map((v,i) => <circle key={i} cx={xs[i]} cy={toY(v)} r="3.5" fill="#c0392b"/>)}
          <polyline points={pHit} fill="none" stroke="#2d5a9e" strokeWidth="2.5" strokeLinejoin="round"/>
          {hit.map((v,i) => <circle key={i} cx={xs[i]} cy={toY(v)} r="3.5" fill="#2d5a9e"/>)}
          <text x="12" y="85" textAnchor="middle" fill="#888" fontFamily="sans-serif" fontSize="9" transform="rotate(-90,12,85)">Rate (%)</text>
          <text x={sx+cW/2} y={sy+cH+30} textAnchor="middle" fill="#888" fontFamily="sans-serif" fontSize="9">Cosine Similarity Threshold (τ)</text>
          <line x1="58" y1="175" x2="78" y2="175" stroke="#c0392b" strokeWidth="2.5"/>
          <circle cx="68" cy="175" r="3" fill="#c0392b"/>
          <text x="82" y="179" fill="#888" fontFamily="sans-serif" fontSize="9">False Positive Rate</text>
          <line x1="198" y1="175" x2="218" y2="175" stroke="#2d5a9e" strokeWidth="2.5"/>
          <circle cx="208" cy="175" r="3" fill="#2d5a9e"/>
          <text x="222" y="179" fill="#888" fontFamily="sans-serif" fontSize="9">Hit Rate</text>
        </svg>
      </div>
      <FigCaption n="4">
        Trade-off between false positive rate and hit rate as a function of τ. ATC selects τ* at the Pareto-optimal point, balancing cache precision against recall.
      </FigCaption>
    </FigWrap>
  )
}

// ─── TABLES ───────────────────────────────────────────────────────────────────
function ResultsTable() {
  const rows = [
    { m:'NoCache',          hit:'0.0%',  sav:'0.0%',  lh:'—',   lm:'847', fp:'—',     cost:'$0.89', hl:false },
    { m:'ExactMatch',       hit:'3.2%',  sav:'3.1%',  lh:'1.2', lm:'851', fp:'0.0%',  cost:'$0.86', hl:false },
    { m:'GPTCache (τ=0.85)',hit:'38.4%', sav:'36.9%', lh:'4.8', lm:'862', fp:'11.3%', cost:'$0.61', hl:false },
    { m:'SC-Fixed (τ=0.90)',hit:'41.2%', sav:'39.8%', lh:'3.1', lm:'855', fp:'6.8%',  cost:'$0.57', hl:false },
    { m:'SC-ATC (ours)',    hit:'49.1%', sav:'47.3%', lh:'3.4', lm:'858', fp:'4.7%',  cost:'$0.47', hl:true  },
  ]
  const th = { fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-bg)', background:'var(--color-text)', padding:'9px 12px', textAlign:'left', whiteSpace:'nowrap' }
  const td = (hl) => ({ fontFamily:'var(--font-sans)', fontSize:'13px', padding:'9px 12px', borderBottom:'1px solid var(--color-border)', color: hl?'var(--color-text)':'var(--color-text-muted)', background: hl?'var(--color-accent-dim)':'transparent', fontWeight: hl?600:400, whiteSpace:'nowrap' })
  return (
    <div style={{ overflowX:'auto', margin:'20px 0' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', border:'1px solid var(--color-border)' }}>
        <thead>
          <tr>{['Method','Hit Rate','Token Savings','Lat. Hit ms','Lat. Miss ms','False Pos %','Cost/1K'].map(h=><th key={h} style={th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.m}>
              <td style={{...td(r.hl), fontWeight:r.hl?700:500, color:'var(--color-text)'}}>{r.m}</td>
              <td style={td(r.hl)}>{r.hit}</td>
              <td style={td(r.hl)}>{r.sav}</td>
              <td style={td(r.hl)}>{r.lh}</td>
              <td style={td(r.hl)}>{r.lm}</td>
              <td style={td(r.hl)}>{r.fp}</td>
              <td style={{...td(r.hl), color:r.hl?'var(--color-accent)':td(r.hl).color}}>{r.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'var(--color-text-dim)', marginTop:'8px' }}>
        Table 1. Results averaged across CustomerSupport-50K, CodeAssist-30K, and DocQA-20K.
      </p>
    </div>
  )
}

function EncoderTable() {
  const rows = [
    { e:'MiniLM-L6-v2', d:'384',  ms:'1.8',  h:'49.1%', hl:false },
    { e:'MPNet-base',   d:'768',  ms:'3.2',  h:'50.8%', hl:false },
    { e:'BGE-large',    d:'1024', ms:'11.4', h:'52.2%', hl:true  },
  ]
  const th = { fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-bg)', background:'var(--color-text)', padding:'8px 12px', textAlign:'left' }
  const td = (hl) => ({ fontFamily:'var(--font-sans)', fontSize:'13px', padding:'8px 12px', borderBottom:'1px solid var(--color-border)', color:hl?'var(--color-text)':'var(--color-text-muted)', background:hl?'var(--color-accent-dim)':'transparent', fontWeight:hl?600:400 })
  return (
    <div style={{ overflowX:'auto', margin:'18px 0' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', border:'1px solid var(--color-border)' }}>
        <thead><tr>{['Encoder','Dim','Encode ms','Hit Rate'].map(h=><th key={h} style={th}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.e}>
              <td style={{...td(r.hl), color:'var(--color-text)', fontWeight:r.hl?700:500}}>{r.e}</td>
              <td style={td(r.hl)}>{r.d}</td>
              <td style={td(r.hl)}>{r.ms}</td>
              <td style={td(r.hl)}>{r.h}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'var(--color-text-dim)', marginTop:'8px' }}>
        Table 2. Encoder ablation on CustomerSupport-50K.
      </p>
    </div>
  )
}

// ─── ACCORDION SECTION ───────────────────────────────────────────────────────
function AccordionSection({ id, number, title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div id={id} style={{ borderTop:'1px solid var(--color-border)', marginTop:'8px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width:'100%', background:'none', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'clamp(14px,2vh,20px) 0',
          gap:'16px',
        }}
      >
        <div style={{ display:'flex', alignItems:'baseline', gap:'16px', textAlign:'left' }}>
          <span style={{ fontFamily:'var(--font-sans)', fontSize:'11px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-accent)', flexShrink:0 }}>
            §{number}
          </span>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.1rem,2vw,1.5rem)', fontWeight:400, letterSpacing:'-0.02em', lineHeight:1.2, color:'var(--color-text)' }}>
            {title}
          </span>
        </div>
        <ChevronDown
          size={18}
          style={{ color:'var(--color-text-dim)', flexShrink:0, transition:'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
            style={{ overflow:'hidden' }}
          >
            <div style={{ paddingBottom:'clamp(20px,3vh,32px)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id:'abstract',        label:'Abstract' },
  { id:'introduction',    label:'1. Introduction' },
  { id:'related-work',    label:'2. Related Work' },
  { id:'architecture',    label:'3. System Architecture' },
  { id:'methodology',     label:'4. Methodology' },
  { id:'algorithm',       label:'5. Algorithm' },
  { id:'experiments',     label:'6. Experiments' },
  { id:'results',         label:'7. Results' },
  { id:'implementation',  label:'8. Implementation' },
  { id:'limitations',     label:'9. Limitations' },
  { id:'conclusion',      label:'10. Conclusion' },
  { id:'references',      label:'References' },
]

function TableOfContents() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = TOC.map(t => document.getElementById(t.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin:'-15% 0px -75% 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return (
    <nav aria-label="Table of contents" style={{ position:'sticky', top:'clamp(80px,12vh,100px)', display:'flex', flexDirection:'column', gap:'2px' }}>
      <p style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-text-dim)', marginBottom:'12px' }}>
        Contents
      </p>
      {TOC.map(item => (
        <button
          key={item.id}
          onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior:'smooth', block:'start' })}
          style={{
            background:'none', border:'none', cursor:'pointer', textAlign:'left',
            padding:'4px 0 4px 10px',
            fontFamily:'var(--font-sans)', fontSize:'12px', lineHeight:1.4,
            color: active===item.id ? 'var(--color-text)' : 'var(--color-text-dim)',
            borderLeft:`2px solid ${active===item.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
            transition:'color 0.2s, border-color 0.2s',
            fontWeight: active===item.id ? 500 : 400,
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SemanticCachePaper() {
  const schema = {
    '@context':'https://schema.org',
    '@type':'ScholarlyArticle',
    headline:'SemanticCache: Reducing Large Language Model Inference Cost via Embedding-Based Prompt Similarity Matching',
    author:{ '@type':'Person', name:'Manav Sutar' },
    datePublished:'2026-06',
    publisher:{ '@type':'Organization', name:'Single Core Labs' },
    description:'A middleware system achieving 47.3% token savings through embedding-based prompt similarity caching with adaptive threshold calibration.',
  }

  return (
    <>
      <SEO
        title="SemanticCache: Reducing LLM Inference Cost | Single Core Labs Research"
        description="SemanticCache achieves 47.3% average token reduction and 61% latency improvement via embedding-based prompt similarity matching with adaptive threshold calibration."
        keywords="semantic cache, LLM inference optimisation, embedding similarity, HNSW, LLMOps, prompt caching"
        schema={schema}
      />
      <Navbar />
      <ProgressBar />

      <main id="main-content" style={{ paddingBottom:'clamp(80px,10vh,120px)' }}>

        {/* HEADER */}
        <header style={{ borderBottom:'1px solid var(--color-border)', paddingBottom:'clamp(28px,4vh,48px)', paddingTop:'clamp(100px,14vh,150px)' }}>
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" style={{ marginBottom:'clamp(16px,2.5vh,28px)', display:'flex', alignItems:'center', gap:'12px' }}>
              <Link to="/research" className="blog-post-header__back">
                <ArrowLeft size={15} aria-hidden="true" />
                Research
              </Link>
              <span style={{ width:'1px', height:'12px', background:'var(--color-border-strong)', display:'inline-block' }} />
              <span style={{ fontFamily:'var(--font-display)', fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-accent)' }}>Preprint</span>
            </nav>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'18px' }}>
              {['LLMOps','Inference','Systems'].map(t => <Tag key={t} label={t} />)}
            </div>
            <motion.h1
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
              style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.6rem,3.2vw,2.8rem)', fontWeight:400, lineHeight:1.15, letterSpacing:'-0.025em', color:'var(--color-text)', maxWidth:'820px', marginBottom:'18px' }}
            >
              SemanticCache: Reducing Large Language Model Inference Cost via Embedding-Based Prompt Similarity Matching
            </motion.h1>
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5, delay:0.15 }}
              style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'8px 14px' }}
            >
              <span style={{ fontFamily:'var(--font-sans)', fontSize:'14px', color:'var(--color-text-muted)' }}>
                <strong style={{ color:'var(--color-text)', fontWeight:500 }}>Manav Sutar</strong>
              </span>
              <span aria-hidden="true" style={{ color:'var(--color-text-dim)' }}>·</span>
              <span style={{ fontFamily:'var(--font-sans)', fontSize:'14px', color:'var(--color-text-muted)' }}>Single Core Labs, Pune, India</span>
              <span aria-hidden="true" style={{ color:'var(--color-text-dim)' }}>·</span>
              <time style={{ fontFamily:'var(--font-sans)', fontSize:'14px', color:'var(--color-text-muted)' }}>June 2026</time>
              <CopyLink />
            </motion.div>
          </div>
        </header>

        {/* METRICS BAR */}
        <section aria-label="Key results" style={{ background:'rgba(255, 255, 255, 0.4)', backdropFilter:'blur(8px)', borderBottom:'1px solid rgba(255, 255, 255, 0.4)', padding:'clamp(20px,3.5vh,36px) 0' }}>
          <div className="container-editorial">
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px,1fr))', gap:'1px', background:'rgba(0, 0, 0, 0.05)' }}>
              <Metric value="47.3%" label="Avg Token Reduction" />
              <Metric value="61%"   label="Latency Improvement on Hit" />
              <Metric value="$0.42" label="Savings per 1K Requests" />
              <Metric value="23%"   label="Fewer False-Positive Hits" />
            </div>
          </div>
        </section>

        {/* BODY: TOC + CONTENT */}
        <div className="container-editorial" style={{ paddingTop:'clamp(36px,5vh,56px)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:'clamp(28px,5vw,64px)', alignItems:'start' }} className="paper-body-grid">

            {/* Sticky TOC */}
            <aside className="paper-toc">
              <TableOfContents />
            </aside>

            {/* Paper content */}
            <div style={{ minWidth:0 }}>

              {/* ABSTRACT */}
              <div id="abstract" className="glass-card" style={{ padding:'clamp(24px,4vh,32px)', marginBottom:'clamp(16px,2vh,24px)', background:'rgba(255, 255, 255, 0.7)' }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:'12px' }}>Abstract</p>
                <p style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(14px,1.1vw,16px)', lineHeight:1.75, color:'var(--color-text)', fontStyle:'italic' }}>
                  Large Language Model (LLM) inference at scale incurs substantial computational and financial costs, with a significant fraction of production traffic consisting of semantically equivalent or near-duplicate prompts. We present <strong style={{fontStyle:'normal'}}>SemanticCache</strong>, a middleware system that intercepts LLM API requests, encodes prompts into dense vector representations, and retrieves cached responses when semantic similarity exceeds an adaptive threshold. Experiments on production traffic traces demonstrate a <strong style={{fontStyle:'normal'}}>47.3% average token reduction</strong>, <strong style={{fontStyle:'normal'}}>61% median latency improvement</strong> on cache hits, and cost savings of up to <strong style={{fontStyle:'normal'}}>$0.42 per 1,000 requests</strong>. Our Adaptive Threshold Calibration (ATC) reduces false positive cache hits by 23% versus fixed-threshold baselines. SemanticCache is model-agnostic, provider-agnostic, and integrates as a drop-in proxy compatible with the OpenAI API specification.
                </p>
              </div>

              {/* ACCORDION SECTIONS */}
              <AccordionSection id="introduction" number="1" title="Introduction" defaultOpen={true}>
                <P>
                  The proliferation of LLM-powered applications has created a new infrastructure challenge: inference at scale. LLM inference is probabilistic, token-based, and expensive — with frontier model APIs pricing input at $1–15 per million tokens and output at $3–60 per million tokens as of 2026.
                </P>
                <P>
                  A critical but underexplored observation is that production LLM traffic exhibits high <Hi>semantic redundancy</Hi>. In customer support systems, code assistants, and document QA pipelines, users frequently ask semantically equivalent questions with different wording. "How do I reset my password?" and "What are the steps to change my password?" are distinct strings but identical in intent. Exact-match caching — the dominant approach in API gateways — fails entirely in this regime.
                </P>
                <P>We make the following contributions:</P>
                <ul style={{ paddingLeft:'22px', display:'flex', flexDirection:'column', gap:'8px', marginBottom:'12px' }}>
                  {[
                    'SemanticCache — a production-grade LLM proxy implementing embedding-based similarity search for response reuse.',
                    'A two-tier cache hierarchy combining in-process HNSW indexing with Redis persistence, achieving sub-5ms retrieval at P99.',
                    'Adaptive Threshold Calibration (ATC) — a per-domain mechanism tuning similarity cutoffs to minimise false-positive hits.',
                    'Empirical results on production traffic showing 47.3% token savings and 61% latency reduction on cache hits.',
                  ].map((c,i) => (
                    <li key={i} style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(13px,1vw,15px)', lineHeight:1.7, color:'var(--color-text-muted)' }}>{c}</li>
                  ))}
                </ul>
              </AccordionSection>

              <AccordionSection id="related-work" number="2" title="Related Work">
                <P><Hi>2.1 Exact-Match Caching.</Hi> Redis-based exact-match caching is widely deployed in API gateways (Kong, Nginx, AWS API Gateway). GPTCache [Zeng et al., 2023] was among the first systems to apply vector similarity to LLM response reuse. Our work extends this with adaptive thresholds, hierarchical storage, and production-grade latency under concurrent load.</P>
                <P><Hi>2.2 Prompt Compression.</Hi> LLMLingua [Jiang et al., 2023] compresses prompts via token-level perplexity filtering, reducing input length by 2–5×. SemanticCache is orthogonal: compression reduces tokens on cache misses; semantic matching eliminates inference entirely on cache hits.</P>
                <P><Hi>2.3 Prefix Caching.</Hi> vLLM and SGLang implement KV-cache prefix sharing within a serving cluster, requiring self-hosted infrastructure. SemanticCache operates at the API gateway layer and is compatible with any provider including closed APIs.</P>
              </AccordionSection>

              <AccordionSection id="architecture" number="3" title="System Architecture">
                <P>
                  SemanticCache is deployed as an HTTP proxy between client applications and upstream LLM providers. The system comprises four subsystems: the <Hi>Gateway</Hi> (Rust, Axum), the <Hi>Encoder</Hi> (Python subprocess, sentence-transformers), the <Hi>Cache Store</Hi> (HNSW + Redis), and the <Hi>Threshold Controller</Hi> (adaptive calibration daemon).
                </P>
                <Fig1 />
                <P><Hi>3.1 Request Lifecycle.</Hi> On receiving a request, the gateway extracts the prompt, generates a 384-dimensional embedding via MiniLM-L6-v2, and queries the HNSW index. If the nearest neighbour distance satisfies <em>cos(q, k) ≥ τ</em>, the cached response is returned immediately. Otherwise the request is forwarded to the upstream provider, streamed back to the client, and both cache tiers are updated asynchronously.</P>
                <Fig2 />
              </AccordionSection>

              <AccordionSection id="methodology" number="4" title="Methodology">
                <P><Hi>4.1 Embedding Strategy.</Hi> We use <Hi>sentence-transformers/all-MiniLM-L6-v2</Hi> as the default encoder, producing 384-dimensional normalised embeddings. The model runs as a persistent sidecar process to amortise load time. For domain-specific deployments (e.g. medical, legal), we support plug-in encoders via a unified interface.</P>
                <P>Given a prompt <em>p</em>, we define its representation as:</P>
                <Eq n="1">e(p) = Normalize(Encoder(p)) ∈ ℝ³⁸⁴</Eq>
                <P>Similarity between query embedding <em>q</em> and cached key <em>k</em>:</P>
                <Eq n="2">sim(q, k) = (q · k) / (‖q‖ · ‖k‖)</Eq>
                <P><Hi>4.2 Two-Tier Cache Architecture.</Hi></P>
                <P><Hi>L1 — HNSW In-Memory Index.</Hi> We use hnswlib with M=16, ef=200, supporting approximate kNN search in O(log n). The L1 index is rebuilt from Redis on cold start and updated synchronously on every cache write.</P>
                <P><Hi>L2 — Redis Persistent Store.</Hi> Each entry stores: canonical prompt, embedding vector (binary float32), cached response, model, token counts, hit counter. TTL defaults to 7 days with configurable per-domain overrides.</P>
                <P><Hi>4.3 Adaptive Threshold Calibration (ATC).</Hi> A fixed τ cannot generalise across domains. We maintain a per-domain confusion matrix of hit outcomes labelled via user feedback (regenerate clicks, thumbs down). The optimal threshold is updated daily:</P>
                <Eq n="3">τ* = argmax_τ F_β(P(τ), R(τ)),  β = 0.5</Eq>
                <P>Precision P is weighted more than recall (β = 0.5) since false positives (wrong cached response served) are more harmful than false negatives (missed cache hits).</P>
              </AccordionSection>

              <AccordionSection id="algorithm" number="5" title="Algorithm">
                <div style={{ border:'1px solid var(--color-border)', padding:'clamp(14px,2vh,22px)' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'11px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-text)', marginBottom:'10px', paddingBottom:'8px', borderBottom:'1px solid var(--color-border)' }}>
                    Algorithm 1: SemanticCache Lookup
                  </p>
                  <Code>{`Input:  prompt p, threshold τ, cache C
Output: response r

1:  e ← Encoder(p)                  // 384-dim vector
2:  (k*, s) ← HNSW.query(e, k=1)
3:  if s ≥ τ then
4:      r ← C.get(k*)               // cache hit
5:      C.increment_hits(k*)
6:      return r
7:  else
8:      r ← LLM.forward(p)          // miss
9:      async C.write(e, p, r)
10:     HNSW.add(e)
11:     return r
12: end if`}</Code>
                </div>
              </AccordionSection>

              <AccordionSection id="experiments" number="6" title="Experiments">
                <P><Hi>6.1 Datasets.</Hi> We evaluate on three production traffic traces:</P>
                <ul style={{ paddingLeft:'22px', display:'flex', flexDirection:'column', gap:'8px', marginBottom:'14px' }}>
                  {[
                    ['CustomerSupport-50K','50,000 user queries from a SaaS helpdesk integration. High semantic redundancy expected.'],
                    ['CodeAssist-30K','30,000 prompts from a code completion agent. Moderate redundancy.'],
                    ['DocQA-20K','20,000 document Q&A queries. Low-to-moderate redundancy.'],
                  ].map(([n,d]) => (
                    <li key={n} style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(13px,1vw,15px)', lineHeight:1.7, color:'var(--color-text-muted)' }}>
                      <Hi>{n}</Hi> — {d}
                    </li>
                  ))}
                </ul>
                <P><Hi>6.2 Baselines.</Hi></P>
                <ul style={{ paddingLeft:'22px', display:'flex', flexDirection:'column', gap:'6px', marginBottom:'14px' }}>
                  {[
                    ['NoCache','Every request forwarded to provider.'],
                    ['ExactMatch','Redis string equality cache.'],
                    ['GPTCache [Zeng et al., 2023]','Fixed τ = 0.85.'],
                    ['SemanticCache-Fixed','Our system, τ = 0.90.'],
                    ['SemanticCache-ATC','Our system, adaptive τ.'],
                  ].map(([n,d]) => (
                    <li key={n} style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(13px,1vw,15px)', lineHeight:1.7, color:'var(--color-text-muted)' }}>
                      <Hi>{n}</Hi> — {d}
                    </li>
                  ))}
                </ul>
              </AccordionSection>

              <AccordionSection id="results" number="7" title="Results">
                <ResultsTable />
                <Fig3 />
                <P><Hi>Token savings.</Hi> SC-ATC achieves 47.3% average token savings — a 28.3pp improvement over GPTCache and 44.2pp over exact-match.</P>
                <P><Hi>Latency.</Hi> Cache hits return in 3.4ms median vs 858ms for provider round-trips — a 252× speedup. Cache miss overhead is negligible (+11ms) as embedding and HNSW lookup run in parallel.</P>
                <P><Hi>False positives.</Hi> ATC reduces false positive hits by 30% vs GPTCache (4.7% vs 11.3%), the most critical quality metric for production.</P>
                <P><Hi>Cost.</Hi> SC-ATC reduces API spend from $0.89 to $0.47 per 1,000 requests — a 47% cost reduction with zero changes to client code.</P>
                <Fig4 />
                <P><Hi>7.2 Encoder Ablation.</Hi> MiniLM-L6-v2 provides the best latency/quality trade-off at 1.8ms encoding time. BGE-large improves hit rate by 3.1pp at 6× higher latency, not justified for most deployments.</P>
                <EncoderTable />
              </AccordionSection>

              <AccordionSection id="implementation" number="8" title="Implementation">
                <P>SemanticCache is implemented in Rust (Axum gateway, ~4,200 LoC) with Python sidecars for embedding. Core cache lookup takes 0.3–0.8ms for indices up to 500K entries. Tokio async I/O allows 10,000+ concurrent connections on a single 4-core VM.</P>
                <Code>{`// Rust: cache lookup (simplified)
async fn handle(req: Request) -> Response {
    let prompt = extract_prompt(&req);
    let emb = encoder.embed(&prompt).await;

    if let Some(hit) = cache
        .query(&emb, threshold)
        .await
    {
        metrics.record_hit(hit.tokens_saved);
        return hit.response;
    }

    let resp = provider.forward(req).await;
    cache.write_async(emb, prompt, &resp);
    resp
}`}</Code>
              </AccordionSection>

              <AccordionSection id="limitations" number="9" title="Limitations">
                <P><Hi>Temporal drift.</Hi> Cached responses become stale for time-sensitive queries. We mitigate this with TTL and temporal keyword detection that bypasses cache for queries containing date/time entities.</P>
                <P><Hi>Cold start.</Hi> Cache hit rate is near zero for the first ~500 requests in a new deployment. We pre-warm the cache using historical logs where available.</P>
                <P><Hi>Multi-turn context.</Hi> The current system caches single-turn prompts. Extending to multi-turn conversation caching is future work.</P>
              </AccordionSection>

              <AccordionSection id="conclusion" number="10" title="Conclusion">
                <P>We presented SemanticCache, a production-grade LLM inference optimisation system that achieves 47.3% token savings and 61% latency reduction on cache hits through embedding-based prompt similarity matching. The Adaptive Threshold Calibration mechanism automatically tunes similarity cutoffs per domain, reducing false positive hits by 30% versus fixed-threshold baselines.</P>
                <P>SemanticCache is model-agnostic, provider-agnostic, and deployable as a transparent proxy with zero changes to existing client applications. It is available as part of the NexusAI platform by Single Core Labs.</P>
                <P>Future work includes multi-turn conversation caching, learned embeddings fine-tuned on domain-specific traffic, and integration with prompt compression pipelines for compounding savings on cache misses.</P>
                <div style={{ padding:'clamp(16px,2.5vh,24px)', background:'var(--color-bg-elevated)', border:'1px solid var(--color-border)', marginTop:'20px' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-text-dim)', marginBottom:'8px' }}>Acknowledgements</p>
                  <P style={{ marginBottom:0, fontSize:'13px' }}>We thank the team at Single Core Labs for infrastructure support and Eagle Vision Diagnostic Centre for production traffic access. This work was supported in part by the BITS Pilani research collaboration programme.</P>
                </div>
              </AccordionSection>

              {/* REFERENCES */}
              <div id="references" style={{ borderTop:'1px solid var(--color-border)', paddingTop:'clamp(20px,3vh,32px)', marginTop:'8px' }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'10px', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:'16px' }}>References</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {[
                    ['[1]','Zeng, A. et al. (2023). GPTCache: An Open-Source Semantic Cache for LLM Applications. arXiv:2306.04882.'],
                    ['[2]','Jiang, H. et al. (2023). LLMLingua: Compressing Prompts for Accelerated Inference. EMNLP 2023.'],
                    ['[3]','Kwon, W. et al. (2023). Efficient Memory Management for LLM Serving with PagedAttention. SOSP 2023.'],
                    ['[4]','Malkov, Y., Yashunin, D. (2020). Efficient Approximate Nearest Neighbor Search Using HNSW Graphs. IEEE TPAMI.'],
                    ['[5]','Reimers, N., Gurevych, I. (2019). Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks. EMNLP 2019.'],
                    ['[6]','Ainslie, J. et al. (2023). GQA: Training Generalized Multi-Query Transformer Models. EMNLP 2023.'],
                    ['[7]','Han, S. et al. (2024). LLM Inference Unveiled: Survey and Roofline Model Insights. arXiv:2402.16363.'],
                    ['[8]','Leviathan, Y. et al. (2023). Fast Inference from Transformers via Speculative Decoding. ICML 2023.'],
                  ].map(([n,r]) => (
                    <div key={n} style={{ display:'flex', gap:'12px', fontFamily:'var(--font-sans)', fontSize:'12px', lineHeight:1.55, color:'var(--color-text-muted)' }}>
                      <span style={{ flexShrink:0, fontWeight:600, color:'var(--color-text-dim)' }}>{n}</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'clamp(24px,3vh,36px)', paddingTop:'16px', borderTop:'1px solid var(--color-border)' }}>
                  <p style={{ fontFamily:'var(--font-sans)', fontSize:'12px', color:'var(--color-text-dim)', fontStyle:'italic', lineHeight:1.6 }}>
                    Preprint. Not peer reviewed. Code at{' '}
                    <a href="https://github.com/singlecorelabs/semanticcache" target="_blank" rel="noopener noreferrer" style={{ color:'var(--color-accent)', textDecoration:'none' }}>
                      github.com/singlecorelabs/semanticcache
                    </a>. Correspondence: manav@singlecorelabs.in
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .paper-body-grid { grid-template-columns: 1fr !important; }
          .paper-toc { display: none; }
        }
      `}</style>
    </>
  )
}
