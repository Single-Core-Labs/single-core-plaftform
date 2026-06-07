# Single Core Labs Website - Codebase Context

Last updated: 2026-06-07

This file is a practical orientation guide for developers and AI agents working on the Single Core Labs website. It summarizes the actual project structure, routing, content flow, build pipeline, and important implementation notes.

## Project Summary

Single Core Labs is a static React marketing and content site for an enterprise AI and applied research company. The site presents company positioning, solutions, enterprise capabilities, healthcare AI services, research papers, blog posts, case studies, and contact/demo forms.

The app is built as a client-rendered React SPA, then enhanced at build time with sitemap generation and Puppeteer prerendering so crawlers receive rendered HTML for important routes.

## Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS v4 through `@tailwindcss/vite`
- Framer Motion 12 for page animation and scroll effects
- Lenis for global smooth scrolling
- Lucide React for icons
- React Helmet Async for per-page metadata
- Supabase JS for form submissions and optional build-time blog sitemap data
- Puppeteer for prerendering `dist/` routes after production build

Node and npm requirements:

- Node: `>=20.0.0`
- npm: `>=10.0.0`
- `.nvmrc` currently pins Node major version `20`

## Important Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
npm run ci
```

Notes:

- `npm run dev` currently runs `npm install && vite`, so it mutates dependencies before starting Vite.
- `npm run build` runs `prebuild` first, which generates `public/sitemap.xml`.
- `npm run build` also runs `postbuild`, which prerenders key routes into `dist/`.
- `npm run ci` runs lint and build.

## Top-Level Files

```text
index.html                Vite HTML shell, fonts, static metadata, root node
package.json              Dependencies, scripts, Node/npm engines
vite.config.js            React/Tailwind plugins, @ alias, manual chunking
tailwind.config.js        Tailwind config compatibility file
eslint.config.js          Flat ESLint config
render.yaml               Render static-site deployment config
README.md                 Short setup and CI/CD notes
context.md                This orientation document
public/                   Static assets, redirects, robots, generated sitemap
scripts/                  Sitemap and prerender scripts
src/                      React application source
```

## Source Layout

```text
src/
  App.jsx                 Router, lazy page imports, global Lenis setup
  main.jsx                React root wrapped in HelmetProvider
  index.css               Tailwind v4 theme tokens, global CSS, shared classes

  components/
    AIAgentWidget.jsx     Floating widget used by AIModernizationPage
    ChatModal.jsx         Modal UI
    Footer.jsx            Global footer
    HorizontalRule.jsx    Animated divider
    Navbar.jsx            Global nav, dropdowns, mobile overlay
    PoweredBySection.jsx  Partner/provider logo flow section
    RevealText.jsx        IntersectionObserver reveal helpers
    ScrollScene.jsx       Framer Motion scroll/3D primitives
    SEO.jsx               Helmet metadata component used by pages

  pages/
    HomePage.jsx
    SolutionsPage.jsx
    HealthcareIntelligencePage.jsx
    EnterprisePage.jsx
    ContactPage.jsx
    CaseStudiesPage.jsx
    BlogPage.jsx
    BlogPost.jsx
    AboutPage.jsx
    GuidesPage.jsx
    ResearchPage.jsx
    SemanticCachePaper.jsx
    AiVsCloudPage.jsx
    IndianAiCloudAlternativePage.jsx
    AIModernizationPage.jsx
    ComingSoonPage.jsx

  content/blog/
    large-language-models.jsx
    medical-imaging-ai.jsx
    why-sovereign-ai-matters.jsx

  data/
    blog-posts.json

  lib/
    animations.js         Shared Framer Motion variants
    blog.js               Blog metadata/content lookup helpers
    constants.js          Nav links, contact email, homepage data
    seo.js                Alternate metadata helper/constants
    supabase.js           Optional Supabase client
    utils.js              `cn()` helper using clsx + tailwind-merge
```

## Routing

Routes live in `src/App.jsx`. Most pages are lazy loaded. `HomePage` is eagerly imported.

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `HomePage` | Main landing page |
| `/solutions` | `SolutionsPage` | Enterprise AI services |
| `/solutions/healthcare-intelligence` | `HealthcareIntelligencePage` | Healthcare AI service page |
| `/enterprise` | `EnterprisePage` | Enterprise deployment/collaboration page |
| `/contact` | `ContactPage` | Demo/contact form |
| `/case-studies` | `CaseStudiesPage` | Case study cards |
| `/blog` | `BlogPage` | Blog index |
| `/blog/:slug` | `BlogPost` | Static local blog content by slug |
| `/about` | `AboutPage` | Company/about page with contact form |
| `/guides` | `GuidesPage` | Guide listing |
| `/research` | `ResearchPage` | Research listing |
| `/research/semantic-cache` | `SemanticCachePaper` | Long-form research paper page |
| `/ai-infrastructure-vs-cloud` | `AiVsCloudPage` | Comparison/content landing page |
| `/indian-ai-cloud-market-alternative` | `IndianAiCloudAlternativePage` | Market alternative content page |
| `/:slug` | `ComingSoonPage` | Catch-all fallback |

Route upkeep:

- Keep `src/App.jsx`, `scripts/sitemap-config.mjs`, and `scripts/prerender.mjs` in sync.
- Dynamic catch-all routes are not prerendered.
- `AIModernizationPage.jsx` exists but is not currently mounted in `App.jsx`.

## Navigation

Primary nav data starts in `src/lib/constants.js`:

```js
export const NAV_LINKS = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
]
```

`src/components/Navbar.jsx` also defines local dropdown data for:

- Solutions dropdown
- Resources dropdown
- Enterprise dropdown
- Industries list
- Mobile full-screen menu

When changing navigation, check both `constants.js` and `Navbar.jsx`.

## Content System

Blog metadata lives in `src/data/blog-posts.json`.

Full blog article bodies live as React components in `src/content/blog/*.jsx`.

`src/lib/blog.js` maps each slug to its article component:

```js
const CONTENT_MAP = {
  'large-language-models': LargeLanguageModelsContent,
  'medical-imaging-ai': MedicalImagingAIContent,
  'why-sovereign-ai-matters': WhySovereignAiMattersContent,
}
```

To add a blog post:

1. Add metadata to `src/data/blog-posts.json`.
2. Add a matching content component in `src/content/blog/`.
3. Import it and add it to `CONTENT_MAP` in `src/lib/blog.js`.
4. Add the route to `scripts/prerender.mjs` if it should be prerendered.

Current local blog slugs:

- `medical-imaging-ai`
- `large-language-models`
- `why-sovereign-ai-matters`

## SEO And Metadata

The page-level pattern currently used across the app is `src/components/SEO.jsx`, which wraps `react-helmet-async`.

`src/main.jsx` wraps the app with `HelmetProvider`, so `SEO` can be used from any route component.

Important note:

- `src/components/SEO.jsx` currently uses `https://singlecorelabs.com` as its internal `siteUrl`.
- `src/lib/seo.js` and sitemap generation use `https://singlecorelabs.in`.
- If canonical and Open Graph URLs matter for a change, align these domains intentionally.

`src/lib/seo.js` exports `SITE_NAME`, `SITE_URL`, `PAGE_META`, and `usePageMeta()`, but the main route pages currently use `components/SEO.jsx` instead.

## Styling And Design System

Global styling is concentrated in `src/index.css`.

Key patterns:

- Tailwind v4 theme tokens are defined in an `@theme` block.
- The site is light-first with dark section overrides.
- Shared typography classes include `.text-hero`, `.text-display`, `.text-editorial`, `.text-body`, `.text-eyebrow`, and `.text-label`.
- Shared layout classes include `.container-editorial` and `.container-narrow`.
- Shared button classes include `.btn-primary` and `.btn-outline`.
- `@media (prefers-reduced-motion: reduce)` disables CSS animations/transitions.

Core tokens:

```css
--font-serif: 'Newsreader', Georgia, serif;
--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-display: 'Outfit', 'Inter', ui-sans-serif, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--color-bg: #FAFAFA;
--color-bg-elevated: #F0EFED;
--color-bg-surface: #E8E6E2;
--color-bg-dark: #0A0A0A;
--color-text: #1A1A1A;
--color-text-muted: #525252;
--color-text-dim: #909090;
--color-accent: #00695C;
--color-border: rgba(0, 0, 0, 0.08);
--color-border-strong: rgba(0, 0, 0, 0.15);
```

Many page components use inline style objects heavily. When editing, prefer matching the local style pattern in that file over introducing a new styling system.

## Animation System

Shared animation variants are in `src/lib/animations.js`.

`src/components/ScrollScene.jsx` provides reusable Framer Motion primitives:

- `ParallaxLayer`
- `ScrollRotate`
- `ScrollScale`
- `ScrollFade3D`
- `Card3D`
- `SectionDepth`

The homepage, about page, research pages, and service pages use these to create scroll depth, fade-up sections, card tilt, and parallax effects.

Global smooth scrolling is initialized once in `App.jsx` through Lenis.

## Forms And Supabase

`src/lib/supabase.js` creates a Supabase client only when both env vars exist:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

If either env var is missing, `supabase` is `null` and a console warning is emitted.

Form usage:

- `ContactPage.jsx` submits to the `contact_submissions` table.
- `AboutPage.jsx` also submits contact-style data to `contact_submissions`.

Important risk:

- The form pages call `supabase.from(...)` directly. If Supabase env vars are missing at runtime, `supabase` will be `null`, so submissions can fail unless the page guards against that.

## Build-Time Sitemap

`scripts/generate-sitemap.mjs` writes `public/sitemap.xml`.

Data sources:

- Static routes from `scripts/sitemap-config.mjs`
- Local blog metadata from `src/data/blog-posts.json`
- Optional Supabase rows from table `blog_posts` when build-time env vars are configured

Merge behavior:

- Local blog posts are loaded first.
- Supabase blog entries win on slug collision.

Keep `STATIC_ROUTES` current when adding or removing public pages.

## Build-Time Prerendering

`scripts/prerender.mjs` runs automatically as the `postbuild` script.

Workflow:

1. Starts Vite preview against `dist/` on port `4173`.
2. Launches headless Chromium with Puppeteer.
3. Visits a hardcoded route list.
4. Writes rendered HTML to `dist/<route>/index.html`.
5. Fails the build if any route fails to prerender.

CI installs Chromium with:

```bash
npx puppeteer browsers install chrome
```

When adding important public routes, add them to the `ROUTES` array in `scripts/prerender.mjs`.

## Deployment

Deployment is configured for Render in `render.yaml`.

Render settings:

- Runtime: static web service
- Build command: `npm ci && npm run build`
- Publish path: `./dist`
- Cache-Control header: `no-cache`
- SPA fallback rewrite: `/* -> /index.html`

GitHub Actions CI is defined in `.github/workflows/ci.yml`:

- Runs on push and pull request to `main`
- Uses `.nvmrc`
- Runs `npm ci`
- Installs Puppeteer Chrome
- Runs `npm run lint`
- Runs `npm run build`
- Uploads `dist/` as an artifact

## Assets

Static public assets:

```text
public/favicon.svg
public/icons.svg
public/logo.webp
public/logo-small.webp
public/logo-icon.png
public/manav.jpg
public/partners/*.png
public/robots.txt
public/_redirects
```

Source assets:

```text
src/assets/hero.png
src/assets/*.webp
src/assets/*.jpg
src/assets/react.svg
src/assets/vite.svg
```

Use `public/` for assets referenced by absolute public paths such as `/logo.webp`.

## Path Aliases

Vite defines:

```js
'@': './src'
```

Most source imports use this alias, for example:

```js
import SEO from '@/components/SEO'
import { supabase } from '@/lib/supabase'
```

## Known Gotchas

- Some existing files and older docs contain mojibake from prior encoding issues. Prefer clean UTF-8/ASCII when updating documentation.
- `SEO.jsx` uses `.com`, while sitemap and `lib/seo.js` use `.in`.
- `sitemap-config.mjs` includes `/careers`, but `App.jsx` does not mount a dedicated `/careers` route. It currently falls through to `ComingSoonPage`.
- `AIModernizationPage.jsx` exists but is not mounted in the router.
- `src/lib/seo.js` is not the dominant metadata pattern; pages mostly use `components/SEO.jsx`.
- `ContactPage.jsx` and `AboutPage.jsx` assume the Supabase client is usable when submitting.
- `npm run dev` runs `npm install`, which can alter `package-lock.json` if dependencies drift.
- `.gitignore` includes `.gitignore` and `settings.json`; be intentional when changing tracked ignore/config files.
- `public/sitemap.xml` is generated and ignored.

## Editing Checklist

For a new public page:

1. Create the page in `src/pages/`.
2. Add a lazy import and route in `src/App.jsx`.
3. Add navigation entries if needed in `Navbar.jsx` and/or `src/lib/constants.js`.
4. Add metadata with `components/SEO.jsx`.
5. Add the route to `scripts/sitemap-config.mjs`.
6. Add the route to `scripts/prerender.mjs` if it should produce static HTML.
7. Run `npm run lint` and `npm run build`.

For a new blog post:

1. Add metadata in `src/data/blog-posts.json`.
2. Add the content component under `src/content/blog/`.
3. Update `CONTENT_MAP` in `src/lib/blog.js`.
4. Add `/blog/<slug>` to `scripts/prerender.mjs` if desired.
5. Run `npm run build` to regenerate sitemap and prerender HTML.

For form changes:

1. Check Supabase env handling in `src/lib/supabase.js`.
2. Confirm table name and inserted column names.
3. Handle missing Supabase configuration gracefully.
4. Verify success and error states.

For SEO changes:

1. Prefer the current per-page `components/SEO.jsx` pattern.
2. Check canonical domain consistency.
3. Update sitemap routes if URL surface changes.
4. Build and inspect generated `public/sitemap.xml`/`dist/` output.
