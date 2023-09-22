<template>
  <div class="t-date-picker-com">
    <span
      v-if="title"
      class="title"
      >{{ title }}</span
    >

    <el-date-picker
      v-if="dateType === 'date'"
      class="date-picker"
      v-model="currentValue"
      :placeholder="placeholder"
      v-bind="getAttrs"
      v-on="slots"
    >
    </el-date-picker>

    <el-date-picker
      v-if="dateType === 'daterange'"
      class="date-picker"
      v-model="currentValue"
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
  title: string
  dateType: string
  value: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  dateType: '',
  value: '',
  placeholder: '',
})

const attrs = useAttrs()
const slots = useSlots()

const getAttrs = computed(() => {
  return {
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
  .title {
    margin-right: 10px;
  }
  .date-picker {
    flex: 1;
  }
}
</style>
