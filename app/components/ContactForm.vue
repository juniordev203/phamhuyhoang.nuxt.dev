<script setup lang="ts">
import { CONTACT_MIN_ELAPSED_MS, contactSchema } from '#shared/contact'

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  message: '',
  website: ''
})

const startedAt = Date.now()
const status = ref<'idle' | 'loading'>('idle')
const successOpen = ref(false)

const onSubmit = async () => {
  if (status.value === 'loading') return

  const parsed = contactSchema.safeParse({
    name: form.name,
    email: form.email,
    message: form.message,
    website: form.website,
    startedAt
  })

  if (!parsed.success) {
    const first =
      parsed.error.flatten().fieldErrors.name?.[0]
      || parsed.error.flatten().fieldErrors.email?.[0]
      || parsed.error.flatten().fieldErrors.message?.[0]
      || 'Invalid form data'

    toast.add({
      title: 'Check your form',
      description: first,
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    return
  }

  // Client-side time-trap mirror (server still enforces).
  if (Date.now() - startedAt < CONTACT_MIN_ELAPSED_MS) {
    toast.add({
      title: 'Please wait a moment',
      description: 'Take a second before sending your message.',
      color: 'warning',
      icon: 'i-lucide-circle-alert'
    })
    return
  }

  status.value = 'loading'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: parsed.data
    })

    form.name = ''
    form.email = ''
    form.message = ''
    form.website = ''
    successOpen.value = true
  } catch {
    toast.add({
      title: 'Failed to send message',
      description: 'Please try submitting again.',
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  } finally {
    status.value = 'idle'
  }
}
</script>

<template>
  <form
    class="relative mb-16 border border-primary bg-surface-container-lowest p-8 md:p-12"
    @submit.prevent="onSubmit"
  >
    <!-- Honeypot: hidden from users, visible to naive bots -->
    <div
      class="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label for="website">Website</label>
      <input
        id="website"
        v-model="form.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

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
          maxlength="100"
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
          maxlength="200"
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
        maxlength="5000"
        :disabled="status === 'loading'"
        class="resize-none rounded-none border-0 border-b border-primary bg-transparent p-2 text-code text-primary outline-none transition-all placeholder:text-outline focus:border-b-2 focus:border-primary disabled:opacity-60"
      />
    </div>

    <UiAppButton type="submit" block :disabled="status === 'loading'">
      {{ status === 'loading' ? 'SENDING…' : 'SEND MESSAGE' }}
    </UiAppButton>
  </form>

  <ContactSuccessModal v-model:open="successOpen" />
</template>
