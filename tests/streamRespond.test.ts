import { describe, it, expect } from 'vitest'
import { streamRespond } from '../src/ai/streamRespond'

const hasKey = !!process.env.OPENAI_API_KEY

describe('streamRespond', () => {
  it('yields at least one chunk (integration)', async () => {
    if (!hasKey) return
    let count = 0
    for await (const _ of streamRespond('Say hello.')) {
      count++
      if (count > 0) break
    }
    expect(count).toBeGreaterThan(0)
  })
})
