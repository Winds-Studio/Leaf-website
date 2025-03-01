import { defineConfig } from 'vitepress'

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
      lang: 'en'
    },
    ru: {
      label: 'Русский',
      lang: 'ru', // optional, will be added  as `lang` attribute on `html` tag

      // other locale specific properties...
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
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
      { text: 'Docs', link: 'https://docs.leafmc.one/' },
      { text: 'Download', link: '/download' }
    ],

    sidebar: [

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Winds-Studio/Leaf' }
    ]
  }
})
