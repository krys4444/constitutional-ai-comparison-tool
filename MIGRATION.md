# Migration to OpenAI Responses API (GPT-5)

This repo migrates from Chat Completions (GPT-4) to the Responses API with GPT-5, preserving behavior and adding optional streaming and structured outputs.

## Defaults & Env
- OPENAI_MODEL (default: `gpt-5`)
- OPENAI_API_KEY (required)
- USE_LEGACY_CHAT_COMPLETIONS (default: `false`)

## New Utilities
- src/ai/openaiClient.ts: central client, model, legacy flag
- src/ai/messagesToInput.ts: joins chat messages into a single input string
- src/ai/respond.ts: non-streaming, optional JSON schema, legacy toggle
- src/ai/streamRespond.ts: streaming helper (SSE)
- src/ai/schemas.ts: example `SummarySchema`

## Rollback
Set `USE_LEGACY_CHAT_COMPLETIONS=true` to use `client.chat.completions.create` again.

## Examples
- examples/stream.ts: basic streaming usage
- examples/structured.ts: JSON schema structured output

## Tests
Run `npx vitest` (integration tests require OPENAI_API_KEY).
