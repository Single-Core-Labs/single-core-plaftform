import React from "react";

interface DashboardHeaderProps {
  userId: string;
  balance: number;
}

export function DashboardHeader({ userId, balance }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {userId}</p>
      </div>
      
      <div className="flex items-center gap-3 p-3 px-4 rounded-xl border border-gray-800 bg-[#0a0a0a]">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Current Balance</span>
          <span className="text-lg font-mono font-bold text-white">₹{balance.toLocaleString()}</span>
        </div>
        <div className="h-8 w-[1px] bg-gray-800 mx-2" />
        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          Top Up
        </button>
      </div>
    </div>
  );
}
