// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Design your shirt | fabianbernhart',
            meta: [{}]
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@vuestic/nuxt', '@pinia/nuxt'],

    devtools: { enabled: false },
    compatibilityDate: '2024-07-17'
})
