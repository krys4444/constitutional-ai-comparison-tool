import OpenAI from "openai";

export const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const model = process.env.OPENAI_MODEL ?? "gpt-5";
export const useLegacy = String(process.env.USE_LEGACY_CHAT_COMPLETIONS ?? "false").toLowerCase() === "true";
