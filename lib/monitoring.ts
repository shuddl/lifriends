// Simple monitoring utility that mimics a Sentry-like API.
// In a real deployment you would import the official SDK.

let initialized = false

export function initMonitoring() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
  if (!dsn || initialized) return
  initialized = true
  // Placeholder for SDK initialization
  console.log('[monitoring] initialized')
}

export function captureException(error: unknown, context?: Record<string, any>) {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
  if (!dsn) return
  // In a real SDK this would send the error to the monitoring service
  console.error('[monitoring] captured error:', error, context)
}

