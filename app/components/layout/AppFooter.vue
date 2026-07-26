<script setup lang="ts">
import { siteConfig } from '~/data/site'

withDefaults(
  defineProps<{
    variant?: 'default' | 'contact'
  }>(),
  {
    variant: 'default'
  }
)
</script>

<template>
  <footer class="mt-auto w-full border-t border-primary bg-background">
    <div
      class="container-site flex w-full flex-col items-center justify-between gap-4 py-12 md:flex-row"
    >
      <template v-if="variant === 'contact'">
        <div class="text-label font-bold text-primary">
          {{ siteConfig.name }}
        </div>
        <div class="text-center text-body-md text-secondary md:text-left">
          {{ siteConfig.copyright }}
        </div>
      </template>
      <span v-else class="text-label font-bold text-primary">
        {{ siteConfig.copyright }}
      </span>

      <div class="flex gap-6">
        <a
          :href="siteConfig.social.github.href"
          class="cursor-pointer text-label text-secondary transition-colors duration-200 hover:text-primary hover:line-through"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ siteConfig.social.github.label }}
        </a>
        <a
          :href="siteConfig.social.phone.href"
          class="cursor-pointer text-label text-secondary transition-colors duration-200 hover:text-primary hover:line-through"
        >
          {{ siteConfig.social.phone.label }}
        </a>
        <a
          :href="`mailto:${siteConfig.email}`"
          class="cursor-pointer text-label text-secondary transition-colors duration-200 hover:text-primary hover:line-through"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
</template>
