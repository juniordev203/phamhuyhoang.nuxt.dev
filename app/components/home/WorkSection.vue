<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="work" class="section-gap scroll-mt-28">
    <div class="mb-12 flex items-end justify-between border-b border-primary pb-4">
      <h2 class="text-headline-md text-primary">
        Selected Works
      </h2>
      <span class="text-label text-secondary">001 // WORK</span>
    </div>

    <p class="mb-12 max-w-2xl text-body-lg text-secondary">
      Selected work including this portfolio, Sm-WorkOS, Projenti, and TryHSK —
      focused on scalable frontend architecture, real-time UX, and clean
      delivery.
    </p>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-gutter">
      <UiProjectCard
        v-for="project in projects"
        :key="project.slug"
        :project="project"
      />
    </div>
  </section>
</template>
