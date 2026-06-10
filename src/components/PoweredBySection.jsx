import { RevealText, StaggerReveal } from '@/components/RevealText'
import { HorizontalRule } from '@/components/HorizontalRule'
import { ScrollFade3D, Card3D } from '@/components/ScrollScene'
import {
  Cpu,
  Check
} from 'lucide-react'

const POPULAR_MODELS = [
  {
    id: 'deepseek-r1',
    name: 'Deepseek R1',
    logoUrl: 'https://logo-teka.com/wp-content/uploads/2025/07/deepseek-sign-logo.png',
    category: 'LLM',
    summary: 'Frontier-class models (V3, R1) built for complex reasoning, coding, and math — at dramatically lower inference cost than comparable proprietary models.',
    color: '#3B82F6'
  },
  {
    id: 'kimi-k2.5',
    name: 'KimiK2.5',
    logoUrl: 'https://kimi.moonshot.cn/favicon.ico', // Fallback to favicon if SVG not found
    category: 'LLM · Vision',
    summary: 'Moonshot AI\'s 1T parameter MoE model optimized for agentic tasks, tool use, and coding.',
    color: '#EF4444'
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    logoUrl: 'https://www.minimax.io/favicon.ico',
    category: 'LLM',
    summary: 'Large-scale MoE model (456B params) optimized for long-context tasks up to 1M tokens.',
    color: '#8B5CF6'
  },
  {
    id: 'custom-model',
    name: 'Your custom model',
    icon: Cpu,
    category: 'Custom',
    summary: 'Your models, your kernels, any hardware. Write once in MAX and deploy across GPUs & CPUs with no vendor lock-in.',
    color: '#10B981'
  }
]

function TechCard({ item, type = 'model' }) {
  const Icon = item.icon

  return (
    <Card3D intensity={5} style={{ flex: '1 1 300px' }}>
      <div
        style={{
          padding: '24px',
          height: '100%',
          display: 'flex',
          gap: '20px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04)';
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(0,0,0,0.03)',
            overflow: 'hidden',
          }}
        >
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt={item.name}
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          ) : (
            <Icon size={24} style={{ color: item.color || 'var(--color-accent)' }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-text)',
              }}
            >
              {item.name}
            </h4>
            {item.category && (
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-dim)',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                }}
              >
                {item.category}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.4,
              color: 'var(--color-text-muted)',
            }}
          >
            {item.summary}
          </p>
        </div>
      </div>
    </Card3D>
  )
}

export function PoweredBySection() {
  return (
    <section
      style={{ padding: 'var(--spacing-section-lg) 0', backgroundColor: '#F9F9FB', overflow: 'hidden' }}
    >
      <div className="container-editorial">
        <HorizontalRule style={{ marginBottom: 'clamp(48px, 6vh, 72px)' }} />

        <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vh, 100px)' }}>
          <RevealText>
            <h2 className="text-display" style={{ marginBottom: '24px' }}>
              Top AI models, or your custom ones
            </h2>
          </RevealText>
          <RevealText delay={1}>
            <p className="text-body" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '18px' }}>
              Our forward-deployed engineers optimize every deployment for SOTA performance —
              whether you're running a top open model or a custom model.
            </p>
          </RevealText>
        </div>

        <div>
          <RevealText>
            <h3 className="text-label" style={{ marginBottom: '32px', fontSize: '14px', color: 'var(--color-text)' }}>
              Build with popular models
            </h3>
          </RevealText>
          <StaggerReveal style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }}>
            {POPULAR_MODELS.map((model) => (
              <TechCard key={model.id} item={model} type="model" />
            ))}
          </StaggerReveal>
        </div>

        <RevealText>
          <div
            style={{
              marginTop: 'clamp(60px, 8vh, 100px)',
              padding: '32px',
              backgroundColor: 'var(--color-bg-elevated)',
              borderRadius: '24px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <Check size={18} style={{ color: 'var(--color-accent)' }} />
            <p className="text-body" style={{ fontSize: '15px', color: 'var(--color-text)' }}>
              Model-agnostic by design — we integrate what fits your security, compliance, and performance requirements.
            </p>
          </div>
        </RevealText>
      </div>
    </section>
  )
}
