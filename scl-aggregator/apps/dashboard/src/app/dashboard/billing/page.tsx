"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CreditCard, 
  IndianRupee, 
  History, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  type: 'PURCHASE' | 'DEDUCTION' | 'REFUND' | 'ADJUSTMENT';
  credits: number;
  model: string | null;
  description: string | null;
  createdAt: string;
  balanceAfter?: number;
}

interface CreditPack {
  name: string;
  credits: number;
  priceInr: number;
  priceUsd: number;
  description: string;
}

const CREDIT_PACKS: CreditPack[] = [
  { name: "Starter", credits: 85000, priceInr: 850, priceUsd: 10, description: "Perfect for hobbyists and developers testing ideas." },
  { name: "Growth", credits: 420000, priceInr: 4200, priceUsd: 50, description: "Ideal for growing startups and small production apps." },
  { name: "Scale", credits: 850000, priceInr: 8500, priceUsd: 100, description: "Built for scaling products with high traffic." },
  { name: "Enterprise", credits: 4200000, priceInr: 42000, priceUsd: 500, description: "For large scale enterprise AI transformation." },
];

function BillingContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  
  const [balance, setBalance] = useState({ credits: 420000, inr: 4200, usd: 50 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [usageData, setUsageData] = useState<{ name: string; spend: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const userId = "test-user-123";
  const billingUrl = process.env.NEXT_PUBLIC_BILLING_URL || "http://localhost:8003";

  // ── Load Data ──────────────────────────────────────────────

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, historyRes] = await Promise.all([
          fetch(`${billingUrl}/credits/balance/${userId}`),
          fetch(`${billingUrl}/credits/usage/${userId}`)
        ]);

        if (balanceRes.ok) {
          const data = await balanceRes.json();
          setBalance({ 
            credits: data.balance, 
            inr: parseFloat(data.balanceInr), 
            usd: parseFloat(data.balanceUsd) 
          });
        }

        if (historyRes.ok) {
          const data = await historyRes.json();
          setTransactions(data.transactions);
          
          // Format data for chart
          const byModel = data.summary.byModel;
          const chartData = Object.entries(byModel).map(([name, stats]: [string, any]) => ({
            name,
            spend: stats.credits * 0.01 // INR
          })).sort((a, b) => b.spend - a.spend);
          setUsageData(chartData);
        }
      } catch (error) {
        console.error("Failed to fetch billing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [billingUrl, userId]);

  // ── Payment Handlers ───────────────────────────────────────

  const handlePurchase = async (pack: CreditPack) => {
    try {
      const res = await fetch(`${billingUrl}/credits/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          packName: pack.name.toLowerCase(),
          gateway: currency === 'INR' ? 'razorpay' : 'stripe',
          email: "test@example.com"
        })
      });

      if (!res.ok) throw new Error("Failed to initiate purchase");
      const data = await res.json();

      if (currency === 'STRIPE' || data.gateway === 'stripe') {
        window.location.href = data.url;
      } else {
        // Razorpay integration
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "Single Core Labs",
          description: `Credits — ${pack.name} Pack`,
          order_id: data.orderId,
          handler: function (response: any) {
            window.location.href = `/dashboard/billing?status=success&payment_id=${response.razorpay_payment_id}`;
          },
          prefill: {
            email: "test@example.com",
          },
          theme: {
            color: "#000000",
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Could not initiate payment. Please try again.");
    }
  };

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Billing & Credits</h1>
          <p className="text-gray-400 text-sm">Manage your credit balance and transaction history.</p>
        </div>

        <div className="flex items-center gap-1 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setCurrency('INR')}
            className={cn("px-3 py-1.5 rounded-md text-xs font-bold transition-all", currency === 'INR' ? "bg-white text-black" : "text-gray-500 hover:text-gray-300")}
          >
            INR
          </button>
          <button 
            onClick={() => setCurrency('USD')}
            className={cn("px-3 py-1.5 rounded-md text-xs font-bold transition-all", currency === 'USD' ? "bg-white text-black" : "text-gray-500 hover:text-gray-300")}
          >
            USD
          </button>
        </div>
      </div>

      {status === "success" && (
        <div className="p-4 rounded-xl border border-green-900/30 bg-green-900/10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-sm font-medium text-green-400">Payment successful! Your credits will be updated shortly.</p>
        </div>
      )}

      {status === "cancelled" && (
        <div className="p-4 rounded-xl border border-red-900/30 bg-red-900/10 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm font-medium text-red-400">Payment cancelled or failed. Please try again.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1 p-6 rounded-2xl border border-gray-800 bg-[#0a0a0a] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Current Balance</span>
              <div className="p-2 rounded-lg bg-white/5">
                <IndianRupee className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2 font-mono">
              ₹{balance.inr.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mb-6">{balance.credits.toLocaleString()} credits remaining</p>
            
            <div className="space-y-2 mb-8">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-gray-400">Usage this month</span>
                <span className="text-white">64%</span>
              </div>
              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[64%]" />
              </div>
              <p className="text-[10px] text-gray-500">Estimated duration: 12 days remaining at current rate</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-[10px] text-gray-400">Secure payments powered by {currency === 'INR' ? 'Razorpay' : 'Stripe'}</span>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-800 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Spend Breakdown</h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-[10px] uppercase font-bold text-gray-400">Top Models</span>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  cursor={{ fill: '#1a1a1a' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="spend" radius={[4, 4, 0, 0]}>
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#fff' : '#444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Credit Packs */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Add Credits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREDIT_PACKS.map((pack) => (
            <div key={pack.name} className="p-6 rounded-2xl border border-gray-800 bg-[#0a0a0a] flex flex-col hover:border-gray-700 transition-colors group">
              <h4 className="text-sm font-bold text-gray-400 mb-1">{pack.name}</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-white">
                  {currency === 'INR' ? `₹${pack.priceInr.toLocaleString()}` : `$${pack.priceUsd}`}
                </span>
              </div>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Plus className="w-3 h-3 text-white" />
                  <span>{pack.credits.toLocaleString()} credits</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{pack.description}</p>
              </div>

              <button 
                onClick={() => handlePurchase(pack)}
                className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                Buy with {currency === 'INR' ? 'UPI / Card' : 'Card'}
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Transaction History</h3>
          <button className="text-[10px] uppercase font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1">
            Download Invoice <ArrowDownRight className="w-3 h-3" />
          </button>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#0a0a0a] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-gray-500">No transactions yet.</TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString()} · {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
                        tx.type === 'PURCHASE' ? "bg-green-900/20 text-green-500" : "bg-blue-900/20 text-blue-500"
                      )}>
                        {tx.type}
                      </span>
                    </TableCell>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-white">{tx.description || tx.model || "System Adjustment"}</span>
                        {tx.model && <span className="text-[10px] text-gray-500 font-mono uppercase">{tx.model}</span>}
                      </div>
                    </td>
                    <TableCell className={cn(
                      "text-right font-mono font-bold",
                      tx.credits > 0 ? "text-green-500" : "text-gray-300"
                    )}>
                      {tx.credits > 0 ? `+${tx.credits.toLocaleString()}` : tx.credits.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-[10px] text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        COMPLETED
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading billing...</div>}>
      <BillingContent />
    </Suspense>
  );
}
