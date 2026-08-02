/** Pagination & listing constants for the posts system. */
export const POSTS_PER_PAGE = 12
export const POSTS_HOME_PREVIEW = 3

export function parsePostsPage(query: unknown): number {
  const raw = Array.isArray(query) ? query[0] : query
  const page = Number(raw)
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1
}

export function formatPostDate(date: string | Date, locale: string = 'en') {
  const value = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(value.getTime())) return ''

  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(value)
}
