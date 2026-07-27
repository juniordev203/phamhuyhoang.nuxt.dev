<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { formatPostDate } from '~/utils/posts'

const route = useRoute()

const { data: post } = await useAsyncData(
  () => `post-${route.path}`,
  () =>
    queryCollection('posts')
      .path(route.path)
      .where('draft', '=', false)
      .first(),
  { watch: [() => route.path] }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { data: surround } = await useAsyncData(
  () => `post-surround-${route.path}`,
  () =>
    queryCollectionItemSurroundings('posts', route.path, {
      fields: ['title', 'description', 'date']
    })
      .where('draft', '=', false)
      .order('date', 'DESC'),
  { watch: [() => route.path] }
)

const prev = computed(() => surround.value?.[0] || null)
const next = computed(() => surround.value?.[1] || null)

useSiteSeo({
  title: `${post.value.title} — ${siteConfig.name}`,
  description: post.value.description || siteConfig.tagline,
  path: route.path,
  type: 'article'
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl">
    <nav class="mb-10">
      <NuxtLink
        to="/posts"
        class="inline-flex items-center gap-1 text-label text-secondary transition-colors hover:text-primary"
      >
        <span class="material-symbols-outlined !text-base">arrow_back</span>
        All posts
      </NuxtLink>
    </nav>

    <header class="mb-12 border-b border-primary pb-8">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <time class="text-label text-secondary" :datetime="post.date">
          {{ formatPostDate(post.date) }}
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
      aria-label="Adjacent posts"
    >
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="group border border-primary bg-surface-container-lowest p-5 transition-colors hover:bg-primary hover:text-on-primary"
      >
        <p class="mb-2 text-label opacity-70">Previous</p>
        <p class="text-body-md font-semibold group-hover:underline">
          {{ prev.title }}
        </p>
      </NuxtLink>
      <div v-else />

      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group border border-primary bg-surface-container-lowest p-5 text-right transition-colors hover:bg-primary hover:text-on-primary sm:justify-self-end sm:text-right"
      >
        <p class="mb-2 text-label opacity-70">Next</p>
        <p class="text-body-md font-semibold group-hover:underline">
          {{ next.title }}
        </p>
      </NuxtLink>
    </nav>
  </article>
</template>
