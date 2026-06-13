"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search, Cpu, Zap, Globe, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const models = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", price: "0.01", icon: Zap },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", price: "0.015", icon: MessageSquare },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google", price: "0.007", icon: Globe },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", price: "0.002", icon: Cpu },
];

export function ModelSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredModels = models.filter((m) => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.provider.toLowerCase().includes(search.toLowerCase())
  );

  const selectedModel = models.find((m) => m.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          {selectedModel && <selectedModel.icon className="h-4 w-4 text-muted-foreground" />}
          {selectedModel ? selectedModel.name : "Select model..."}
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 overflow-hidden">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="p-1 max-h-[200px] overflow-y-auto">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    onChange(model.id);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === model.id && "bg-accent text-accent-foreground"
                  )}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === model.id ? "opacity-100" : "opacity-0")} />
                  <model.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.provider} • ${model.price}/1k</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">No models found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
