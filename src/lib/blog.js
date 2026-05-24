import posts from '@/data/blog-posts.json'
import LargeLanguageModelsContent from '@/content/blog/large-language-models'

/** @type {Record<string, React.ComponentType>} */
const CONTENT_MAP = {
  'large-language-models': LargeLanguageModelsContent,
}

/** @returns {Array<import('@/data/blog-posts.json')[number] & { Content?: React.ComponentType }>} */
export function getAllPosts() {
  return posts.map((meta) => ({
    ...meta,
    Content: CONTENT_MAP[meta.slug],
  }))
}

/** @param {string} slug */
export function getPostBySlug(slug) {
  const meta = posts.find((p) => p.slug === slug)
  if (!meta) return null
  return {
    ...meta,
    Content: CONTENT_MAP[slug] ?? null,
  }
}

/** @param {string} slug @param {number} [limit] */
export function getRelatedPosts(slug, limit = 3) {
  return posts.filter((p) => p.slug !== slug).slice(0, limit)
}
