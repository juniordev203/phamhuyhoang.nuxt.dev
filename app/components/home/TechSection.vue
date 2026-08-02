<script setup lang="ts">
import { initSnippet, skillGroups } from '~/data/skills'

const { t } = useI18n()
</script>

<template>
  <section id="tech" class="section-gap scroll-mt-28">
    <div class="mb-12 flex items-end justify-between border-b border-primary pb-4">
      <h2 class="text-headline-md text-primary">
        {{ t('tech.heading') }}
      </h2>
      <span class="text-label text-secondary">{{ t('tech.eyebrow') }}</span>
    </div>

    <div class="grid grid-cols-2 gap-gutter md:grid-cols-4">
      <UiSkillCard
        v-for="skill in skillGroups"
        :key="skill.key"
        :skill="skill"
      />
    </div>

    <div class="mt-gutter">
      <UiCodeBlock :code="initSnippet" filename="init.ts" />
    </div>
  </section>
</template>
