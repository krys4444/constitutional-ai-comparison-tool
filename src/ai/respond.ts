import { client, model, useLegacy } from "./openaiClient";
import { messagesToInput } from "./messagesToInput";

export async function respond(messages: any[], opts: { jsonSchema?: any; reasoningEffort?: "low"|"medium"|"high" } = {}) {
  if (useLegacy) {
    const r = await client.chat.completions.create({ model, messages });
    return r.choices[0].message?.content ?? "";
  }
  const payload: any = { model, input: messagesToInput(messages) };
  if (opts.reasoningEffort) payload.reasoning = { effort: opts.reasoningEffort };
  if (opts.jsonSchema) {
    payload.response_format = { type: "json_schema", json_schema: { name: "Result", schema: opts.jsonSchema } };
  }
  const r = await client.responses.create(payload);
  return (r as any).output_text ?? "";
}
