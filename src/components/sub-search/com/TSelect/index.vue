<template>
  <div class="t-select-com">
    <span
      v-if="title"
      class="title"
      >{{ title }}</span
    >
    <el-select
      class="select"
      v-model="currentType"
      v-bind="attrs"
      v-on="$listeners"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TSelect',
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    // 下拉选项值
    value: {
      type: [Number, String],
    },
  },
  data() {
    return {
      currentType: this.value,
    }
  },
  computed: {
    attrs() {
      return {
        placeholder: '请选择',
        clearable: true,
        ...this.$attrs,
      }
    },
  },
  watch: {
    value() {
      this.currentType = this.value
    },
  },
}
</script>

<style lang="scss">
.t-select-com {
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    margin-right: 10px;
  }
  .select {
    flex: 1;
  }
}
</style>
