# Single Core Labs — Codebase Context

This document provides a comprehensive overview of the **Single Core Labs** corporate website codebase. It is intended for developers and AI agents to quickly understand the project architecture, design systems, and component structure.

---

## 1. Architectural Overview

*   **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks).
*   **Build Tool**: [Vite 8](https://vitejs.dev/) (ESM-based, high-speed HMR).
*   **Styling**: 
    *   **Tailwind CSS v4**: Utilizing the new `@theme` block in `index.css` for design tokens.
    *   **Vanilla CSS**: Used for specialized components like `StarBorder`.
*   **Animations**: [Framer Motion 12](https://www.framer.com/motion/) for scroll-triggered reveals and interactive states.
*   **Icons**: [Lucide React](https://lucide.dev/).
*   **Routing**: [React Router DOM 7](https://reactrouter.com/).

---

## 2. Directory Structure

```text
D:\new website\single-core-labs-website\
├── src/
│   ├── components/
│   │   ├── layout/         # Persistent UI (Navbar, Footer, Wrappers)
│   │   ├── primitives/     # Reusable atomic UI elements (Badges, Orbs)
│   │   └── sections/       # Major homepage content blocks
│   ├── lib/
│   │   ├── animations.js   # Framer Motion variant definitions
│   │   ├── constants.js    # Site-wide copy, links, and data arrays
│   │   └── utils.js        # Helper functions (clsx/tailwind-merge)
│   ├── pages/              # Top-level route components
│   ├── assets/             # Static images and SVGs
│   ├── App.jsx             # Main routing and provider setup
│   ├── index.css           # Global styles and Tailwind v4 Theme
│   └── main.jsx            # React entry point
├── public/                 # Static assets (Favicons, Logos)
└── tailwind.config.js       # Legacy compatibility (Primary config in index.css)
```

---

## 3. Component Breakdown

### Layout Components (`src/components/layout/`)
*   **`Navbar.jsx`**: Responsive navigation with mobile menu and blurred backdrop.
*   **`Footer.jsx`**: Clean, informative footer with social links (LinkedIn) and a large brand watermark.
*   **`SectionWrapper.jsx`**: A semantic wrapper that handles standard spacing, background colors (`odd`/`even`), and optional decorative background orbs.

### Section Components (`src/components/sections/`)
*   **`HeroSection.jsx`**: Above-the-fold value proposition with animated badge and "Book Demo" CTA.
*   **`ServicesSection.jsx`**: Core "Core Pipeline" layout showcasing the 6-step linear AI architecture.
*   **`ConversationalAISection.jsx`**: A high-impact interactive diagram. Features an **End-to-End Architecture Flowchart** connected to a simulated **Terminal Console** that streams telemetry data on hover.
*   **`DifferentiatorsSection.jsx`**: High-authority section highlighting unique value propositions with dark aesthetic and bold typography.
*   **`VerticalsSection.jsx`**: Grid-based display of industry-specific AI solutions (Healthcare, Finance, Logistics).
*   **`SocialProofSection.jsx`**: Trust indicators including engineer pedigree from top-tier institutions.
*   **`CTASection.jsx`**: Final conversion block before the footer.

### Primitive UI (`src/components/primitives/`)
*   **`AnimatedBadge.jsx`**: Pill-shaped label with subtle entry animations.
*   **`GradientText.jsx`**: Utility for applying the brand gradient to text strings.
*   **`GradientOrb.jsx`**: Decorative blurred background elements for atmosphere.
*   **`StarBorder.jsx`**: A premium CTA component with a rotating "shimmer" border effect.

---

## 4. Design System (Tokens)

Design tokens are centralized in `src/index.css` using Tailwind v4 syntax:

*   **Colors**:
    *   `--color-brand-cyan`: `#00F5D4` (Primary highlight)
    *   `--color-brand-green`: `#22C55E`
    *   `--color-brand-blue`: `#3B82F6`
    *   `--color-dark-bg`: `#080810`
*   **Typography**:
    *   `font-serif`: 'Newsreader' (Used for `text-hero` and `text-display`)
    *   `font-sans`: 'Inter' (Body copy and UI labels)
    *   `font-mono`: 'JetBrains Mono' (Terminal and system logs)

---

## 5. Animation Patterns

Animations are standardized in `src/lib/animations.js`:
*   **`fadeUp`**: Classic reveal animation with a slight upward translation.
*   **`staggerContainer`**: Used on parent elements to delay children reveals incrementally.
*   **`viewport`**: Default config for `whileInView` triggers (usually with `once: true`).

---

## 6. Development Notes

*   **Constants over Hardcoding**: Most list data (links, service descriptions, logos) is managed in `src/lib/constants.js`.
*   **CSpell Configuration**: Technical terms like `DICOM` and `monai` are ignored via top-of-file comments in relevant components.
*   **Recent Updates**: 
    *   The `ResearchSection` and "Research" navigation links were removed until publication.
    *   The `ConversationalAISection` was transformed from a list into a visual tree/flowchart diagram.