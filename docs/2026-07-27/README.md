# Refactor + Upgrade — 2026-07-27

Tài liệu task theo kết quả phân tích sức khỏe dự án. Chia **3 phase**; implement tuần tự.

| Phase | Scope | Ưu tiên | Status |
|-------|--------|---------|--------|
| [1 — Security](./phase-1-security.md) | Rate-limit, honeypot, ẩn lỗi Resend, security headers, Origin check | P0 | Done |
| [2 — Product](./phase-2-product.md) | SEO/sitemap/OG, CI lint/typecheck, font trùng, ảnh, Nuxt patch, shared Zod | P1 | Done |
| [3 — Polish](./phase-3-polish.md) | A11y, deps hygiene, sync docs/rules, dọn `.stitch`/env, e2e smoke | P2 | Done |

## Quyết định đã chốt

- **Bot protection:** honeypot + time-trap (không phụ thuộc Cloudflare Turnstile).
- **Rate limit:** in-memory sliding window theo IP trên Nitro (đủ cho portfolio; multi-instance Vercel vẫn giảm spam đáng kể khi kết hợp honeypot).
- **Phạm vi:** full P0 → P2 theo 3 phase.

## Nguồn

- Canvas / báo cáo: architecture + abuse gaps + SEO/perf/DX.
- Code chính: `server/api/contact.post.ts`, `app/components/ContactForm.vue`, `nuxt.config.ts`.

## Verify nhanh

```bash
pnpm lint
pnpm typecheck
pnpm smoke   # cần dev server đang chạy
```

Chi tiết đối chiếu: [VERIFICATION.md](./VERIFICATION.md) · [CODE-VERIFY.md](./CODE-VERIFY.md) (verify code theo từng task).
