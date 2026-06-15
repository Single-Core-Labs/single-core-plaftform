import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import crypto from "crypto";

const router = Router();

const createKeySchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1).max(50),
});

// ── GET /keys ───────────────────────────────────────────────
// List all keys for a user

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const keys = await prisma.apiKey.findMany({
      where: {
        user: {
          externalId: userId as string
        },
        revoked: false
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(keys.map(k => ({
      id: k.id,
      name: k.name,
      // Mask the key: sk-...xxxx
      key: `${k.key.substring(0, 6)}...${k.key.substring(k.key.length - 4)}`,
      createdAt: k.createdAt,
      lastUsed: k.lastUsed,
      requests: k.requests,
      spend: k.spend
    })));
  } catch (error) {
    console.error("Error fetching keys:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── POST /keys ──────────────────────────────────────────────
// Create a new API key

router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, name } = createKeySchema.parse(req.body);

    // Find user by externalId
    const user = await prisma.user.findUnique({
      where: { externalId: userId }
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Generate a new key: sk-scl-XXXX...
    const randomBytes = crypto.randomBytes(24).toString('hex');
    const newKey = `sk-scl-${randomBytes}`;

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: user.id,
        name,
        key: newKey,
      }
    });

    // Return the FULL key only once
    res.json({
      id: apiKey.id,
      name: apiKey.name,
      key: newKey, // Full key
      createdAt: apiKey.createdAt
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: error.errors });
      return;
    }
    console.error("Error creating key:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── DELETE /keys/:id ────────────────────────────────────────
// Revoke an API key

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.apiKey.update({
      where: { id },
      data: { revoked: true }
    });

    res.json({ success: true, message: "Key revoked" });
  } catch (error) {
    console.error("Error revoking key:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
