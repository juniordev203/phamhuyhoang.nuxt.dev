# ARCHITECT.DEV — phamhuyhoang.nuxt.dev

Personal portfolio built with Nuxt 4 (Content posts, Resend contact, Vercel).

## Setup

```bash
pnpm install
cp .env.example .env
# set NUXT_RESEND_API_KEY
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (`http://localhost:3000`) |
| `pnpm build` / `pnpm preview` | Production build + local preview |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Nuxt / Vue TypeScript check |
| `pnpm smoke` | HTTP smoke (`BASE_URL` optional) |

## Writing posts

Add Markdown under `content/posts/YYYY/your-slug.md`. See `content/README.md`.

## Design archive

`.stitch/` holds Stitch design exports (HTML/PNG). It is **not** required to build or run the site — keep for design reference only.

## Deploy

Vercel: set `NUXT_RESEND_API_KEY` (and optionally `NUXT_RESEND_FROM`, `NUXT_CONTACT_EMAIL`, `NUXT_SITE_URL`).

See `docs/2026-07-27/` for the refactor/upgrade task phases.
