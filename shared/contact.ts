import { z } from 'zod'

/** Minimum time (ms) a human is expected to spend before submit. */
export const CONTACT_MIN_ELAPSED_MS = 2000

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(200),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  /** Honeypot — humans leave empty; bots often autofill. */
  website: z.string().max(200).optional().default(''),
  /** Client timestamp when the form mounted (ms since epoch). */
  startedAt: z.number().int().positive().optional()
})

export type ContactPayload = z.infer<typeof contactSchema>
