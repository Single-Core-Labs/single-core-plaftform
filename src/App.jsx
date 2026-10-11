import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

import HomePage from './pages/HomePage'
import { SiteNavbar } from './components/SiteNavbar'
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AIModernizationPage = lazy(() => import('./pages/AIModernizationPage'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const DeploymentPage = lazy(() => import('./pages/DeploymentPage'))
const SecurityPage = lazy(() => import('./pages/SecurityPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const SemanticCachePaper = lazy(() => import('./pages/SemanticCachePaper'))
const MarshalPage = lazy(() => import('./pages/MarshalPage'))
const EnterprisePage = lazy(() => import('./pages/EnterprisePage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const CloudOverviewPage = lazy(() => import('./pages/CloudOverviewPage'))
const ManagedInferencePage = lazy(() => import('./pages/ManagedInferencePage'))
const ServerlessFineTuningPage = lazy(() => import('./pages/ServerlessFineTuningPage'))
const ReinforcementLearningPage = lazy(() => import('./pages/ReinforcementLearningPage'))
const DataPrepPage = lazy(() => import('./pages/DataPrepPage'))
const ModelTrainingPage = lazy(() => import('./pages/ModelTrainingPage'))
const ModelInferencePage = lazy(() => import('./pages/ModelInferencePage'))
const SovereignAIPage = lazy(() => import('./pages/SovereignAIPage'))
const IndustryPage = lazy(() => import('./pages/industries/IndustryPage'))
const DefensePage = lazy(() => import('./pages/DefensePage'))

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
      <SiteNavbar />
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions/ai-modernization" element={<AIModernizationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/semantic-cache" element={<SemanticCachePaper />} />
          <Route path="/product/marshal" element={<MarshalPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/cloud/overview" element={<CloudOverviewPage />} />
          <Route path="/cloud/managed-inference" element={<ManagedInferencePage />} />
          <Route path="/cloud/serverless-fine-tuning" element={<ServerlessFineTuningPage />} />
          <Route path="/solutions/reinforcement-learning" element={<ReinforcementLearningPage />} />
          <Route path="/solutions/data-prep" element={<DataPrepPage />} />
          <Route path="/solutions/model-training" element={<ModelTrainingPage />} />
          <Route path="/solutions/model-inference" element={<ModelInferencePage />} />
          <Route path="/sovereign-ai" element={<SovereignAIPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          {/* Legacy industry URLs — redirect to canonical /industries/* routes */}
          <Route path="/solutions/defense" element={<DefensePage />} />
          <Route path="/federal" element={<Navigate to="/industries/federal" replace />} />
          <Route path="/telecom" element={<Navigate to="/industries/telecom" replace />} />
          <Route path="/financial-services" element={<Navigate to="/industries/financial-services" replace />} />
          <Route path="/terms" element={<LegalPage doc="terms" />} />
          <Route path="/privacy" element={<LegalPage doc="privacy" />} />
          <Route path="/privacy-choices" element={<LegalPage doc="privacy-choices" />} />
          <Route path="/dpa" element={<LegalPage doc="dpa" />} />
          <Route path="/trust-center" element={<LegalPage doc="trust-center" />} />
          <Route path="/legal" element={<LegalPage doc="legal" />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/deployment" element={<DeploymentPage />} />
          <Route path="/:slug" element={<ComingSoonPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App