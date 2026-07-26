<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const onSubmit = async () => {
  if (status.value === 'loading') return

  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        message: form.message
      }
    })

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error: unknown) {
    status.value = 'error'
    const err = error as { data?: { statusMessage?: string }, statusMessage?: string }
    errorMessage.value
      = err?.data?.statusMessage
        || err?.statusMessage
        || 'Failed to send message. Please try again or email me directly.'
  }
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
          autocomplete="name"
          :disabled="status === 'loading'"
          class="rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary disabled:opacity-60"
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
          autocomplete="email"
          :disabled="status === 'loading'"
          class="rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary disabled:opacity-60"
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
        :disabled="status === 'loading'"
        class="resize-none rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary disabled:opacity-60"
      />
    </div>

    <UiAppButton type="submit" block :disabled="status === 'loading'">
      {{ status === 'loading' ? 'SENDING…' : 'SEND MESSAGE' }}
    </UiAppButton>

    <p
      v-if="status === 'success'"
      class="mt-4 text-center text-label text-secondary"
      role="status"
    >
      Message sent. I will get back to you soon.
    </p>
    <p
      v-else-if="status === 'error'"
      class="mt-4 text-center text-label text-secondary"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </form>
</template>
