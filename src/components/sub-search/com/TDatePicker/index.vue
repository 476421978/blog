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
      v-bind="attrs"
      v-on="$listeners"
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
      v-bind="attrs"
      v-on="$listeners"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'TDatePicker',
  props: {
    value: '',
    title: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '请选择日期',
    },
    dateType: {
      type: String,
      default: 'date',
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    attrs() {
      return {
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        ...this.$attrs,
      }
    },
  },
}
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
