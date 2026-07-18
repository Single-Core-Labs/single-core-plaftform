import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

import HomePage from './pages/HomePage'
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AIModernizationPage = lazy(() => import('./pages/AIModernizationPage'))
const HealthcareIntelligencePage = lazy(() => import('./pages/HealthcareIntelligencePage'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const DeploymentPage = lazy(() => import('./pages/DeploymentPage'))
const SecurityPage = lazy(() => import('./pages/SecurityPage'))
const TechPage = lazy(() => import('./pages/TechPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const ResearchCollectivePage = lazy(() => import('./pages/ResearchCollectivePage'))
const SemanticCachePaper = lazy(() => import('./pages/SemanticCachePaper'))

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
          <Route path="/solutions/ai-modernization" element={<AIModernizationPage />} />
          <Route path="/solutions/tech" element={<TechPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/semantic-cache" element={<SemanticCachePaper />} />
          <Route path="/research-collective" element={<ResearchCollectivePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/deployment" element={<DeploymentPage />} />
          <Route path="/:slug" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App