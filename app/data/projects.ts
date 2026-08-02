export interface Project {
  slug: string
  tags: string[]
  image: string
  featured?: boolean
  href?: string
}

export const projects: Project[] = [
  {
    slug: 'architect-dev',
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'TailwindCSS'],
    image: '/images/projects/architect-dev.webp',
    featured: true,
    href: '/'
  },
  {
    slug: 'sm-workos',
    tags: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'WebSocket'
    ],
    image: '/images/projects/sm-workos.webp'
  },
  {
    slug: 'projenti',
    tags: ['Next.js', 'TypeScript', 'Next Auth', 'TanStack Query'],
    image: '/images/projects/projenti.webp',
    href: 'https://projenti.cdtm-ito.org'
  },
  {
    slug: 'tryhsk',
    tags: ['Vue.js', 'Element Plus', 'RESTful API'],
    image: '/images/projects/tryhsk.webp',
    href: 'https://tryhsk.com'
  }
]
