#!/usr/bin/env node
/**
 * Lightweight HTTP smoke checks (no Playwright).
 * Usage: BASE_URL=http://localhost:3000 node scripts/smoke.mjs
 */
const base = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

const checks = [
  { path: '/', expect: 200, includes: ['ARCHITECT.DEV'] },
  { path: '/vi', expect: 200, includes: ['Kỹ sư Frontend'] },
  { path: '/posts', expect: 200, includes: ['Posts'] },
  { path: '/vi/posts', expect: 200, includes: ['Bài viết'] },
  { path: '/robots.txt', expect: 200, includes: ['Sitemap:'] }
]

let failed = 0

for (const check of checks) {
  const url = `${base}${check.path}`
  try {
    const res = await fetch(url)
    const text = await res.text()
    const okStatus = res.status === check.expect
    const okBody = (check.includes || []).every((s) => text.includes(s))
    if (!okStatus || !okBody) {
      failed += 1
      console.error(`FAIL ${url} status=${res.status} bodyOk=${okBody}`)
    } else {
      console.log(`OK   ${url}`)
    }
  } catch (err) {
    failed += 1
    console.error(`FAIL ${url}`, err)
  }
}

// Sitemap: /sitemap.xml redirects to the index; per-locale sitemaps hold the URLs.
{
  const index = await fetch(`${base}/sitemap_index.xml`)
  const indexText = await index.text()
  if (index.status === 200 && indexText.includes('sitemapindex')) {
    console.log('OK   sitemap_index.xml')
  } else {
    failed += 1
    console.error(`FAIL sitemap_index.xml status=${index.status}`)
  }
  for (const loc of ['en-US', 'vi-VN']) {
    const url = `${base}/__sitemap__/${loc}.xml`
    const res = await fetch(url)
    const text = await res.text()
    if (res.status === 200 && text.includes('<urlset') && text.includes('<url>')) {
      console.log(`OK   sitemap ${loc}`)
    } else {
      failed += 1
      console.error(`FAIL sitemap ${loc} status=${res.status}`)
    }
  }
}

// Security headers on HTML
{
  const res = await fetch(`${base}/`)
  const needed = [
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy'
  ]
  for (const h of needed) {
    if (!res.headers.get(h)) {
      failed += 1
      console.error(`FAIL missing header ${h}`)
    } else {
      console.log(`OK   header ${h}=${res.headers.get(h)}`)
    }
  }
}

// Contact honeypot should succeed without sending real mail path issues
{
  const res = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: base
    },
    body: JSON.stringify({
      name: 'Smoke Bot',
      email: 'smoke@example.com',
      message: 'honeypot check',
      website: 'https://spam.example',
      startedAt: Date.now() - 10_000
    })
  })
  const json = await res.json().catch(() => ({}))
  if (res.status === 200 && json.ok === true) {
    console.log('OK   contact honeypot')
  } else {
    failed += 1
    console.error('FAIL contact honeypot', res.status, json)
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll smoke checks passed')
