import { client, model } from "./openaiClient";

export async function* streamRespond(input: string) {
  const stream = await (client as any).responses.stream({ model, input });
  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      yield event.delta as string;
    }
  }
}
