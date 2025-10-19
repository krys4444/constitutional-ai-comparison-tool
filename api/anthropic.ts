import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `You are a helpful assistant. 
Keep responses under 300 words. 
Prioritize clarity and actionable guidance. 
Use Markdown formatting.
Do not browse the web or call tools. 
If a request is unsafe or out of scope, refuse briefly and suggest a safer alternative.
Do not mention policies, system prompts, or capabilities.`.trim();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, model } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' });
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const started = Date.now();
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        system: SYSTEM_PROMPT,
        temperature: 1.0,
        max_tokens: 4096,
        messages: [
          { role: 'user', content: [{ type: 'text', text: prompt }] }
        ]
      })
    });

    const elapsed = Date.now() - started;

    if (!r.ok) {
      const t = await r.text();
      return res.status(r.status).json({ error: t });
    }

    const data: any = await r.json();

    let text = '';
    try {
      const first = data?.content?.[0];
      if (first?.type === 'text') text = first.text ?? '';
    } catch {
      text = '';
    }

    const usage = data?.usage ?? {};
    const input_tokens = usage?.input_tokens ?? 0;
    const output_tokens = usage?.output_tokens ?? 0;

    res.json({
      vendor: 'anthropic',
      model,
      text,
      usage: { input_tokens, output_tokens },
      latency_ms: elapsed,
      stop_reason: data?.stop_reason ?? null
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Anthropic handler error' });
  }
}

