import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, Sliders, Zap, Server, Cloud, Shield, ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants'

const CREAM = '#FAFAFA'

const FEATURES = [
  {
    icon: Lock,
    title: 'Completely private',
    description: 'All interactions occur within your secure infrastructure. Your sensitive company data never leaves your dedicated systems.',
  },
  {
    icon: Sliders,
    title: 'Fully customizable',
    description: 'Scale and customize the model to your organization\'s exact needs — without the restrictions of third-party cloud services.',
  },
  {
    icon: Zap,
    title: 'Seamless setup',
    description: 'Once the agreement is signed, we provide everything needed for self-deployment. Setup typically takes less than a day.',
  },
]

const DEPLOYMENT_OPTIONS = [
  {
    icon: Cloud,
    title: 'Private Cloud (VPC)',
    description: 'Deploy within your existing private cloud environment and maintain full control over networking, security, and operations.',
  },
  {
    icon: Server,
    title: 'On-Premises',
    description: 'Ensure complete data sovereignty with an air-gapped deployment securely housed behind your firewall.',
  },
  {
    icon: Shield,
    title: 'Hybrid',
    description: 'Combine cloud and on-premises deployment for flexible workloads — sensitive data stays local while less critical tasks run in the cloud.',
  },
]

function AnimatedCard({ icon: Icon, title, description, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
        borderRadius: '16px',
        padding: 'clamp(28px, 3vw, 36px)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-text) 20%, transparent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-text) 6%, transparent)'}
    >
      <Icon size={24} strokeWidth={1.5} style={{ color: 'var(--color-text)', marginBottom: '16px' }} />
      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(16px, 1.2vw, 18px)',
        fontWeight: 600,
        color: 'var(--color-text)',
        marginBottom: '10px',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(13px, 0.9vw, 14px)',
        color: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </motion.div>
  )
}

const VIDEO_SRC = '/deployment-hero.webm'

function VideoHero() {
  const ref = useRef(null)
  const wrapRef = useRef(null)
  useEffect(() => {
    const v = ref.current
    const wrap = wrapRef.current
    if (!v || !wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      return
    }
    v.muted = true
    v.playsInline = true
    let visible = false
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.15, rootMargin: '100px' })
    io.observe(wrap)
    const onVis = () => { if (!document.hidden && visible) v.play().catch(() => {}) }
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return (
    <div ref={wrapRef} style={{ flex: '1 1 400px', minHeight: '340px', borderRadius: '20px', overflow: 'hidden', contain: 'paint', background: '#0A0A0A' }}>
      <video
        ref={ref}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '340px',
          borderRadius: '20px',
          objectFit: 'cover',
          display: 'block',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  )
}

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

export default function DeploymentPage() {
  return (
    <div className="page-dark">
      <SEO
        title="Private Deployments | Single Core Labs"
        description="Deploy our AI models privately within your infrastructure for maximum security, data sovereignty, and compliance."
        keywords="private AI deployment, on-premises AI, VPC deployment, air-gapped AI, sovereign AI"
      />
      <Navbar category="solutions" />

      <main style={{ minHeight: '100vh' }}>
        <section style={{
          position: 'relative',
          paddingTop: 'clamp(140px, 20vh, 220px)',
          paddingBottom: 'clamp(80px, 10vh, 120px)',
          paddingInline: 'clamp(20px, 4vw, 48px)',
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-text) 6%, transparent), transparent 70%), var(--color-bg)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(40px, 6vw, 80px)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 480px' }}>
              <RevealSection>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(10px, 0.9vw, 12px)',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--color-text) 45%, transparent)',
                  marginBottom: '20px',
                }}>
                  Private Deployments
                </p>
              </RevealSection>
              <RevealSection delay={0.15}>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  marginBottom: '24px',
                }}>
                  Private AI
                  <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', display: 'block' }}>
                    for sovereign enterprises.
                  </span>
                </h1>
              </RevealSection>
              <RevealSection delay={0.3}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(16px, 1.2vw, 19px)',
                  fontWeight: 400,
                  color: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
                  lineHeight: 1.6,
                  marginBottom: '36px',
                  maxWidth: '540px',
                }}>
                  Deploy our AI models and solutions privately within your infrastructure for ultimate security, data sovereignty, and regulatory compliance.
                </p>
              </RevealSection>
              <RevealSection delay={0.45}>
                <a href="#contact" style={{
                  background: 'var(--color-text)',
                  color: 'var(--color-bg)',
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
                  Talk to Sales
                  <ArrowRight size={16} />
                </a>
              </RevealSection>
            </div>
            <VideoHero />
          </div>
        </section>

        <section style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)',
          background: '#000',
          borderTop: '1px solid color-mix(in srgb, var(--color-text) 4%, transparent)',
          borderBottom: '1px solid color-mix(in srgb, var(--color-text) 4%, transparent)',
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <RevealSection>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(10px, 0.8vw, 12px)',
                fontWeight: 500,
                color: 'color-mix(in srgb, var(--color-text) 25%, transparent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: 'clamp(32px, 4vw, 52px)',
              }}>
                Deploy across any cloud
              </p>
            </RevealSection>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(32px, 5vw, 72px)',
              flexWrap: 'nowrap',
            }}>
              {[
                { src: '/aws-logo.svg', alt: 'AWS' },
                { src: '/azure-logo.svg', alt: 'Azure' },
                { src: '/gcp-logo.svg', alt: 'Google Cloud' },
                { alt: 'Oracle', text: true },
              ].map((logo, i) => (
                <RevealSection key={logo.alt} delay={i * 0.1}>
                  {logo.text ? (
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(17px, 1.8vw, 24px)',
                      fontWeight: 500,
                      color: 'color-mix(in srgb, var(--color-text) 40%, transparent)',
                      letterSpacing: '0.04em',
                    }}>
                      {logo.alt}
                    </span>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{ height: 'clamp(28px, 2.8vw, 40px)', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.4 }}
                    />
                  )}
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-text) 4%, transparent), transparent 70%), #000',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <RevealSection>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3vw, 42px)',
                fontWeight: 500,
                color: CREAM,
                lineHeight: 1.15,
                textAlign: 'center',
                marginBottom: '16px',
              }}>
                Enterprise AI.
                <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}> Zero data exposure.</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(15px, 1.1vw, 18px)',
                color: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
                lineHeight: 1.6,
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto clamp(48px, 5vw, 64px)',
              }}>
                Keep all your data within your own private environment for maximum security and compliance.
              </p>
            </RevealSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 2vw, 24px)',
            }}>
              {FEATURES.map((feat, i) => (
                <AnimatedCard key={feat.title} {...feat} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        <section style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: '#000',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <RevealSection>
              <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 64px)' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
                  fontWeight: 500,
                  color: CREAM,
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}>
                  Your model. Your data. Your infrastructure.
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  color: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}>
                  Our private deployment options ensure that prompts, outputs, and fine-tuned models stay entirely within your environment — we have zero access to the data you process.
                </p>
              </div>
            </RevealSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(16px, 2vw, 24px)',
            }}>
              {DEPLOYMENT_OPTIONS.map((opt, i) => (
                <AnimatedCard key={opt.title} {...opt} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)',
          background: 'radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-text) 4%, transparent), transparent 70%), #000',
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: '1 1 340px', paddingTop: 'clamp(8px, 1vw, 16px)' }}>
              <RevealSection>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 2.5vw, 34px)',
                  fontWeight: 500,
                  color: CREAM,
                  lineHeight: 1.15,
                  marginBottom: '16px',
                }}>
                  Take full control of your AI deployment.
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1vw, 16px)',
                  color: 'color-mix(in srgb, var(--color-text) 55%, transparent)',
                  lineHeight: 1.7,
                  maxWidth: '400px',
                }}>
                  As a private deployment customer, you'll receive comprehensive technical support at every stage of the rollout.
                </p>
              </RevealSection>
            </div>

            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              <RevealSection delay={0.15}>
                <div style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
                  borderRadius: '20px',
                  padding: 'clamp(48px, 6vw, 72px)',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    fontWeight: 500,
                    color: CREAM,
                    marginBottom: '12px',
                  }}>
                    Get in touch directly
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'color-mix(in srgb, var(--color-text) 50%, transparent)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}>
                    Send us an email and we'll get back to you within one business day to discuss your private deployment.
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '14px',
                      background: CREAM,
                      color: '#050505',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: 'none',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    Email {CONTACT_EMAIL}
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      marginTop: '16px',
                      padding: '14px',
                      background: 'transparent',
                      color: CREAM,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: '1px solid color-mix(in srgb, var(--color-text) 20%, transparent)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    Connect on LinkedIn
                    <ArrowRight size={15} />
                  </a>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
