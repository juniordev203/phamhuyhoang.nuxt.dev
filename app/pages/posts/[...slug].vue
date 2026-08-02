<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { formatPostDate } from '~/utils/posts'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const contentPath = computed(() => {
  const prefix = locale.value === 'en' ? '' : `/${locale.value}`
  return route.path.startsWith(prefix)
    ? route.path.slice(prefix.length) || '/'
    : route.path
})

const { data: post } = await useAsyncData(
  () => `post-${contentPath.value}`,
  () =>
    queryCollection('posts')
      .path(contentPath.value)
      .where('draft', '=', false)
      .first(),
  { watch: [contentPath] }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: t('posts.notFound') })
}

const { data: surround } = await useAsyncData(
  () => `post-surround-${contentPath.value}`,
  () =>
    queryCollectionItemSurroundings('posts', contentPath.value, {
      fields: ['title', 'description', 'date']
    })
      .where('draft', '=', false)
      .order('date', 'DESC'),
  { watch: [contentPath] }
)

const prev = computed(() => surround.value?.[0] || null)
const next = computed(() => surround.value?.[1] || null)

useSiteSeo({
  title: `${post.value.title} — ${siteConfig.name}`,
  description: post.value.description || t('site.tagline'),
  path: localePath(route.path),
  type: 'article'
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl">
    <nav class="mb-10">
      <NuxtLink
        :to="localePath('/posts')"
        class="inline-flex items-center gap-1 text-label text-secondary transition-colors hover:text-primary"
      >
        <span class="material-symbols-outlined !text-base">arrow_back</span>
        {{ t('posts.allPosts') }}
      </NuxtLink>
    </nav>

    <header class="mb-12 border-b border-primary pb-8">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <time class="text-label text-secondary" :datetime="post.date">
          {{ formatPostDate(post.date, locale) }}
        </time>
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="border border-outline-variant px-2 py-1 text-label text-secondary"
        >
          {{ tag }}
        </span>
      </div>

      <h1 class="mb-4 text-headline-xl text-primary">
        {{ post.title }}
      </h1>
      <p v-if="post.description" class="text-body-lg text-secondary">
        {{ post.description }}
      </p>
    </header>

    <div class="post-prose">
      <ContentRenderer :value="post" />
    </div>

    <nav
      class="mt-16 grid grid-cols-1 gap-6 border-t border-primary pt-8 sm:grid-cols-2"
      :aria-label="t('posts.adjacentLabel')"
    >
      <NuxtLink
        v-if="prev"
        :to="localePath(prev.path)"
        class="group border border-primary bg-surface-container-lowest p-5 transition-colors hover:bg-primary hover:text-on-primary"
      >
        <p class="mb-2 text-label opacity-70">{{ t('posts.previous') }}</p>
        <p class="text-body-md font-semibold group-hover:underline">
          {{ prev.title }}
        </p>
      </NuxtLink>
      <div v-else />

      <NuxtLink
        v-if="next"
        :to="localePath(next.path)"
        class="group border border-primary bg-surface-container-lowest p-5 text-right transition-colors hover:bg-primary hover:text-on-primary sm:justify-self-end sm:text-right"
      >
        <p class="mb-2 text-label opacity-70">{{ t('posts.next') }}</p>
        <p class="text-body-md font-semibold group-hover:underline">
          {{ next.title }}
        </p>
      </NuxtLink>
    </nav>
  </article>
</template>
