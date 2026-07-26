# Content — Posts

Daily writing lives in `content/posts/` as Markdown. Nuxt Content indexes published posts automatically.

## Add a post

1. Create: `content/posts/YYYY/your-slug.md`
2. Frontmatter:

```yaml
---
title: Your title
description: One-line summary for cards and SEO
date: 2026-07-26
tags:
  - nuxt
draft: false
---
```

3. Write the Markdown body below the frontmatter.

## Conventions for scale

- Prefer year folders (`2026/`, `2027/`, …) so git stays browsable after hundreds of posts.
- `date` controls sort order on home, `/posts`, and detail “adjacent” navigation.
- Set `draft: true` to keep a post out of listings and public detail queries.
