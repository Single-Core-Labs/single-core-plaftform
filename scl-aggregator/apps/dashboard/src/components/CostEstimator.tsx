"use client";

import { useState } from "react";
import { ModelSelector } from "./ModelSelector";

export function CostEstimator() {
  const [model, setModel] = useState("gpt-4o");
  const [tokens, setTokens] = useState(1000);

  const models = [
    { id: "gpt-4o", price: 0.01 },
    { id: "claude-3-5-sonnet", price: 0.015 },
    { id: "gemini-1.5-pro", price: 0.007 },
    { id: "llama-3-70b", price: 0.002 },
  ];

  const currentModel = models.find(m => m.id === model);
  const estimatedCost = currentModel ? (currentModel.price * tokens) / 1000 : 0;

  return (
    <div className="rounded-lg border p-4 space-y-4 bg-card">
      <h3 className="font-bold">Cost Estimator</h3>
      <div className="space-y-2">
        <label className="text-sm font-medium">Model</label>
        <ModelSelector value={model} onChange={setModel} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Estimated Tokens</label>
        <input 
          type="number" 
          value={tokens}
          onChange={(e) => setTokens(Number(e.target.value))}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="pt-2 border-t flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Estimated Total</span>
        <span className="text-lg font-bold text-primary">${estimatedCost.toFixed(4)}</span>
      </div>
    </div>
  );
}
