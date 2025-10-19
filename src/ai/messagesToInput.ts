import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export function messagesToInput(messages: ChatCompletionMessageParam[]): string {
  return messages
    .map(m => `${m.role.toUpperCase()}: ${typeof m.content === "string" ? m.content : JSON.stringify(m.content)}`)
    .join("\n\n");
}
