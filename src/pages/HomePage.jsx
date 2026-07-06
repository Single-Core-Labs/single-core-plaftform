import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Single Core Labs",
        "url": "https://singlecorelabs.com",
        "logo": "https://singlecorelabs.com/og-image.jpg",
        "description": "Single Core Labs is an elite applied AI research lab and systems engineering firm providing custom AI infrastructure and agentic architectures.",
        "knowsAbout": ["AI Systems Engineering", "Agentic Architectures", "Sovereign AI Infrastructure", "Air-Gapped AI Deployments", "Applied AI Research"],
        "founder": [
          {
            "@type": "Person",
            "name": "Manav Sutar"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@singlecorelabs.com",
          "availableLanguage": ["English"]
        }
      }
    ]
  };

  return (
    <div className="page-consulting">
      <SEO
        title="Single Core Labs"
        description="Single Core Labs provides custom AI systems engineering and sovereign AI infrastructure. We build, deploy, and operate bespoke agentic architectures for enterprises."
        keywords="AI systems engineering, sovereign AI infrastructure, custom agentic architectures, applied AI research, enterprise AI solutions"
        schema={schema}
      />
      <Navbar />
      <main id="main-content" className="home-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Ready for the new redesign */}
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>Blank Canvas</h1>
      </main>
      <Footer />
    </div>
  )
}
