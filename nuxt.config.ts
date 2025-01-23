// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },

  $production: {
    routeRules: {
      '/**': {
        isr: true,
        cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true },
      },
    },
  },
  $development: {
    //
    debug: true,
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
    },
  },

  modules: [
    '@vant/nuxt',
    '@unocss/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxthub/core',
  ],
  // https://icones.js.org/
  icon: {
    serverBundle: {
      collections: ['ion', 'mdi'],
    },
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  features: {
    inlineStyles: true,
  },

  ssr: true,
  spaLoadingTemplate: 'spa-loading-template.html',

  app: {
    baseURL: '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  nitro: {
    routeRules: {
      '/**': { isr: false },
    },
  },

  hub: {
    kv: true,
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },

      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en',
  },

  css: ['~/assets/styles/main.css'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "~/assets/styles/index.scss" as *;',
        },
      },
    },
    // vue: {
    //   customElement: true,
    // },
    // vueJsx: {
    //   mergeProps: true,
    // },
  },

  compatibilityDate: '2024-09-25',
});
