import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 全局样式
import '@/style/index.scss'

// element图标库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// vue-router4
import router from '@/router'
import '@/router/permission'

// 状态管理器
import { createPinia } from 'pinia'
const pinia = createPinia()

// 模拟数据mock 会拦截请求
import '../mock/index.js'

// 创建
const app = createApp(App)

app.use(router)

app.use(pinia)

app.use(ElementPlus)

app.mount('#app')
