<script setup lang="ts">
const localePath = useLocalePath()

await navigateTo(localePath({ path: '/', hash: '#contact' }), { replace: true })
</script>

<template>
  <div />
</template>
