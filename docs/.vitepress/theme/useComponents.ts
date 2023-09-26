// Don't remove this file, because it registers the demo components.
// 复制、查看源码
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
// 组件
export function useComponents(app) {
  app.component('Demo', Demo), app.component('DemoBlock', DemoBlock)
}
