import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * WordsPullUp
 * Splits `text` by spaces. Each word slides up from y:20 with staggered delay.
 * @param {string} text
 * @param {string} className   - applied to the wrapper span
 * @param {boolean} showAsterisk - adds a superscript * after the last character
 * @param {number} stagger     - delay between words (default 0.08s)
 */
export default function WordsPullUp({
  text = '',
  className = '',
  showAsterisk = false,
  stagger = 0.08,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const words = text.split(' ').filter(Boolean)

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  }

  const word = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden' }}
    >
      {words.map((w, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            variants={word}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              marginRight: isLast ? 0 : '0.25em',
              position: 'relative',
            }}
          >
            {w}
            {showAsterisk && isLast && (
              <sup
                style={{
                  position: 'absolute',
                  top: '0.65em',
                  right: '-0.3em',
                  fontSize: '0.31em',
                  lineHeight: 1,
                }}
              >
                *
              </sup>
            )}
          </motion.span>
        )
      })}
    </motion.span>
  )
}
