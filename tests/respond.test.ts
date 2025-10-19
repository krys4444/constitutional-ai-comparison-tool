import { describe, it, expect } from 'vitest'
import { respond } from '../src/ai/respond'
import { SummarySchema } from '../src/ai/schemas'

const hasKey = !!process.env.OPENAI_API_KEY

describe('respond', () => {
  it('returns a string (integration)', async () => {
    if (!hasKey) return
    const out = await respond([{ role: 'user', content: 'Say hello in 3 words.' }])
    expect(typeof out).toBe('string')
    expect(out.length).toBeGreaterThan(0)
  })

  it('returns JSON parseable to schema (integration)', async () => {
    if (!hasKey) return
    const out = await respond([{ role: 'user', content: 'Give a title and 3 bullets about migrating.' }], { jsonSchema: SummarySchema })
    const parsed = JSON.parse(out)
    expect(typeof parsed.title).toBe('string')
    expect(Array.isArray(parsed.bullets)).toBe(true)
  })
})
