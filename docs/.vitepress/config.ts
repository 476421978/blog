import { defineConfig } from "vitepress"
import { ES6, JavaScript} from "./catalog"

export default defineConfig({
  // site-level options
  title: "HLG随笔",

  description: "Just playing around.",
  themeConfig: {
    nav: [
      {
        text: "ES6",
        items: ES6,
      },
      {
        text: "JavaScript",
        items: JavaScript,
      },
    ],
    sidebar: {
      "/ES6/": ES6,
      "/JavaScript/": JavaScript,
    },
    search: {
      provider: "local",
      // options: {
      //   locales: {
      //     zh: {
      //       translations: {
      //         button: {
      //           buttonText: '搜索文档',
      //           buttonAriaLabel: '搜索文档'
      //         },
      //         modal: {
      //           noResultsText: '无法找到相关结果',
      //           resetButtonTitle: '清除查询条件',
      //           footer: {
      //             selectText: '选择',
      //             navigateText: '切换'
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    },
    outlineTitle: "此页目录",
    // lastUpdatedText: "最后更新时间",
    outline: [2, 6],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message: '© <a href="https://hlgshare.top">hlgshare.top</a> @2023-2024',
      copyright: '<a href="https://beian.miit.gov.cn/#/Integrated/index">粤公网安备 44122502000031号</a>',
    },
    // theme-level options
  },
  // ...
})
