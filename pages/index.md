---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Leaf"
  text: "High performance Minecraft server software"
  image: logo.svg
  tagline: A Paper fork aim to find balance between performance, vanilla and stability
  actions:
    - theme: brand
      text: Download
      link: /download
    - theme: alt
      text: Docs
      link: https://docs.leafmc.one/

features:
  - title: <span class='emoji'>⚡</span> Powerful and optimized
    details: Stable and performant, it's designed to handle a large number of players
  - title: <span class='emoji'>🧬</span> Useful and customizable
    details: Contains many useful features and fixes, all of them can be customized in config
  - title: <span class='emoji'>📦</span> Latest dependencies
    details: Modern, keep dependencies up-to-date
---

<script setup>
import Contributors from './Contributors.vue'
</script>

## Team and contributors

<Suspense>
    <Contributors />
</Suspense>