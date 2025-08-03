---
layout: home

hero:
  name: "Leaf"
  text: "高性能 Minecraft 服务端核心"
  image: /logo.svg
  tagline: 一个 Paper 分支, 专注于寻找性能优化, Vanilla, 稳定之间的平衡, 为大型网络, 密集和高承载量场景设计
  actions:
    - theme: brand-button
      text: 下载
      link: /zh/download
    - theme: brand-button
      text: 文档
      link: /zh/docs/getting-started
    # - theme: alt
    #   text: 加入 QQ 群
    #   link: https://TODO
    - theme: alt
      text: GitHub
      link: https://github.com/Winds-Studio/Leaf
features:
  - title: <span class='emoji'>⚡</span> 高度优化
    details: 稳定且高效, 设计用于承载大量玩家
  - title: <span class='emoji'>🧬</span> 自定义且实用
    details: 包含实用的功能和修复, 可在配置中自定义
  - title: <span class='emoji'>📦</span> 保持最新
    details: 现代化, 保持最新的依赖库
---

<script setup>
import Contributors from '../../.vitepress/theme/components/Contributors.vue'
</script>

## 团队和贡献者

<Suspense>
    <Contributors lang="zh" />
</Suspense>
