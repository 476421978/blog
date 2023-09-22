<template>
  <div class="t-cascader-com">
    <span
      v-if="title"
      class="title"
      >{{ title }}</span
    >
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
  title?: string
  value?: string
  options?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  title: '',
  value: '',
  options: () => [],
})

// $slots 和 $attrs
const slots = useSlots()
const attrs = useAttrs()

const getAttrs = computed(() => {
  return {
    ...attrs,
  }
})

interface Emits {
  (event: 'update:value', val: string): void
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
