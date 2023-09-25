<template>
  <div class="t-date-picker-com">
    <el-date-picker
      v-if="attrs.type === 'date'"
      class="date-picker"
      v-bind="getAttrs"
      v-on="slots"
    >
    </el-date-picker>
    <el-date-picker
      v-if="attrs.type === 'daterange'"
      class="date-picker"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      unlink-panels
      v-bind="getAttrs"
      v-on="slots"
    >
    </el-date-picker>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

interface Props {
  value: any
  align?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  align: 'right',
})

const attrs = useAttrs()
const slots = useSlots()
// props与useAttrs方法都可以获取父组件传递过来的属性与属性值
// 但是props接受了useAttrs方法就获取不到了
const getAttrs = computed(() => {
  return {
    'v-model': currentValue,
    placeholder: '请选择日期',
    format: 'YYYY-MM-DD',
    'value-format': 'YYYY-MM-DD',
    ...attrs,
  }
})

interface Emit {
  (event: 'update:value', val: any): void
}
const emit = defineEmits<Emit>()

const currentValue = computed({
  get: () => props.value,
  set: val => {
    emit('update:value', val)
  },
})
</script>

<style lang="scss" scoped>
.t-date-picker-com {
  display: flex;
  justify-content: center;
  align-items: center;
  .date-picker {
    flex: 1;
  }
}
</style>
