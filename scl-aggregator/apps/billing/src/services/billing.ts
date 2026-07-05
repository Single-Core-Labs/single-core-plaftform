import { prisma } from "../lib/prisma";
import { calculateCreditCost } from "../lib/pricing";
import { TransactionStatus, TransactionType } from "@prisma/client";

// ── Types ───────────────────────────────────────────────────

export interface DeductResult {
  success: boolean;
  remaining_balance: number;
  transaction_id: string;
  credits_deducted: number;
  error?: string;
}

export interface UsageEntry {
  id: string;
  type: TransactionType;
  credits: number;
  model: string | null;
  provider: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  tokensUsed: number | null;
  description: string | null;
  createdAt: Date;
}

// ── Core Operations ─────────────────────────────────────────

/**
 * Get or create a user by their external ID (from auth system).
 */
export async function getOrCreateUser(externalId: string, email?: string) {
  return prisma.user.upsert({
    where: { externalId },
    update: email ? { email } : {},
    create: { externalId, email },
  });
}

/**
 * Get the current credit balance for a user.
 */
export async function getBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true },
  });
  return user?.creditBalance ?? 0;
}

/**
 * Get balance by external user ID.
 */
export async function getBalanceByExternalId(
  externalId: string
): Promise<{ balance: number; userId: string } | null> {
  const user = await prisma.user.findUnique({
    where: { externalId },
    select: { id: true, creditBalance: true },
  });
  if (!user) return null;
  return { balance: user.creditBalance, userId: user.id };
}

/**
 * Top up credits after a successful payment.
 * Uses a transaction to ensure atomicity.
 */
export async function topUpCredits(params: {
  userId: string;
  credits: number;
  amountUsd?: number;
  amountInr?: number;
  stripeSessionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  description?: string;
}) {
  return prisma.$transaction(async (tx) => {
    // Create the transaction record
    const txn = await tx.transaction.create({
      data: {
        userId: params.userId,
        type: TransactionType.PURCHASE,
        amountCredits: params.credits,
        amountUsd: params.amountUsd,
        amountInr: params.amountInr,
        stripeSessionId: params.stripeSessionId,
        razorpayOrderId: params.razorpayOrderId,
        razorpayPaymentId: params.razorpayPaymentId,
        status: TransactionStatus.COMPLETED,
        description:
          params.description ?? `Purchased ${params.credits} credits`,
      },
    });

    // Increment user balance
    const user = await tx.user.update({
      where: { id: params.userId },
      data: { creditBalance: { increment: params.credits } },
    });

    return { transaction: txn, newBalance: user.creditBalance };
  });
}

/**
 * Deduct credits for an API request.
 * Called by the gateway after each completed request.
 */
export async function deductCredits(params: {
  userId: string;
  model: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
}): Promise<DeductResult> {
  const totalTokens = params.inputTokens + params.outputTokens;
  const creditCost = Math.ceil(
    calculateCreditCost(params.model, params.inputTokens, params.outputTokens)
  );

  // Minimum 1 credit per request
  const creditsToDeduct = Math.max(1, creditCost);

  return prisma.$transaction(async (tx) => {
    // Check balance
    const user = await tx.user.findUnique({
      where: { id: params.userId },
      select: { creditBalance: true },
    });

    if (!user) {
      return {
        success: false,
        remaining_balance: 0,
        transaction_id: "",
        credits_deducted: 0,
        error: "User not found",
      };
    }

    if (user.creditBalance < creditsToDeduct) {
      return {
        success: false,
        remaining_balance: user.creditBalance,
        transaction_id: "",
        credits_deducted: 0,
        error: "Insufficient credits",
      };
    }

    // Create deduction transaction
    const txn = await tx.transaction.create({
      data: {
        userId: params.userId,
        type: TransactionType.DEDUCTION,
        amountCredits: -creditsToDeduct,
        model: params.model,
        provider: params.provider,
        tokensUsed: totalTokens,
        inputTokens: params.inputTokens,
        outputTokens: params.outputTokens,
        status: TransactionStatus.COMPLETED,
        description: `${params.model} · ${totalTokens} tokens`,
      },
    });

    // Decrement balance
    const updatedUser = await tx.user.update({
      where: { id: params.userId },
      data: { creditBalance: { decrement: creditsToDeduct } },
    });

    return {
      success: true,
      remaining_balance: updatedUser.creditBalance,
      transaction_id: txn.id,
      credits_deducted: creditsToDeduct,
    };
  });
}

/**
 * Get usage history for a user within a date range.
 */
export async function getUsageHistory(params: {
  userId: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
}): Promise<{
  transactions: UsageEntry[];
  total: number;
  summary: {
    totalCreditsUsed: number;
    totalTokens: number;
    byModel: Record<string, { credits: number; tokens: number; requests: number }>;
    byProvider: Record<string, { credits: number; tokens: number; requests: number }>;
  };
}> {
  const where: any = { userId: params.userId };

  if (params.from || params.to) {
    where.createdAt = {};
    if (params.from) where.createdAt.gte = params.from;
    if (params.to) where.createdAt.lte = params.to;
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: params.limit ?? 100,
      skip: params.offset ?? 0,
    }),
    prisma.transaction.count({ where }),
  ]);

  // Build summary
  let totalCreditsUsed = 0;
  let totalTokens = 0;
  const byModel: Record<
    string,
    { credits: number; tokens: number; requests: number }
  > = {};
  const byProvider: Record<
    string,
    { credits: number; tokens: number; requests: number }
  > = {};

  for (const txn of transactions) {
    if (txn.type === TransactionType.DEDUCTION) {
      const credits = Math.abs(txn.amountCredits);
      const tokens = txn.tokensUsed ?? 0;
      totalCreditsUsed += credits;
      totalTokens += tokens;

      if (txn.model) {
        if (!byModel[txn.model]) {
          byModel[txn.model] = { credits: 0, tokens: 0, requests: 0 };
        }
        byModel[txn.model].credits += credits;
        byModel[txn.model].tokens += tokens;
        byModel[txn.model].requests += 1;
      }

      if (txn.provider) {
        if (!byProvider[txn.provider]) {
          byProvider[txn.provider] = { credits: 0, tokens: 0, requests: 0 };
        }
        byProvider[txn.provider].credits += credits;
        byProvider[txn.provider].tokens += tokens;
        byProvider[txn.provider].requests += 1;
      }
    }
  }

  return {
    transactions: transactions.map((t) => ({
      id: t.id,
      type: t.type,
      credits: t.amountCredits,
      model: t.model,
      provider: t.provider,
      inputTokens: t.inputTokens,
      outputTokens: t.outputTokens,
      tokensUsed: t.tokensUsed,
      description: t.description,
      createdAt: t.createdAt,
    })),
    total,
    summary: { totalCreditsUsed, totalTokens, byModel, byProvider },
  };
}

/**
 * Get all active credit packs.
 */
export async function getCreditPacks() {
  return prisma.creditPack.findMany({
    where: { active: true },
    orderBy: { priceUsd: "asc" },
  });
}
