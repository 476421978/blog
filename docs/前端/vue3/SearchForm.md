## 组合搜索表单
```vue
<template>
  <div>
    <div class="sub-search-com">
      <el-form
        ref="formRef"
        :model="comGetForm"
        size="large"
        :inline="true"
      >
        <el-row
          class="search-box"
          type="flex"
          :gutter="24"
        >
          <template v-for="(item, index) in searchData">
            <el-col :span="item.span || 6">
              <el-form-item
                :label="`${item.title}`"
                :prop="item.fName"
                :rules="item.rules ? item.rules : []"
              >
                <t-input
                  v-if="item.comType === 'input'"
                  :id="item.id"
                  v-model="item.fValue"
                  :placeholder="item.placeholder"
                />
                <t-select
                  v-if="item.comType === 'select'"
                  :id="item.id"
                  v-model="item.fValue"
                  :options="item.options"
                  @on-select-change="onSelectChange"
                />

                <t-area
                  v-if="item.comType === 'area'"
                  :areaArr="item.areaArr"
                  :value="item.fValue"
                  @get-cascade="getCascade"
                />

                <t-cascader
                  v-if="item.comType === 'cascader'"
                  :id="item.id"
                  :value="item.fValue"
                  :options="item.options"
                  v-model="item.fValue"
                />

                <t-date-picker
                  v-if="item.comType === 'datePicker'"
                  :value="item.fValue"
                  :type="item.type"
                  :align="item.align"
                  :shortcuts="item.pickerOptions ? (item.type === 'date' ? DateShortcuts : DaterangeShortcuts) : ''"
                  v-model="item.fValue"
                />
              </el-form-item>
            </el-col>
          </template>

          <slot name="submit-btn">
            <el-col
              :span="6"
              class="btn-group"
            >
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm(formRef)"
                  >查询</el-button
                >
                <el-button @click="onReset">重置</el-button>
              </el-form-item>
            </el-col>
          </slot>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
// 组件
import API from '@/api'
import { mockData } from '@/components/sub-search/data'
import TInput from '@/components/sub-search/com/TInput/index.vue'
import TSelect from '@/components/sub-search/com/TSelect/index.vue'
import TArea from '@/components/sub-search/com/Tarea/index.vue'
import TCascader from '@/components/sub-search/com/TCascader/index.vue'
import TDatePicker from '@/components/sub-search/com/TDatePicker/index.vue'

import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const searchData: any = ref(JSON.parse(JSON.stringify(mockData)))

const comGetForm = computed(() => {
  return getForm(searchData.value)
})

// 获取 form 对象
const getForm = function (dataArr: any = []) {
  let fromObj: any = {}
  dataArr.forEach((element: any) => {
    fromObj[element.fName] = element.fValue
  })
  return fromObj
}

const onSelectChange = () => {}

//获取代理商
const getAgentList = async function () {
  const res: any = await API.AgentSelect()
  if (!res) return
  const list = res.rows
  const agentList = list.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    }
  })
  const i = searchData.value.findIndex((element: any) => element.id == '2')
  if (i > -1) {
    searchData.value[i].options = agentList
    if (searchData.value[i].defaultOption) {
      searchData.value[i].fValue = agentList[0].value //  默认选一个
    }
  }
}

// 获取省市区数据
interface paramsModel {
  province: string
  cityname: string
  countyname: string
  pid: string //省
  cid: string //市
  tid: string //区
}

const params: paramsModel = reactive({
  province: '',
  cityname: '',
  countyname: '',
  pid: '',
  cid: '',
  tid: '',
})

const getCascade = async function (item = params) {
  const res: any = await API.ProvinceCityDistrict()
  if (!res) return

  const list = res.rows
  const i = searchData.value.findIndex((element: any) => element.id === '66')

  if (i > -1) {
    searchData.value[i].areaArr[0].valueArr = list || []
  }
  searchData.value[i].fValue = item
}

const DateShortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const DaterangeShortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 双向绑定
interface Emits {
  (event: 'on-submit-success', val: any): void
}
const emit = defineEmits<Emits>()
// 验证
const submitForm = async function (formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      emit('on-submit-success', comGetForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 重置
const onReset = function () {
  searchData.value = JSON.parse(JSON.stringify(mockData))
  getAgentList()
  // 查询省市区
  params.province = ''
  params.cityname = ''
  params.countyname = ''
  params.pid = ''
  params.cid = ''
  params.tid = ''
  getCascade()
}

onMounted(() => {
  getAgentList()
  getCascade()
})

// 暴露属性给父调用
defineExpose({
  formRef,
  submitForm,
  onReset,
  comGetForm,
})
</script>

<style lang="scss" scoped>
.sub-search-com {
  .search-box {
    margin: 0;
    background: rgba(238, 238, 238, 1);
    padding: 20px 0;
  }
}
</style>

```