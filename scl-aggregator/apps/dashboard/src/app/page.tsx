import Link from "next/link";
import { Terminal, Cpu, Database, Zap, MapPin, Activity, Github, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-gray-800">
      {/* Navigation */}
      <header className="border-b border-gray-900 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg tracking-tight text-white">sclhq</div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Log In</Link>
            <Link href="/signup" className="text-black bg-white hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors font-medium">Get API Key</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            One API. Every LLM.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Intelligent routing and semantic caching for all your AI models. Drop-in replacement for OpenAI with zero lock-in and minimal latency.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors">
              Get API Key
            </Link>
            <Link href="/docs" className="px-6 py-3 border border-gray-800 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition-colors">
              View Docs
            </Link>
          </div>

          {/* Terminal Snippet */}
          <div className="w-full max-w-3xl mt-16 text-left relative group">
            <div className="absolute -inset-1 bg-gray-800/50 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 font-mono text-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                <span className="ml-2 text-gray-500 text-xs">Terminal</span>
              </div>
              <pre className="text-gray-300 overflow-x-auto">
                <code>
                  <span className="text-pink-400">curl</span> https://api.sclhq.com/v1/chat/completions \<br/>
                  {"  "}<span className="text-gray-500">-H</span> <span className="text-green-400">"Authorization: Bearer $SCL_API_KEY"</span> \<br/>
                  {"  "}<span className="text-gray-500">-d</span> <span className="text-yellow-300">'{"{"}"model": "auto", "messages": [{"{"}"role": "user", "content": "Hello"{"}"}]{"}"}'</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-gray-900 py-10">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center text-sm font-medium text-gray-400 tracking-wide">
            <div className="flex flex-col"><span className="text-3xl text-white font-bold mb-2">412</span> MODELS</div>
            <div className="flex flex-col"><span className="text-3xl text-white font-bold mb-2">8</span> PROVIDERS</div>
            <div className="flex flex-col"><span className="text-3xl text-white font-bold mb-2">38%</span> AVG CACHE HIT</div>
            <div className="flex flex-col"><span className="text-3xl text-white font-bold mb-2">&lt;300ms</span> p99 LATENCY</div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Built for scale and speed.</h2>
            <p className="text-gray-400">Everything you need to run AI in production, out of the box.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            {[
              { icon: Cpu, title: "Intelligent Routing", desc: "Intent-aware model selection to balance cost, speed, and accuracy." },
              { icon: Database, title: "Semantic Cache", desc: "Save up to 38% on token costs with built-in semantic caching." },
              { icon: Zap, title: "OpenAI Compatible", desc: "Zero code changes required. Just swap your base URL and API key." },
              { icon: MapPin, title: "India-first", desc: "Mumbai edge infrastructure. INR billing and invoicing via Razorpay." },
              { icon: Activity, title: "Full Observability", desc: "Track latency, cost, and tokens per request in real-time." },
              { icon: Terminal, title: "scl CLI", desc: "Blazing fast developer tooling built in Rust." }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#0a0a0a] border border-gray-900 hover:border-gray-800 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mb-6">
                  <f.icon className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Simple, transparent pricing.</h2>
            <p className="text-gray-400">Pay as you go. 1 credit = ₹0.01.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Credit Packs</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { price: "₹850", credits: "85k" },
                  { price: "₹4,200", credits: "420k" },
                  { price: "₹8,500", credits: "850k" },
                  { price: "₹42,000", credits: "4.2M" }
                ].map((p, i) => (
                  <div key={i} className="p-4 border border-gray-800 rounded-lg bg-[#050505] flex justify-between items-center">
                    <span className="text-white font-medium">{p.price}</span>
                    <span className="text-sm text-gray-500">{p.credits} cr</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Credits never expire. Auto-recharge available.</p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Model Pricing</h3>
              <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#050505]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-900/50 text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Model</th>
                      <th className="px-4 py-3 font-medium text-right">Input / 1K</th>
                      <th className="px-4 py-3 font-medium text-right">Output / 1K</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      { name: "GPT-4o", in: "500", out: "1500" },
                      { name: "Claude 3.5 Sonnet", in: "300", out: "1500" },
                      { name: "Gemini 1.5 Pro", in: "125", out: "375" },
                      { name: "Llama 3 70B", in: "60", out: "60" }
                    ].map((m, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 text-gray-300">{m.name}</td>
                        <td className="px-4 py-3 text-gray-400 text-right">{m.in} cr</td>
                        <td className="px-4 py-3 text-gray-400 text-right">{m.out} cr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 mt-32">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="font-semibold text-white tracking-tight">sclhq</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="https://github.com" className="hover:text-white transition-colors flex items-center gap-1"><Github className="w-4 h-4"/> GitHub</Link>
            <Link href="https://twitter.com" className="hover:text-white transition-colors flex items-center gap-1"><Twitter className="w-4 h-4"/> Twitter</Link>
            <Link href="/status" className="hover:text-white transition-colors flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Status
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
