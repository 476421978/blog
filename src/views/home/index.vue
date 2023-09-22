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
                  :fValue="item.fValue"
                  @get-cascade="getCascade"
                />

                <t-cascader
                  v-if="item.comType === 'cascader'"
                  :id="item.id"
                  v-model="item.fValue"
                  :options="item.options"
                />

                <t-date-picker
                  v-if="item.comType === 'datePicker'"
                  v-bind="{
                    dateType: item.type,
                    placeholder: item.placeholder,
                    type: item.type,
                    align: item.align,
                    pickerOptions: item.pickerOptions ? (item.type === 'date' ? pickerOptions : pickerOptionsTwo) : limitDay,
                  }"
                  v-model="item.fValue"
                />
              </el-form-item>
            </el-col>
          </template>
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
import TInput from '@/components/sub-search/com/TInput/index2.vue'
import TSelect from '@/components/sub-search/com/TSelect/index2.vue'
import TArea from '@/components/sub-search/com/Tarea/index2.vue'
import TCascader from '@/components/sub-search/com/TCascader/index2.vue'
import TDatePicker from '@/components/sub-search/com/TDatePicker/index2.vue'

import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const searchData: any = ref(mockData)

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

const pickerOptions = {
  disabledDate(time: any) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: '今天',
      onClick(picker: any) {
        picker.$emit('pick', new Date())
      },
    },
    {
      text: '昨天',
      onClick(picker: any) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        picker.$emit('pick', date)
      },
    },
    {
      text: '一周前',
      onClick(picker: any) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      },
    },
  ],
}

const pickerOptionsTwo = {
  disabledDate(time: any) {
    return time.getTime() > Date.now()
  },
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近一个月',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      },
    },
    {
      text: '最近三个月',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      },
    },
  ],
}

const limitDay = {
  disabledDate(time: any) {
    return time.getTime() > Date.now()
  },
}

onMounted(() => {
  getAgentList()
  getCascade()
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
