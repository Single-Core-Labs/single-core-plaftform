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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const DIST      = path.join(ROOT, 'dist')
const PORT      = 4173

// ─── All routes to pre-render ────────────────────────────────────────────────
// Keep in sync with App.jsx. Dynamic /:slug routes use ComingSoon so skip them.
const ROUTES = [
  '/',
  '/solutions',
  '/solutions/healthcare-intelligence',
  '/solutions/ai-modernization',
  '/enterprise',
  '/contact',
  '/case-studies',
  '/blog',
  '/blog/medical-imaging-ai',
  '/blog/large-language-models',
  '/blog/why-sovereign-ai-matters',
  '/about',
  '/guides',
  '/research',
  '/research/semantic-cache',
  '/security',
  '/deployment',
  '/ai-infrastructure-vs-cloud',
  '/indian-ai-cloud-market-alternative',
]

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

      const html = await page.content()

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
