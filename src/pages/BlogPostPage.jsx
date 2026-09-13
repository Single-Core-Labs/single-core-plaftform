import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'
import { BLOG_POSTS } from '@/lib/blog-content.jsx'
import { GUIDE_CONTENT } from '@/lib/guide-content.jsx'

const containerStyle = {
  maxWidth: '800px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 5vw, 40px)',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

const viewport = { once: true, amount: 0.15, margin: '-40px' }

function KitOpsWorkflowDiagram() {
  return (
    <div style={{ margin: '36px 0' }}>
      <div style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: 'clamp(20px, 3vw, 40px)',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '20px',
        }}>
          KitOps Packaging & Delivery Pipeline
        </div>
        <svg viewBox="0 0 720 280" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient-box" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--color-text) 5%, transparent)" />
              <stop offset="100%" stopColor="color-mix(in srgb, var(--color-text) 1%, transparent)" />
            </linearGradient>
          </defs>

          {/* Left Block: Data Science (Source) */}
          <rect x="10" y="40" width="180" height="200" rx="8" fill="url(#gradient-box)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="100" y="28" fill="var(--color-text-dim)" fontFamily="var(--font-display)" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">1. DEVELOP</text>
          
          <rect x="25" y="60" width="150" height="34" rx="6" fill="color-mix(in srgb, var(--color-accent) 5%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 15%, transparent)" />
          <text x="100" y="81" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle">Model Weights</text>
          
          <rect x="25" y="105" width="150" height="34" rx="6" fill="color-mix(in srgb, var(--color-accent) 5%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 15%, transparent)" />
          <text x="100" y="126" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle">Datasets (LakeFS)</text>
          
          <rect x="25" y="150" width="150" height="34" rx="6" fill="color-mix(in srgb, var(--color-accent) 5%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 15%, transparent)" />
          <text x="100" y="171" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle">Code & Config</text>

          <rect x="25" y="195" width="150" height="34" rx="6" fill="color-mix(in srgb, var(--color-accent) 5%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 15%, transparent)" />
          <text x="100" y="216" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle">Agent Skills</text>

          {/* Arrow 1 */}
          <path d="M 190 140 L 255 140" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="255,136 263,140 255,144" fill="var(--color-accent)" />
          <text x="222" y="130" fill="var(--color-accent)" fontFamily="var(--font-display)" fontSize="9" textAnchor="middle" fontWeight="600">kit pack</text>

          {/* Middle Block: ModelKit OCI Artifact */}
          <rect x="270" y="60" width="180" height="160" rx="10" fill="color-mix(in srgb, var(--color-accent) 6%, transparent)" stroke="var(--color-accent)" strokeWidth="1.5" />
          <text x="360" y="28" fill="var(--color-accent)" fontFamily="var(--font-display)" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">2. OCI MODELKIT</text>
          
          <rect x="285" y="80" width="150" height="30" rx="4" fill="color-mix(in srgb, var(--color-bg) 60%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 30%, transparent)" />
          <text x="360" y="99" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle" fontWeight="500">Unified Artifact</text>

          <rect x="285" y="120" width="150" height="30" rx="4" fill="color-mix(in srgb, var(--color-bg) 60%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 30%, transparent)" />
          <text x="360" y="139" fill="var(--color-accent)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle" fontWeight="600">SHA-256 Hash</text>

          <rect x="285" y="160" width="150" height="30" rx="4" fill="color-mix(in srgb, var(--color-bg) 60%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 30%, transparent)" />
          <text x="360" y="179" fill="var(--color-text-dim)" fontFamily="var(--font-sans)" fontSize="10" textAnchor="middle">SBOM & Compliance</text>

          {/* Arrow 2 */}
          <path d="M 450 140 L 515 140" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="515,136 523,140 515,144" fill="var(--color-accent)" />
          <text x="482" y="130" fill="var(--color-accent)" fontFamily="var(--font-display)" fontSize="9" textAnchor="middle" fontWeight="600">kit pull</text>
          <text x="482" y="157" fill="var(--color-text-dim)" fontFamily="var(--font-sans)" fontSize="8" textAnchor="middle">selective</text>

          {/* Right Block: Deployment (Target) */}
          <rect x="530" y="40" width="180" height="200" rx="8" fill="url(#gradient-box)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="620" y="28" fill="var(--color-text-dim)" fontFamily="var(--font-display)" fontSize="11" fontWeight="600" textAnchor="middle" letterSpacing="0.05em">3. DEPLOY (vLLM)</text>

          <rect x="545" y="70" width="150" height="36" rx="6" fill="color-mix(in srgb, var(--color-text) 4%, transparent)" stroke="var(--color-border)" />
          <text x="620" y="92" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle" fontWeight="500">Inference Engines</text>

          <rect x="545" y="125" width="150" height="36" rx="6" fill="color-mix(in srgb, var(--color-text) 4%, transparent)" stroke="var(--color-border)" />
          <text x="620" y="147" fill="var(--color-text)" fontFamily="var(--font-sans)" fontSize="10" textAnchor="middle">Validated Weights Only</text>

          <rect x="545" y="180" width="150" height="36" rx="6" fill="color-mix(in srgb, var(--color-text) 4%, transparent)" stroke="var(--color-border)" />
          <text x="620" y="202" fill="var(--color-text-dim)" fontFamily="var(--font-sans)" fontSize="10" textAnchor="middle">Dev / Staging / Prod</text>
        </svg>
      </div>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        color: 'var(--color-text-dim)',
        marginTop: '10px',
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        Figure 1: KitOps lifecycle — from development checkpoints to ModelKits in registries to selective deployment.
      </p>
    </div>
  )
}

export default function BlogPostPage() {
  const { postSlug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === postSlug)

  if (!post) {
    return (
      <div className="page-dark">
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
          <h1 className="text-display">Post not found</h1>
          <Link to="/blog" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Browse all posts</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Single Core Labs' },
    datePublished: post.date,
    articleSection: post.category,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://singlecorelabs.in/blog/${post.slug}` },
  }

  const relatedGuides = (post.relatedGuides || []).map(slug => GUIDE_CONTENT[slug]).filter(Boolean)
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== post.slug)

  return (
    <div className="page-dark">
      <SEO title={`${post.title} | Single Core Labs Blog`} description={post.excerpt} schema={schema} />
      <Navbar />

      <main style={{ minHeight: '100vh' }}>
        <div style={containerStyle}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <Link to="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'var(--color-text-dim)', textDecoration: 'none',
              fontFamily: 'var(--font-sans)', fontSize: '13px',
              paddingTop: 'clamp(100px, 14vh, 140px)', marginBottom: '32px',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-dim)'}
            >
              <ArrowLeft size={14} />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}>{post.category}</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>{post.readTime}</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>·</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>{post.date}</span>
            </div>
            <h1 className="text-display" style={{ marginBottom: '36px' }}>{post.title}</h1>
          </motion.div>
        </div>

        <div style={{ ...containerStyle, paddingBottom: 'clamp(80px, 10vh, 120px)' }}>
          {post.content.map((block, i) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.1vw, 17px)',
                      lineHeight: 1.8, letterSpacing: '-0.01em',
                      color: 'color-mix(in srgb, var(--color-text) 75%, transparent)', marginBottom: '20px',
                    }}>{block.text}</p>
                  </motion.div>
                )

              case 'callout':
                return (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                    <div style={{
                      background: 'color-mix(in srgb, var(--color-accent) 6%, transparent)', border: '1px solid color-mix(in srgb, var(--color-accent) 15%, transparent)',
                      borderRadius: '10px', padding: '20px 24px', marginBottom: '24px',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600,
                        color: 'var(--color-accent)', marginBottom: '6px',
                      }}>{block.title}</p>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '14px',
                        lineHeight: 1.6, color: 'color-mix(in srgb, var(--color-text) 70%, transparent)',
                      }}>{block.text}</p>
                    </div>
                  </motion.div>
                )

              case 'guide-link': {
                const guide = GUIDE_CONTENT[block.slug]
                if (!guide) return null
                return (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                    <Link to={`/guides/${block.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{
                        background: 'color-mix(in srgb, var(--color-accent) 4%, transparent)', border: '1px solid var(--color-border)',
                        borderRadius: '10px', padding: '16px 20px', marginBottom: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        transition: 'border-color 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 30%, transparent)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                      >
                        <div>
                          <p style={{
                            fontFamily: 'var(--font-display)', fontSize: '10px', fontWeight: 600,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: 'var(--color-accent)', marginBottom: '4px',
                          }}>Related Guide</p>
                          <p style={{
                            fontFamily: 'var(--font-sans)', fontSize: '13px',
                            color: 'var(--color-text)', fontWeight: 500,
                          }}>{block.text}</p>
                        </div>
                        <ArrowRight size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                      </div>
                    </Link>
                  </motion.div>
                )
              }

              case 'diagram':
                if (block.slug === 'kitops-workflow') {
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                      <KitOpsWorkflowDiagram />
                    </motion.div>
                  )
                }
                return null

              default:
                return null
            }
          })}

          {(relatedGuides.length > 0 || otherPosts.length > 0) && (
            <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
              {relatedGuides.length > 0 && (
                <>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--color-accent)', marginBottom: '16px',
                  }}>Related guides</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '32px' }}>
                    {relatedGuides.map((g) => (
                      <Link key={g.meta.title} to={`/guides/${g.meta.slug || ''}`} style={{
                        textDecoration: 'none', color: 'inherit', display: 'block',
                        padding: '16px 0', borderBottom: '1px solid var(--color-border)',
                        transition: 'opacity 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-text)', marginBottom: '4px' }}>{g.meta.title}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-dim)' }}>{g.meta.category} · {g.meta.readTime}</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {otherPosts.length > 0 && (
                <>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--color-accent)', marginBottom: '16px',
                  }}>More articles</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {otherPosts.slice(0, 3).map((p) => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} style={{
                        textDecoration: 'none', color: 'inherit', display: 'block',
                        padding: '16px 0', borderBottom: '1px solid var(--color-border)',
                        transition: 'opacity 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-text)', marginBottom: '4px' }}>{p.title}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-dim)' }}>{p.category} · {p.readTime}</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
