export interface Project {
  slug: string
  title: string
  company: string
  role: string
  duration: string
  summary: string
  contributions: string[]
  tags: string[]
  image: string
  featured?: boolean
  href?: string
}

export const projects: Project[] = [
  {
    slug: 'architect-dev',
    title: 'ARCHITECT.DEV',
    company: 'Personal',
    role: 'Frontend Engineer',
    duration: '2026',
    summary:
      'A minimalist portfolio built with Nuxt 4 — monochrome grid system, sharp typography, and a code-first aesthetic inspired by Swiss design.',
    contributions: [
      'Designed and implemented the full UI system from Stitch: design tokens, layout grid, and reusable components.',
      'Structured content around real work experience with a performance-minded Nuxt + Tailwind stack.'
    ],
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'TailwindCSS'],
    image: '/images/projects/architect-dev.png',
    featured: true,
    href: '/'
  },
  {
    slug: 'sm-workos',
    title: 'Sm-WorkOS',
    company: 'Outsource-team',
    role: 'Teamlead Front-End',
    duration: 'Jun 2025 – Dec 2025',
    summary:
      'Customizable task management module with dynamic task types, custom fields, and automated workflows for internal processes.',
    contributions: [
      'Built a dynamic form & workflow engine with drag-and-drop UI, custom fields, and validation rules for admins.',
      'Developed a real-time Kanban board with WebSocket + optimistic UI, including validation to prevent invalid state transitions.'
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'WebSocket'
    ],
    image: '/images/projects/sm-workos.png'
  },
  {
    slug: 'projenti',
    title: 'Projenti',
    company: 'CDTM-Company',
    role: 'Frontend Developer',
    duration: 'Sep 2024 – Oct 2025',
    summary:
      'All-in-one project management platform for software teams — Agile progress tracking and real-time server monitoring.',
    contributions: [
      'Implemented secure auth and RBAC with Next Auth, plus an admin panel for users, pagination, and permissions.',
      'Built a drag-and-drop Kanban system with optimistic updates and rollback handling.'
    ],
    tags: ['Next.js', 'TypeScript', 'Next Auth', 'TanStack Query'],
    image: '/images/projects/projenti.png',
    href: 'https://projenti.cdtm-ito.org'
  },
  {
    slug: 'tryhsk',
    title: 'TryHSK',
    company: 'Thien Ha Xanh',
    role: 'Intern Front-End Developer',
    duration: 'Jul 2024 – Aug 2024',
    summary:
      "Vietnam's leading HSK exam preparation platform with practice tests from HSK 1 to HSK 6.",
    contributions: [
      'Developed UI components for question pages and integrated RESTful APIs for dynamic question sets.',
      'Optimized data handling for faster page loading across practice flows.'
    ],
    tags: ['Vue.js', 'Element Plus', 'RESTful API'],
    image: '/images/projects/tryhsk.png',
    href: 'https://tryhsk.com'
  }
]
