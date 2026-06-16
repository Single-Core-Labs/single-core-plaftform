// ─── Site-wide constants ───────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Solutions',  href: '/solutions'  },
  { label: 'Research',   href: '/research'   },
  { label: 'Contact',    href: '/contact'    },
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
      'Ingests, parses, and structures high-resolution DICOM radiology scans, unstructured patient charts, and EMR logs from core systems like Epic into unified feature spaces.',
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
      'Automated workflows write results back securely into clinical CRMs and EMRs like Epic via bidirectional FHIR/HL7-compliant integrations. Full data sovereignty.',
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
]

export const INDUSTRIES = [
  { id: 'finance',         label: 'Finance' },
  { id: 'tech',            label: 'Tech' },
  { id: 'manufacturing',   label: 'Manufacturing' },
  { id: 'healthcare',      label: 'Healthcare' },
  { id: 'defense',         label: 'Defense' },
]

export const CAPABILITIES_SUMMARY = [
  'Agentic AI Deployment',
  'EHR-Integrated Clinical Intelligence',
  'Medical Imaging & Diagnostics',
  'AI-Ready Data Pipelines',
  'EMR, CRM & Core System Integration',
  'Air-Gapped & Offline Deployment',
  'LLM Fine-Tuning & Integration',
]
