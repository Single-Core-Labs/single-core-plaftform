"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Zap, 
  Coins, 
  Cpu, 
  Clock, 
  RotateCcw, 
  Sparkles,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelResult {
  text: string;
  status: 'idle' | 'running' | 'done' | 'error';
  ttft: number | null;      // Time to first token (ms)
  totalTime: number | null; // Total latency (ms)
  tokens: number;
  cost: number;
  model: string;
}

const POLICIES = [
  { id: 'default', name: 'Default' },
  { id: 'quality_first', name: 'Quality First' },
  { id: 'cost_first', name: 'Cost First' },
  { id: 'latency_first', name: 'Latency First' },
];

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("Explain quantum computing in 3 sentences.");
  const [modelA, setModelA] = useState("gpt-4o");
  const [modelB, setModelB] = useState("claude-sonnet-4");
  const [policy, setPolicy] = useState("default");
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const [results, setResults] = useState<{ A: ModelResult, B: ModelResult }>({
    A: { text: "", status: 'idle', ttft: null, totalTime: null, tokens: 0, cost: 0, model: "" },
    B: { text: "", status: 'idle', ttft: null, totalTime: null, tokens: 0, cost: 0, model: "" },
  });

  const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8001";

  // ── Fetch Models ───────────────────────────────────────────

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`${gatewayUrl}/v1/models`, {
          headers: { 'Authorization': 'Bearer sk-test-123' }
        });
        if (res.ok) {
          const data = await res.json();
          setAvailableModels(data.map((m: any) => m.id));
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
        // Fallback
        setAvailableModels(["gpt-4o", "gpt-4o-mini", "claude-sonnet-4", "claude-opus-4", "llama-3.1-8b"]);
      }
    };
    fetchModels();
  }, [gatewayUrl]);

  // ── Streaming Implementation ───────────────────────────────

  async function streamModel(modelId: string, side: 'A' | 'B') {
    const startTime = performance.now();
    let firstTokenTime: number | null = null;
    let tokensCount = 0;

    setResults(prev => ({
      ...prev,
      [side]: { ...prev[side], text: "", status: 'running', ttft: null, totalTime: null, tokens: 0, cost: 0, model: modelId }
    }));

    try {
      const response = await fetch(`${gatewayUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-test-123'
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'user', content: prompt }],
          stream: true,
          routing_policy: policy
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content || "";
              
              if (delta) {
                if (firstTokenTime === null) {
                  firstTokenTime = performance.now() - startTime;
                }
                fullText += delta;
                tokensCount++;

                setResults(prev => ({
                  ...prev,
                  [side]: { 
                    ...prev[side], 
                    text: fullText, 
                    ttft: firstTokenTime,
                    tokens: tokensCount,
                    // Mock cost calculation for demo
                    cost: tokensCount * 0.0005 
                  }
                }));
              }
            } catch (e) {
              // Ignore parse errors for partial chunks
            }
          }
        }
      }

      const totalTime = performance.now() - startTime;
      setResults(prev => ({
        ...prev,
        [side]: { ...prev[side], status: 'done', totalTime }
      }));

    } catch (error) {
      console.error(`Error streaming model ${side}:`, error);
      setResults(prev => ({
        ...prev,
        [side]: { ...prev[side], status: 'error', text: `Error: ${error instanceof Error ? error.message : String(error)}` }
      }));
    }
  }

  const handleRun = () => {
    streamModel(modelA, 'A');
    streamModel(modelB, 'B');
  };

  const handleReset = () => {
    setResults({
      A: { text: "", status: 'idle', ttft: null, totalTime: null, tokens: 0, cost: 0, model: "" },
      B: { text: "", status: 'idle', ttft: null, totalTime: null, tokens: 0, cost: 0, model: "" },
    });
  };

  // ── Comparison Logic ───────────────────────────────────────

  const renderComparison = () => {
    if (results.A.status !== 'done' || results.B.status !== 'done') return null;

    const latencyDiff = (results.A.totalTime || 0) - (results.B.totalTime || 0);
    const fasterModel = latencyDiff > 0 ? 'Model B' : 'Model A';
    const absLatency = Math.abs(Math.round(latencyDiff));

    const costDiff = results.A.cost - results.B.cost;
    const cheaperModel = costDiff > 0 ? 'Model B' : 'Model A';
    const absCost = Math.abs(costDiff).toFixed(3);

    return (
      <div className="mt-8 p-4 rounded-xl border border-blue-900/30 bg-blue-900/10 flex items-center justify-center gap-2 text-sm font-medium text-blue-400">
        <Sparkles className="w-4 h-4" />
        <span>{fasterModel} was {absLatency}ms faster</span>
        <span className="text-gray-600 mx-2">·</span>
        <span>{cheaperModel} cost ₹{absCost} less</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-6 p-4 md:p-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Model Playground</h1>
          <p className="text-gray-400 text-sm">Compare latency, cost, and quality side-by-side.</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
          title="Reset Playground"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left Panel: Configuration */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">System Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-gray-600 transition-colors resize-none"
              placeholder="Enter your prompt here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Model A</label>
              <select 
                value={modelA} 
                onChange={(e) => setModelA(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-600"
              >
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Model B</label>
              <select 
                value={modelB} 
                onChange={(e) => setModelB(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-600"
              >
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Routing Policy</label>
            <div className="grid grid-cols-2 gap-2">
              {POLICIES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPolicy(p.id)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                    policy === p.id 
                      ? "bg-white text-black border-white" 
                      : "bg-[#0a0a0a] text-gray-400 border-gray-800 hover:border-gray-700"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <button 
              onClick={handleRun}
              disabled={results.A.status === 'running' || results.B.status === 'running'}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              Run Comparison
            </button>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-4 h-full overflow-hidden">
            {['A', 'B'].map((side) => {
              const res = results[side as 'A' | 'B'];
              return (
                <div key={side} className="flex flex-col rounded-xl border border-gray-800 bg-[#0a0a0a] overflow-hidden">
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        res.status === 'running' ? "bg-yellow-500 animate-pulse" : 
                        res.status === 'done' ? "bg-green-500" : "bg-gray-700"
                      )} />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {side === 'A' ? modelA : modelB}
                      </span>
                    </div>
                    {res.status === 'done' && (
                      <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full font-bold uppercase">
                        200 OK
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto font-serif text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                    {res.text || (
                      <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-2 opacity-50">
                        <Cpu className="w-8 h-8" />
                        <span className="text-xs uppercase tracking-widest font-bold">Waiting for run...</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-800 bg-[#050505] grid grid-cols-2 gap-2 shrink-0">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-900/50">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">TTFT</span>
                        <span className="text-xs font-mono text-white leading-none">{res.ttft ? `${Math.round(res.ttft)}ms` : '--'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-900/50">
                      <Clock className="w-3 h-3 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">Total</span>
                        <span className="text-xs font-mono text-white leading-none">{res.totalTime ? `${Math.round(res.totalTime)}ms` : '--'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-900/50">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">Tokens</span>
                        <span className="text-xs font-mono text-white leading-none">{res.tokens || '--'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-900/50">
                      <IndianRupee className="w-3 h-3 text-green-500" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">Cost</span>
                        <span className="text-xs font-mono text-white leading-none">₹{res.cost.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {renderComparison()}
        </div>
      </div>
    </div>
  );
}
