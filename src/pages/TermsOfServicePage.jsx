import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import LegalBackground from '@/components/LegalBackground'
import { SOCIAL_LINKS } from '@/lib/constants'

const SECTIONS = [
  {
    heading: '1. Acceptance of terms',
    body: [
      'By accessing singlecorelabs.in (the "Site"), you agree to these Terms of Service ("Terms") and to our Privacy Policy. If you do not agree, please do not use the Site.',
      'Single Core Labs ("we", "us") may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.',
    ],
  },
  {
    heading: '2. About the site',
    body: [
      'The Site is an informational website describing Single Core Labs, our research, infrastructure work, and ways to contact us. It does not currently offer accounts, paid products, or self-serve services.',
      'Content on the Site is provided for general information only and does not constitute professional, legal, or investment advice.',
    ],
  },
  {
    heading: '3. Intellectual property',
    body: [
      'Unless otherwise stated, all content on the Site — including text, graphics, logos, and the "Single Core Labs" wordmark — is owned by Single Core Labs or its licensors and is protected by applicable intellectual property laws.',
      'You may view and link to the Site for personal, non-commercial purposes. You may not copy, reproduce, modify, distribute, or create derivative works from our content without prior written permission, except as permitted by applicable law (such as fair use).',
    ],
  },
  {
    heading: '4. Acceptable use',
    body: [
      'You agree not to misuse the Site. Prohibited conduct includes attempting to gain unauthorised access to our systems, probing or scanning for vulnerabilities, disrupting availability (including denial-of-service attacks), sending spam, or using the Site for any unlawful purpose.',
      'You agree not to misrepresent your identity when contacting us or to submit false, misleading, or infringing material.',
    ],
  },
  {
    heading: '5. Third-party links and content',
    body: [
      'The Site links to third-party platforms such as LinkedIn and X, and may embed media served via content delivery networks. We do not control third-party sites or services, and we are not responsible for their content, policies, or practices.',
      'Your use of third-party services is governed by their own terms and privacy policies.',
    ],
  },
  {
    heading: '6. No warranties',
    body: [
      'The Site is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components, or that information on the Site is complete, accurate, or current.',
    ],
  },
  {
    heading: '7. Limitation of liability',
    body: [
      'To the maximum extent permitted by applicable law, Single Core Labs will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of (or inability to use) the Site.',
      'Our total liability for any claim arising out of or relating to the Site will not exceed INR 1,000 or the amount you paid us to use the Site (if any), whichever is greater.',
    ],
  },
  {
    heading: '8. Indemnity',
    body: [
      'You agree to indemnify and hold harmless Single Core Labs and its founders, contributors, and partners from claims, damages, and expenses (including reasonable legal fees) arising from your misuse of the Site or violation of these Terms.',
    ],
  },
  {
    heading: '9. Termination',
    body: [
      'We may restrict or terminate access to the Site at any time if we reasonably believe you have violated these Terms or to protect the security of our systems.',
    ],
  },
  {
    heading: '10. Governing law',
    body: [
      'These Terms are governed by the laws of India. Courts located in Pune, Maharashtra will have exclusive jurisdiction over disputes arising out of or relating to the Site or these Terms, subject to applicable law.',
    ],
  },
  {
    heading: '11. Changes to these terms',
    body: [
      'We may revise these Terms to reflect changes in the Site or legal requirements. The current version will always be posted here with an updated effective date. Material changes will be reflected in the "Last updated" date below.',
    ],
  },
  {
    heading: '12. Contact',
    body: [
      'Single Core Labs, Pune, India. For questions about these Terms, contact us via LinkedIn or X linked in the footer, or email the address published on our official company profiles.',
    ],
  },
]

export default function TermsOfServicePage() {
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
        title="Terms of Service"
        description="Terms of Service for Single Core Labs — rules for using singlecorelabs.in, intellectual property, disclaimers, and governing law."
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
          Terms of Service
        </h1>
        <p style={{ margin: '0 0 32px', color: 'rgba(250,250,250,0.6)', fontSize: '14px' }}>
          Effective date: September 17, 2026 · Last updated: September 17, 2026
        </p>

        <p style={{ color: 'rgba(250,250,250,0.82)', lineHeight: 1.7, fontSize: '15.5px', margin: '0 0 32px' }}>
          These terms govern your use of singlecorelabs.in. Please read them carefully.
          Our <Link to="/privacy" style={{ color: '#FF5A00', textDecoration: 'none' }}>Privacy Policy</Link> explains
          how we handle information.
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
