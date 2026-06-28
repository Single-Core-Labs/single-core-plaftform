import { RevealText, StaggerReveal } from '@/components/RevealText'
import { Card3D } from '@/components/ScrollScene'
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

function TechCard({ item }) {
  const Icon = item.icon
  return (
    <Card3D intensity={5} style={{ flex: '1 1 100%', minWidth: '0' }}>
      <div
        style={{
          padding: '24px',
          height: '100%',
          display: 'flex',
          gap: '20px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 105, 92, 0.08)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
        }}
        className="hover:bg-white hover:border-[rgba(0,105,92,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}
        >
          {item.logoUrl ? (
            <img src={item.logoUrl} alt={item.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          ) : (
            <Icon size={24} style={{ color: 'var(--color-accent)' }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--color-text)', margin: 0 }}>
              {item.name}
            </h4>
            {item.category && (
              <span style={{
                fontSize: '9px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-accent)',
                backgroundColor: 'var(--color-accent-dim)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {item.category}
              </span>
            )}
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-muted)', margin: 0 }}>
            {item.summary}
          </p>
        </div>
      </div>
    </Card3D>
  )
}

export function PoweredBySection() {
    return (
      <section style={{ 
        backgroundColor: 'var(--color-bg)', 
        padding: 'var(--spacing-section-lg) 0' 
      }}>
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
            
            {/* Left Column: Text */}
            <div>
              <RevealText>
                <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  MODEL INTEGRATIONS
                </p>
              </RevealText>
              <RevealText delay={1}>
                <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                  Top AI models, or your custom ones
                </h2>
              </RevealText>
              <RevealText delay={2}>
                <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                  Our forward-deployed engineers optimize every deployment for SOTA performance —
                  whether you're running a top open model or a custom model.
                </p>
              </RevealText>
              <RevealText delay={3}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  backgroundColor: 'var(--color-accent-dim)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 105, 92, 0.15)'
                }}>
                  <Check size={18} style={{ color: 'var(--color-accent)' }} />
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', margin: 0 }}>
                    Model-agnostic by design
                  </p>
                </div>
              </RevealText>
            </div>

            {/* Right Column: Model Cards */}
            <div style={{ position: 'relative' }}>
              <div className="flex flex-col gap-4">
                <StaggerReveal style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {POPULAR_MODELS.map((model) => (
                    <div key={model.id}>
                      <TechCard item={model} />
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
