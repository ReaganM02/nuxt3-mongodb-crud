// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    nitro: {
        plugins: ['~/server/database.ts']
    },
    runtimeConfig: {
        apiSecret: {
            MONGO_URL: process.env.MONGO_URL
        }
    },
    css: ['~/assets/css/main.css']
})
