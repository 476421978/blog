export const mockData = [
  {
    id: '66',
    comType: 'area',
    span: 24,
    title: '地区级联',
    fName: 'areaV',
    fValue: {},
    areaArr: [
      {
        id: '',
        level: 0,
        title: '省',
        name: '',
        placeholder: '请选择省',
        valueArr: [],
      },
      {
        id: '',
        level: 1,
        title: '市',
        name: '',
        placeholder: '请选择市',
        valueArr: [],
      },
      {
        id: '',
        level: 2,
        title: '区',
        name: '',
        placeholder: '请选择区',
        valueArr: [],
      },
    ],
  },
  {
    id: '2',
    comType: 'select',
    span: 12,
    title: '下拉框',
    fName: 'agentV',
    fValue: '',
    defaultOption: true,
    options: [],
  },
  {
    id: '0',
    comType: 'input',
    span: 12,
    placeholder: '缺省提示',
    title: '名称',
    fName: 'nameV',
    fValue: '',
    rules: [{ required: true, message: '商家名称不能为空' }],
  },
  {
    id: '1',
    comType: 'input',
    span: 12,
    placeholder: '缺省提示',
    title: '电话',
    fName: 'phoneV',
    fValue: '',
    rules: [{ required: true, message: '商家电话不能为空' }],
  },
  // {
  //   id: '4',
  //   comType: 'datePicker',
  //   type: 'date',
  //   span: 12,
  //   title: '日期选择',
  //   fName: 'dateDayV',
  //   fValue: ''
  // },
  // {
  //   id: '44',
  //   comType: 'datePicker',
  //   type: 'daterange',
  //   span: 12,
  //   title: '双日期选择',
  //   fName: 'dateDayVV',
  //   fValue: []
  // },
  {
    id: '5',
    comType: 'datePicker', // 日期选择
    type: 'date', // 展示类型
    span: 12, // 占位
    title: '日期快捷',
    fName: 'dateDayVQ', // Key
    fValue: '', // 内容
    align: 'right', // 位置
    pickerOptions: true, // 快捷选择
  },
  {
    id: '55',
    comType: 'datePicker',
    type: 'daterange',
    span: 24,
    title: '双日期快捷',
    fName: 'dateDayVQQ',
    fValue: [],
    align: 'right',
    pickerOptions: true,
  },
  {
    id: '3',
    comType: 'cascader',
    span: 12,
    title: '品类',
    fName: 'goodsV',
    fValue: [],
    options: [
      {
        value: 'firstLevel',
        label: '一级',
        children: [
          {
            value: 'secondLevel',
            label: '二级',
          },
        ],
      },
    ],
  },
]
