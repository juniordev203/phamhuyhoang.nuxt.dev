import type { H3Event } from 'h3'
import { Resend } from 'resend'
import {
  CONTACT_MIN_ELAPSED_MS,
  contactSchema
} from '#shared/contact'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 15 * 60 * 1000

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const limited = consumeRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
  if (!limited.ok) {
    setResponseHeader(event, 'Retry-After', limited.retryAfterSec)
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  const config = useRuntimeConfig()
  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data',
      data: parsed.error.flatten()
    })
  }

  const { name, email, message, website, startedAt } = parsed.data

  // Honeypot tripped — pretend success so bots do not learn the field.
  if (website.trim()) {
    return { ok: true }
  }

  if (
    startedAt == null
    || Date.now() - startedAt < CONTACT_MIN_ELAPSED_MS
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please wait a moment and try again.'
    })
  }

  if (!config.resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured'
    })
  }

  const to = config.contactEmail || 'huyhoangpham8460@gmail.com'
  const resend = new Resend(config.resendApiKey)

  const { error } = await resend.emails.send({
    from: config.resendFrom || 'ARCHITECT.DEV <onboarding@resend.dev>',
    to: [to],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n'),
    html: `
      <h2>New contact from portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send message. Please try again later.'
    })
  }

  return { ok: true }
})

function assertSameOrigin(event: H3Event) {
  const url = getRequestURL(event)
  const origin = getHeader(event, 'origin')
  const referer = getHeader(event, 'referer')
  const allowed = url.origin

  // Non-browser clients may omit both; still rate-limited + honeypot.
  if (!origin && !referer) return

  if (origin && origin !== allowed) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  if (!referer) return

  let refOrigin: string
  try {
    refOrigin = new URL(referer).origin
  } catch {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  if (refOrigin !== allowed) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
