export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@vite-pwa/nuxt',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/primitives.scss" as *;',
        },
      },
    },
  },

  pwa: {
    manifest: {
      name: 'Note Achievements',
      short_name: 'Achievements',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/achievements.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    registerType: 'autoUpdate',
  },
})