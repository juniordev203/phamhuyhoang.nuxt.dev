---
title: Building a portfolio that can scale with daily writing
description: Structuring posts as content collections so the archive stays maintainable as it grows.
date: 2026-07-25
tags:
  - nuxt
  - content
  - architecture
---

A portfolio that also hosts daily writing needs a different shape than a static case-study site.

## Design goals

1. **Authoring stays simple** — one Markdown file per post
2. **Listing stays fast** — query only the fields needed for cards
3. **URLs stay stable** — detail pages resolve from the content path
4. **Drafts stay private** — unpublished posts never hit production queries

## Folder convention

Posts live under `content/posts/YYYY/slug.md`. Year folders keep the filesystem readable after hundreds of entries, while frontmatter `date` drives sort order on the site.
