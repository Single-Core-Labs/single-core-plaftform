# Single Core Labs — Website

Enterprise AI & research company site built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. Deployed as a static site on [Render](https://render.com).

## Requirements

- Node.js **20+** (see `.nvmrc`)
- npm **10+**

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Production build → `dist/` (runs sitemap generation first) |
| `npm run lint` | ESLint |
| `npm run ci` | Lint + build (same checks as CI) |
| `npm run preview` | Preview production build locally |

## Local development

```bash
npm ci
npm run dev
```

## CI/CD

### Continuous integration (GitHub Actions)

On every push and pull request to `main`, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs:

1. `npm ci` — clean install from lockfile  
2. `npm run lint` — ESLint  
3. `npm run build` — Vite production build + sitemap  
4. Uploads `dist/` as a workflow artifact  

### Continuous deployment (Render)

[`render.yaml`](render.yaml) defines a static site:

- **Build:** `npm ci && npm run build`
- **Publish:** `./dist`
- **SPA routing:** all routes → `index.html`

Connect the GitHub repo in the Render dashboard with **auto-deploy** enabled on `main`. After CI passes, Render deploys the latest commit automatically.

Optional env vars on Render (for dynamic blog URLs in sitemap):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Project structure

```text
src/
  components/     # UI sections (Navbar, Footer, PoweredBySection, …)
  pages/          # Route pages
  lib/            # SEO, constants, utilities
public/           # Static assets, robots.txt, partner logos
scripts/          # Build-time sitemap generator
```
