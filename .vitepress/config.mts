import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leaf",
  description: "Performant fork of Gale",
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  base: '/Leaf-website/',
  srcDir: './pages',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    ru: {
      label: 'Russian',
      lang: 'ru', // optional, will be added  as `lang` attribute on `html` tag

      // other locale specific properties...
    }
  },

  themeConfig: {
    logo: './Leaf-website/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Build History', link: '/builds' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Winds-Studio/Leaf' }
    ]
  }
})
