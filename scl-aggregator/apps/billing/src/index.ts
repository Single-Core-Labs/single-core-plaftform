import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import creditsRouter from "./routes/credits";
import webhooksRouter from "./routes/webhooks";

// ── App Setup ───────────────────────────────────────────────

const app = express();
const PORT = parseInt(process.env.PORT ?? "8003", 10);

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: ["GET", "POST"],
  })
);

// Body parsing — with raw body capture for webhook signature verification
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      // Store raw body for Stripe/Razorpay webhook signature verification
      req.rawBody = buf;
    },
  })
);

// ── Routes ──────────────────────────────────────────────────

app.use("/credits", creditsRouter);
app.use("/webhooks", webhooksRouter);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "scl-billing",
    timestamp: new Date().toISOString(),
  });
});

// ── Error Handling ──────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { message: err.message }),
  });
});

// ── Start ───────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │  SCL Billing Service                    │
  │  Port: ${PORT}                            │
  │  Env:  ${process.env.NODE_ENV ?? "development"}                     │
  └─────────────────────────────────────────┘
  `);
});

export default app;
