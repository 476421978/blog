<template>
  <div class="t-cascader-com">
    <el-cascader
      class="cascader"
      v-model="currentVal"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      v-bind="getAttrs"
      v-on="slots"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

interface Props {
  id?: string
  value?: Array<any>
  options?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  value: () => [],
  options: () => [],
})

// $slots 和 $attrs
const slots = useSlots()
const attrs = useAttrs()

const getAttrs = computed(() => {
  return {
    placeholder: '请选择',
    ...attrs,
  }
})

interface Emits {
  (event: 'update:value', val: Array<any>): void
}
const emit = defineEmits<Emits>()
const currentVal = computed({
  get: () => props.value,
  set: val => {
    emit('update:value', val)
  },
})
</script>

<style lang="scss" scoped>
.t-cascader-com {
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    margin-right: 10px;
  }
  .cascader {
    flex: 1;
  }
}
</style>
