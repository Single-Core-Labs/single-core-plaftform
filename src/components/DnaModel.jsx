import { useEffect, useRef } from 'react'

const NUM_PAIRS = 14
const PAIR_SPACING = 18
const RADIUS = 36
const CENTER_X = 90
const START_Y = 18
const TWIST = 0.7
const SPEED = 0.008

function draw(ctx, angle, w, h) {
  ctx.clearRect(0, 0, w, h)

  const pairs = []
  for (let i = 0; i < NUM_PAIRS; i++) {
    const y = START_Y + i * PAIR_SPACING
    const phase = angle + i * TWIST
    const x1 = CENTER_X + Math.sin(phase) * RADIUS
    const x2 = CENTER_X + Math.sin(phase + Math.PI) * RADIUS
    const z = Math.cos(phase)
    const depth = (z + 1) / 2
    pairs.push({ y, x1, x2, z, depth, phase, index: i })
  }

  // Sort by z for painter's algorithm (back to front)
  const sorted = [...pairs].sort((a, b) => a.z - b.z)

  // Draw back half of backbone strands first
  const backStrand1 = []
  const backStrand2 = []
  const frontStrand1 = []
  const frontStrand2 = []

  for (const p of sorted) {
    if (p.z < 0) {
      backStrand1.push({ x: p.x1, y: p.y })
      backStrand2.push({ x: p.x2, y: p.y })
    } else {
      frontStrand1.push({ x: p.x1, y: p.y })
      frontStrand2.push({ x: p.x2, y: p.y })
    }
  }

  // Draw back strands
  for (const strand of [backStrand1, backStrand2]) {
    if (strand.length < 2) continue
    ctx.beginPath()
    ctx.moveTo(strand[0].x, strand[0].y)
    for (let i = 1; i < strand.length; i++) {
      const xc = (strand[i].x + strand[i - 1].x) / 2
      const yc = (strand[i].y + strand[i - 1].y) / 2
      ctx.quadraticCurveTo(strand[i - 1].x, strand[i - 1].y, xc, yc)
    }
    ctx.strokeStyle = 'rgba(184, 164, 120, 0.12)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Draw base pairs (back to front)
  for (const p of sorted) {
    const alpha = 0.15 + p.depth * 0.55
    const width = 0.5 + p.depth * 2

    // Base pair line
    ctx.beginPath()
    ctx.moveTo(p.x1, p.y)
    ctx.lineTo(p.x2, p.y)
    ctx.strokeStyle = `rgba(184, 164, 120, ${alpha * 0.6})`
    ctx.lineWidth = width
    ctx.stroke()

    // Nucleotide glow at left end
    const grad1 = ctx.createRadialGradient(p.x1, p.y, 0, p.x1, p.y, 5 + p.depth * 4)
    grad1.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.5})`)
    grad1.addColorStop(1, 'rgba(100, 200, 255, 0)')
    ctx.fillStyle = grad1
    ctx.beginPath()
    ctx.arc(p.x1, p.y, 5 + p.depth * 4, 0, Math.PI * 2)
    ctx.fill()

    // Nucleotide glow at right end
    const grad2 = ctx.createRadialGradient(p.x2, p.y, 0, p.x2, p.y, 5 + p.depth * 4)
    grad2.addColorStop(0, `rgba(255, 200, 100, ${alpha * 0.5})`)
    grad2.addColorStop(1, 'rgba(255, 200, 100, 0)')
    ctx.fillStyle = grad2
    ctx.beginPath()
    ctx.arc(p.x2, p.y, 5 + p.depth * 4, 0, Math.PI * 2)
    ctx.fill()

    // Small solid dot
    ctx.beginPath()
    ctx.arc(p.x1, p.y, 1.5 + p.depth * 1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x2, p.y, 1.5 + p.depth * 1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`
    ctx.fill()

    // A/T or G/C label on front pairs
    if (p.depth > 0.5) {
      const label = p.index % 2 === 0 ? 'A—T' : 'G—C'
      ctx.font = '5px monospace'
      ctx.fillStyle = `rgba(184, 164, 120, ${alpha * 0.4})`
      ctx.textAlign = 'center'
      ctx.fillText(label, (p.x1 + p.x2) / 2, p.y + 10)
    }
  }

  // Draw front strands
  for (const strand of [frontStrand1, frontStrand2]) {
    if (strand.length < 2) continue
    ctx.beginPath()
    ctx.moveTo(strand[0].x, strand[0].y)
    for (let i = 1; i < strand.length; i++) {
      const xc = (strand[i].x + strand[i - 1].x) / 2
      const yc = (strand[i].y + strand[i - 1].y) / 2
      ctx.quadraticCurveTo(strand[i - 1].x, strand[i - 1].y, xc, yc)
    }
    ctx.strokeStyle = 'rgba(184, 164, 120, 0.35)'
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Glow on front strand
    ctx.strokeStyle = 'rgba(184, 164, 120, 0.06)'
    ctx.lineWidth = 8
    ctx.stroke()
  }

  // Floating particles
  const t = Date.now() * 0.001
  for (let i = 0; i < 8; i++) {
    const px = CENTER_X + Math.sin(t * 0.5 + i * 2.1) * (RADIUS + 20)
    const py = START_Y + Math.sin(t * 0.7 + i * 1.3) * (NUM_PAIRS * PAIR_SPACING * 0.4) + (NUM_PAIRS * PAIR_SPACING * 0.5)
    const ps = 1 + Math.sin(t + i) * 0.5
    ctx.beginPath()
    ctx.arc(px, py, ps, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(184, 164, 120, ${0.08 + Math.sin(t + i * 0.5) * 0.04})`
    ctx.fill()
  }

  // Labels
  ctx.font = '7px monospace'
  ctx.fillStyle = 'rgba(184, 164, 120, 0.08)'
  ctx.textAlign = 'left'
  ctx.fillText('5\'', CENTER_X - RADIUS - 18, START_Y - 2)
  ctx.fillText('3\'', CENTER_X + RADIUS + 8, START_Y - 2)
  ctx.fillText('3\'', CENTER_X - RADIUS - 18, START_Y + NUM_PAIRS * PAIR_SPACING + 4)
  ctx.fillText('5\'', CENTER_X + RADIUS + 8, START_Y + NUM_PAIRS * PAIR_SPACING + 4)
}

export default function DnaModel() {
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = 180
    const h = NUM_PAIRS * PAIR_SPACING + 40
    canvas.width = w * 2
    canvas.height = h * 2
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(2, 2)

    function loop() {
      angleRef.current += SPEED
      draw(ctx, angleRef.current, w, h)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Orbiting rings behind */}
      <svg viewBox="0 0 300 300" style={{ position: 'absolute', width: '110%', height: '110%', maxWidth: 'none' }}>
        <ellipse cx="150" cy="150" rx="130" ry="45" fill="none" stroke="rgba(184,164,120,0.06)" strokeWidth="1" transform="rotate(-30 150 150)" />
        <ellipse cx="150" cy="150" rx="130" ry="45" fill="none" stroke="rgba(184,164,120,0.04)" strokeWidth="1" transform="rotate(30 150 150)" />
        <ellipse cx="150" cy="150" rx="130" ry="45" fill="none" stroke="rgba(184,164,120,0.02)" strokeWidth="1" transform="rotate(90 150 150)" />
      </svg>
      {/* DNA canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          zIndex: 1,
          animation: 'dnaFloat 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 30px rgba(184,164,120,0.06))',
        }}
      />
      <style>{`
        @keyframes dnaFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
