<script setup lang="ts">
import { siteConfig } from '~/data/site'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const onSubmit = () => {
  const subject = encodeURIComponent(
    `ARCHITECT.DEV inquiry from ${form.name}`
  )
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message
    ].join('\n')
  )

  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  submitted.value = true
}
</script>

<template>
  <form
    class="mb-16 border border-primary bg-surface-container-lowest p-8 md:p-12"
    @submit.prevent="onSubmit"
  >
    <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div class="flex flex-col">
        <label for="name" class="mb-2 text-label text-primary">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          placeholder="Your name"
          required
          class="rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary"
        >
      </div>
      <div class="flex flex-col">
        <label for="email" class="mb-2 text-label text-primary">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          placeholder="you@company.com"
          required
          class="rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary"
        >
      </div>
    </div>

    <div class="mb-12 flex flex-col">
      <label for="message" class="mb-2 text-label text-primary">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        name="message"
        rows="4"
        placeholder="Share the role, project idea, or how I can help..."
        required
        class="resize-none rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary"
      />
    </div>

    <UiAppButton type="submit" block>
      SEND MESSAGE
    </UiAppButton>

    <p
      v-if="submitted"
      class="mt-4 text-center text-label text-secondary"
    >
      Opening your email client to send the message…
    </p>
  </form>
</template>
