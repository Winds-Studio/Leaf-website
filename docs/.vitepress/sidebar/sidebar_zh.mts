import { link } from "fs";
import type { DefaultTheme } from "vitepress";

export const sidebar_zh = [
  {
    text: "欢迎阅读 Leaf 文档",
    link: "/pages/zh/about",
  },
  {
    text: "To Do",
    link: "/pages/zh/todo",
  },
  // 开发
  {
    text: "开发",
    link: "/pages/zh/dev/",
    items: [
      { text: "Leaf Api", link: "/pages/zh/dev/api" },
      {
        text: "构建",
        link: "/pages/zh/dev/build",
      },
      {
        text: "给 Leaf 贡献代码",
        link: "/pages/zh/dev/contributing",
      },
    ],
  },
  // how-to
  {
    text: "如何",
    items: [{ text: "配置 Sentry", link: "/pages/zh/how-to/setup-sentry" }],
  },
  // 实现
  {
    text: "参考",
    link: "/pages/zh/reference/",
    items: [
      // faq、index、system-properties、config(gale-global、gale-world、index、leaf-global、misc-config)
      { text: "FAQ", link: "/pages/zh/reference/faq" },
      { text: "系统属性", link: "/pages/zh/reference/system-properties" },
      {
        text: "配置",
        link: "/pages/zh/reference/config/",
        items: [
          {
            text: "Gale 全局配置",
            link: "/pages/zh/reference/config/gale-global",
          },
          {
            text: "Gale 世界配置",
            link: "/pages/zh/reference/config/gale-world",
          },
          {
            text: "Leaf 全局配置",
            link: "/pages/zh/reference/config/leaf-global",
          },
          { text: "其他配置", link: "/pages/zh/reference/config/misc-config" },
        ],
      },
    ],
  },
];

export const zhConfig: DefaultTheme.Config = {
  sidebar: sidebar_zh,
  nav: [
    { text: "主页", link: "/zh" },
    { text: "构建历史", link: "/builds" },
  ],
};
