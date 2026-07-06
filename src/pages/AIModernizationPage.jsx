import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

export default function AIModernizationPage() {
  return (
    <div className="page-blank">
      <SEO title="AI Modernization | Single Core Labs" />
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>Blank Canvas - AIModernizationPage</h1>
      </main>
      <Footer />
    </div>
  )
}
