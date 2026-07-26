<script setup lang="ts">
import { siteConfig } from '~/data/site'

definePageMeta({
  layout: 'contact'
})

useSeoMeta({
  title: `Contact — ${siteConfig.name}`,
  description:
    'Contact for hiring opportunities or website project inquiries — open to recruiters and clients.'
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
    <div class="mt-12 mb-16 text-center md:mt-24">
      <h1 class="mb-6 text-headline-xl text-primary">
        Let's work.
      </h1>
      <p class="mx-auto max-w-lg text-body-lg text-secondary">
        Whether you're a recruiter looking for a frontend engineer, or a client
        ready to build a website or web product — I'd love to hear from you.
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
          Email
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
          GitHub
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
          Phone
        </span>
        <span class="text-body-md text-primary group-hover:underline">
          {{ siteConfig.phone }}
        </span>
      </a>
    </div>
  </div>
</template>
