import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import EnterprisePage from './pages/EnterprisePage'
import ContactPage from './pages/ContactPage'
import ComingSoonPage from './pages/ComingSoonPage'

function ScrollToHashAndTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 120)
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
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:slug" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
