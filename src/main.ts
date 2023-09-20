import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 全局样式
import '@/style/index.scss'

// element图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// vue-router4
import router from '@/router'
import '@/router/permission'

// 状态管理器
import { createPinia } from 'pinia'
const pinia = createPinia()

// 创建
const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
