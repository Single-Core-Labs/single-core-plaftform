import React from "react";
import { Database, Zap, Sparkles, Coins } from "lucide-react";

interface CacheStats {
  hitRate: number;
  entries: number;
  tokensSaved: number;
  costSavedInr: number;
}

export function CacheStatsCard({ stats }: { stats: CacheStats }) {
  const items = [
    { label: "Hit Rate", value: `${(stats.hitRate * 100).toFixed(1)}%`, icon: Zap, color: "text-yellow-500" },
    { label: "Total Entries", value: stats.entries.toLocaleString(), icon: Database, color: "text-blue-500" },
    { label: "Tokens Saved", value: stats.tokensSaved.toLocaleString(), icon: Sparkles, color: "text-purple-500" },
    { label: "Cost Saved (₹)", value: `₹${stats.costSavedInr.toLocaleString()}`, icon: Coins, color: "text-green-500" },
  ];

  return (
    <div className="p-6 rounded-xl border border-gray-800 bg-[#0a0a0a]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Semantic Cache Performance</h3>
        <Zap className="w-5 h-5 text-yellow-500" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span className="text-[11px] font-medium text-gray-500 uppercase">{item.label}</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">{item.value}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p className="text-xs text-gray-400 leading-relaxed">
          Semantic caching reduces latency by serving similar requests from the edge, saving you tokens and cost across 
          multiple LLM providers.
        </p>
      </div>
    </div>
  );
}
