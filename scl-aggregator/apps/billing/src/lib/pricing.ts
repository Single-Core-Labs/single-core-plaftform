// ── Model pricing table ─────────────────────────────────────
// Credits per 1,000 tokens. 1 credit = $0.01 USD.
// These are the costs SCL charges the user (may include margin).

export interface ModelPricing {
  inputPer1k: number;  // credits per 1k input tokens
  outputPer1k: number; // credits per 1k output tokens
}

export const MODEL_PRICING: Record<string, ModelPricing> = {
  // Anthropic
  "claude-opus-4":        { inputPer1k: 12.6, outputPer1k: 63.0 },
  "claude-sonnet-4":      { inputPer1k: 1.8,  outputPer1k: 5.4  },
  "claude-haiku-4":       { inputPer1k: 0.2,  outputPer1k: 0.8  },

  // OpenAI
  "gpt-4o":               { inputPer1k: 2.1,  outputPer1k: 8.4  },
  "gpt-4o-mini":          { inputPer1k: 0.15, outputPer1k: 0.6  },

  // Google
  "gemini-2.5-pro":       { inputPer1k: 1.05, outputPer1k: 4.2  },
  "gemini-2.5-flash":     { inputPer1k: 0.3,  outputPer1k: 1.2  },

  // Groq (hosted open-source)
  "llama-3.3-70b":        { inputPer1k: 0.4,  outputPer1k: 0.4  },
  "llama-3.1-8b":         { inputPer1k: 0.05, outputPer1k: 0.08 },

  // Together
  "mixtral-8x22b":        { inputPer1k: 0.6,  outputPer1k: 0.6  },
};

/**
 * Calculate the credit cost for a given model and token usage.
 * Returns fractional credits (caller should Math.ceil for deduction).
 */
export function calculateCreditCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = MODEL_PRICING[model];
  if (!pricing) {
    // Fallback: use a generous default so we never give away free requests
    const fallback: ModelPricing = { inputPer1k: 1.0, outputPer1k: 3.0 };
    return (
      (inputTokens / 1000) * fallback.inputPer1k +
      (outputTokens / 1000) * fallback.outputPer1k
    );
  }

  return (
    (inputTokens / 1000) * pricing.inputPer1k +
    (outputTokens / 1000) * pricing.outputPer1k
  );
}
