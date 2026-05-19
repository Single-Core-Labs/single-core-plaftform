import { useEffect, useRef } from 'react'

/**
 * HorizontalRule — animated divider that grows from left on scroll.
 */
export function HorizontalRule({ style = {}, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`hr-animated ${className}`}
      role="separator"
      style={style}
    />
  )
}
