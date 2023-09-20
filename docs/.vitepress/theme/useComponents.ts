// Don't remove this file, because it registers the demo components.
// 复制、查看源码
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
// 组件
import TableDemo from '@/components/table/demo.vue'
import SubSearch from '@/components/sub-search/index.vue'

export function useComponents(app) {
  app.component('Demo', Demo),
    app.component('DemoBlock', DemoBlock),
    app.component('SubSearch', SubSearch),
    app.component('TableDemo', TableDemo)
}
