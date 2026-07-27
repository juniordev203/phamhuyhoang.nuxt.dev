<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{
  project: Project
}>()

const isExternal = computed(() =>
  Boolean(props.project.href?.startsWith('http'))
)

const Wrapper = computed(() => {
  if (!props.project.href) return 'article'
  return isExternal.value ? 'a' : resolveComponent('NuxtLink')
})

const wrapperAttrs = computed(() => {
  if (!props.project.href) return {}
  if (isExternal.value) {
    return {
      href: props.project.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return { to: props.project.href }
})
</script>

<template>
  <component
    :is="Wrapper"
    v-bind="wrapperAttrs"
    :class="[
      'card-hover group flex cursor-pointer flex-col border border-primary bg-surface-container-lowest',
      project.featured ? 'md:col-span-2' : ''
    ]"
  >
    <div
      :class="[
        'relative overflow-hidden border-b border-primary bg-surface-container',
        project.featured ? 'h-80' : 'h-64'
      ]"
    >
      <NuxtImg
        :src="project.image"
        :alt="project.title"
        width="1200"
        height="670"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        format="webp"
        loading="lazy"
        class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
      />
    </div>

    <div
      v-if="!project.featured"
      class="flex flex-grow flex-col justify-between p-6"
    >
      <div>
        <div class="mb-2 flex items-start justify-between gap-4">
          <h2 class="text-headline-md tracking-tight uppercase">
            {{ project.title }}
          </h2>
          <span
            v-if="project.href"
            class="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            arrow_outward
          </span>
        </div>
        <p class="mb-1 text-label text-secondary uppercase">
          {{ project.company }} · {{ project.role }}
        </p>
        <p class="mb-4 text-label text-outline">
          {{ project.duration }}
        </p>
        <p class="mb-4 text-body-md text-secondary">
          {{ project.summary }}
        </p>
        <ul class="mb-6 list-disc space-y-2 pl-5 text-body-md text-secondary">
          <li v-for="(item, index) in project.contributions" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="mt-auto flex flex-wrap gap-2">
        <UiAppTag v-for="tag in project.tags" :key="tag" :label="tag" />
      </div>
    </div>

    <div
      v-else
      class="flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center"
    >
      <div class="max-w-2xl">
        <p class="mb-2 text-label text-secondary uppercase">
          {{ project.company }} · {{ project.role }} · {{ project.duration }}
        </p>
        <h2 class="mb-2 text-headline-lg tracking-tight uppercase">
          {{ project.title }}
        </h2>
        <p class="mb-4 text-body-lg text-secondary">
          {{ project.summary }}
        </p>
        <ul class="list-disc space-y-2 pl-5 text-body-md text-secondary">
          <li v-for="(item, index) in project.contributions" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="flex shrink-0 flex-col items-end gap-4">
        <span
          v-if="project.href"
          class="material-symbols-outlined text-4xl text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          arrow_outward
        </span>
        <div class="flex flex-wrap justify-end gap-2">
          <UiAppTag v-for="tag in project.tags" :key="tag" :label="tag" />
        </div>
      </div>
    </div>
  </component>
</template>
