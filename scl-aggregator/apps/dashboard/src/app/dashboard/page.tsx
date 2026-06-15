import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { DailyRequestsChart, ModelDistributionChart } from "@/components/dashboard/Charts";
import { RequestsTable } from "@/components/dashboard/RequestsTable";
import { CacheStatsCard } from "@/components/dashboard/CacheStatsCard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

async function getDashboardData(userId: string) {
  // In production these would be internal service URLs
  const billingUrl = process.env.BILLING_SERVICE_URL || "http://localhost:8003";
  const gatewayUrl = process.env.GATEWAY_URL || "http://localhost:8001";

  try {
    // Parallel fetching from services
    const [balanceRes, statsRes, modelsRes] = await Promise.all([
      fetch(`${billingUrl}/credits/balance/${userId}`, { cache: 'no-store' }),
      fetch(`${billingUrl}/usage/stats?userId=${userId}`, { cache: 'no-store' }),
      fetch(`${gatewayUrl}/v1/models`, { 
        headers: { 'Authorization': 'Bearer sk-test-123' },
        cache: 'no-store' 
      }).catch(() => null) // Gateway might be down
    ]);

    const balanceData = balanceRes.ok ? await balanceRes.json() : { balanceInr: 0 };
    const statsData = statsRes.ok ? await statsRes.json() : {
      metrics: { totalRequests: 0, tokensUsed: 0, totalSpendInr: 0, cacheHitRate: 0 },
      requestsPerDay: [],
      modelDistribution: [],
      recentRequests: [],
      cacheStats: { hitRate: 0, entries: 0, tokensSaved: 0, costSavedInr: 0 }
    };
    const modelsData = modelsRes && modelsRes.ok ? await modelsRes.json() : [];

    return {
      balance: parseFloat(balanceData.balanceInr || "0"),
      metrics: statsData.metrics,
      requestsPerDay: statsData.requestsPerDay,
      modelDistribution: statsData.modelDistribution,
      recentRequests: statsData.recentRequests,
      cacheStats: statsData.cacheStats,
      models: modelsData
    };
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return {
      balance: 0,
      metrics: { totalRequests: 0, tokensUsed: 0, totalSpendInr: 0, cacheHitRate: 0 },
      requestsPerDay: [],
      modelDistribution: [],
      recentRequests: [],
      cacheStats: { hitRate: 0, entries: 0, tokensSaved: 0, costSavedInr: 0 },
      models: []
    };
  }
}

export default async function DashboardPage() {
  const userId = "test-user-123";
  const data = await getDashboardData(userId);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      <DashboardHeader userId={userId} balance={data.balance} />
      
      <div className="mb-2">
        <AlertsPanel />
      </div>

      <MetricCards 
        totalRequests={data.metrics.totalRequests}
        tokensUsed={data.metrics.tokensUsed}
        totalSpendInr={data.metrics.totalSpendInr}
        cacheHitRate={data.metrics.cacheHitRate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-xl border border-gray-800 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Traffic (Last 7 Days)</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span className="text-[10px] uppercase font-bold text-gray-400">Requests</span>
            </div>
          </div>
          <DailyRequestsChart data={data.requestsPerDay} />
        </div>
        
        <div className="p-6 rounded-xl border border-gray-800 bg-[#0a0a0a]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Model Usage</h3>
          <ModelDistributionChart data={data.modelDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-xl border border-gray-800 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Recent Activity</h3>
            <button className="text-[10px] uppercase font-bold text-blue-500 hover:text-blue-400 transition-colors">
              View All
            </button>
          </div>
          <RequestsTable requests={data.recentRequests} />
        </div>
        
        <div className="flex flex-col gap-6">
          <CacheStatsCard stats={data.cacheStats} />
          
          <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-blue-900/10 to-transparent">
            <h4 className="text-sm font-bold text-white mb-2">Need more credits?</h4>
            <p className="text-xs text-gray-400 mb-4">Enterprise plans offer custom limits and dedicated support.</p>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
