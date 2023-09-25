import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
// TODO why is there need this row of code?
import App from './App.vue'
import router from './router'


const app = createApp(App)

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

app.use(createPinia())
    .use(router)
    .use(vuetify)

app.mount('#app')
