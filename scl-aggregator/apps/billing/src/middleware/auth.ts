import { Request, Response, NextFunction } from "express";

/**
 * Middleware to authenticate internal service-to-service calls.
 * The gateway sends `X-Internal-Secret` header on deduct/balance calls.
 */
export function internalAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const secret = req.headers["x-internal-secret"] as string | undefined;
  const expected = process.env.INTERNAL_API_SECRET;

  if (!expected) {
    console.warn("INTERNAL_API_SECRET not set — allowing all internal calls");
    next();
    return;
  }

  if (!secret || secret !== expected) {
    res.status(401).json({ error: "Unauthorized: invalid internal secret" });
    return;
  }

  next();
}
