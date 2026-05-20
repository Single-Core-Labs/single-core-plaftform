# Single Core Labs — Codebase Context

This document provides a comprehensive overview of the **Single Core Labs** corporate website codebase. It is intended for developers and AI agents to quickly understand the project architecture, design systems, and component structure.

---

## 1. Architectural Overview

- **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (ESM-based, high-speed HMR)
- **Styling**:
  - **Tailwind CSS v4**: `@theme` block in `index.css` for design tokens
  - **Vanilla CSS**: Custom utilities, layout variables, and animation classes in `index.css`
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) — scroll-triggered reveals, staggered entries, 3D scroll effects, spring physics
- **3D Scroll Effects**: Custom `ScrollScene.jsx` component library built on Framer Motion `useScroll` + `useTransform` + `useSpring`
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) integrated globally in `App.jsx`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)

---

## 2. Directory Structure

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── HorizontalRule.jsx
│   ├── Navbar.jsx
│   ├── RevealText.jsx
│   ├── ScrollScene.jsx       # 3D scroll effect primitives
│   └── ui/                   # Shadcn-style primitives (currently empty)
├── lib/
│   ├── animations.js         # Framer Motion variant definitions
│   ├── constants.js          # Site-wide copy, nav links, data arrays
│   └── utils.js              # clsx / tailwind-merge helpers
├── pages/
│   ├── HomePage.jsx
│   ├── SolutionsPage.jsx
│   ├── EnterprisePage.jsx
│   ├── ContactPage.jsx
│   └── ComingSoonPage.jsx
├── App.jsx                   # Routing, Lenis, providers
├── index.css                 # Global styles + Tailwind v4 theme
└── main.jsx                  # React entry point

public/
├── favicon.svg
├── icons.svg
└── logo.webp
```

---

## 3. Routing

Routes are defined in `App.jsx`:

| Path            | Component          | Notes                              |
|-----------------|--------------------|------------------------------------|
| `/`             | `HomePage`         |                                    |
| `/solutions`    | `SolutionsPage`    |                                    |
| `/enterprise`   | `EnterprisePage`   |                                    |
| `/contact`      | `ContactPage`      | Full contact form page             |
| `/:slug`        | `ComingSoonPage`   | Catch-all for unmapped routes      |

---

## 4. Navigation (`src/lib/constants.js` + `Navbar.jsx`)

`NAV_LINKS` in `constants.js` drives the main nav:

```js
{ label: 'Solutions',    href: '/solutions'    }
{ label: 'Enterprise',   href: '/enterprise'   }
{ label: 'Research',     href: '/research'     }
{ label: 'Contact',      href: '/contact'      }
```

Additional items rendered directly in `Navbar.jsx`:
- **Case Studies** → `/case-studies`
- **Resources** → mega-dropdown (two-column)

### Resources Mega-Dropdown

| Left column — "Single Core Labs" | Right column         |
|----------------------------------|----------------------|
| About                            | Contact us           |
| Security                         | Blog                 |
| Guides                           | Events               |
| Careers                          | Documentation        |

The dropdown is built inside `Navbar.jsx` using `AnimatePresence` + Framer Motion. It closes on outside click via a `useRef` + `mousedown` listener. Mobile menu flattens all links into a full-screen overlay.

---

## 5. Component Breakdown

### `ScrollScene.jsx` — 3D Scroll Primitives

All components use `useScroll` + `useTransform` + `useSpring` from Framer Motion.

| Component       | Effect                                                                 |
|-----------------|------------------------------------------------------------------------|
| `ParallaxLayer` | Translates Y at a configurable speed relative to scroll                |
| `ScrollRotate`  | Rotates element as it scrolls through the viewport                     |
| `ScrollScale`   | Scales from a smaller size to 1 as element enters viewport             |
| `ScrollFade3D`  | Fades + rises from a Z-depth offset (coming-out-of-page feel)          |
| `Card3D`        | Mouse-tracking 3D tilt on hover using `useMotionValue` + springs       |
| `SectionDepth`  | Wraps a section with a `rotateX` perspective shift as it scrolls past  |

### `Navbar.jsx`

- Fixed, frosted-glass navbar with scroll-aware border/shadow
- Desktop: inline links + Resources mega-dropdown + "Book a Demo" CTA
- Mobile: hamburger → full-screen overlay with all links
- Dropdown closes on outside click (`useRef` + `mousedown`)

### `RevealText.jsx`

- `RevealText`: Intersection Observer fade-up for individual elements
- `StaggerReveal`: Staggered fade-up for lists of children

### `Footer.jsx`

Clean footer with social links, contact email, copyright, and large brand watermark.

---

## 6. Pages

### `HomePage.jsx`

3D scroll effects applied throughout:

| Section               | 3D Effect Applied                                      |
|-----------------------|--------------------------------------------------------|
| `HeroSection`         | Parallax exit (content drifts up + fades on scroll), background orb parallax |
| `PhilosophySection`   | `ScrollScale` — quote grows from 92% → 100%            |
| `PipelineSection`     | `ScrollFade3D` on each step — rises from Z-depth       |
| `DifferentiatorsSection` | `SectionDepth` wrapper + `Card3D` tilt on each row  |
| `IndustriesSection`   | `Card3D` on each industry tile                         |

### `ContactPage.jsx`

Full contact form at `/contact`. Fields:
- First name, Last name, Company, Role, Work email, Country (dropdown)
- Budget: pill-toggle radio buttons (₹ INR ranges)
- "What are you looking to solve?" — custom checkbox list (SCL service areas)
- Message textarea
- Submit opens a pre-filled `mailto:` — swap with API call when ready
- Success state: confirmation screen after submit

### `SolutionsPage.jsx`

Editorial services accordion — expandable blocks for Core AI, Data Engineering, Industry Solutions, Scientific Research, Governance & MLOps.

### `EnterprisePage.jsx`

Four Pillars accordion — Embedded Experts, Engineering Velocity, Applied AI Research, Enterprise Trust.

### `ComingSoonPage.jsx`

Minimalist fallback for unmapped routes.

---

## 7. Design System Tokens (`src/index.css`)

```css
/* Colors */
--color-bg:           #FAFAFA
--color-bg-elevated:  #F0EFED
--color-bg-surface:   #E8E6E2
--color-text:         #1A1A1A
--color-text-muted:   #6B6B6B
--color-text-dim:     #A0A0A0
--color-accent:       #00897B   /* teal green */
--color-accent-dim:   rgba(0, 137, 123, 0.1)
--color-border:       rgba(0, 0, 0, 0.08)
--color-border-strong: rgba(0, 0, 0, 0.15)

/* Typography */
--font-serif:    'Newsreader', Georgia, serif
--font-sans:     'Inter', ui-sans-serif, system-ui
--font-display:  'Outfit', 'Inter', ui-sans-serif
--font-mono:     'JetBrains Mono', 'Fira Code'

/* Spacing */
--spacing-section:    clamp(48px, 7vh, 88px)
--spacing-section-lg: clamp(56px, 8vh, 100px)
```

Typography classes: `.text-hero`, `.text-display`, `.text-editorial`, `.text-body`, `.text-eyebrow`, `.text-label`

Button classes: `.btn-primary`, `.btn-outline`

Layout classes: `.container-editorial` (max 1400px), `.container-narrow` (max 900px)

---

## 8. Animation Patterns (`src/lib/animations.js`)

| Export            | Description                                      |
|-------------------|--------------------------------------------------|
| `fadeUp`          | Opacity 0→1 + Y 40→0                            |
| `fadeUpDelayed`   | Same with 0.15s delay                            |
| `fadeIn`          | Opacity only                                     |
| `slideLeft/Right` | Opacity + X translation                          |
| `staggerContainer`| Parent stagger (0.1s between children)           |
| `staggerHero`     | Tighter stagger (0.08s) with 0.1s delay          |
| `wordReveal`      | Per-word hero headline animation                 |
| `lineReveal`      | Clip-path reveal from bottom                     |
| `viewport`        | `{ once: true, amount: 0.2, margin: '-60px' }`  |

---

## 9. Development Notes

- **Constants over hardcoding**: All nav links, pipeline steps, differentiators, industries, and capabilities live in `src/lib/constants.js`
- **Section-local components**: Each page defines its section sub-components inline (e.g. `HeroSection`, `PipelineStep`) to keep routing clean
- **No test framework** currently configured
- **Accessibility**: Focus-visible outlines use `--color-accent`; skip link present; ARIA labels on nav, mobile menu dialog, and buttons
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all CSS animations and transitions; Framer Motion spring values collapse automatically
