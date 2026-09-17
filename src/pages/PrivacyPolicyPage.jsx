import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import LegalBackground from '@/components/LegalBackground'
import { SOCIAL_LINKS } from '@/lib/constants'

const SECTIONS = [
  {
    heading: '1. Information we collect',
    body: [
      'Contact information you share with us directly (such as your name, email address, or company) when you reach out via email, forms, or social channels.',
      'Technical information collected automatically when you visit the site, such as pages viewed, browser type, device information, and approximate location derived from IP address.',
      'We do not intentionally collect sensitive personal data through this website.',
    ],
  },
  {
    heading: '2. How we use information',
    body: [
      'To operate and improve the website, understand usage patterns, and fix issues.',
      'To respond to enquiries, partnership requests, and hiring interest.',
      'To protect the security and integrity of our systems.',
      'We do not sell your personal information.',
    ],
  },
  {
    heading: '3. Cookies and analytics',
    body: [
      'We use only minimal, privacy-respecting measurement. The site does not use advertising trackers or cross-site profiling cookies.',
      'Where analytics or embedded media (for example, video delivery via CDN) is used, the provider may process technical data such as IP address under their own policies.',
      'You can block cookies in your browser settings; the site will continue to work.',
    ],
  },
  {
    heading: '4. Sharing',
    body: [
      'We share personal information only when necessary: with service providers who host and operate the site (under confidentiality obligations), to comply with applicable law, or to protect our rights and users.',
    ],
  },
  {
    heading: '5. Data retention',
    body: [
      'We keep contact correspondence only as long as needed for the purpose it was collected, then delete or anonymise it. Server and access logs are retained for a limited period for security and debugging.',
    ],
  },
  {
    heading: '6. Security',
    body: [
      'We apply reasonable technical and organisational measures (HTTPS, access controls, least-privilege infrastructure) to protect information. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '7. Your rights',
    body: [
      'Depending on where you live (including under India\u2019s DPDP Act and, where applicable, the GDPR), you may have the right to access, correct, delete, or restrict processing of your personal data, and to withdraw consent.',
      'To exercise these rights, email us at the address below. We will respond within a reasonable timeframe.',
    ],
  },
  {
    heading: '8. Third-party links',
    body: [
      'This site links to third-party platforms such as LinkedIn and X. Their privacy practices are governed by their own policies, and we encourage you to review them.',
    ],
  },
  {
    heading: '9. Children',
    body: [
      'This website is not directed at children under 16, and we do not knowingly collect their personal information.',
    ],
  },
  {
    heading: '10. Changes to this policy',
    body: [
      'We may update this policy to reflect changes in our practices or for legal reasons. The current version will always be posted here with an updated effective date.',
    ],
  },
  {
    heading: '11. Contact',
    body: [
      'Single Core Labs, Pune, India. For privacy questions or requests, contact us via LinkedIn or X linked in the footer, or email the address published on our official company profiles.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: '#060606',
        color: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
      }}
    >
      <LegalBackground />
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Single Core Labs — what we collect, how we use it, and your rights."
      />

      <header
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px clamp(20px, 4vw, 48px)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#FAFAFA',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          <img src="/logo-mark-white.png" alt="Single Core Labs" style={{ height: '28px', width: 'auto', display: 'block' }} />
          <span>Single Core Labs</span>
        </Link>
        <Link to="/" style={{ color: 'rgba(250,250,250,0.65)', textDecoration: 'none', fontSize: '13.5px' }}>
          ← Back to home
        </Link>
      </header>

      <main
        id="main-content"
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto',
          padding: '24px clamp(20px, 4vw, 32px) 64px',
        }}
      >
        <p style={{ margin: '24px 0 8px', fontSize: '12.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF5A00', fontWeight: 700 }}>
          Legal
        </p>
        <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ margin: '0 0 32px', color: 'rgba(250,250,250,0.6)', fontSize: '14px' }}>
          Effective date: September 17, 2026 · Last updated: September 17, 2026
        </p>

        <p style={{ color: 'rgba(250,250,250,0.82)', lineHeight: 1.7, fontSize: '15.5px', margin: '0 0 32px' }}>
          Single Core Labs (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
          information we collect through singlecorelabs.in, how we use it, and the choices you have.
        </p>

        {SECTIONS.map((s) => (
          <section key={s.heading} style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '18px', letterSpacing: '-0.01em', margin: '0 0 10px' }}>{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} style={{ margin: '0 0 10px', color: 'rgba(250,250,250,0.75)', lineHeight: 1.7, fontSize: '15px' }}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </main>

      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 24px',
          padding: '20px clamp(20px, 4vw, 48px)',
          fontSize: '12.5px',
          letterSpacing: '0.01em',
          color: 'rgba(250,250,250,0.55)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(6,6,6,0.55)',
        }}
      >
        <span>© 2026 Single Core Labs</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/terms" style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none' }}>
            Terms of Service
          </Link>
          <Link to="/privacy" style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
            </svg>
          </a>
          <a
            href="https://x.com/Singlecorelabs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            style={{ color: 'rgba(250,250,250,0.75)', textDecoration: 'none', display: 'inline-flex' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            </svg>
          </a>
        </span>
      </footer>
    </div>
  )
}
