"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AlertsPanel() {
  const [status, setStatus] = useState<"healthy" | "degraded" | "loading">("loading");
  const [degradedProviders, setDegradedProviders] = useState<string[]>([]);

  useEffect(() => {
    // Polling function
    const checkGatewayHealth = async () => {
      try {
        // Assuming the gateway runs on port 8001 or there's a proxy in Next.js
        // We will fallback to a default URL if env is not set
        const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8001";
        
        // Use an AbortController to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`${gatewayUrl}/health`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          // Assuming the gateway returns { status: "ok" | "degraded", degraded_providers: [] }
          if (data.status === "degraded" || (data.degraded_providers && data.degraded_providers.length > 0)) {
            setStatus("degraded");
            setDegradedProviders(data.degraded_providers || ["Unknown Provider"]);
          } else {
            setStatus("healthy");
            setDegradedProviders([]);
          }
        } else {
          setStatus("degraded");
          setDegradedProviders(["Gateway Unreachable"]);
        }
      } catch (error) {
        setStatus("degraded");
        setDegradedProviders(["Gateway Offline"]);
      }
    };

    // Initial check
    checkGatewayHealth();

    // Poll every 30s
    const intervalId = setInterval(checkGatewayHealth, 30000);

    return () => clearInterval(intervalId);
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 p-4 border border-gray-800 bg-[#0a0a0a] rounded-lg animate-pulse">
        <div className="w-5 h-5 rounded-full bg-gray-700"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
      </div>
    );
  }

  if (status === "healthy") {
    return (
      <div className="flex items-center gap-3 p-4 border border-green-900/30 bg-green-900/10 rounded-lg">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <span className="text-sm font-medium text-green-400">All Systems Operational</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 border border-red-900/30 bg-red-900/10 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <span className="text-sm font-medium text-red-400">Provider Degraded</span>
      </div>
      <div className="ml-8 text-sm text-red-300/80">
        The following providers are experiencing issues: {degradedProviders.join(", ")}
      </div>
    </div>
  );
}
