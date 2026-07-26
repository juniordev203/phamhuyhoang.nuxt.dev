<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const toggle = () => {
  isDark.value = !isDark.value
}

const buttonClass
  = 'inline-flex cursor-pointer items-center gap-2 border border-primary bg-primary px-6 py-3 text-label text-on-primary transition-colors duration-200 hover:bg-background hover:text-primary'
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      :class="buttonClass"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    >
      <span class="material-symbols-outlined !text-base">
        {{ isDark ? 'light_mode' : 'dark_mode' }}
      </span>
      <span>{{ isDark ? 'Light' : 'Dark' }}</span>
    </button>

    <template #fallback>
      <span
        :class="buttonClass"
        class="pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <span class="material-symbols-outlined !text-base">dark_mode</span>
        <span>Dark</span>
      </span>
    </template>
  </ClientOnly>
</template>
