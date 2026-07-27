/**
 * Smooth cross-route transitions without intermediate-page flash.
 *
 * Verified: home → post detail does NOT mount `/posts` (archive). Routes are
 * siblings (`posts` vs `posts-slug`). Perceived jank came from revealing the
 * still-mounted previous page (home hero) while the next page's async setup
 * (`useAsyncData`) was unresolved — looked like hopping through another page.
 *
 * Fix: hide <main> from beforeEach until Nuxt `page:finish`, then jump to top
 * and reveal synchronously. Content scale unchanged (content/posts/YYYY/).
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const router = useRouter()
  const NAV_CLASS = 'is-route-changing'
  let navToken = 0

  const jumpToTop = () => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const beginNav = () => {
    navToken += 1
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    document.documentElement.classList.add(NAV_CLASS)
    return navToken
  }

  const endNav = (token?: number) => {
    if (token != null && token !== navToken) return
    if (!document.documentElement.classList.contains(NAV_CLASS)) return
    jumpToTop()
    document.documentElement.classList.remove(NAV_CLASS)
  }

  const cancelNav = () => {
    navToken += 1
    document.documentElement.classList.remove(NAV_CLASS)
  }

  router.beforeEach((to, from) => {
    if (!shouldResetScroll(to, from)) return
    beginNav()
  })

  router.afterEach((to, from, failure) => {
    if (failure) {
      cancelNav()
      return
    }
    if (!shouldResetScroll(to, from)) {
      cancelNav()
      return
    }

    // Safety net: if page hooks already fired (or never will), do not leave
    // the page permanently hidden.
    const token = navToken
    window.setTimeout(() => endNav(token), 2000)
  })

  router.onError(() => {
    cancelNav()
  })

  // Reveal only when the next page has finished loading — not in afterEach,
  // which can run while Nuxt still paints the previous page.
  nuxtApp.hook('page:finish', () => {
    endNav()
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
