<script setup lang="ts">
withDefaults(
  defineProps<{
    code: string
    filename?: string
  }>(),
  {
    filename: 'init.ts'
  }
)
</script>

<template>
  <div class="relative border border-primary bg-code-bg p-6">
    <div
      class="absolute top-0 right-0 border-b border-l border-primary bg-primary px-3 py-1 text-label text-on-primary"
    >
      {{ filename }}
    </div>
    <pre class="overflow-x-auto text-code text-primary"><code>{{ code }}</code></pre>
  </div>
</template>
