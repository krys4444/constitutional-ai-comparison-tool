import fetch from "node-fetch";
import type { Request, Response } from "express";
import { SYSTEM_PROMPT } from "../../lib/systemPrompt";

const OPENAI_URL = "https://api.openai.com/v1/responses";

export async function openaiHandler(req: Request, res: Response) {
  try {
    const { prompt, model } = req.body as { prompt: string; model: string };
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const started = Date.now();
    const r = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        instructions: SYSTEM_PROMPT,
        input: [{ role: "user", content: [{ type: "input_text", text: prompt }]}],
        max_output_tokens: 4096,
      })
    });

    const elapsed = Date.now() - started;

    if (!r.ok) {
      const t = await r.text();
      return res.status(r.status).json({ error: t });
    }

    const data: any = await r.json();

    let text = "";
    try {
      const outputs = data.output ?? data.outputs ?? [];
      if (Array.isArray(outputs) && outputs.length) {
        const parts = outputs[0]?.content ?? outputs?.flatMap((o: any) => o?.content ?? []);
        const textPart = Array.isArray(parts) ? parts.find((p: any) => p.type === "output_text" || p.type === "text") : null;
        text = textPart?.text ?? "";
      } else if (data?.output_text) {
        text = data.output_text;
      }
    } catch {
      text = "";
    }

    const usage = data?.usage ?? {};
    const input_tokens = usage?.input_tokens ?? usage?.prompt_tokens ?? 0;
    const output_tokens = usage?.output_tokens ?? usage?.completion_tokens ?? 0;

    res.json({
      vendor: "openai",
      model,
      text,
      usage: { input_tokens, output_tokens },
      latency_ms: elapsed,
      stop_reason: data?.stop_reason ?? data?.finish_reason ?? null
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "OpenAI handler error" });
  }
}

