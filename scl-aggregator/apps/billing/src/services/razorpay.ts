import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { getOrCreateUser, topUpCredits } from "./billing";

// ── Razorpay Client ─────────────────────────────────────────

let razorpayInstance: Razorpay | null = null;

function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
    }
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

// ── Order Creation ──────────────────────────────────────────

export async function createRazorpayOrder(params: {
  userId: string;
  packName: string;
  email?: string;
}): Promise<{ orderId: string; amount: number; currency: string; keyId: string }> {
  const razorpay = getRazorpay();

  // Look up the credit pack
  const pack = await prisma.creditPack.findUnique({
    where: { name: params.packName },
  });
  if (!pack) throw new Error(`Credit pack "${params.packName}" not found`);

  // Ensure user exists
  const user = await getOrCreateUser(params.userId, params.email);

  // Razorpay amount is in paise (1 INR = 100 paise)
  const amountInPaise = Math.round(pack.priceInr * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `scl_${user.id}_${Date.now()}`,
    notes: {
      scl_user_id: user.id,
      scl_pack_name: pack.name,
      scl_credits: pack.credits.toString(),
    },
  });

  // Create pending transaction
  await prisma.transaction.create({
    data: {
      userId: user.id,
      type: "PURCHASE",
      amountCredits: pack.credits,
      amountInr: pack.priceInr,
      razorpayOrderId: order.id,
      status: "PENDING",
      description: `Razorpay order: ${pack.name} pack`,
    },
  });

  return {
    orderId: order.id,
    amount: amountInPaise,
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID!,
  };
}

// ── Webhook Handler ─────────────────────────────────────────

export async function handleRazorpayWebhook(
  body: string,
  signature: string
): Promise<{ received: boolean; event?: string }> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET not configured");
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    throw new Error("Invalid Razorpay webhook signature");
  }

  const payload = JSON.parse(body);
  const event = payload.event as string;

  switch (event) {
    case "payment.captured": {
      const payment = payload.payload?.payment?.entity;
      if (!payment) break;

      const orderId = payment.order_id as string;
      const notes = payment.notes as Record<string, string> | undefined;
      const userId = notes?.scl_user_id;
      const credits = parseInt(notes?.scl_credits ?? "0", 10);

      if (!userId || !credits) {
        console.error("Razorpay webhook: missing notes", notes);
        break;
      }

      // Mark pending transaction as completed
      const pendingTx = await prisma.transaction.findFirst({
        where: {
          razorpayOrderId: orderId,
          status: "PENDING",
        },
      });

      if (pendingTx) {
        await prisma.transaction.update({
          where: { id: pendingTx.id },
          data: {
            status: "COMPLETED",
            razorpayPaymentId: payment.id,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { creditBalance: { increment: credits } },
        });

        console.log(
          `✓ Razorpay: topped up ${credits} credits for user ${userId}`
        );
      } else {
        // Idempotent: check if already processed
        const existing = await prisma.transaction.findFirst({
          where: {
            razorpayOrderId: orderId,
            status: "COMPLETED",
          },
        });

        if (!existing) {
          await topUpCredits({
            userId,
            credits,
            amountInr: payment.amount / 100,
            razorpayOrderId: orderId,
            razorpayPaymentId: payment.id,
            description: `Razorpay payment: ${notes?.scl_pack_name ?? "unknown"} pack`,
          });
        }
      }

      break;
    }

    case "payment.failed": {
      const payment = payload.payload?.payment?.entity;
      if (payment?.order_id) {
        await prisma.transaction.updateMany({
          where: {
            razorpayOrderId: payment.order_id,
            status: "PENDING",
          },
          data: { status: "FAILED" },
        });
        console.log(`✗ Razorpay: payment failed for order ${payment.order_id}`);
      }
      break;
    }

    default:
      console.log(`Razorpay event: ${event} (unhandled)`);
  }

  return { received: true, event };
}
