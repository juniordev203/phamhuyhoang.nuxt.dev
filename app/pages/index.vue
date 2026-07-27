<script setup lang="ts">
import { siteConfig } from '~/data/site'

useSiteSeo({
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.tagline,
  path: '/'
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeWorkSection />
    <HomeTechSection />
    <HomePostsSection />
    <HomeContactSection />
  </div>
</template>
