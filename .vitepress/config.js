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
  }
];

// https://github.com/vuejs/vitepress/issues/572
const sidebar = {
  "/record": [
    {
      text: "默认分类",
      collapsed: true,
      items: [
        {
          text: "Git",
          link: "/record/git"
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
    outline: {
      level: 'deep'
    },
    editLink: {
      pattern: "https://github.com/wh-if.github.io/edit/master/src/docs/:path",
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