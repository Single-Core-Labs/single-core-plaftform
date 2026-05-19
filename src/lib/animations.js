// ─── Animation Presets — Editorial v3 ─────────────────────────────────────
// Cinematic, restrained motion. GSAP-ready + Framer Motion variants.

/** Apple/Linear easing — fast-out, slow-in */
export const ease = [0.16, 1, 0.3, 1]

/** Fade up — primary entrance for text blocks */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease },
  },
}

/** Fade up with delay */
export const fadeUpDelayed = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease, delay: 0.15 },
  },
}

/** Fade in — for images, media */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
}

/** Slide from left */
export const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease },
  },
}

/** Slide from right */
export const slideRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease },
  },
}

/** Stagger container */
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

/** Stagger hero — tighter */
export const staggerHero = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/** Individual word animation for hero headlines */
export const wordReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease },
  },
}

/** Line reveal — clip from bottom */
export const lineReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: { duration: 0.8, ease },
  },
}

/** Viewport config — used on whileInView wrappers */
export const viewport = { once: true, amount: 0.2, margin: '-60px' }
