export const SummarySchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    bullets: { type: "array", items: { type: "string" } }
  },
  required: ["title","bullets"],
  additionalProperties: false
} as const;
