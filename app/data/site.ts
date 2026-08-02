export const siteConfig = {
  url: 'https://huyhoangpham.id.vn',
  name: 'ARCHITECT.DEV',
  fullName: 'Pham Huy Hoang',
  version: 'v2.4.1',
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
    zalo: {
      label: 'Zalo',
      href: 'https://zalo.me/0367435069',
      display: '0367 435 069'
    },
    source: {
      label: 'Source Code',
      href: 'https://github.com/juniordev203'
    }
  },
  nav: [
    { key: 'work', to: '/#work' },
    { key: 'tech', to: '/#tech' },
    { key: 'posts', to: '/#posts' },
    { key: 'contact', to: '/#contact' }
  ]
} as const
