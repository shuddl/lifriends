const windows = new Map<string, { count: number; start: number }>()

export function isRateLimited(
  key: string,
  windowMs: number,
  max: number
): boolean {
  const now = Date.now()
  const entry = windows.get(key)
  if (!entry || now - entry.start > windowMs) {
    windows.set(key, { count: 1, start: now })
    return false
  }
  if (entry.count >= max) {
    return true
  }
  entry.count += 1
  return false
}
