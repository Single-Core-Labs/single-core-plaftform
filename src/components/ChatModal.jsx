// Chat GPT‑style modal for AI Modernization
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function ChatModal({ open, onClose }) {
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
    // mock reply – replace with real LLM call later
    const reply = { role: 'assistant', content: 'Thanks! Our team will review and follow up shortly.' }
    setTimeout(() => setMessages((prev) => [...prev, reply]), 800)
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold">AI Modernization Assistant</h2>
              <button onClick={onClose} className="p-1">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={`msg-${i}`} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`rounded-lg p-3 max-w-xs ${msg.role === 'assistant' ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="flex border-t border-gray-200 p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legacy system..."
                className="flex-1 border-none focus:outline-none"
                required
              />
              <button type="submit" className="btn-primary ml-2">
                Send
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
