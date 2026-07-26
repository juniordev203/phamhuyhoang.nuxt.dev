export const siteConfig = {
  name: 'ARCHITECT.DEV',
  fullName: 'Pham Huy Hoang',
  title: 'Frontend Engineer',
  tagline:
    'Design-driven engineer focused on building simple, optimized, and clean web experiences.',
  introduction: [
    'I am a Front-End Developer with 1.5+ years of hands-on experience specializing in creating high-performance, user-centric web applications with the modern JavaScript ecosystem (Vue 3, Nuxt.js, TypeScript).',
    'Proven ability to translate complex UI/UX designs into responsive, interactive, and scalable products.',
    'Eager to contribute to a collaborative team and solve challenging technical problems.'
  ],
  version: 'v2.4.1',
  copyright: '© 2026 ARCHITECT.DEV — ENGINEERED FOR PRECISION',
  resumeUrl: '#',
  email: 'huyhoangpham8460@gmail.com',
  phone: '0367 435 069',
  education: {
    university: 'National Economics University',
    major: 'Information Technology',
    duration: 'Sep 2021 – Aug 2025'
  },
  social: {
    github: {
      label: 'GitHub',
      href: 'https://github.com/juniordev203',
      display: 'github.com/juniordev203'
    },
    phone: {
      label: 'Phone',
      href: 'tel:+84367435069',
      display: '0367 435 069'
    },
    source: {
      label: 'Source Code',
      href: 'https://github.com/juniordev203'
    }
  },
  nav: [
    { label: 'Work', to: '/work' },
    { label: 'Tech', to: '/#tech' as const },
    { label: 'Contact', to: '/contact' }
  ]
} as const
