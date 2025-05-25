export type RateLimitOptions = {
  windowMs?: number
  max?: number
}

const DEFAULT_WINDOW_MS = 60_000
const DEFAULT_MAX = 20

type Entry = { count: number; reset: number }

const store = new Map<string, Entry>()

export function checkRateLimit(
  key: string,
  opts: RateLimitOptions = {}
): boolean {
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS
  const max = opts.max ?? DEFAULT_MAX
  const now = Date.now()

  const entry = store.get(key)

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return true
  }

  if (entry.count >= max) {
    return false
  }

  entry.count++
  return true
}

export function resetRateLimit() {
  store.clear()
}
