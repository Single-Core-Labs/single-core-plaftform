/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Newsreader', 'Georgia', 'serif'],
        display: ['"Plus Jakarta Sans"', 'Sora', 'ui-sans-serif', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        almarai: ['Almarai', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        bg:      '#0A0A0A',
        surface: '#161616',
        warm:    '#E8E4DE',
        muted:   '#777777',
        dim:     '#444444',
        accent:  '#00897B',
        primary: '#DEDBC8',
      },
    },
  },
}

