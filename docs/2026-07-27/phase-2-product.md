# Phase 2 — Product quality (P1)

SEO, DX/CI, performance font/ảnh, bump Nuxt patch.

## Checklist

- [x] **2.1** Bump `nuxt` → 4.5.1
- [x] **2.2** `@nuxtjs/sitemap` + `public/robots.txt` Sitemap line + `site.url`
- [x] **2.3** `og:image` / Twitter via [`useSiteSeo`](../../app/composables/useSiteSeo.ts) + `/images/og.webp`

- [x] **2.4** Material Symbols: **một** nguồn trong [`app/app.vue`](../../app/app.vue) `useHead` (config `app.head` stylesheet bị `@nuxtjs/google-fonts` strip)
- [x] **2.5** WebP projects (đã xóa PNG thừa) + NuxtImg `sizes` / hero `fetchpriority`
- [x] **2.6** Scripts `lint` / `typecheck`; eslint/typescript/`vue-tsc` → `devDependencies`
- [x] **2.7** `.github/workflows/ci.yml`
- [x] **2.8** Dọn `.env.example` (bỏ Clerk)

## Status

**Done** — 2026-07-27
