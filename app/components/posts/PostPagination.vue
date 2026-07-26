<script setup lang="ts">
import { POSTS_PER_PAGE } from '~/utils/posts'

const props = defineProps<{
  page: number
  total: number
  basePath?: string
}>()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / POSTS_PER_PAGE))
)

const pageLink = (page: number) => {
  const path = props.basePath || '/posts'
  if (page <= 1) return path
  return { path, query: { page: String(page) } }
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="mt-12 flex items-center justify-between border-t border-primary pt-6"
    aria-label="Posts pagination"
  >
    <NuxtLink
      v-if="page > 1"
      :to="pageLink(page - 1)"
      class="text-label text-primary underline-offset-4 hover:underline"
    >
      ← Previous
    </NuxtLink>
    <span v-else class="text-label text-outline">← Previous</span>

    <p class="text-label text-secondary">
      Page {{ page }} / {{ totalPages }}
    </p>

    <NuxtLink
      v-if="page < totalPages"
      :to="pageLink(page + 1)"
      class="text-label text-primary underline-offset-4 hover:underline"
    >
      Next →
    </NuxtLink>
    <span v-else class="text-label text-outline">Next →</span>
  </nav>
</template>
