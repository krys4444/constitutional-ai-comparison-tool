import fetch from "node-fetch";
import type { Request, Response } from "express";
import { SYSTEM_PROMPT } from "../../lib/systemPrompt";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export async function anthropicHandler(req: Request, res: Response) {
  try {
    const { prompt, model } = req.body as { prompt: string; model: string };
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const started = Date.now();
    const r = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model,
        system: SYSTEM_PROMPT,
        temperature: 1.0,
        max_tokens: 4096,
        messages: [
          { role: "user", content: [{ type: "text", text: prompt }] }
        ]
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
      const first = data?.content?.[0];
      if (first?.type === "text") text = first.text ?? "";
    } catch {
      text = "";
    }

    const usage = data?.usage ?? {};
    const input_tokens = usage?.input_tokens ?? 0;
    const output_tokens = usage?.output_tokens ?? 0;

    res.json({
      vendor: "anthropic",
      model,
      text,
      usage: { input_tokens, output_tokens },
      latency_ms: elapsed,
      stop_reason: data?.stop_reason ?? null
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Anthropic handler error" });
  }
}

