/* 12-column container. One alignment edge for the whole page.
   Sections compose it with .scl-section for vertical rhythm. */

export function Container({
  as: Tag = 'div',
  guides = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `scl-container${guides ? ' scl-guides' : ''}${className ? ` ${className}` : ''}`
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}

export function Section({
  as: Tag = 'section',
  guides = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `scl-section${className ? ` ${className}` : ''}`
  return (
    <Tag className={cls} {...rest}>
      <Container guides={guides}>{children}</Container>
    </Tag>
  )
}

export function SectionHead({ kicker, heading, lede }) {
  return (
    <div className="scl-section-head">
      {kicker ? <p className="scl-kicker">{kicker}</p> : null}
      {heading ? <h2 className="scl-heading">{heading}</h2> : null}
      {lede ? <p className="scl-lede">{lede}</p> : null}
    </div>
  )
}
