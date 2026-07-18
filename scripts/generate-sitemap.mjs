/**
 * Build-time sitemap generator for https://singlecorelabs.in
 * Run via: npm run generate:sitemap (also runs automatically before vite build)
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'
import {
  SITE_URL,
  STATIC_ROUTES,
  BLOG_POST_PRIORITY,
  BLOG_TABLE,
} from './sitemap-config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT = join(ROOT, 'public', 'sitemap.xml')
const LOCAL_POSTS = join(ROOT, 'src', 'data', 'blog-posts.json')

/**
 * @typedef {{ path: string, priority: number, changefreq: string, lastmod?: string }} StaticRoute
 * @typedef {{ slug: string, lastmod?: string, updated_at?: string, published_at?: string }} BlogEntry
 */

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toLastmod(value) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 10)
}

function buildUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL.replace(/\/$/, '')}${normalized}`
}

/**
 * @param {StaticRoute[]} routes
 * @param {BlogEntry[]} blogPosts
 */
function buildSitemapXml(routes, blogPosts) {
  const today = new Date().toISOString().slice(0, 10)

  const staticEntries = routes.map((route) => {
    const lastmod = route.lastmod ? toLastmod(route.lastmod) : today
    return `  <url>
    <loc>${escapeXml(buildUrl(route.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
  })

  const blogEntries = blogPosts.map((post) => {
    const lastmod =
      toLastmod(post.lastmod) ||
      toLastmod(post.updated_at) ||
      toLastmod(post.published_at) ||
      today
    return `  <url>
    <loc>${escapeXml(buildUrl(`/blog/${post.slug}`))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${BLOG_POST_PRIORITY.toFixed(2)}</priority>
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join('\n')}
</urlset>
`
}

function loadLocalBlogPosts() {
  if (!existsSync(LOCAL_POSTS)) return []
  try {
    const raw = readFileSync(LOCAL_POSTS, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data.filter((p) => p?.slug) : []
  } catch (err) {
    console.warn('[sitemap] Could not read blog-posts.json:', err.message)
    return []
  }
}

async function fetchSupabaseBlogPosts() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.log('[sitemap] Supabase not configured — using src/data/blog-posts.json only')
    return []
  }

  const supabase = createClient(url, key, {
    realtime: { transport: WebSocket },
  })
  const { data, error } = await supabase
    .from(BLOG_TABLE)
    .select('slug, updated_at, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.warn(`[sitemap] Supabase "${BLOG_TABLE}" fetch failed:`, error.message)
    return []
  }

  return (data ?? []).filter((row) => row?.slug)
}

/** Merge Supabase + local JSON; Supabase wins on slug collision. */
function mergeBlogPosts(supabasePosts, localPosts) {
  const bySlug = new Map()
  for (const post of localPosts) {
    bySlug.set(post.slug, post)
  }
  for (const post of supabasePosts) {
    bySlug.set(post.slug, post)
  }
  return [...bySlug.values()]
}

async function main() {
  const [supabasePosts, localPosts] = await Promise.all([
    fetchSupabaseBlogPosts(),
    Promise.resolve(loadLocalBlogPosts()),
  ])

  const blogPosts = mergeBlogPosts(supabasePosts, localPosts)
  const xml = buildSitemapXml(STATIC_ROUTES, blogPosts)

  writeFileSync(OUTPUT, xml, 'utf8')

  const total = STATIC_ROUTES.length + blogPosts.length
  console.log(
    `[sitemap] Wrote ${OUTPUT} (${total} URLs: ${STATIC_ROUTES.length} static, ${blogPosts.length} blog)`
  )
}

main().catch((err) => {
  console.error('[sitemap] Generation failed:', err)
  process.exit(1)
})
