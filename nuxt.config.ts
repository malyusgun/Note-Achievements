import { resolve } from "pathe";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  alias: {
    "@featherui": resolve(__dirname, "./libs/featherui/featherui.js"),
  },

  modules: ["@vite-pwa/nuxt", "@pinia/nuxt", "@nuxtjs/color-mode"],

  css: ["~/assets/scss/index.scss"],

  vite: {
    plugins: [svgLoader()],
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
      name: "Note Achievements",
      short_name: "Achievements",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      start_url: "/",
      scope: "/",
      display: "standalone",
      icons: [
        {
          src: "/achievement.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/achievement128x128.jpg",
          sizes: "128x128",
          type: "image/jpg",
        },
      ],
    },
    registerType: "autoUpdate",
  },
});
