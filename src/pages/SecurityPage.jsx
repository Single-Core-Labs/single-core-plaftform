import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Shield, Lock, Server, Key, Bug, Eye, Database, Mail, ArrowRight, FileCheck } from 'lucide-react'
import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const CREAM = '#E1E0CC'

const PILLARS = [
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'TLS 1.3 in transit, AES-256 at rest. All customer data encrypted by default with managed key rotation.',
  },
  {
    icon: Server,
    title: 'Infrastructure Security',
    description: 'Hardened cloud infrastructure with strict network ACLs, intrusion detection, and 24/7 monitoring.',
  },
  {
    icon: Shield,
    title: 'Model Security',
    description: 'Adversarial testing, red-teaming, and training data lineage validation to prevent data poisoning and prompt injection.',
  },
  {
    icon: FileCheck,
    title: 'Compliance',
    description: 'Architected for DPDP Act compliance (India). SOC 2 and ISO 27001 alignment in progress.',
  },
  {
    icon: Key,
    title: 'Access Control',
    description: 'Role-based access control (RBAC) with SSO/MFA support. Granular permissions per model, dataset, and deployment.',
  },
  {
    icon: Bug,
    title: 'Vulnerability Management',
    description: 'Quarterly penetration tests, continuous dependency scanning, and a responsible disclosure program for researchers.',
  },
]

function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function TreeWithSpine({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 40%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(225,224,204,0.15) 10%, rgba(225,224,204,0.15) 90%, transparent)',
          transform: 'translateX(-50%)',
          scaleY,
          originY: 0,
        }}
      />
      {children}
    </div>
  )
}

function TreeNode({ pillar, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0
  const Icon = pillar.icon

  return (
    <div ref={ref} style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      marginBottom: index < total - 1 ? 'clamp(16px, 2vw, 28px)' : 0,
      flexDirection: isLeft ? 'row' : 'row-reverse',
    }}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 'calc(50% - clamp(24px, 3vw, 40px))',
          background: '#111',
          border: '1px solid rgba(225,224,204,0.06)',
          borderRadius: '14px',
          padding: 'clamp(18px, 1.8vw, 26px) clamp(20px, 2vw, 28px)',
          transition: 'border-color 0.3s, box-shadow 0.4s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(225,224,204,0.2)'
          e.currentTarget.style.boxShadow = '0 0 0 1px rgba(225,224,204,0.08), 0 0 30px rgba(225,224,204,0.03)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(225,224,204,0.06)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <Icon size={20} strokeWidth={1.5} style={{ color: CREAM, flexShrink: 0 }} />
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1vw, 16px)',
            fontWeight: 600,
            color: CREAM,
            lineHeight: 1.3,
          }}>
            {pillar.title}
          </h3>
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(12px, 0.85vw, 14px)',
          fontWeight: 400,
          color: 'rgba(225,224,204,0.55)',
          lineHeight: 1.6,
        }}>
          {pillar.description}
        </p>
      </motion.div>

      <div style={{
        width: 'clamp(48px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        position: 'relative',
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}
          style={{
            width: 'clamp(8px, 0.8vw, 12px)',
            height: 'clamp(8px, 0.8vw, 12px)',
            borderRadius: '50%',
            background: CREAM,
            zIndex: 2,
            position: 'relative',
            boxShadow: inView ? '0 0 12px rgba(225,224,204,0.2)' : 'none',
          }}
        />
      </div>

      <div style={{ width: 'calc(50% - clamp(24px, 3vw, 40px))' }} />
    </div>
  )
}

export default function SecurityPage() {
  return (
    <div className="page-dark">
      <SEO
        title="Security | Single Core Labs"
        description="Enterprise-grade security for every model, product, and customer. Data encryption, access controls, model security, and compliance at Single Core Labs."
        keywords="AI security, enterprise AI security, data encryption, model security, DPDP Act compliance, responsible AI"
      />
      <Navbar category="security" />

      <main style={{ minHeight: '100vh' }}>
        <section style={{
          position: 'relative',
          paddingTop: 'clamp(140px, 20vh, 220px)',
          paddingBottom: 'clamp(80px, 12vh, 120px)',
          paddingInline: 'clamp(20px, 4vw, 48px)',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(225,224,204,0.06), transparent 70%), var(--color-bg)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <RevealSection>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(10px, 0.9vw, 12px)',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(225,224,204,0.45)',
                marginBottom: '24px',
              }}>
                Trust & Security
              </p>
            </RevealSection>

            <RevealSection delay={0.15}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
              }}>
                Security at <br />
                <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Single Core Labs</span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.3}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 1.3vw, 20px)',
                fontWeight: 400,
                color: 'rgba(225,224,204,0.6)',
                lineHeight: 1.6,
                maxWidth: '640px',
                margin: '0 auto 40px',
              }}>
                Enterprise-grade protection for every model, product, and customer we work with.
              </p>
            </RevealSection>

            <RevealSection delay={0.45}>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn-primary" style={{
                  background: CREAM,
                  color: '#0B0B0B',
                  padding: '14px 32px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Contact Security Team
                  <ArrowRight size={16} />
                </a>
              </div>
            </RevealSection>
          </div>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: '#000',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <RevealSection>
              <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
                <Shield size={28} strokeWidth={1.5} style={{ color: CREAM, marginBottom: '16px' }} />
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
                  fontWeight: 500,
                  color: CREAM,
                  lineHeight: 1.2,
                  marginBottom: '12px',
                }}>
                  Defense in depth
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  color: 'rgba(225,224,204,0.5)',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}>
                  Every layer of our infrastructure is designed with security as a foundation, not an afterthought.
                </p>
              </div>
            </RevealSection>

            <TreeWithSpine>
              {PILLARS.map((pillar, i) => (
                <TreeNode key={pillar.title} pillar={pillar} index={i} total={PILLARS.length} />
              ))}
            </TreeWithSpine>
          </div>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(225,224,204,0.04), transparent 70%), #000',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <RevealSection>
              <Database size={32} strokeWidth={1.5} style={{ color: CREAM, marginBottom: '24px' }} />
            </RevealSection>
            <RevealSection delay={0.1}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 42px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.15,
                marginBottom: '24px',
              }}>
                Your data stays yours.
              </h2>
            </RevealSection>
            <RevealSection delay={0.2}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.1vw, 18px)',
                color: 'rgba(225,224,204,0.55)',
                lineHeight: 1.7,
                maxWidth: '640px',
                margin: '0 auto clamp(40px, 5vw, 64px)',
              }}>
                We never train on customer data. Every deployment is isolated — your data, models, and
                inferences stay within your dedicated environment. Opt out by default, with full data
                deletion on request.
              </p>
            </RevealSection>

            <div className="data-flow-tree" style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: 0,
              flexWrap: 'nowrap',
            }}>
              {[
                { title: 'No data reuse', desc: 'Your data never trains or improves models for other customers.' },
                { title: 'Full ownership', desc: 'You retain complete ownership and control of all your data.' },
                { title: 'Deployment choice', desc: 'Cloud, VPC, or on-premises — deploy where you need it.' },
                { title: 'Immediate deletion', desc: 'Delete your data and models from our systems on request.' },
              ].map((item, i) => (
                <div key={item.title} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                  flex: '1 1 0',
                  minWidth: 0,
                }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: '#111',
                      border: '1px solid rgba(225,224,204,0.06)',
                      borderRadius: '12px',
                      padding: 'clamp(16px, 1.5vw, 24px)',
                      flex: 1,
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(225,224,204,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(225,224,204,0.06)'}
                  >
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(12px, 0.85vw, 14px)',
                      fontWeight: 600,
                      color: CREAM,
                      marginBottom: '6px',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(11px, 0.75vw, 13px)',
                      color: 'rgba(225,224,204,0.5)',
                      lineHeight: 1.5,
                    }}>
                      {item.desc}
                    </p>
                  </motion.div>

                  {i < 3 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        flexShrink: 0,
                        width: 'clamp(24px, 3vw, 44px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(225,224,204,0.2)',
                      }}
                    >
                      <svg width="100%" height="20" viewBox="0 0 40 20" fill="none" style={{ display: 'block' }}>
                        <line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="1" />
                        <path d="M26 6l6 4-6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <style>{`
@media (max-width: 768px) {
  .data-flow-tree {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  .data-flow-tree > div {
    flex-direction: column !important;
  }
  .data-flow-tree svg {
    transform: rotate(90deg);
    width: 20px !important;
    height: 24px !important;
    margin: 4px auto;
  }
}
          `}</style>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: '#000',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <RevealSection>
              <Eye size={28} strokeWidth={1.5} style={{ color: CREAM, marginBottom: '20px' }} />
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Responsible AI & Model Evaluation
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(14px, 1vw, 16px)',
                color: 'rgba(225,224,204,0.5)',
                lineHeight: 1.7,
                maxWidth: '700px',
                marginBottom: '40px',
              }}>
                Every model we ship undergoes rigorous safety evaluation. We combine internal red-teaming
                with external benchmarking to measure bias, toxicity, hallucination rates, and task-specific
                robustness before any production deployment.
              </p>
            </RevealSection>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {[
                { title: 'Safety Evaluations', desc: 'Pre-release testing for bias, harmful outputs, and adversarial inputs.' },
                { title: 'Red-Teaming', desc: 'Dedicated internal and third-party red teams probe model vulnerabilities.' },
                { title: 'Defense in Depth', desc: 'Security layered across the ML lifecycle — from data collection to deployment.' },
                { title: 'Benchmarking', desc: 'Continuous evaluation against industry-standard and domain-specific benchmarks.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#111',
                    border: '1px solid rgba(225,224,204,0.06)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: CREAM,
                    marginBottom: '6px',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: 'rgba(225,224,204,0.5)',
                    lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: '#000',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <RevealSection>
              <Mail size={28} strokeWidth={1.5} style={{ color: CREAM, marginBottom: '20px' }} />
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Responsible Disclosure
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(14px, 1vw, 16px)',
                color: 'rgba(225,224,204,0.5)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}>
                We welcome security researchers to report potential vulnerabilities. We commit to
                acknowledging receipt within 48 hours and working toward a resolution.
              </p>
              <a
                href="mailto:security@singlecorelabs.com"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: CREAM,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(225,224,204,0.2)',
                  paddingBottom: '4px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = CREAM}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(225,224,204,0.2)'}
              >
                security@singlecorelabs.com
              </a>
            </RevealSection>
          </div>
        </section>

        <section style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)',
          textAlign: 'center',
        }}>
          <RevealSection>
            <div style={{
              background: '#111',
              border: '1px solid rgba(225,224,204,0.06)',
              borderRadius: '20px',
              padding: 'clamp(40px, 5vw, 64px) clamp(28px, 4vw, 48px)',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2vw, 28px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Have questions about our security practices?
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                color: 'rgba(225,224,204,0.5)',
                marginBottom: '28px',
              }}>
                We're happy to share our security documentation and answer any questions.
              </p>
              <a href="/contact" className="btn-primary" style={{
                background: CREAM,
                color: '#0B0B0B',
                padding: '12px 28px',
                fontSize: '14px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Contact Us
                <ArrowRight size={16} />
              </a>
            </div>
          </RevealSection>
        </section>
      </main>
      <Footer />
    </div>
  )
}
