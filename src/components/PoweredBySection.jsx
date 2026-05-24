import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'

const LAYERS = [
  {
    step: '01',
    label: 'Experience',
    title: 'Interfaces your teams actually use',
    summary: 'Applications, search, and speech — the surfaces where AI meets users.',
    providers: [
      {
        id: 'openai-exp',
        name: 'OpenAI',
        logo: '/partners/openai.png',
        items: ['ChatGPT', 'DALL‑E', 'Whisper'],
      },
      {
        id: 'azure-exp',
        name: 'Azure',
        logo: '/partners/azure.png',
        items: ['AI Search', 'AI Speech Analytics'],
      },
    ],
  },
  {
    step: '02',
    label: 'Intelligence',
    title: 'Foundation models & reasoning',
    summary: 'Frontier LLMs and domain models — fine-tuned, evaluated, and governed.',
    providers: [
      {
        id: 'openai-intel',
        name: 'OpenAI',
        logo: '/partners/openai.png',
        items: ['GPT‑5'],
      },
      {
        id: 'claude',
        name: 'Claude',
        logo: '/partners/claude.png',
        items: ['Opus 4.5', 'Sonnet 4.5', 'Haiku 4.5'],
      },
      {
        id: 'meta',
        name: 'Meta',
        logo: null,
        monogram: '∞',
        accent: '#0668E1',
        items: ['MetaAI', 'LLaMA 4', 'SAM 3'],
      },
      {
        id: 'vertex-intel',
        name: 'Google Vertex AI',
        logo: null,
        monogram: 'G',
        accent: '#4285F4',
        items: ['Gemini', 'BERT', 'Med PaLM'],
      },
      {
        id: 'bedrock-intel',
        name: 'AWS Bedrock',
        logo: '/partners/bedrock.png',
        items: ['Cohere', 'Mistral AI', 'Stability AI'],
      },
    ],
  },
  {
    step: '03',
    label: 'Infrastructure',
    title: 'Cloud platforms & deployment',
    summary: 'Secure endpoints, VPC isolation, and production SLAs — where models run at scale.',
    providers: [
      {
        id: 'bedrock-infra',
        name: 'AWS Bedrock',
        logo: '/partners/bedrock.png',
        items: ['Multi-model API', 'Private networking'],
      },
      {
        id: 'vertex-infra',
        name: 'Google Vertex AI',
        logo: null,
        monogram: 'G',
        accent: '#4285F4',
        items: ['Managed endpoints', 'MLOps pipelines'],
      },
      {
        id: 'azure-infra',
        name: 'Azure',
        logo: '/partners/azure.png',
        items: ['Azure OpenAI', 'Enterprise compliance'],
      },
    ],
  },
]

function ProviderLogo({ provider }) {
  if (provider.logo) {
    return (
      <img
        src={provider.logo}
        alt=""
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
        className="tech-flow-node__logo"
      />
    )
  }

  return (
    <span
      className="tech-flow-node__monogram"
      style={{ color: provider.accent }}
      aria-hidden
    >
      {provider.monogram}
    </span>
  )
}

function FlowNode({ provider }) {
  return (
    <article className="tech-flow-node">
      <div className="tech-flow-node__head">
        <div className="tech-flow-node__logo-wrap">
          <ProviderLogo provider={provider} />
        </div>
        <h4 className="tech-flow-node__name">{provider.name}</h4>
      </div>
      <ul className="tech-flow-node__chips">
        {provider.items.map((item) => (
          <li key={item}>
            <span className="tech-chip">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function FlowConnector() {
  return (
    <div className="tech-flow-connector" aria-hidden>
      <div className="tech-flow-connector__line" />
      <svg
        className="tech-flow-connector__arrow"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
      >
        <path
          d="M6 8L0 0h12L6 8z"
          fill="var(--color-accent)"
          fillOpacity="0.55"
        />
      </svg>
    </div>
  )
}

function FlowLayer({ layer, isLast }) {
  return (
    <div className="tech-flow-layer">
      <div className="tech-flow-layer__meta">
        <span className="tech-flow-layer__step">{layer.step}</span>
        <div>
          <p className="tech-flow-layer__label">{layer.label}</p>
          <h3 className="tech-flow-layer__title">{layer.title}</h3>
          <p className="tech-flow-layer__summary">{layer.summary}</p>
        </div>
      </div>

      <StaggerReveal className="tech-flow-layer__nodes">
        {layer.providers.map((provider) => (
          <FlowNode key={provider.id} provider={provider} />
        ))}
      </StaggerReveal>

      {!isLast && <FlowConnector />}
    </div>
  )
}

export function PoweredBySection() {
  return (
    <section
      className="tech-stack-section"
      aria-labelledby="tech-stack-heading"
    >
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(28px, 4vh, 48px)' }} />

        <div className="tech-stack-section__intro">
          <RevealText>
            <p className="text-eyebrow" style={{ marginBottom: '16px' }}>
              Technology stack
            </p>
          </RevealText>
          <RevealText delay={1}>
            <h2 id="tech-stack-heading" className="text-display" style={{ maxWidth: '720px' }}>
              Powered by cutting‑edge{' '}
              <span className="text-italic-serif">technologies.</span>
            </h2>
          </RevealText>
          <RevealText delay={2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '20px' }}>
              We bring the full stack needed to rebuild systems that are maintainable,
              governable, and ready for modern AI use cases.
            </p>
          </RevealText>
        </div>

        <div className="tech-flow-stack">
          {LAYERS.map((layer, index) => (
            <RevealText key={layer.step} delay={index}>
              <FlowLayer layer={layer} isLast={index === LAYERS.length - 1} />
            </RevealText>
          ))}
        </div>

        <RevealText>
          <p
            className="text-label"
            style={{
              marginTop: 'clamp(28px, 4vh, 40px)',
              textAlign: 'center',
              color: 'var(--color-text-dim)',
            }}
          >
            Model-agnostic by design — we integrate what fits your security, compliance, and performance requirements.
          </p>
        </RevealText>
      </div>
    </section>
  )
}
