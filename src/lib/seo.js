import { useEffect } from 'react'

export const SITE_NAME = 'Single Core Labs'
export const SITE_URL = 'https://singlecorelabs.in'
export const DEFAULT_TITLE = `${SITE_NAME} — Enterprise AI & Research`
export const DEFAULT_DESCRIPTION =
  'Single Core Labs is an applied AI research lab delivering enterprise AI solutions — RAG pipelines, fine-tuned models, and production deployment for healthcare, finance, and insurance.'

/** @type {Record<string, { title: string, description: string }>} */
export const PAGE_META = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/solutions': {
    title: `Enterprise AI Solutions & Services | ${SITE_NAME}`,
    description:
      'Agentic workflows, RAG systems, data engineering, and industry AI solutions for healthcare, finance, and insurance.',
  },
  '/enterprise': {
    title: `Enterprise AI Deployment | ${SITE_NAME}`,
    description:
      'On-site collaboration, air-gapped deployments, frontier model fine-tuning, and regulated MLOps for enterprise teams.',
  },
  '/case-studies': {
    title: `AI Case Studies | ${SITE_NAME}`,
    description:
      'Real-world agentic AI and enterprise ML outcomes across healthcare, finance, and regulated industries.',
  },
  '/contact': {
    title: `Contact & Book a Demo | ${SITE_NAME}`,
    description:
      'Talk to Single Core Labs about your enterprise AI project — tailored plans for production agentic systems.',
  },
  '/about': {
    title: `About Us | ${SITE_NAME}`,
    description: 'Learn about Single Core Labs — an applied AI research lab building enterprise AI solutions for precision, security, and scale.',
  },
  '/careers': {
    title: `Careers | ${SITE_NAME}`,
    description: 'Join Single Core Labs and build production-grade agentic AI for enterprise.',
  },
  '/blog': {
    title: `Blog | ${SITE_NAME}`,
    description: 'Insights on enterprise AI, RAG, MLOps, and production deployment.',
  },
}

/**
 * @param {string} pathname — react-router pathname, e.g. "/solutions"
 * @param {{ fallbackTitle?: string }} [options]
 */
export function usePageMeta(pathname, options = {}) {
  useEffect(() => {
    const meta = PAGE_META[pathname]
    const { fallbackTitle } = options

    document.title =
      meta?.title ??
      (fallbackTitle ? `${fallbackTitle} | ${SITE_NAME}` : DEFAULT_TITLE)

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.setAttribute('content', meta?.description ?? DEFAULT_DESCRIPTION)
  }, [pathname, options.fallbackTitle])
}
