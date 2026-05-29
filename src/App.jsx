import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import EnterprisePage from './pages/EnterprisePage'
import ContactPage from './pages/ContactPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ComingSoonPage from './pages/ComingSoonPage'
import BlogPage from './pages/BlogPage'
import BlogPost from './pages/BlogPost'
import AboutPage from './pages/AboutPage'
import HealthcareIntelligencePage from './pages/HealthcareIntelligencePage'


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

    </BrowserRouter>
  )
}

export default App
