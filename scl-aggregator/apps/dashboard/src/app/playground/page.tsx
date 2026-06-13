"use client";

import { useState } from "react";
import { ModelSelector } from "@/components/ModelSelector";
import { Send, Clock, CircleDollarSign } from "lucide-react";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [modelA, setModelA] = useState("gpt-4o");
  const [modelB, setModelB] = useState("claude-3-5-sonnet");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ a?: any, b?: any }>({});

  const handleRun = async () => {
    setLoading(true);
    // Mock response
    setTimeout(() => {
      setResults({
        a: { text: "This is a response from GPT-4o. It is fast and reliable.", latency: 450, cost: 0.002 },
        b: { text: "This is a response from Claude 3.5 Sonnet. It is nuanced and intelligent.", latency: 620, cost: 0.003 },
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="px-6 h-14 flex items-center border-b border-border/40">
        <h1 className="font-bold">Model Playground</h1>
      </header>
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Prompt</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <button
              onClick={handleRun}
              disabled={loading || !prompt}
              className="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-9 px-4 disabled:opacity-50"
            >
              {loading ? "Running..." : <><Send className="mr-2 h-4 w-4" /> Run</>}
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
          {/* Model A */}
          <div className="flex flex-col gap-4 overflow-hidden">
            <ModelSelector value={modelA} onChange={setModelA} />
            <div className="flex-1 rounded-md border border-border bg-muted/30 p-4 overflow-auto relative">
              {results.a ? (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">{results.a.text}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {results.a.latency}ms</span>
                    <span className="flex items-center"><CircleDollarSign className="mr-1 h-3 w-3" /> ${results.a.cost}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Run a prompt to see results
                </div>
              )}
            </div>
          </div>

          {/* Model B */}
          <div className="flex flex-col gap-4 overflow-hidden">
            <ModelSelector value={modelB} onChange={setModelB} />
            <div className="flex-1 rounded-md border border-border bg-muted/30 p-4 overflow-auto relative">
              {results.b ? (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">{results.b.text}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {results.b.latency}ms</span>
                    <span className="flex items-center"><CircleDollarSign className="mr-1 h-3 w-3" /> ${results.b.cost}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Run a prompt to see results
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
