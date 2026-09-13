import SEO from '@/components/SEO'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function SolutionsPage() {

  return (
    <div className="page-dark">
      <SEO
        title="AI Solutions by Industry | Single Core Labs"
        description="Single Core Labs delivers embodied AI across Logistics, Manufacturing, Healthcare, Energy, and Defense — from perception to action in the physical world."
        keywords="embodied AI, logistics AI, manufacturing AI, healthcare AI, energy AI, defense AI, sovereign AI"
      />
      <Navbar />

      <main style={{ minHeight: '60vh' }}>

        {/* Overview removed — blank as requested */}
        <section style={{ padding: 'clamp(120px, 18vh, 200px) 20px clamp(80px, 12vh, 140px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-dim)' }}>
            Solutions
          </p>
        </section>

        <style>{`
          @media (max-width: 860px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
            .tree-branch {
              display: none !important;
            }
            .industry-card {
              width: calc(100% - 24px) !important;
              margin: 0 auto !important;
              padding: 24px !important;
            }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>

      </main>
      <Footer />
    </div>
  )
}
