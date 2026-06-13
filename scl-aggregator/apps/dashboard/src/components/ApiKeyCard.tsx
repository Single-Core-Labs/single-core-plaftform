"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";

export function ApiKeyCard({ name, apiKey, created }: { name: string, apiKey: string, created: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-xs text-muted-foreground">Created on {created}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 font-mono text-sm bg-muted p-2 rounded border truncate">
          {show ? apiKey : "scl_••••••••••••••••••••••••"}
        </div>
        <button onClick={() => setShow(!show)} className="p-2 hover:bg-accent rounded-md">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(apiKey)}
          className="p-2 hover:bg-accent rounded-md"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button className="p-2 hover:bg-accent rounded-md text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
