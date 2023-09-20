/// <reference types="vite/client" />

// 让ts认识.vue文件的类型声明文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'busuanzi.pure.js' {
  function fetch(): any
  export = fetch
}
