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
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
        }}
        className="hover:bg-white/5 hover:border-white/10"
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#151822',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          {item.logoUrl ? (
            <img src={item.logoUrl} alt={item.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          ) : (
            <Icon size={24} style={{ color: item.color || '#FFFFFF' }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              {item.name}
            </h4>
            {item.category && (
              <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#A0AABF', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                {item.category}
              </span>
            )}
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#A0AABF', margin: 0 }}>
            {item.summary}
          </p>
        </div>
      </div>
    </Card3D>
  )
}

export function PoweredBySection() {
  return (
    <section style={{ backgroundColor: '#0B0F19', padding: 'var(--spacing-section-lg) 0', overflow: 'hidden' }}>
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
          
          {/* Left Column: Text */}
          <div>
            <RevealText>
              <p style={{ color: '#5B7CFF', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
                MODEL INTEGRATIONS
              </p>
            </RevealText>
            <RevealText delay={1}>
              <h2 style={{ color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Top AI models, or your custom ones
              </h2>
            </RevealText>
            <RevealText delay={2}>
              <p style={{ color: '#A0AABF', fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
                Our forward-deployed engineers optimize every deployment for SOTA performance —
                whether you're running a top open model or a custom model.
              </p>
            </RevealText>
            <RevealText delay={3}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Check size={18} style={{ color: '#5B7CFF' }} />
                <p style={{ fontSize: '14px', color: '#FFFFFF', margin: 0 }}>
                  Model-agnostic by design
                </p>
              </div>
            </RevealText>
          </div>

          {/* Right Column: Cards */}
          <div style={{ position: 'relative' }}>
            <div 
              className="hidden lg:block" 
              style={{ 
                position: 'absolute', 
                top: '-40px', 
                bottom: '-40px', 
                left: '-50px', 
                width: '1px', 
                background: 'rgba(255,255,255,0.15)' 
              }} 
            />
            
            <StaggerReveal style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {POPULAR_MODELS.map((model) => (
                <TechCard key={model.id} item={model} />
              ))}
            </StaggerReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
