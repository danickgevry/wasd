// Core
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vendors
import * as Popper from '@popperjs/core'
window.Popper = Popper
import 'bootstrap'

// Components
import App from './App.vue'
import router from './router'

// Styles
import 'bootstrap-icons/font/bootstrap-icons.scss'
import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')