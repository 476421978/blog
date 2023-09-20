import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import AuthRouter from './auth'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

export default router
