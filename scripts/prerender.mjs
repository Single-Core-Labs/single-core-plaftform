/**
 * prerender.mjs
 * Starts Vite's own preview server against dist/, then uses Puppeteer to
 * visit every route and write fully-rendered HTML so crawlers / AI tools
 * get real content instead of an empty React shell.
 *
 * Usage:  node scripts/prerender.mjs
 * Called automatically after build via the `postbuild` npm hook.
 */

import puppeteer from 'puppeteer'
import { preview } from 'vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import { mkdirSync } from 'node:fs'
import { STATIC_ROUTES } from './sitemap-config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const DIST      = path.join(ROOT, 'dist')
const PORT      = 4173

// ─── Route list — single source of truth ─────────────────────────────────────
// Routes are imported from scripts/sitemap-config.mjs (STATIC_ROUTES), the
// same registry that generates public/sitemap.xml. Sitemap and prerender can
// therefore never drift apart. Register new pages in sitemap-config.mjs ONLY.
const ROUTES = STATIC_ROUTES.map((r) => r.path)

// ─── Strip duplicate homepage meta tags from pre-rendered HTML ───────────────
// index.html contains hardcoded homepage OG / Twitter / title / description
// tags.  react-helmet-async injects the correct per-page tags later in <head>.
// Crawlers (LinkedIn, Twitter) read the *first* og:title they find, so we must
// remove the homepage defaults and keep only Helmet's tags.
//
// We match by EXACT content values from index.html so we never accidentally
// strip Helmet's per-page tags.
function cleanDuplicateMeta(html) {
  return html
    // Remove the hardcoded homepage <title>
    .replace(/<title>Single Core Labs — AI Infrastructure, Data &amp; Intelligence<\/title>/, '')
    // Remove hardcoded homepage meta description
    .replace(/<meta\s+name="description"\s+content="Single Core Labs builds AI infrastructure[^"]*"\s*\/?>/, '')
    // Remove hardcoded homepage robots
    .replace(/<meta\s+name="robots"\s+content="index, follow"\s*\/?>/, '')
    // Remove hardcoded homepage canonical (exact root URL only)
    .replace(/<link\s+rel="canonical"\s+href="https:\/\/singlecorelabs\.in\/"\s*\/?>/, '')
    // Remove hardcoded homepage OG tags (match by exact homepage content values)
    .replace(/<meta\s+property="og:type"\s+content="website"\s*\/?>\s*\n?\s*<meta\s+property="og:site_name"\s+content="Single Core Labs"\s*\/?>\s*\n?\s*<meta\s+property="og:title"\s+content="Single Core Labs[^"]*"\s*\/?>\s*\n?\s*<meta\s+property="og:description"\s+content="Applied AI research lab\.[^"]*"\s*\/?>\s*\n?\s*<meta\s+property="og:url"\s+content="https:\/\/singlecorelabs\.in\/"\s*\/?>\s*\n?\s*<meta\s+property="og:image"\s+content="https:\/\/singlecorelabs\.in\/og-image\.png"\s*\/?>\s*\n?\s*<meta\s+property="og:image:alt"[^>]*\/?>\s*\n?\s*<meta\s+property="og:image:width"[^>]*\/?>\s*\n?\s*<meta\s+property="og:image:height"[^>]*\/?>/, '')
    // Remove hardcoded homepage Twitter Card tags (match by exact homepage content)
    .replace(/<meta\s+name="twitter:card"\s+content="summary_large_image"\s*\/?>\s*\n?\s*<meta\s+name="twitter:title"\s+content="Single Core Labs[^"]*"\s*\/?>\s*\n?\s*<meta\s+name="twitter:description"\s+content="AI at scale\.[^"]*"\s*\/?>\s*\n?\s*<meta\s+name="twitter:image"\s+content="https:\/\/singlecorelabs\.in\/og-image\.png"\s*\/?>/, '')
    // Remove sitemap link (Helmet doesn't add this, keep it if present)
    // Clean up blank lines left behind
    .replace(/\n{3,}/g, '\n\n')
}

async function prerender() {
  console.log('\n🔧  Pre-render starting...\n')

  // 1. Start Vite preview server (serves built dist/)
  const server = await preview({
    root: ROOT,
    preview: {
      port: PORT,
      strictPort: true,
      open: false,
    },
  })
  const base = `http://localhost:${PORT}`
  console.log(`  ✓ Vite preview server on ${base}\n`)

  // 2. Launch headless Chromium via Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  })
  console.log('  ✓ Puppeteer browser launched\n')

  // 3. Visit every route, grab fully-rendered HTML, write to dist/
  let passed = 0
  let failed = 0

  for (const route of ROUTES) {
    const page = await browser.newPage()
    try {
      await page.goto(`${base}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 10_000,
      })

      // Extra wait for lazy-loaded / animated content to settle
      await new Promise(r => setTimeout(r, 600))

      let html = await page.content()

      // Strip duplicate homepage meta tags so crawlers see only Helmet's tags
      html = cleanDuplicateMeta(html)

      // Write to dist/<route>/index.html
      const outDir  = path.join(DIST, route === '/' ? '' : route)
      mkdirSync(outDir, { recursive: true })
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8')

      console.log(`  ✓  ${route}`)
      passed++
    } catch (err) {
      console.warn(`  ✗  ${route}  →  ${err.message}`)
      failed++
    } finally {
      await page.close()
    }
  }

  // 4. Clean up
  await browser.close()
  server.httpServer.close()

  console.log(`\n✅  Pre-render complete — ${passed} succeeded, ${failed} failed.\n`)

  if (failed > 0) process.exit(1)
}

prerender().catch(err => {
  console.error('\n❌  Pre-render crashed:', err)
  process.exit(1)
})
