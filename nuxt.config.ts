// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content'
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      Geist: [400, 600, 700],
      'JetBrains Mono': [400, 500]
    },
    // Material Symbols loaded via app.head.link (icon font)
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
        }
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

  content: {
    experimental: {
      // Node 22.5+ / Vercel-friendly; avoids native better-sqlite3 builds
      sqliteConnector: 'native'
    }
  },

  future: {
    compatibilityVersion: 4
  }
})
