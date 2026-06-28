import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const CUBES = [
  { x: -70, y: -50, z: 20, size: 88, delay: 0 },
  { x: 60, y: -70, z: -10, size: 72, delay: 0.4 },
  { x: -40, y: 55, z: -30, size: 64, delay: 0.8 },
  { x: 75, y: 40, z: 35, size: 80, delay: 1.2 },
]

function Cube({ size, style }) {
  const half = size / 2

  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)`, className: 'hero-cube__face--front' },
    { transform: `rotateY(180deg) translateZ(${half}px)`, className: 'hero-cube__face--back' },
    { transform: `rotateY(90deg) translateZ(${half}px)`, className: 'hero-cube__face--right' },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, className: 'hero-cube__face--left' },
    { transform: `rotateX(90deg) translateZ(${half}px)`, className: 'hero-cube__face--top' },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, className: 'hero-cube__face--bottom' },
  ]

  return (
    <div className="hero-cube" style={{ width: size, height: size, ...style }}>
      <div className="hero-cube__inner">
        {faces.map((face) => (
          <div
            key={face.className}
            className={`hero-cube__face ${face.className}`}
            style={{ transform: face.transform }}
          />
        ))}
      </div>
    </div>
  )
}

export function HeroCubeScene() {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 })
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={ref}
      className="hero-cube-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div className="hero-cube-scene__glow" />
      <div className="hero-cube-scene__floor" />

      <motion.div
        className="hero-cube-scene__cluster"
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {CUBES.map((cube) => (
          <motion.div
            key={`${cube.x}-${cube.y}`}
            className="hero-cube-scene__item"
            style={{
              transform: `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)`,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + cube.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: cube.delay,
            }}
          >
            <Cube size={cube.size} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
