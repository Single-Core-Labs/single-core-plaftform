import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* Accessible tabs (WAI-APG automatic activation):
   role=tablist/tab/tabpanel, aria-selected, arrow/Home/End keys,
   roving tabindex with focus management. */
export function Tabs({ tabs, initial = 0, label = 'Features' }) {
  const base = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [active, setActive] = useState(initial)
  const tabRefs = useRef([])

  const select = (index) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (e) => {
    const last = tabs.length - 1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      select(active === last ? 0 : active + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      select(active === 0 ? last : active - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(last)
    }
  }

  const current = tabs[active]

  return (
    <div className="scl-tabs">
      <div role="tablist" aria-label={label} className="scl-tablist" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[i] = el }}
            role="tab"
            id={`${base}-tab-${tab.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${tab.id}`}
            tabIndex={i === active ? 0 : -1}
            className="scl-tab"
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel-${current.id}`}
        aria-labelledby={`${base}-tab-${current.id}`}
        className="scl-panel"
      >
        <div>
          <h3 className="scl-panel-heading">{current.heading}</h3>
        </div>
        <div className="scl-panel-body">
          {current.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {current.visual}
        {current.link ? (
          <Link to={current.link.href} className="scl-panel-link">
            {current.link.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

/* Framed terminal-style panel visual (CSS only, no imagery). */
export function Terminal({ title = 'terminal', lines = [] }) {
  return (
    <div className="scl-term" role="img" aria-label={title}>
      <div className="scl-term-bar" aria-hidden="true">
        <i /><i /><i />
      </div>
      <p className="scl-term-body">
        {lines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line.prompt ? <span className="scl-term-prompt">$ </span> : null}
            <span className={line.ok ? 'scl-term-ok' : undefined}>{line.text}</span>
          </span>
        ))}
      </p>
    </div>
  )
}
