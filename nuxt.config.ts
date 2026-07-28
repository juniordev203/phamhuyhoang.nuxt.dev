// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@vercel/analytics'
  ],

  css: ['~/assets/css/main.css'],

  image: {
    quality: 80,
    format: ['webp']
  },

  site: {
    url: process.env.NUXT_SITE_URL || 'https://huyhoangpham.id.vn',
    name: 'ARCHITECT.DEV'
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      Geist: [400, 600, 700],
      'JetBrains Mono': [400, 500]
    },
    // Material Symbols self-hosted via @font-face in app/assets/css/main.css
    // (public/fonts/material-symbols-outlined.woff2) — avoid fonts.googleapis.com.
    fontsDir: 'fonts'
  },

  app: {
    head: {
      title: 'ARCHITECT.DEV — Frontend Engineer',
      meta: [
        {
          name: 'description',
          content:
            'Design-driven engineer focused on building simple, optimized, and clean web experiences.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  runtimeConfig: {
    resendApiKey: '',
    resendFrom: 'ARCHITECT.DEV <onboarding@resend.dev>',
    contactEmail: 'huyhoangpham8460@gmail.com'
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  // Smooth only for hash targets (#work, #tech…). Path changes jump instantly.
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  content: {
    experimental: {
      // Node 22.5+ / Vercel-friendly; avoids native better-sqlite3 builds
      sqliteConnector: 'native'
    }
  },

  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        }
      }
    }
  },

  future: {
    compatibilityVersion: 4
  }
})
