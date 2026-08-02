<script setup lang="ts">
import { siteConfig } from '~/data/site'
import {
  POSTS_PER_PAGE,
  parsePostsPage
} from '~/utils/posts'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const page = computed(() => parsePostsPage(route.query.page))

const { data } = await useAsyncData(
  () => `posts-list-${page.value}`,
  async () => {
    const [posts, total] = await Promise.all([
      queryCollection('posts')
        .where('draft', '=', false)
        .select('path', 'title', 'description', 'date', 'tags')
        .order('date', 'DESC')
        .skip((page.value - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE)
        .all(),
      queryCollection('posts')
        .where('draft', '=', false)
        .count()
    ])

    return { posts, total }
  },
  { watch: [page] }
)

watchEffect(() => {
  if (!data.value) return
  const totalPages = Math.max(1, Math.ceil(data.value.total / POSTS_PER_PAGE))
  if (page.value > totalPages) {
    navigateTo(totalPages <= 1 ? localePath('/posts') : localePath({ path: '/posts', query: { page: String(totalPages) } }))
  }
})

useSiteSeo({
  title: `${t('posts.title')} — ${siteConfig.name}`,
  description: t('posts.description'),
  path: localePath('/posts')
})
</script>

<template>
  <div>
    <header class="mb-16 md:mb-24">
      <p class="mb-4 text-label tracking-widest text-secondary uppercase">
        {{ t('posts.eyebrow') }}
      </p>
      <h1 class="mb-6 text-headline-xl uppercase">
        {{ t('posts.title') }}
      </h1>
      <p class="max-w-2xl text-body-lg text-secondary">
        {{ t('posts.description') }}
      </p>
    </header>

    <div
      v-if="data?.posts?.length"
      class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-gutter"
    >
      <PostsPostCard
        v-for="post in data.posts"
        :key="post.path"
        :post="post"
      />
    </div>

    <p
      v-else
      class="border border-primary bg-surface-container-lowest p-8 text-body-md text-secondary"
    >
      {{ t('posts.empty') }}
    </p>

    <PostsPostPagination
      v-if="data"
      :page="page"
      :total="data.total"
    />
  </div>
</template>
