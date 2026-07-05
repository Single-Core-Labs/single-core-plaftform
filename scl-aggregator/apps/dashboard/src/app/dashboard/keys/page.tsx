"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Key, 
  Trash2, 
  Copy, 
  Check, 
  AlertTriangle,
  ExternalLink,
  MoreVertical,
  Calendar,
  Zap,
  IndianRupee
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  requests: number;
  spend: number;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<ApiKey | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  const userId = "test-user-123"; // Mock user for now
  const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8001";

  // ── Data Fetching ──────────────────────────────────────────

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch(`${gatewayUrl}/v1/keys?user_id=${userId}`, {
          headers: { 'Authorization': 'Bearer sk-test-123' }
        });
        if (res.ok) {
          const data = await res.json();
          setKeys(data);
        }
      } catch (error) {
        console.error("Failed to fetch keys:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKeys();
  }, [gatewayUrl, userId]);

  // ── Handlers ───────────────────────────────────────────────

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      const res = await fetch(`${gatewayUrl}/v1/keys`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-test-123'
        },
        body: JSON.stringify({ userId, name: newKeyName })
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedKey(data);
        // Add to list with masked version for optimistic update
        const maskedKey = {
          ...data,
          key: `${data.key.substring(0, 6)}...${data.key.substring(data.key.length - 4)}`,
          requests: 0,
          spend: 0,
          lastUsed: null
        };
        setKeys([maskedKey, ...keys]);
        setNewKeyName("");
      }
    } catch (error) {
      console.error("Failed to create key:", error);
    }
  };

  const handleRevokeKey = async (id: string) => {
    setIsRevoking(id);
    try {
      const res = await fetch(`${gatewayUrl}/v1/keys/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer sk-test-123' }
      });

      if (res.ok) {
        setKeys(keys.filter(k => k.id !== id));
      }
    } catch (error) {
      console.error("Failed to revoke key:", error);
    } finally {
      setIsRevoking(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">API Keys</h1>
          <p className="text-gray-400 text-sm">Manage authentication keys for your applications.</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) setCreatedKey(null);
        }}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
              <Plus className="w-4 h-4" />
              Create New Key
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {!createdKey ? (
              <>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Give your key a name to identify it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <input
                    type="text"
                    placeholder="e.g. Production Frontend"
                    className="w-full bg-[#050505] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-600 transition-colors"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <button 
                    onClick={handleCreateKey}
                    className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Generate Key
                  </button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Key Created Successfully
                  </DialogTitle>
                  <DialogDescription className="text-red-400 font-medium">
                    Please copy this key now. It will not be shown again for security reasons.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  <div className="flex items-center gap-2 bg-[#050505] border border-gray-800 rounded-lg p-3 font-mono text-sm group">
                    <span className="flex-1 text-gray-300 break-all">{createdKey.key}</span>
                    <button 
                      onClick={() => copyToClipboard(createdKey.key)}
                      className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-900/10 border border-yellow-900/30 rounded-lg mb-4">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-yellow-500/80 leading-relaxed">
                    If you lose this key, you will need to revoke it and create a new one. SCL does not store plain-text keys.
                  </p>
                </div>
                <DialogFooter>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    I've saved the key
                  </button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <div className="h-8 bg-gray-900 animate-pulse rounded w-full"></div>
            <div className="h-12 bg-gray-900 animate-pulse rounded w-full"></div>
            <div className="h-12 bg-gray-900 animate-pulse rounded w-full"></div>
          </div>
        ) : keys.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <Key className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">No API keys found</h3>
              <p className="text-gray-500 text-sm">Create your first key to start using the SCL API.</p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Secret Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium text-white">{key.name}</TableCell>
                  <TableCell className="font-mono text-gray-500 text-xs">{key.key}</TableCell>
                  <TableCell className="text-gray-400 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(key.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs">
                    {key.lastUsed ? (
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        {new Date(key.lastUsed).toLocaleDateString()}
                      </div>
                    ) : 'Never'}
                  </TableCell>
                  <TableCell className="text-right text-white font-mono">{key.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white font-mono">₹{key.spend.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/dashboard/usage?key=${key.id}`}
                        className="p-2 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                        title="View Usage"
                      >
                        <Activity className="w-4 h-4" />
                      </Link>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            className="p-2 hover:bg-red-900/20 rounded-md transition-colors text-gray-400 hover:text-red-500"
                            title="Revoke Key"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Revoke API Key</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to revoke <span className="text-white font-bold">{key.name}</span>? 
                              This action cannot be undone and any services using this key will immediately stop working.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-4">
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">
                              Cancel
                            </button>
                            <button 
                              onClick={() => handleRevokeKey(key.id)}
                              disabled={isRevoking === key.id}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 disabled:opacity-50"
                            >
                              {isRevoking === key.id ? "Revoking..." : "Yes, Revoke Key"}
                            </button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="p-6 rounded-xl border border-blue-900/20 bg-blue-900/5 flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-blue-400">Security Best Practices</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Never share your API keys or expose them in client-side code. Use environment variables to store them securely 
            on your server. If you suspect a key has been compromised, revoke it immediately and generate a new one.
          </p>
        </div>
      </div>
    </div>
  );
}
