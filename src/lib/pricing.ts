export type Vendor = "openai" | "anthropic";

const num = (v: string | undefined, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export const PRICING = {
  openai: {
    inPerM: num(process.env.OPENAI_PRICE_INPUT_PER_MILLION),
    outPerM: num(process.env.OPENAI_PRICE_OUTPUT_PER_MILLION),
  },
  anthropic: {
    inPerM: num(process.env.ANTHROPIC_PRICE_INPUT_PER_MILLION),
    outPerM: num(process.env.ANTHROPIC_PRICE_OUTPUT_PER_MILLION),
  },
};

export function estimateCostUSD(
  vendor: Vendor,
  inputTokens: number,
  outputTokens: number
) {
  const p = PRICING[vendor];
  const inputCost = (inputTokens / 1_000_000) * p.inPerM;
  const outputCost = (outputTokens / 1_000_000) * p.outPerM;
  return +(inputCost + outputCost).toFixed(6);
}

