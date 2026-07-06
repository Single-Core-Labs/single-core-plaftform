import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

export default function AiVsCloudPage() {
  return (
    <div className="page-blank">
      <SEO title="AI Vs Cloud | Single Core Labs" />
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>Blank Canvas - AiVsCloudPage</h1>
      </main>
      <Footer />
    </div>
  )
}
