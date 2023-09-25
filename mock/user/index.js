import Mock from 'mockjs' // 模拟数据
// import { baseData } from '../base.js'

// 获取下拉框列表
Mock.mock(RegExp('/agent_select'), function (options) {
  const data = {
    code: 200,
    result: {
      count: 2,
      'rows|20': [
        {
          id: '@id',
          name: '@name',
        },
      ],
    },
    msg: 'success',
  }
  return Mock.mock(data)
})

// 获取省市区
Mock.mock(RegExp('/province_city_district'), function (options) {
  const data = {
    code: 200,
    result: {
      count: 2,
      rows: [
        {
          code: 'bj',
          id: 1,
          name: '北京市',
          sort: 99,
          union_code: '11',
          cityList: [
            {
              code: '2',
              id: 20,
              name: '北京',
              provinceid: 1,
              sort: 0,
              union_code: '110200',
              regionList: [
                {
                  city: '北京',
                  cityid: 20,
                  code: '103',
                  id: 103,
                  name: '东城区',
                  province: '北京市',
                  provinceid: 1,
                  union_code: '110101',
                },
                {
                  city: '北京',
                  cityid: 20,
                  code: '104',
                  id: 104,
                  name: '西城区',
                  province: '北京市',
                  provinceid: 1,
                  union_code: '110102',
                },
              ],
            },
          ],
        },
      ],
    },
  }

  return Mock.mock(data)
})
