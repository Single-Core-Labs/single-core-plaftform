import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useParams, Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import { ArrowRight } from 'lucide-react'

export default function ComingSoonPage() {
  const { slug } = useParams()


  const title = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Coming Soon'

  return (
    <div className="page-consulting">
      <SEO title={`${title} | Single Core Labs`} description="This page is currently under construction. Check back soon." />
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
        <div className="consulting-block" style={{ width: '100%', maxWidth: '600px', margin: '40px auto' }}>
        <p className="text-eyebrow" style={{ marginBottom: '32px' }}>
          Coming Soon
        </p>
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
          {title}
        </h1>
        <p className="text-body" style={{ maxWidth: '400px', marginBottom: '48px' }}>
          This page is currently under construction. Check back soon.
        </p>
        <Link
          to="/"
          className="link-underline"
          style={{ fontSize: '14px', fontWeight: 500 }}
        >
          Back to home
          <ArrowRight size={14} />
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  )
}
