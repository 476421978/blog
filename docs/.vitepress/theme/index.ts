import { Theme, inBrowser, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 自定义布局
import Layout from '@/layout/index.vue'
// element-plus
import elementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局样式
import '@/style/index.scss'

// import elementAgain from '@/views/again/element-again/index'
// import HelloWorld from '@/components/HelloWorld.vue'

import { useComponents } from './useComponents'

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.

    // 全局注册 Element-plus
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.use(elementPlus)

    useComponents(app)

    // app.component('elemen-again', elementAgain)
    // app.component('HelloWorld', HelloWorld)
  },
  setup() {
    // this function will be executed inside VitePressApp's
    // setup hook. all composition APIs are available here.
  },
}

export default theme
