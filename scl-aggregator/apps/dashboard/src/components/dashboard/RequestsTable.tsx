import React from "react";

interface Request {
  id: string;
  timestamp: string;
  model: string;
  intent: string;
  tokens: number;
  costInr: number;
  latencyMs: number;
  status: string | number;
}

export function RequestsTable({ requests }: { requests: Request[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Intent</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Tokens</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Cost (₹)</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Latency</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-800/20 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-300">
                {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-white">{req.model}</td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px] uppercase font-bold">
                  {req.intent}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-300 text-right font-mono">{req.tokens.toLocaleString()}</td>
              <td className="py-3 px-4 text-sm text-gray-300 text-right font-mono">₹{req.costInr.toFixed(3)}</td>
              <td className="py-3 px-4 text-sm text-gray-300 text-right font-mono">{req.latencyMs}ms</td>
              <td className="py-3 px-4 text-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  req.status === 'cached' 
                    ? 'bg-blue-900/30 text-blue-400' 
                    : req.status === 200 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                }`}>
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
