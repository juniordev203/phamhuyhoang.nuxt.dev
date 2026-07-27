# Phase 1 — Security (P0)

Chặn abuse form contact và siết surface HTTP cơ bản.

## Checklist

- [x] **1.1** Shared Zod schema — [`shared/contact.ts`](../../shared/contact.ts)
- [x] **1.2** Honeypot + time-trap — [`ContactForm.vue`](../../app/components/ContactForm.vue) + server
- [x] **1.3** Rate-limit — [`server/utils/rate-limit.ts`](../../server/utils/rate-limit.ts) (5 / 15 phút / IP)
- [x] **1.4** Origin/Referer check — `assertSameOrigin` trong contact API
- [x] **1.5** Generic Resend errors — log server-side only
- [x] **1.6** Security headers — `nitro.routeRules` trong [`nuxt.config.ts`](../../nuxt.config.ts)
- [x] **1.7** Cập nhật [`.cursor/rules/server-api.mdc`](../../.cursor/rules/server-api.mdc)
- [x] **1.8** Verify: honeypot → `{ok:true}`; too-fast → 400; bad origin → 403; headers present

## Status

**Done** — 2026-07-27
