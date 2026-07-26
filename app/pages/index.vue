<script setup lang="ts">
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.tagline
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
