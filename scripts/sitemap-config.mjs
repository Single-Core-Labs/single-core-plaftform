/**
 * Central sitemap route registry — keep in sync with src/App.jsx and navigation.
 * "services" maps to /solutions (SolutionsPage).
 *
 * Blog slugs are auto-extracted from src/lib/blog-content.jsx so you never
 * need to manually sync them here.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function extractBlogSlugs() {
  const src = readFileSync(
    path.join(ROOT, 'src', 'lib', 'blog-content.jsx'),
    'utf-8',
  )
  const slugs = []
  // Match only top-level blog post slugs (4-space indent), not nested
  // diagram/guide-link slugs (8-space indent)
  for (const m of src.matchAll(/^ {4}slug:\s*['"]([^'"]+)['"]/gm)) {
    slugs.push(m[1])
  }
  return slugs
}

export const SITE_URL = 'https://singlecorelabs.in'

/** @type {import('./generate-sitemap.mjs').StaticRoute[]} */
export const GUIDE_ROUTES = [
  { path: '/guides', priority: 0.9, changefreq: 'weekly' },
  { path: '/guides/sovereign-ai-infrastructure', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/agentic-workflows', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/llm-fine-tuning', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/semantic-caching', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/healthcare-data-pipelines', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/llm-security-patterns', priority: 0.8, changefreq: 'monthly' },
]

export const BLOG_SLUGS = extractBlogSlugs()


export const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
]
