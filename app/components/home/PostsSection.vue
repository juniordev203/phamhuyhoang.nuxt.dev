<script setup lang="ts">
import { POSTS_HOME_PREVIEW } from '~/utils/posts'

const { t } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .select('path', 'title', 'description', 'date', 'tags')
    .order('date', 'DESC')
    .limit(POSTS_HOME_PREVIEW)
    .all()
)
</script>

<template>
  <section id="posts" class="section-gap scroll-mt-28">
    <div class="mb-12 flex items-end justify-between border-b border-primary pb-4">
      <h2 class="text-headline-md text-primary">
        {{ t('postsSection.heading') }}
      </h2>
      <div class="flex items-center gap-4">
        <span class="text-label text-secondary">{{ t('postsSection.eyebrow') }}</span>
        <NuxtLink
          :to="localePath('/posts')"
          class="hidden text-label text-primary underline-offset-4 hover:underline sm:inline"
        >
          {{ t('postsSection.viewAll') }}
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="posts?.length"
      class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-gutter"
    >
      <PostsPostCard
        v-for="post in posts"
        :key="post.path"
        :post="post"
      />
    </div>

    <p
      v-else
      class="border border-primary bg-surface-container-lowest p-8 text-body-md text-secondary"
    >
      {{ t('postsSection.empty') }}
    </p>

    <div class="mt-8 sm:hidden">
      <UiAppButton :to="localePath('/posts')" variant="secondary" block>
        {{ t('postsSection.viewAllPosts') }}
      </UiAppButton>
    </div>
  </section>
</template>
