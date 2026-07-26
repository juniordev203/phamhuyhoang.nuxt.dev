<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
    block?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    block: false
  }
)

const buttonClass = computed(() => [
  'inline-flex cursor-pointer items-center justify-center text-label border border-primary px-8 py-4 transition-colors duration-200 active:opacity-70',
  props.variant === 'primary'
    ? 'bg-primary text-on-primary hover:bg-background hover:text-primary'
    : 'bg-background text-primary hover:bg-primary hover:text-on-primary',
  props.block ? 'w-full' : ''
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClass">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="buttonClass">
    <slot />
  </a>
  <button v-else :type="type" :class="buttonClass">
    <slot />
  </button>
</template>
