import { Router, Request, Response } from "express";
import { z } from "zod";
import { internalAuth } from "../middleware/auth";
import {
  deductCredits,
  getBalanceByExternalId,
  getCreditPacks,
  getUsageHistory,
} from "../services/billing";
import { createCheckoutSession } from "../services/stripe";
import { createRazorpayOrder } from "../services/razorpay";

const router = Router();

// ── Validation Schemas ──────────────────────────────────────

const purchaseSchema = z.object({
  userId: z.string().min(1),
  packName: z.enum(["starter", "builder", "pro", "enterprise"]),
  gateway: z.enum(["stripe", "razorpay"]),
  email: z.string().email().optional(),
});

const deductSchema = z.object({
  userId: z.string().min(1),
  model: z.string().min(1),
  provider: z.string().min(1),
  inputTokens: z.number().int().min(0),
  outputTokens: z.number().int().min(0),
});

// ── POST /credits/purchase ──────────────────────────────────
// Create a Stripe checkout session or Razorpay order

router.post("/purchase", async (req: Request, res: Response) => {
  try {
    const data = purchaseSchema.parse(req.body);

    if (data.gateway === "stripe") {
      const session = await createCheckoutSession({
        userId: data.userId,
        packName: data.packName,
        email: data.email,
      });
      res.json({
        gateway: "stripe",
        sessionId: session.sessionId,
        url: session.url,
      });
    } else {
      const order = await createRazorpayOrder({
        userId: data.userId,
        packName: data.packName,
        email: data.email,
      });
      res.json({
        gateway: "razorpay",
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        keyId: order.keyId,
      });
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Purchase error:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

// ── GET /credits/balance/:userId ────────────────────────────

router.get("/balance/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getBalanceByExternalId(userId as string);

    if (!result) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      userId: result.userId,
      balance: result.balance,
      // 1 credit = $0.01
      balanceUsd: (result.balance * 0.01).toFixed(2),
      balanceInr: (result.balance * 0.85).toFixed(2),
    });
  } catch (err: any) {
    console.error("Balance error:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

// ── POST /credits/deduct ────────────────────────────────────
// Internal endpoint: gateway calls this after each request

router.post("/deduct", internalAuth, async (req: Request, res: Response) => {
  try {
    const data = deductSchema.parse(req.body);
    const result = await deductCredits(data);

    if (!result.success) {
      res.status(402).json(result); // 402 Payment Required
      return;
    }

    res.json(result);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Deduct error:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

// ── GET /credits/usage/:userId ──────────────────────────────
// Usage history with date range and breakdown

router.get("/usage/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { from, to, limit, offset } = req.query;

    // Find internal user ID from external ID
    const userResult = await getBalanceByExternalId(userId as string);
    if (!userResult) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const history = await getUsageHistory({
      userId: userResult.userId,
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      offset: offset ? parseInt(offset as string, 10) : undefined,
    });

    res.json(history);
  } catch (err: any) {
    console.error("Usage error:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

// ── GET /credits/packs ──────────────────────────────────────
// List available credit packs

router.get("/packs", async (_req: Request, res: Response) => {
  try {
    const packs = await getCreditPacks();
    res.json({ packs });
  } catch (err: any) {
    console.error("Packs error:", err);
    res.status(500).json({ error: err.message ?? "Internal server error" });
  }
});

export default router;
