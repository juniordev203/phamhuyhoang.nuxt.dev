/**
 * Kill the mid-page flash when opening a post from a deep scroll position.
 *
 * Causes stacked together:
 * 1. CSS `scroll-behavior: smooth` animated route scroll-to-top through a layout swap
 * 2. Browser keeps previous scrollY, then clamps it onto the shorter post page
 * 3. The clicked link stays focused → browser scrolls that element back into view
 *
 * Fix: manual scroll restoration, blur the click target, force top:0 every frame
 * from beforeEach until afterEach settles. Hash navigations are left alone.
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const router = useRouter()
  let stopLock: (() => void) | null = null

  const jumpToTop = () => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const lockScrollAtTop = () => {
    stopLock?.()

    // Prevent the focused click target from pulling scroll back down
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    let active = true
    const tick = () => {
      if (!active) return
      jumpToTop()
      requestAnimationFrame(tick)
    }

    jumpToTop()
    requestAnimationFrame(tick)

    stopLock = () => {
      active = false
      stopLock = null
    }
  }

  router.beforeEach((to, from) => {
    if (!shouldResetScroll(to, from)) return
    lockScrollAtTop()
  })

  router.afterEach((to, from) => {
    if (!shouldResetScroll(to, from)) {
      stopLock?.()
      return
    }

    jumpToTop()
    requestAnimationFrame(() => {
      jumpToTop()
      stopLock?.()
    })
  })
})

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/'
}

function shouldResetScroll(
  to: { path: string, hash: string, meta: Record<string, unknown> },
  from: { path: string }
) {
  if (normalizePath(to.path) === normalizePath(from.path)) return false
  if (to.hash) return false
  if (to.meta.scrollToTop === false) return false
  return true
}
