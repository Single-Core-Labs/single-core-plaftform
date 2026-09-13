/**
 * check-links.mjs
 * Static link-integrity guard. Fails (exit 1) when:
 *   1. An internal <Link to> / href anywhere in src/ points to a route that
 *      is not registered in src/App.jsx (or to a blog/guide slug that
 *      doesn't exist in the content files).
 *   2. A URL listed in the sitemap (scripts/sitemap-config.mjs) does not
 *      resolve to a registered route.
 *   3. A GUIDE_ROUTES entry in the sitemap config doesn't match the actual
 *      guide slugs in src/lib/guide-content.jsx.
 *
 * Usage:  node scripts/check-links.mjs
 * Wired into `npm run ci` so broken links / sitemap entries fail CI.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { STATIC_ROUTES, GUIDE_ROUTES } from './sitemap-config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')

const errors = []
const warn = (msg) => console.warn(`  ⚠  ${msg}`)
const fail = (msg) => {
  console.error(`  ✗  ${msg}`)
  errors.push(msg)
}

// ── 1. Registered routes from src/App.jsx ────────────────────────────────────
const appSource = readFileSync(path.join(SRC, 'App.jsx'), 'utf-8')
const routePatterns = [...appSource.matchAll(/path="([^"]+)"/g)].map(m => m[1])

// ── 2. Slug extraction from content files (same convention as sitemap-config) ─
function extractTopLevelSlugs(file) {
  const src = readFileSync(path.join(SRC, 'lib', file), 'utf-8')
  const slugs = []
  // Only top-level slugs (4-space indent), not nested diagram slugs (8-space)
  for (const m of src.matchAll(/^ {4}slug:\s*['"]([^'"]+)['"]/gm)) {
    slugs.push(m[1])
  }
  return slugs
}

const BLOG_SLUGS = extractTopLevelSlugs('blog-content.jsx')
const GUIDE_SLUGS = extractTopLevelSlugs('guide-content.jsx')

// Expand dynamic route patterns into the concrete set of valid URLs
const routeSet = new Set()
for (const p of routePatterns) {
  if (p === '/blog/:postSlug') {
    for (const s of BLOG_SLUGS) routeSet.add(`/blog/${s}`)
  } else if (p === '/guides/:guideSlug') {
    for (const s of GUIDE_SLUGS) routeSet.add(`/guides/${s}`)
  } else {
    routeSet.add(p)
  }
}

// Dynamic route prefixes used to validate template-literal links,
// e.g. to={`/blog/${post.slug}`} → prefix '/blog/' must match a dynamic route
const dynamicPrefixes = routePatterns
  .filter(p => p.includes(':'))
  .map(p => p.split(':')[0]) // '/blog/:postSlug' → '/blog/'

// ── 3. Collect every internal link in src/ ───────────────────────────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (/\.(jsx|js)$/.test(entry) && !/\.config\./.test(entry)) out.push(full)
  }
  return out
}

const srcFiles = walk(SRC)
const linkPatterns = [
  /\bto="([^"]*)"/g,
  /\bto=\{`([^`]*)`\}/g,
  /\bhref="([^"]*)"/g,
  /\bhref=\{`([^`]*)`\}/g,
  /\b(?:to|href):\s*['"]([^'"]+)['"]/g,
  /\b(?:to|href):\s*`([^`]+)`/g,
]

function isSkippable(link) {
  return (
    !link ||
    link.startsWith('#') ||
    /^(https?:)?\/\//.test(link) ||
    link.startsWith('mailto:') ||
    link.startsWith('tel:') ||
    link.startsWith('data:')
  )
}

function checkLink(link, file, line) {
  // Template-literal link with dynamic part: validate its static prefix
  if (link.includes('${')) {
    const prefix = link.split('${')[0]
    if (!prefix.startsWith('/')) return // e.g. `#${...}` anchors
    const ok =
      dynamicPrefixes.some(dp => prefix.startsWith(dp) || dp.startsWith(prefix)) ||
      routeSet.has(prefix)
    if (!ok) fail(`${file}:${line}  template link "${link}" → no route matches prefix "${prefix}"`)
    return
  }
  if (isSkippable(link)) return
  if (!link.startsWith('/')) {
    warn(`${file}:${line}  non-absolute internal link "${link}" (relative links break on nested routes)`)
    return
  }
  if (!routeSet.has(link)) {
    fail(`${file}:${line}  link "${link}" → no matching route in src/App.jsx`)
  }
}

let linkCount = 0
for (const file of srcFiles) {
  const rel = path.relative(ROOT, file)
  const src = readFileSync(file, 'utf-8')
  const lines = src.split('\n')
  for (let i = 0; i < lines.length; i++) {
    for (const pattern of linkPatterns) {
      pattern.lastIndex = 0
      for (const m of lines[i].matchAll(pattern)) {
        linkCount++
        checkLink(m[1], rel, i + 1)
      }
    }
  }
}

// ── 4. Sitemap ⊆ routes ──────────────────────────────────────────────────────
for (const route of STATIC_ROUTES) {
  if (!routeSet.has(route.path)) {
    fail(`sitemap route "${route.path}" → no matching route in src/App.jsx`)
  }
}

// ── 5. GUIDE_ROUTES vs actual guide slugs ────────────────────────────────────
const guideRoutePaths = new Set(GUIDE_ROUTES.map(g => g.path))
for (const s of GUIDE_SLUGS) {
  if (!guideRoutePaths.has(`/guides/${s}`)) {
    warn(`guide "/guides/${s}" exists in src/lib/guide-content.jsx but is missing from GUIDE_ROUTES in scripts/sitemap-config.mjs`)
  }
}
for (const g of GUIDE_ROUTES) {
  if (g.path !== '/guides' && !GUIDE_SLUGS.includes(g.path.replace('/guides/', ''))) {
    fail(`GUIDE_ROUTES entry "${g.path}" → no such slug in src/lib/guide-content.jsx`)
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
console.log(`\n🔗  Link check: scanned ${srcFiles.length} files, ${linkCount} link occurrences, ${routePatterns.length} routes, ${STATIC_ROUTES.length} sitemap URLs\n`)

// Informational: valid routes missing from the sitemap (not an error —
// e.g. the 404 page is deliberately excluded)
const sitemapPaths = new Set(STATIC_ROUTES.map(r => r.path))
const notInSitemap = [...routeSet].filter(p => !sitemapPaths.has(p))
if (notInSitemap.length) {
  console.log(`  ℹ  Not in sitemap (info only): ${notInSitemap.join(', ')}\n`)
}

if (errors.length > 0) {
  console.error(`❌  ${errors.length} broken link${errors.length === 1 ? '' : 's'} found.\n`)
  process.exit(1)
}
console.log('✅  All internal links and sitemap URLs resolve to registered routes.\n')