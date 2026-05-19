// ─── Site-wide constants ───────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Solutions',  href: '/solutions'  },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Contact',    href: '#contact'    },
]

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/single-core-labs/',
  twitter:  'https://twitter.com',
  github:   'https://github.com',
}

export const CONTACT_EMAIL = 'singlecorelabs.in@gmail.com'

export const ENGINEER_PEDIGREE = ['Bank of America', 'GlobalLogic', 'Cognizant']

export const CORE_PIPELINE = [
  {
    id: 'perception',
    number: '01',
    label: 'Perception',
    headline: 'Multimodal Data Ingestion',
    description:
      'Ingests, parses, and structures high-resolution DICOM radiology scans, patient EMR text, and raw financial vectors into unified feature spaces.',
  },
  {
    id: 'reasoning',
    number: '02',
    label: 'Reasoning',
    headline: 'Cognitive Inference & LLM',
    description:
      'Fine-tuned, domain-specific models analyze raw features to run clinical diagnostic reasoning with confidence scores and explainable outputs.',
  },
  {
    id: 'action',
    number: '03',
    label: 'Action',
    headline: 'Air-Gapped Execution',
    description:
      'Automated workflows securely write results directly back to local EMRs and clinical CRMs without cloud exposure. Full data sovereignty.',
  },
]

export const DIFFERENTIATORS = [
  {
    id: 'agentic-solutions',
    headline: 'Convert data into adaptive agents.',
    description:
      'Convert your proprietary data into intelligent agents that learn and improve with continuous human feedback.',
  },
  {
    id: 'ai-enterprise',
    headline: 'Full-Stack AI Solutions.',
    description:
      'Outcomes delivered with data, models, agents, and deployment — from prototype to production.',
  },
  {
    id: 'demanding-workloads',
    headline: 'Built for the most demanding AI workloads.',
    description:
      'Engineered for critical systems where operational reliability, security, and precision are non-negotiable.',
  },
]

export const INDUSTRIES = [
  { id: 'healthcare',      label: 'Healthcare' },
  { id: 'finance',         label: 'Finance' },
  { id: 'insurance',       label: 'Insurance' },
  { id: 'logistics',       label: 'Logistics' },
  { id: 'ecommerce',       label: 'E-commerce' },
  { id: 'recruitment',     label: 'Recruitment' },
  { id: 'small-business',  label: 'Small Business' },
  { id: 'debt-collection', label: 'Debt Collection' },
]

export const CAPABILITIES_SUMMARY = [
  'Agentic AI Deployment',
  'Medical Imaging & Diagnostics',
  'AI-Ready Data Pipelines',
  'EMR, CRM & Core System Integration',
  'Air-Gapped & Offline Deployment',
  'LLM Fine-Tuning & Integration',
]
