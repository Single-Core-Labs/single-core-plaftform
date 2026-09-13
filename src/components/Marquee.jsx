import { useRef, useEffect } from 'react'

/**
 * Infinite horizontal marquee — Scale.com style
 * Duplicates children for seamless loop, CSS-driven, pause on hover.
 * Usage:
 * <Marquee speed={32} gap="2rem">
 *   <span>SECURITY</span><span>•</span><span>DEPLOYMENT</span>...
 * </Marquee>
 */
export function Marquee({
  children,
  speed = 30, // seconds per loop
  gap = '3rem',
  pauseOnHover = true,
  reverse = false,
  className = '',
  style,
  'aria-label': ariaLabel = 'Scrolling content',
}) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const items = Array.isArray(children) ? children : [children]

  // Pause marquee when off-screen to save compositor work
  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => {
      track.style.animationPlayState = e.isIntersecting ? 'running' : 'paused'
    }, { threshold: 0.05 })
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      role="marquee"
      aria-label={ariaLabel}
      className={`marquee ${pauseOnHover ? 'marquee--pause' : ''} ${className}`}
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        contain: 'layout paint',
        ...style,
      }}
    >
      <div
        ref={trackRef}
        className="marquee__track"
        style={{
          display: 'flex',
          width: 'max-content',
          gap,
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* First copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
          {items.map((child, i) => (
            <div key={`a-${i}`} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {child}
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop — aria-hidden */}
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
          {items.map((child, i) => (
            <div key={`b-${i}`} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee--pause:hover .marquee__track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee__track { animation: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  )
}

/**
 * Scale-like logo/text marquee presets
 */
export function TrustedMarquee() {
  const itemStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text)',
    opacity: 0.6,
    whiteSpace: 'nowrap',
  }

  const logos = [
    'Cognizant',
    'Bank of America',
    'GlobalLogic',
  ]

  return (
    <Marquee speed={28} gap="2.5rem" aria-label="Trusted by engineers from">
      {logos.map((name) => (
        <span key={name} style={itemStyle}>
          {name}
        </span>
      ))}
      {/* Interleave dots via extra nodes — easier: map with dot */}
    </Marquee>
  )
}

export function ScaleWordsMarquee({ words, theme = 'dark' }) {
  const color = theme === 'light' ? '#0A0A0A' : '#FFFFFF'
  const dot = (
    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, opacity: 0.2, display: 'inline-block', flexShrink: 0 }} />
  )
  const items = words.flatMap((w, i) => (i === 0 ? [w] : [dot, w]))
  return (
    <Marquee speed={40} gap="2.5rem" aria-label="Industries and capabilities">
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <span
            key={`${item}-${i}`}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color,
              opacity: 0.9,
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ) : (
          <span key={`dot-${i}`}>{item}</span>
        )
      )}
    </Marquee>
  )
}

export function LogoMarquee({ logos, theme = 'dark' }) {
  const color = theme === 'light' ? '#0A0A0A' : '#FFFFFF'
  const dot = (
    <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, opacity: 0.25, display: 'inline-block' }} />
  )
  const items = logos.flatMap((name, i) => (i === 0 ? [name] : ['·', name]))
  return (
    <Marquee speed={28} gap="3rem" aria-label="Trusted partners">
      {items.map((item, i) =>
        item === '·' ? (
          <span key={`sep-${i}`}>{dot}</span>
        ) : (
          <span
            key={item}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color,
              opacity: 0.55,
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        )
      )}
    </Marquee>
  )
}
