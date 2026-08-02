<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section
    class="mt-20 grid grid-cols-1 items-center gap-gutter md:mt-32 md:grid-cols-12"
  >
    <div class="md:col-span-8 lg:col-span-9">
      <p class="mb-4 text-label tracking-widest text-secondary uppercase">
        {{ siteConfig.fullName }}
      </p>
      <h1 class="mb-6 text-headline-xl text-primary uppercase">
        {{ t('site.title') }}
      </h1>
      <p class="mb-12 max-w-2xl text-body-lg text-secondary">
        {{ t('site.tagline') }}
      </p>
      <div class="flex flex-wrap gap-4">
        <UiAppButton :to="localePath({ path: '/', hash: '#work' })">
          {{ t('hero.viewProjects') }}
        </UiAppButton>
        <UiAppButton
          :to="localePath({ path: '/', hash: '#contact' })"
          variant="secondary"
        >
          {{ t('hero.getInTouch') }}
        </UiAppButton>
      </div>
    </div>

    <div
      class="relative hidden aspect-square border border-primary bg-background p-1 md:col-span-4 md:block lg:col-span-3"
    >
      <NuxtImg
        src="/images/hero-architecture.jpg"
        :alt="t('hero.imageAlt')"
        width="1024"
        height="1024"
        sizes="(max-width: 768px) 0px, 320px"
        format="webp"
        loading="eager"
        fetchpriority="high"
        class="h-full w-full border border-primary object-cover"
      />
      <div
        class="absolute -right-4 -bottom-4 border border-primary bg-background px-3 py-1 text-label"
      >
        {{ siteConfig.version }}
      </div>
    </div>
  </section>
</template>
