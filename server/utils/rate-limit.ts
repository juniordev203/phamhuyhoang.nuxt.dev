type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

/**
 * Fixed-window rate limit (in-memory, per server instance).
 * Returns true when the request is allowed.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false, retryAfterSec: number } {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    }
  }

  existing.count += 1
  return { ok: true }
}
