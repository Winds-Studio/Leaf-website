---
layout: home

hero:
  name: "Leaf"
  text: "Производительное ядро для Minecraft"
  image: /logo.svg
  tagline: Форк Paper с упором на производительность, ванильность и стабильность
  actions:
    - theme: brand-button
      text: Скачать Leaf
      link: /download
    - theme: brand-button
      text: Документация
      link: /docs/getting-started
    - theme: alt
      text: Discord сервер
      link: https://discord.gg/gfgAwdSEuM
    - theme: alt
      text: GitHub
      link: https://github.com/Winds-Studio/Leaf
features:
  - title: <span class='emoji'>⚡</span> Отличная оптимизация
    details: Стабильное и производительное ядро, способное выдерживать большое количество игроков
  - title: <span class='emoji'>🧬</span> Возможность кастомизации
    details: В конфиге ядра вы найдёте много опций для тщательной настройки каждого аспекта работы сервера
  - title: <span class='emoji'>📦</span> Актуальные зависимости
    details: Зависимости постоянно обновляются до самых новых версий
---

<script setup>
import Contributors from '../../.vitepress/theme/components/download/Contributors.vue'
</script>

## Команда и контрибьюторы

<Suspense>
    <Contributors lang="ru" />
</Suspense>