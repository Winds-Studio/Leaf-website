import { defineConfig } from 'vitepress'
import sidebar from "./sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaf",
  description: "Performant fork of Paper",
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  srcDir: './pages',
  appearance: 'force-dark',
  cleanUrls: true,

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
    },
    pt: {
      label: 'Português',
      lang: 'pt',
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
    }
  },

  themeConfig: {

    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Download', link: '/download' },
      { text: 'Docs', link: '/docs/getting-started', activeMatch: '/docs/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Winds-Studio/Leaf' },
      { icon: 'discord', link: 'https://discord.gg/gfgAwdSEuM' }
    ]
  }
})
