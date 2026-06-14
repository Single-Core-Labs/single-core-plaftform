import { Router, Request, Response } from "express";
import { handleStripeWebhook } from "../services/stripe";
import { handleRazorpayWebhook } from "../services/razorpay";

const router = Router();

// ── POST /webhooks/stripe ───────────────────────────────────
// Stripe sends the raw body — must NOT be parsed as JSON.
// The parent app must set up raw body parsing for this route.

router.post("/stripe", async (req: Request, res: Response) => {
  try {
    const signature = req.headers["stripe-signature"] as string;
    if (!signature) {
      res.status(400).json({ error: "Missing stripe-signature header" });
      return;
    }

    // req.body should be a raw Buffer for Stripe signature verification
    const rawBody = (req as any).rawBody as Buffer;
    if (!rawBody) {
      res
        .status(400)
        .json({ error: "Raw body not available for signature verification" });
      return;
    }

    const result = await handleStripeWebhook(rawBody, signature);
    res.json(result);
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ── POST /webhooks/razorpay ─────────────────────────────────

router.post("/razorpay", async (req: Request, res: Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    if (!signature) {
      res.status(400).json({ error: "Missing x-razorpay-signature header" });
      return;
    }

    const rawBody = (req as any).rawBody as Buffer;
    if (!rawBody) {
      res
        .status(400)
        .json({ error: "Raw body not available for signature verification" });
      return;
    }

    const result = await handleRazorpayWebhook(rawBody.toString(), signature);
    res.json(result);
  } catch (err: any) {
    console.error("Razorpay webhook error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
