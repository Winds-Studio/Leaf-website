---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Leaf"
  text: "High performance Minecraft server software"
  image: logo.svg
  tagline: A Paper fork focused on finding balance between performance, vanilla behavior, and stability
  actions:
    - theme: brand-button
      text: Download
      link: /download
    - theme: brand-button
      text: Docs
      link: /docs/getting-started
    - theme: alt
      text: Discord
      link: https://discord.gg/gfgAwdSEuM
    - theme: alt
      text: GitHub
      link: https://github.com/Winds-Studio/Leaf
features:
  - title: <span class='emoji'>⚡</span> Powerful and optimized
    details: Stable and performant; Leaf is designed to scale
  - title: <span class='emoji'>🧬</span> Useful and customizable
    details: Contains many useful features and fixes; all of which can be customized in-config
  - title: <span class='emoji'>📦</span> Latest dependencies
    details: Always modern, keeping dependencies up-to-date
---

<script setup>
import Contributors from '../.vitepress/theme/components/Contributors.vue'
</script>

## Team and contributors

<Suspense>
    <Contributors />
</Suspense>
