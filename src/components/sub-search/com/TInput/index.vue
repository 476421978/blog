<template>
  <div class="t-input-com">
    <span
      v-if="title"
      class="title"
    >
      {{ title }}</span
    >
    <el-input
      class="input"
      :value="currentVal"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
// :value 保持单项数据流
export default {
  name: 'TInput',
  props: {
    id: {
      type: String,
    },
    value: {
      type: String,
    },
    title: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '默认输入提示',
    },
  },
  emits: ['input'],
  data() {
    return {
      currentVal: this.value,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentVal = val
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.t-input-com {
  display: flex;
  justify-align: center;
  align-items: center;
  .title {
    margin-right: 10px;
  }
  .input {
    flex: 1;
  }
}
</style>
