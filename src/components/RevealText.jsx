import { useEffect, useRef } from 'react'

/**
 * RevealText — GSAP-free scroll-triggered text reveal using Intersection Observer.
 * Wraps children in a container that fades and slides up when it enters the viewport.
 */
export function RevealText({ children, className = '', delay = 0, as: Tag = 'div', ...props }) {
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
      { threshold: 0.15, rootMargin: '-40px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

/**
 * StaggerReveal — Applies stagger animation to direct children.
 */
export function StaggerReveal({ children, className = '', as: Tag = 'div', ...props }) {
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
      { threshold: 0.1, rootMargin: '-40px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`stagger-children ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
