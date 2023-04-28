// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-security'
    ],
    nitro: {
        plugins: ['~/server/database.ts']
    },
    runtimeConfig: {
        apiSecret: {
            MONGO_URL: process.env.MONGO_URL
        }
    },
    css: ['~/assets/css/main.css'],
    security: {
        rateLimiter: {
            value: {
                tokensPerInterval: 30,
                interval: 'hour',
                fireImmediately: true,
            },
            route: '',
            throwError: true
        }
    },
})
