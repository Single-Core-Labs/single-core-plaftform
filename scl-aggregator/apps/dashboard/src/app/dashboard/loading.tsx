import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-900">
          <div className="h-8 bg-gray-900 rounded w-48"></div>
          <div className="h-10 bg-gray-900 rounded w-32"></div>
        </div>

        {/* Alerts Skeleton */}
        <div className="h-14 bg-gray-900 rounded-lg w-full"></div>

        {/* Top Metrics Row Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-xl border border-gray-900 bg-[#050505] space-y-4">
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-xl border border-gray-900 bg-[#050505] space-y-6">
            <div className="h-5 bg-gray-800 rounded w-48"></div>
            <div className="h-64 bg-gray-900/50 rounded w-full"></div>
          </div>
          <div className="p-6 rounded-xl border border-gray-900 bg-[#050505] space-y-6">
            <div className="h-5 bg-gray-800 rounded w-32"></div>
            <div className="h-64 bg-gray-900/50 rounded w-full"></div>
          </div>
        </div>

        {/* Bottom Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cache Stats Skeleton */}
          <div className="p-6 rounded-xl border border-gray-900 bg-[#050505] space-y-6">
            <div className="h-5 bg-gray-800 rounded w-40"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-900/50 rounded w-full"></div>
              <div className="h-12 bg-gray-900/50 rounded w-full"></div>
              <div className="h-12 bg-gray-900/50 rounded w-full"></div>
            </div>
          </div>
          
          {/* Table Skeleton */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-gray-900 bg-[#050505] space-y-6">
            <div className="h-5 bg-gray-800 rounded w-48"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-900/50 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
