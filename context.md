# Single Core Labs — Codebase Context

This document provides a comprehensive overview of the **Single Core Labs** corporate website codebase. It is intended for developers and AI agents to quickly understand the project architecture, design systems, and component structure.

---

## 1. Architectural Overview

*   **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks).
*   **Build Tool**: [Vite 8](https://vitejs.dev/) (ESM-based, high-speed HMR).
*   **Styling**: 
    *   **Tailwind CSS v4**: Utilizing the new `@theme` block in `index.css` for design tokens.
    *   **Vanilla CSS**: Used for custom utilities and layout variables in `index.css`.
*   **Animations**: [Framer Motion 12](https://www.framer.com/motion/) for scroll-triggered reveals, stagged entries, and smooth accordion transitions.
*   **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) integrated globally in `App.jsx` for a premium, momentum-based scrolling experience.
*   **Icons**: [Lucide React](https://lucide.dev/).
*   **Routing**: [React Router DOM 7](https://reactrouter.com/).

---

## 2. Directory Structure

```text
D:\new website\single-core-labs-website\
├── src/
│   ├── components/         # Shared global components (Navbar, Footer, etc.)
│   │   └── ui/             # Shadcn-style primitives (currently empty)
│   ├── lib/
│   │   ├── animations.js   # Framer Motion animation definitions
│   │   ├── constants.js    # Site-wide copy, links, and data arrays
│   │   └── utils.js        # Helper functions (clsx/tailwind-merge)
│   ├── pages/              # Top-level route pages (HomePage, SolutionsPage, etc.)
│   ├── App.jsx             # Main routing, Lenis scrolling, and provider setup
│   ├── index.css           # Global styles and Tailwind v4 Theme
│   └── main.jsx            # React entry point
├── public/                 # Static assets (Favicons, Logos)
└── tailwind.config.js      # Legacy compatibility
```

---

## 3. Component Breakdown & Page Structure

### Global Components (`src/components/`)
*   **`Navbar.jsx`**: Responsive navigation with mobile menu, blurred backdrop, links to the homepage, solutions, and enterprise pages.
*   **`Footer.jsx`**: Clean, elegant footer with social links, contact info, copyright, and a large brand watermark.
*   **`HorizontalRule.jsx`**: Styled thematic break element used to separate landing sections.
*   **`RevealText.jsx`**: Scroll-triggered text animation wrappers (`RevealText` and `StaggerReveal`) powered by Framer Motion.

### Top-Level Pages & Local Sections (`src/pages/`)
Each page contains local modular sub-components representing specific layout sections:

#### `HomePage.jsx`
*   **`HeroSection`**: Above-the-fold value proposition with subtitle and CTAs ("Book a Demo", "Explore Platform").
*   **`LogoMarquee`**: Horizontal auto-scrolling marquee showcasing industry origins (e.g. "BACKED BY ENGINEERS FROM Google, Meta, MIT...") with a static text label.
*   **`PhilosophySection`**: Clean, high-impact editorial block quoting the company's core approach.
*   **`PipelineSection`**: Step-by-step showcase of the core 5-stage deployment architecture.
*   **`DifferentiatorsSection`**: Highlights unique value propositions (Autonomous Loop, Privacy by Design, Full-Stack Delivery) with alternating layouts.
*   **`IndustriesSection`**: Interactive grid of target sectors (Healthcare, Finance, Logistics, etc.) with custom hover styles.
*   **`SocialProofSection`**: Summary of full-stack AI capabilities mapped to modern enterprise requirements.
*   **`CTASection`**: High-impact editorial contact block connecting directly to the main inquiry email.

#### `SolutionsPage.jsx`
*   **Editorial Services Accordion**: Features interactive expandable service blocks (Core AI, Data Engineering, Industry Solutions, Scientific Research, Governance & MLOps) that animate smoothly to show deep granular capability lists.

#### `EnterprisePage.jsx`
*   **Four Pillars Accordion**: Showcases core enterprise themes (Embedded Experts, Engineering Velocity, Applied AI Research, Enterprise Trust) through interactive expand/collapse panels highlighting delivery methodologies.

#### `ComingSoonPage.jsx`
*   **Fallback Template**: A minimalist coming-soon fallback for unmapped routes or draft pages.

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
    *   Updated the logo marquee on the homepage to prefix the scrolling text with "BACKED BY ENGINEERS FROM" (instead of "ENGINEERS FROM").
    *   Unified all section-specific components to be defined directly inside their respective page files (`HomePage.jsx`, `SolutionsPage.jsx`, `EnterprisePage.jsx`) to keep routing clean and simplify file structure.
    *   Removed `ResearchSection` and legacy draft folders (`sections/`, `primitives/`, `layout/`) to optimize clean directory organization.