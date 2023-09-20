import router from './index'
// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
