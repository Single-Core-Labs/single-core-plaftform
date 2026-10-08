/* Single-row word strip. Slow marquee, pauses on hover/focus,
   fully static under prefers-reduced-motion. Non-interactive text. */
export function Marquee({ items = [], separator = '·', duration = 46, label, reverse = false, pill = false, bare = false }) {
  const half = (hidden) => (
    <span
      aria-hidden={hidden || undefined}
      style={{ display: 'contents' }}
    >
      {items.map((word) => (
        <span key={`${hidden ? 'b' : 'a'}-${typeof word === 'string' ? word : word.label}`} style={{ display: 'contents' }}>
          {pill ? (
            <span className="scl-marquee-pill">
              {typeof word !== 'string' && word.logo ? (
                <img src={word.logo} alt="" aria-hidden="true" className="scl-marquee-logo" loading="lazy" decoding="async" />
              ) : null}
              <span>{typeof word === 'string' ? word : word.label}</span>
            </span>
          ) : (
            <>
              <span className="scl-marquee-word">{word}</span>
              <span className="scl-marquee-sep" aria-hidden="true">
                {separator}
              </span>
            </>
          )}
        </span>
      ))}
    </span>
  )

  return (
    <div
      className="scl-marquee"
      role={label ? 'region' : undefined}
      aria-label={label}
      tabIndex={label ? 0 : undefined}
      style={bare ? { border: 'none' } : undefined}
    >
      <div className="scl-marquee-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : undefined }}>
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}
