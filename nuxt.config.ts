// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vuestic/nuxt'],
    vuestic: {
        config: {
            // Config here
        }
    },
    devtools: { enabled: true }
})
