import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function AIAgentWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the SCL AI Assistant. Ask me anything about our services or legacy system modernization.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    
    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Create a placeholder for the assistant's response
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const gatewayUrl = import.meta.env?.VITE_GATEWAY_URL || 'http://localhost:8001';

    try {
      const response = await fetch(`${gatewayUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-test-123'
        },
        body: JSON.stringify({
          model: 'auto',
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          stream: true,
          routing_policy: 'latency_first'
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data.trim() === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content || "";
              
              if (delta) {
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  const lastIndex = newMsgs.length - 1;
                  newMsgs[lastIndex] = {
                    ...newMsgs[lastIndex],
                    content: newMsgs[lastIndex].content + delta
                  };
                  return newMsgs;
                });
              }
            } catch (e) { void e;
              // Ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Fallback mock streaming so the user can test the UI when the backend is offline
      const mockText = "This is a mock response since the Gateway backend is currently offline. I am streaming this word-by-word to help you preview the chat UI animations and styling!";
      const words = mockText.split(" ");
      let currentText = "";
      
      // Optional initial delay for realism
      await new Promise(r => setTimeout(r, 600));

      for (let i = 0; i < words.length; i++) {
        await new Promise(r => setTimeout(r, 60)); // Simulate latency between chunks
        currentText += (i === 0 ? "" : " ") + words[i];
        
        setMessages((prev) => {
          const newMsgs = [...prev];
          const lastIndex = newMsgs.length - 1;
          newMsgs[lastIndex] = {
            ...newMsgs[lastIndex],
            content: currentText
          };
          return newMsgs;
        });
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-80 sm:w-96 flex flex-col glass-card overflow-hidden"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between" style={{ padding: '20px', borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--color-text)' }}>SCL Assistant</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-muted)' }}>Latency-optimized routing</p>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                style={{ color: 'var(--color-text-muted)', padding: '6px', borderRadius: '50%' }}
                className="hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto" 
              style={{ padding: '20px', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'column', gap: '20px' }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg, i) => (
                <div 
                  key={`msg-${i}`} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div 
                      className="w-7 h-7 flex items-center justify-center shrink-0 mt-1"
                      style={{ 
                        borderRadius: '50%',
                        backgroundColor: msg.role === 'user' ? 'var(--color-bg-elevated)' : 'var(--color-accent-dim)',
                        color: msg.role === 'user' ? 'var(--color-text)' : 'var(--color-accent)'
                      }}
                    >
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div 
                      className="shadow-sm"
                      style={{
                        padding: '10px 16px',
                        backgroundColor: msg.role === 'user' ? 'var(--color-text)' : 'rgba(255, 255, 255, 0.8)',
                        color: msg.role === 'user' ? '#ffffff' : 'var(--color-text)',
                        border: msg.role === 'user' ? 'none' : '1px solid var(--color-border)',
                        borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}
                    >
                      {msg.content.split('\n').map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx !== msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                      {msg.role === 'assistant' && msg.content === '' && isTyping && (
                        <span className="flex gap-1 items-center h-5">
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)' }}>
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full outline-none transition-all"
                  style={{
                    padding: '12px 48px 12px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid var(--color-border-strong)',
                    borderRadius: '24px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'var(--color-text)',
                  }}
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: (!input.trim() || isTyping) ? 'var(--color-border-strong)' : 'var(--color-text)',
                    color: '#ffffff'
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)} 
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors"
        style={{
          backgroundColor: 'var(--color-text)',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }}
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
