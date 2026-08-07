<script setup lang="ts">
import { projects } from '~/data/projects'

const featuredProject = computed(() =>
  projects.find((project) => project.featured)
)

const workProjects = computed(() =>
  projects.filter((project) => !project.featured)
)
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
      Selected work including this portfolio, Kaopiz, Sm-WorkOS, Projenti, and
      TryHSK — focused on scalable frontend architecture, real-time UX, and
      clean delivery.
    </p>

    <UiProjectCard
      v-if="featuredProject"
      :key="featuredProject.slug"
      :project="featuredProject"
    />

    <ul class="mt-12 border-t border-primary">
      <li
        v-for="project in workProjects"
        :key="project.slug"
        class="grid grid-cols-1 gap-1 border-b border-primary py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.6fr)_minmax(0,1fr)] md:items-baseline md:gap-gutter"
      >
        <span class="text-body-md font-medium uppercase tracking-tight text-primary">
          {{ project.title }}
        </span>
        <span class="text-body-md text-secondary">
          {{ project.role }}
        </span>
        <span class="text-body-md text-secondary">
          {{ project.tags.join(', ') }}
        </span>
        <span class="text-label text-outline">
          {{ project.duration }}
        </span>
      </li>
    </ul>
  </section>
</template>
