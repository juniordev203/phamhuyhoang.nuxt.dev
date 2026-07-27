<script setup lang="ts">
// Single Material Symbols load — app.head links to fonts.googleapis.com
// stylesheets are stripped by @nuxtjs/google-fonts, so keep the icon font here.
useHead({
  link: [
    {
      key: 'material-symbols',
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
    }
  ]
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
