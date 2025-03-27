---
layout: home

hero:
  name: "Leaf"
  text: "Software de servidor de Minecraft com alto desempenho"
  image: /logo.svg
  tagline: Um fork do Paper focado em encontrar o equilíbrio entre desempenho, jogabilidade vanilla e estabilidade
  actions:
    - theme: brand-button
      text: Baixar Leaf
      link: /download
    - theme: brand-button
      text: Ler a documentação
      link: /docs/getting-started
    - theme: alt
      text: Entre no Discord
      link: https://discord.gg/gfgAwdSEuM
    - theme: alt
      text: Veja no GitHub
      link: https://github.com/Winds-Studio/Leaf
features:
  - title: <span class='emoji'>⚡</span> Poderoso e otimizado
    details: Estável e performático, projetado para lidar com um elevado número de jogadores
  - title: <span class='emoji'>🧬</span> Útil e personalizável
    details: Contém muitas funcionalidades e correções úteis, todas podem ser personalizadas na configuração
  - title: <span class='emoji'>📦</span> Últimas dependências
    details: Moderno, mantém as dependências atualizadas
---

<script setup>
import Contributors from '../../.vitepress/theme/components/download/Contributors.vue'
</script>

## Equipe e colaboradores

<Suspense>
    <Contributors lang="pt" />
</Suspense>