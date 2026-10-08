import { Link } from 'react-router-dom'

/* Composed bento grid: 4 columns desktop, 2 tablet, 1 mobile.
   Uneven spans keep it composed, not uniform.
   TODO: customer-quote slots — hidden until real quotes exist. */

export function BentoGrid({ children, className = '' }) {
  return <div className={`scl-bento${className ? ` ${className}` : ''}`}>{children}</div>
}

export function BentoCard({
  icon: Icon,
  kicker,
  headline,
  text,
  span,
  href,
  linkLabel,
  children,
}) {
  const spanCls = span === 'wide' ? ' scl-card-wide' : span === 'tall' ? ' scl-card-tall' : ''
  const body = (
    <>
      {Icon ? (
        <span className="scl-card-icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.75} />
        </span>
      ) : null}
      {kicker ? <p className="scl-card-kicker">{kicker}</p> : null}
      {headline ? <h3 className="scl-card-headline">{headline}</h3> : null}
      {text ? <p className="scl-card-text">{text}</p> : null}
      {children}
      {href && linkLabel ? (
        <span className="scl-card-link">
          {linkLabel}
          <span aria-hidden="true">→</span>
        </span>
      ) : null}
    </>
  )

  // Whole-card link for CTA cards: one large touch target.
  if (href && !linkLabel) {
    return (
      <Link to={href} className={`scl-card${spanCls}`}>
        {body}
      </Link>
    )
  }

  return <article className={`scl-card${spanCls}`}>{body}</article>
}

// TODO: customer quote slot — render only when a real quote exists.
// export function BentoQuote({ quote, author, role }) { ... }
