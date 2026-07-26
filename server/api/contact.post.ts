import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(200),
  message: z.string().trim().min(1, 'Message is required').max(5000)
})

export default defineEventHandler(async (event) => {
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

  if (!config.resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured'
    })
  }

  const { name, email, message } = parsed.data
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
    throw createError({
      statusCode: 502,
      statusMessage: error.message || 'Failed to send email'
    })
  }

  return { ok: true }
})

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
