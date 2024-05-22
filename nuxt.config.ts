// https://nuxt.com/docs/api/configuration/nuxt-config
import vuestic from 'vuestic-ui'
import axios from 'axios'

export default defineNuxtConfig({
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vuestic/nuxt'],
    vuestic: {
        config: {
            // Config here
        }
    },
    devtools: { enabled: true }
})
