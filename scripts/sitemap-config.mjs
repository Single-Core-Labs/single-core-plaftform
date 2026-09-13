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
  { path: '/product', priority: 0.9, changefreq: 'weekly' },
  { path: '/product/data-foundry', priority: 0.9, changefreq: 'weekly' },
  { path: '/training', priority: 0.9, changefreq: 'weekly' },
  { path: '/model-lab', priority: 0.9, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly', comment: 'What We Build' },
  { path: '/solutions', priority: 0.9, changefreq: 'monthly', comment: 'Services' },
  { path: '/solutions/healthcare-intelligence', priority: 0.9, changefreq: 'monthly' },
  { path: '/solutions/rl-environments', priority: 0.9, changefreq: 'monthly' },
  { path: '/solutions/rl-lab', priority: 0.9, changefreq: 'monthly' },
  { path: '/solutions/tech', priority: 0.9, changefreq: 'monthly' },
  { path: '/enterprise', priority: 0.85, changefreq: 'monthly' },
  { path: '/case-studies', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/security', priority: 0.85, changefreq: 'monthly' },
  { path: '/deployment', priority: 0.85, changefreq: 'monthly' },
  { path: '/research', priority: 0.85, changefreq: 'monthly' },
  { path: '/research-collective', priority: 0.85, changefreq: 'monthly' },
  { path: '/open', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'weekly' },
  { path: '/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'monthly' },
  ...BLOG_SLUGS.map(s => ({ path: `/blog/${s}`, priority: 0.8, changefreq: 'monthly' })),
  ...GUIDE_ROUTES,
]

export const BLOG_TABLE = 'blog_posts'
