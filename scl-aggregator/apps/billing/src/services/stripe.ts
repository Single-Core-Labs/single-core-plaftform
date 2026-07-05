import Stripe from "stripe";
import { prisma } from "../lib/prisma";
import { getOrCreateUser, topUpCredits } from "./billing";

// ── Stripe Client ───────────────────────────────────────────

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    stripeInstance = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  }
  return stripeInstance;
}

// ── Checkout Session ────────────────────────────────────────

export async function createCheckoutSession(params: {
  userId: string;
  packName: string;
  email?: string;
}): Promise<{ sessionId: string; url: string }> {
  const stripe = getStripe();

  // Look up the credit pack
  const pack = await prisma.creditPack.findUnique({
    where: { name: params.packName },
  });
  if (!pack) throw new Error(`Credit pack "${params.packName}" not found`);

  // Ensure user exists
  const user = await getOrCreateUser(params.userId, params.email);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `SCL Credits — ${pack.name}`,
            description: `${pack.credits.toLocaleString()} credits for the SCL Aggregator`,
          },
          unit_amount: Math.round(pack.priceUsd * 100), // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      scl_user_id: user.id,
      scl_pack_name: pack.name,
      scl_credits: pack.credits.toString(),
    },
    success_url:
      process.env.STRIPE_SUCCESS_URL ??
      "https://dashboard.singlecorelabs.in/credits?status=success",
    cancel_url:
      process.env.STRIPE_CANCEL_URL ??
      "https://dashboard.singlecorelabs.in/credits?status=cancelled",
  });

  // Create a pending transaction
  await prisma.transaction.create({
    data: {
      userId: user.id,
      type: "PURCHASE",
      amountCredits: pack.credits,
      amountUsd: pack.priceUsd,
      stripeSessionId: session.id,
      status: "PENDING",
      description: `Stripe checkout: ${pack.name} pack`,
    },
  });

  return { sessionId: session.id, url: session.url! };
}

// ── Webhook Handler ─────────────────────────────────────────

export async function handleStripeWebhook(
  body: Buffer,
  signature: string
): Promise<{ received: boolean; event?: string }> {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET not configured");

  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.scl_user_id;
      const credits = parseInt(session.metadata?.scl_credits ?? "0", 10);

      if (!userId || !credits) {
        console.error("Stripe webhook: missing metadata", session.metadata);
        break;
      }

      // Mark the pending transaction as completed and top up
      const pendingTx = await prisma.transaction.findFirst({
        where: {
          stripeSessionId: session.id,
          status: "PENDING",
        },
      });

      if (pendingTx) {
        await prisma.transaction.update({
          where: { id: pendingTx.id },
          data: { status: "COMPLETED" },
        });

        // Update user balance
        await prisma.user.update({
          where: { id: userId },
          data: { creditBalance: { increment: credits } },
        });

        console.log(
          `✓ Stripe: topped up ${credits} credits for user ${userId}`
        );
      } else {
        // No pending transaction — do a direct top-up (idempotent check)
        const existing = await prisma.transaction.findFirst({
          where: {
            stripeSessionId: session.id,
            status: "COMPLETED",
          },
        });

        if (!existing) {
          await topUpCredits({
            userId,
            credits,
            amountUsd:
              session.amount_total != null
                ? session.amount_total / 100
                : undefined,
            stripeSessionId: session.id,
            description: `Stripe payment: ${session.metadata?.scl_pack_name ?? "unknown"} pack`,
          });
        }
      }

      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      // Handle refund — find the original transaction and reverse credits
      console.log(`Stripe refund received for charge ${charge.id}`);
      break;
    }

    default:
      // Unhandled event type — log and acknowledge
      console.log(`Stripe event: ${event.type} (unhandled)`);
  }

  return { received: true, event: event.type };
}
