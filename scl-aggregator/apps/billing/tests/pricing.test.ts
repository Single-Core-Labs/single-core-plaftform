import { calculateCreditCost, MODEL_PRICING } from "../src/lib/pricing";

describe("Pricing Module", () => {
  describe("calculateCreditCost", () => {
    it("should calculate cost for a known model (claude-sonnet-4)", () => {
      const cost = calculateCreditCost("claude-sonnet-4", 1000, 500);
      // input: 1000 tokens → 1k * 1.8 credits/1k = 1.8
      // output: 500 tokens → 0.5k * 5.4 credits/1k = 2.7
      // total = 4.5
      expect(cost).toBeCloseTo(4.5, 1);
    });

    it("should calculate cost for gpt-4o", () => {
      const cost = calculateCreditCost("gpt-4o", 2000, 1000);
      // input: 2k * 2.1 = 4.2
      // output: 1k * 8.4 = 8.4
      // total = 12.6
      expect(cost).toBeCloseTo(12.6, 1);
    });

    it("should calculate cost for a cheap model (llama-3.1-8b)", () => {
      const cost = calculateCreditCost("llama-3.1-8b", 5000, 1000);
      // input: 5k * 0.05 = 0.25
      // output: 1k * 0.08 = 0.08
      // total = 0.33
      expect(cost).toBeCloseTo(0.33, 2);
    });

    it("should use fallback pricing for unknown models", () => {
      const cost = calculateCreditCost("unknown-model-xyz", 1000, 1000);
      // fallback: input 1k * 1.0 = 1.0, output 1k * 3.0 = 3.0
      // total = 4.0
      expect(cost).toBeCloseTo(4.0, 1);
    });

    it("should return 0 for zero tokens", () => {
      const cost = calculateCreditCost("claude-sonnet-4", 0, 0);
      expect(cost).toBe(0);
    });

    it("should handle input-only (no output tokens)", () => {
      const cost = calculateCreditCost("gpt-4o", 1000, 0);
      expect(cost).toBeCloseTo(2.1, 1);
    });

    it("should handle output-only (no input tokens)", () => {
      const cost = calculateCreditCost("gpt-4o", 0, 1000);
      expect(cost).toBeCloseTo(8.4, 1);
    });
  });

  describe("MODEL_PRICING", () => {
    it("should have pricing for all documented providers", () => {
      // Anthropic
      expect(MODEL_PRICING["claude-opus-4"]).toBeDefined();
      expect(MODEL_PRICING["claude-sonnet-4"]).toBeDefined();
      expect(MODEL_PRICING["claude-haiku-4"]).toBeDefined();

      // OpenAI
      expect(MODEL_PRICING["gpt-4o"]).toBeDefined();
      expect(MODEL_PRICING["gpt-4o-mini"]).toBeDefined();

      // Google
      expect(MODEL_PRICING["gemini-2.5-pro"]).toBeDefined();
      expect(MODEL_PRICING["gemini-2.5-flash"]).toBeDefined();

      // Groq
      expect(MODEL_PRICING["llama-3.3-70b"]).toBeDefined();
      expect(MODEL_PRICING["llama-3.1-8b"]).toBeDefined();

      // Together
      expect(MODEL_PRICING["mixtral-8x22b"]).toBeDefined();
    });

    it("should have positive pricing for all models", () => {
      for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
        expect(pricing.inputPer1k).toBeGreaterThan(0);
        expect(pricing.outputPer1k).toBeGreaterThan(0);
      }
    });

    it("should have output cost >= input cost for all models", () => {
      for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
        expect(pricing.outputPer1k).toBeGreaterThanOrEqual(pricing.inputPer1k);
      }
    });
  });
});
