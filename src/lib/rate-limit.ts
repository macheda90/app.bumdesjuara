interface RateLimitEntry {
  attempts: number
  lastAttempt: number
}

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const CLEANUP_THRESHOLD_MS = 60 * 60 * 1000 // 1 hour

const rateLimitMap = new Map<string, RateLimitEntry>()

/**
 * Remove entries older than 1 hour to prevent memory leaks.
 */
function cleanup(): void {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.lastAttempt > CLEANUP_THRESHOLD_MS) {
      rateLimitMap.delete(ip)
    }
  }
}

/**
 * Check if an IP address is allowed to make a login attempt.
 * Returns `{ allowed: true }` if the request is permitted,
 * or `{ allowed: false, retryAfter }` with seconds until the limit resets.
 *
 * Each call increments the attempt counter for the IP.
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  // Run cleanup on every check (lightweight since Map is small)
  cleanup()

  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    // First attempt
    rateLimitMap.set(ip, { attempts: 1, lastAttempt: now })
    return { allowed: true, retryAfter: 0 }
  }

  const elapsed = now - entry.lastAttempt

  // If the window has passed, reset the counter
  if (elapsed > WINDOW_MS) {
    rateLimitMap.set(ip, { attempts: 1, lastAttempt: now })
    return { allowed: true, retryAfter: 0 }
  }

  // Within the window — increment attempt count
  entry.attempts += 1
  entry.lastAttempt = now

  if (entry.attempts > MAX_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - elapsed
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000)
    return { allowed: false, retryAfter: retryAfterSeconds }
  }

  return { allowed: true, retryAfter: 0 }
}

/**
 * Reset the rate limit counter for an IP after a successful login.
 */
export function resetOnSuccess(ip: string): void {
  rateLimitMap.delete(ip)
}
