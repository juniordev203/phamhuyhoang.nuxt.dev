<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

useSiteSeo({
  title: `${siteConfig.name} — ${t('site.title')}`,
  description: t('site.tagline'),
  path: localePath('/')
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
