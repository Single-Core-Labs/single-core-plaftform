import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

import UnderConstructionPage from './pages/UnderConstructionPage'

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
      {/* 🚧 SITE UNDER CONSTRUCTION — all routes locked */}
      <Routes>
        <Route path="*" element={<UnderConstructionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App