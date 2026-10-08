import { Landmark, Building2, ShieldCheck, Bot } from 'lucide-react'
import { Section, SectionHead } from './Container'
import { BentoGrid, BentoCard } from './Bento'
import { Marquee } from './Marquee'

/* Single-row word strip directly under the hero. */
const STRIP_WORDS = [
  'Inference',
  'Agents',
  'Robotics',
  'Defence',
  'Finance',
  'Public sector',
  'Sovereignty',
  'Healthcare',
  'Edge AI',
  'Embodied AGI',
  'Data',
]

export function WordStrip() {
  return <Marquee items={STRIP_WORDS} label="What we work on" />
}

/* Sector cards: problem statements, not customers (we have none).
   TODO: customer-quote slots — hidden until real quotes exist. */
const SECTORS = [
  {
    icon: Landmark,
    kicker: 'Financial services',
    headline: 'Run inference on-premises with a replayable audit trail of every agent action.',
    text: 'Regulated workloads stay inside your boundary, with evidence your auditors can replay.',
    span: 'wide',
  },
  {
    icon: Building2,
    kicker: 'Public sector',
    headline: 'Data residency, inspectable code, in-country deploy.',
    text: 'Sovereign deployments on infrastructure you control.',
  },
  {
    icon: ShieldCheck,
    kicker: 'Defence and critical infrastructure',
    headline: 'Air-gapped AI with no outbound dependency.',
    text: 'Disconnected operation for the highest-assurance environments.',
  },
  {
    icon: Bot,
    kicker: 'Robotics and physical AI',
    headline: 'Gate every action and evaluate before anything touches real hardware.',
    text: 'Nothing actuates without passing the gate.',
    span: 'wide',
  },
]

export function SectorBento() {
  return (
    <Section>
      <SectionHead
        kicker="Sectors"
        heading="Designed for high-trust environments."
        lede="Where the cost of a wrong answer is measured in money, safety, or sovereignty."
      />
      <BentoGrid>
        {SECTORS.map((s) => (
          <BentoCard
            key={s.kicker}
            icon={s.icon}
            kicker={s.kicker}
            headline={s.headline}
            text={s.text}
            span={s.span}
          />
        ))}
        <BentoCard
          kicker="Your sector"
          headline="Don't see your environment above?"
          text="If it runs on private data under real constraints, it probably fits."
          href="/contact"
          linkLabel="Talk to us"
          span="wide"
        />
        {/* TODO: customer quote slot — render only with a real, permissioned quote. */}
      </BentoGrid>
    </Section>
  )
}

/* Infrastructure layer: four pillars as cards, no tabs. */
const INFRA_PILLARS = [
  {
    kicker: 'Research',
    headline: 'New approaches to capability.',
    text: 'Exploring model capability, post-training, reinforcement learning, synthetic data, and AI systems.',
    href: '/research',
    linkLabel: 'Read the research',
  },
  {
    kicker: 'Engineering',
    headline: 'Reliable infrastructure for AI.',
    text: 'Building for inference, agents, developer tools, evaluation, and large-scale AI workloads.',
    href: '/enterprise',
    linkLabel: 'See engineering',
  },
  {
    kicker: 'Enterprise',
    headline: 'AI deployed where you operate.',
    text: 'Helping organizations deploy across cloud, private infrastructure, on-premise, and controlled environments.',
    href: '/enterprise',
    linkLabel: 'See enterprise',
  },
  {
    kicker: 'Continuous improvement',
    headline: 'Systems that get better.',
    text: 'Designed to be evaluated, monitored, and improved continuously as models and workloads evolve.',
    href: '/product/marshal',
    linkLabel: 'See how',
  },
]

export function StackTabs() {
  return (
    <Section>
      <SectionHead
        kicker="The infrastructure layer for AI"
        heading="From research to production systems."
        lede="AI systems are becoming increasingly complex to build, deploy, and operate. Single Core Labs brings the critical layers together — from models and data to agents, evaluation, infrastructure, and production deployment."
      />
      <BentoGrid>
        {INFRA_PILLARS.map((p) => (
          <BentoCard
            key={p.kicker}
            kicker={p.kicker}
            headline={p.headline}
            text={p.text}
            href={p.href}
            linkLabel={p.linkLabel}
          />
        ))}
      </BentoGrid>
      <p className="text-body" style={{ marginTop: '28px', fontSize: '15px' }}>
        <strong>From AI research to production systems.</strong>
      </p>
    </Section>
  )
}
