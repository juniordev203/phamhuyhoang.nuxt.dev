<script setup lang="ts">
import { POSTS_PER_PAGE } from '~/utils/posts'

const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  page: number
  total: number
  basePath?: string
}>()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / POSTS_PER_PAGE))
)

const pageLink = (page: number) => {
  const base = props.basePath || '/posts'
  if (page <= 1) return localePath(base)
  return localePath({ path: base, query: { page: String(page) } })
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="mt-12 flex items-center justify-between border-t border-primary pt-6"
    :aria-label="t('posts.paginationLabel')"
  >
    <NuxtLink
      v-if="page > 1"
      :to="pageLink(page - 1)"
      class="text-label text-primary underline-offset-4 hover:underline"
    >
      ← {{ t('posts.previous') }}
    </NuxtLink>
    <span v-else class="text-label text-outline">← {{ t('posts.previous') }}</span>

    <p class="text-label text-secondary">
      {{ t('posts.page', { page, total: totalPages }) }}
    </p>

    <NuxtLink
      v-if="page < totalPages"
      :to="pageLink(page + 1)"
      class="text-label text-primary underline-offset-4 hover:underline"
    >
      {{ t('posts.next') }} →
    </NuxtLink>
    <span v-else class="text-label text-outline">{{ t('posts.next') }} →</span>
  </nav>
</template>
