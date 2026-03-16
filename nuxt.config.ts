// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false, // GitHub Pages = только статика

  app: {
    // имя репозитория на GitHub
    baseURL: '/weeding-nuxt-4/',
    buildAssetsDir: 'assets/',
  },

  nitro: {
    preset: 'github-pages',
  },

  modules: [
    '@pinia/nuxt',
  ],

  // Подключаем глобальные стили
  css: [
    '@/assets/main.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Подключаем миксины и переменные глобально для всех SCSS файлов
          additionalData: '@use "@/assets/abstracts/index.scss" as *;',
        },
      },
    },
  },
})