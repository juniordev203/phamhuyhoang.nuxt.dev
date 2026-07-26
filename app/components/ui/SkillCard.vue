<script setup lang="ts">
import type { SkillGroup } from '~/data/skills'

defineProps<{
  skill: SkillGroup
}>()
</script>

<template>
  <div
    class="card-hover group relative cursor-pointer border border-primary bg-surface-container-lowest p-6"
  >
    <span class="material-symbols-outlined mb-4 block text-4xl text-primary">
      {{ skill.icon }}
    </span>
    <h3 class="mb-4 text-label font-bold tracking-widest uppercase">
      {{ skill.title }}
    </h3>
    <ul class="space-y-2 text-body-md text-secondary">
      <li v-for="item in skill.items" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
