import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as bootstrap from 'bootstrap'

import App from './App.vue'
import router from './router'

import 'bootstrap-icons/font/bootstrap-icons.scss'
import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')