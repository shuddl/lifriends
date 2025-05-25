import * as Sentry from '@sentry/nextjs'

let initialized = false

export function initSentry() {
  if (initialized) return

  const dsn = process.env.SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    dsn,
    tracesSampleRate: 1.0
  })

  initialized = true
}
