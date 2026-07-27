type SiteSeoInput = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

/** SEO + Open Graph for pages. Call from `<script setup>` only. */
export function useSiteSeo(input: SiteSeoInput) {
  const site = useSiteConfig()
  const siteUrl = String(site.url || 'https://huyhoangpham.id.vn').replace(
    /\/$/,
    ''
  )
  const path = input.path ?? '/'
  const canonical = new URL(path, `${siteUrl}/`).toString()
  const image = input.image ?? `${siteUrl}/images/og.webp`

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogType: input.type ?? 'website',
    ogUrl: canonical,
    ogImage: image,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: image
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }]
  })
}
