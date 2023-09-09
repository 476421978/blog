---
layout: home
class: home
hero:
  # name: 全栈
  image:
    src: /logo.jpg
  text: web前端
  tagline: 包含HTML、CSS、JavaScript、Vue、React、TypeScript...
  actions:
    - theme: brand
      text: 首页
      link: /pages/software
    - theme: alt
      text: 更新日志
      link: /关于/更新日志
features:
  - icon: ✨
    title: 随笔记录
    details: 记录工作生活
  - icon: ❤
    title: 循序渐进
    details: 纸上得来终觉浅，绝知此事要躬行。
  - icon: 🚶‍♂️
    title: 关于我
    details: 是个路人。
---

<style>
@media (min-width: 960px) {
  .home .VPHero.has-image .main {
    max-width: 640px;
  }
}

.VPFeatures + .VPFeatures,
.site_pv ~ .site_pv {
  display: none;
}

.site_pv{
  text-align: center;
  padding-top: 5em;
}
</style>
