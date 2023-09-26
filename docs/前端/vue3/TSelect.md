
## TSelect组件

```vue
<template>
  <el-select
    v-model="chanValue"
    v-bind="getAttrs"
    @change="onSelectChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface optionModel {
  label: string
  value: string
  // [propName: string]: any // 任意属性
}

interface Props {
  id?: string
  value?: string
  options: Array<optionModel>
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  value: '',
  options: () => [{ value: '', label: '' }],
})

// 双向绑定
interface Emits {
  (event: 'update:value', name: String | Array<String>): void
  (event: 'on-select-change'): void
}
const emit = defineEmits<Emits>()
const chanValue = computed({
  get: () => props.value,
  set: (val: any) => {
    emit('update:value', val)
  },
})

// 选择项回调
const onSelectChange = () => {
  emit('on-select-change')
}

const attrs = useAttrs()
const getAttrs = computed(() => {
  return {
    placeholder: '请选择',
    clearable: true,
    ...attrs,
  }
})
</script>

<style lang="scss" scoped></style>


```