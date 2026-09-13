import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="page-dark">
      <SEO
        title="Page Not Found | Single Core Labs"
        description="The page you are looking for does not exist or has moved."
        noindex
      />
      <Navbar />
      <main
        id="main-content"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p className="text-eyebrow" style={{ marginBottom: '24px' }}>404</p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Page not found
        </h1>
        <p className="text-body" style={{ maxWidth: '400px', marginBottom: '48px' }}>
          The page you are looking for doesn't exist or has moved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link
            to="/"
            className="link-underline"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Back to home
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="link-underline"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Contact us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}