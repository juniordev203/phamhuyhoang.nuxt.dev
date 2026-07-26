<script setup lang="ts">
import { siteConfig } from '~/data/site'

const open = defineModel<boolean>('open', { required: true })

const close = () => {
  open.value = false
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close()
}

watch(open, (value) => {
  if (!import.meta.client) return

  document.body.style.overflow = value ? 'hidden' : ''

  if (value) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-sm"
        role="presentation"
        @click.self="close"
      >
        <Transition
          appear
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-3 scale-[0.98]"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-[0.98]"
        >
          <div
            v-if="open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            class="relative w-full max-w-lg border border-primary bg-surface-container-lowest p-8 shadow-[8px_8px_0_0_var(--p-primary)] md:p-10"
          >
            <button
              type="button"
              class="absolute top-4 right-4 cursor-pointer text-secondary transition-colors hover:text-primary"
              aria-label="Close"
              @click="close"
            >
              <span class="material-symbols-outlined !text-xl">close</span>
            </button>

            <div class="mb-6 flex items-center gap-3 border-b border-primary pb-4">
              <span
                class="inline-flex size-10 items-center justify-center border border-primary bg-primary text-on-primary"
              >
                <span class="material-symbols-outlined !text-xl">mark_email_read</span>
              </span>
              <p class="text-label tracking-widest text-secondary uppercase">
                Message received
              </p>
            </div>

            <h2
              id="contact-success-title"
              class="mb-4 text-headline-md text-primary"
            >
              Thank you for reaching out!
            </h2>

            <div class="space-y-3 text-body-md text-secondary">
              <p>I've received your message.</p>
              <p>
                I'll review your request and get back to you by email within
                24 hours.
              </p>
            </div>

            <div class="mt-8 border-t border-outline-variant pt-6">
              <p class="mb-4 text-body-md text-secondary">
                If your project needs a quicker response, you can also reach me
                via:
              </p>

              <dl class="space-y-3">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <dt class="w-16 shrink-0 text-label text-secondary uppercase">
                    Email
                  </dt>
                  <dd>
                    <a
                      :href="`mailto:${siteConfig.email}`"
                      class="text-code text-primary underline-offset-4 hover:underline"
                    >
                      {{ siteConfig.email }}
                    </a>
                  </dd>
                </div>
                <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <dt class="w-16 shrink-0 text-label text-secondary uppercase">
                    Zalo
                  </dt>
                  <dd>
                    <a
                      :href="siteConfig.social.zalo.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-code text-primary underline-offset-4 hover:underline"
                    >
                      {{ siteConfig.social.zalo.display }}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div class="mt-8">
              <UiAppButton type="button" block @click="close">
                CLOSE
              </UiAppButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
