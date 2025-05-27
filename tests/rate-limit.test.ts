import { describe, expect, it, beforeEach } from 'bun:test'
import { checkRateLimit, resetRateLimit } from '../lib/utils/rate-limit'

const options = { max: 3, windowMs: 1000 }

describe('rate limiting', () => {
  beforeEach(() => {
    resetRateLimit()
  })

  it('allows requests below the limit', () => {
    expect(checkRateLimit('key', options)).toBe(true)
    expect(checkRateLimit('key', options)).toBe(true)
  })

  it('blocks requests over the limit', () => {
    checkRateLimit('blocked', options)
    checkRateLimit('blocked', options)
    checkRateLimit('blocked', options)
    expect(checkRateLimit('blocked', options)).toBe(false)
  })
})
