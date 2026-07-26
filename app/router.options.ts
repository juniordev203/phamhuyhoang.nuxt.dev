import type { RouterConfig } from '@nuxt/schema'
import type { RouterScrollBehavior } from 'vue-router'

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/'
}

/**
 * Custom scroll behavior tuned for UX:
 * - Same-page hash (#work, #tech…): smooth + scroll-margin
 * - Cross-route (home → post): instant jump to top, immediately
 *   (Nuxt’s default waits for page:loading:end, which leaves one
 *   frame at a clamped mid-page scroll — feels like a stutter)
 */
export default {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const samePath = normalizePath(to.path) === normalizePath(from.path)

    if (samePath) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      }
      if (from.hash && !to.hash) {
        return savedPosition ?? { left: 0, top: 0 }
      }
      return false
    }

    if (savedPosition) {
      return savedPosition
    }

    // Cross-route + hash (e.g. /posts → /#work): wait until the section exists
    if (to.hash) {
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:loading:end', () => {
          requestAnimationFrame(() => {
            resolve({
              el: to.hash,
              behavior: 'smooth'
            })
          })
        })
      })
    }

    // Cross-route without hash: jump to top now — do not defer.
    return { left: 0, top: 0 } satisfies Awaited<
      ReturnType<RouterScrollBehavior>
    >
  }
} satisfies RouterConfig
