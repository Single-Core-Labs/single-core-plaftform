/**
 * Central sitemap route registry — keep in sync with src/App.jsx.
 */

export const SITE_URL = 'https://singlecorelabs.in'

export const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
]
