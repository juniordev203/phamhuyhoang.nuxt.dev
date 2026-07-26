<script setup lang="ts">
import { projects } from '~/data/projects'
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: `Work — ${siteConfig.name}`,
  description:
    'Selected frontend work — internal platforms, workflow engines, and product UIs built with Vue 3, Nuxt.js, and TypeScript.'
})
</script>

<template>
  <div>
    <header class="mb-24">
      <h1 class="mb-6 text-headline-xl uppercase">
        Selected<br>
        Works
      </h1>
      <p class="max-w-2xl text-body-lg text-secondary">
        Selected work including this portfolio, Sm-WorkOS, Projenti, and TryHSK —
        focused on scalable frontend architecture, real-time UX, and clean
        delivery.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-gutter">
      <UiProjectCard
        v-for="project in projects"
        :key="project.slug"
        :project="project"
      />
    </div>
  </div>
</template>
