# Code verification per task — 2026-07-27

Đối chiếu **implementation** với từng task (không chỉ tick docs).

## Phase 1 — Security

| Task | Code | Behavior | Verdict |
|------|------|----------|---------|
| **1.1** Shared Zod | [`shared/contact.ts`](../../shared/contact.ts) — `contactSchema` + `CONTACT_MIN_ELAPSED_MS`; import `#shared/contact` ở form + API | Schema dùng chung | **Pass** |
| **1.2** Honeypot + time-trap | Form: field `website` ẩn + `startedAt`; client mirror time-trap; server: honeypot → `{ok:true}`, quá nhanh → 400 | Live PASS | **Pass** |
| **1.3** Rate-limit | [`server/utils/rate-limit.ts`](../../server/utils/rate-limit.ts) 5/15m; API gọi trước parse | Trước đó req6=429 | **Pass** |
| **1.4** Origin check | `assertSameOrigin` | Live 403 | **Pass** |
| **1.5** Generic Resend error | `console.error` + message generic 502 | Không leak `error.message` | **Pass** |
| **1.6** Headers | `nitro.routeRules` | Live 4 headers | **Pass** |
| **1.7** Rules | [`server-api.mdc`](../../.cursor/rules/server-api.mdc) honeypot/rate-limit | File OK | **Pass** |
| **1.8** Verify | Suite node + smoke | 14/14 + smoke | **Pass** |

## Phase 2 — Product

| Task | Code | Behavior | Verdict |
|------|------|----------|---------|
| **2.1** Nuxt patch | `package.json` `nuxt@^4.5.1` | Runtime path `nuxt@4.5.1` | **Pass** |
| **2.2** Sitemap/robots/site | Module + `site.url` (+ `NUXT_SITE_URL`) + robots Sitemap | Live sitemap/robots | **Pass** |
| **2.3** OG/Twitter | [`useSiteSeo`](../../app/composables/useSiteSeo.ts) (composable, không còn `utils/seo`) | Live og:image + canonical | **Pass*** |
| **2.4** Material ×1 | [`app.vue`](../../app/app.vue) `useHead` only | Live count=1 | **Pass** |
| **2.5** WebP + NuxtImg | projects `*.webp`; Hero/ProjectCard `sizes`/`format`/`fetchpriority` | Asset 200; PNG đã xóa | **Pass** |
| **2.6** lint/typecheck deps | scripts + `devDependencies` + `vue-tsc` | typecheck OK | **Pass** |
| **2.7** CI | [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) | File OK | **Pass** |
| **2.8** `.env.example` | Không Clerk; Resend + `NUXT_SITE_URL` | File OK | **Pass** |

\* Sửa khi verify code: chuyển SEO từ `utils/` → `composables/` (đúng convention Nuxt / rules dự án).

## Phase 3 — Polish

| Task | Code | Behavior | Verdict |
|------|------|----------|---------|
| **3.1** Menu a11y | `aria-expanded` / `aria-controls` / Esc | Live attrs | **Pass** |
| **3.2** Modal focus | trap Tab + restore `previousFocus` | Code OK | **Pass** |
| **3.3** Skip + reduced-motion | layout skip-link; CSS `@media (prefers-reduced-motion)` | Live skip | **Pass** |
| **3.4** Sync rules | overview + conventions (không còn layout contact) | File OK | **Pass** |
| **3.5** `.stitch` docs | README design archive | File OK | **Pass** |
| **3.6** README ops | env/scripts/deploy | File OK | **Pass** |
| **3.7** Smoke | `pnpm smoke` | All OK | **Pass** |
| **3.8** Debug marker | Không còn `__scrollNavPlugin` | Pass | **Pass** |

## Fixes applied during this code review

1. `applySiteSeo` trong `utils/` → `useSiteSeo` composable (Vue composables không thuộc utils thuần).
2. `site.url` đọc `NUXT_SITE_URL` (khớp `.env.example`).
3. Client mirror time-trap dùng `CONTACT_MIN_ELAPSED_MS` từ shared schema.

## Commands

```bash
pnpm typecheck
pnpm smoke
# + suite node per-task (14 checks) — all passed
```

**Kết luận: code gen theo từng task đã verified + chỉnh chỗ lệch convention; toàn bộ Pass.**
