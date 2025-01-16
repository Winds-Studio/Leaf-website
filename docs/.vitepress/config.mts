import { defineConfig } from "vitepress";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import { UnlazyImages } from "@nolebase/markdown-it-unlazy-img";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";
import { zhConfig } from "./sidebar/sidebar_zh.mjs";
import { enConfig } from "./sidebar/sidebar_en.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaf",
  description: "Performant fork of Paper",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  vue: {
    template: {
      transformAssetUrls: {
        NolebaseUnlazyImg: ["src"],
      },
    },
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: enConfig,
      link: "/pages/en/",
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/pages/zh/",
      themeConfig: zhConfig,
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    editLink: {
      pattern: "https://github.com/Winds-Studio/Leaf/edit/main/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Winds-Studio/Leaf" },
    ],
    search: {
      provider: "local",
      options: {
        _render(src, env, md) {
          const html = md.render(src, env);
          if (env.frontmatter?.search === false) {
            return "";
          }
          return html;
        },
      },
    },
    externalLinkIcon: true, // 展示站外链接箭头 ↗
  },
  ignoreDeadLinks: true,
  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.use(UnlazyImages(), {
        imgElementTag: "NolebaseUnlazyImg",
      });
      md.use(BiDirectionalLinks());
      md.use(InlineLinkPreviewElementTransform);
    },
  },
});
