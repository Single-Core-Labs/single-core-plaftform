import React from "react";
import { Activity, Cpu, IndianRupee, Zap } from "lucide-react";

interface MetricCardsProps {
  totalRequests: number;
  tokensUsed: number;
  totalSpendInr: number;
  cacheHitRate: number;
}

export function MetricCards({ totalRequests, tokensUsed, totalSpendInr, cacheHitRate }: MetricCardsProps) {
  const cards = [
    {
      title: "Total Requests",
      value: totalRequests.toLocaleString(),
      icon: Activity,
      color: "text-blue-500",
    },
    {
      title: "Tokens Used",
      value: tokensUsed.toLocaleString(),
      icon: Cpu,
      color: "text-purple-500",
    },
    {
      title: "Total Spend (₹)",
      value: `₹${totalSpendInr.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-500",
    },
    {
      title: "Cache Hit Rate",
      value: `${(cacheHitRate * 100).toFixed(1)}%`,
      icon: Zap,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="p-5 rounded-xl border border-gray-800 bg-[#0a0a0a] hover:border-gray-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.title}</span>
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
