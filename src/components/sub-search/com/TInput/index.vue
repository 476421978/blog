<template>
  <div>
    <el-input
      v-model="currentValue"
      :placeholder="placeholder"
      v-bind="getAttrs"
      v-on="slots"
    />
  </div>
</template>

<script setup lang="ts">
import { useSlots, useAttrs, computed } from 'vue'

// $slots 和 $attrs
const slots = useSlots()
const attrs = useAttrs()

const getAttrs = computed(() => {
  return {
    clearable: true,
    ...attrs,
  }
})

// emit调用
interface Emits {
  (event: 'update:value', value: String): void
}
const emit = defineEmits<Emits>()
// 通过重写计算属性的set和get方法，将计算属性的结果绑定在输入框的model中
const currentValue = computed({
  get: (): string => props.value || '',
  set: (val: any) => {
    emit('update:value', val)
  },
})

interface Props {
  id?: string
  title?: string
  value?: string
  placeholder?: string
}
// props的使用
const props = withDefaults(defineProps<Props>(), {
  id: '',
  title: '',
  value: '',
  placeholder: '默认输入提示',
})

// 暴露属性
// defineExpose({
//   a,
//   b
// })
</script>

<style lang="scss" scoped>
.t-input-com {
  display: flex;
  align-items: center;
  .title {
    margin-right: 10px;
  }
  .input {
    flex: 1;
  }
}
</style>
