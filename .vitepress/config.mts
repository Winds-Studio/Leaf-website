import { defineConfig } from "vitepress";
import sidebar from "./sidebar.mjs";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaf",
  description: "Performant fork of Paper",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    plugins: [
      GitChangelog({
        repoURL: () => "https://github.com/Winds-Studio/Leaf-website",
      }),
      GitChangelogMarkdownSection(),
    ],
  },

  srcDir: "./pages",
  appearance: "force-dark",
  cleanUrls: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
      // English navigation
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Download", link: "/download" },
          { text: "Docs", link: "/docs/", activeMatch: "/docs/" },
        ],
      },
    },
    tr: {
      label: "Türkçe",
      lang: "tr",
      // Türkçe navigasyon
      themeConfig: {
        nav: [
          { text: "Ana Sayfa", link: "/tr/" },
          { text: "İndir", link: "/tr/download" },
          {
            text: "Dokümantasyon",
            link: "/tr/docs/",
            activeMatch: "/tr/docs/",
          },
        ],
      },
    },
    de: {
      label: "Deutsch",
      lang: "de",
      // German navigation
      themeConfig: {
        nav: [
          { text: "Startseite", link: "/de/" },
          { text: "Herunterladen", link: "/de/download" },
          {
            text: "Dokumentation",
            link: "/de/docs/",
            activeMatch: "/de/docs/",
          },
        ],
      },
    },
    pt: {
      label: "Português",
      lang: "pt",
      // Portuguese navigation
      themeConfig: {
        nav: [
          { text: "Início", link: "/pt/" },
          { text: "Baixar", link: "/pt/download" },
          { text: "Documentação", link: "/pt/docs/", activeMatch: "/pt/docs/" },
        ],
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      // Russian navigation
      themeConfig: {
        nav: [
          { text: "Главная", link: "/ru/" },
          { text: "Скачать", link: "/ru/download" },
          { text: "Документация", link: "/ru/docs/", activeMatch: "/ru/docs/" },
        ],
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      // Chinese navigation
      themeConfig: {
        nav: [
          { text: "首页", link: "/zh/" },
          { text: "下载", link: "/zh/download" },
          { text: "文档", link: "/zh/docs/", activeMatch: "/zh/docs/" },
        ],
      },
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    // Default navigation (will be overridden by locale-specific navigation)
    nav: [
      { text: "Home", link: "/" },
      { text: "Download", link: "/download" },
      { text: "Docs", link: "/docs/", activeMatch: "/docs/" },
    ],

    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/Winds-Studio/Leaf" },
      { icon: "discord", link: "https://discord.gg/gfgAwdSEuM" },
    ],
  },
});
