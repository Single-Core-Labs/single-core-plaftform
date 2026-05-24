// Simple AI Agent chat widget – mock implementation
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask me about your legacy system and I’ll give a quick assessment.' },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    const userMsg = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    // Mock AI reply – replace with real API call later
    const reply = { role: 'assistant', content: 'Thanks! Our team will review and follow up shortly.' }
    setTimeout(() => setMessages((prev) => [...prev, reply]), 800)
    setInput('')
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
      <button onClick={() => setOpen((v) => !v)} className="btn-primary" style={{ borderRadius: '9999px', padding: '8px 16px' }}>
        {open ? 'Close AI Agent' : 'Ask AI'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              marginTop: '12px',
              width: '340px',
              maxHeight: '400px',
              background: 'white',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ padding: '8px', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>
              AI Modernization Agent
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>{msg.role === 'assistant' ? 'AI' : 'You'}: </span>{msg.content}
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid var(--color-border)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legacy system…"
                style={{ flex: 1, border: 'none', padding: '8px', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ borderRadius: 0 }}>
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
