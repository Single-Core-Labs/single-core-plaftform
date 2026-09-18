import Lenis from 'lenis'

let lenis = null
let rafId = 0

// Single shared Lenis instance. Returns null when the user prefers
// reduced motion (native scroll is kept) or when already initialised.
export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })
  window.__lenis = lenis

  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
  return lenis
}

export function getLenis() {
  return lenis || window.__lenis || null
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId)
  if (lenis) {
    lenis.destroy()
    lenis = null
    window.__lenis = null
  }
}
