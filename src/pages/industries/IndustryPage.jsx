import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'
import { getIndustry, ENGAGEMENT_STEPS } from './industryContent'

const CREAM = '#FFFFFF'
const FONT = "'Almarai', -apple-system, BlinkMacSystemFont, sans-serif"
const BODY = 'rgba(255,255,255,0.75)'
const MUTED = 'rgba(255,255,255,0.5)'
const BORDER = 'rgba(255,255,255,0.08)'
const CARD_BORDER = 'rgba(255,255,255,0.12)'

function Eyebrow({ children }) {
  return (
    <p style={{ color: MUTED, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400, marginBottom: '20px' }}>
      {children}
    </p>
  )
}

function SectionHeading({ children }) {
  return (
    <h2 style={{ color: CREAM, fontSize: 'clamp(28px, 3.6vw, 44px)', lineHeight: 1.12, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 16px', textWrap: 'balance', maxWidth: '720px' }}>
      {children}
    </h2>
  )
}

function Lede({ children }) {
  return (
    <p style={{ color: BODY, fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.65, maxWidth: '680px', margin: '0 0 16px' }}>
      {children}
    </p>
  )
}

function PillCta({ to, children }) {
  return (
    <Link
      to={to}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: CREAM, borderRadius: '9999px', padding: '8px 8px 8px 22px', textDecoration: 'none' }}
    >
      <span style={{ color: '#000', fontWeight: 500, fontSize: '15px', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <span style={{ background: '#000', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

function Card({ title, text }) {
  return (
    <article style={{ border: `1px solid ${CARD_BORDER}`, borderRadius: '16px', padding: '28px', background: 'rgba(255,255,255,0.02)' }}>
      <h3 style={{ color: CREAM, fontSize: 'clamp(18px, 1.6vw, 21px)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '10px' }}>
        {title}
      </h3>
      <p style={{ color: BODY, fontSize: '15px', lineHeight: 1.65, margin: 0 }}>{text}</p>
    </article>
  )
}

function Shell({ children }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)' }}>
      {children}
    </div>
  )
}

export function IndustryPageBody({ industry }) {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* A. Hero */}
      <section style={{ background: '#000', padding: 'clamp(120px, 14vh, 168px) 0 clamp(48px, 6vw, 88px)' }}>
        <Shell>
          <div style={{ maxWidth: '800px' }}>
            <RevealText>
              <Eyebrow>{industry.eyebrow}</Eyebrow>
            </RevealText>
            <RevealText delay={1}>
              <h1 style={{ color: CREAM, fontSize: 'clamp(36px, 5.4vw, 64px)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 20px', textWrap: 'balance' }}>
                {industry.headline}
              </h1>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: BODY, fontSize: 'clamp(15px, 1.5vw, 19px)', lineHeight: 1.6, maxWidth: '640px', margin: '0 0 32px' }}>
                {industry.lede}
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <PillCta to="/contact">{industry.primaryCta}</PillCta>
                {industry.secondaryCta && (
                  <TextLink to={industry.secondaryCta.href}>{industry.secondaryCta.label}</TextLink>
                )}
              </div>
            </RevealText>
          </div>
        </Shell>
      </section>

      {/* B. Industry challenge */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>Industry challenge</Eyebrow>
          </RevealText>
          <RevealText delay={1}>
            <SectionHeading>{industry.challenge.heading}</SectionHeading>
          </RevealText>
          <RevealText delay={2}>
            <Lede>{industry.challenge.intro}</Lede>
          </RevealText>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${BORDER}`, marginTop: '28px' }}>
            {industry.challenge.points.map((point, i) => (
              <div key={point} style={{ display: 'flex', gap: '16px', padding: '15px 0', borderBottom: `1px solid ${BORDER}`, alignItems: 'baseline' }}>
                <span style={{ fontSize: '12px', color: MUTED, minWidth: '24px', fontWeight: 600 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ color: CREAM, fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{point}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* C. SCL approach */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>SCL approach</Eyebrow>
          </RevealText>
          <RevealText delay={1}>
            <SectionHeading>{industry.approach.heading}</SectionHeading>
          </RevealText>
          <RevealText delay={2}>
            <Lede>{industry.approach.intro}</Lede>
          </RevealText>
        </Shell>
      </section>

      {/* D. Core capabilities */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>Core capabilities</Eyebrow>
          </RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '28px' }}>
            {industry.capabilities.map((c) => (
              <Card key={c.title} title={c.title} text={c.text} />
            ))}
          </div>
        </Shell>
      </section>

      {/* E. Industry-specific applications */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>In practice</Eyebrow>
          </RevealText>
          <RevealText delay={1}>
            <SectionHeading>{industry.applications.heading}</SectionHeading>
          </RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '28px' }}>
            {industry.applications.items.map((a) => (
              <Card key={a.title} title={a.title} text={a.text} />
            ))}
          </div>
          <p style={{ color: MUTED, fontSize: '13.5px', lineHeight: 1.6, maxWidth: '680px', marginTop: '20px' }}>
            {industry.applications.note}
          </p>
        </Shell>
      </section>

      {/* F. Deployment and governance */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>Deployment &amp; governance</Eyebrow>
          </RevealText>
          <RevealText delay={1}>
            <SectionHeading>{industry.governance.heading}</SectionHeading>
          </RevealText>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${BORDER}`, marginTop: '28px' }}>
            {industry.governance.points.map((point, i) => (
              <div key={point} style={{ display: 'flex', gap: '16px', padding: '15px 0', borderBottom: `1px solid ${BORDER}`, alignItems: 'baseline' }}>
                <span style={{ fontSize: '12px', color: MUTED, minWidth: '24px', fontWeight: 600 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ color: CREAM, fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{point}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* G. Engagement process */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 72px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <RevealText>
            <Eyebrow>Engagement process</Eyebrow>
          </RevealText>
          <RevealText delay={1}>
            <SectionHeading>A proposed path from assessment to operation.</SectionHeading>
          </RevealText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '28px' }}>
            {ENGAGEMENT_STEPS.map((s, i) => (
              <div key={s.name} style={{ border: `1px solid ${CARD_BORDER}`, borderRadius: '16px', padding: '24px', background: 'rgba(255,255,255,0.02)' }}>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 600, margin: '0 0 8px' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{ color: CREAM, fontSize: '17px', fontWeight: 600, margin: '0 0 8px' }}>{s.name}</h3>
                <p style={{ color: BODY, fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* H. Closing CTA */}
      <section style={{ background: '#000', padding: 'clamp(56px, 7vw, 104px) 0', borderTop: `1px solid ${BORDER}` }}>
        <Shell>
          <div style={{ maxWidth: '760px' }}>
            <RevealText>
              <SectionHeading>{industry.closing.heading}</SectionHeading>
            </RevealText>
            <RevealText delay={1}>
              <Lede>{industry.closing.text}</Lede>
            </RevealText>
            <RevealText delay={2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginTop: '28px' }}>
                <PillCta to="/contact">{industry.closing.primaryCta}</PillCta>
                {industry.slug === 'technology' ? (
                  <TextLink to="/enterprise">Explore enterprise controls</TextLink>
                ) : (
                  <TextLink to="/industries/technology">See how technology teams start</TextLink>
                )}
              </div>
            </RevealText>
          </div>
        </Shell>
      </section>
    </main>
  )
}

export default function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustry(slug)
  if (!industry) return <Navigate to="/industries/defense" replace />
  return (
    <div style={{ background: '#000', minHeight: '100vh', fontFamily: FONT }}>
      <SEO
        title={industry.seoTitle}
        description={industry.seoDescription}
        keywords={industry.seoKeywords}
      />
      <IndustryPageBody industry={industry} />
      <Footer />
    </div>
  )
}
