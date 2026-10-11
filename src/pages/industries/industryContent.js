/* Distinct content for the six industry pages.
   Rules: no certifications, approvals, contracts, customers, or metrics claimed.
   Capabilities describe what SCL scopes per engagement; exploratory work is labeled. */

export const ENGAGEMENT_STEPS = [
  {
    name: 'Assess',
    text: 'Review your infrastructure, software environment, data boundaries, and the engineering problem you want to solve.',
  },
  {
    name: 'Architect',
    text: 'Propose a deployment architecture, model strategy, governance controls, and validation criteria for review.',
  },
  {
    name: 'Build',
    text: 'Implement the system with your team — infrastructure, integrations, agent workflows, and engineering support.',
  },
  {
    name: 'Validate',
    text: 'Test against the agreed criteria: evaluations, benchmarks, security review, and human acceptance.',
  },
  {
    name: 'Integrate',
    text: 'Hand over documented systems, runbooks, and audit trails so your team can operate and extend the work.',
  },
]

export const INDUSTRIES = [
  {
    slug: 'defense',
    nav: 'Defense & National Security',
    eyebrow: 'Defense & National Security',
    headline: 'Secure AI infrastructure for mission-critical engineering.',
    lede: 'Private AI for defense and aerospace — controlled models, data, and execution.',
    primaryCta: 'Discuss a Defense Project',
    secondaryCta: { label: 'Explore enterprise controls', href: '/enterprise' },
    seoTitle: 'Defense & National Security — Secure AI Infrastructure | Single Core Labs',
    seoDescription:
      'Secure AI infrastructure for mission-critical engineering. Private AI deployment, governed agents, and AI-assisted software development for defense and aerospace teams.',
    seoKeywords: 'defense AI, national security AI, private AI deployment, governed AI agents, aerospace engineering',
    challenge: {
      heading: 'Engineering under operational constraints.',
      intro:
        'Defense and aerospace teams work inside strict boundaries: isolated networks, approved software dependencies, data-handling rules, and verification requirements that commercial AI tooling rarely respects.',
      points: [
        'Networks and facilities that limit what software and models can enter or leave.',
        'Data-handling rules that restrict where information can be processed or stored.',
        'Approval requirements for tools, dependencies, and changes to production systems.',
        'Verification expectations: outputs must be tested against defined requirements, not trusted on arrival.',
        'Large, long-lived codebases where maintenance and documentation lag behind mission needs.',
      ],
    },
    approach: {
      heading: 'AI capabilities built around operational control.',
      intro:
        'Single Core Labs helps defense and aerospace engineering teams explore private AI deployment, governed agents, and AI-assisted software development in security-sensitive environments. Each engagement begins with a clear use case and agreed validation criteria — scoped to your infrastructure, software environment, and technical requirements.',
    },
    capabilities: [
      {
        title: 'Private AI infrastructure',
        text: 'Design AI deployment architectures around customer-managed infrastructure, data-handling requirements, and approved model dependencies.',
      },
      {
        title: 'Governed AI agents',
        text: 'Establish permissions, tool-access boundaries, human approval points, and execution policies for AI-assisted workflows.',
      },
      {
        title: 'AI-assisted software engineering',
        text: 'Use Marshal Code to support repository analysis, code implementation, testing, and verification under developer supervision.',
      },
      {
        title: 'Evaluation and verification',
        text: 'Build repeatable tests and benchmarks to assess AI outputs, identify regressions, and measure performance against defined requirements.',
      },
    ],
    applications: {
      heading: 'Built for defense and aerospace engineering workflows.',
      items: [
        { title: 'Secure software development and maintenance', text: 'Agent-assisted implementation, testing, and review inside your repositories and branches.' },
        { title: 'Private model serving and orchestration', text: 'Serve approved models on infrastructure you control, with routing and cost visibility.' },
        { title: 'Embedded and edge AI prototyping', text: 'Explore constrained-environment prototypes scoped to your hardware and data limits.' },
        { title: 'Engineering documentation and knowledge workflows', text: 'Draft and organize technical documentation from authorized sources, reviewed by engineers.' },
        { title: 'Model evaluation and controlled deployment', text: 'Benchmark candidate models and roll out behind evaluation gates and human approval.' },
      ],
      note: 'Engagements are scoped per environment. SCL does not claim classified-environment readiness, government approval, or existing defense contracts.',
    },
    governance: {
      heading: 'Deployment and governance, defined per engagement.',
      points: [
        'Customer-managed infrastructure and data boundaries.',
        'Role-based access, approval policies, and sandboxed execution.',
        'Full audit trails: models, tools, changes, approvals, and test results.',
        'Evaluation gates before any deployment or expansion.',
      ],
    },
    closing: {
      heading: 'Start with a defined engineering challenge.',
      text: 'Work with SCL to scope a pilot around your infrastructure, software environment, and technical requirements. Each engagement begins with a clear use case and agreed validation criteria.',
      primaryCta: 'Talk to Our Engineering Team',
    },
  },
  {
    slug: 'federal',
    nav: 'Federal & Public Sector',
    eyebrow: 'Federal & Public Sector',
    headline: 'Modernize public-sector workflows without losing control of data.',
    lede: 'Document processing, systems integration, and governed automation — inside infrastructure you control.',
    primaryCta: 'Discuss a Public-Sector Project',
    secondaryCta: { label: 'Explore enterprise controls', href: '/enterprise' },
    seoTitle: 'Federal & Public Sector — Responsible AI Modernization | Single Core Labs',
    seoDescription:
      'AI modernization for public-sector teams: document processing, data governance, systems integration, and governed automation with human review.',
    seoKeywords: 'public sector AI, government AI modernization, document processing, data governance, systems integration',
    challenge: {
      heading: 'Modernization inside public accountability.',
      intro:
        'Public-sector organizations carry document-heavy processes, legacy systems, and oversight obligations that make generic AI rollouts unworkable. Automation must be explainable, reviewable, and bounded.',
      points: [
        'High volumes of applications, permits, records, and correspondence processed by hand.',
        'Legacy and incompatible systems holding overlapping, inconsistent records.',
        'Data-governance and residency expectations set by policy, not vendor defaults.',
        'Oversight requirements: decisions affecting the public need human review and records.',
        'Modernization efforts that stall on integration risk and unclear validation.',
      ],
    },
    approach: {
      heading: 'Start from the workflow, not the model.',
      intro:
        'SCL maps the actual workflow first — who handles what, where data lives, what needs review — then scopes AI assistance around it. Document processing, search, and drafting stay inside your boundary, with people approving anything consequential.',
    },
    capabilities: [
      {
        title: 'Document processing pipelines',
        text: 'Ingest, classify, and extract structured data from applications, records, and correspondence for staff review.',
      },
      {
        title: 'Data governance and residency',
        text: 'Keep processing inside your infrastructure boundary with defined retention and access rules.',
      },
      {
        title: 'Systems integration',
        text: 'Connect AI workflows to existing records systems and APIs instead of replacing them.',
      },
      {
        title: 'Governed automation with human review',
        text: 'Route drafts, summaries, and recommendations to staff for approval before action.',
      },
      {
        title: 'Evaluation and reporting',
        text: 'Measure accuracy and failure modes on your data so oversight teams see evidence, not promises.',
      },
    ],
    applications: {
      heading: 'Practical starting points for public-sector teams.',
      items: [
        { title: 'Application and permit triage assistance', text: 'Classify incoming submissions and surface complete review packets for staff.' },
        { title: 'Records search and summarization', text: 'Search across authorized records and draft summaries with source references.' },
        { title: 'Legacy workflow modernization', text: 'Wrap existing systems with assisted steps rather than rip-and-replace projects.' },
        { title: 'Internal knowledge assistants', text: 'Answer staff questions from approved policy and procedure corpora.' },
        { title: 'Reporting automation', text: 'Draft recurring operational reports from defined data sources for review.' },
      ],
      note: 'Public-facing or decision-making uses require human review and policy clearance. SCL scopes these as custom implementation work per engagement.',
    },
    governance: {
      heading: 'Oversight built into the workflow.',
      points: [
        'Human approval points before any consequential action or communication.',
        'Source-referenced outputs so staff can verify, not just trust.',
        'Audit trails covering data accessed, drafts produced, and approvals given.',
        'Deployment inside your infrastructure boundary with defined access controls.',
      ],
    },
    closing: {
      heading: 'Start with one workflow and its success criteria.',
      text: 'Pick a document-heavy process, define what good looks like, and scope a pilot with SCL around your systems and governance requirements.',
      primaryCta: 'Talk to Our Engineering Team',
    },
  },
  {
    slug: 'financial-services',
    nav: 'Financial Services',
    eyebrow: 'Financial Services',
    headline: 'Controlled AI for financial engineering teams.',
    lede: 'Private inference, model evaluation, and governed automation — with evidence your reviewers can replay.',
    primaryCta: 'Discuss a Financial-Services Project',
    secondaryCta: { label: 'Explore enterprise controls', href: '/enterprise' },
    seoTitle: 'Financial Services — Controlled AI Infrastructure | Single Core Labs',
    seoDescription:
      'Controlled AI for financial teams: private inference, model evaluation, governed automation, and auditable software engineering.',
    seoKeywords: 'financial services AI, private inference, model evaluation, governed automation, audit trails',
    challenge: {
      heading: 'High stakes, low tolerance for surprises.',
      intro:
        'Financial institutions need every automated step to be explainable, reproducible, and contained. Data cannot leave defined boundaries, models must be evaluated before use, and reviewers need proof — not demos.',
      points: [
        'Sensitive transaction, credit, and risk data confined to approved environments.',
        'Model-risk expectations: candidates evaluated and versioned before production use.',
        'Audit demands for who did what, with which data, under whose approval.',
        'Operational visibility into cost, usage, and failure modes of AI workloads.',
        'Engineering backlogs in risk reporting, reconciliations, and review workflows.',
      ],
    },
    approach: {
      heading: 'Evidence first, automation second.',
      intro:
        'SCL scopes private model serving, evaluation harnesses, and approval-gated automation around your data boundaries. Internal teams get leverage; reviewers get replayable records of every run.',
    },
    capabilities: [
      {
        title: 'Private inference endpoints',
        text: 'Serve models on infrastructure you control, with routing, cost limits, and usage visibility per team.',
      },
      {
        title: 'Model evaluation and benchmarking',
        text: 'Test candidates on your datasets, track regressions across versions, and gate promotion on results.',
      },
      {
        title: 'Controlled automation with approvals',
        text: 'Automate review and reporting steps with explicit human approval before anything is finalized.',
      },
      {
        title: 'Auditable software engineering',
        text: 'Use Marshal Code for implementation and testing with full journals: changes, tests, and approvals.',
      },
      {
        title: 'Operational visibility',
        text: 'Monitor tokens, cost, latency, and task success through your existing observability stack.',
      },
    ],
    applications: {
      heading: 'Where financial teams start.',
      items: [
        { title: 'Risk-reporting assistance', text: 'Draft recurring risk and exposure reports from defined sources for analyst review.' },
        { title: 'Document-heavy review workflows', text: 'Extract and reconcile fields across statements, filings, and contracts with source references.' },
        { title: 'Internal developer acceleration', text: 'Agent-assisted implementation and testing across your repositories under policy gates.' },
        { title: 'Evaluation harnesses for models', text: 'Repeatable benchmarks that compare candidates on your tasks before selection.' },
        { title: 'Private search over internal data', text: 'Retrieval over authorized corpora with access controls and cited sources.' },
      ],
      note: 'Controls are designed to support your internal review processes. SCL makes no regulatory-compliance claims; confirm fit with your compliance team during assessment.',
    },
    governance: {
      heading: 'Controls your reviewers can inspect.',
      points: [
        'Data stays inside your deployment boundary with defined retention.',
        'Approval policies for consequential actions and production changes.',
        'Complete run journals: users, models, tools, changes, tests, and outcomes.',
        'Evaluation evidence attached to model versions before promotion.',
      ],
    },
    closing: {
      heading: 'Start with one workflow your reviewers care about.',
      text: 'Define the data boundary, the decision points, and the evidence required — then scope a pilot with SCL against those criteria.',
      primaryCta: 'Talk to Our Engineering Team',
    },
  },
  {
    slug: 'healthcare',
    nav: 'Healthcare & Life Sciences',
    eyebrow: 'Healthcare & Life Sciences',
    headline: 'AI infrastructure for healthcare technology teams.',
    lede: 'Authorized-data pipelines, imaging and research infrastructure, and evaluation — with professionals in the loop.',
    primaryCta: 'Discuss a Healthcare Project',
    secondaryCta: { label: 'Explore enterprise controls', href: '/enterprise' },
    seoTitle: 'Healthcare & Life Sciences — Responsible AI Infrastructure | Single Core Labs',
    seoDescription:
      'AI infrastructure for healthcare technology: authorized data workflows, imaging pipelines, research infrastructure, and evaluation with professional oversight.',
    seoKeywords: 'healthcare AI infrastructure, medical imaging pipelines, research infrastructure, AI evaluation, clinical oversight',
    challenge: {
      heading: 'Sensitive data, zero room for error.',
      intro:
        'Healthcare technology teams handle regulated patient data, large imaging volumes, and research workloads where every output needs qualified review. Infrastructure must respect authorization boundaries and keep professionals in charge.',
      points: [
        'Patient and clinical data restricted to authorized systems and personnel.',
        'Imaging and signal data at volumes that strain ad-hoc pipelines.',
        'Research teams needing reproducible compute without compliance risk.',
        'AI outputs that require qualified professional review before any use.',
        'Evaluation gaps: models tested on generic benchmarks, not your data and tasks.',
      ],
    },
    approach: {
      heading: 'Infrastructure that respects authorization.',
      intro:
        'SCL builds data pipelines, research infrastructure, and evaluation harnesses that process only authorized data inside your boundary. Drafts and analyses go to qualified professionals for review — the system never substitutes for clinical judgment.',
    },
    capabilities: [
      {
        title: 'Authorized-data pipelines',
        text: 'Process only the datasets your team authorizes, inside your infrastructure boundary with defined access rules.',
      },
      {
        title: 'Imaging and data pipelines',
        text: 'Ingest, structure, and route imaging and signal data for research and engineering workflows.',
      },
      {
        title: 'Research infrastructure',
        text: 'Provision reproducible training and evaluation environments for research teams.',
      },
      {
        title: 'Evaluation on your tasks',
        text: 'Benchmark models against datasets and criteria your team defines, and track regressions.',
      },
      {
        title: 'Professional-oversight workflows',
        text: 'Route every draft and recommendation to qualified reviewers with source references before use.',
      },
    ],
    applications: {
      heading: 'Where healthcare technology teams start.',
      items: [
        { title: 'Imaging pipeline acceleration', text: 'Structure and route imaging workloads for research and engineering review.' },
        { title: 'Documentation assistance drafts', text: 'Draft summaries from authorized records for qualified professional review and sign-off.' },
        { title: 'Research data infrastructure', text: 'Reproducible environments for training, fine-tuning, and evaluation on approved datasets.' },
        { title: 'Knowledge search over authorized corpora', text: 'Retrieval with citations across approved literature and internal documentation.' },
        { title: 'Model evaluation for clinical-adjacent tasks', text: 'Measure candidate models on team-defined tasks before any broader consideration.' },
      ],
      note: 'All AI outputs require review by qualified professionals. SCL makes no clinical-efficacy claims; suitability decisions rest with your clinical and compliance teams.',
    },
    governance: {
      heading: 'Boundaries your compliance team defines.',
      points: [
        'Processing limited to authorized datasets inside your boundary.',
        'Access controls aligned to your roles and review responsibilities.',
        'Audit trails of data accessed, outputs produced, and reviews completed.',
        'Data-handling specifics — residency, retention, de-identification — defined per engagement.',
      ],
    },
    closing: {
      heading: 'Start with one dataset and its reviewers.',
      text: 'Define the authorized data, the professional reviewers, and the validation criteria — then scope a pilot with SCL around that workflow.',
      primaryCta: 'Talk to Our Engineering Team',
    },
  },
  {
    slug: 'technology',
    nav: 'Technology',
    eyebrow: 'Technology',
    headline: 'Engineering leverage for teams that ship software.',
    lede: 'Marshal Code, private model serving, and evaluation — automation your platform team can govern.',
    primaryCta: 'Discuss an Engineering Project',
    secondaryCta: { label: 'Explore Marshal', href: '/product/marshal' },
    seoTitle: 'Technology — AI Developer Infrastructure | Single Core Labs',
    seoDescription:
      'AI developer infrastructure for technology teams: Marshal-assisted engineering, private model serving, agent workflows, and evaluation.',
    seoKeywords: 'AI developer infrastructure, coding agents, model serving, agent workflows, software engineering automation',
    challenge: {
      heading: 'Velocity without losing the codebase.',
      intro:
        'Software organizations want AI leverage across large, fast-moving repositories — but uncontrolled agent access creates review burden, inconsistent quality, and surprise infrastructure bills.',
      points: [
        'Large, complex repositories where context gathering consumes engineering time.',
        'Review queues growing faster than reviewers as AI-generated changes increase.',
        'Model and inference costs spread across teams with little visibility.',
        'Evaluation gaps: no repeatable way to compare agents or models on your tasks.',
        'Platform teams asked to enable AI access without governance primitives.',
      ],
    },
    approach: {
      heading: 'Autonomous engineering your platform team governs.',
      intro:
        'SCL deploys Marshal Code inside your repositories with policy gates, model routing, and evaluation — so teams move faster while platform engineering keeps control of access, cost, and quality signals.',
    },
    capabilities: [
      {
        title: 'Marshal-assisted engineering',
        text: 'Repository analysis, implementation, testing, and verification under developer supervision and review.',
      },
      {
        title: 'Policy-gated agent workflows',
        text: 'Define what agents may do alone, what needs approval, and what is forbidden — enforced at runtime.',
      },
      {
        title: 'Private model serving and routing',
        text: 'Route tasks across frontier, private, and local models with cost limits and per-team policies.',
      },
      {
        title: 'Evaluation and benchmarking',
        text: 'Score agents and models on your repositories and tasks; track quality across versions.',
      },
      {
        title: 'Production observability',
        text: 'Feed usage, cost, latency, and success signals into your existing stack via open telemetry.',
      },
    ],
    applications: {
      heading: 'Where product engineering teams start.',
      items: [
        { title: 'Feature implementation across repositories', text: 'Scoped implementation with tests, verified before review.' },
        { title: 'Test generation and verification', text: 'Expand coverage on critical paths with results engineers can inspect.' },
        { title: 'Incident investigation assistance', text: 'Collect logs, reproduce issues, and draft root-cause analysis for on-call review.' },
        { title: 'Documentation and onboarding', text: 'Generate accurate docs from the current codebase, kept in sync by workflow.' },
        { title: 'Model routing and cost control', text: 'Match task types to models and endpoints to control spend without blocking teams.' },
      ],
      note: 'Marshal works inside your repositories and branches; every change goes through your existing review and CI before merge.',
    },
    governance: {
      heading: 'Platform-grade control.',
      points: [
        'Workspace, team, and agent-level permissions with approval policies.',
        'Sandboxed execution with filesystem, network, and tool boundaries.',
        'Journals of every run: prompts, tools, changes, tests, and outcomes.',
        'Your CI and review process remains the final gate — always.',
      ],
    },
    closing: {
      heading: 'Start with one repository and one workflow.',
      text: 'Measure task success, engineering hours saved, and cost per task — then expand across the organization on evidence.',
      primaryCta: 'Request an Enterprise Pilot',
    },
  },
  {
    slug: 'telecom',
    nav: 'Telecommunications',
    eyebrow: 'Telecommunications',
    headline: 'AI assistance for network engineering and operations.',
    lede: 'Incident-analysis support, edge inference architecture, and software maintenance — scoped to your infrastructure.',
    primaryCta: 'Discuss a Telecom Project',
    secondaryCta: { label: 'Explore enterprise controls', href: '/enterprise' },
    seoTitle: 'Telecommunications — Network AI Engineering | Single Core Labs',
    seoDescription:
      'AI engineering for telecom teams: incident-analysis assistance, edge inference architecture, distributed infrastructure, and software maintenance.',
    seoKeywords: 'telecom AI, network operations, incident analysis, edge inference, OSS BSS modernization',
    challenge: {
      heading: 'Distributed systems, relentless operations.',
      intro:
        'Telecom engineering spans distributed infrastructure, legacy operations systems, high incident volumes, and edge constraints. Teams need assistance that respects operational procedure — drafts for engineers, never unsupervised action.',
      points: [
        'Alarm and log volumes that overwhelm manual triage during incidents.',
        'Legacy OSS/BSS systems that are costly to replace and hard to extend.',
        'Edge and far-edge sites with strict latency, power, and footprint limits.',
        'Maintenance load across large network-software codebases.',
        'Change control: every recommendation needs validation before touching production.',
      ],
    },
    approach: {
      heading: 'Assistance grounded in your runbooks.',
      intro:
        'SCL scopes retrieval over your runbooks and telemetry, incident-analysis workflows that draft — not decide — and edge inference architectures sized to your sites. Engineers review and approve everything.',
    },
    capabilities: [
      {
        title: 'Incident-analysis assistance',
        text: 'Correlate alarms and logs into drafted timelines and hypotheses for on-call engineers.',
      },
      {
        title: 'Runbook-grounded troubleshooting',
        text: 'Retrieve relevant procedures with citations so recommendations trace to approved practice.',
      },
      {
        title: 'Edge inference architecture',
        text: 'Design model-serving topologies for edge constraints: latency budgets, footprint, and offline tolerance.',
      },
      {
        title: 'AI-assisted software maintenance',
        text: 'Support implementation, testing, and verification across network-software repositories under review.',
      },
      {
        title: 'Evaluation and validation',
        text: 'Benchmark assistance quality on historical incidents before operational use.',
      },
    ],
    applications: {
      heading: 'Where telecom engineering teams start.',
      items: [
        { title: 'Alarm and log triage assistance', text: 'Group related signals and draft likely-cause summaries for engineer review.' },
        { title: 'Troubleshooting drafts from runbooks', text: 'Propose next steps traced to approved procedures — engineers decide.' },
        { title: 'Edge model-serving prototypes', text: 'Prototype inference at edge sites within your latency and footprint budgets.' },
        { title: 'Capacity-planning analysis', text: 'Analyze utilization trends into drafted forecasts for planning review.' },
        { title: 'Regression testing for network software', text: 'Expand test coverage on critical paths with inspectable results.' },
      ],
      note: 'All operational recommendations require engineer review and follow your change-control process. Edge work is scoped as architecture and prototyping per engagement.',
    },
    governance: {
      heading: 'Operations stays in charge.',
      points: [
        'Read-only defaults: assistance drafts, engineers act.',
        'Recommendations cite runbooks and sources for verification.',
        'Audit trails of signals analyzed, drafts produced, and approvals.',
        'Deployment inside your infrastructure with defined access boundaries.',
      ],
    },
    closing: {
      heading: 'Start with one incident category and its runbooks.',
      text: 'Define the signals, the procedures, and the review step — then scope a pilot with SCL around that operational workflow.',
      primaryCta: 'Talk to Our Engineering Team',
    },
  },
]

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug)

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug)
}
