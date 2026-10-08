/* Deterministic PRNG so server and client render identical cells. */
import { mulberry32 } from './rng'

const COLS = 50
const ROWS = 34
const CELL = 24
const W = COLS * CELL
const H = ROWS * CELL

function gridPath() {
  let d = ''
  for (let c = 0; c <= COLS; c += 1) {
    const x = c * CELL
    d += `M${x} 0V${H}`
  }
  for (let r = 0; r <= ROWS; r += 1) {
    const y = r * CELL
    d += `M0 ${y}H${W}`
  }
  return d
}

const GRID_D = gridPath()

/* Reusable pixel-grid background: hairline cells + a few seeded
   accent fills. Inline SVG (no canvas). Masked so text stays readable.
   fade: a handful of cells fade in once on load (static otherwise,
   and fully static under prefers-reduced-motion). */
export function PixelGrid({
  seed = 1,
  accents = 14,
  boot = 8,
  fade = false,
  mask = 'soft',
  cover = false,
  opacity = 1,
  className = '',
  style,
}) {
  const rng = mulberry32(seed)
  const picked = new Set()
  while (picked.size < Math.min(accents, COLS * ROWS)) {
    picked.add(Math.floor(rng() * COLS * ROWS))
  }
  const cells = [...picked].map((idx) => {
    const col = idx % COLS
    const row = Math.floor(idx / COLS)
    return {
      x: col * CELL,
      y: row * CELL,
      // Accent fills at 10–30% opacity.
      o: 0.1 + rng() * 0.2,
    }
  })
  const bootSet = fade ? cells.slice(0, Math.min(boot, cells.length)) : []
  const bootKeys = new Set(bootSet)
  const staticCells = cells.filter((c) => !bootKeys.has(c))

  const maskCls =
    mask === 'bottom' ? 'scl-px-mask-bottom'
    : mask === 'top' ? 'scl-px-mask-top'
    : mask === 'none' ? '' : 'scl-px-mask-soft'

  return (
    <div
      aria-hidden="true"
      className={`scl-pixelgrid${cover ? ' scl-pixelgrid-cover' : ''} ${maskCls} ${className}`.trim()}
      style={{ opacity, ...style }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        <path d={GRID_D} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        {staticCells.map((c, i) => (
          <rect
            key={`s-${i}`}
            x={c.x + 0.5}
            y={c.y + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            style={{ fill: 'var(--scl-accent)' }}
            opacity={c.o}
          />
        ))}
        {bootSet.map((c, i) => (
          <rect
            key={`b-${i}`}
            className="scl-px-boot"
            x={c.x + 0.5}
            y={c.y + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            style={{ fill: 'var(--scl-accent)', animationDelay: `${i * 90}ms`, '--scl-px-o': c.o }}
          />
        ))}
      </svg>
    </div>
  )
}
