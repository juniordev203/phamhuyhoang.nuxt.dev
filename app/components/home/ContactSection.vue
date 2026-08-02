<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="section-gap scroll-mt-28">
    <div class="mx-auto flex w-full max-w-2xl flex-col items-center">
      <div class="mb-16 text-center">
        <p class="mb-4 text-label tracking-widest text-secondary uppercase">
          {{ t('contact.eyebrow') }}
        </p>
        <h2 class="mb-6 text-headline-xl text-primary">
          {{ t('contact.heading') }}
        </h2>
        <p class="mx-auto max-w-lg text-body-lg text-secondary">
          {{ t('contact.description') }}
        </p>
      </div>

      <ContactForm class="w-full" />

      <div
        class="grid w-full grid-cols-1 gap-6 border-t border-outline-variant pt-12 text-center sm:grid-cols-3"
      >
        <a
          :href="`mailto:${siteConfig.email}`"
          class="group flex cursor-pointer flex-col items-center gap-2"
        >
          <span
            class="text-label tracking-widest text-secondary uppercase transition-colors group-hover:text-primary"
          >
            {{ t('contact.email') }}
          </span>
          <span class="break-all text-body-md text-primary group-hover:underline">
            {{ siteConfig.email }}
          </span>
        </a>
        <a
          :href="siteConfig.social.github.href"
          class="group flex cursor-pointer flex-col items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            class="text-label tracking-widest text-secondary uppercase transition-colors group-hover:text-primary"
          >
            {{ t('contact.github') }}
          </span>
          <span class="text-body-md text-primary group-hover:underline">
            {{ siteConfig.social.github.display }}
          </span>
        </a>
        <a
          :href="siteConfig.social.phone.href"
          class="group flex cursor-pointer flex-col items-center gap-2"
        >
          <span
            class="text-label tracking-widest text-secondary uppercase transition-colors group-hover:text-primary"
          >
            {{ t('contact.phone') }}
          </span>
          <span class="text-body-md text-primary group-hover:underline">
            {{ siteConfig.phone }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
