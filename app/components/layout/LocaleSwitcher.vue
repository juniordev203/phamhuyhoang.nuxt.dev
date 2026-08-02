<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div
    class="flex items-center gap-1"
    role="group"
    :aria-label="t('lang.label')"
  >
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="cursor-pointer border border-primary px-3 py-2 text-label transition-colors duration-200"
      :class="
        locale === l.code
          ? 'bg-primary text-on-primary'
          : 'bg-background text-secondary hover:bg-primary hover:text-on-primary'
      "
      :aria-label="`${t('lang.switchTo')}: ${l.name}`"
      :aria-current="locale === l.code ? 'true' : undefined"
    >
      {{ l.name }}
    </NuxtLink>
  </div>
</template>
