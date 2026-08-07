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

    <ol class="mt-12 md:mt-16">
      <li
        v-for="(project, index) in workProjects"
        :key="project.slug"
        class="group grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
      >
        <span class="text-label text-outline md:col-span-1">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <h3
          class="text-headline-md uppercase tracking-tight text-primary transition-transform duration-200 group-hover:translate-x-1 md:col-span-5"
        >
          {{ project.title }}
        </h3>
        <p class="text-body-md text-secondary md:col-span-2">
          {{ project.role }}
        </p>
        <p class="text-label text-outline md:col-span-2">
          {{ project.tags.join(', ') }}
        </p>
        <p class="text-label text-outline md:col-span-2 md:text-right">
          {{ project.duration }}
        </p>
      </li>
    </ol>
  </section>
</template>
