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
    plugins: [
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use \"~/assets/scss/primitives.scss\" as *;",
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
      display: "standalone",
      icons: [
        {
          src: "/achievements.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    registerType: "autoUpdate",
  },
});