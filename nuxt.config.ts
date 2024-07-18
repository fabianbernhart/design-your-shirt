// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@vuestic/nuxt',
        '@nuxt/test-utils/module',
        '@pinia/nuxt'
    ],

    pinia: {
        storesDirs: ['src/stores/**']
    },

    devtools: { enabled: true },
    compatibilityDate: '2024-07-17'
})
