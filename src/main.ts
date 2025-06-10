import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'element-plus/theme-chalk/src/index.scss'
import './style.scss'
import './permission'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).use(store).mount('#app')
