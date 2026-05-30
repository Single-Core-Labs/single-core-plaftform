import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const HomePage = lazy(() => import('./pages/HomePage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const EnterprisePage = lazy(() => import('./pages/EnterprisePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const HealthcareIntelligencePage = lazy(() => import('./pages/HealthcareIntelligencePage'))

function ScrollToHashAndTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      try {
        const element = document.querySelector(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
          }, 120)
        }
      } catch {
        console.warn('Invalid hash selector:', hash)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function App() {
  // Initialize Lenis for butter-smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <BrowserRouter>
      <ScrollToHashAndTop />
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/healthcare-intelligence" element={<HealthcareIntelligencePage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:slug" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
