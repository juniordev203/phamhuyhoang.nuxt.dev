import type { RouteLocationRaw } from 'vue-router'

/** Resolve nav paths like `/#tech` to client-side route objects. */
export function resolveNavRoute(to: string): RouteLocationRaw {
  if (to.startsWith('/#')) {
    return { path: '/', hash: to.slice(1) }
  }
  return to
}
