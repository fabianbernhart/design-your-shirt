// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Design your shirt | fabianbernhart',
            meta: [{}]
        }
    },
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
