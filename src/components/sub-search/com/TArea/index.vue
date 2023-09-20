<template>
  <div class="t-area-com">
    <template v-for="(item, index) in TAareaArr">
      <el-select
        v-model="item.id"
        class="area-select"
        :placeholder="item.placeholder"
        clearable
        @change="changeArea(item)"
      >
        <el-option
          v-for="vItem in item.valueArr"
          :key="vItem.id"
          :label="vItem.name"
          :value="vItem.id"
        />
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '地区',
    },
    fValue: {
      type: Object,
      default: () => {},
    },
    areaArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      TAareaArr: this.areaArr,
      TAfValue: this.fValue,
    }
  },
  watch: {
    areaArr() {
      this.TAareaArr = this.areaArr
    },
  },
  methods: {
    // 改变省市区
    changeArea(target) {
      const { title, id, valueArr } = target
      this.TAareaArr.forEach(obj => {
        //  清空 市id 区id
        if (obj.level > target.level) {
          obj.id = ''
          obj.name = ''
          obj.valueArr = []
        }
        // 赋值省id 市id 区id
        if (obj.title === title) {
          obj.id = id
        }

        // 赋值市 数组数据
        if (obj.title === '市' && title === '省') {
          const province = valueArr.find(element => element.id == id) || { cityList: [], name: '' }
          obj.valueArr = province.cityList
          obj.name = province.name
        }
        // 赋值区 数组数据
        if (obj.title === '区' && title === '市') {
          const area = valueArr.find(element => element.id == id)
          obj.valueArr = area ? area.regionList : []
          obj.name = area ? area.name : ''
        }
      })

      this.getCascadeInfo()
    },
    // 请求获取省市区信息
    getCascadeInfo() {
      const params = {
        pid: this.TAareaArr[0].id,
        cid: this.TAareaArr[1].id,
        tid: this.TAareaArr[2].id,
        province: this.TAareaArr[0].name,
        cityname: this.TAareaArr[1].name,
        countyname: this.TAareaArr[2].name,
      }
      this.$emit('get-cascade', params)
    },
  },
}
</script>

<style lang="scss" scoped>
.t-area-com {
  display: flex;
  .area-select {
    margin-right: 10px;
  }
}
</style>
