import SEO from '@/components/SEO'
import { Footer } from '@/components/Footer'
import { RevealText } from '@/components/RevealText'

const LEGAL_DOCS = {
  terms: {
    title: 'Terms of Service',
    description: 'The terms governing use of Single Core Labs websites, products, and services.',
    intro:
      'These Terms of Service govern your access to and use of Single Core Labs websites, products, and services. By using them, you agree to these terms.',
    sections: [
      {
        h: 'Services',
        body: [
          'Single Core Labs builds, deploys, and operates custom AI systems, including Marshal, our software engineering agent, alongside consulting and deployment services.',
          'Enterprise deployments are additionally governed by a written agreement or order. Where a signed agreement conflicts with these terms, the signed agreement controls.',
        ],
      },
      {
        h: 'Acceptable use',
        body: [
          'You agree not to misuse our services: no unlawful activity, no attempts to breach security controls, and no use of our systems to harm third parties.',
          'For agent products, you are responsible for reviewing autonomous changes before they reach production, unless your agreement states otherwise.',
        ],
      },
      {
        h: 'Intellectual property',
        body: [
          'Our websites, documentation, and product software remain our property except where a license or agreement grants you rights.',
          'Work produced under an enterprise engagement is owned as stated in the applicable agreement.',
        ],
      },
      {
        h: 'Warranties and liability',
        body: [
          'Services are provided as described in the applicable agreement. To the extent permitted by law, we exclude implied warranties and limit liability as stated in that agreement.',
          'Nothing here limits liability that cannot be limited by law.',
        ],
      },
      {
        h: 'Changes and contact',
        body: [
          'We may update these terms as our offerings evolve. Material changes will be reflected on this page with an updated date.',
          'Questions about these terms can be raised through our contact page.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Single Core Labs collects, uses, and protects personal information.',
    intro:
      'This policy describes what personal information we collect, why we collect it, and the choices you have. It covers our websites and business communications.',
    sections: [
      {
        h: 'Information we collect',
        body: [
          'Contact details you share when reaching out, such as your name, work email, company, and message contents.',
          'Basic technical information collected automatically when you visit our site, such as pages viewed, device type, and approximate location derived from IP address.',
        ],
      },
      {
        h: 'How we use it',
        body: [
          'To respond to inquiries, prepare proposals, and operate customer relationships.',
          'To operate and improve our website, measure interest in our offerings, and protect against misuse.',
          'We do not sell personal information.',
        ],
      },
      {
        h: 'Sharing',
        body: [
          'We share information with service providers that help us operate (for example hosting and analytics), bound by contractual obligations.',
          'We disclose information when required by law or to protect our rights, users, and systems.',
        ],
      },
      {
        h: 'Retention and security',
        body: [
          'We keep personal information only as long as needed for the purposes above, then delete or anonymize it.',
          'We apply reasonable administrative and technical safeguards appropriate to the data involved.',
        ],
      },
      {
        h: 'Your rights',
        body: [
          'Depending on where you live, you may have rights to access, correct, delete, or restrict processing of your personal information, and to object or withdraw consent.',
          'To exercise these rights, reach us through our contact page and we will respond within applicable timelines.',
        ],
      },
    ],
  },
  'privacy-choices': {
    title: 'Your Privacy Choices',
    description: 'Control how Single Core Labs uses your information, including cookies and communications.',
    intro:
      'You have choices about cookies, marketing communications, and your personal information. This page explains how to exercise them.',
    sections: [
      {
        h: 'Cookies',
        body: [
          'Our site uses a minimal set of cookies and similar storage. Strictly necessary storage keeps the site working; anything beyond that is optional.',
          'You can block cookies in your browser settings. Blocking strictly necessary storage may affect site functionality.',
        ],
      },
      {
        h: 'Marketing communications',
        body: [
          'If you receive updates from us, every message includes a way to unsubscribe. Unsubscribing stops marketing messages but not transactional replies to your inquiries.',
        ],
      },
      {
        h: 'Access, correction, deletion',
        body: [
          'You can request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it.',
          'Send requests through our contact page. We may need to verify your identity before acting.',
        ],
      },
      {
        h: 'Do not sell or share',
        body: [
          'We do not sell personal information. If our practices change, this page will describe how to opt out of any sale or sharing.',
        ],
      },
    ],
  },
  dpa: {
    title: 'Data Processing Agreement',
    description: 'How Single Core Labs processes customer data on behalf of enterprise customers.',
    intro:
      'This page summarizes how Single Core Labs handles customer data when providing services. Enterprise customers receive a signed data processing agreement tailored to their deployment.',
    sections: [
      {
        h: 'Roles',
        body: [
          'For enterprise deployments, the customer generally acts as the controller of its data and Single Core Labs acts as the processor, processing data only on documented customer instructions.',
        ],
      },
      {
        h: 'Scope of processing',
        body: [
          'Processing is limited to what is needed to deliver, support, and secure the agreed services — for example running agents inside the customer environment and providing support.',
          'Data handling specifics, including residency and retention, are defined per deployment in the customer agreement.',
        ],
      },
      {
        h: 'Security measures',
        body: [
          'We apply measures appropriate to the engagement, which may include access controls, sandboxing, egress controls, encryption in transit and at rest, and audit logging.',
          'Exact controls depend on the deployment model and are documented in the customer agreement.',
        ],
      },
      {
        h: 'Sub-processors and assistance',
        body: [
          'Where sub-processors are involved, they are disclosed in the customer agreement and bound by data protection obligations.',
          'We assist customers with data subject requests and, where applicable, impact assessments related to our processing.',
        ],
      },
      {
        h: 'Request a DPA',
        body: [
          'To put a data processing agreement in place for your organization, start with an enterprise pilot conversation through our contact page.',
        ],
      },
    ],
  },
  'trust-center': {
    title: 'Trust Center',
    description: 'Security, privacy, and compliance resources for Single Core Labs.',
    intro:
      'Security and trust are part of how we build. This page collects our posture, practices, and how to engage with us on security matters.',
    sections: [
      {
        h: 'Our approach',
        body: [
          'Private-by-default deployments, sandboxed agent execution, granular permissions, egress controls, and audit trails are core to how our products are designed.',
          'Controls are scoped per deployment and documented in the customer agreement — ask us how any control works in your environment and we will answer precisely.',
        ],
      },
      {
        h: 'Privacy and data',
        body: [
          'Our privacy policy, privacy choices, and data processing information describe how personal and customer data is handled.',
          'We avoid absolute claims: where a control depends on deployment, we say so.',
        ],
      },
      {
        h: 'Compliance',
        body: [
          'Our products provide controls that can support your organization’s compliance requirements. Bring your auditors and we will walk through the evidence together.',
          'We do not claim certifications we have not earned. If that status changes, it will be stated here exactly.',
        ],
      },
      {
        h: 'Report a vulnerability',
        body: [
          'If you believe you have found a security issue in our systems, contact us through our contact page with details and a way to reach you.',
          'Please avoid accessing other users’ data or disrupting services while investigating. We will acknowledge reports and keep you updated on remediation.',
        ],
      },
    ],
  },
  legal: {
    title: 'Legal Notice',
    description: 'Company information and legal notices for Single Core Labs.',
    intro: 'Official company information and notices for Single Core Labs.',
    sections: [
      {
        h: 'Company',
        body: [
          'Single Core Labs is based in Pune, Maharashtra, India.',
          'For official correspondence, reach us through our contact page.',
        ],
      },
      {
        h: 'Website content',
        body: [
          'Content on this site is provided for general information. Product capabilities, roadmaps, and availability can change; agreements in writing govern our commitments.',
          'Third-party names and marks referenced on this site belong to their respective owners.',
        ],
      },
      {
        h: 'Forward-looking statements',
        body: [
          'Any statements about future products, features, or timelines are plans, not promises, and are subject to change without notice.',
        ],
      },
    ],
  },
}

export default function LegalPage({ doc = 'terms' }) {
  const page = LEGAL_DOCS[doc] || LEGAL_DOCS.terms
  return (
    <div className="page-dark">
      <SEO
        title={`${page.title} | Single Core Labs`}
        description={page.description}
        keywords={`${page.title}, single core labs legal`}
      />
      <main style={{ minHeight: '100vh' }}>
        <section
          className="container-editorial"
          style={{ maxWidth: '760px', paddingTop: 'clamp(120px, 14vh, 160px)', paddingBottom: 'var(--spacing-section-lg)' }}
        >
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>Legal</p>
          </RevealText>
          <RevealText delay={1}>
            <h1 className="text-display" style={{ marginBottom: '16px' }}>{page.title}</h1>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
              {page.intro}
            </p>
          </RevealText>
          {page.sections.map((s, i) => (
            <RevealText key={s.h}>
              <div style={{ padding: '24px 0', borderTop: i === 0 ? '1px solid var(--color-border)' : 'none', borderBottom: '1px solid var(--color-border)' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 400, marginBottom: '12px', color: 'var(--color-text)' }}>
                  {s.h}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="text-body" style={{ fontSize: '15px', lineHeight: 1.7, maxWidth: '680px', marginBottom: j === s.body.length - 1 ? 0 : '12px' }}>
                    {p}
                  </p>
                ))}
              </div>
            </RevealText>
          ))}
          <p className="text-body" style={{ fontSize: '14px', marginTop: '28px' }}>
            Questions? Reach us through the <a href="/contact" style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>contact page</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
