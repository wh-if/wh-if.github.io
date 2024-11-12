import { defineConfig } from "vitepress";
// import path from 'path'
const nav = [
  {
    text: "前端",
    activeMatch: `^/note/`,
    items: [
      {
        text: "JavaScript基础",
        link: "/note/base"
      },
      {
        text: "收集",
        link: "/note/collect"
      },
      {
        text: "进阶",
        link: "/note/major"
      },
      {
        text: "扩展阅读",
        link: "/note/extension"
      },
    ],
  },
  {
    text: "记录",
    activeMatch: `^/record/`,
    link: '/record'
  },
];

// https://github.com/vuejs/vitepress/issues/572
const sidebar = {
  "/record": [
    {
      text: "2023年",
      collapsed: true,
      items: [
        {
          text: "九月",
          link: "/record/2023/9"
        },
      ],
    },
  ]
};

export default defineConfig({
  title: "W H",
  srcDir: "./docs",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav,
    sidebar,
    logo: "logo.svg",
    lastUpdatedText: "最后更新于",
    outline: {
      level: 'deep'
    },
    editLink: {
      pattern: "https://github.com/wh-if.github.io/edit/master/src/docs/:path",
      text: "在 GitHub 上编辑此页",
    },
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       // "@components": path.resolve(__dirname, "./theme/components/"),
  //       "@components": "src/components/",
  //     },
  //   },
  // },
});