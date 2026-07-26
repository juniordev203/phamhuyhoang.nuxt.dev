<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { resolveNavRoute } from '~/utils/nav'

const route = useRoute()
const mobileOpen = ref(false)

const isActive = (to: string) => {
  if (to.startsWith('/#')) {
    return route.path === '/' && route.hash === to.slice(1)
  }
  return route.path === to
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)
</script>

<template>
  <header
    class="fixed top-0 left-0 z-50 w-full border-b border-primary bg-background/90 backdrop-blur-md"
  >
    <div class="container-site flex items-center justify-between py-4">
      <NuxtLink
        to="/"
        class="text-headline-md font-bold tracking-tighter text-primary"
      >
        {{ siteConfig.name }}
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="item in siteConfig.nav"
          :key="item.to"
          :to="resolveNavRoute(item.to)"
          :class="[
            'cursor-pointer text-label transition-all duration-200 active:opacity-70',
            isActive(item.to)
              ? 'text-primary underline decoration-2 underline-offset-8'
              : 'text-secondary hover:text-primary hover:line-through'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <a
        :href="siteConfig.resumeUrl"
        class="hidden cursor-pointer border border-primary bg-primary px-6 py-3 text-label text-on-primary transition-colors duration-200 hover:bg-background hover:text-primary md:inline-flex"
      >
        Resume
      </a>

      <button
        type="button"
        class="cursor-pointer text-primary md:hidden"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="material-symbols-outlined">
          {{ mobileOpen ? 'close' : 'menu' }}
        </span>
      </button>
    </div>

    <div
      v-if="mobileOpen"
      class="container-site flex flex-col gap-4 border-t border-primary py-6 md:hidden"
    >
      <NuxtLink
        v-for="item in siteConfig.nav"
        :key="item.to"
        :to="resolveNavRoute(item.to)"
        class="text-label text-primary"
      >
        {{ item.label }}
      </NuxtLink>
      <a :href="siteConfig.resumeUrl" class="text-label text-primary">
        Resume
      </a>
    </div>
  </header>
</template>
