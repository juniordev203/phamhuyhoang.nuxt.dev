<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="border border-primary px-3 py-1 text-label text-primary">
    {{ label }}
  </span>
</template>
