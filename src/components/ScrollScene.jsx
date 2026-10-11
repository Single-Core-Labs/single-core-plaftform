/**
 * ScrollScene — 3D scroll-driven effects using Framer Motion.
 *
 * Components exported:
 *  - ParallaxLayer   : translates Y on scroll (depth layers)
 *  - ScrollRotate    : rotates slightly as section scrolls through viewport
 *  - ScrollScale     : scales from small → full as element enters viewport
 *  - ScrollFade3D    : fades + lifts in Z (perspective fade-up)
 *  - Card3D          : mouse-tracking tilt on hover
 *  - SectionDepth    : wraps a section with a subtle perspective shift
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'

const SPRING = { stiffness: 120, damping: 22, mass: 0.6 }

// ─── ParallaxLayer ────────────────────────────────────────────────────────────
/**
 * Translates children vertically as the page scrolls.
 * speed > 0 → moves up faster than scroll (foreground feel)
 * speed < 0 → moves down slower (background feel)
 */
export function ParallaxLayer({ children, speed = 0.3, style = {}, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `${-speed * 80}px`])

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform', ...style }} {...props}>
      {children}
    </motion.div>
  )
}

// ─── ScrollRotate ─────────────────────────────────────────────────────────────
/**
 * Gently rotates the element as it scrolls through the viewport.
 */
export function ScrollRotate({ children, degrees = 4, style = {}, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees])

  return (
    <motion.div ref={ref} style={{ rotate, willChange: 'transform', ...style }} {...props}>
      {children}
    </motion.div>
  )
}

// ─── ScrollScale ──────────────────────────────────────────────────────────────
/**
 * Scales from `from` → 1 as the element enters the viewport.
 */
export function ScrollScale({ children, from = 0.88, style = {}, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [from, 1])

  return (
    <motion.div ref={ref} style={{ scale, willChange: 'transform', ...style }} {...props}>
      {children}
    </motion.div>
  )
}

// ─── ScrollFade3D ─────────────────────────────────────────────────────────────
/**
 * Fades in + rises from a Z-depth offset as the element enters the viewport.
 * Gives a "coming out of the page" feel.
 */
export function ScrollFade3D({ children, style = {}, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.4'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y       = useTransform(scrollYProgress, [0, 1], [48, 0])
  const z       = useTransform(scrollYProgress, [0, 1], [-40, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        z,
        willChange: 'transform, opacity',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ─── Card3D ───────────────────────────────────────────────────────────────────
/**
 * Mouse-tracking 3D tilt on hover.
 * Wrap any card / panel with this for a depth effect.
 */
export function Card3D({ children, intensity = 8, style = {}, ...props }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, SPRING)
  const springY = useSpring(rotateY, SPRING)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * intensity)
    rotateX.set(-dy * intensity)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ─── SectionDepth ─────────────────────────────────────────────────────────────
/**
 * Wraps a full section with a perspective container that subtly shifts
 * rotateX as the section scrolls through the viewport — like a page turning.
 */
export function SectionDepth({ children, style = {}, ...props }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [3, 0, 0, -3])

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
