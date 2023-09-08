<!-- .vitepress/theme/Layout.vue -->
<template>
  <defaultLayout :class="getCurClass">
    <!-- <template #aside-outline-after>
      <ins
        class="adsbygoogle"
        style="display: block; height: 230px"
        data-ad-client="ca-pub-6209757986574246"
        data-ad-slot="6047648655"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
      </ins>
    </template> -->
    <template #home-features-after>
      <div class="site_pv">
        本站总访问量
        <span id="busuanzi_value_site_pv"> </span>
        次，访客数
        <span id="busuanzi_value_site_uv"> </span>
        人次
      </div>
    </template>
    <template #doc-before>
      <div class="page_pv">
        本文总阅读量
        <span id="busuanzi_value_page_pv"> </span>
        次
      </div>
    </template>
  </defaultLayout>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue"
import { useData, useRoute } from "vitepress"
// @ts-ignore
import defaultLayout from "vitepress/dist/client/theme-default/Layout.vue"

const route = useRoute()

const data = useData()

const getCurClass = computed(() => {
  return data.frontmatter.value.class
})
</script>

<style lang="scss">
.loading-icon {
  display: inline;
  vertical-align: middle;
  animation: loading-rotate 2s linear infinite;
}
</style>
