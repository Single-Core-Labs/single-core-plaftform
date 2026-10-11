import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * WordsPullUpMultiStyle
 * Takes an array of segments: [{ text, className, style }]
 * Splits preserving per-word className/style, animates with staggered pull-up.
 *
 * @param {Array<{text: string, className?: string, style?: object}>} segments
 * @param {string}  wrapperClassName
 * @param {object}  defaultStyle    — applied to every word (merged under segment style)
 * @param {number}  stagger
 */
export default function WordsPullUpMultiStyle({
  segments = [],
  wrapperClassName = '',
  defaultStyle = {},
  stagger = 0.08,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  // Flatten all segments into an array of { word, className, style, isLastInSeg }
  const allWords = []
  for (let si = 0; si < segments.length; si++) {
    const seg = segments[si]
    const words = (seg.text || '').split(' ').filter(Boolean)
    words.forEach((w, wi) => {
      allWords.push({
        word: w,
        className: seg.className || '',
        style: seg.style || {},
        isLastInSeg: wi === words.length - 1,
        isLastWord: si === segments.length - 1 && wi === words.length - 1,
      })
    })
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  }

  const wordVariant = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={wrapperClassName}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '0',
      }}
    >
      {allWords.map((item, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className={item.className}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: item.isLastWord ? 0 : '0.25em',
            ...defaultStyle,
            ...item.style,
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </motion.span>
  )
}
