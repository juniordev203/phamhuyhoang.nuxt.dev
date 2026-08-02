<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { resolveNavRoute } from '~/utils/nav'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const mobileOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

const navTo = (to: string) => localePath(resolveNavRoute(to))

const isActive = (to: string) => {
  const root = localePath('/')
  const postsPath = localePath('/posts')

  if (to === '/#posts') {
    return (
      route.path.startsWith(postsPath)
      || (route.path === root && route.hash === '#posts')
    )
  }

  if (to.startsWith('/#')) {
    return route.path === root && route.hash === to.slice(1)
  }

  return route.path === to
}

const closeMobile = () => {
  mobileOpen.value = false
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && mobileOpen.value) {
    closeMobile()
    menuButton.value?.focus()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMobile()
  }
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 z-50 w-full border-b border-primary bg-background/90 backdrop-blur-md"
  >
    <div class="container-site flex items-center justify-between py-4">
      <NuxtLink
        :to="localePath('/')"
        class="text-headline-md font-bold tracking-tighter text-primary"
      >
        {{ siteConfig.name }}
      </NuxtLink>

      <nav
        class="hidden items-center gap-8 md:flex"
        :aria-label="t('a11y.primaryNav')"
      >
        <NuxtLink
          v-for="item in siteConfig.nav"
          :key="item.to"
          :to="navTo(item.to)"
          :class="[
            'cursor-pointer text-label transition-all duration-200 active:opacity-70',
            isActive(item.to)
              ? 'text-primary underline decoration-2 underline-offset-8'
              : 'text-secondary hover:text-primary hover:line-through'
          ]"
        >
          {{ t(`nav.${item.key}`) }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-4 md:flex">
        <LayoutLocaleSwitcher />
        <LayoutThemeToggle />
      </div>

      <button
        ref="menuButton"
        type="button"
        class="cursor-pointer text-primary md:hidden"
        :aria-label="t('a11y.toggleMenu')"
        aria-controls="mobile-nav"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="material-symbols-outlined">
          {{ mobileOpen ? 'close' : 'menu' }}
        </span>
      </button>
    </div>

    <div
      v-if="mobileOpen"
      id="mobile-nav"
      class="container-site flex flex-col gap-4 border-t border-primary py-6 md:hidden"
    >
      <NuxtLink
        v-for="item in siteConfig.nav"
        :key="item.to"
        :to="navTo(item.to)"
        class="text-label text-primary"
      >
        {{ t(`nav.${item.key}`) }}
      </NuxtLink>
      <div class="flex gap-4">
        <LayoutLocaleSwitcher />
        <LayoutThemeToggle />
      </div>
    </div>
  </header>
</template>
