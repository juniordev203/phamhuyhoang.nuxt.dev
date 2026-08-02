<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-primary focus:bg-background focus:px-4 focus:py-2 focus:text-label focus:text-primary"
    >
      {{ t('a11y.skipToContent') }}
    </a>
    <LayoutAppHeader />
    <main
      id="main-content"
      tabindex="-1"
      class="container-site w-full flex-grow pt-28 pb-section-mobile md:pb-section outline-none"
    >
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
