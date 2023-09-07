import { Theme, inBrowser, useRoute } from "vitepress"
import DefaultTheme from "vitepress/theme"
// 自定义布局
import Layout from '../../../src/layout/index.vue'

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  NotFound: () => 'custom 404',
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
  },
  setup() {
    // this function will be executed inside VitePressApp's
    // setup hook. all composition APIs are available here.
  }
}

export default theme
