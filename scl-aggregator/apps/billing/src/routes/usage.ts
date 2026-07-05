import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/stats", async (req: Request, res: Response) => {
  try {
    const { from, to, userId } = req.query;
    
    // In a real app, we'd filter by from/to dates and userId (if provided via auth)
    // For this dashboard, we will return some aggregated stats and mock the observability parts
    
    // Default to the last 7 days if not provided
    const toDate = to ? new Date(to as string) : new Date();
    const fromDate = from ? new Date(from as string) : new Date(toDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const whereClause: any = {
      type: "DEDUCTION",
      status: "COMPLETED",
      createdAt: {
        gte: fromDate,
        lte: toDate,
      }
    };
    
    if (userId) {
      whereClause.userId = userId;
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    // 1. Top Metrics
    const totalRequests = transactions.length;
    const tokensUsed = transactions.reduce((acc, t) => acc + (t.tokensUsed || 0), 0);
    // Cost in INR. (amountCredits is negative for deductions, so we take abs and divide by 100 since 1 credit = 0.01 INR)
    const totalCreditsUsed = transactions.reduce((acc, t) => acc + Math.abs(t.amountCredits), 0);
    const totalSpendInr = totalCreditsUsed * 0.01;
    
    // Mock Cache Hit Rate (assume 38% based on user's spec)
    const cacheHitRate = 0.38;

    // 2. Line Chart (Requests per day over last 7 days)
    // Group transactions by day
    const dailyDataMap = new Map<string, number>();
    for (let i = 0; i <= 6; i++) {
      const d = new Date(toDate.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      dailyDataMap.set(dateStr, 0);
    }

    for (const t of transactions) {
      const dateStr = t.createdAt.toISOString().split('T')[0];
      if (dailyDataMap.has(dateStr)) {
        dailyDataMap.set(dateStr, dailyDataMap.get(dateStr)! + 1);
      }
    }
    
    const requestsPerDay = Array.from(dailyDataMap.entries())
      .map(([date, requests]) => ({ date, requests }))
      .sort((a, b) => a.date.localeCompare(b.date)); // Sort chronologically

    // 3. Model Distribution
    const modelCounts = new Map<string, number>();
    for (const t of transactions) {
      const m = t.model || 'unknown';
      modelCounts.set(m, (modelCounts.get(m) || 0) + 1);
    }
    
    const modelDistribution = Array.from(modelCounts.entries()).map(([name, count]) => ({
      name,
      percentage: totalRequests > 0 ? (count / totalRequests) * 100 : 0
    }));

    // 4. Recent Requests Table (with mocked observability data)
    const intents = ["chat", "summarize", "extract", "translate", "code_generation"];
    const statuses = [200, "cached", 200, 200, 503];
    
    const recentRequests = transactions.slice(0, 50).map((t, index) => ({
      id: t.id,
      timestamp: t.createdAt.toISOString(),
      model: t.model || "unknown",
      // Mocked fields:
      intent: intents[index % intents.length],
      tokens: t.tokensUsed || 0,
      costInr: Math.abs(t.amountCredits) * 0.01,
      latencyMs: Math.floor(Math.random() * 500) + 50, // 50 to 550ms
      status: Math.random() < cacheHitRate ? "cached" : statuses[index % statuses.length],
    }));

    // 6. Semantic Cache Stats Card
    const cacheStats = {
      hitRate: cacheHitRate,
      entries: 14205, // mock
      tokensSaved: Math.floor(tokensUsed * 0.45), // mock
      costSavedInr: Math.floor(totalSpendInr * 0.45) // mock
    };

    res.json({
      metrics: {
        totalRequests,
        tokensUsed,
        totalSpendInr,
        cacheHitRate
      },
      requestsPerDay,
      modelDistribution,
      recentRequests,
      cacheStats
    });

  } catch (error) {
    console.error("Error fetching usage stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
