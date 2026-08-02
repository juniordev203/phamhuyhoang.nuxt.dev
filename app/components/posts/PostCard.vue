<script setup lang="ts">
import { formatPostDate } from '~/utils/posts'

const { t, locale } = useI18n()

export type PostListItem = {
  path: string
  title: string
  description?: string
  date: string
  tags?: string[]
}

defineProps<{
  post: PostListItem
}>()
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="card-hover group flex cursor-pointer flex-col border border-primary bg-surface-container-lowest p-6 md:p-8"
  >
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <time
        class="text-label text-secondary"
        :datetime="post.date"
      >
        {{ formatPostDate(post.date, locale) }}
      </time>
      <span
        v-for="tag in post.tags?.slice(0, 3)"
        :key="tag"
        class="border border-outline-variant px-2 py-1 text-label text-secondary"
      >
        {{ tag }}
      </span>
    </div>

    <h3 class="mb-3 text-headline-md text-primary transition-colors group-hover:underline">
      {{ post.title }}
    </h3>

    <p
      v-if="post.description"
      class="mb-6 flex-grow text-body-md text-secondary"
    >
      {{ post.description }}
    </p>

    <span class="inline-flex items-center gap-1 text-label text-primary">
      {{ t('posts.read') }}
      <span class="material-symbols-outlined !text-base transition-transform group-hover:translate-x-1">
        arrow_forward
      </span>
    </span>
  </NuxtLink>
</template>
