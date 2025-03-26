---
layout: home

hero:
  name: "Leaf"
  text: "Software de servidor de Minecraft com elevado desempenho"
  image: logo.svg
  tagline: Um fork do paper focado em encontrar o equilibrio entre desempenho, experiência vanilla e estabilidade
  actions:
    - theme: brand-button
      text: Baixar Leaf
      link: /download
    - theme: brand-button
      text: Ler Documentação
      link: /docs/getting-started
    - theme: alt
      text: Entre no Discord
      link: https://discord.gg/gfgAwdSEuM
    - theme: alt
      text: Veja no GitHub
      link: https://github.com/Winds-Studio/Leaf

features:
  - title: <span class='emoji'>⚡</span> Poderoso e otimizado
    details: Estavél e performatico, desenhado para lidar com um elevado numero de jogadores
  - title: <span class='emoji'>🧬</span> Util e personalizavel
    details: Contem muitas funcionalidades e correções uteis, todas podem ser personalizadas na configuração
  - title: <span class='emoji'>📦</span> Ultimas dependencias
    details: Moderno, mantem as dependencias atualizadas
---

<script setup>
import Contributors from '../.vitepress/theme/components/download/Contributors.vue'
</script>

## Equipe e contribuidores

<Suspense>
    <Contributors />
</Suspense>