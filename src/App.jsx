import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import HomePage from './pages/HomePage'
const RLEnvironmentsPage = lazy(() => import('./pages/RLEnvironmentsPage'))
const DataFoundryPage = lazy(() => import('./pages/DataFoundryPage'))
const TrainingPage = lazy(() => import('./pages/TrainingPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AIModernizationPage = lazy(() => import('./pages/AIModernizationPage'))
const HealthcareIntelligencePage = lazy(() => import('./pages/HealthcareIntelligencePage'))
const EnterprisePage = lazy(() => import('./pages/EnterprisePage'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const GuideDetailPage = lazy(() => import('./pages/GuideDetailPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const DeploymentPage = lazy(() => import('./pages/DeploymentPage'))
const SecurityPage = lazy(() => import('./pages/SecurityPage'))
const TechPage = lazy(() => import('./pages/TechPage'))
const IndustryPage = lazy(() => import('./pages/IndustryPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const ResearchCollectivePage = lazy(() => import('./pages/ResearchCollectivePage'))
const OpenPage = lazy(() => import('./pages/OpenPage'))
const MarshalDashboardPage = lazy(() => import('./pages/MarshalDashboardPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    // Promote to compositor layer once
    bar.style.willChange = 'transform'
    bar.style.transform = 'scaleX(0) translateZ(0)'
    let raf = 0
    let latest = 0
    const flush = () => {
      raf = 0
      bar.style.transform = `scaleX(${latest}) translateZ(0)`
    }
    const lenis = window.lenis
    if (lenis) {
      const onScroll = ({ progress }) => {
        latest = progress
        if (!raf) raf = requestAnimationFrame(flush)
      }
      lenis.on('scroll', onScroll)
      return () => { lenis.off('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
    }
    const onWinScroll = () => {
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      latest = Math.max(0, Math.min(1, p))
      if (!raf) raf = requestAnimationFrame(flush)
    }
    window.addEventListener('scroll', onWinScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onWinScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-text)',
        transformOrigin: 'left',
        transform: 'scaleX(0) translateZ(0)',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.9,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    />
  )
}

function ScrollToHashAndTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = window.lenis
    if (hash) {
      try {
        const element = document.querySelector(hash)
        if (element) {
          setTimeout(() => {
            if (lenis) lenis.scrollTo(element, { offset: -20 })
            else element.scrollIntoView({ behavior: 'smooth' })
          }, 120)
        }
      } catch {
        console.warn('Invalid hash selector:', hash)
      }
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: false })
      else window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function App() {
  // Smooth but efficient — lerp OR duration (not both). We use duration + easing.
  // Reduced-motion disables smoothing entirely to save main-thread work.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReducedMotion = mq.matches
    if (prefersReducedMotion) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return
    }

    const lenis = new Lenis({
      autoRaf: true,
      // Use duration-based easing rather than lerp — avoids double interpolation / extra frames
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.0,
      syncTouch: false,
      anchors: true,
      autoToggle: true,
      allowNestedScroll: true,
      gestureOrientation: 'vertical',
    })

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    window.lenis = lenis
    const onReduce = (e) => {
      if (e.matches) {
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
        window.lenis = undefined
        lenis.destroy()
      }
    }
    mq.addEventListener?.('change', onReduce)
    return () => {
      mq.removeEventListener?.('change', onReduce)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      window.lenis = undefined
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollProgress />
      <ScrollToHashAndTop />
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/model-lab" element={<TrainingPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/data-foundry" element={<DataFoundryPage />} />
          <Route path="/solutions/rl-environments" element={<RLEnvironmentsPage />} />
          <Route path="/solutions/rl-lab" element={<RLEnvironmentsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions/healthcare-intelligence" element={<HealthcareIntelligencePage />} />
          <Route path="/solutions/ai-modernization" element={<AIModernizationPage />} />
          <Route path="/solutions/tech" element={<TechPage />} />
          <Route path="/solutions/logistics" element={<IndustryPage />} />
          <Route path="/solutions/manufacturing" element={<IndustryPage />} />
          <Route path="/solutions/energy" element={<IndustryPage />} />
          <Route path="/solutions/defense" element={<IndustryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:guideSlug" element={<GuideDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postSlug" element={<BlogPostPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research-collective" element={<ResearchCollectivePage />} />
          <Route path="/open" element={<OpenPage />} />
          <Route path="/dashboard" element={<MarshalDashboardPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/deployment" element={<DeploymentPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/:slug" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App