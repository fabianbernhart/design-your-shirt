// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4
    },
    app: {
        head: {
            title: 'Design your shirt | fabianbernhart',
            meta: [{}]
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    devtools: { enabled: true },
    compatibilityDate: '2026-05-14'
})
