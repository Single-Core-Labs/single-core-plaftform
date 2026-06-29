// AI-Led Modernization service page
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Link } from 'react-router-dom'
import AIAgentWidget from '@/components/AIAgentWidget'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'

export default function AIModernizationPage() {
  return (
    <div className="page-consulting">
      <SEO 
        title="AI-Led Modernization | Single Core Labs"
        description="Rebuild your legacy systems using AI-guided specification and controlled modernization."
      />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <section 
          className="container-editorial"
          style={{
            paddingTop: 'clamp(120px, 16vh, 180px)',
            paddingBottom: 'clamp(48px, 6vh, 80px)',
          }}
        >
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
        {/* Hero */}
        <motion.h1 variants={fadeUp} className="text-hero">
          AI-Led Modernization
        </motion.h1>
        <motion.p variants={fadeUp} className="text-body max-w-2xl">
          Your legacy systems hold years of business logic, product decisions, and edge-case behavior. We employ AI, engineering depth, and product thinking to recover that intent, build a working specification, and guide modernization with stronger precision and less disruption.
        </motion.p>

        {/* 3-Step Process */}
        <div className="space-y-12">
          <motion.section variants={fadeUp}>
            <h2 className="text-display mb-2">Step 1 – Evaluate</h2>
            <ul className="list-disc ml-6 text-body">
              <li>Evaluate code, data, and dependencies</li>
              <li>Recover business logic and edge cases</li>
              <li>Identify AI-readiness gaps and risks</li>
              <li>Define scope and success metrics</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-display mb-2">Step 2 – Specify</h2>
            <ul className="list-disc ml-6 text-body">
              <li>Turn system behavior into a working spec</li>
              <li>Map features, rules, and data flows</li>
              <li>Prioritize layers and rollout path</li>
              <li>Define testing and governance controls</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 className="text-display mb-2">Step 3 – Modernize</h2>
            <ul className="list-disc ml-6 text-body">
              <li>Rebuild data, services, logic, and UX</li>
              <li>Preserve functionality through verification</li>
              <li>Roll out in stages with tighter control</li>
              <li>Launch AI-ready software with governance</li>
            </ul>
          </motion.section>
        </div>

        {/* CTA Banner */}
        <motion.div variants={fadeUp} className="text-center mt-12">
          <Link to="/contact" className="btn-primary">
            Ready to modernize? Let’s talk
          </Link>
        </motion.div>
      </motion.div>
      </section>

      {/* Chat widget */}
      <AIAgentWidget />
    </main>
    <Footer />
    </div>
  )
}
