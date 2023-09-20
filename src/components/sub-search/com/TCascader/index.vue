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
      v-bind="attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentVal: this.value,
    }
  },
  computed: {
    attrs() {
      return {
        clearable: true,
        ...this.$attrs,
      }
    },
  },
  methods: {
    // handleChange(value) {
    //   this.$emit('cascaderChange', value, this.id)
    // }
  },
}
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
