// Example VitePress config with Japanese language support
export default {
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
    },
    // ...other languages
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '日本語', link: '/ja/' },
      // ...other nav items
    ],
    sidebar: {
      '/ja/': [
        {
          text: '使い方',
          items: [
            { text: 'Java フラグの使い方', link: '/ja/docs/how-to/java-flags' },
            // ...add other Japanese docs here
          ]
        },
        // ...other sidebar sections
      ],
      // ...other language sidebars
    }
  }
};
