import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Terminal, 
  Code2, 
  Settings2, 
  Zap, 
  Coins, 
  BookOpen,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

const SECTIONS = [
  { id: "quickstart", title: "Quickstart", icon: Zap },
  { id: "api-reference", title: "API Reference", icon: Code2 },
  { id: "routing-policies", title: "Routing Policies", icon: Settings2 },
  { id: "semantic-cache", title: "Semantic Cache", icon: BookOpen },
  { id: "cli-reference", title: "CLI Reference", icon: Terminal },
  { id: "pricing", title: "Pricing", icon: Coins },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      {/* Navigation Header */}
      <header className="border-b border-gray-900 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tight flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-sm" />
            sclhq
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-white bg-gray-900 hover:bg-gray-800 px-4 py-1.5 rounded-lg transition-colors font-medium border border-gray-800">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 py-12">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:text-white hover:bg-white/5 transition-all group"
              >
                <section.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="space-y-24 pb-32">
          {/* Quickstart */}
          <section id="quickstart" className="scroll-mt-28 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Quickstart</h2>
              <p className="text-gray-400 leading-relaxed">
                Get up and running with the SCL Aggregator in under 2 minutes. 
                Our unified API and CLI allow you to integrate 400+ models with zero friction.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">1. Install the CLI</h3>
                <div className="relative group">
                  <pre className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                    <code>curl -fsSL https://raw.githubusercontent.com/Single-Core-Labs/scl-aggregator/main/scripts/install-scl.sh | bash</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">2. Get your API Key</h3>
                <p className="text-sm text-gray-500">
                  Head over to the <Link href="/dashboard/keys" className="text-white hover:underline">API Keys</Link> section 
                  in your dashboard to generate your unique <code className="text-gray-400">sk-scl-...</code> key.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">3. Make your first request</h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Curl */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">cURL</span>
                    <pre className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
                      <code>
                        curl https://api.sclhq.com/v1/chat/completions \<br/>
                        &nbsp;&nbsp;-H "Authorization: Bearer $SCL_API_KEY" \<br/>
                        &nbsp;&nbsp;-d '{"{"} "model": "auto", "messages": [{"{"} "role": "user", "content": "Hello!" {"}"}] {"}"}'
                      </code>
                    </pre>
                  </div>
                  
                  {/* Python */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Python (OpenAI SDK compatible)</span>
                    <pre className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
                      <code>
                        from openai import OpenAI<br/><br/>
                        client = OpenAI(api_key="sk-scl-...", base_url="https://api.sclhq.com/v1")<br/><br/>
                        response = client.chat.completions.create(<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;model="auto",<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;messages=[{"{"}"role": "user", "content": "Hello!"{"}"}]<br/>
                        )
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="scroll-mt-28 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">API Reference</h2>
              <p className="text-gray-400">
                SCL is fully compatible with OpenAI and Anthropic API signatures. 
                Simply change your base URL and use your SCL API key.
              </p>
            </div>

            {/* OpenAI Compatible */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">POST</span>
                <code className="text-white font-mono">/v1/chat/completions</code>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    The primary endpoint for generating chat completions. Supports all standard OpenAI parameters 
                    plus SCL-specific routing fields.
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Headers</h4>
                    <ul className="text-xs space-y-1 font-mono">
                      <li>Authorization: Bearer sk-scl-...</li>
                      <li>Content-Type: application/json</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4">
                   <span className="text-[10px] font-bold text-gray-500 uppercase mb-4 block">Request Body</span>
                   <pre className="text-xs font-mono text-gray-400">
                    <code>
                      {"{"}<br/>
                      &nbsp;&nbsp;"model": "gpt-4o",<br/>
                      &nbsp;&nbsp;"messages": [{"{"}"role": "user", "content": "..."{"}"}],<br/>
                      &nbsp;&nbsp;"stream": true,<br/>
                      &nbsp;&nbsp;"routing_policy": "quality_first" <span className="text-gray-600">// Optional</span><br/>
                      {"}"}
                    </code>
                   </pre>
                </div>
              </div>
            </div>

            {/* Models */}
            <div className="pt-8 border-t border-gray-900">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">GET</span>
                <code className="text-white font-mono">/v1/models</code>
              </div>
              <p className="text-sm text-gray-400">
                Returns a list of all 400+ available models with their provider, context window, 
                and real-time pricing information.
              </p>
            </div>
          </section>

          {/* Routing Policies */}
          <section id="routing-policies" className="scroll-mt-28 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Routing Policies</h2>
              <p className="text-gray-400 leading-relaxed">
                Control how the SCL router selects models when using the <code className="text-gray-400">"auto"</code> model alias.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "quality_first", desc: "Selects the highest performing model for the detected intent (e.g. Claude 3.5 Opus for reasoning)." },
                { name: "cost_first", desc: "Prioritizes the cheapest available model that can reliably handle the task." },
                { name: "latency_first", desc: "Routes to the provider with the lowest current p99 latency for maximum speed." }
              ].map((p) => (
                <div key={p.name} className="p-6 rounded-xl border border-gray-800 bg-[#0a0a0a]">
                  <code className="text-white block mb-4">{p.name}</code>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-900/5 border border-blue-900/20 text-xs text-blue-400/80 leading-relaxed">
              <strong>Tip:</strong> You can pass the policy via the <code className="text-blue-400">routing_policy</code> field 
              in the JSON body or using the <code className="text-blue-400">X-SCL-Policy</code> HTTP header.
            </div>
          </section>

          {/* Semantic Cache */}
          <section id="semantic-cache" className="scroll-mt-28 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Semantic Cache</h2>
              <p className="text-gray-400 leading-relaxed">
                Our semantic caching layer uses vector embeddings to understand the intent of your prompts. 
                If a similar question has been asked recently, we serve the cached response instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">How it works</h3>
                <ol className="list-decimal list-inside space-y-3 text-sm text-gray-400 leading-relaxed">
                  <li>Prompt is converted to a vector embedding.</li>
                  <li>We perform a similarity search in our Mumbai-based ChromaDB edge.</li>
                  <li>If similarity &gt; 0.95, we return the cached response.</li>
                  <li>Latency is reduced from ~2s to &lt;50ms.</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Configuration</h3>
                <p className="text-sm text-gray-400">
                  Caching is enabled by default for all requests. To bypass the cache for a specific request, use the following header:
                </p>
                <pre className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 font-mono text-xs text-gray-500">
                  X-SCL-No-Cache: true
                </pre>
              </div>
            </div>
          </section>

          {/* CLI Reference */}
          <section id="cli-reference" className="scroll-mt-28 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">CLI Reference</h2>
              <p className="text-gray-400">
                The <code className="text-gray-400">scl</code> CLI is built in Rust for maximum performance.
              </p>
            </div>

            <div className="space-y-12">
              {[
                { cmd: "scl run", desc: "Execute a prompt and stream the response.", example: "scl run \"Write a python script\"" },
                { cmd: "scl bench", desc: "Compare multiple models side-by-side.", example: "scl bench \"Hello\" --models gpt-4o,claude-sonnet-4" },
                { cmd: "scl models", desc: "List all models and pricing.", example: "scl models --provider anthropic" },
                { cmd: "scl keys", desc: "Manage your API keys from terminal.", example: "scl keys create --name mobile-app" }
              ].map((c) => (
                <div key={c.cmd} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-mono text-lg">{c.cmd}</h4>
                    <ArrowUpRight className="w-4 h-4 text-gray-700" />
                  </div>
                  <p className="text-sm text-gray-500">{c.desc}</p>
                  <pre className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 font-mono text-xs text-gray-400">
                    <code>{c.example}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="scroll-mt-28 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">Pricing</h2>
              <p className="text-gray-400 leading-relaxed">
                Simple, pay-as-you-go credit system. 1 credit = ₹0.01. 
                Manage your balance in the <Link href="/dashboard/billing" className="text-white hover:underline">Billing</Link> section.
              </p>
            </div>

            <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a]">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-900/50 text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Model</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px] text-right">Input / 1K</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px] text-right">Output / 1K</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900">
                  {[
                    { name: "GPT-4o", in: "500", out: "1500" },
                    { name: "Claude 3.5 Sonnet", in: "300", out: "1500" },
                    { name: "Gemini 1.5 Pro", in: "125", out: "375" },
                    { name: "Llama 3 70B", in: "60", out: "60" }
                  ].map((m) => (
                    <tr key={m.name} className="hover:bg-gray-800/10 transition-colors">
                      <td className="px-6 py-4 text-gray-300 font-medium">{m.name}</td>
                      <td className="px-6 py-4 text-gray-500 text-right font-mono">{m.in} cr</td>
                      <td className="px-6 py-4 text-gray-500 text-right font-mono">{m.out} cr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 mt-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs">
            © 2026 Single Core Labs. Built with precision in Mumbai.
          </div>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="https://github.com" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
