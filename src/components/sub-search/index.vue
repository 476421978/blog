<template>
  <div class="sub-search-com">
    <el-row
      class="search-box"
      type="flex"
      :gutter="24"
    >
      <el-form
        ref="comGetForm"
        :model="comGetForm"
        label-width="auto"
        size="large"
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
                clearable
              />
              <t-select
                v-if="item.comType === 'select'"
                :id="item.id"
                v-model="item.fValue"
                :options="item.options"
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
              <TAarea
                v-if="item.comType === 'area'"
                :areaArr="item.areaArr"
                :fValue="item.fValue"
                @get-cascade="getCascade"
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
                @click="submitForm"
                >查询</el-button
              >
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </slot>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import TInput from './com/TInput/index.vue'
import TSelect from './com/TSelect/index.vue'
import TCascader from './com/TCascader/index.vue'
import TDatePicker from './com/TDatePicker/index.vue'
import TAarea from './com/TArea/index.vue'
export default {
  name: 'TSSearch',
  components: {
    TInput,
    TSelect,
    TCascader,
    TDatePicker,
    TAarea,
  },
  props: {
    mockData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchData: JSON.parse(JSON.stringify(this.mockData)),
      limitDay: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      pickerOptionsTwo: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      // 查询省市区
      params: {
        province: '',
        cityname: '',
        countyname: '',
        pid: '', //省
        cid: '', //市
        tid: '', //区
      },
    }
  },
  computed: {
    // 获取表单信息
    comGetForm() {
      return this.getForm(this.searchData)
    },
    // 代理商
    getAgentId() {
      const obj = this.searchData.find(element => element.id == 2)
      return obj.fValue
    },
  },
  mounted() {
    // this.getAgentList()
    // this.getCascade()
  },
  methods: {
    // 验证
    submitForm() {
      this.$refs.comGetForm.validate(valid => {
        if (valid) {
          this.$message.success('通过验证')
          this.$emit('com-get-form', this.comGetForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    onReset() {
      this.searchData = JSON.parse(JSON.stringify(this.mockData))
      // this.getAgentList()
      // 查询省市区
      this.params = {
        province: '',
        cityname: '',
        countyname: '',
        pid: '', //省
        cid: '', //市
        tid: '', //区
      }
      this.getCascade()
    },
    //获取代理商
    async getAgentList() {
      // try {
      //   const res = await API.AgentSelect()
      //   if (!res) return

      //   const list = res.rows
      //   const agentList = list.map(item => {
      //     return {
      //       value: item.id,
      //       label: item.name,
      //     }
      //   })

      //   const i = this.searchData.findIndex(element => element.id == '2')

      //   if (i > -1) {
      //     this.searchData[i].options = agentList
      //     if (this.searchData[i].defaultOption) {
      //       this.searchData[i].fValue = agentList[0].value //  默认选一个
      //     }
      //   }
      // } catch (error) {
      //   console.log('getAgentList--->>>', error)
      // }
    },
    // 获取省市区数据
    async getCascade(item = this.params) {
      // try {
      //   const res = await API.ProvinceCityDistrict()
      //   if (!res) return

      //   const list = res.rows
      //   const i = this.searchData.findIndex(element => element.id === '66')

      //   if (i > -1) {
      //     this.searchData[i].areaArr[0].valueArr = list || []
      //   }
      //   this.searchData[i].fValue = item
      // } catch (error) {
      //   console.log('getCascade--->>>', error)
      // }
    },
    // 获取 form 对象
    getForm(dataArr = []) {
      let fromObj = {}
      dataArr.forEach(element => {
        fromObj[element.fName] = element.fValue
      })
      return fromObj
    },
  },
}
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
