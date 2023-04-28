import * as pkg from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(pkg.default, {
        position: pkg.POSITION.TOP_CENTER,
        timeout: 2500,
    })
})
