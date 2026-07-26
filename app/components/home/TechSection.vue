<script setup lang="ts">
import { initSnippet, skillGroups } from '~/data/skills'
</script>

<template>
  <section id="tech" class="section-gap scroll-mt-28">
    <div class="mb-12 flex items-end justify-between border-b border-primary pb-4">
      <h2 class="text-headline-md text-primary">
        Technical Arsenal
      </h2>
      <span class="text-label text-secondary">002 // STACK</span>
    </div>

    <div class="grid grid-cols-2 gap-gutter md:grid-cols-4">
      <UiSkillCard
        v-for="skill in skillGroups"
        :key="skill.title"
        :skill="skill"
      />
    </div>

    <div class="mt-gutter">
      <UiCodeBlock :code="initSnippet" filename="init.ts" />
    </div>
  </section>
</template>
