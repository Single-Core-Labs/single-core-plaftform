import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

export default function SolutionsPage() {
  return (
    <div className="page-blank">
      <SEO title="Solutions | Single Core Labs" />
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>Blank Canvas - SolutionsPage</h1>
      </main>
      <Footer />
    </div>
  )
}
