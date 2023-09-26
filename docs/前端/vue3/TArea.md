
## TArea组件

```vue
<template>
  <div class="t-area-com">
    <template v-for="(item, index) in areaArr">
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

<script setup lang="ts">
interface Props {
  value?: any
  areaArr: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  value: () => {},
  areaArr: () => [],
})

// 双向绑定
interface Emits {
  (event: 'update:value', value: object): void
  (event: 'get-cascade', params: any): Promise<void>
}
const emit = defineEmits<Emits>()

interface targetModel {
  title: string
  id: string
  valueArr: Array<any>
  level: string
  name: string
}

// 改变省市区
const changeArea = function (target: targetModel) {
  const { title, id, valueArr } = target
  props.areaArr.forEach((obj: targetModel) => {
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
  getCascadeInfo()
}

// 请求获取省市区信息
const getCascadeInfo = function () {
  const params = {
    pid: props.areaArr[0].id,
    cid: props.areaArr[1].id,
    tid: props.areaArr[2].id,
    province: props.areaArr[0].name,
    cityname: props.areaArr[1].name,
    countyname: props.areaArr[2].name,
  }
  emit('get-cascade', params)
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

```