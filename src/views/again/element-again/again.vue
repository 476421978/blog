<template>
  <div>
    <TSSearch
      ref="TSearchRef"
      :mockData="mockData"
      @com-get-form="comGetForm"
      style="padding: 25px"
    >
      <template v-slot:submit-btn>
        <el-col
          :span="24"
          style="display: flex; justify-content: end"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click=""
              >查询</el-button
            >
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-col>
      </template>
    </TSSearch>
    <el-button>按鈕</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TSSearch from '@/components/sub-search/index.vue'
import { mockData } from '@/components/sub-search/data'

const subFormInfo = ref({})
const comGetForm = function (val: any) {
  subFormInfo.value = val
}
</script>

<style lang="scss" scoped></style>
