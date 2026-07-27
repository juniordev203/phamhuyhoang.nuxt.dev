# Verification log — 2026-07-27

Đối chiếu checklist phase 1–3 với code + live HTTP sau restart Nuxt 4.5.1.

| ID | Kết quả | Ghi chú |
|----|---------|--------|
| 1.1–1.7 | Pass | Schema, honeypot, rate-limit, origin, headers, rules |
| 1.8 | Pass | honeypot `{ok:true}`; too-fast 400; bad origin 403; req6=429 |
| 2.1–2.3 | Pass | Nuxt 4.5.1, sitemap, OG/canonical |
| 2.4 | Pass* | *Sửa: stylesheet phải ở `app.vue` (config bị google-fonts strip) |
| 2.5 | Pass* | *Xóa PNG thừa; chỉ còn `.webp` |
| 2.6–2.8 | Pass | lint/typecheck/CI/env |
| 3.1–3.8 | Pass | a11y, docs, smoke, bỏ debug scroll marker |
| Extra | Pass | Sync thêm `nuxt-vue-conventions.mdc` |

## Commands

```bash
pnpm lint        # 0 errors (2 warnings AppButton defaults — ngoài scope)
pnpm typecheck   # OK
pnpm smoke       # OK với dev server
```

**Status: tất cả task list = Done.**
