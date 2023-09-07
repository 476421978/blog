<!-- .vitepress/theme/Layout.vue -->
<template>
  <div>自定义布局</div>
  <defaultLayout>
    <template #doc-footer-before> aside-outline-after </template>
  </defaultLayout>
</template>

<script setup lang="ts">
import defaultLayout from "vitepress/dist/client/theme-default/Layout.vue"
</script>

<style scoped></style>
