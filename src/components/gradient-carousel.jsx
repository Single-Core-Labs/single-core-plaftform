import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Gradient Carousel — Site-adapted version of React Bits Pro gradient-carousel-tw
 * 3D card carousel with dynamic gradient background extraction
 * Adapted to Single Core Labs design tokens: black/white/gray, not vibrant
 *
 * Props match Pro docs: https://pro.reactbits.dev/docs/components/gradient-carousel
 */
export function GradientCarousel({
  images = [],
  className = '',
  maxRotationDegrees = 28,
  maxDepthPx = 140,
  minScale = 0.92,
  cardGap = 28,
  frictionFactor = 0.9,
  wheelSensitivity = 0.6,
  dragSensitivity = 1.0,
  backgroundBlur = 24,
  gradientSize = 0.65,
  gradientIntensity = 0.7, // we map 0.7 vibrant → 0.18 muted for site
  enableKeyboard = true,
  onCardChange,
  cardAspectRatio = 0.8,
  initialIndex = 0,
  style,
}) {
  const containerRef = useRef(null)
  const [active, setActive] = useState(() => Math.max(0, Math.min(initialIndex, images.length - 1)))
  const [offset, setOffset] = useState(0) // continuous offset for physics
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, offset: 0 })
  const [gradients, setGradients] = useState([]) // per-image muted gradients
  const velocityRef = useRef(0)

  // Extract muted gradients — site-adapted: desaturate + map to black/white/gray
  useEffect(() => {
    if (!images.length) return
    let cancelled = false
    const extract = async (src) => {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = src
        await img.decode()
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext('2d')
        if (!ctx) return null
        ctx.drawImage(img, 0, 0, 32, 32)
        const data = ctx.getImageData(8, 8, 16, 16).data
        let r = 0, g = 0, b = 0, c = 0
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 10) continue
          r += data[i]; g += data[i + 1]; b += data[i + 2]; c++
        }
        if (!c) return null
        r = Math.round(r / c); g = Math.round(g / c); b = Math.round(b / c)
        // Site adaptation: desaturate heavily, map to warm gray / ink
        // Convert to HSL, drop saturation to 8%, map luminance to 18-28 for dark, 92-96 for light
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h = 0, s = 0, l = (max + min) / 2 / 255
        if (max !== min) {
          const d = (max - min) / 255
          s = l > 0.5 ? d / (2 - max / 255 - min / 255) : d / (max / 255 + min / 255)
          switch (max) {
            case r: h = (g - b) / (max - min) + (g < b ? 6 : 0); break
            case g: h = (b - r) / (max - min) + 2; break
            default: h = (r - g) / (max - min) + 4
          }
          h /= 6
        }
        // Site palette: keep hue but mute to 6-10% sat, lift luminance to site neutrals
        // For carousel on dark section, use dark muted; on light, use light muted
        const isDarkSection = true // carousel sits on dark per our usage
        const targetL = isDarkSection ? 0.18 + l * 0.10 : 0.92 + l * 0.04
        const mutedS = Math.min(0.08, s * 0.18)
        // HSL to RGB muted
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1; if (t > 1) t -= 1
          if (t < 1/6) return p + (q - p) * 6 * t
          if (t < 1/2) return q
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
        }
        let qr = targetL, qg = targetL, qb = targetL
        if (s !== 0) {
          const q = targetL < 0.5 ? targetL * (1 + mutedS) : targetL + mutedS - targetL * mutedS
          const p = 2 * targetL - q
          qr = hue2rgb(p, q, h + 1/3); qg = hue2rgb(p, q, h); qb = hue2rgb(p, q, h - 1/3)
        }
        const rr = Math.round(qr * 255), gg = Math.round(qg * 255), bb = Math.round(qb * 255)
        // Return two-stop gradient: muted base + slightly lighter
        return `radial-gradient(${gradientSize * 520}px circle at 30% 30%, rgba(${rr},${gg},${bb},${0.55 * gradientIntensity}) 0%, transparent 72%), radial-gradient(${gradientSize * 420}px circle at 78% 72%, rgba(${rr - 8},${gg - 8},${bb - 8},${0.42 * gradientIntensity}) 0%, transparent 68%)`
      } catch { return null }
    }
    Promise.all(images.map(extract)).then((res) => {
      if (cancelled) return
      setGradients(res.map((g) => g || `radial-gradient(${gradientSize * 520}px circle at 32% 28%, rgba(28,28,32,${0.5 * gradientIntensity}) 0%, transparent 70%)`))
    })
    return () => { cancelled = true }
  }, [images, gradientSize, gradientIntensity])

  // Sync active from offset with friction
  const activeFromOffset = useCallback((off) => {
    const idx = Math.round(off)
    return ((idx % images.length) + images.length) % images.length
  }, [images.length])

  // Physics loop — pauses when off-screen or fully idle to save main-thread
  const offsetRef = useRef(0)
  const isVisibleRef = useRef(true)
  const prefersReduced = useRef(false)
  useEffect(() => { offsetRef.current = offset }, [offset])
  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) return
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => { isVisibleRef.current = e.isIntersecting }, { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (prefersReduced.current) return
    let animId = 0
    let idleFrames = 0
    const tick = () => {
      if (!isVisibleRef.current) {
        // off-screen: skip work but keep polling occasionally
        animId = requestAnimationFrame(tick)
        return
      }
      if (!isDragging) {
        velocityRef.current *= frictionFactor
        const vel = Math.abs(velocityRef.current)
        const off = offsetRef.current
        const snapDist = Math.abs(off - Math.round(off))
        if (vel > 0.001) {
          idleFrames = 0
          setOffset((o) => o + velocityRef.current)
        } else if (snapDist > 0.002) {
          idleFrames = 0
          setOffset((o) => {
            const target = Math.round(o)
            return o + (target - o) * 0.18
          })
        } else {
          // fully idle — snap and pause ticking for a bit
          idleFrames += 1
          if (idleFrames < 8) {
            setOffset((o) => Math.round(o))
          } else {
            // stop looping until next interaction (velocity/drag changes effect restarts)
            // schedule a lightweight wake check every 500ms instead of every frame
            animId = setTimeout(() => { idleFrames = 0; animId = requestAnimationFrame(tick) }, 500)
            return
          }
        }
      } else {
        idleFrames = 0
      }
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => { if (animId) { cancelAnimationFrame(animId); clearTimeout(animId) } }
  }, [isDragging, frictionFactor])

  // Active sync
  useEffect(() => {
    const idx = activeFromOffset(offset)
    if (idx !== active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: derived card index is synced after scroll settles; it cannot be computed during render because onCardChange is a side effect that must fire on change
      setActive(idx)
      onCardChange?.(idx)
    }
  }, [offset, active, activeFromOffset, onCardChange])

  // Keyboard
  useEffect(() => {
    if (!enableKeyboard) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { velocityRef.current -= 0.9; setOffset((o) => o - 1) }
      if (e.key === 'ArrowRight') { velocityRef.current += 0.9; setOffset((o) => o + 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enableKeyboard])

  // Wheel
  const onWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
      velocityRef.current += Math.sign(e.deltaX) * 0.18 * wheelSensitivity
      setOffset((o) => o + Math.sign(e.deltaX) * 0.22 * wheelSensitivity)
      e.preventDefault()
    } else if (Math.abs(e.deltaY) > 8) {
      const dir = Math.sign(e.deltaY)
      velocityRef.current += dir * 0.14 * wheelSensitivity
      setOffset((o) => o + dir * 0.18 * wheelSensitivity)
      if (containerRef.current?.contains(e.target)) e.preventDefault()
    }
  }, [wheelSensitivity])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  // Drag
  const onPointerDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, offset })
    velocityRef.current = 0
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!isDragging) return
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const dx = (x - dragStart.x) * 0.008 * dragSensitivity
    // 1 card ≈ 320px + gap
    const cardStep = (320 + cardGap) * 0.004
    const newOffset = dragStart.offset - dx / cardStep
    const vel = newOffset - offset
    velocityRef.current = vel * 0.45
    setOffset(newOffset)
  }
  const onPointerUp = () => {
    setIsDragging(false)
  }

  if (!images.length) return null

  const activeGradient = gradients[active] || gradients[0]

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'pan-y',
        ...style,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      aria-roledescription="carousel"
      aria-label="Gradient carousel"
    >
      {/* Dynamic gradient background — site-muted */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: '#050505',
          transition: 'background 0.7s cubic-bezier(0.22,1,0.36,1)',
          contain: 'paint',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -40,
            background: activeGradient,
            filter: `blur(${Math.min(backgroundBlur, 16)}px)`,
            opacity: 0.7,
            transition: 'background 0.6s ease, opacity 0.6s ease',
            willChange: 'background',
            transform: 'translateZ(0)',
          }}
        />
        {/* Subtle grain to match site */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Cards 3D perspective */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          contain: 'layout paint',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${cardGap}px`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {images.map((src, i) => {
            // circular distance from active (with wrap)
            let dist = i - offset
            // wrap to shortest distance
            const len = images.length
            if (Math.abs(dist) > len / 2) dist = dist - Math.sign(dist) * len
            const abs = Math.abs(dist)
            const clamp = Math.min(abs, 2.8)
            const rot = -dist * maxRotationDegrees * 0.42
            const z = -clamp * maxDepthPx * 0.55
            const scale = 1 - clamp * (1 - minScale) * 0.55
            const opacity = 1 - clamp * 0.18
            const isActive = Math.round(offset) % len === i || (Math.round(offset) % len < 0 ? Math.round(offset) % len + len : Math.round(offset) % len) === i
            return (
              <div
                key={`${src}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${images.length}`}
                onClick={() => setOffset(i)}
                style={{
                  flexShrink: 0,
                  width: 'min(320px, 72vw)',
                  aspectRatio: String(cardAspectRatio),
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#0A0A0A',
                  border: `1px solid ${isActive ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isActive
                    ? '0 24px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset'
                    : '0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.22)',
                  transform: `translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                  opacity,
                  // box-shadow/border transitions removed from per-frame path
                  transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.32s',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading={i === active ? 'eager' : 'lazy'}
                />
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 2 }}>
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => setOffset(i)}
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              borderRadius: '999px',
              border: 'none',
              background: i === active ? '#FFFFFF' : 'rgba(255,255,255,0.32)',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default GradientCarousel
