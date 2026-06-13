"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const allModels = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", context: "128k", inputPrice: "$5.00", outputPrice: "$15.00" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", context: "128k", inputPrice: "$10.00", outputPrice: "$30.00" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", context: "200k", inputPrice: "$3.00", outputPrice: "$15.00" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", context: "200k", inputPrice: "$15.00", outputPrice: "$75.00" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", context: "2M", inputPrice: "$3.50", outputPrice: "$10.50" },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", context: "8k", inputPrice: "$0.59", outputPrice: "$0.79" },
];

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("All");

  const providers = ["All", ...Array.from(new Set(allModels.map(m => m.provider)))];

  const filteredModels = allModels.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase()) || 
                         model.provider.toLowerCase().includes(search.toLowerCase());
    const matchesProvider = providerFilter === "All" || model.provider === providerFilter;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Available Models</h1>
        <p className="text-muted-foreground">Comprehensive list of all supported models and their pricing.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select 
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {providers.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 transition-colors">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Model</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Provider</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Context Window</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Input / 1M tokens</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Output / 1M tokens</th>
            </tr>
          </thead>
          <tbody>
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <tr key={model.id} className="border-b transition-colors hover:bg-muted/30">
                  <td className="p-4 align-middle font-medium">{model.name}</td>
                  <td className="p-4 align-middle">{model.provider}</td>
                  <td className="p-4 align-middle">{model.context}</td>
                  <td className="p-4 align-middle">{model.inputPrice}</td>
                  <td className="p-4 align-middle">{model.outputPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground italic">
                  No models match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
